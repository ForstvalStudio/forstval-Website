#!/bin/bash

# ForstvalStudio Production Deployment Script for Hostinger Business
# Run this script on your Hostinger server to deploy the application

set -e  # Exit on any error

echo "🚀 Starting ForstvalStudio deployment to Hostinger Business..."

# Configuration
APP_NAME="forststal-studio"
APP_DIR="/home/$(whoami)/public_html"
NODE_VERSION="18"
PORT="3000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Step 1: Environment Check
print_status "Checking environment..."

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_CURRENT=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_CURRENT" -lt "$NODE_VERSION" ]; then
        print_warning "Node.js version $NODE_CURRENT detected. Recommended: $NODE_VERSION+"
    else
        print_status "Node.js version $(node -v) ✓"
    fi
else
    print_error "Node.js not found. Please install Node.js $NODE_VERSION or higher."
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm not found. Please install npm."
    exit 1
fi

# Step 2: Install/Update PM2
print_status "Setting up PM2 process manager..."
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2 globally..."
    npm install -g pm2
else
    print_status "PM2 is already installed ✓"
fi

# Step 3: Create necessary directories
print_status "Creating application directories..."
mkdir -p logs
mkdir -p .next
chmod 755 logs

# Step 4: Install dependencies
print_status "Installing production dependencies..."
npm ci --only=production

# Install sharp for optimized image processing
print_status "Installing optimized image processing..."
npm install sharp --platform=linux --arch=x64

# Step 5: Build application
print_status "Building application for production..."
export NODE_ENV=production
npm run build:production

if [ $? -ne 0 ]; then
    print_error "Build failed. Please check the build logs."
    exit 1
fi

print_status "Build completed successfully ✓"

# Step 6: Environment setup
print_status "Setting up environment variables..."

if [ ! -f ".env.production" ]; then
    print_warning "No .env.production file found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env.production
        print_warning "Please update .env.production with your actual values."
    fi
fi

# Step 7: PM2 Configuration
print_status "Configuring PM2..."

# Stop existing application if running
pm2 stop $APP_NAME 2>/dev/null || true
pm2 delete $APP_NAME 2>/dev/null || true

# Start application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
print_status "Setting up PM2 startup script..."
pm2 startup

# Step 8: Setup log rotation
print_status "Setting up log rotation..."
pm2 install pm2-logrotate || true

# Step 8.1: Initialize database
print_status "Initializing database..."
if [ -f ".env.production" ] || [ -f ".env.local" ]; then
    export $(cat .env.production 2>/dev/null | grep -v '^#' | xargs) || true
    export $(cat .env.local 2>/dev/null | grep -v '^#' | xargs) || true
    
    # Test database connection by running a simple health check
    timeout 10 curl -s http://localhost:$PORT/api/health || print_warning "Database health check failed - ensure your MySQL credentials are correct"
else
    print_warning "No environment file found. Database initialization skipped."
fi

# Step 9: Health check
print_status "Performing health check..."
sleep 5

# Check if application is running
if pm2 describe $APP_NAME | grep -q "online"; then
    print_status "Application is running ✓"
else
    print_error "Application failed to start. Check logs with: pm2 logs $APP_NAME"
    exit 1
fi

# Step 10: Performance optimization
print_status "Optimizing application performance..."

# Set up proper file permissions
find . -type f -name "*.js" -exec chmod 644 {} \;
find . -type f -name "*.css" -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

# Step 11: Security hardening
print_status "Applying security configurations..."

# Create or update .htaccess if it doesn't exist
if [ ! -f ".htaccess" ]; then
    cat > .htaccess << 'EOL'
# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Hide server information
ServerTokens Prod
Header unset Server

# Prevent access to sensitive files
<FilesMatch "\.(env|log|config)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Cache static assets
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header append Cache-Control "public, immutable"
</filesMatch>

# Enable Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
EOL
    print_status "Created .htaccess for security and performance ✓"
fi

# Step 12: Final verification
print_status "Running final verification..."

# Check application response
sleep 3
if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200\|301\|302"; then
    print_status "Application is responding correctly ✓"
else
    print_warning "Application may not be responding correctly. Check logs with: pm2 logs $APP_NAME"
fi

# Display deployment summary
echo
echo "================================================================"
echo "🎉 ForstvalStudio deployment completed successfully!"
echo "================================================================"
echo
print_status "Application Status:"
pm2 describe $APP_NAME --silent | grep -E "(status|memory|cpu)"
echo
print_status "Useful PM2 Commands:"
echo "  • Check status: pm2 status"
echo "  • View logs: pm2 logs $APP_NAME"
echo "  • Restart app: pm2 restart $APP_NAME"
echo "  • Stop app: pm2 stop $APP_NAME"
echo "  • Monitor: pm2 monit"
echo
print_status "Application URLs:"
echo "  • Local: http://localhost:$PORT"
echo "  • Production: https://$(hostname)"
echo
print_status "Next Steps:"
echo "  1. Update DNS to point to your server IP"
echo "  2. Configure SSL certificate in Hostinger panel"
echo "  3. Test all functionality on your domain"
echo "  4. Set up monitoring and alerts"
echo
print_status "Deployment completed at: $(date)"
echo "================================================================"
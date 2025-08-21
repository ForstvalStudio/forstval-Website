# ForstvalStudio - Hostinger VPS Deployment Guide

## 🚀 Complete VPS Deployment Guide for Hostinger

This guide will help you deploy your ForstvalStudio website to Hostinger VPS with full Node.js support and dynamic functionality.

### 📋 Prerequisites

- ✅ Hostinger VPS (Virtual Private Server)
- ✅ Domain name configured
- ✅ SSH access to your VPS
- ✅ Git installed on your local machine
- ✅ Node.js 18+ and npm installed on VPS

## 🔧 Step 1: Prepare Your Local Environment

### 1.1 Install Production Dependencies
```bash
npm install --production
npm run build:production
```

### 1.2 Test Production Build Locally
```bash
npm run start:production
```
Visit `http://localhost:3000` to verify everything works correctly.

## 🌐 Step 2: Configure Hostinger VPS Environment

### 2.1 Access Your VPS
1. Log into your Hostinger account
2. Go to "VPS" → Select your VPS instance
3. Get your SSH credentials (IP, username, password/key)

### 2.2 Connect via SSH
```bash
ssh root@your-vps-ip
# Or if using a non-root user:
ssh username@your-vps-ip
```

### 2.3 Install Node.js and Dependencies
```bash
# Update system packages
apt update && apt upgrade -y

# Install Node.js (using NodeSource repository for latest LTS)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 for process management
npm install -g pm2

# Install other useful tools
apt install -y git nginx certbot python3-certbot-nginx
```

### 2.4 Create Application Directory
```bash
# Create directory for your app
mkdir -p /var/www/forststalstudio
cd /var/www/forststalstudio
```

## 📁 Step 3: Deploy Your Application

### 3.1 Clone Your Repository
```bash
# Clone from GitHub (recommended):
git clone https://github.com/yourusername/forststalstudio.git .

# Or if using different repository:
git clone https://your-git-repository-url.git .
```

### 3.2 Install Dependencies and Build
```bash
# Install Node.js dependencies
npm install

# Install PM2 globally if not already installed
npm install -g pm2

# Build the application
npm run build:production
```

### 3.3 Configure Environment Variables
```bash
# Copy and edit the production environment file
cp .env.example .env.production

# Edit with your actual credentials
nano .env.production
```

Update the following values in `.env.production`:
- Database credentials (if using MySQL)
- SMTP settings for email
- Domain name (forststalstudio.com)
- JWT secrets

## ⚙️ Step 4: Configure Nginx Reverse Proxy

### 4.1 Create Nginx Configuration
```bash
# Create Nginx site configuration
nano /etc/nginx/sites-available/forststalstudio
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name forststalstudio.com www.forststalstudio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets caching
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
}
```

### 4.2 Enable the Site
```bash
# Enable the site
ln -s /etc/nginx/sites-available/forststalstudio /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

## 🏗️ Step 5: Build and Start Application

### 5.1 Build for Production
```bash
npm run build:production
```

### 5.2 Start the Application
Hostinger Business supports multiple ways to run Node.js apps:

#### Option A: Using PM2 (Recommended)
```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem file
nano ecosystem.config.js
```

Add this content:
```javascript
module.exports = {
  apps: [{
    name: 'forststal-studio',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/home/username/public_html',
    instances: 1,
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Option B: Direct Start (Alternative)
```bash
npm run start:production
```

## 🔒 Step 6: SSL and Domain Configuration

### 6.1 Configure SSL Certificate
1. In Hostinger Control Panel, go to "Security" → "SSL"
2. Enable "Force HTTPS" for your domain
3. Verify SSL certificate is properly installed

### 6.2 Update DNS Settings (if needed)
Ensure your domain points to Hostinger's servers:
```
A Record: @ → Your-Server-IP
CNAME Record: www → your-domain.com
```

## 📊 Step 7: Performance Optimization

### 7.1 Enable Gzip Compression
Add to `.htaccess`:
```apache
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
```

### 7.2 Configure Caching
Your Next.js config already includes optimal caching headers.

## 🔧 Step 8: Monitoring and Maintenance

### 8.1 Check Application Status
```bash
# If using PM2:
pm2 status
pm2 logs forststal-studio

# Check Node.js processes:
ps aux | grep node
```

### 8.2 Restart Application (when needed)
```bash
# PM2 restart:
pm2 restart forststal-studio

# Or manual restart:
pkill node
npm run start:production
```

## 🆘 Troubleshooting

### Common Issues and Solutions:

#### 1. "Module not found" errors
```bash
npm install --production
npm rebuild
```

#### 2. Permission errors
```bash
chmod -R 755 public_html/
chown -R username:username public_html/
```

#### 3. Port conflicts
Check if port 3000 is available:
```bash
netstat -tlnp | grep :3000
```

#### 4. Memory issues
Increase Node.js memory limit:
```bash
export NODE_OPTIONS="--max-old-space-size=1024"
npm run start:production
```

## 📈 Step 9: Final Verification

### 9.1 Test Your Website
1. Visit your domain: `https://forststalstudio.com`
2. Test all pages and functionality
3. Verify animations and interactions work
4. Check mobile responsiveness
5. Test contact form (if configured with email)

### 9.2 Performance Testing
Use tools like:
- Google PageSpeed Insights
- GTmetrix
- Pingdom

### 9.3 Expected Performance Metrics
With Hostinger Business, you should achieve:
- ✅ Page load time: < 2 seconds
- ✅ Lighthouse score: 90+
- ✅ First Contentful Paint: < 1.5s
- ✅ Core Web Vitals: All green

## 🔄 Future Updates

### Updating Your Website:
1. Make changes locally
2. Test thoroughly
3. Push to GitHub (if using Git)
4. SSH into Hostinger
5. Pull latest changes: `git pull origin main`
6. Rebuild: `npm run build:production`
7. Restart: `pm2 restart forststal-studio`

## 📞 Support

### Hostinger VPS Features Available:
- ✅ Scalable resources (CPU, RAM, Storage)
- ✅ Full root access and control
- ✅ Ubuntu/CentOS operating system
- ✅ Node.js, Nginx, MySQL support
- ✅ SSH access with full privileges
- ✅ SSL certificate (Let's Encrypt)
- ✅ Backup solutions
- ✅ 24/7 support and monitoring

### Need Help?
- Hostinger Support: Available 24/7 via chat
- Documentation: Check Hostinger's Node.js hosting guide
- Community: Hostinger community forums

## 🎉 Congratulations!

Your ForstvalStudio website is now live on Hostinger VPS with:
- ⚡ High-performance VPS hosting
- 🔒 SSL security with Let's Encrypt
- 📱 Mobile responsiveness
- 🎨 Full animations and interactions
- 🖥️ Full server control and scalability
- 🚀 PM2 process management
- 🔧 Nginx reverse proxy optimization

Your professional portfolio is ready to scale and welcome clients from all domains!
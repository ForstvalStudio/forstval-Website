# ForstvalStudio VPS Deployment Guide

This guide walks you through deploying ForstvalStudio on your VPS with all the new server-side features including database integration, WordPress headless CMS, and dynamic contact forms.

## 🎯 What's New with VPS

Now that you have a VPS, we can implement features that weren't possible with static hosting:

- ✅ **Dynamic Contact Forms** - Store submissions in MySQL database
- ✅ **WordPress Headless CMS** - Full blog system with comments
- ✅ **Database Integration** - MySQL for contacts, comments, newsletter
- ✅ **API Routes** - Server-side processing and validation
- ✅ **Email Notifications** - Automated email responses
- ✅ **Real-time Features** - Dynamic content and interactions

## 📋 Prerequisites

### Server Requirements
- **VPS/Server**: Ubuntu 20.04+ (recommended) or similar Linux distro
- **Node.js**: Version 18.x or higher
- **MySQL**: Version 8.0+ or MariaDB 10.6+
- **Memory**: Minimum 1GB RAM (2GB+ recommended)
- **Storage**: At least 10GB free space
- **Network**: Stable internet connection

### Local Development
- Git installed
- Node.js 18+ installed locally
- Code editor (VS Code recommended)

## 🚀 Step 1: Server Setup

### 1.1 Connect to Your VPS

```bash
ssh root@your-server-ip
# or
ssh your-username@your-server-ip
```

### 1.2 Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.3 Install Node.js 18.x

```bash
# Install NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show npm version
```

### 1.4 Install MySQL

```bash
# Install MySQL Server
sudo apt install mysql-server -y

# Secure MySQL installation
sudo mysql_secure_installation

# Log into MySQL and create database
sudo mysql -u root -p
```

### 1.5 Create Database and User

```sql
-- Create database
CREATE DATABASE forststal_studio;

-- Create user (replace 'your_password' with a strong password)
CREATE USER 'forststal_user'@'localhost' IDENTIFIED BY 'your_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON forststal_studio.* TO 'forststal_user'@'localhost';

-- Flush privileges and exit
FLUSH PRIVILEGES;
EXIT;
```

### 1.6 Install PM2 Globally

```bash
sudo npm install -g pm2
```

### 1.7 Install Git (if not already installed)

```bash
sudo apt install git -y
```

## 🛠️ Step 2: Application Deployment

### 2.1 Clone Repository

```bash
# Navigate to your web directory
cd /var/www

# Clone your repository (replace with your actual repo URL)
sudo git clone https://github.com/your-username/ForstvalStudio.git forststal-studio

# Change ownership
sudo chown -R $USER:$USER /var/www/forststal-studio

# Navigate to project directory
cd forststal-studio
```

### 2.2 Configure Environment Variables

```bash
# Copy environment example
cp .env.example .env.local

# Edit environment file
nano .env.local
```

**Update .env.local with your actual values:**

```env
# Database Configuration
DB_HOST=localhost
DB_USER=forststal_user
DB_PASSWORD=your_password
DB_NAME=forststal_studio

# WordPress Configuration (optional)
WORDPRESS_API_URL=https://yourblog.com/wp-json/wp/v2
WORDPRESS_AUTH_TOKEN=your_wp_auth_token

# Email Configuration
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your_email@domain.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@forststalstudio.com

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Site Configuration
SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2.3 Run Automated Deployment

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

The deployment script will:
- Install dependencies
- Build the application
- Initialize the database
- Start the application with PM2
- Configure security settings
- Run health checks

### 2.4 Manual Database Initialization (if needed)

If the automated deployment doesn't initialize the database:

```bash
# Run database initialization script
node scripts/init-db.js
```

## 🔧 Step 3: Web Server Configuration

### 3.1 Install Nginx (Recommended)

```bash
sudo apt install nginx -y
```

### 3.2 Configure Nginx

```bash
# Create site configuration
sudo nano /etc/nginx/sites-available/forststalstudio.com
```

**Add this configuration:**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
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
        proxy_read_timeout 86400;
    }
    
    # Cache static files
    location /_next/static {
        proxy_cache STATIC;
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # Cache images
    location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000";
    }
}
```

### 3.3 Enable Site and Restart Nginx

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/forststalstudio.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 3.4 Setup SSL Certificate (Free with Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## 📧 Step 4: WordPress Setup (Optional)

If you want to use WordPress as a headless CMS for your blog:

### 4.1 Install WordPress

```bash
# Create WordPress directory
sudo mkdir -p /var/www/blog
cd /var/www/blog

# Download WordPress
sudo wget https://wordpress.org/latest.tar.gz
sudo tar -xzf latest.tar.gz --strip-components=1
sudo rm latest.tar.gz

# Set permissions
sudo chown -R www-data:www-data /var/www/blog
```

### 4.2 Create WordPress Database

```sql
-- Log into MySQL
sudo mysql -u root -p

-- Create WordPress database
CREATE DATABASE wordpress_blog;
CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'wp_password';
GRANT ALL PRIVILEGES ON wordpress_blog.* TO 'wp_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4.3 Configure WordPress

```bash
# Copy config file
sudo cp wp-config-sample.php wp-config.php

# Edit configuration
sudo nano wp-config.php
```

Update database settings in wp-config.php and add:

```php
// Enable REST API
define('WP_REST_API', true);

// CORS headers for API access
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: https://yourdomain.com');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
});
```

## 🔍 Step 5: Testing and Verification

### 5.1 Test Application

```bash
# Check PM2 status
pm2 status

# View application logs
pm2 logs forststal-studio

# Test health endpoint
curl http://localhost:3000/api/health

# Test from external
curl https://yourdomain.com/api/health
```

### 5.2 Test Database Connection

```bash
# Test database initialization
node scripts/init-db.js
```

### 5.3 Test Contact Form

Visit `https://yourdomain.com/contact` and submit a test form to verify:
- Form submission works
- Database storage works
- Email notifications work

### 5.4 Test Blog Integration

If you set up WordPress, visit `https://yourdomain.com/blog` to verify:
- WordPress API connection
- Blog posts display
- Comments system works

## 🎛️ Step 6: Monitoring and Maintenance

### 6.1 Setup PM2 Monitoring

```bash
# Install PM2 monitoring
pm2 install pm2-logrotate

# Setup monitoring dashboard (optional)
pm2 install pm2-server-monit
```

### 6.2 Automated Backups

```bash
# Create backup script
sudo nano /usr/local/bin/backup-forststal.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/forststal"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/app_$DATE.tar.gz -C /var/www forststal-studio

# Backup database
mysqldump -u forststal_user -p forststal_studio > $BACKUP_DIR/db_$DATE.sql

# Keep only last 7 backups
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-forststal.sh

# Add to crontab for daily backups
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-forststal.sh
```

### 6.3 Log Monitoring

```bash
# View real-time logs
pm2 logs forststal-studio --lines 100

# Monitor system resources
pm2 monit
```

## 🚨 Troubleshooting

### Common Issues and Solutions

#### Application Won't Start
```bash
# Check PM2 logs
pm2 logs forststal-studio

# Check Node.js version
node --version

# Rebuild application
cd /var/www/forststal-studio
npm run build
pm2 restart forststal-studio
```

#### Database Connection Issues
```bash
# Test MySQL connection
mysql -u forststal_user -p -h localhost forststal_studio

# Check database service
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql
```

#### Email Not Working
```bash
# Test SMTP settings
node -e "
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransporter({
  host: 'your-smtp-host',
  port: 587,
  auth: { user: 'your-email', pass: 'your-password' }
});
transport.verify().then(console.log).catch(console.error);
"
```

#### WordPress API Issues
- Check CORS headers in WordPress
- Verify API endpoint URLs
- Test authentication tokens

### Performance Optimization

#### Enable Server Caching
```bash
# Install Redis for caching
sudo apt install redis-server -y
```

#### Optimize MySQL
```bash
# Edit MySQL configuration
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# Add optimizations:
[mysqld]
innodb_buffer_pool_size = 256M
query_cache_type = 1
query_cache_size = 64M
```

## 📚 Additional Resources

- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [MySQL Performance Tuning](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [Nginx Configuration Guide](https://nginx.org/en/docs/beginners_guide.html)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review application logs: `pm2 logs forststal-studio`
3. Test individual components (database, WordPress, email)
4. Check server resources: `htop`, `df -h`, `free -m`

---

**Congratulations!** 🎉 Your ForstvalStudio is now fully deployed with all server-side features on your VPS!
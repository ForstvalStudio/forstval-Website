# Complete Hostinger Business Setup Guide
## Step-by-Step ForstvalStudio Deployment

### 🔐 Security Notice
**NEVER share SSH passwords publicly!** This guide will help you deploy safely.

---

## Method 1: File Transfer via Hostinger File Manager (Recommended for Beginners)

### Step 1: Prepare Your Files for Upload

1. **Create a deployment zip file** on your computer:
   ```bash
   # On Windows (in your project folder)
   # Right-click your ForstvalStudio folder → Send to → Compressed folder
   # OR use PowerShell:
   Compress-Archive -Path "C:\Users\yashw\Downloads\ForstvalStudio\*" -DestinationPath "C:\Users\yashw\Downloads\forststal-studio-deploy.zip"
   ```

2. **Exclude unnecessary files** (create a clean zip with only these folders/files):
   ```
   ✅ Include:
   - src/ (entire folder)
   - public/ (entire folder)
   - package.json
   - package-lock.json
   - next.config.mjs
   - tailwind.config.ts
   - tsconfig.json
   - postcss.config.mjs
   - .env.example
   - ecosystem.config.js
   - deploy.sh
   - HOSTINGER-DEPLOYMENT.md
   
   ❌ Exclude:
   - node_modules/
   - .next/
   - .git/
   - scripts/
   - past.txt
   - plan.md
   ```

### Step 2: Upload via Hostinger File Manager

1. **Log into Hostinger Control Panel**
   - Go to: https://hostinger.com
   - Click "Login" → Enter your credentials

2. **Access File Manager**
   - Go to "Hosting" → Select your domain
   - Click "File Manager" in the left sidebar

3. **Navigate to public_html**
   - Click on "public_html" folder
   - This is where your website files go

4. **Upload Your Files**
   - Click "Upload" button
   - Select your forststal-studio-deploy.zip file
   - Wait for upload to complete
   - Right-click the zip file → "Extract"
   - Delete the zip file after extraction

### Step 3: Set File Permissions
1. Select all uploaded files
2. Right-click → "Permissions" 
3. Set folders to 755, files to 644

---

## Method 2: SSH File Transfer (Advanced Users)

### Step 1: Connect via SSH
```bash
ssh your-username@your-domain.com
# Enter your password when prompted
```

### Step 2: Navigate to Website Directory
```bash
cd public_html
# Clear existing files if needed
rm -rf *
```

### Step 3: Upload Files
**Option A: Using Git (if you have a repository)**
```bash
git clone https://github.com/yourusername/ForstvalStudio.git .
```

**Option B: Using SCP (from your local machine)**
```bash
scp -r C:\Users\yashw\Downloads\ForstvalStudio/* your-username@your-domain.com:~/public_html/
```

---

## Part 2: Server Setup and Deployment

### Step 1: Connect to Your Server via SSH

1. **Open Terminal/Command Prompt**
   ```bash
   ssh your-username@your-domain.com
   ```

2. **Navigate to your website directory**
   ```bash
   cd public_html
   ls -la  # Verify your files are there
   ```

### Step 2: Install Node.js (if not already installed)

```bash
# Check if Node.js is installed
node --version

# If not installed, install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 3: Install Dependencies

```bash
# Install project dependencies
npm install --production

# Install PM2 globally
npm install -g pm2
```

### Step 4: Configure Environment

```bash
# Copy environment file
cp .env.example .env.production

# Edit environment file with your domain
nano .env.production
```

**Edit .env.production** with these values:
```env
SITE_URL=https://your-actual-domain.com
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```
Press `Ctrl+X`, then `Y`, then `Enter` to save.

### Step 5: Build the Application

```bash
# Build for production
npm run build:production
```

### Step 6: Start with PM2

```bash
# Make deploy script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

### Step 7: Configure Web Server

**Create or edit .htaccess** in public_html:
```bash
nano .htaccess
```

Add this content:
```apache
# Redirect all traffic to Node.js app
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache static files
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header append Cache-Control "public, immutable"
</filesMatch>
```

---

## Part 3: Domain and SSL Setup

### Step 1: Configure Domain DNS

1. **In Hostinger Control Panel**
   - Go to "Domains" → Select your domain
   - Go to "DNS Zone"
   - Ensure A record points to your server IP

### Step 2: Enable SSL Certificate

1. **In Hostinger Control Panel**
   - Go to "Security" → "SSL"
   - Click "Activate" for your domain
   - Enable "Force HTTPS"

### Step 3: Update PM2 Configuration

```bash
# Edit ecosystem config with your actual domain
nano ecosystem.config.js
```

Update the domain references:
```javascript
// Change this line:
'post-deploy': 'npm install --production && npm run build:production && pm2 reload ecosystem.config.js --env production && pm2 save',

// And update the path to your actual username:
cwd: '/home/your-actual-username/public_html',
```

---

## Part 4: Testing and Verification

### Step 1: Test Your Website

1. **Check PM2 status**
   ```bash
   pm2 status
   pm2 logs forststal-studio
   ```

2. **Test local connection**
   ```bash
   curl http://localhost:3000
   ```

3. **Visit your domain**
   - Open browser and go to https://your-domain.com

### Step 2: Performance Testing

1. **Test with Google PageSpeed**
   - Go to: https://pagespeed.web.dev/
   - Enter your domain URL

2. **Check all pages work**
   - Home page
   - Services page
   - Portfolio page
   - About page
   - Contact page

### Step 3: Monitor Application

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs forststal-studio --lines 50

# Restart if needed
pm2 restart forststal-studio
```

---

## Part 5: Troubleshooting Common Issues

### Issue 1: "Module not found" errors
```bash
cd public_html
npm install --production
pm2 restart forststal-studio
```

### Issue 2: Permission denied
```bash
chmod -R 755 public_html/
chown -R your-username:your-username public_html/
```

### Issue 3: Port already in use
```bash
pm2 stop all
pm2 start ecosystem.config.js
```

### Issue 4: Build fails
```bash
# Clean and rebuild
npm run clean
npm install --production
npm run build:production
```

---

## Part 6: Maintenance Commands

### Regular Maintenance
```bash
# Check status
pm2 status

# View logs
pm2 logs

# Restart application
pm2 restart forststal-studio

# Save current PM2 processes
pm2 save

# Update application
git pull origin main  # If using Git
npm install --production
npm run build:production
pm2 reload forststal-studio
```

### Emergency Commands
```bash
# Stop everything
pm2 stop all

# Kill all processes
pm2 kill

# Start fresh
pm2 start ecosystem.config.js
```

---

## 🎉 Success Checklist

- [ ] Files uploaded to Hostinger successfully
- [ ] Node.js and PM2 installed
- [ ] Dependencies installed without errors
- [ ] Production build completed successfully
- [ ] PM2 application running (pm2 status shows "online")
- [ ] Domain points to your server
- [ ] SSL certificate activated and HTTPS working
- [ ] Website loads at https://your-domain.com
- [ ] All pages (Home, Services, Portfolio, About, Contact) working
- [ ] Contact form functional
- [ ] Animations and interactions working
- [ ] Mobile responsiveness verified
- [ ] PageSpeed score > 90

---

## 🆘 Need Help?

### Hostinger Support
- 24/7 Live Chat in your control panel
- Email: support@hostinger.com
- Knowledge Base: support.hostinger.com

### Check Logs
```bash
# PM2 logs
pm2 logs forststal-studio

# System logs
tail -f /var/log/syslog

# Check running processes
ps aux | grep node
```

### Contact Information
If you encounter issues, gather this information:
- Error messages from PM2 logs
- Browser console errors
- Server response codes
- PM2 status output

---

**🚀 Your ForstvalStudio website should now be live and running on Hostinger Business!**

Visit https://your-domain.com to see your tech-inclusive portfolio in action.
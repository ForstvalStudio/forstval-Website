module.exports = {
  apps: [{
    name: 'forststal-studio',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/home/username/public_html', // Update with your actual path
    instances: 'max', // Use all available CPU cores
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      SITE_URL: 'http://localhost:3000',
      NEXT_TELEMETRY_DISABLED: 1
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      SITE_URL: 'https://forststalstudio.com',
      NEXT_TELEMETRY_DISABLED: 1,
      // Database configuration
      DB_HOST: 'localhost',
      DB_NAME: 'forststal_studio',
      // Email configuration  
      SMTP_HOST: 'smtp.hostinger.com',
      SMTP_PORT: 587,
      FROM_EMAIL: 'noreply@forststalstudio.com'
    },
    // Logging configuration
    log_file: 'logs/combined.log',
    out_file: 'logs/out.log',
    error_file: 'logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Restart policy
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Health monitoring
    health_check_grace_period: 3000,
    health_check_fatal_exceptions: true,
    
    // Advanced PM2 features for production
    merge_logs: true,
    autorestart: true,
    
    // Environment-specific configurations
    node_args: '--max-old-space-size=1024',
    
    // Graceful shutdown
    kill_timeout: 5000,
    listen_timeout: 3000,
    
    // Process monitoring
    ignore_watch: ['node_modules', 'logs', '.next'],
    
    // Custom startup script
    post_update: ['npm install --production', 'npm run build:production'],
    
    // Error handling
    exp_backoff_restart_delay: 100,
    
    // Advanced logging
    combine_logs: true,
    force: true
  }],
  
  // Deployment configuration for automated deployments
  deploy: {
    production: {
      user: 'username', // Replace with your Hostinger username
      host: 'forststalstudio.com', // Replace with your domain
      ref: 'origin/main',
      repo: 'https://github.com/yourusername/ForstvalStudio.git', // Replace with your repo
      path: '/home/username/public_html',
      'post-deploy': 'npm install --production && npm run build:production && pm2 reload ecosystem.config.js --env production && pm2 save',
      'pre-setup': 'mkdir -p logs',
      'post-setup': 'pm2 install pm2-logrotate'
    }
  }
};
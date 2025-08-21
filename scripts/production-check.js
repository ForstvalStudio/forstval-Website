#!/usr/bin/env node

/**
 * ForstvalStudio Production Readiness Checker
 * Validates that the application is ready for Hostinger Business deployment
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class ProductionChecker {
  constructor() {
    this.checks = [];
    this.passed = 0;
    this.failed = 0;
    this.warnings = 0;
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  success(message) {
    this.log(`✅ ${message}`, 'green');
    this.passed++;
  }

  error(message) {
    this.log(`❌ ${message}`, 'red');
    this.failed++;
  }

  warning(message) {
    this.log(`⚠️  ${message}`, 'yellow');
    this.warnings++;
  }

  info(message) {
    this.log(`ℹ️  ${message}`, 'blue');
  }

  header(message) {
    this.log(`\n${colors.bright}${colors.cyan}${message}${colors.reset}`);
    this.log('='.repeat(message.length), 'cyan');
  }

  // Check if required files exist
  checkRequiredFiles() {
    this.header('📁 Checking Required Files');
    
    const requiredFiles = [
      'package.json',
      'next.config.mjs',
      'tailwind.config.ts',
      'tsconfig.json',
      '.env.example',
      'ecosystem.config.js',
      'deploy.sh',
      'HOSTINGER-DEPLOYMENT.md'
    ];

    requiredFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.success(`${file} exists`);
      } else {
        this.error(`${file} is missing`);
      }
    });

    // Check for source directories
    const requiredDirs = ['src', 'public', 'src/app', 'src/components'];
    requiredDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        this.success(`${dir}/ directory exists`);
      } else {
        this.error(`${dir}/ directory is missing`);
      }
    });
  }

  // Check package.json configuration
  checkPackageJson() {
    this.header('📦 Checking Package Configuration');
    
    try {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      // Check required scripts
      const requiredScripts = ['build', 'start', 'build:production', 'start:production'];
      requiredScripts.forEach(script => {
        if (pkg.scripts && pkg.scripts[script]) {
          this.success(`Script "${script}" is configured`);
        } else {
          this.error(`Script "${script}" is missing`);
        }
      });

      // Check essential dependencies
      const requiredDeps = ['next', 'react', 'react-dom', 'framer-motion', 'tailwindcss'];
      requiredDeps.forEach(dep => {
        if (pkg.dependencies && pkg.dependencies[dep]) {
          this.success(`Dependency "${dep}" is installed`);
        } else {
          this.error(`Dependency "${dep}" is missing`);
        }
      });

      // Check Node.js version compatibility
      if (pkg.engines && pkg.engines.node) {
        this.success(`Node.js version specified: ${pkg.engines.node}`);
      } else {
        this.warning('Node.js version not specified in package.json');
      }

    } catch (error) {
      this.error('Failed to parse package.json');
    }
  }

  // Check Next.js configuration
  checkNextConfig() {
    this.header('⚙️  Checking Next.js Configuration');
    
    try {
      const nextConfigPath = 'next.config.mjs';
      if (fs.existsSync(nextConfigPath)) {
        const configContent = fs.readFileSync(nextConfigPath, 'utf8');
        
        // Check for production optimizations
        const productionFeatures = [
          'output: \'standalone\'',
          'compress: true',
          'images:',
          'headers:',
          'X-Content-Type-Options',
          'X-Frame-Options'
        ];

        productionFeatures.forEach(feature => {
          if (configContent.includes(feature)) {
            this.success(`Production feature configured: ${feature}`);
          } else {
            this.warning(`Production feature missing: ${feature}`);
          }
        });
      } else {
        this.error('next.config.mjs not found');
      }
    } catch (error) {
      this.error('Failed to check Next.js configuration');
    }
  }

  // Check environment configuration
  checkEnvironmentConfig() {
    this.header('🌍 Checking Environment Configuration');
    
    // Check .env.example
    if (fs.existsSync('.env.example')) {
      this.success('.env.example file exists');
      const envContent = fs.readFileSync('.env.example', 'utf8');
      
      const requiredEnvVars = ['SITE_URL', 'NODE_ENV'];
      requiredEnvVars.forEach(envVar => {
        if (envContent.includes(envVar)) {
          this.success(`Environment variable template: ${envVar}`);
        } else {
          this.warning(`Missing environment variable template: ${envVar}`);
        }
      });
    } else {
      this.error('.env.example file is missing');
    }

    // Check for production environment file
    if (fs.existsSync('.env.production')) {
      this.success('.env.production file exists');
    } else {
      this.warning('.env.production file not found (will be created during deployment)');
    }
  }

  // Check PM2 configuration
  checkPM2Config() {
    this.header('🔄 Checking PM2 Configuration');
    
    try {
      if (fs.existsSync('ecosystem.config.js')) {
        this.success('PM2 ecosystem configuration exists');
        
        const pm2Config = require(path.resolve('ecosystem.config.js'));
        if (pm2Config.apps && pm2Config.apps.length > 0) {
          const app = pm2Config.apps[0];
          
          // Check essential PM2 configuration
          if (app.name) this.success(`App name configured: ${app.name}`);
          if (app.script) this.success(`Script configured: ${app.script}`);
          if (app.env && app.env.NODE_ENV === 'production') {
            this.success('Production environment configured');
          } else {
            this.warning('Production environment not properly configured');
          }
        }
      } else {
        this.error('ecosystem.config.js not found');
      }
    } catch (error) {
      this.error('Failed to validate PM2 configuration');
    }
  }

  // Check build configuration
  checkBuildConfig() {
    this.header('🏗️  Checking Build Configuration');
    
    try {
      // Check TypeScript configuration
      if (fs.existsSync('tsconfig.json')) {
        this.success('TypeScript configuration exists');
        const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
        if (tsConfig.compilerOptions && tsConfig.compilerOptions.strict) {
          this.success('Strict TypeScript checking enabled');
        } else {
          this.warning('Strict TypeScript checking not enabled');
        }
      }

      // Check Tailwind configuration
      if (fs.existsSync('tailwind.config.ts')) {
        this.success('Tailwind CSS configuration exists');
      } else if (fs.existsSync('tailwind.config.js')) {
        this.success('Tailwind CSS configuration exists (JS)');
      } else {
        this.error('Tailwind CSS configuration not found');
      }

      // Check PostCSS configuration
      if (fs.existsSync('postcss.config.mjs') || fs.existsSync('postcss.config.js')) {
        this.success('PostCSS configuration exists');
      } else {
        this.warning('PostCSS configuration not found');
      }

    } catch (error) {
      this.error('Failed to check build configuration');
    }
  }

  // Test production build
  async testProductionBuild() {
    this.header('🔨 Testing Production Build');
    
    try {
      this.info('Running production build test...');
      execSync('npm run build:production', { stdio: 'pipe' });
      this.success('Production build completed successfully');
      
      // Check if .next directory was created
      if (fs.existsSync('.next')) {
        this.success('.next build directory created');
        
        // Check for key build outputs
        const buildOutputs = ['.next/server', '.next/static'];
        buildOutputs.forEach(output => {
          if (fs.existsSync(output)) {
            this.success(`Build output exists: ${output}`);
          } else {
            this.warning(`Build output missing: ${output}`);
          }
        });
      } else {
        this.error('.next build directory not created');
      }
      
    } catch (error) {
      this.error(`Production build failed: ${error.message}`);
    }
  }

  // Check security configurations
  checkSecurity() {
    this.header('🔒 Checking Security Configuration');
    
    // Check for sensitive files that shouldn't be deployed
    const sensitivePatterns = ['.env.local', '.env.development', 'npm-debug.log', 'yarn-error.log'];
    sensitivePatterns.forEach(pattern => {
      if (!fs.existsSync(pattern)) {
        this.success(`Sensitive file not present: ${pattern}`);
      } else {
        this.error(`Sensitive file found: ${pattern} (should not be in production)`);
      }
    });

    // Check .gitignore
    if (fs.existsSync('.gitignore')) {
      this.success('.gitignore exists');
      const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
      const requiredIgnores = ['.env.local', 'node_modules', '.next'];
      requiredIgnores.forEach(ignore => {
        if (gitignoreContent.includes(ignore)) {
          this.success(`Gitignore includes: ${ignore}`);
        } else {
          this.warning(`Gitignore missing: ${ignore}`);
        }
      });
    } else {
      this.error('.gitignore not found');
    }
  }

  // Check deployment readiness
  checkDeploymentReadiness() {
    this.header('🚀 Checking Deployment Readiness');
    
    // Check deployment script permissions
    if (fs.existsSync('deploy.sh')) {
      this.success('Deployment script exists');
      try {
        const stats = fs.statSync('deploy.sh');
        if (stats.mode & parseInt('111', 8)) {
          this.success('Deployment script is executable');
        } else {
          this.warning('Deployment script may need execute permissions');
        }
      } catch (error) {
        this.warning('Could not check deployment script permissions');
      }
    } else {
      this.error('Deployment script not found');
    }

    // Check documentation
    if (fs.existsSync('HOSTINGER-DEPLOYMENT.md')) {
      this.success('Deployment documentation exists');
    } else {
      this.error('Deployment documentation missing');
    }
  }

  // Generate final report
  generateReport() {
    this.header('📊 Production Readiness Report');
    
    const total = this.passed + this.failed + this.warnings;
    const successRate = total > 0 ? Math.round((this.passed / total) * 100) : 0;
    
    console.log(`\n${colors.bright}Summary:${colors.reset}`);
    console.log(`${colors.green}✅ Passed: ${this.passed}${colors.reset}`);
    console.log(`${colors.red}❌ Failed: ${this.failed}${colors.reset}`);
    console.log(`${colors.yellow}⚠️  Warnings: ${this.warnings}${colors.reset}`);
    console.log(`${colors.blue}📈 Success Rate: ${successRate}%${colors.reset}`);
    
    if (this.failed === 0) {
      this.log(`\n🎉 Application is ready for Hostinger Business deployment!`, 'green');
      this.log(`\nNext steps:`, 'cyan');
      this.log(`1. Upload files to your Hostinger server`, 'blue');
      this.log(`2. Run the deployment script: ./deploy.sh`, 'blue');
      this.log(`3. Configure your domain and SSL`, 'blue');
      this.log(`4. Test the live application`, 'blue');
    } else {
      this.log(`\n⚠️  Please fix ${this.failed} error(s) before deploying to production.`, 'red');
    }

    if (this.warnings > 0) {
      this.log(`\nℹ️  Consider addressing ${this.warnings} warning(s) for optimal performance.`, 'yellow');
    }
  }

  // Run all checks
  async runAllChecks() {
    this.log(`${colors.bright}${colors.magenta}ForstvalStudio Production Readiness Checker${colors.reset}`);
    this.log(`${colors.cyan}Checking deployment readiness for Hostinger Business...${colors.reset}\n`);

    this.checkRequiredFiles();
    this.checkPackageJson();
    this.checkNextConfig();
    this.checkEnvironmentConfig();
    this.checkPM2Config();
    this.checkBuildConfig();
    await this.testProductionBuild();
    this.checkSecurity();
    this.checkDeploymentReadiness();
    
    this.generateReport();
  }
}

// Run the checker
if (require.main === module) {
  const checker = new ProductionChecker();
  checker.runAllChecks().catch(error => {
    console.error('Production check failed:', error);
    process.exit(1);
  });
}

module.exports = ProductionChecker;
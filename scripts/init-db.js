#!/usr/bin/env node

/**
 * Database Initialization Script
 * Run this script to set up the MySQL database for ForstvalStudio
 */

const { initDatabase } = require('../src/lib/database');

async function main() {
  console.log('🔧 Initializing ForstvalStudio database...');
  
  try {
    await initDatabase();
    console.log('✅ Database initialized successfully!');
    console.log('\nTables created:');
    console.log('  • contacts - Store contact form submissions');
    console.log('  • blog_posts - Cache WordPress posts locally');
    console.log('  • comments - Store blog comments');
    console.log('  • newsletter_subscribers - Store newsletter subscriptions');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:');
    console.error(error.message);
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('\n🔍 Troubleshooting:');
      console.error('  • Check if MySQL is running');
      console.error('  • Verify database credentials in .env file');
      console.error('  • Ensure database exists or user has CREATE privileges');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n🔍 Database access denied:');
      console.error('  • Check username and password in .env file');
      console.error('  • Verify user has necessary permissions');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('\n🔍 Database not found:');
      console.error('  • Create the database manually or ensure user has CREATE privileges');
      console.error('  • Check database name in .env file');
    }
    
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the script
main();
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'forststal_studio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

export async function executeQuery<T = any>(query: string, params?: any[]): Promise<T> {
  const connection = await getConnection();
  const [rows] = await connection.execute(query, params || []);
  return rows as T;
}

export async function initDatabase() {
  const connection = await getConnection();
  
  // Create contacts table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      phone VARCHAR(50),
      service_type VARCHAR(100),
      project_type VARCHAR(100),
      budget_range VARCHAR(50),
      timeline VARCHAR(50),
      message TEXT,
      status ENUM('new', 'contacted', 'in_progress', 'completed') DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_status (status),
      INDEX idx_created_at (created_at)
    )
  `);

  // Create blog_posts table (for WordPress integration)
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      wp_id INT UNIQUE,
      title VARCHAR(500) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      content LONGTEXT,
      excerpt TEXT,
      author VARCHAR(255),
      featured_image VARCHAR(500),
      categories JSON,
      tags JSON,
      status ENUM('publish', 'draft', 'private') DEFAULT 'draft',
      published_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_slug (slug),
      INDEX idx_status (status),
      INDEX idx_published_at (published_at)
    )
  `);

  // Create comments table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT NOT NULL,
      parent_id INT NULL,
      author_name VARCHAR(255) NOT NULL,
      author_email VARCHAR(255) NOT NULL,
      author_website VARCHAR(500),
      content TEXT NOT NULL,
      status ENUM('approved', 'pending', 'spam') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_post_id (post_id),
      INDEX idx_parent_id (parent_id),
      INDEX idx_status (status)
    )
  `);

  // Create newsletter_subscribers table
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      status ENUM('active', 'unsubscribed', 'bounced') DEFAULT 'active',
      subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      unsubscribed_at TIMESTAMP NULL,
      INDEX idx_email (email),
      INDEX idx_status (status)
    )
  `);

  console.log('Database tables initialized successfully');
}
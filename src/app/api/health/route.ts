import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/database';

export async function GET() {
  try {
    // Check database connection
    let dbStatus = 'disconnected';
    let dbError = null;
    
    try {
      const connection = await getConnection();
      await connection.execute('SELECT 1');
      dbStatus = 'connected';
    } catch (error) {
      dbError = error instanceof Error ? error.message : 'Unknown database error';
    }

    // Check WordPress API (if configured)
    let wpStatus = 'not_configured';
    let wpError = null;
    
    if (process.env.WORDPRESS_API_URL) {
      try {
        const wpResponse = await fetch(`${process.env.WORDPRESS_API_URL}/posts?per_page=1`, {
          headers: {
            'Authorization': process.env.WORDPRESS_AUTH_TOKEN ? 
              `Bearer ${process.env.WORDPRESS_AUTH_TOKEN}` : '',
          },
          // Don't cache health check requests
          cache: 'no-store'
        });
        
        if (wpResponse.ok) {
          wpStatus = 'connected';
        } else {
          wpStatus = 'error';
          wpError = `HTTP ${wpResponse.status}`;
        }
      } catch (error) {
        wpStatus = 'error';
        wpError = error instanceof Error ? error.message : 'Unknown WordPress error';
      }
    }

    // Overall health status
    const isHealthy = dbStatus === 'connected' && 
                     (wpStatus === 'connected' || wpStatus === 'not_configured');

    const healthData = {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      services: {
        database: {
          status: dbStatus,
          error: dbError
        },
        wordpress: {
          status: wpStatus,
          error: wpError
        },
        email: {
          status: process.env.SMTP_HOST ? 'configured' : 'not_configured'
        }
      }
    };

    return NextResponse.json(healthData, {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { 
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
}
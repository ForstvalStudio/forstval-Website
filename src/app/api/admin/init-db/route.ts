import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Simple authentication - in production, use proper admin authentication
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('key');
    
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize database
    await initDatabase();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Database initialized successfully',
        tables: [
          'contacts - Contact form submissions',
          'blog_posts - WordPress posts cache',
          'comments - Blog comments',
          'newsletter_subscribers - Newsletter subscriptions'
        ]
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Database initialization error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database initialization failed',
        error: process.env.NODE_ENV === 'development' ? String(error) : 'Internal server error'
      },
      { status: 500 }
    );
  }
}
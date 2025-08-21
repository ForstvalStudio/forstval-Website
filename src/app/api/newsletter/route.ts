import { NextRequest, NextResponse } from 'next/server';
import { NewsletterSchema } from '@/lib/validations';
import { executeQuery } from '@/lib/database';
import { sendNewsletterWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = NewsletterSchema.parse(body);
    
    // Check if email already exists
    const existing = await executeQuery(
      'SELECT id, status FROM newsletter_subscribers WHERE email = ?',
      [validatedData.email]
    );

    if ((existing as any[]).length > 0) {
      const subscriber = (existing as any[])[0];
      
      if (subscriber.status === 'active') {
        return NextResponse.json(
          { success: false, message: 'You\'re already subscribed to our newsletter!' },
          { status: 409 }
        );
      }
      
      // Reactivate if previously unsubscribed
      await executeQuery(
        'UPDATE newsletter_subscribers SET status = "active", name = ?, subscribed_at = NOW(), unsubscribed_at = NULL WHERE email = ?',
        [validatedData.name || null, validatedData.email]
      );
    } else {
      // Insert new subscriber
      await executeQuery(
        'INSERT INTO newsletter_subscribers (email, name, status) VALUES (?, ?, "active")',
        [validatedData.email, validatedData.name || null]
      );
    }

    // Send welcome email
    try {
      await sendNewsletterWelcomeEmail(validatedData.email, validatedData.name);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Continue even if email fails - subscription is still active
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for subscribing! Check your email for confirmation.' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please provide a valid email address.',
          errors: (error as any).errors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sorry, something went wrong. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email address required' },
        { status: 400 }
      );
    }

    await executeQuery(
      'UPDATE newsletter_subscribers SET status = "unsubscribed", unsubscribed_at = NOW() WHERE email = ?',
      [email]
    );

    return NextResponse.json(
      { success: true, message: 'You have been unsubscribed successfully.' }
    );
    
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to unsubscribe. Please try again.' },
      { status: 500 }
    );
  }
}
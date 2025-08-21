import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema } from '@/lib/validations';
import { executeQuery } from '@/lib/database';
import { sendContactFormEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = ContactFormSchema.parse(body);
    
    // Save to database
    const result = await executeQuery(
      `INSERT INTO contacts (
        name, email, company, phone, service_type, project_type, 
        budget_range, timeline, message, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
      [
        validatedData.name,
        validatedData.email,
        validatedData.company || null,
        validatedData.phone || null,
        validatedData.serviceType,
        validatedData.projectType,
        validatedData.budgetRange,
        validatedData.timeline,
        validatedData.message
      ]
    );

    // Send email notification
    try {
      await sendContactFormEmail(validatedData);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue even if email fails - contact is still saved
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! We\'ll get back to you within 24 hours.',
        id: (result as any).insertId 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your form data and try again.',
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

// GET endpoint for admin to retrieve contacts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = 'SELECT * FROM contacts';
    let params: any[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const contacts = await executeQuery(query, params);

    return NextResponse.json({ success: true, contacts });
    
  } catch (error) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve contacts' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { 
          error: 'Name, email, and message are required fields.'
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          error: 'Please provide a valid email address.'
        },
        { status: 400 }
      );
    }

    // Log successful contact form submission
    console.log('Contact form submitted:', {
      hasName: !!body.name,
      hasEmail: !!body.email,
      hasMessage: !!body.message,
      hasCompany: !!body.company
    });

    // TODO: Process contact form (send email, save to CRM, etc.)
    // This would integrate with your Zoho CRM or email service
    
    return NextResponse.json({ 
      success: true,
      message: 'Thank you for your message. We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form processing failed:', error);

    return NextResponse.json(
      { 
        error: 'An error occurred processing your request'
      },
      { status: 500 }
    );
  }
}
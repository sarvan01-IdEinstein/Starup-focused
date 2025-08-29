import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { zohoCRM } from '@/lib/zoho/index';

// Newsletter subscription validation schema
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  interests: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if Zoho is configured
    if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Zoho configuration not available' },
        { status: 503 }
      )
    }

    const body = await request.json();
    
    // Validate input
    const validatedData = newsletterSchema.parse(body);
    
    console.log('📧 Processing newsletter subscription for:', validatedData.email)
    
    // Check if contact already exists in Zoho CRM
    const contact = await zohoCRM.findContactByEmail(validatedData.email);
    
    if (contact) {
      // Update existing contact to mark as newsletter subscriber
      console.log('📝 Updating existing contact for newsletter subscription')
      await zohoCRM.updateContact(contact.id, {
        Newsletter_Subscription: 'Subscribed',
        Newsletter_Subscribed_Date: new Date().toISOString(),
        Lead_Source: 'Newsletter Subscription'
      });
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to newsletter! You\'re already in our system.',
          contactId: contact.id
        },
        { status: 200 }
      );
    } else {
      // Create new contact for newsletter subscription
      console.log('📝 Creating new contact for newsletter subscription')
      
      // Parse name if provided, otherwise use email prefix
      let firstName = 'Newsletter';
      let lastName = 'Subscriber';
      
      if (validatedData.name) {
        const nameParts = validatedData.name.split(' ');
        firstName = nameParts[0] || 'Newsletter';
        lastName = nameParts.slice(1).join(' ') || 'Subscriber';
      } else {
        // Use email prefix as first name
        firstName = validatedData.email.split('@')[0] || 'Newsletter';
        lastName = 'Subscriber';
      }
      
      const newContact = await zohoCRM.createContact({
        email: validatedData.email,
        first_name: firstName,
        last_name: lastName
      });
      
      // Update with newsletter-specific fields
      await zohoCRM.updateContact(newContact.id, {
        Newsletter_Subscription: 'Subscribed',
        Newsletter_Subscribed_Date: new Date().toISOString(),
        Lead_Source: 'Newsletter Subscription',
        Contact_Type: 'Newsletter Subscriber'
      });
      
      console.log('✅ Newsletter subscriber created in Zoho CRM:', newContact.id)

      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to newsletter! Welcome to our community.',
          contactId: newContact.id
        },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to subscribe to newsletter. Please try again.' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email parameter is required' 
        },
        { status: 400 }
      );
    }

    // TODO: Unsubscribe from database
    // await db.newsletters.update({
    //   where: { email },
    //   data: { 
    //     status: 'unsubscribed',
    //     unsubscribedAt: new Date()
    //   }
    // });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully unsubscribed from newsletter' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
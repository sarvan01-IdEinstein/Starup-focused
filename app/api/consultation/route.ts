import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { zohoCRM, zohoWorkDrive } from '@/lib/zoho/index';
import { handleApiError } from '@/lib/error-handler';

// Consultation request validation schema
const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  company: z.string().optional(),
  service: z.enum([
    'research-development',
    'cad-modeling',
    'machine-design',
    'biw-design',
    'finite-element-cfd',
    'gdt-tolerance',
    '3d-printing',
    'supplier-sourcing',
    'technical-documentation'
  ]),
  description: z.string().min(10, 'Please provide more details about your project'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  files: z.array(z.instanceof(File)).optional(),
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

    // Handle both JSON and FormData
    let validatedData;
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('multipart/form-data')) {
      // Handle form data with files
      const formData = await request.formData();
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        company: formData.get('company') as string || '',
        service: formData.get('service') as string,
        description: formData.get('description') as string,
        date: formData.get('date') as string,
        time: formData.get('time') as string,
        files: formData.getAll('files') as File[]
      };
      
      // Validate input (excluding files for now)
      const { files, ...dataWithoutFiles } = data;
      validatedData = { ...consultationSchema.omit({ files: true }).parse(dataWithoutFiles), files };
    } else {
      // Handle JSON data
      const body = await request.json();
      validatedData = consultationSchema.parse(body);
    }
    
    // Create lead in Zoho CRM for consultation request
    console.log('📝 Creating consultation lead in Zoho CRM...')
    
    const [firstName, ...lastNameParts] = validatedData.name.split(' ')
    const lastName = lastNameParts.join(' ') || ''
    
    // Map service types to readable names
    const serviceTypeMap = {
      'research-development': 'Research & Development',
      'cad-modeling': 'CAD Modeling',
      'machine-design': 'Machine Design',
      'biw-design': 'BIW Design',
      'finite-element-cfd': 'FEA & CFD Analysis',
      'gdt-tolerance': 'GD&T and Tolerance Analysis',
      '3d-printing': '3D Printing Services',
      'supplier-sourcing': 'Supplier Sourcing',
      'technical-documentation': 'Technical Documentation'
    }
    
    const serviceTypeName = serviceTypeMap[validatedData.service] || validatedData.service
    
    // Create lead in Zoho CRM with proper field names
    const zohoLead = await zohoCRM.createLead({
      First_Name: firstName,
      Last_Name: lastName,
      Email: validatedData.email,
      Phone: validatedData.phone,
      Company: validatedData.company,
      Lead_Source: 'Website Consultation Request',
      Lead_Status: 'New',
      Industry: 'Engineering Services',
      Description: `Consultation Request for ${serviceTypeName}
      
Project Description: ${validatedData.description}
Preferred Date: ${validatedData.date}
Preferred Time: ${validatedData.time}
Files Attached: ${validatedData.files?.length || 0} files

Submitted via website consultation form.`
    })
    
    console.log('✅ Consultation lead created in Zoho CRM:', zohoLead.id)

    // Handle file uploads if present
    const uploadedFiles = [];
    if (validatedData.files && validatedData.files.length > 0) {
      console.log('📁 Uploading files to Zoho WorkDrive...');
      
      try {
        // Create customer folder in WorkDrive
        const customerFolderId = await zohoWorkDrive.getProjectFolder(
          validatedData.email,
          `Consultation_${zohoLead.id}`
        );
        
        // Upload each file
        for (const file of validatedData.files) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          
          const uploadResult = await zohoWorkDrive.uploadFile(
            customerFolderId,
            buffer,
            file.name
          );
          
          uploadedFiles.push({
            name: file.name,
            size: file.size,
            id: uploadResult.id
          });
        }
        
        console.log('✅ Files uploaded successfully:', uploadedFiles.length);
      } catch (fileError) {
        console.error('❌ File upload error:', fileError);
        // Don't fail the entire request if file upload fails
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Consultation request submitted successfully! Our team will contact you within 24 hours.',
        leadId: zohoLead.id,
        serviceType: serviceTypeName,
        filesUploaded: uploadedFiles.length
      },
      { status: 200 }
    );
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

    const apiError = handleApiError(error);
    return NextResponse.json(
      { 
        success: false, 
        error: apiError.message 
      },
      { status: apiError.statusCode }
    );
  }
}

// Prevent this route from being statically analyzed during build
export const dynamic = 'force-dynamic'
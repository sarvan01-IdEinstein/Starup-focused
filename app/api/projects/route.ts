import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { requirePermission, Permission } from '@/lib/rbac'
import { auditService } from '@/lib/audit-service'
import { cacheService } from '@/lib/cache-service'
import { zohoCRM, zohoProjects } from '@/lib/zoho/index'

interface ZohoContact {
  id: string;
  account_name?: string;
  company?: string;
  email?: string;
}

export async function GET(request: NextRequest) {
  console.log('🔍 Projects API - GET called')
  
  try {
    // Check permissions
    const permissionResult = await requirePermission(request, Permission.READ_OWN_PROJECTS)
    if (permissionResult instanceof Response) {
      return permissionResult
    }
    
    const { user } = permissionResult
    if (!user?.email) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 })
    }
    
    console.log('✅ Permission granted for user:', user.email)

    // Get contact from Zoho CRM to find account
    const contact = await zohoCRM.findContactByEmail(user.email)
    if (!contact) {
      console.log('❌ Contact not found in Zoho CRM')
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
    }

    const typedContact = contact as ZohoContact;
    const accountId = typedContact.account_name || typedContact.company || typedContact.id
    console.log('Contact found:', {
      id: contact.id,
      accountId: accountId
    })

    // Get projects using cache service
    const projects = await cacheService.getProjects(accountId)
    
    // Log audit event
    // const clientIP = request.headers.get('x-forwarded-for') || 
    //                  request.headers.get('x-real-ip') || 
    //                  'unknown'
    await auditService.logProjectAccess(
      user.id || 'unknown',
      'all',
      'list_projects'
    )
    
    console.log('✅ Projects retrieved:', {
      count: projects?.length || 0,
      cached: true
    })

    return NextResponse.json({
      success: true,
      projects: projects || [],
      cached: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Projects API error:', error)
    
    // Log security event for errors
    const session = await getServerSession(authOptions)
    if (session?.user) {
      const clientIP = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       'unknown'
      await auditService.logSecurityEvent(
        'suspicious_activity',
        session.user.id,
        clientIP,
        { error: (error as Error).message, endpoint: '/api/projects' }
      )
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  console.log('📝 Projects API - POST called')
  
  try {
    // Check permissions
    const permissionResult = await requirePermission(request, Permission.CREATE_PROJECTS)
    if (permissionResult instanceof Response) {
      return permissionResult
    }
    
    const { user } = permissionResult
    const body = await request.json()
    const { name, description, projectType } = body

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 })
    }

    // Find or create contact in Zoho CRM
    let contact = await zohoCRM.findContactByEmail(user.email!)
    
    if (!contact) {
      // Create new contact
      const [firstName, ...lastNameParts] = user.name?.split(' ') || ['User']
      const lastName = lastNameParts.join(' ') || ''
      
      contact = await zohoCRM.createContact({
        email: user.email!,
        first_name: firstName,
        last_name: lastName
      })
    }

    // Create project in Zoho Projects
    const project = await zohoProjects.createProject({
      name,
      description: `${description}\n\nProject Type: ${projectType}`,
      client_id: contact.id
    })

    // Invalidate cache for this account
    const typedContactPost = contact as ZohoContact;
    const accountId = typedContactPost.account_name || typedContactPost.company || typedContactPost.id
    await cacheService.invalidateCache(accountId, 'projects')
    
    // Log audit event
    // const clientIP = request.headers.get('x-forwarded-for') || 
    //                  request.headers.get('x-real-ip') || 
    //                  'unknown'
    await auditService.logProjectAccess(
      user.id || 'unknown',
      project.id,
      'create'
    )

    console.log('✅ Project created:', {
      id: project.id,
      name: project.name
    })

    return NextResponse.json({ 
      success: true,
      project,
      message: 'Project created successfully'
    })
  } catch (error) {
    console.error('❌ Error creating project:', error)
    
    // Log security event for errors
    const session = await getServerSession(authOptions)
    if (session?.user) {
      const clientIP = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       'unknown'
      await auditService.logSecurityEvent(
        'suspicious_activity',
        session.user.id,
        clientIP,
        { error: (error as Error).message, endpoint: '/api/projects', method: 'POST' }
      )
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

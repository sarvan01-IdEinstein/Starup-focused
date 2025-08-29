import { ZohoBaseService } from './base'

export interface ZohoContact {
  id: string
  email: string
  first_name: string
  last_name: string
  company?: string
  phone?: string
  created_time: string
  modified_time: string
}

export class ZohoCRMService extends ZohoBaseService {
  protected get clientId(): string {
    return process.env.ZOHO_CLIENT_ID!
  }
  
  protected get clientSecret(): string {
    return process.env.ZOHO_CLIENT_SECRET!
  }
  
  protected get refreshToken(): string {
    return process.env.ZOHO_REFRESH_TOKEN!
  }
  
  protected get baseUrl(): string {
    return process.env.ZOHO_DOMAIN || 'https://accounts.zoho.in'
  }

  async createContact(contactData: {
    email: string
    first_name: string
    last_name: string
    company?: string
    phone?: string
  }): Promise<ZohoContact> {
    const url = 'https://www.zohoapis.in/crm/v2/Contacts'
    
    // Map to correct Zoho CRM field names
    const zohoData = {
      Email: contactData.email,
      First_Name: contactData.first_name,
      Last_Name: contactData.last_name,
      ...(contactData.company && { Account_Name: contactData.company }),
      ...(contactData.phone && { Phone: contactData.phone })
    }
    
    console.log('📤 Creating contact in Zoho CRM:', zohoData)
    
    const response = await this.makeRequest('POST', url, {
      data: [zohoData]
    })
    
    console.log('📥 Zoho CRM response:', response)
    
    if (response.data && response.data[0] && response.data[0].code === 'SUCCESS') {
      const contact = response.data[0].details
      return {
        id: contact.id,
        email: contact.Email,
        first_name: contact.First_Name,
        last_name: contact.Last_Name,
        company: contact.Account_Name,
        phone: contact.Phone,
        created_time: contact.Created_Time,
        modified_time: contact.Modified_Time
      }
    } else {
      throw new Error(`Contact creation failed: ${JSON.stringify(response)}`)
    }
  }

  async getContact(contactId: string): Promise<ZohoContact> {
    const url = `https://www.zohoapis.in/crm/v2/Contacts/${contactId}`
    const response = await this.makeRequest('GET', url)
    
    const contact = response.data[0]
    return {
      id: contact.id,
      email: contact.Email,
      first_name: contact.First_Name,
      last_name: contact.Last_Name,
      company: contact.Account_Name,
      phone: contact.Phone,
      created_time: contact.Created_Time,
      modified_time: contact.Modified_Time
    }
  }

  async findContactByEmail(email: string): Promise<ZohoContact | null> {
    const url = `https://www.zohoapis.in/crm/v2/Contacts/search?criteria=Email:equals:${email}`
    
    try {
      console.log('🔍 Searching for contact with email:', email)
      const response = await this.makeRequest('GET', url)
      console.log('📥 Search response:', response)
      
      if (response.data && response.data.length > 0) {
        const contact = response.data[0]
        // Map Zoho fields back to our interface
        return {
          id: contact.id,
          email: contact.Email,
          first_name: contact.First_Name,
          last_name: contact.Last_Name,
          company: contact.Account_Name,
          phone: contact.Phone,
          created_time: contact.Created_Time,
          modified_time: contact.Modified_Time
        }
      }
      return null
    } catch (error) {
      console.error('Error searching for contact:', error)
      return null
    }
  }

  async getContacts(params: { per_page?: number } = {}): Promise<ZohoContact[]> {
    const url = 'https://www.zohoapis.in/crm/v2/Contacts'
    
    try {
      const response = await this.makeRequest('GET', url, null, params)
      const contacts = response.data || []
      
      return contacts.map((contact: unknown) => ({
        id: (contact as any).id,
        email: (contact as any).Email,
        first_name: (contact as any).First_Name,
        last_name: (contact as any).Last_Name,
        company: (contact as any).Account_Name,
        phone: (contact as any).Phone,
        created_time: (contact as any).Created_Time,
        modified_time: (contact as any).Modified_Time
      }))
    } catch (error) {
      console.error('Error fetching contacts:', error)
      return []
    }
  }

  async updateContact(contactId: string, updateData: {
    Newsletter_Subscription?: string
    Newsletter_Subscribed_Date?: string
    Lead_Source?: string
    [key: string]: any
  }): Promise<ZohoContact> {
    const url = `https://www.zohoapis.in/crm/v2/Contacts/${contactId}`
    
    console.log('📤 Updating contact in Zoho CRM:', contactId, updateData)
    
    const response = await this.makeRequest('PUT', url, {
      data: [{ id: contactId, ...updateData }]
    })
    
    console.log('📥 Contact update response:', response)
    
    if (response.data && response.data[0] && response.data[0].code === 'SUCCESS') {
      const contact = response.data[0].details
      return {
        id: contact.id,
        email: contact.Email,
        first_name: contact.First_Name,
        last_name: contact.Last_Name,
        company: contact.Account_Name,
        phone: contact.Phone,
        created_time: contact.Created_Time,
        modified_time: contact.Modified_Time
      }
    } else {
      throw new Error(`Contact update failed: ${JSON.stringify(response)}`)
    }
  }

  async createLead(leadData: unknown): Promise<any> {
    const url = 'https://www.zohoapis.in/crm/v2/Leads'
    
    try {
      console.log('📤 Creating lead in Zoho CRM:', leadData)
      const response = await this.makeRequest('POST', url, {
        data: [leadData]
      })
      
      console.log('📥 Lead creation response:', response)
      
      if (response.data && response.data[0] && response.data[0].code === 'SUCCESS') {
        return response.data[0].details
      } else {
        throw new Error(`Lead creation failed: ${JSON.stringify(response)}`)
      }
    } catch (error) {
      console.error('Error creating lead:', error)
      throw error
    }
  }
}
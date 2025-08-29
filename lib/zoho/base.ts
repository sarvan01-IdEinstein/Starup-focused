import axios from 'axios'
import { logger } from '@/lib/secure-logger'

interface ZohoTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

export abstract class ZohoBaseService {
  protected abstract clientId: string
  protected abstract clientSecret: string
  protected abstract refreshToken: string
  protected abstract baseUrl: string
  
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  protected async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
      logger.logTokenOperation('refresh', this.constructor.name, false)
      
      const response = await axios.post(`${this.baseUrl}/oauth/v2/token`, null, {
        params: {
          refresh_token: this.refreshToken,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'refresh_token'
        }
      })

      const data: ZohoTokenResponse = response.data
      this.accessToken = data.access_token
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000 // 1 minute buffer

      logger.logTokenOperation('refresh', this.constructor.name, true)
      return this.accessToken
    } catch (error) {
      logger.error(`Failed to authenticate with Zoho ${this.constructor.name}`, error)
      throw new Error(`Failed to authenticate with Zoho ${this.constructor.name}`)
    }
  }

  protected async makeRequest(method: string, url: string, data?: unknown, params?: unknown) {
    const token = await this.getAccessToken()
    
    try {
      const headers = {
        'Authorization': `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json'
      }
      
      logger.logApiRequest(method, url, headers)
      
      const startTime = Date.now()
      const response = await axios({
        method,
        url,
        data,
        params,
        headers
      })
      
      const responseTime = Date.now() - startTime
      logger.logApiResponse(response.status, url, responseTime)
      return response.data
    } catch (error) {
      logger.error(`${this.constructor.name} API request failed`, error)
      throw error
    }
  }

  // Health check method
  async testConnection(): Promise<boolean> {
    try {
      await this.getAccessToken()
      return true
    } catch {
      return false
    }
  }
}
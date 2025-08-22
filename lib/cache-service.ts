// Simple Cache Service - Production Ready (Zoho Direct)
import { ZohoServiceFactory, ConfigService } from '@/lib/services'

export class CacheService {
  private static instance: CacheService

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService()
    }
    return CacheService.instance
  }

  // Direct Zoho Integration - No Database Required
  async getProjects(accountId: string, _forceRefresh = false): Promise<any[]> {
    try {
      console.log(`🔍 Getting projects for account: ${accountId}`)
      return await this.fetchProjectsFromZoho(accountId)
    } catch (error) {
      console.error('❌ Error in getProjects:', error)
      return []
    }
  }

  async getInvoices(accountId: string, _forceRefresh = false): Promise<any[]> {
    try {
      console.log(`🔍 Getting invoices for account: ${accountId}`)
      return await this.fetchInvoicesFromZoho(accountId)
    } catch (error) {
      console.error('❌ Error in getInvoices:', error)
      return []
    }
  }

  private async fetchProjectsFromZoho(accountId: string): Promise<any[]> {
    if (!ConfigService.isConfigured(['ZOHO_CLIENT_ID', 'ZOHO_CLIENT_SECRET'])) {
      console.warn('⚠️ Zoho not configured, returning empty projects')
      return []
    }

    try {
      console.log('🔄 Fetching projects from Zoho...')
      const zohoProjects = await ZohoServiceFactory.getService<any>('projects')
      return await zohoProjects.getProjectsByClient(accountId) || []
    } catch (error) {
      console.error('❌ Error fetching projects from Zoho:', error)
      return []
    }
  }

  private async fetchInvoicesFromZoho(accountId: string): Promise<any[]> {
    if (!ConfigService.isConfigured(['ZOHO_CLIENT_ID', 'ZOHO_CLIENT_SECRET'])) {
      console.warn('⚠️ Zoho not configured, returning empty invoices')
      return []
    }

    try {
      console.log('🔄 Fetching invoices from Zoho...')
      const zohoBooks = await ZohoServiceFactory.getService<any>('books')
      return await zohoBooks.getInvoices(accountId) || []
    } catch (error) {
      console.error('❌ Error fetching invoices from Zoho:', error)
      return []
    }
  }

  // No-op methods for compatibility
  async updateProjectsCache(__accountId: string, __projects: unknown[]): Promise<void> {
    console.log('📝 Cache update skipped - using direct Zoho integration')
  }

  async updateInvoicesCache(__accountId: string, __invoices: unknown[]): Promise<void> {
    console.log('📝 Cache update skipped - using direct Zoho integration')
  }

  async invalidateCache(__accountId: string, __entity?: string): Promise<void> {
    console.log('📝 Cache invalidation skipped - using direct Zoho integration')
  }

  async getCacheStats(): Promise<any> {
    return {
      totalProjects: 0,
      freshProjects: 0,
      totalInvoices: 0,
      freshInvoices: 0,
      cacheHitRate: 0,
      lastUpdate: null,
      mode: 'direct_zoho'
    }
  }
}

export const cacheService = CacheService.getInstance()
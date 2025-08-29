import { NextRequest, NextResponse } from 'next/server';
import { auditLog } from './audit-logger';

export interface AuditContext {
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  startTime: number;
}

/**
 * Simple audit middleware for production
 */
export class SimpleAuditMiddleware {
  static async logRequest(request: NextRequest, response: NextResponse) {
    try {
      await auditLog('API_REQUEST', {
        method: request.method,
        url: request.url,
        status: response.status,
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      });
    } catch (error) {
      console.error('Audit logging failed:', error);
    }
  }

  static async logSecurityEvent(event: string, details: any) {
    try {
      await auditLog(`SECURITY_${event}`, details);
    } catch (error) {
      console.error('Security audit logging failed:', error);
    }
  }
}

export default SimpleAuditMiddleware;
/**
 * GDPR-Compliant Audit Middleware
 * Implements comprehensive audit logging for all API requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { GDPRSecureLogger } from './gdpr-secure-logger';

export interface AuditContext {
  requestId: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  method: string;
  path: string;
  timestamp: string;
}

export class GDPRAuditMiddleware {
  static async auditRequest(
    request: NextRequest,
    response: NextResponse,
    userId?: string
  ): Promise<void> {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    const context: AuditContext = {
      requestId,
      userId,
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      method: request.method,
      path: request.nextUrl.pathname,
      timestamp
    };

    // Log API access (GDPR-compliant)
    GDPRSecureLogger.audit('API_REQUEST', {
      method: context.method,
      path: context.path,
      statusCode: response.status,
      hasUserId: !!context.userId,
      timestamp: context.timestamp
    }, {
      requestId: context.requestId,
      userId: context.userId,
      ipAddress: context.ipAddress
    });

    // Log specific events based on endpoint
    if (context.path.includes('/api/contact')) {
      GDPRSecureLogger.audit('CONTACT_FORM_ACCESS', {
        method: context.method,
        statusCode: response.status
      }, {
        requestId: context.requestId,
        ipAddress: context.ipAddress
      });
    }

    if (context.path.includes('/api/quotes')) {
      GDPRSecureLogger.audit('QUOTE_REQUEST_ACCESS', {
        method: context.method,
        statusCode: response.status
      }, {
        requestId: context.requestId,
        userId: context.userId,
        ipAddress: context.ipAddress
      });
    }

    if (context.path.includes('/api/auth')) {
      GDPRSecureLogger.audit('AUTH_REQUEST', {
        method: context.method,
        statusCode: response.status,
        authType: this.getAuthType(context.path)
      }, {
        requestId: context.requestId,
        ipAddress: context.ipAddress
      });
    }
  }

  private static getAuthType(path: string): string {
    if (path.includes('signin')) return 'signin';
    if (path.includes('signup')) return 'signup';
    if (path.includes('signout')) return 'signout';
    return 'unknown';
  }

  static async auditDataAccess(
    action: string,
    dataType: string,
    recordId?: string,
    userId?: string,
    context?: Partial<AuditContext>
  ): Promise<void> {
    GDPRSecureLogger.audit(`DATA_${action.toUpperCase()}`, {
      dataType,
      recordId: recordId ? 'present' : 'none', // Don't log actual IDs
      action
    }, {
      requestId: context?.requestId || `audit_${Date.now()}`,
      userId,
      ipAddress: context?.ipAddress || 'system'
    });
  }

  static async auditUserAction(
    action: string,
    details?: any,
    userId?: string,
    context?: Partial<AuditContext>
  ): Promise<void> {
    GDPRSecureLogger.audit(`USER_${action.toUpperCase()}`, details, {
      requestId: context?.requestId || `user_${Date.now()}`,
      userId,
      ipAddress: context?.ipAddress || 'unknown'
    });
  }
}
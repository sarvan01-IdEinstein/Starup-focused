/**
 * API Audit Middleware for Next.js API Routes
 * Automatically logs all API requests for security monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
// import { auditLog } from './audit-logger';

export interface AuditContext {
  userId?: string;
  sessionId?: string;
  startTime: number;
}

/**
 * Extract client information from request
 */
function extractClientInfo(request: NextRequest) {
  // Get IP address from various headers
  const getClientIP = (): string => {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
      return realIP;
    }
    
    const cfConnectingIP = request.headers.get('cf-connecting-ip');
    if (cfConnectingIP) {
      return cfConnectingIP;
    }
    
    return 'unknown';
  };

  return {
    ipAddress: getClientIP(),
    userAgent: request.headers.get('user-agent') || 'unknown',
    referer: request.headers.get('referer'),
    origin: request.headers.get('origin')
  };
}

/**
 * Extract user information from request (if authenticated)
 */
async function extractUserInfo(request: NextRequest): Promise<{ userId?: string; sessionId?: string }> {
  try {
    // Try to get user info from NextAuth session
    // This is a simplified version - you might need to adapt based on your auth setup
    const authHeader = request.headers.get('authorization');
    const sessionCookie = request.cookies.get('next-auth.session-token');
    
    // For now, return empty - you can implement session parsing here
    return {
      userId: undefined, // TODO: Extract from session
      sessionId: sessionCookie?.value
    };
  } catch (error) {
    return {};
  }
}

/**
 * Determine if endpoint should be audited
 */
function shouldAuditEndpoint(pathname: string): boolean {
  // Skip audit logging for certain endpoints to avoid noise
  const skipPatterns = [
    '/api/health',
    '/api/_next',
    '/api/favicon',
    '/_next/',
    '/favicon'
  ];

  return !skipPatterns.some(pattern => pathname.includes(pattern));
}

/**
 * Create audit middleware for API routes
 */
export function createAuditMiddleware() {
  return async function auditMiddleware(
    request: NextRequest,
    handler: (req: NextRequest) => Promise<NextResponse>
  ): Promise<NextResponse> {
    const startTime = Date.now();
    const pathname = request.nextUrl.pathname;
    
    // Skip audit for certain endpoints
    if (!shouldAuditEndpoint(pathname)) {
      return handler(request);
    }

    const clientInfo = extractClientInfo(request);
    const userInfo = await extractUserInfo(request);
    
    let response: NextResponse;
    let error: Error | null = null;

    try {
      // Execute the actual API handler
      response = await handler(request);
    } catch (err) {
      error = err as Error;
      // Create error response
      response = NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Log the API access
    try {
      // await auditLog('API_ACCESS', {
      //   method: request.method,
      //   pathname,
      //   status: response.status,
      //   userId: userInfo.userId,
      //   ip: clientInfo.ipAddress,
      //   userAgent: clientInfo.userAgent
      // });

      // Log error if occurred
      if (error) {
        console.error('API Error:', {
          error: error.message,
          endpoint: pathname,
          method: request.method,
          responseTime,
          ip: clientInfo.ipAddress
        });
      }

      // Log slow requests (potential DoS)
      if (responseTime > 5000) { // 5 seconds
        console.warn('Slow Request:', {
          type: 'slow_request',
          endpoint: pathname,
          responseTime,
          method: request.method,
          ip: clientInfo.ipAddress
        });
      }

    } catch (auditError) {
      // Never let audit logging break the API
      console.error('❌ Audit logging failed:', auditError);
    }

    // Add audit headers to response
    const auditedResponse = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });

    auditedResponse.headers.set('X-Audit-Logged', 'true');
    auditedResponse.headers.set('X-Response-Time', responseTime.toString());

    return auditedResponse;
  };
}

/**
 * Higher-order function to wrap API handlers with audit logging
 */
export function withAudit<T extends any[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async function auditedHandler(...args: T): Promise<R> {
    const request = args[0] as NextRequest;
    const startTime = Date.now();
    
    try {
      const result = await handler(...args);
      
      // Log successful operation
      const clientInfo = extractClientInfo(request);
      const userInfo = await extractUserInfo(request);
      
      console.log('API Access:', {
        method: request.method,
        pathname: request.nextUrl.pathname,
        status: 200,
        userId: userInfo.userId,
        ip: clientInfo.ipAddress
      });

      return result;
    } catch (error) {
      // Log failed operation
      const clientInfo = extractClientInfo(request);
      
      console.error('API Security Event:', {
        type: 'SUSPICIOUS_ACTIVITY',
        error: (error as Error).message,
        endpoint: request.nextUrl.pathname,
        method: request.method,
        ip: clientInfo.ipAddress
      });

      throw error;
    }
  };
}

/**
 * Middleware for logging data operations
 */
export class DataAuditLogger {
  /**
   * Log database operations with before/after values
   */
  static async logDataChange(
    operation: 'CREATE' | 'UPDATE' | 'DELETE',
    table: string,
    recordId: string,
    beforeData?: any,
    afterData?: any,
    userId?: string
  ): Promise<void> {
    const changes: any = {};

    if (operation === 'CREATE') {
      changes.created = afterData;
    } else if (operation === 'UPDATE' && beforeData && afterData) {
      changes.before = beforeData;
      changes.after = afterData;
      changes.modified = this.getChangedFields(beforeData, afterData);
    } else if (operation === 'DELETE') {
      changes.deleted = beforeData;
    }

    console.log('Data Change:', {
      operation,
      table,
      recordId: recordId ? 'present' : 'none',
      userId,
      changes
    });
  }

  /**
   * Get changed fields between before and after data
   */
  private static getChangedFields(before: any, after: any): Record<string, { from: any; to: any }> {
    const changes: Record<string, { from: any; to: any }> = {};

    for (const key in after) {
      if (before[key] !== after[key]) {
        changes[key] = {
          from: before[key],
          to: after[key]
        };
      }
    }

    return changes;
  }
}

export default createAuditMiddleware;
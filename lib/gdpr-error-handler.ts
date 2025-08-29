/**
 * GDPR-Compliant Secure Error Handler
 * Prevents information disclosure while maintaining audit trails
 */

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  timestamp: string;
  requestId: string;
}

export interface AuditableError extends ApiError {
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  originalError?: string; // Only logged, never returned to client
}

export class GDPRSecureErrorHandler {
  private static generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static handle(error: any, request?: Request, userId?: string): ApiError {
    const requestId = this.generateRequestId();
    const timestamp = new Date().toISOString();
    
    // Extract client information for audit (GDPR-compliant)
    const ipAddress = request?.headers.get('x-forwarded-for') || 
                     request?.headers.get('x-real-ip') || 'unknown';
    const userAgent = request?.headers.get('user-agent') || 'unknown';

    // Create audit record (internal only)
    const auditableError: AuditableError = {
      code: 'INTERNAL_ERROR',
      message: 'An error occurred processing your request',
      statusCode: 500,
      timestamp,
      requestId,
      userId,
      ipAddress,
      userAgent,
      originalError: error?.message || 'Unknown error'
    };

    // Log for internal audit (GDPR Article 30 - Records of processing)
    this.auditLog(auditableError);

    // Determine appropriate client response
    if (error?.name === 'ValidationError') {
      return {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request parameters',
        statusCode: 400,
        timestamp,
        requestId
      };
    }

    if (error?.name === 'UnauthorizedError') {
      return {
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
        statusCode: 401,
        timestamp,
        requestId
      };
    }

    if (error?.name === 'ForbiddenError') {
      return {
        code: 'FORBIDDEN',
        message: 'Access denied',
        statusCode: 403,
        timestamp,
        requestId
      };
    }

    if (error?.name === 'NotFoundError') {
      return {
        code: 'NOT_FOUND',
        message: 'Resource not found',
        statusCode: 404,
        timestamp,
        requestId
      };
    }

    if (error?.name === 'RateLimitError') {
      return {
        code: 'RATE_LIMITED',
        message: 'Too many requests. Please try again later.',
        statusCode: 429,
        timestamp,
        requestId
      };
    }

    // Default secure response (no internal information disclosed)
    return {
      code: 'INTERNAL_ERROR',
      message: 'An error occurred processing your request',
      statusCode: 500,
      timestamp,
      requestId
    };
  }

  private static auditLog(error: AuditableError): void {
    // GDPR-compliant audit logging
    const auditEntry = {
      timestamp: error.timestamp,
      requestId: error.requestId,
      event: 'ERROR_OCCURRED',
      userId: error.userId,
      ipAddress: this.pseudonymizeIP(error.ipAddress || 'unknown'),
      statusCode: error.statusCode,
      errorCode: error.code,
      originalError: error.originalError,
      // Note: User agent not logged to reduce fingerprinting
    };

    // In production, this should go to a secure logging service
    console.error('AUDIT_ERROR:', JSON.stringify(auditEntry));
    
    // TODO: Implement secure logging to external service
    // await secureLogger.log('error', auditEntry);
  }

  private static pseudonymizeIP(ip: string): string {
    // GDPR Article 4(5) - Pseudonymization
    if (ip === 'unknown') return ip;
    
    // For IPv4, mask last octet
    if (ip.includes('.')) {
      const parts = ip.split('.');
      if (parts.length === 4) {
        return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
      }
    }
    
    // For IPv6, mask last 64 bits
    if (ip.includes(':')) {
      const parts = ip.split(':');
      if (parts.length >= 4) {
        return `${parts.slice(0, 4).join(':')}::xxxx`;
      }
    }
    
    return 'xxx.xxx.xxx.xxx';
  }
}
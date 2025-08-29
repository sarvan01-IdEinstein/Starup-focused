/**
 * GDPR-Compliant Secure Logging System
 * Implements secure logging with data protection principles
 */

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  AUDIT = 'audit'
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  requestId?: string;
  userId?: string;
  ipAddress?: string;
  data?: any;
}

export class GDPRSecureLogger {
  private static sensitiveKeys = [
    'password', 'token', 'secret', 'key', 'auth', 'credential',
    'refresh_token', 'access_token', 'client_secret', 'api_key',
    'authorization', 'cookie', 'session'
  ];

  static log(level: LogLevel, message: string, data?: any, context?: {
    requestId?: string;
    userId?: string;
    ipAddress?: string;
  }): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      requestId: context?.requestId,
      userId: context?.userId,
      ipAddress: context?.ipAddress ? this.pseudonymizeIP(context.ipAddress) : undefined,
      data: this.sanitizeData(data)
    };

    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${entry.level.toUpperCase()}] ${entry.timestamp} - ${entry.message}`, 
                  entry.data ? entry.data : '');
    } else {
      // In production, send to secure logging service
      this.sendToSecureLogger(entry);
    }
  }

  static error(message: string, error?: any, context?: {
    requestId?: string;
    userId?: string;
    ipAddress?: string;
  }): void {
    this.log(LogLevel.ERROR, message, { error: error?.message || error }, context);
  }

  static warn(message: string, data?: any, context?: {
    requestId?: string;
    userId?: string;
    ipAddress?: string;
  }): void {
    this.log(LogLevel.WARN, message, data, context);
  }

  static info(message: string, data?: any, context?: {
    requestId?: string;
    userId?: string;
    ipAddress?: string;
  }): void {
    this.log(LogLevel.INFO, message, data, context);
  }

  static audit(action: string, data?: any, context?: {
    requestId?: string;
    userId?: string;
    ipAddress?: string;
  }): void {
    this.log(LogLevel.AUDIT, `AUDIT: ${action}`, data, context);
  }

  private static sanitizeData(data: any): any {
    if (!data) return data;
    
    if (typeof data === 'string') {
      return this.sanitizeString(data);
    }
    
    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item));
    }
    
    if (typeof data === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (this.isSensitiveKey(key)) {
          sanitized[key] = '***REDACTED***';
        } else {
          sanitized[key] = this.sanitizeData(value);
        }
      }
      return sanitized;
    }
    
    return data;
  }

  private static sanitizeString(str: string): string {
    // Remove potential tokens or keys from strings
    return str.replace(/([a-zA-Z0-9]{20,})/g, '***TOKEN***');
  }

  private static isSensitiveKey(key: string): boolean {
    const lowerKey = key.toLowerCase();
    return this.sensitiveKeys.some(sensitive => lowerKey.includes(sensitive));
  }

  private static pseudonymizeIP(ip: string): string {
    if (ip === 'unknown') return ip;
    
    if (ip.includes('.')) {
      const parts = ip.split('.');
      if (parts.length === 4) {
        return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
      }
    }
    
    if (ip.includes(':')) {
      const parts = ip.split(':');
      if (parts.length >= 4) {
        return `${parts.slice(0, 4).join(':')}::xxxx`;
      }
    }
    
    return 'xxx.xxx.xxx.xxx';
  }

  private static sendToSecureLogger(entry: LogEntry): void {
    // In production, implement secure logging service integration
    // Examples: AWS CloudWatch, Azure Monitor, Google Cloud Logging
    console.log(JSON.stringify(entry));
    
    // TODO: Implement production logging
    // await cloudWatchLogger.log(entry);
    // await azureMonitor.log(entry);
    // await googleCloudLogging.log(entry);
  }
}
export interface AuditEvent {
  event: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  timestamp: Date;
  data?: any;
}

export async function auditLog(event: string, data?: any, request?: any) {
  const auditEvent: AuditEvent = {
    event,
    timestamp: new Date(),
    data,
    ip: request?.ip || 'unknown',
    userAgent: request?.headers?.['user-agent'] || 'unknown'
  };

  // Log to console (in production, send to logging service)
  console.log('[AUDIT]', JSON.stringify(auditEvent));
  
  // In production, store in database for GDPR compliance
  // await prisma.auditLog.create({ data: auditEvent });
  
  return auditEvent;
}

export async function logGDPREvent(event: string, email: string, details?: any) {
  return auditLog(`GDPR_${event}`, { email, ...details });
}
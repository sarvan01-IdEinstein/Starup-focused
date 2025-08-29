/**
 * GDPR-Compliant Rate Limiter
 * Implements rate limiting while respecting data protection principles
 */

import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
  firstRequest: number;
}

// In-memory store (for production, use Redis with TTL)
const rateLimitStore = new Map<string, RateLimitEntry>();

export class GDPRRateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async checkLimit(request: NextRequest, userId?: string): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  }> {
    const key = this.generateKey(request, userId);
    const now = Date.now();
    
    // Clean expired entries (GDPR data minimization)
    this.cleanExpiredEntries(now);
    
    const current = rateLimitStore.get(key);
    
    if (!current || now > current.resetTime) {
      // First request or window expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
        firstRequest: now
      });
      
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs
      };
    }
    
    if (current.count >= this.config.maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: current.resetTime,
        retryAfter: Math.ceil((current.resetTime - now) / 1000)
      };
    }
    
    // Increment counter
    current.count++;
    
    return {
      allowed: true,
      remaining: this.config.maxRequests - current.count,
      resetTime: current.resetTime
    };
  }

  private generateKey(request: NextRequest, userId?: string): string {
    // GDPR-compliant key generation
    if (userId) {
      // For authenticated users, use user ID (more privacy-friendly)
      return `user:${userId}:${request.nextUrl.pathname}`;
    }
    
    // For anonymous users, use pseudonymized IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const pseudonymizedIP = this.pseudonymizeIP(ip);
    return `ip:${pseudonymizedIP}:${request.nextUrl.pathname}`;
  }

  private pseudonymizeIP(ip: string): string {
    // Same pseudonymization as error handler
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

  private cleanExpiredEntries(now: number): void {
    // GDPR data minimization - remove expired entries
    const keysToDelete: string[] = [];
    rateLimitStore.forEach((entry, key) => {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => rateLimitStore.delete(key));
  }
}

// Pre-configured rate limiters for different endpoints
export const contactFormLimiter = new GDPRRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 3 // Conservative limit for contact forms
});

export const apiLimiter = new GDPRRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100
});

export const authLimiter = new GDPRRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5 // Strict limit for authentication attempts
});
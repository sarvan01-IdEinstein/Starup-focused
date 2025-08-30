import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Smart environment-based security headers
  // More permissive CSP that allows React/Next.js to function properly
  const cspHeader = `
    default-src 'self' 'unsafe-inline' 'unsafe-eval';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https: http: localhost:*;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https: http:;
    img-src 'self' data: https: http: blob:;
    font-src 'self' https://fonts.gstatic.com https: http: data:;
    connect-src 'self' https://www.google-analytics.com https://analytics.google.com https: http: ws: wss:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
  `.replace(/\s{2,}/g, ' ').trim();
  
  response.headers.set('Content-Security-Policy', cspHeader);
  
  // Only add HSTS in production with HTTPS
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  // Basic security headers (always applied)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|grid.svg).*)',
  ],
};
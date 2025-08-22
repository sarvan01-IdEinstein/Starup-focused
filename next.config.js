/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // CRITICAL: Configure for SaaS application, not static site
  output: 'standalone', // Enable for Docker/serverless deployment
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];
    
    // Prevent client-side bundling of server-only modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    return config;
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['ideinstein.com', 'localhost'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Server external packages (Next.js 15.4+ stable feature)
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  
  // Experimental features for Next.js 15.4+
  experimental: {
    // React 19 compatibility
    reactCompiler: false, // Disable React Compiler for now (still experimental)
    
    // Performance optimizations
    optimizeCss: true, // Re-enabled with critters dependency
    scrollRestoration: true,
    
    // PPR (Partial Prerendering) - Next.js 15 feature
    ppr: false, // Keep disabled for SaaS with dynamic content
  },

  // Turbopack configuration (stable in Next.js 15.4+)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Performance optimizations for SaaS
  poweredByHeader: false,
  compress: true,
  
  // CRITICAL: Disable static optimization for dynamic routes
  trailingSlash: false,
  
  // Environment variables that should be available at build time
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

module.exports = nextConfig;
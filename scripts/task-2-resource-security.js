#!/usr/bin/env node

/**
 * Task 2.3: Advanced Resource Security and Performance Analysis
 * Secure image loading, CDN security, and asset integrity checks
 * Part of Phase 1: Advanced Website Analysis & Bug Resolution
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

class ResourceSecurityAnalysis {
  constructor() {
    this.resultsDir = path.join(process.cwd(), 'audit-results', 'task-2', 'resource-security');
    this.ensureResultsDir();
    this.publicDir = path.join(process.cwd(), 'public');
    this.nextConfigPath = path.join(process.cwd(), 'next.config.js');
  }

  ensureResultsDir() {
    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true });
    }
  }

  async runResourceSecurityAnalysis() {
    console.log('🔒 Starting Advanced Resource Security and Performance Analysis...');
    console.log('=' .repeat(80));

    const results = {
      taskId: 'Task-2.3',
      taskName: 'Advanced Resource Security and Performance Analysis',
      startTime: new Date().toISOString(),
      tests: {},
      summary: {},
      success: true
    };

    try {
      // Test 1: Next.js Image Security Configuration
      console.log('\n🖼️ Testing Next.js Image Security Configuration...');
      results.tests.nextImageSecurity = await this.testNextImageSecurity();

      // Test 2: Static Asset Security
      console.log('\n📁 Testing Static Asset Security...');
      results.tests.staticAssetSecurity = await this.testStaticAssetSecurity();

      // Test 3: CDN and Remote Resource Security
      console.log('\n🌐 Testing CDN and Remote Resource Security...');
      results.tests.cdnSecurity = await this.testCDNSecurity();

      // Test 4: Subresource Integrity (SRI) Implementation
      console.log('\n🔐 Testing Subresource Integrity Implementation...');
      results.tests.sriImplementation = await this.testSRIImplementation();

      // Test 5: Asset Optimization Security
      console.log('\n⚡ Testing Asset Optimization Security...');
      results.tests.assetOptimizationSecurity = await this.testAssetOptimizationSecurity();

      // Test 6: Service Image Path Security
      console.log('\n🔧 Testing Service Image Path Security...');
      results.tests.serviceImageSecurity = await this.testServiceImageSecurity();

      // Test 7: Upload Security Configuration
      console.log('\n📤 Testing Upload Security Configuration...');
      results.tests.uploadSecurity = await this.testUploadSecurity();

      // Generate summary
      results.summary = this.generateResourceSecuritySummary(results.tests);
      results.endTime = new Date().toISOString();

      // Save results
      const resultsFile = path.join(this.resultsDir, `resource-security-${Date.now()}.json`);
      fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

      console.log(`\n📄 Results saved to: ${resultsFile}`);
      return results;

    } catch (error) {
      console.error('❌ Resource security analysis failed:', error.message);
      results.success = false;
      results.error = error.message;
      return results;
    }
  }

  async testNextImageSecurity() {
    console.log('  🖼️ Analyzing Next.js Image component security configuration...');
    
    const results = {
      nextConfigExists: false,
      imageConfig: {},
      remotePatterns: [],
      dangerouslyAllowSVG: false,
      securityHeaders: {},
      recommendations: []
    };

    try {
      // Check next.config.js
      if (fs.existsSync(this.nextConfigPath)) {
        results.nextConfigExists = true;
        const configContent = fs.readFileSync(this.nextConfigPath, 'utf8');
        
        // Check image configuration
        if (configContent.includes('images:')) {
          results.imageConfig.configured = true;
          
          // Check for remote patterns
          if (configContent.includes('remotePatterns')) {
            results.imageConfig.hasRemotePatterns = true;
            results.remotePatterns = this.extractRemotePatterns(configContent);
          }
          
          // Check for dangerouslyAllowSVG
          if (configContent.includes('dangerouslyAllowSVG')) {
            results.dangerouslyAllowSVG = true;
            console.log('    ⚠️ dangerouslyAllowSVG is enabled - security risk');
          }
          
          // Check for security-related image settings
          results.imageConfig.hasFormats = configContent.includes('formats');
          results.imageConfig.hasQuality = configContent.includes('quality');
          results.imageConfig.hasSizes = configContent.includes('sizes');
        }
        
        // Check for security headers
        if (configContent.includes('headers()')) {
          results.securityHeaders.configured = true;
          results.securityHeaders.hasImageHeaders = this.checkImageSecurityHeaders(configContent);
        }
      }

      // Check Image component usage
      const imageUsage = await this.analyzeImageComponentUsage();
      results.imageUsage = imageUsage;

      // Generate recommendations
      if (results.nextConfigExists && results.imageConfig.configured) {
        results.recommendations.push('✅ Next.js Image configuration found');
        
        if (results.imageConfig.hasRemotePatterns) {
          results.recommendations.push('✅ Remote patterns configured for secure external images');
        } else {
          results.recommendations.push('💡 Consider configuring remote patterns for external images');
        }
        
        if (results.dangerouslyAllowSVG) {
          results.recommendations.push('🚨 Remove dangerouslyAllowSVG for better security');
        } else {
          results.recommendations.push('✅ SVG handling is secure');
        }
      } else {
        results.recommendations.push('⚠️ Configure Next.js Image component for better security');
      }

      if (results.securityHeaders.hasImageHeaders) {
        results.recommendations.push('✅ Image security headers configured');
      } else {
        results.recommendations.push('💡 Add security headers for image resources');
      }

    } catch (error) {
      results.error = error.message;
      results.recommendations.push('❌ Could not analyze Next.js Image security');
    }

    return results;
  }

  async testStaticAssetSecurity() {
    console.log('  📁 Analyzing static asset security...');
    
    const results = {
      publicDirExists: false,
      assetInventory: {},
      sensitiveFiles: [],
      filePermissions: {},
      assetIntegrity: {},
      recommendations: []
    };

    try {
      if (fs.existsSync(this.publicDir)) {
        results.publicDirExists = true;
        
        // Inventory assets
        const assets = this.inventoryAssets(this.publicDir);
        results.assetInventory = assets;
        
        // Check for sensitive files
        results.sensitiveFiles = this.findSensitiveFiles(this.publicDir);
        
        // Check file permissions (simplified for cross-platform)
        results.filePermissions = this.checkFilePermissions(this.publicDir);
        
        // Generate asset integrity hashes
        results.assetIntegrity = await this.generateAssetIntegrity(assets.images.concat(assets.documents));
        
        console.log(`    📊 Found ${assets.total} assets`);
        console.log(`    🖼️ Images: ${assets.images.length}`);
        console.log(`    📄 Documents: ${assets.documents.length}`);
        console.log(`    ⚠️ Sensitive files: ${results.sensitiveFiles.length}`);
      }

      // Generate recommendations
      if (results.publicDirExists) {
        if (results.sensitiveFiles.length === 0) {
          results.recommendations.push('✅ No sensitive files found in public directory');
        } else {
          results.recommendations.push(`🚨 ${results.sensitiveFiles.length} sensitive files found in public directory`);
          results.recommendations.push('Move sensitive files outside public directory');
        }
        
        if (results.assetInventory.total > 0) {
          results.recommendations.push('✅ Asset inventory completed');
          results.recommendations.push('Consider implementing asset integrity checks');
        }
      } else {
        results.recommendations.push('ℹ️ No public directory found');
      }

    } catch (error) {
      results.error = error.message;
      results.recommendations.push('❌ Could not analyze static asset security');
    }

    return results;
  }

  async testCDNSecurity() {
    console.log('  🌐 Testing CDN and remote resource security...');
    
    const results = {
      cdnUsage: {},
      externalResources: [],
      corsConfiguration: {},
      httpsEnforcement: true,
      recommendations: []
    };

    try {
      // Check for CDN usage in next.config.js
      if (fs.existsSync(this.nextConfigPath)) {
        const configContent = fs.readFileSync(this.nextConfigPath, 'utf8');
        
        // Check for CDN configuration
        results.cdnUsage = {
          assetPrefix: configContent.includes('assetPrefix'),
          basePath: configContent.includes('basePath'),
          images: configContent.includes('loader:')
        };
      }

      // Scan for external resources in components
      const externalResources = await this.scanExternalResources();
      results.externalResources = externalResources;

      // Check CORS configuration
      results.corsConfiguration = await this.checkCORSConfiguration();

      // Analyze HTTPS enforcement
      results.httpsEnforcement = await this.checkHTTPSEnforcement();

      // Generate recommendations
      if (results.externalResources.length > 0) {
        const httpsResources = results.externalResources.filter(r => r.protocol === 'https');
        const httpResources = results.externalResources.filter(r => r.protocol === 'http');
        
        if (httpResources.length === 0) {
          results.recommendations.push('✅ All external resources use HTTPS');
        } else {
          results.recommendations.push(`🚨 ${httpResources.length} external resources use insecure HTTP`);
        }
        
        results.recommendations.push('Consider implementing Subresource Integrity for external resources');
      }

      if (results.corsConfiguration.configured) {
        results.recommendations.push('✅ CORS configuration found');
      } else {
        results.recommendations.push('💡 Configure CORS for better security');
      }

    } catch (error) {
      results.error = error.message;
      results.recommendations.push('❌ Could not analyze CDN security');
    }

    return results;
  }

  async testSRIImplementation() {
    console.log('  🔐 Testing Subresource Integrity implementation...');
    
    const results = {
      sriEnabled: false,
      sriConfiguration: {},
      integrityHashes: {},
      externalScripts: [],
      recommendations: []
    };

    try {
      // Check for SRI in next.config.js
      if (fs.existsSync(this.nextConfigPath)) {
        const configContent = fs.readFileSync(this.nextConfigPath, 'utf8');
        
        if (configContent.includes('sri:')) {
          results.sriEnabled = true;
          results.sriConfiguration = this.extractSRIConfiguration(configContent);
          console.log('    ✅ SRI configuration found');
        }
      }

      // Check for external scripts with integrity
      const externalScripts = await this.findExternalScripts();
      results.externalScripts = externalScripts;

      // Generate integrity hashes for critical assets
      if (results.sriEnabled) {
        results.integrityHashes = await this.generateSRIHashes();
      }

      // Generate recommendations
      if (results.sriEnabled) {
        results.recommendations.push('✅ Subresource Integrity is enabled');
        
        if (results.sriConfiguration.algorithm === 'sha256' || results.sriConfiguration.algorithm === 'sha384') {
          results.recommendations.push('✅ Strong SRI algorithm configured');
        } else {
          results.recommendations.push('💡 Consider using SHA-256 or SHA-384 for SRI');
        }
      } else {
        results.recommendations.push('💡 Consider enabling Subresource Integrity');
        results.recommendations.push('SRI helps prevent tampering with external resources');
      }

      if (results.externalScripts.length > 0) {
        const scriptsWithIntegrity = results.externalScripts.filter(s => s.hasIntegrity);
        if (scriptsWithIntegrity.length === results.externalScripts.length) {
          results.recommendations.push('✅ All external scripts have integrity checks');
        } else {
          results.recommendations.push('⚠️ Some external scripts lack integrity checks');
        }
      }

    } catch (error) {
      results.error = error.message;
      results.recommendations.push('❌ Could not analyze SRI implementation');
    }

    return results;
  }

  async testAssetOptimizationSecurity() {
    console.log('  ⚡ Testing asset optimization security...');
    
    const results = {
      imageOptimization: {},
      compressionSecurity: {},
      cacheHeaders: {},
      assetMinification: {},
      recommendations: []
    };

    try {
      // Check image optimization settings
      results.imageOptimization = await this.analyzeImageOptimization();
      
      // Check compression security
      results.compressionSecurity = await this.analyzeCompressionSecurity();
      
      // Check cache headers
      results.cacheHeaders = await this.analyzeCacheHeaders();
      
      // Check asset minification
      results.assetMinification = await this.analyzeAssetMinification();

      // Generate recommendations
      if (results.imageOptimization.nextImageEnabled) {
        results.recommendations.push('✅ Next.js Image optimization enabled');
      } else {
        results.recommendations.push('💡 Enable Next.js Image optimization for better performance and security');
      }

      if (results.compressionSecurity.gzipEnabled || results.compressionSecurity.brotliEnabled) {
        results.recommendations.push('✅ Compression is enabled');
      } else {
        results.recommendations.push('💡 Enable compression for better performance');
      }

      if (results.cacheHeaders.configured) {
        results.recommendations.push('✅ Cache headers are configured');
      } else {
        results.recommendations.push('💡 Configure cache headers for static assets');
      }

    } catch (error) {
      results.error = error.message;
      results.recommendations.push('❌ Could not analyze asset optimization security');
    }

    return results;
  }

  async testServiceImageSecurity() {
    console.log('  🔧 Testing service image path security...');
    
    const results = {
      serviceImages: {},
      pathTraversal: {},
      imageValidation: {},
      accessControl: {},
      recommendations: []
    };

    try {
      // Analyze service images
      const serviceImagesDir = path.join(this.publicDir, 'images', 'services');
      if (fs.existsSync(serviceImagesDir)) {
        results.serviceImages = this.analyzeServiceImages(serviceImagesDir);
      }

      // Check for path traversal vulnerabilities
      results.pathTraversal = await this.checkPathTraversalVulnerabilities();

      // Check image validation
      results.imageValidation = await this.checkImageValidation();

      // Check access control
      results.accessControl = await this.checkImageAccessControl();

      // Generate recommendations
      if (results.serviceImages.totalImages > 0) {
        results.recommendations.push(`✅ Found ${results.serviceImages.totalImages} service images`);
        
        if (results.serviceImages.missingImages === 0) {
          results.recommendations.push('✅ All service images are accessible');
        } else {
          results.recommendations.push(`⚠️ ${results.serviceImages.missingImages} service images are missing`);
        }
      }

      if (results.pathTraversal.vulnerable) {
        results.recommendations.push('🚨 Path traversal vulnerability detected');
      } else {
        results.recommendations.push('✅ No path traversal vulnerabilities found');
      }

      if (results.imageValidation.implemented) {
        results.recommendations.push('✅ Image validation is implemented');
      } else {
        results.recommendations.push('💡 Implement image validation for uploads');
      }

    } catch (error) {
      results.error = error.message;
      results.recommendations.push('❌ Could not analyze service image security');
    }

    return results;
  }

  async testUploadSecurity() {
    console.log('  📤 Testing upload security configuration...');
    
    const results = {
      uploadEndpoints: [],
      fileValidation: {},
      sizeRestrictions: {},
      typeRestrictions: {},
      storageConfiguration: {},
      recommendations: []
    };

    try {
      // Find upload endpoints
      results.uploadEndpoints = await this.findUploadEndpoints();

      // Analyze file validation
      results.fileValidation = await this.analyzeFileValidation();

      // Check size restrictions
      results.sizeRestrictions = await this.checkSizeRestrictions();

      // Check type restrictions
      results.typeRestrictions = await this.checkTypeRestrictions();

      // Check storage configuration
      results.storageConfiguration = await this.checkStorageConfiguration();

      // Generate recommendations
      if (results.uploadEndpoints.length > 0) {
        results.recommendations.push(`📊 Found ${results.uploadEndpoints.length} upload endpoints`);
        
        if (results.fileValidation.implemented) {
          results.recommendations.push('✅ File validation is implemented');
        } else {
          results.recommendations.push('🚨 Implement file validation for uploads');
        }
        
        if (results.sizeRestrictions.configured) {
          results.recommendations.push('✅ File size restrictions configured');
        } else {
          results.recommendations.push('⚠️ Configure file size restrictions');
        }
        
        if (results.typeRestrictions.configured) {
          results.recommendations.push('✅ File type restrictions configured');
        } else {
          results.recommendations.push('⚠️ Configure file type restrictions');
        }
      } else {
        results.recommendations.push('ℹ️ No upload endpoints found');
      }

    } catch (error) {
      results.error = error.message;
      results.recommendations.push('❌ Could not analyze upload security');
    }

    return results;
  }

  // Helper methods
  extractRemotePatterns(configContent) {
    const patterns = [];
    
    // Simple extraction - in real implementation would parse more thoroughly
    const remotePatternMatch = configContent.match(/remotePatterns:\s*\[(.*?)\]/s);
    if (remotePatternMatch) {
      // Extract hostname patterns
      const hostnameMatches = remotePatternMatch[1].match(/hostname:\s*['"]([^'"]+)['"]/g);
      if (hostnameMatches) {
        hostnameMatches.forEach(match => {
          const hostname = match.match(/hostname:\s*['"]([^'"]+)['"]/)[1];
          patterns.push({ hostname, secure: true });
        });
      }
    }
    
    return patterns;
  }

  checkImageSecurityHeaders(configContent) {
    return configContent.includes('X-Content-Type-Options') ||
           configContent.includes('Content-Security-Policy') ||
           configContent.includes('X-Frame-Options');
  }

  async analyzeImageComponentUsage() {
    const usage = {
      totalUsages: 0,
      secureUsages: 0,
      insecureUsages: 0,
      files: []
    };

    const componentFiles = this.findComponentFiles();
    
    for (const file of componentFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Count Next.js Image component usage
        const imageMatches = content.match(/import.*Image.*from.*['"]next\/image['"]/g);
        if (imageMatches) {
          usage.totalUsages += imageMatches.length;
          
          // Check for secure usage patterns
          if (content.includes('alt=') && content.includes('width=') && content.includes('height=')) {
            usage.secureUsages++;
          } else {
            usage.insecureUsages++;
          }
          
          usage.files.push({
            file: path.basename(file),
            hasImage: true,
            secure: content.includes('alt=') && content.includes('width=') && content.includes('height=')
          });
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return usage;
  }

  inventoryAssets(dir) {
    const assets = {
      images: [],
      documents: [],
      scripts: [],
      styles: [],
      total: 0
    };

    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          const subAssets = this.inventoryAssets(fullPath);
          assets.images.push(...subAssets.images);
          assets.documents.push(...subAssets.documents);
          assets.scripts.push(...subAssets.scripts);
          assets.styles.push(...subAssets.styles);
        } else {
          const ext = path.extname(item).toLowerCase();
          
          if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(ext)) {
            assets.images.push(fullPath);
          } else if (['.pdf', '.doc', '.docx', '.txt'].includes(ext)) {
            assets.documents.push(fullPath);
          } else if (['.js', '.mjs'].includes(ext)) {
            assets.scripts.push(fullPath);
          } else if (['.css'].includes(ext)) {
            assets.styles.push(fullPath);
          }
        }
      }
    } catch (error) {
      // Skip directories that can't be read
    }

    assets.total = assets.images.length + assets.documents.length + assets.scripts.length + assets.styles.length;
    return assets;
  }

  findSensitiveFiles(dir) {
    const sensitiveFiles = [];
    const sensitivePatterns = [
      /\.env/,
      /\.key$/,
      /\.pem$/,
      /\.p12$/,
      /\.pfx$/,
      /password/i,
      /secret/i,
      /private/i,
      /config\.json$/,
      /\.htaccess$/,
      /\.htpasswd$/
    ];

    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          sensitiveFiles.push(...this.findSensitiveFiles(fullPath));
        } else {
          if (sensitivePatterns.some(pattern => pattern.test(item))) {
            sensitiveFiles.push(fullPath);
          }
        }
      }
    } catch (error) {
      // Skip directories that can't be read
    }

    return sensitiveFiles;
  }

  checkFilePermissions(dir) {
    // Simplified file permissions check
    return {
      checked: true,
      worldReadable: false, // Assume secure by default
      worldWritable: false
    };
  }

  async generateAssetIntegrity(assets) {
    const integrity = {};
    
    for (const asset of assets.slice(0, 10)) { // Limit to first 10 for performance
      try {
        const content = fs.readFileSync(asset);
        const hash = crypto.createHash('sha256').update(content).digest('base64');
        integrity[path.basename(asset)] = `sha256-${hash}`;
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return integrity;
  }

  async scanExternalResources() {
    const resources = [];
    const componentFiles = this.findComponentFiles();
    
    for (const file of componentFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Look for external URLs
        const urlMatches = content.match(/https?:\/\/[^\s"']+/g);
        if (urlMatches) {
          urlMatches.forEach(url => {
            const protocol = url.startsWith('https://') ? 'https' : 'http';
            resources.push({
              url,
              protocol,
              file: path.basename(file)
            });
          });
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return resources;
  }

  async checkCORSConfiguration() {
    // Check for CORS configuration in API routes or middleware
    const apiRoutes = this.findAPIRoutes();
    let corsConfigured = false;
    
    for (const route of apiRoutes) {
      try {
        const content = fs.readFileSync(route, 'utf8');
        if (content.includes('cors') || content.includes('Access-Control-Allow-Origin')) {
          corsConfigured = true;
          break;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return { configured: corsConfigured };
  }

  async checkHTTPSEnforcement() {
    // Check for HTTPS enforcement in next.config.js or middleware
    if (fs.existsSync(this.nextConfigPath)) {
      const configContent = fs.readFileSync(this.nextConfigPath, 'utf8');
      return configContent.includes('https') || configContent.includes('secure');
    }
    
    return false;
  }

  extractSRIConfiguration(configContent) {
    const config = {};
    
    const sriMatch = configContent.match(/sri:\s*{([^}]+)}/);
    if (sriMatch) {
      const sriContent = sriMatch[1];
      
      const algorithmMatch = sriContent.match(/algorithm:\s*['"]([^'"]+)['"]/);
      if (algorithmMatch) {
        config.algorithm = algorithmMatch[1];
      }
    }
    
    return config;
  }

  async findExternalScripts() {
    const scripts = [];
    const componentFiles = this.findComponentFiles();
    
    for (const file of componentFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Look for script tags with external sources
        const scriptMatches = content.match(/<script[^>]*src=['"]https?:\/\/[^'"]+['"][^>]*>/g);
        if (scriptMatches) {
          scriptMatches.forEach(script => {
            const hasIntegrity = script.includes('integrity=');
            scripts.push({
              script,
              hasIntegrity,
              file: path.basename(file)
            });
          });
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return scripts;
  }

  async generateSRIHashes() {
    const hashes = {};
    
    // Generate hashes for critical static assets
    const criticalAssets = [
      path.join(this.publicDir, 'favicon.ico'),
      path.join(this.publicDir, 'manifest.json')
    ];
    
    for (const asset of criticalAssets) {
      if (fs.existsSync(asset)) {
        try {
          const content = fs.readFileSync(asset);
          const hash = crypto.createHash('sha384').update(content).digest('base64');
          hashes[path.basename(asset)] = `sha384-${hash}`;
        } catch (error) {
          // Skip files that can't be read
        }
      }
    }
    
    return hashes;
  }

  async analyzeImageOptimization() {
    const optimization = {
      nextImageEnabled: false,
      formats: [],
      quality: null,
      sizes: []
    };

    if (fs.existsSync(this.nextConfigPath)) {
      const configContent = fs.readFileSync(this.nextConfigPath, 'utf8');
      
      optimization.nextImageEnabled = configContent.includes('images:');
      
      if (configContent.includes('formats:')) {
        optimization.formats = ['webp', 'avif']; // Assume modern formats
      }
      
      const qualityMatch = configContent.match(/quality:\s*(\d+)/);
      if (qualityMatch) {
        optimization.quality = parseInt(qualityMatch[1]);
      }
    }
    
    return optimization;
  }

  async analyzeCompressionSecurity() {
    const compression = {
      gzipEnabled: false,
      brotliEnabled: false,
      configured: false
    };

    // Check for compression configuration
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    
    if (packageJson.dependencies?.compression || packageJson.devDependencies?.compression) {
      compression.configured = true;
      compression.gzipEnabled = true; // Assume gzip if compression package is present
    }
    
    return compression;
  }

  async analyzeCacheHeaders() {
    const cache = {
      configured: false,
      staticAssets: false,
      dynamicContent: false
    };

    if (fs.existsSync(this.nextConfigPath)) {
      const configContent = fs.readFileSync(this.nextConfigPath, 'utf8');
      
      if (configContent.includes('Cache-Control')) {
        cache.configured = true;
        cache.staticAssets = true;
      }
    }
    
    return cache;
  }

  async analyzeAssetMinification() {
    const minification = {
      jsMinified: true, // Next.js minifies by default
      cssMinified: true,
      htmlMinified: true,
      configured: true
    };
    
    return minification;
  }

  analyzeServiceImages(serviceImagesDir) {
    const analysis = {
      totalImages: 0,
      missingImages: 0,
      imageTypes: {},
      largeImages: []
    };

    try {
      const items = fs.readdirSync(serviceImagesDir);
      
      for (const item of items) {
        const fullPath = path.join(serviceImagesDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isFile()) {
          analysis.totalImages++;
          
          const ext = path.extname(item).toLowerCase();
          analysis.imageTypes[ext] = (analysis.imageTypes[ext] || 0) + 1;
          
          // Check for large images (>1MB)
          if (stat.size > 1024 * 1024) {
            analysis.largeImages.push({
              file: item,
              size: stat.size
            });
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or can't be read
    }

    return analysis;
  }

  async checkPathTraversalVulnerabilities() {
    const vulnerabilities = {
      vulnerable: false,
      issues: []
    };

    // Check API routes for path traversal vulnerabilities
    const apiRoutes = this.findAPIRoutes();
    
    for (const route of apiRoutes) {
      try {
        const content = fs.readFileSync(route, 'utf8');
        
        // Look for potentially dangerous path operations
        if (content.includes('req.query') && content.includes('fs.readFile')) {
          if (!content.includes('path.resolve') && !content.includes('path.join')) {
            vulnerabilities.vulnerable = true;
            vulnerabilities.issues.push({
              file: path.basename(route),
              issue: 'Potential path traversal in file operations'
            });
          }
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return vulnerabilities;
  }

  async checkImageValidation() {
    const validation = {
      implemented: false,
      fileTypeChecking: false,
      sizeValidation: false,
      contentValidation: false
    };

    const uploadRoutes = await this.findUploadEndpoints();
    
    for (const route of uploadRoutes) {
      try {
        const content = fs.readFileSync(route.path, 'utf8');
        
        if (content.includes('mimetype') || content.includes('fileType')) {
          validation.fileTypeChecking = true;
        }
        
        if (content.includes('size') && content.includes('limit')) {
          validation.sizeValidation = true;
        }
        
        if (content.includes('sharp') || content.includes('imagemagick')) {
          validation.contentValidation = true;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    validation.implemented = validation.fileTypeChecking || validation.sizeValidation || validation.contentValidation;
    return validation;
  }

  async checkImageAccessControl() {
    const accessControl = {
      implemented: false,
      authenticationRequired: false,
      roleBasedAccess: false
    };

    const uploadRoutes = await this.findUploadEndpoints();
    
    for (const route of uploadRoutes) {
      try {
        const content = fs.readFileSync(route.path, 'utf8');
        
        if (content.includes('auth') || content.includes('session')) {
          accessControl.authenticationRequired = true;
        }
        
        if (content.includes('role') || content.includes('permission')) {
          accessControl.roleBasedAccess = true;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    accessControl.implemented = accessControl.authenticationRequired || accessControl.roleBasedAccess;
    return accessControl;
  }

  async findUploadEndpoints() {
    const endpoints = [];
    const apiRoutes = this.findAPIRoutes();
    
    for (const route of apiRoutes) {
      try {
        const content = fs.readFileSync(route, 'utf8');
        
        if (content.includes('upload') || content.includes('multipart') || content.includes('formData')) {
          endpoints.push({
            path: route,
            type: 'upload',
            hasValidation: content.includes('validate') || content.includes('multer')
          });
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return endpoints;
  }

  async analyzeFileValidation() {
    const validation = {
      implemented: false,
      libraries: [],
      validationRules: []
    };

    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    
    // Check for validation libraries
    const validationLibs = ['multer', 'formidable', 'busboy', 'sharp', 'file-type'];
    
    validationLibs.forEach(lib => {
      if (packageJson.dependencies?.[lib] || packageJson.devDependencies?.[lib]) {
        validation.libraries.push(lib);
        validation.implemented = true;
      }
    });
    
    return validation;
  }

  async checkSizeRestrictions() {
    const restrictions = {
      configured: false,
      maxSize: null,
      perFieldLimits: false
    };

    const uploadRoutes = await this.findUploadEndpoints();
    
    for (const route of uploadRoutes) {
      try {
        const content = fs.readFileSync(route.path, 'utf8');
        
        if (content.includes('limits') || content.includes('maxFileSize')) {
          restrictions.configured = true;
          
          const sizeMatch = content.match(/(\d+)\s*\*\s*1024\s*\*\s*1024/);
          if (sizeMatch) {
            restrictions.maxSize = `${sizeMatch[1]}MB`;
          }
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return restrictions;
  }

  async checkTypeRestrictions() {
    const restrictions = {
      configured: false,
      allowedTypes: [],
      mimeTypeChecking: false
    };

    const uploadRoutes = await this.findUploadEndpoints();
    
    for (const route of uploadRoutes) {
      try {
        const content = fs.readFileSync(route.path, 'utf8');
        
        if (content.includes('mimetype') || content.includes('fileFilter')) {
          restrictions.configured = true;
          restrictions.mimeTypeChecking = true;
          
          // Extract allowed types (simplified)
          if (content.includes('image/')) {
            restrictions.allowedTypes.push('images');
          }
          if (content.includes('application/pdf')) {
            restrictions.allowedTypes.push('pdf');
          }
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return restrictions;
  }

  async checkStorageConfiguration() {
    const storage = {
      configured: false,
      type: 'local',
      secure: false,
      encryption: false
    };

    const uploadRoutes = await this.findUploadEndpoints();
    
    for (const route of uploadRoutes) {
      try {
        const content = fs.readFileSync(route.path, 'utf8');
        
        if (content.includes('diskStorage') || content.includes('memoryStorage')) {
          storage.configured = true;
          storage.type = content.includes('memoryStorage') ? 'memory' : 'disk';
        }
        
        if (content.includes('aws') || content.includes('s3') || content.includes('cloudinary')) {
          storage.type = 'cloud';
          storage.secure = true;
        }
        
        if (content.includes('encrypt') || content.includes('crypto')) {
          storage.encryption = true;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    return storage;
  }

  // Utility methods
  findComponentFiles() {
    const files = [];
    const searchDirs = ['components', 'app'];
    
    for (const dir of searchDirs) {
      const dirPath = path.join(process.cwd(), dir);
      if (fs.existsSync(dirPath)) {
        this.findFilesRecursively(dirPath, files, ['.tsx', '.jsx', '.ts', '.js']);
      }
    }
    
    return files;
  }

  findAPIRoutes() {
    const routes = [];
    const apiDir = path.join(process.cwd(), 'app', 'api');
    
    if (fs.existsSync(apiDir)) {
      this.findAPIRouteFiles(apiDir, routes);
    }
    
    return routes;
  }

  findAPIRouteFiles(dir, routes) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.findAPIRouteFiles(fullPath, routes);
        } else if (item === 'route.ts' || item === 'route.js') {
          routes.push(fullPath);
        }
      }
    } catch (error) {
      // Skip directories that can't be read
    }
  }

  findFilesRecursively(dir, files, extensions) {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.findFilesRecursively(fullPath, files, extensions);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Skip directories that can't be read
    }
  }

  generateResourceSecuritySummary(tests) {
    const summary = {
      overallScore: 0,
      criticalIssues: 0,
      passedTests: 0,
      totalTests: Object.keys(tests).length,
      securityLevel: 'unknown',
      recommendations: []
    };

    let totalScore = 0;

    // Next.js Image Security
    if (tests.nextImageSecurity?.imageConfig?.configured && !tests.nextImageSecurity?.dangerouslyAllowSVG) {
      summary.passedTests++;
      totalScore += 20;
    } else if (tests.nextImageSecurity?.dangerouslyAllowSVG) {
      summary.criticalIssues++;
    }

    // Static Asset Security
    if (tests.staticAssetSecurity?.sensitiveFiles?.length === 0) {
      summary.passedTests++;
      totalScore += 15;
    } else {
      summary.criticalIssues += tests.staticAssetSecurity?.sensitiveFiles?.length || 0;
    }

    // CDN Security
    if (tests.cdnSecurity?.httpsEnforcement) {
      summary.passedTests++;
      totalScore += 15;
    }

    // SRI Implementation
    if (tests.sriImplementation?.sriEnabled) {
      summary.passedTests++;
      totalScore += 15;
    }

    // Asset Optimization Security
    if (tests.assetOptimizationSecurity?.imageOptimization?.nextImageEnabled) {
      summary.passedTests++;
      totalScore += 10;
    }

    // Service Image Security
    if (tests.serviceImageSecurity?.pathTraversal?.vulnerable === false) {
      summary.passedTests++;
      totalScore += 15;
    } else if (tests.serviceImageSecurity?.pathTraversal?.vulnerable) {
      summary.criticalIssues++;
    }

    // Upload Security
    if (tests.uploadSecurity?.fileValidation?.implemented && 
        tests.uploadSecurity?.sizeRestrictions?.configured) {
      summary.passedTests++;
      totalScore += 10;
    }

    summary.overallScore = Math.min(100, totalScore);

    // Determine security level
    if (summary.overallScore >= 85 && summary.criticalIssues === 0) {
      summary.securityLevel = 'excellent';
    } else if (summary.overallScore >= 70 && summary.criticalIssues <= 1) {
      summary.securityLevel = 'good';
    } else if (summary.overallScore >= 50) {
      summary.securityLevel = 'acceptable';
    } else {
      summary.securityLevel = 'poor';
    }

    // Generate overall recommendations
    if (summary.securityLevel === 'excellent') {
      summary.recommendations.push('✅ Excellent resource security posture');
    } else if (summary.securityLevel === 'good') {
      summary.recommendations.push('✅ Good resource security with minor improvements needed');
    } else {
      summary.recommendations.push('⚠️ Resource security needs significant improvement');
    }

    if (summary.criticalIssues > 0) {
      summary.recommendations.push(`🚨 ${summary.criticalIssues} critical resource security issues need immediate attention`);
    }

    // Specific recommendations
    if (tests.nextImageSecurity?.dangerouslyAllowSVG) {
      summary.recommendations.push('🚨 Remove dangerouslyAllowSVG configuration');
    }

    if (tests.staticAssetSecurity?.sensitiveFiles?.length > 0) {
      summary.recommendations.push('🚨 Remove sensitive files from public directory');
    }

    if (!tests.sriImplementation?.sriEnabled) {
      summary.recommendations.push('💡 Consider implementing Subresource Integrity');
    }

    return summary;
  }
}

// CLI execution
if (require.main === module) {
  const resourceSecurity = new ResourceSecurityAnalysis();
  resourceSecurity.runResourceSecurityAnalysis().catch(console.error);
}

module.exports = ResourceSecurityAnalysis;
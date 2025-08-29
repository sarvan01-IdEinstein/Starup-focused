#!/usr/bin/env node

/**
 * Lighthouse CLI Integration for Next.js Security Testing
 * Replaces lighthouse-mcp with direct CLI integration
 * Part of Task 1: Optimized MCP Tools and Advanced Testing Environment Setup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class LighthouseCLIIntegration {
  constructor() {
    this.outputDir = path.join(process.cwd(), 'audit-results', 'lighthouse');
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async runSecurityAudit(url = 'http://localhost:3002', options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputFile = path.join(this.outputDir, `security-audit-${timestamp}.json`);
    
    const defaultOptions = {
      onlyCategories: 'performance,accessibility,best-practices,seo',
      formFactor: 'desktop',
      throttling: 'none',
      output: 'json',
      outputPath: outputFile,
      chromeFlags: '--headless --no-sandbox --disable-gpu',
      ...options
    };

    try {
      console.log(`🔍 Running Lighthouse security audit on ${url}...`);
      
      const command = this.buildLighthouseCommand(url, defaultOptions);
      console.log(`Executing: ${command}`);
      
      execSync(command, { stdio: 'inherit' });
      
      const results = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
      
      // Extract security-relevant metrics
      const securityMetrics = this.extractSecurityMetrics(results);
      
      console.log('✅ Lighthouse security audit completed');
      console.log('📊 Security Metrics:', JSON.stringify(securityMetrics, null, 2));
      
      return {
        success: true,
        outputFile,
        metrics: securityMetrics,
        fullResults: results
      };
      
    } catch (error) {
      console.error('❌ Lighthouse audit failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  buildLighthouseCommand(url, options) {
    let command = `npx lighthouse ${url}`;
    
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'outputPath') {
        command += ` --output-path="${value}"`;
      } else if (key === 'chromeFlags') {
        command += ` --chrome-flags="${value}"`;
      } else {
        command += ` --${key.replace(/([A-Z])/g, '-$1').toLowerCase()}=${value}`;
      }
    });
    
    return command;
  }

  extractSecurityMetrics(results) {
    const audits = results.audits || {};
    
    return {
      // Performance Security
      performanceScore: results.categories?.performance?.score || 0,
      firstContentfulPaint: audits['first-contentful-paint']?.numericValue || 0,
      largestContentfulPaint: audits['largest-contentful-paint']?.numericValue || 0,
      
      // Security Best Practices
      bestPracticesScore: results.categories?.['best-practices']?.score || 0,
      httpsUsage: audits['is-on-https']?.score || 0,
      vulnerableLibraries: audits['no-vulnerable-libraries']?.score || 0,
      
      // Accessibility Security
      accessibilityScore: results.categories?.accessibility?.score || 0,
      colorContrast: audits['color-contrast']?.score || 0,
      
      // SEO Security
      seoScore: results.categories?.seo?.score || 0,
      metaDescription: audits['meta-description']?.score || 0,
      
      // Additional Security Checks
      csp: audits['csp-xss']?.score || 0,
      mixedContent: audits['mixed-content']?.score || 0,
      
      timestamp: new Date().toISOString()
    };
  }

  async runMultiPageAudit(pages = []) {
    const defaultPages = [
      'http://localhost:3002',
      'http://localhost:3002/about',
      'http://localhost:3002/services',
      'http://localhost:3002/contact',
      'http://localhost:3002/auth/signin',
      'http://localhost:3002/auth/signup'
    ];
    
    const pagesToAudit = pages.length > 0 ? pages : defaultPages;
    const results = [];
    
    for (const page of pagesToAudit) {
      console.log(`\n🔍 Auditing page: ${page}`);
      const result = await this.runSecurityAudit(page);
      results.push({
        url: page,
        ...result
      });
      
      // Wait between audits to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Generate summary report
    const summaryFile = path.join(this.outputDir, `multi-page-summary-${Date.now()}.json`);
    fs.writeFileSync(summaryFile, JSON.stringify(results, null, 2));
    
    console.log(`\n📊 Multi-page audit completed. Summary saved to: ${summaryFile}`);
    return results;
  }
}

// CLI execution
if (require.main === module) {
  const lighthouse = new LighthouseCLIIntegration();
  
  const args = process.argv.slice(2);
  const url = args[0] || 'http://localhost:3002';
  const multiPage = args.includes('--multi-page');
  
  if (multiPage) {
    lighthouse.runMultiPageAudit().catch(console.error);
  } else {
    lighthouse.runSecurityAudit(url).catch(console.error);
  }
}

module.exports = LighthouseCLIIntegration;
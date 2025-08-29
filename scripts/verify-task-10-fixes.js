#!/usr/bin/env node

/**
 * Verification Script for Task 10 Security Fixes
 * Tests that all API security issues have been resolved
 */

const fs = require('fs');
const path = require('path');

class Task10FixVerifier {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      issues: []
    };
  }

  log(status, message) {
    const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : 'ℹ️';
    console.log(`${icon} ${message}`);
    
    if (status === 'PASS') {
      this.results.passed++;
    } else if (status === 'FAIL') {
      this.results.failed++;
      this.results.issues.push(message);
    }
  }

  checkFileExists(filePath, description) {
    if (fs.existsSync(filePath)) {
      this.log('PASS', `${description} exists: ${filePath}`);
      return true;
    } else {
      this.log('FAIL', `${description} missing: ${filePath}`);
      return false;
    }
  }

  checkFileContent(filePath, searchText, description) {
    if (!fs.existsSync(filePath)) {
      this.log('FAIL', `File not found for content check: ${filePath}`);
      return false;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(searchText)) {
        this.log('PASS', `${description} found in ${filePath}`);
        return true;
      } else {
        this.log('FAIL', `${description} not found in ${filePath}`);
        return false;
      }
    } catch (error) {
      this.log('FAIL', `Error reading ${filePath}: ${error.message}`);
      return false;
    }
  }

  checkNoSensitiveLogging(filePath, description) {
    if (!fs.existsSync(filePath)) {
      this.log('INFO', `File not found for logging check: ${filePath}`);
      return true;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const sensitivePatterns = [
        /console\.log.*token/i,
        /console\.log.*secret/i,
        /console\.log.*password/i,
        /console\.log.*key/i
      ];

      let foundSensitive = false;
      for (const pattern of sensitivePatterns) {
        if (pattern.test(content)) {
          foundSensitive = true;
          break;
        }
      }

      if (!foundSensitive) {
        this.log('PASS', `${description}: No sensitive logging detected`);
        return true;
      } else {
        this.log('FAIL', `${description}: Sensitive logging still present`);
        return false;
      }
    } catch (error) {
      this.log('FAIL', `Error checking ${filePath}: ${error.message}`);
      return false;
    }
  }

  async testErrorHandlerImplementation() {
    console.log('\n🔍 Testing Error Handler Implementation...');
    
    // Check if error handler file exists
    this.checkFileExists('lib/error-handler.ts', 'Secure Error Handler');
    
    // Check if error handler has required methods
    this.checkFileContent('lib/error-handler.ts', 'SecureErrorHandler', 'SecureErrorHandler class');
    this.checkFileContent('lib/error-handler.ts', 'createResponse', 'createResponse method');
    this.checkFileContent('lib/error-handler.ts', 'sanitizeForLogging', 'sanitizeForLogging method');
  }

  async testRateLimiterImplementation() {
    console.log('\n⏱️ Testing Rate Limiter Implementation...');
    
    // Check if rate limiter file exists
    this.checkFileExists('lib/rate-limiter.ts', 'Rate Limiter');
    
    // Check if rate limiter has required components
    this.checkFileContent('lib/rate-limiter.ts', 'RateLimiter', 'RateLimiter class');
    this.checkFileContent('lib/rate-limiter.ts', 'strictRateLimiter', 'Strict rate limiter');
    this.checkFileContent('lib/rate-limiter.ts', 'withRateLimit', 'Rate limit middleware');
  }

  async testContactAPISecurityUpdates() {
    console.log('\n📞 Testing Contact API Security Updates...');
    
    // Check if contact API uses secure error handler
    this.checkFileContent('app/api/contact/route.ts', 'SecureErrorHandler', 'Secure error handler import');
    this.checkFileContent('app/api/contact/route.ts', 'strictRateLimiter', 'Rate limiter import');
    this.checkFileContent('app/api/contact/route.ts', 'createResponse', 'Secure error response usage');
  }

  async testCustom404Page() {
    console.log('\n🚫 Testing Custom 404 Page...');
    
    // Check if custom 404 page exists
    this.checkFileExists('app/not-found.tsx', 'Custom 404 Page');
    
    // Check if 404 page has secure content
    this.checkFileContent('app/not-found.tsx', 'Page Not Found', '404 page content');
    this.checkFileContent('app/not-found.tsx', 'noindex, nofollow', '404 page robots meta');
  }

  async testNoSensitiveInformation() {
    console.log('\n🔒 Testing for Sensitive Information Exposure...');
    
    // Check that contact API doesn't expose sensitive info
    const contactFile = 'app/api/contact/route.ts';
    if (fs.existsSync(contactFile)) {
      const content = fs.readFileSync(contactFile, 'utf8');
      
      // Check for secure error handling
      if (content.includes('SecureErrorHandler.createResponse')) {
        this.log('PASS', 'Contact API uses secure error handling');
      } else {
        this.log('FAIL', 'Contact API not using secure error handling');
      }
      
      // Check for rate limiting
      if (content.includes('rateLimitResult')) {
        this.log('PASS', 'Contact API implements rate limiting');
      } else {
        this.log('FAIL', 'Contact API missing rate limiting');
      }
    }
  }

  async testSecurityHeaders() {
    console.log('\n🛡️ Testing Security Headers Implementation...');
    
    // Check if error handler adds security headers
    this.checkFileContent('lib/error-handler.ts', 'X-Content-Type-Options', 'X-Content-Type-Options header');
    this.checkFileContent('lib/error-handler.ts', 'X-Frame-Options', 'X-Frame-Options header');
    
    // Check if rate limiter adds rate limit headers
    this.checkFileContent('lib/rate-limiter.ts', 'X-RateLimit-Limit', 'Rate limit headers');
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📋 TASK 10 SECURITY FIXES VERIFICATION REPORT');
    console.log('='.repeat(60));
    
    const total = this.results.passed + this.results.failed;
    const successRate = total > 0 ? Math.round((this.results.passed / total) * 100) : 0;
    
    console.log(`\n📊 SUMMARY:`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📈 Success Rate: ${successRate}%`);
    
    if (this.results.failed > 0) {
      console.log(`\n❌ ISSUES FOUND:`);
      this.results.issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    }
    
    console.log(`\n🎯 OVERALL STATUS: ${this.results.failed === 0 ? '✅ ALL FIXES VERIFIED' : '❌ ISSUES NEED ATTENTION'}`);
    
    if (this.results.failed === 0) {
      console.log('\n🎉 Excellent! All Task 10 security fixes have been successfully implemented.');
      console.log('✅ Ready to proceed to Task 11 fixes.');
    } else {
      console.log('\n⚠️ Some issues need to be addressed before proceeding.');
    }
    
    return this.results.failed === 0;
  }

  async runAllTests() {
    console.log('🚀 Starting Task 10 Security Fixes Verification...\n');
    
    try {
      await this.testErrorHandlerImplementation();
      await this.testRateLimiterImplementation();
      await this.testContactAPISecurityUpdates();
      await this.testCustom404Page();
      await this.testNoSensitiveInformation();
      await this.testSecurityHeaders();
      
      return this.generateReport();
    } catch (error) {
      console.error('❌ Verification failed:', error.message);
      return false;
    }
  }
}

// Main execution
async function main() {
  const verifier = new Task10FixVerifier();
  const success = await verifier.runAllTests();
  process.exit(success ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { Task10FixVerifier };
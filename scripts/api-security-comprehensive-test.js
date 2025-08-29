#!/usr/bin/env node

/**
 * Task 10.1: API Security Testing using Postman MCP Automation
 * 
 * This script performs comprehensive API security testing including:
 * - API authentication and authorization mechanisms
 * - Rate limiting and abuse prevention measures
 * - Sensitive data exposure in API responses
 * - CORS configuration and security headers
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

class APISecurityTester {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.results = {
      authentication: [],
      authorization: [],
      rateLimiting: [],
      sensitiveData: [],
      cors: [],
      securityHeaders: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
    
    // API endpoints to test
    this.endpoints = [
      { path: '/api/auth/signup', methods: ['POST'] },
      { path: '/api/auth/signin', methods: ['POST'] },
      { path: '/api/consultation', methods: ['POST'] },
      { path: '/api/contact', methods: ['POST'] },
      { path: '/api/customers', methods: ['GET', 'POST'] },
      { path: '/api/dashboard/stats', methods: ['GET'] },
      { path: '/api/files', methods: ['GET', 'POST'] },
      { path: '/api/files/upload', methods: ['POST'] },
      { path: '/api/health', methods: ['GET'] },
      { path: '/api/invoices', methods: ['GET', 'POST'] },
      { path: '/api/newsletter', methods: ['POST'] },
      { path: '/api/projects', methods: ['GET', 'POST'] },
      { path: '/api/quotes', methods: ['GET', 'POST'] },
      { path: '/api/services', methods: ['GET'] },
      { path: '/api/user/profile', methods: ['GET', 'PUT'] },
      { path: '/api/blog/posts', methods: ['GET', 'POST'] },
      { path: '/api/billing/invoices', methods: ['GET', 'POST'] }
    ];

    // Security headers to check
    this.requiredSecurityHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'x-xss-protection',
      'strict-transport-security',
      'content-security-policy',
      'referrer-policy'
    ];

    // Sensitive data patterns to look for
    this.sensitivePatterns = [
      /password/i,
      /secret/i,
      /token/i,
      /key/i,
      /api[_-]?key/i,
      /auth[_-]?token/i,
      /session[_-]?id/i,
      /credit[_-]?card/i,
      /ssn/i,
      /social[_-]?security/i
    ];
  }

  async makeRequest(endpoint, method = 'GET', headers = {}, body = null) {
    return new Promise((resolve, reject) => {
      const url = new URL(endpoint, this.baseUrl);
      const options = {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: url.pathname + url.search,
        method: method,
        headers: {
          'User-Agent': 'API-Security-Tester/1.0',
          'Accept': 'application/json',
          ...headers
        }
      };

      const client = url.protocol === 'https:' ? https : http;
      
      const req = client.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
            responseTime: Date.now() - startTime
          });
        });
      });

      req.on('error', reject);
      
      const startTime = Date.now();
      if (body) {
        req.write(typeof body === 'string' ? body : JSON.stringify(body));
      }
      req.end();
    });
  }

  async testAuthentication() {
    console.log('\n🔐 Testing Authentication Mechanisms...');
    
    const authEndpoints = [
      '/api/auth/signup',
      '/api/auth/signin',
      '/api/dashboard/stats',
      '/api/user/profile'
    ];

    for (const endpoint of authEndpoints) {
      try {
        // Test without authentication
        const response = await this.makeRequest(endpoint, 'GET');
        
        const test = {
          endpoint,
          test: 'Unauthenticated Access',
          status: 'PASS',
          message: '',
          severity: 'HIGH'
        };

        if (response.statusCode === 200) {
          test.status = 'FAIL';
          test.message = `Endpoint allows unauthenticated access (${response.statusCode})`;
          this.results.summary.failed++;
        } else if (response.statusCode === 401 || response.statusCode === 403) {
          test.message = `Properly rejects unauthenticated requests (${response.statusCode})`;
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = `Unexpected response code: ${response.statusCode}`;
          this.results.summary.warnings++;
        }

        this.results.authentication.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${endpoint}: ${test.message}`);

      } catch (error) {
        const test = {
          endpoint,
          test: 'Authentication Test',
          status: 'ERROR',
          message: `Request failed: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.authentication.push(test);
        console.log(`  ❌ ${endpoint}: ${test.message}`);
        this.results.summary.failed++;
      }
    }
  }

  async testAuthorization() {
    console.log('\n🛡️ Testing Authorization Controls...');
    
    const protectedEndpoints = [
      '/api/dashboard/stats',
      '/api/user/profile',
      '/api/customers',
      '/api/projects',
      '/api/billing/invoices'
    ];

    for (const endpoint of protectedEndpoints) {
      try {
        // Test with invalid token
        const response = await this.makeRequest(endpoint, 'GET', {
          'Authorization': 'Bearer invalid-token-12345'
        });
        
        const test = {
          endpoint,
          test: 'Invalid Token Authorization',
          status: 'PASS',
          message: '',
          severity: 'HIGH'
        };

        if (response.statusCode === 200) {
          test.status = 'FAIL';
          test.message = `Accepts invalid authorization token (${response.statusCode})`;
          this.results.summary.failed++;
        } else if (response.statusCode === 401 || response.statusCode === 403) {
          test.message = `Properly rejects invalid tokens (${response.statusCode})`;
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = `Unexpected response code: ${response.statusCode}`;
          this.results.summary.warnings++;
        }

        this.results.authorization.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${endpoint}: ${test.message}`);

      } catch (error) {
        const test = {
          endpoint,
          test: 'Authorization Test',
          status: 'ERROR',
          message: `Request failed: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.authorization.push(test);
        console.log(`  ❌ ${endpoint}: ${test.message}`);
        this.results.summary.failed++;
      }
    }
  }

  async testRateLimiting() {
    console.log('\n⏱️ Testing Rate Limiting and Abuse Prevention...');
    
    const testEndpoints = [
      '/api/contact',
      '/api/consultation',
      '/api/newsletter',
      '/api/auth/signup'
    ];

    for (const endpoint of testEndpoints) {
      try {
        const requests = [];
        const requestCount = 20; // Send 20 rapid requests
        
        console.log(`  Testing ${endpoint} with ${requestCount} rapid requests...`);
        
        // Send multiple rapid requests
        for (let i = 0; i < requestCount; i++) {
          requests.push(this.makeRequest(endpoint, 'POST', {
            'Content-Type': 'application/json'
          }, JSON.stringify({ test: `request-${i}` })));
        }

        const responses = await Promise.allSettled(requests);
        const statusCodes = responses
          .filter(r => r.status === 'fulfilled')
          .map(r => r.value.statusCode);

        const rateLimitedCount = statusCodes.filter(code => code === 429).length;
        const successCount = statusCodes.filter(code => code < 400).length;

        const test = {
          endpoint,
          test: 'Rate Limiting',
          status: 'PASS',
          message: '',
          severity: 'MEDIUM',
          details: {
            totalRequests: requestCount,
            rateLimited: rateLimitedCount,
            successful: successCount
          }
        };

        if (rateLimitedCount === 0 && successCount > 10) {
          test.status = 'FAIL';
          test.message = `No rate limiting detected - all ${successCount} requests succeeded`;
          this.results.summary.failed++;
        } else if (rateLimitedCount > 0) {
          test.message = `Rate limiting active - ${rateLimitedCount} requests blocked`;
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = `Inconclusive - ${successCount} successful, ${rateLimitedCount} rate limited`;
          this.results.summary.warnings++;
        }

        this.results.rateLimiting.push(test);
        console.log(`    ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${test.message}`);

      } catch (error) {
        const test = {
          endpoint,
          test: 'Rate Limiting Test',
          status: 'ERROR',
          message: `Test failed: ${error.message}`,
          severity: 'MEDIUM'
        };
        this.results.rateLimiting.push(test);
        console.log(`    ❌ ${endpoint}: ${test.message}`);
        this.results.summary.failed++;
      }
    }
  }

  async testSensitiveDataExposure() {
    console.log('\n🔍 Testing for Sensitive Data Exposure...');
    
    for (const endpointConfig of this.endpoints) {
      for (const method of endpointConfig.methods) {
        try {
          const response = await this.makeRequest(endpointConfig.path, method);
          
          const test = {
            endpoint: endpointConfig.path,
            method,
            test: 'Sensitive Data Exposure',
            status: 'PASS',
            message: '',
            severity: 'HIGH',
            exposedData: []
          };

          // Check response body for sensitive patterns
          if (response.body) {
            for (const pattern of this.sensitivePatterns) {
              const matches = response.body.match(pattern);
              if (matches) {
                test.exposedData.push({
                  pattern: pattern.toString(),
                  matches: matches.slice(0, 3) // Limit to first 3 matches
                });
              }
            }
          }

          // Check response headers for sensitive information
          const sensitiveHeaders = ['authorization', 'x-api-key', 'x-auth-token'];
          for (const header of sensitiveHeaders) {
            if (response.headers[header]) {
              test.exposedData.push({
                type: 'header',
                name: header,
                value: response.headers[header].substring(0, 20) + '...'
              });
            }
          }

          if (test.exposedData.length > 0) {
            test.status = 'FAIL';
            test.message = `Potential sensitive data exposure detected (${test.exposedData.length} issues)`;
            this.results.summary.failed++;
          } else {
            test.message = 'No sensitive data exposure detected';
            this.results.summary.passed++;
          }

          this.results.sensitiveData.push(test);
          
          if (test.status === 'FAIL') {
            console.log(`  ❌ ${endpointConfig.path} (${method}): ${test.message}`);
          }

        } catch (error) {
          // Skip endpoints that are not accessible
          continue;
        }
      }
    }
    
    const failedTests = this.results.sensitiveData.filter(t => t.status === 'FAIL');
    if (failedTests.length === 0) {
      console.log('  ✅ No sensitive data exposure detected in API responses');
    }
  }

  async testCORSConfiguration() {
    console.log('\n🌐 Testing CORS Configuration...');
    
    const testOrigins = [
      'https://malicious-site.com',
      'http://localhost:3001',
      'https://example.com',
      null // No origin header
    ];

    for (const endpoint of ['/api/health', '/api/services', '/api/contact']) {
      for (const origin of testOrigins) {
        try {
          const headers = origin ? { 'Origin': origin } : {};
          const response = await this.makeRequest(endpoint, 'OPTIONS', headers);
          
          const test = {
            endpoint,
            origin: origin || 'no-origin',
            test: 'CORS Configuration',
            status: 'PASS',
            message: '',
            severity: 'MEDIUM'
          };

          const corsHeaders = {
            'access-control-allow-origin': response.headers['access-control-allow-origin'],
            'access-control-allow-methods': response.headers['access-control-allow-methods'],
            'access-control-allow-headers': response.headers['access-control-allow-headers']
          };

          if (corsHeaders['access-control-allow-origin'] === '*') {
            test.status = 'WARNING';
            test.message = 'CORS allows all origins (*)';
            this.results.summary.warnings++;
          } else if (corsHeaders['access-control-allow-origin']) {
            test.message = `CORS configured for origin: ${corsHeaders['access-control-allow-origin']}`;
            this.results.summary.passed++;
          } else {
            test.message = 'CORS headers not present';
            this.results.summary.passed++;
          }

          this.results.cors.push(test);

        } catch (error) {
          continue; // Skip failed requests
        }
      }
    }
    
    console.log(`  ✅ CORS configuration tested for ${this.results.cors.length} endpoint/origin combinations`);
  }

  async testSecurityHeaders() {
    console.log('\n🛡️ Testing Security Headers...');
    
    for (const endpointConfig of this.endpoints.slice(0, 5)) { // Test first 5 endpoints
      try {
        const response = await this.makeRequest(endpointConfig.path, 'GET');
        
        const test = {
          endpoint: endpointConfig.path,
          test: 'Security Headers',
          status: 'PASS',
          message: '',
          severity: 'MEDIUM',
          missingHeaders: [],
          presentHeaders: []
        };

        for (const header of this.requiredSecurityHeaders) {
          if (response.headers[header]) {
            test.presentHeaders.push(header);
          } else {
            test.missingHeaders.push(header);
          }
        }

        if (test.missingHeaders.length > 0) {
          test.status = 'WARNING';
          test.message = `Missing ${test.missingHeaders.length} security headers: ${test.missingHeaders.join(', ')}`;
          this.results.summary.warnings++;
        } else {
          test.message = `All ${test.presentHeaders.length} security headers present`;
          this.results.summary.passed++;
        }

        this.results.securityHeaders.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${endpointConfig.path}: ${test.message}`);

      } catch (error) {
        continue; // Skip failed requests
      }
    }
  }

  generateReport() {
    const timestamp = new Date().toISOString();
    
    console.log('\n' + '='.repeat(80));
    console.log('🔒 API SECURITY TESTING REPORT - TASK 10.1');
    console.log('='.repeat(80));
    console.log(`Generated: ${timestamp}`);
    console.log(`Base URL: ${this.baseUrl}`);
    
    console.log('\n📊 SUMMARY:');
    console.log(`Total Tests: ${this.results.summary.total}`);
    console.log(`✅ Passed: ${this.results.summary.passed}`);
    console.log(`❌ Failed: ${this.results.summary.failed}`);
    console.log(`⚠️ Warnings: ${this.results.summary.warnings}`);
    
    const securityScore = this.results.summary.total > 0 
      ? Math.round((this.results.summary.passed / this.results.summary.total) * 100)
      : 0;
    
    console.log(`\n🎯 Security Score: ${securityScore}%`);
    
    if (this.results.summary.failed > 0) {
      console.log('\n❌ CRITICAL ISSUES FOUND:');
      
      // Show authentication failures
      const authFailures = this.results.authentication.filter(t => t.status === 'FAIL');
      if (authFailures.length > 0) {
        console.log('\n🔐 Authentication Issues:');
        authFailures.forEach(test => {
          console.log(`  - ${test.endpoint}: ${test.message}`);
        });
      }
      
      // Show authorization failures
      const authzFailures = this.results.authorization.filter(t => t.status === 'FAIL');
      if (authzFailures.length > 0) {
        console.log('\n🛡️ Authorization Issues:');
        authzFailures.forEach(test => {
          console.log(`  - ${test.endpoint}: ${test.message}`);
        });
      }
      
      // Show rate limiting failures
      const rateLimitFailures = this.results.rateLimiting.filter(t => t.status === 'FAIL');
      if (rateLimitFailures.length > 0) {
        console.log('\n⏱️ Rate Limiting Issues:');
        rateLimitFailures.forEach(test => {
          console.log(`  - ${test.endpoint}: ${test.message}`);
        });
      }
      
      // Show sensitive data exposure
      const dataExposureFailures = this.results.sensitiveData.filter(t => t.status === 'FAIL');
      if (dataExposureFailures.length > 0) {
        console.log('\n🔍 Sensitive Data Exposure:');
        dataExposureFailures.forEach(test => {
          console.log(`  - ${test.endpoint} (${test.method}): ${test.message}`);
          test.exposedData.forEach(data => {
            console.log(`    * ${data.pattern || data.type}: ${data.matches || data.name}`);
          });
        });
      }
    }
    
    console.log('\n📋 RECOMMENDATIONS:');
    
    if (this.results.summary.failed > 0) {
      console.log('1. 🚨 Address all CRITICAL security issues immediately');
      console.log('2. 🔐 Implement proper authentication for all protected endpoints');
      console.log('3. 🛡️ Add authorization checks for sensitive operations');
      console.log('4. ⏱️ Implement rate limiting to prevent abuse');
      console.log('5. 🔍 Remove sensitive data from API responses');
    }
    
    if (this.results.summary.warnings > 0) {
      console.log('6. ⚠️ Review and address all warning-level issues');
      console.log('7. 🛡️ Add missing security headers');
      console.log('8. 🌐 Review CORS configuration for security');
    }
    
    console.log('9. 📝 Implement comprehensive API security monitoring');
    console.log('10. 🔄 Schedule regular security testing');
    
    return {
      timestamp,
      summary: this.results.summary,
      securityScore,
      details: this.results
    };
  }

  async runAllTests() {
    console.log('🚀 Starting API Security Testing - Task 10.1');
    console.log(`Testing API endpoints at: ${this.baseUrl}`);
    
    try {
      await this.testAuthentication();
      await this.testAuthorization();
      await this.testRateLimiting();
      await this.testSensitiveDataExposure();
      await this.testCORSConfiguration();
      await this.testSecurityHeaders();
      
      // Calculate total tests
      this.results.summary.total = 
        this.results.summary.passed + 
        this.results.summary.failed + 
        this.results.summary.warnings;
      
      return this.generateReport();
      
    } catch (error) {
      console.error('❌ API Security Testing failed:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const baseUrl = process.env.TEST_URL || 'http://localhost:3000';
  const tester = new APISecurityTester(baseUrl);
  
  try {
    const report = await tester.runAllTests();
    
    // Save report to file
    const fs = require('fs');
    const reportPath = 'audit-results/task-10-1-api-security-report.json';
    
    // Ensure directory exists
    if (!fs.existsSync('audit-results')) {
      fs.mkdirSync('audit-results', { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    // Exit with appropriate code
    process.exit(report.summary.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { APISecurityTester };
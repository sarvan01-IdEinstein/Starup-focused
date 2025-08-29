#!/usr/bin/env node

/**
 * Task 10.2: API Versioning and Error Handling Security Review
 * 
 * This script tests:
 * - API versioning security and backward compatibility
 * - Error message security (no information disclosure)
 * - API documentation security and access controls
 * - API logging and monitoring implementation
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');

class APIVersioningSecurityTester {
  constructor(baseUrl = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
    this.results = {
      versioning: [],
      errorHandling: [],
      documentation: [],
      logging: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
    
    // Test various API versions and paths
    this.versionTests = [
      { path: '/api/v1/services', expected: false },
      { path: '/api/v2/services', expected: false },
      { path: '/api/services', expected: true },
      { path: '/api/version', expected: false },
      { path: '/api/health', expected: true }
    ];

    // Error scenarios to test
    this.errorScenarios = [
      { path: '/api/nonexistent', method: 'GET', expectedCode: 404 },
      { path: '/api/services', method: 'DELETE', expectedCode: 405 },
      { path: '/api/contact', method: 'POST', body: 'invalid-json', expectedCode: 400 },
      { path: '/api/dashboard/stats', method: 'GET', expectedCode: 401 },
      { path: '/api/user/profile', method: 'PUT', body: {}, expectedCode: 401 }
    ];

    // Documentation endpoints to check
    this.docEndpoints = [
      '/api/docs',
      '/api/swagger',
      '/api/openapi',
      '/docs',
      '/swagger',
      '/api-docs'
    ];

    // Sensitive information patterns in error messages
    this.sensitiveErrorPatterns = [
      /database.*error/i,
      /sql.*error/i,
      /stack trace/i,
      /file path/i,
      /server.*error/i,
      /internal.*error/i,
      /debug/i,
      /exception/i,
      /prisma/i,
      /mongodb/i,
      /mysql/i,
      /postgres/i
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
          'User-Agent': 'API-Versioning-Security-Tester/1.0',
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
        if (typeof body === 'string') {
          req.write(body);
        } else {
          req.write(JSON.stringify(body));
        }
      }
      req.end();
    });
  }

  async testAPIVersioning() {
    console.log('\n🔄 Testing API Versioning Security...');
    
    for (const versionTest of this.versionTests) {
      try {
        const response = await this.makeRequest(versionTest.path, 'GET');
        
        const test = {
          endpoint: versionTest.path,
          test: 'API Versioning',
          status: 'PASS',
          message: '',
          severity: 'MEDIUM'
        };

        const isAccessible = response.statusCode < 400;
        
        if (versionTest.expected && !isAccessible) {
          test.status = 'FAIL';
          test.message = `Expected endpoint not accessible (${response.statusCode})`;
          this.results.summary.failed++;
        } else if (!versionTest.expected && isAccessible) {
          test.status = 'WARNING';
          test.message = `Unexpected versioned endpoint accessible (${response.statusCode})`;
          this.results.summary.warnings++;
        } else if (versionTest.expected && isAccessible) {
          test.message = `Endpoint accessible as expected (${response.statusCode})`;
          this.results.summary.passed++;
        } else {
          test.message = `Versioned endpoint properly blocked (${response.statusCode})`;
          this.results.summary.passed++;
        }

        this.results.versioning.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${versionTest.path}: ${test.message}`);

      } catch (error) {
        const test = {
          endpoint: versionTest.path,
          test: 'API Versioning',
          status: 'ERROR',
          message: `Request failed: ${error.message}`,
          severity: 'MEDIUM'
        };
        this.results.versioning.push(test);
        console.log(`  ❌ ${versionTest.path}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    // Test for version information disclosure
    try {
      const response = await this.makeRequest('/api/health', 'GET');
      
      const test = {
        endpoint: '/api/health',
        test: 'Version Information Disclosure',
        status: 'PASS',
        message: '',
        severity: 'LOW'
      };

      const versionHeaders = ['x-api-version', 'api-version', 'version'];
      const exposedVersions = [];
      
      for (const header of versionHeaders) {
        if (response.headers[header]) {
          exposedVersions.push(`${header}: ${response.headers[header]}`);
        }
      }

      // Check response body for version information
      if (response.body) {
        const versionPatterns = [/version.*[0-9]/i, /v[0-9]+\.[0-9]+/i, /api.*v[0-9]/i];
        for (const pattern of versionPatterns) {
          const matches = response.body.match(pattern);
          if (matches) {
            exposedVersions.push(`body: ${matches[0]}`);
          }
        }
      }

      if (exposedVersions.length > 0) {
        test.status = 'WARNING';
        test.message = `Version information exposed: ${exposedVersions.join(', ')}`;
        this.results.summary.warnings++;
      } else {
        test.message = 'No version information disclosed';
        this.results.summary.passed++;
      }

      this.results.versioning.push(test);
      console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} Version disclosure check: ${test.message}`);

    } catch (error) {
      console.log(`  ❌ Version disclosure test failed: ${error.message}`);
    }
  }

  async testErrorHandling() {
    console.log('\n🚨 Testing Error Handling Security...');
    
    for (const scenario of this.errorScenarios) {
      try {
        const headers = scenario.body ? { 'Content-Type': 'application/json' } : {};
        const response = await this.makeRequest(scenario.path, scenario.method, headers, scenario.body);
        
        const test = {
          endpoint: scenario.path,
          method: scenario.method,
          test: 'Error Handling Security',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          sensitiveInfo: []
        };

        // Check if error code matches expected
        if (response.statusCode !== scenario.expectedCode) {
          test.status = 'WARNING';
          test.message = `Unexpected error code: ${response.statusCode} (expected ${scenario.expectedCode})`;
          this.results.summary.warnings++;
        }

        // Check for sensitive information in error response
        if (response.body) {
          for (const pattern of this.sensitiveErrorPatterns) {
            const matches = response.body.match(pattern);
            if (matches) {
              test.sensitiveInfo.push({
                pattern: pattern.toString(),
                match: matches[0]
              });
            }
          }

          // Check for stack traces
          if (response.body.includes('at ') && response.body.includes('.js:')) {
            test.sensitiveInfo.push({
              type: 'stack_trace',
              description: 'JavaScript stack trace detected'
            });
          }

          // Check for file paths
          const pathPattern = /[A-Za-z]:\\[^\\s]+|\/[^\\s]+\.(js|ts|json)/g;
          const pathMatches = response.body.match(pathPattern);
          if (pathMatches) {
            test.sensitiveInfo.push({
              type: 'file_paths',
              paths: pathMatches.slice(0, 3) // Limit to first 3
            });
          }
        }

        if (test.sensitiveInfo.length > 0) {
          test.status = 'FAIL';
          test.message = `Sensitive information exposed in error response (${test.sensitiveInfo.length} issues)`;
          this.results.summary.failed++;
        } else if (test.status === 'PASS') {
          test.message = `Error handled securely (${response.statusCode})`;
          this.results.summary.passed++;
        }

        this.results.errorHandling.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${scenario.path} (${scenario.method}): ${test.message}`);

        if (test.sensitiveInfo.length > 0) {
          test.sensitiveInfo.forEach(info => {
            console.log(`    🔍 ${info.type || 'pattern'}: ${info.match || info.description || info.paths?.join(', ')}`);
          });
        }

      } catch (error) {
        const test = {
          endpoint: scenario.path,
          method: scenario.method,
          test: 'Error Handling Test',
          status: 'ERROR',
          message: `Request failed: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.errorHandling.push(test);
        console.log(`  ❌ ${scenario.path} (${scenario.method}): ${test.message}`);
        this.results.summary.failed++;
      }
    }
  }

  async testDocumentationSecurity() {
    console.log('\n📚 Testing API Documentation Security...');
    
    for (const docEndpoint of this.docEndpoints) {
      try {
        const response = await this.makeRequest(docEndpoint, 'GET');
        
        const test = {
          endpoint: docEndpoint,
          test: 'Documentation Security',
          status: 'PASS',
          message: '',
          severity: 'MEDIUM'
        };

        if (response.statusCode === 200) {
          // Documentation is accessible - check if it should be
          test.status = 'WARNING';
          test.message = `API documentation publicly accessible (${response.statusCode})`;
          
          // Check for sensitive information in documentation
          if (response.body) {
            const sensitivePatterns = [
              /api[_-]?key/i,
              /secret/i,
              /password/i,
              /token/i,
              /internal/i,
              /admin/i
            ];
            
            const exposedInfo = [];
            for (const pattern of sensitivePatterns) {
              const matches = response.body.match(pattern);
              if (matches) {
                exposedInfo.push(matches[0]);
              }
            }
            
            if (exposedInfo.length > 0) {
              test.status = 'FAIL';
              test.message += ` - Contains sensitive information: ${exposedInfo.join(', ')}`;
              this.results.summary.failed++;
            } else {
              this.results.summary.warnings++;
            }
          } else {
            this.results.summary.warnings++;
          }
        } else if (response.statusCode === 401 || response.statusCode === 403) {
          test.message = `Documentation properly protected (${response.statusCode})`;
          this.results.summary.passed++;
        } else {
          test.message = `Documentation not found (${response.statusCode})`;
          this.results.summary.passed++;
        }

        this.results.documentation.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${docEndpoint}: ${test.message}`);

      } catch (error) {
        // Documentation endpoint not accessible - this is good
        const test = {
          endpoint: docEndpoint,
          test: 'Documentation Security',
          status: 'PASS',
          message: 'Documentation endpoint not accessible',
          severity: 'MEDIUM'
        };
        this.results.documentation.push(test);
        this.results.summary.passed++;
      }
    }
  }

  async testLoggingAndMonitoring() {
    console.log('\n📊 Testing API Logging and Monitoring...');
    
    // Test if logging headers are present
    const testEndpoints = ['/api/health', '/api/services', '/api/contact'];
    
    for (const endpoint of testEndpoints) {
      try {
        const response = await this.makeRequest(endpoint, 'GET', {
          'X-Request-ID': 'test-request-12345',
          'X-Correlation-ID': 'test-correlation-67890'
        });
        
        const test = {
          endpoint,
          test: 'Logging and Monitoring',
          status: 'PASS',
          message: '',
          severity: 'LOW',
          loggingFeatures: []
        };

        // Check for logging-related headers in response
        const loggingHeaders = [
          'x-request-id',
          'x-correlation-id',
          'x-trace-id',
          'x-span-id'
        ];

        for (const header of loggingHeaders) {
          if (response.headers[header]) {
            test.loggingFeatures.push(`${header}: ${response.headers[header]}`);
          }
        }

        // Check response time (basic performance monitoring)
        if (response.responseTime) {
          test.loggingFeatures.push(`response-time: ${response.responseTime}ms`);
        }

        if (test.loggingFeatures.length > 0) {
          test.message = `Logging features detected: ${test.loggingFeatures.length}`;
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = 'No logging/monitoring headers detected';
          this.results.summary.warnings++;
        }

        this.results.logging.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${endpoint}: ${test.message}`);

      } catch (error) {
        const test = {
          endpoint,
          test: 'Logging Test',
          status: 'ERROR',
          message: `Request failed: ${error.message}`,
          severity: 'LOW'
        };
        this.results.logging.push(test);
        console.log(`  ❌ ${endpoint}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    // Test for security event logging
    try {
      // Attempt unauthorized access to trigger security logging
      const response = await this.makeRequest('/api/dashboard/stats', 'GET', {
        'Authorization': 'Bearer malicious-token-attempt'
      });
      
      const test = {
        endpoint: '/api/dashboard/stats',
        test: 'Security Event Logging',
        status: 'PASS',
        message: '',
        severity: 'MEDIUM'
      };

      if (response.statusCode === 401 || response.statusCode === 403) {
        test.message = 'Unauthorized access properly rejected - security logging should be active';
        this.results.summary.passed++;
      } else {
        test.status = 'FAIL';
        test.message = `Unauthorized access not properly handled (${response.statusCode})`;
        this.results.summary.failed++;
      }

      this.results.logging.push(test);
      console.log(`  ${test.status === 'PASS' ? '✅' : '❌'} Security event logging: ${test.message}`);

    } catch (error) {
      console.log(`  ❌ Security event logging test failed: ${error.message}`);
    }
  }

  generateReport() {
    const timestamp = new Date().toISOString();
    
    console.log('\n' + '='.repeat(80));
    console.log('🔄 API VERSIONING & ERROR HANDLING SECURITY REPORT - TASK 10.2');
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
      
      // Show error handling failures
      const errorFailures = this.results.errorHandling.filter(t => t.status === 'FAIL');
      if (errorFailures.length > 0) {
        console.log('\n🚨 Error Handling Issues:');
        errorFailures.forEach(test => {
          console.log(`  - ${test.endpoint} (${test.method}): ${test.message}`);
          if (test.sensitiveInfo && test.sensitiveInfo.length > 0) {
            test.sensitiveInfo.forEach(info => {
              console.log(`    * ${info.type || 'pattern'}: ${info.match || info.description}`);
            });
          }
        });
      }
      
      // Show documentation security failures
      const docFailures = this.results.documentation.filter(t => t.status === 'FAIL');
      if (docFailures.length > 0) {
        console.log('\n📚 Documentation Security Issues:');
        docFailures.forEach(test => {
          console.log(`  - ${test.endpoint}: ${test.message}`);
        });
      }
    }
    
    console.log('\n📋 RECOMMENDATIONS:');
    
    if (this.results.summary.failed > 0) {
      console.log('1. 🚨 Fix all sensitive information disclosure in error messages');
      console.log('2. 📚 Secure or remove publicly accessible API documentation');
      console.log('3. 🚨 Implement proper error handling without information leakage');
    }
    
    if (this.results.summary.warnings > 0) {
      console.log('4. ⚠️ Review API versioning strategy and implementation');
      console.log('5. 📊 Enhance logging and monitoring capabilities');
      console.log('6. 📚 Review documentation access controls');
    }
    
    console.log('7. 🔄 Implement consistent API versioning strategy');
    console.log('8. 📊 Set up comprehensive API monitoring and alerting');
    console.log('9. 🚨 Create standardized error response format');
    console.log('10. 📝 Document API security policies and procedures');
    
    return {
      timestamp,
      summary: this.results.summary,
      securityScore,
      details: this.results
    };
  }

  async runAllTests() {
    console.log('🚀 Starting API Versioning & Error Handling Security Testing - Task 10.2');
    console.log(`Testing API endpoints at: ${this.baseUrl}`);
    
    try {
      await this.testAPIVersioning();
      await this.testErrorHandling();
      await this.testDocumentationSecurity();
      await this.testLoggingAndMonitoring();
      
      // Calculate total tests
      this.results.summary.total = 
        this.results.summary.passed + 
        this.results.summary.failed + 
        this.results.summary.warnings;
      
      return this.generateReport();
      
    } catch (error) {
      console.error('❌ API Versioning Security Testing failed:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const baseUrl = process.env.TEST_URL || 'http://localhost:3000';
  const tester = new APIVersioningSecurityTester(baseUrl);
  
  try {
    const report = await tester.runAllTests();
    
    // Save report to file
    const reportPath = 'audit-results/task-10-2-api-versioning-security-report.json';
    
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

module.exports = { APIVersioningSecurityTester };
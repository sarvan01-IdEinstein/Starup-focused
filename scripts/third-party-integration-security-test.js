#!/usr/bin/env node

/**
 * Task 12.1: Zoho and External Service Integration Security Testing
 * 
 * This script tests:
 * - Zoho API authentication token security and rotation
 * - External service connection security (HTTPS, certificates)
 * - API key storage and protection mechanisms
 * - Webhook security and request validation
 */

const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

class ThirdPartyIntegrationSecurityTester {
  constructor() {
    this.results = {
      zohoSecurity: [],
      externalConnections: [],
      apiKeySecurity: [],
      webhookSecurity: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
    
    // Files to check for third-party integration security
    this.integrationFiles = [
      'lib/zoho/index.ts',
      'lib/zoho/base.ts',
      'lib/zoho/crm.ts',
      'lib/zoho/books.ts',
      'lib/zoho/projects.ts',
      'lib/zoho/workdrive.ts',
      'lib/zoho/token-manager.ts',
      'lib/email.ts',
      'lib/analytics.ts'
    ];

    // Environment files to check for API keys
    this.envFiles = [
      '.env.local',
      '.env.production.template',
      '.env.example'
    ];

    // API endpoints to test for webhook security
    this.webhookEndpoints = [
      '/api/webhooks/zoho',
      '/api/webhooks/payment',
      '/api/webhooks/email',
      '/api/webhooks/analytics'
    ];

    // External services to test
    this.externalServices = [
      { name: 'Zoho CRM', url: 'https://www.zohoapis.com' },
      { name: 'Zoho Books', url: 'https://books.zoho.com' },
      { name: 'Google Analytics', url: 'https://analytics.google.com' },
      { name: 'Email Service', url: 'https://api.sendgrid.com' }
    ];

    // Sensitive API key patterns
    this.apiKeyPatterns = [
      /ZOHO.*API.*KEY/i,
      /ZOHO.*CLIENT.*ID/i,
      /ZOHO.*CLIENT.*SECRET/i,
      /ZOHO.*REFRESH.*TOKEN/i,
      /GOOGLE.*API.*KEY/i,
      /SENDGRID.*API.*KEY/i,
      /STRIPE.*SECRET.*KEY/i,
      /AWS.*ACCESS.*KEY/i,
      /NEXTAUTH.*SECRET/i
    ];
  }

  async testZohoSecurity() {
    console.log('\n🔐 Testing Zoho Integration Security...');
    
    for (const integrationFile of this.integrationFiles) {
      if (!fs.existsSync(integrationFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(integrationFile, 'utf8');
        
        const test = {
          file: integrationFile,
          test: 'Zoho Integration Security',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          securityFeatures: [],
          vulnerabilities: []
        };

        // Check for security features
        if (/token.*refresh|refresh.*token/i.test(content)) {
          test.securityFeatures.push('Token refresh mechanism');
        }
        if (/token.*expir|expir.*token/i.test(content)) {
          test.securityFeatures.push('Token expiration handling');
        }
        if (/encrypt.*token|token.*encrypt/i.test(content)) {
          test.securityFeatures.push('Token encryption');
        }
        if (/validate.*token|token.*valid/i.test(content)) {
          test.securityFeatures.push('Token validation');
        }
        if (/https.*only|secure.*connection/i.test(content)) {
          test.securityFeatures.push('HTTPS enforcement');
        }
        if (/rate.*limit|throttle/i.test(content)) {
          test.securityFeatures.push('Rate limiting');
        }
        if (/error.*handling|try.*catch/i.test(content)) {
          test.securityFeatures.push('Error handling');
        }

        // Check for potential vulnerabilities
        if (/console\.log.*token|console\.log.*key/i.test(content)) {
          test.vulnerabilities.push('Token/key logging to console');
        }
        if (/http:\/\/.*zoho|http:\/\/.*api/i.test(content)) {
          test.vulnerabilities.push('Insecure HTTP connections');
        }
        if (/token.*=.*['""][^*]/i.test(content)) {
          test.vulnerabilities.push('Hardcoded tokens in source code');
        }
        if (/password.*=.*['""][^*]/i.test(content)) {
          test.vulnerabilities.push('Hardcoded passwords in source code');
        }

        // Evaluate security status
        if (test.vulnerabilities.length > 0) {
          test.status = 'FAIL';
          test.message = `Security vulnerabilities found: ${test.vulnerabilities.length} issues`;
          this.results.summary.failed++;
        } else if (test.securityFeatures.length >= 3) {
          test.message = `Good security implementation: ${test.securityFeatures.length} features`;
          this.results.summary.passed++;
        } else if (test.securityFeatures.length > 0) {
          test.status = 'WARNING';
          test.message = `Basic security features: ${test.securityFeatures.length} features`;
          this.results.summary.warnings++;
        } else {
          test.status = 'WARNING';
          test.message = 'Limited security features detected';
          this.results.summary.warnings++;
        }

        this.results.zohoSecurity.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${integrationFile}: ${test.message}`);

        // Show security features
        test.securityFeatures.forEach(feature => {
          console.log(`    🔒 ${feature}`);
        });

        // Show vulnerabilities
        test.vulnerabilities.forEach(vuln => {
          console.log(`    🚨 ${vuln}`);
        });

      } catch (error) {
        const test = {
          file: integrationFile,
          test: 'Zoho Integration Security',
          status: 'ERROR',
          message: `Failed to analyze file: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.zohoSecurity.push(test);
        console.log(`  ❌ ${integrationFile}: ${test.message}`);
        this.results.summary.failed++;
      }
    }
  }

  async testExternalConnections() {
    console.log('\n🌐 Testing External Service Connection Security...');
    
    for (const service of this.externalServices) {
      try {
        const test = {
          service: service.name,
          url: service.url,
          test: 'External Connection Security',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          connectionDetails: {}
        };

        // Test HTTPS connection
        const url = new URL(service.url);
        const isHttps = url.protocol === 'https:';
        
        if (!isHttps) {
          test.status = 'FAIL';
          test.message = 'Insecure HTTP connection detected';
          test.connectionDetails.protocol = 'HTTP (insecure)';
          this.results.summary.failed++;
        } else {
          test.connectionDetails.protocol = 'HTTPS (secure)';
          
          // Test SSL certificate (basic check)
          try {
            await this.testSSLConnection(service.url);
            test.connectionDetails.ssl = 'Valid SSL certificate';
            test.message = 'Secure HTTPS connection with valid SSL';
            this.results.summary.passed++;
          } catch (sslError) {
            test.status = 'WARNING';
            test.message = 'HTTPS connection but SSL validation issues';
            test.connectionDetails.ssl = `SSL issue: ${sslError.message}`;
            this.results.summary.warnings++;
          }
        }

        this.results.externalConnections.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${service.name}: ${test.message}`);

      } catch (error) {
        const test = {
          service: service.name,
          url: service.url,
          test: 'External Connection Security',
          status: 'ERROR',
          message: `Connection test failed: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.externalConnections.push(test);
        console.log(`  ❌ ${service.name}: ${test.message}`);
        this.results.summary.failed++;
      }
    }
  }

  async testSSLConnection(url) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || 443,
        path: '/',
        method: 'HEAD',
        timeout: 5000
      };

      const req = https.request(options, (res) => {
        resolve(res);
      });

      req.on('error', reject);
      req.on('timeout', () => reject(new Error('Connection timeout')));
      req.end();
    });
  }

  async testApiKeySecurity() {
    console.log('\n🔑 Testing API Key Storage and Protection...');
    
    for (const envFile of this.envFiles) {
      if (!fs.existsSync(envFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(envFile, 'utf8');
        
        const test = {
          file: envFile,
          test: 'API Key Security',
          status: 'PASS',
          message: '',
          severity: 'CRITICAL',
          apiKeys: [],
          securityIssues: []
        };

        // Check for API key patterns
        for (const pattern of this.apiKeyPatterns) {
          const matches = content.match(new RegExp(pattern.source, 'gi'));
          if (matches) {
            matches.forEach(match => {
              const keyName = match.split('=')[0];
              const keyValue = match.split('=')[1];
              
              test.apiKeys.push({
                name: keyName,
                hasValue: keyValue && keyValue.trim() !== '',
                isPlaceholder: keyValue && (keyValue.includes('***') || keyValue.includes('your-') || keyValue.includes('placeholder'))
              });

              // Check for security issues
              if (keyValue && !keyValue.includes('***') && !keyValue.includes('your-') && keyValue.length > 10) {
                test.securityIssues.push(`Potentially exposed API key: ${keyName}`);
              }
            });
          }
        }

        // Evaluate security status
        if (test.securityIssues.length > 0) {
          test.status = 'FAIL';
          test.message = `API key security issues: ${test.securityIssues.length} exposed keys`;
          this.results.summary.failed++;
        } else if (test.apiKeys.length > 0) {
          const placeholderKeys = test.apiKeys.filter(k => k.isPlaceholder).length;
          if (placeholderKeys === test.apiKeys.length) {
            test.message = `API keys properly protected: ${test.apiKeys.length} keys with placeholders`;
            this.results.summary.passed++;
          } else {
            test.status = 'WARNING';
            test.message = `Mixed API key security: ${placeholderKeys}/${test.apiKeys.length} keys protected`;
            this.results.summary.warnings++;
          }
        } else {
          test.status = 'WARNING';
          test.message = 'No API keys detected in file';
          this.results.summary.warnings++;
        }

        this.results.apiKeySecurity.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${envFile}: ${test.message}`);

        // Show API keys found
        test.apiKeys.forEach(key => {
          const icon = key.isPlaceholder ? '🔒' : '⚠️';
          console.log(`    ${icon} ${key.name}: ${key.isPlaceholder ? 'Protected' : 'Needs review'}`);
        });

        // Show security issues
        test.securityIssues.forEach(issue => {
          console.log(`    🚨 ${issue}`);
        });

      } catch (error) {
        const test = {
          file: envFile,
          test: 'API Key Security',
          status: 'ERROR',
          message: `Failed to analyze API keys: ${error.message}`,
          severity: 'CRITICAL'
        };
        this.results.apiKeySecurity.push(test);
        console.log(`  ❌ ${envFile}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    // Check for API key usage in source code
    const sourceFiles = this.getAllFiles('lib', '.ts').concat(this.getAllFiles('app/api', '.ts'));
    
    let hardcodedKeysFound = 0;
    let secureKeyUsage = 0;

    for (const sourceFile of sourceFiles) {
      try {
        const content = fs.readFileSync(sourceFile, 'utf8');
        
        // Check for hardcoded API keys
        const hardcodedPatterns = [
          /['"]sk_[a-zA-Z0-9]{20,}['"]/g, // Stripe keys
          /['"]AIza[a-zA-Z0-9]{35}['"]/g, // Google API keys
          /['"][a-zA-Z0-9]{32,}['"]/g // Generic long keys
        ];

        for (const pattern of hardcodedPatterns) {
          if (pattern.test(content)) {
            hardcodedKeysFound++;
          }
        }

        // Check for secure key usage (environment variables)
        if (/process\.env\./i.test(content)) {
          secureKeyUsage++;
        }

      } catch (error) {
        // Skip files that can't be read
        continue;
      }
    }

    const test = {
      scope: 'Source Code',
      test: 'Hardcoded API Key Detection',
      status: 'PASS',
      message: '',
      severity: 'CRITICAL',
      hardcodedKeys: hardcodedKeysFound,
      secureUsage: secureKeyUsage
    };

    if (hardcodedKeysFound > 0) {
      test.status = 'FAIL';
      test.message = `Hardcoded API keys detected in ${hardcodedKeysFound} locations`;
      this.results.summary.failed++;
    } else if (secureKeyUsage > 0) {
      test.message = `Secure API key usage: ${secureKeyUsage} files use environment variables`;
      this.results.summary.passed++;
    } else {
      test.status = 'WARNING';
      test.message = 'No API key usage patterns detected';
      this.results.summary.warnings++;
    }

    this.results.apiKeySecurity.push(test);
    console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} Source Code Analysis: ${test.message}`);
  }

  async testWebhookSecurity() {
    console.log('\n🔗 Testing Webhook Security and Request Validation...');
    
    // Check for webhook implementation files
    const webhookFiles = [
      'app/api/webhooks',
      'lib/webhooks.ts',
      'utils/webhook-validation.ts'
    ];

    for (const webhookPath of webhookFiles) {
      if (!fs.existsSync(webhookPath)) {
        continue;
      }

      try {
        let content = '';
        if (fs.statSync(webhookPath).isDirectory()) {
          // Check all files in webhook directory
          const files = this.getAllFiles(webhookPath, '.ts');
          for (const file of files) {
            content += fs.readFileSync(file, 'utf8') + '\n';
          }
        } else {
          content = fs.readFileSync(webhookPath, 'utf8');
        }

        const test = {
          path: webhookPath,
          test: 'Webhook Security Implementation',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          securityFeatures: [],
          vulnerabilities: []
        };

        // Check for security features
        if (/signature.*verif|verif.*signature/i.test(content)) {
          test.securityFeatures.push('Signature verification');
        }
        if (/hmac|sha256|crypto\.createHmac/i.test(content)) {
          test.securityFeatures.push('HMAC signature validation');
        }
        if (/timestamp.*check|replay.*attack/i.test(content)) {
          test.securityFeatures.push('Timestamp validation (replay protection)');
        }
        if (/ip.*whitelist|allowed.*ips/i.test(content)) {
          test.securityFeatures.push('IP whitelisting');
        }
        if (/rate.*limit|throttle/i.test(content)) {
          test.securityFeatures.push('Rate limiting');
        }
        if (/validate.*payload|payload.*valid/i.test(content)) {
          test.securityFeatures.push('Payload validation');
        }
        if (/https.*only|secure.*webhook/i.test(content)) {
          test.securityFeatures.push('HTTPS enforcement');
        }

        // Check for vulnerabilities
        if (/console\.log.*req\.body|console\.log.*payload/i.test(content)) {
          test.vulnerabilities.push('Webhook payload logging (potential data exposure)');
        }
        if (!/signature.*verif|hmac|sha256/i.test(content)) {
          test.vulnerabilities.push('No signature verification detected');
        }
        if (!/timestamp|replay/i.test(content)) {
          test.vulnerabilities.push('No replay attack protection');
        }

        // Evaluate security status
        if (test.vulnerabilities.length > 0) {
          test.status = 'FAIL';
          test.message = `Webhook security issues: ${test.vulnerabilities.length} vulnerabilities`;
          this.results.summary.failed++;
        } else if (test.securityFeatures.length >= 3) {
          test.message = `Strong webhook security: ${test.securityFeatures.length} features`;
          this.results.summary.passed++;
        } else if (test.securityFeatures.length > 0) {
          test.status = 'WARNING';
          test.message = `Basic webhook security: ${test.securityFeatures.length} features`;
          this.results.summary.warnings++;
        } else {
          test.status = 'WARNING';
          test.message = 'Limited webhook security features';
          this.results.summary.warnings++;
        }

        this.results.webhookSecurity.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${webhookPath}: ${test.message}`);

        // Show security features
        test.securityFeatures.forEach(feature => {
          console.log(`    🔒 ${feature}`);
        });

        // Show vulnerabilities
        test.vulnerabilities.forEach(vuln => {
          console.log(`    🚨 ${vuln}`);
        });

      } catch (error) {
        const test = {
          path: webhookPath,
          test: 'Webhook Security Implementation',
          status: 'ERROR',
          message: `Failed to analyze webhooks: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.webhookSecurity.push(test);
        console.log(`  ❌ ${webhookPath}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    // If no webhook files found, note this
    if (this.results.webhookSecurity.length === 0) {
      const test = {
        path: 'N/A',
        test: 'Webhook Implementation Check',
        status: 'WARNING',
        message: 'No webhook implementations detected',
        severity: 'MEDIUM'
      };
      this.results.webhookSecurity.push(test);
      console.log(`  ⚠️ Webhook Check: ${test.message}`);
      this.results.summary.warnings++;
    }
  }

  getAllFiles(dir, extension) {
    let files = [];
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = `${dir}/${item}`;
        if (fs.statSync(fullPath).isDirectory()) {
          files = files.concat(this.getAllFiles(fullPath, extension));
        } else if (item.endsWith(extension)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore errors for inaccessible directories
    }
    return files;
  }

  generateReport() {
    const timestamp = new Date().toISOString();
    
    console.log('\n' + '='.repeat(80));
    console.log('🔗 THIRD-PARTY INTEGRATION SECURITY REVIEW - TASK 12.1');
    console.log('='.repeat(80));
    console.log(`Generated: ${timestamp}`);
    
    console.log('\n📊 SUMMARY:');
    console.log(`Total Tests: ${this.results.summary.total}`);
    console.log(`✅ Passed: ${this.results.summary.passed}`);
    console.log(`❌ Failed: ${this.results.summary.failed}`);
    console.log(`⚠️ Warnings: ${this.results.summary.warnings}`);
    
    const securityScore = this.results.summary.total > 0 
      ? Math.round((this.results.summary.passed / this.results.summary.total) * 100)
      : 0;
    
    console.log(`\n🎯 Third-Party Integration Security Score: ${securityScore}%`);
    
    if (this.results.summary.failed > 0) {
      console.log('\n❌ CRITICAL THIRD-PARTY SECURITY ISSUES:');
      
      // Show Zoho security failures
      const zohoFailures = this.results.zohoSecurity.filter(t => t.status === 'FAIL');
      if (zohoFailures.length > 0) {
        console.log('\n🔐 Zoho Integration Issues:');
        zohoFailures.forEach(test => {
          console.log(`  - ${test.file}: ${test.message}`);
          if (test.vulnerabilities) {
            test.vulnerabilities.forEach(vuln => {
              console.log(`    * ${vuln}`);
            });
          }
        });
      }
      
      // Show external connection failures
      const connectionFailures = this.results.externalConnections.filter(t => t.status === 'FAIL');
      if (connectionFailures.length > 0) {
        console.log('\n🌐 External Connection Issues:');
        connectionFailures.forEach(test => {
          console.log(`  - ${test.service}: ${test.message}`);
        });
      }
      
      // Show API key security failures
      const apiKeyFailures = this.results.apiKeySecurity.filter(t => t.status === 'FAIL');
      if (apiKeyFailures.length > 0) {
        console.log('\n🔑 API Key Security Issues:');
        apiKeyFailures.forEach(test => {
          console.log(`  - ${test.file || test.scope}: ${test.message}`);
        });
      }
      
      // Show webhook security failures
      const webhookFailures = this.results.webhookSecurity.filter(t => t.status === 'FAIL');
      if (webhookFailures.length > 0) {
        console.log('\n🔗 Webhook Security Issues:');
        webhookFailures.forEach(test => {
          console.log(`  - ${test.path}: ${test.message}`);
        });
      }
    }
    
    console.log('\n📋 RECOMMENDATIONS:');
    
    if (this.results.summary.failed > 0) {
      console.log('1. 🚨 Fix all third-party integration security vulnerabilities');
      console.log('2. 🔑 Secure all API keys and remove hardcoded credentials');
      console.log('3. 🌐 Ensure all external connections use HTTPS with valid certificates');
      console.log('4. 🔗 Implement proper webhook signature verification');
    }
    
    if (this.results.summary.warnings > 0) {
      console.log('5. ⚠️ Enhance third-party integration security features');
      console.log('6. 🔐 Implement token rotation and expiration handling');
      console.log('7. 🔗 Add comprehensive webhook security measures');
    }
    
    console.log('8. 📊 Set up third-party integration monitoring and alerting');
    console.log('9. 🔄 Regular security audits of all external integrations');
    console.log('10. 📝 Document third-party security policies and procedures');
    
    return {
      timestamp,
      summary: this.results.summary,
      securityScore,
      details: this.results
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Third-Party Integration Security Review - Task 12.1');
    
    try {
      await this.testZohoSecurity();
      await this.testExternalConnections();
      await this.testApiKeySecurity();
      await this.testWebhookSecurity();
      
      // Calculate total tests
      this.results.summary.total = 
        this.results.summary.passed + 
        this.results.summary.failed + 
        this.results.summary.warnings;
      
      return this.generateReport();
      
    } catch (error) {
      console.error('❌ Third-Party Integration Security Testing failed:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const tester = new ThirdPartyIntegrationSecurityTester();
  
  try {
    const report = await tester.runAllTests();
    
    // Save report to file
    const reportPath = 'audit-results/task-12-1-third-party-integration-security-report.json';
    
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

module.exports = { ThirdPartyIntegrationSecurityTester };
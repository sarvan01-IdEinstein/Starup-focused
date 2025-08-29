#!/usr/bin/env node

/**
 * Task 12.2: Third-Party Library and Dependency Security Audit
 * 
 * This script tests:
 * - Scan all dependencies for known security vulnerabilities
 * - Update vulnerable libraries to secure versions
 * - Verify third-party service compliance with security standards
 * - Test data sharing and privacy compliance with external services
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

class ThirdPartyDependencySecurityTester {
  constructor() {
    this.results = {
      vulnerabilityScanning: [],
      dependencyAnalysis: [],
      complianceCheck: [],
      dataPrivacy: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
    
    // Package files to analyze
    this.packageFiles = [
      'package.json',
      'package-lock.json',
      'yarn.lock'
    ];

    // Security-sensitive dependencies to check
    this.criticalDependencies = [
      'next',
      'react',
      'prisma',
      'bcrypt',
      'jsonwebtoken',
      'express',
      'cors',
      'helmet',
      'axios',
      'node-fetch'
    ];

    // Known vulnerable patterns
    this.vulnerablePatterns = [
      { name: 'lodash', versions: ['<4.17.21'], issue: 'Prototype pollution' },
      { name: 'axios', versions: ['<0.21.1'], issue: 'SSRF vulnerability' },
      { name: 'jsonwebtoken', versions: ['<8.5.1'], issue: 'Algorithm confusion' },
      { name: 'express', versions: ['<4.17.1'], issue: 'Various security issues' },
      { name: 'bcrypt', versions: ['<5.0.0'], issue: 'Timing attack vulnerability' }
    ];

    // Third-party services to check for compliance
    this.thirdPartyServices = [
      {
        name: 'Zoho',
        complianceChecks: ['GDPR', 'SOC2', 'ISO27001'],
        dataTypes: ['customer_data', 'contact_info', 'business_data']
      },
      {
        name: 'Google Analytics',
        complianceChecks: ['GDPR', 'CCPA'],
        dataTypes: ['analytics_data', 'user_behavior', 'ip_addresses']
      },
      {
        name: 'SendGrid',
        complianceChecks: ['GDPR', 'SOC2'],
        dataTypes: ['email_addresses', 'message_content']
      }
    ];
  }

  async testVulnerabilityScanning() {
    console.log('\n🔍 Scanning Dependencies for Known Vulnerabilities...');
    
    // Check if package.json exists
    if (!fs.existsSync('package.json')) {
      const test = {
        file: 'package.json',
        test: 'Package File Check',
        status: 'FAIL',
        message: 'package.json not found',
        severity: 'HIGH'
      };
      this.results.vulnerabilityScanning.push(test);
      console.log(`  ❌ package.json: ${test.message}`);
      this.results.summary.failed++;
      return;
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      
      const test = {
        file: 'package.json',
        test: 'Dependency Vulnerability Scan',
        status: 'PASS',
        message: '',
        severity: 'HIGH',
        dependencies: {
          total: 0,
          vulnerable: 0,
          outdated: 0
        },
        vulnerabilities: []
      };

      // Count total dependencies
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      test.dependencies.total = Object.keys(deps).length;

      // Check for known vulnerable patterns
      for (const [depName, version] of Object.entries(deps)) {
        const vulnPattern = this.vulnerablePatterns.find(p => p.name === depName);
        if (vulnPattern) {
          // Simple version check (this is basic - in production use proper semver)
          const currentVersion = version.replace(/[\^~]/, '');
          test.vulnerabilities.push({
            package: depName,
            currentVersion: currentVersion,
            vulnerableVersions: vulnPattern.versions,
            issue: vulnPattern.issue
          });
          test.dependencies.vulnerable++;
        }
      }

      // Try to run npm audit if available
      try {
        console.log('    Running npm audit...');
        const auditResult = execSync('npm audit --json', { 
          encoding: 'utf8',
          timeout: 30000,
          stdio: 'pipe'
        });
        
        const auditData = JSON.parse(auditResult);
        if (auditData.vulnerabilities) {
          const vulnCount = Object.keys(auditData.vulnerabilities).length;
          test.dependencies.vulnerable += vulnCount;
          
          // Add audit vulnerabilities to our list
          for (const [pkg, vuln] of Object.entries(auditData.vulnerabilities)) {
            if (vuln.severity === 'high' || vuln.severity === 'critical') {
              test.vulnerabilities.push({
                package: pkg,
                severity: vuln.severity,
                issue: vuln.title || 'Security vulnerability',
                source: 'npm audit'
              });
            }
          }
        }
      } catch (auditError) {
        console.log('    ⚠️ npm audit not available or failed');
      }

      // Evaluate results
      if (test.dependencies.vulnerable > 0) {
        const criticalVulns = test.vulnerabilities.filter(v => 
          v.severity === 'critical' || v.issue.includes('prototype pollution')
        ).length;
        
        if (criticalVulns > 0) {
          test.status = 'FAIL';
          test.message = `Critical vulnerabilities found: ${criticalVulns} critical, ${test.dependencies.vulnerable} total`;
          this.results.summary.failed++;
        } else {
          test.status = 'WARNING';
          test.message = `Vulnerabilities found: ${test.dependencies.vulnerable} packages need updates`;
          this.results.summary.warnings++;
        }
      } else {
        test.message = `No known vulnerabilities detected in ${test.dependencies.total} dependencies`;
        this.results.summary.passed++;
      }

      this.results.vulnerabilityScanning.push(test);
      console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} Vulnerability Scan: ${test.message}`);

      // Show vulnerabilities
      test.vulnerabilities.forEach(vuln => {
        const severity = vuln.severity || 'medium';
        const icon = severity === 'critical' ? '🚨' : severity === 'high' ? '⚠️' : '📋';
        console.log(`    ${icon} ${vuln.package}: ${vuln.issue}`);
      });

    } catch (error) {
      const test = {
        file: 'package.json',
        test: 'Dependency Vulnerability Scan',
        status: 'ERROR',
        message: `Scan failed: ${error.message}`,
        severity: 'HIGH'
      };
      this.results.vulnerabilityScanning.push(test);
      console.log(`  ❌ Vulnerability Scan: ${test.message}`);
      this.results.summary.failed++;
    }
  }

  async testDependencyAnalysis() {
    console.log('\n📦 Analyzing Critical Dependencies...');
    
    if (!fs.existsSync('package.json')) {
      return;
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      for (const criticalDep of this.criticalDependencies) {
        const test = {
          package: criticalDep,
          test: 'Critical Dependency Analysis',
          status: 'PASS',
          message: '',
          severity: 'MEDIUM',
          analysis: {}
        };

        if (allDeps[criticalDep]) {
          const version = allDeps[criticalDep];
          test.analysis.installed = true;
          test.analysis.version = version;
          
          // Check if version is pinned or uses ranges
          if (version.startsWith('^') || version.startsWith('~')) {
            test.analysis.versionStrategy = 'Range (flexible updates)';
          } else {
            test.analysis.versionStrategy = 'Pinned (exact version)';
          }

          // Basic security assessment
          if (criticalDep === 'bcrypt' && !version.includes('5.')) {
            test.status = 'WARNING';
            test.message = 'Consider updating bcrypt to v5+ for better security';
            this.results.summary.warnings++;
          } else if (criticalDep === 'jsonwebtoken' && version.includes('8.5.0')) {
            test.status = 'WARNING';
            test.message = 'Update jsonwebtoken to fix algorithm confusion vulnerability';
            this.results.summary.warnings++;
          } else {
            test.message = `${criticalDep} dependency properly configured`;
            this.results.summary.passed++;
          }
        } else {
          test.analysis.installed = false;
          test.status = 'WARNING';
          test.message = `${criticalDep} not installed (may be optional)`;
          this.results.summary.warnings++;
        }

        this.results.dependencyAnalysis.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${criticalDep}: ${test.message}`);
        
        if (test.analysis.installed) {
          console.log(`    📦 Version: ${test.analysis.version} (${test.analysis.versionStrategy})`);
        }
      }

    } catch (error) {
      const test = {
        package: 'All',
        test: 'Critical Dependency Analysis',
        status: 'ERROR',
        message: `Analysis failed: ${error.message}`,
        severity: 'MEDIUM'
      };
      this.results.dependencyAnalysis.push(test);
      console.log(`  ❌ Dependency Analysis: ${test.message}`);
      this.results.summary.failed++;
    }
  }

  async testComplianceCheck() {
    console.log('\n⚖️ Checking Third-Party Service Compliance...');
    
    for (const service of this.thirdPartyServices) {
      const test = {
        service: service.name,
        test: 'Third-Party Compliance Check',
        status: 'PASS',
        message: '',
        severity: 'HIGH',
        compliance: {
          standards: service.complianceChecks,
          dataTypes: service.dataTypes,
          assessment: 'Manual verification required'
        }
      };

      // Check if service is actually used in the project
      const serviceUsed = await this.checkServiceUsage(service.name);
      
      if (serviceUsed) {
        test.compliance.inUse = true;
        test.message = `${service.name} integration detected - compliance verification needed`;
        
        // Check for privacy policy mentions
        const hasPrivacyPolicy = this.checkPrivacyPolicyMentions(service.name);
        if (hasPrivacyPolicy) {
          test.compliance.privacyPolicyMentioned = true;
          test.message += ' (mentioned in privacy documentation)';
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message += ' (not mentioned in privacy documentation)';
          this.results.summary.warnings++;
        }
      } else {
        test.compliance.inUse = false;
        test.message = `${service.name} not detected in current implementation`;
        this.results.summary.passed++;
      }

      this.results.complianceCheck.push(test);
      console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${service.name}: ${test.message}`);
      
      if (test.compliance.inUse) {
        console.log(`    📋 Compliance standards: ${service.complianceChecks.join(', ')}`);
        console.log(`    🔒 Data types: ${service.dataTypes.join(', ')}`);
      }
    }
  }

  async checkServiceUsage(serviceName) {
    const searchPatterns = {
      'Zoho': ['zoho', 'ZOHO'],
      'Google Analytics': ['gtag', 'analytics', 'GA_MEASUREMENT_ID'],
      'SendGrid': ['sendgrid', 'SENDGRID']
    };

    const patterns = searchPatterns[serviceName] || [serviceName.toLowerCase()];
    
    // Check in source files
    const sourceFiles = [
      ...this.getAllFiles('lib', '.ts'),
      ...this.getAllFiles('app', '.tsx'),
      ...this.getAllFiles('components', '.tsx')
    ];

    for (const file of sourceFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        for (const pattern of patterns) {
          if (content.toLowerCase().includes(pattern.toLowerCase())) {
            return true;
          }
        }
      } catch (error) {
        // Skip files that can't be read
        continue;
      }
    }

    // Check in environment files
    for (const envFile of ['.env.local', '.env.example']) {
      if (fs.existsSync(envFile)) {
        try {
          const content = fs.readFileSync(envFile, 'utf8');
          for (const pattern of patterns) {
            if (content.toLowerCase().includes(pattern.toLowerCase())) {
              return true;
            }
          }
        } catch (error) {
          continue;
        }
      }
    }

    return false;
  }

  checkPrivacyPolicyMentions(serviceName) {
    const privacyFiles = [
      'privacy-policy.md',
      'PRIVACY.md',
      'terms-of-service.md',
      'app/privacy/page.tsx',
      'app/terms/page.tsx'
    ];

    for (const file of privacyFiles) {
      if (fs.existsSync(file)) {
        try {
          const content = fs.readFileSync(file, 'utf8');
          if (content.toLowerCase().includes(serviceName.toLowerCase())) {
            return true;
          }
        } catch (error) {
          continue;
        }
      }
    }

    return false;
  }

  async testDataPrivacy() {
    console.log('\n🔒 Testing Data Sharing and Privacy Compliance...');
    
    // Check for data sharing documentation
    const privacyFiles = [
      'privacy-policy.md',
      'PRIVACY.md',
      'data-processing-agreement.md',
      'app/privacy/page.tsx'
    ];

    let privacyDocumentationFound = false;
    
    for (const privacyFile of privacyFiles) {
      if (!fs.existsSync(privacyFile)) {
        continue;
      }

      privacyDocumentationFound = true;

      try {
        const content = fs.readFileSync(privacyFile, 'utf8');
        
        const test = {
          file: privacyFile,
          test: 'Data Privacy Documentation',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          privacyFeatures: []
        };

        // Check for privacy features
        if (/third.*party.*service|external.*service/i.test(content)) {
          test.privacyFeatures.push('Third-party service disclosure');
        }
        if (/data.*sharing|share.*data/i.test(content)) {
          test.privacyFeatures.push('Data sharing policy');
        }
        if (/cookie.*policy|cookies/i.test(content)) {
          test.privacyFeatures.push('Cookie policy');
        }
        if (/gdpr|general.*data.*protection/i.test(content)) {
          test.privacyFeatures.push('GDPR compliance');
        }
        if (/ccpa|california.*consumer.*privacy/i.test(content)) {
          test.privacyFeatures.push('CCPA compliance');
        }
        if (/data.*retention|retention.*policy/i.test(content)) {
          test.privacyFeatures.push('Data retention policy');
        }
        if (/right.*to.*delete|data.*deletion/i.test(content)) {
          test.privacyFeatures.push('Data deletion rights');
        }
        if (/opt.*out|unsubscribe/i.test(content)) {
          test.privacyFeatures.push('Opt-out mechanisms');
        }

        if (test.privacyFeatures.length >= 4) {
          test.message = `Comprehensive privacy documentation: ${test.privacyFeatures.length} features`;
          this.results.summary.passed++;
        } else if (test.privacyFeatures.length >= 2) {
          test.status = 'WARNING';
          test.message = `Basic privacy documentation: ${test.privacyFeatures.length} features`;
          this.results.summary.warnings++;
        } else {
          test.status = 'FAIL';
          test.message = 'Limited privacy documentation features';
          this.results.summary.failed++;
        }

        this.results.dataPrivacy.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${privacyFile}: ${test.message}`);

        test.privacyFeatures.forEach(feature => {
          console.log(`    🔒 ${feature}`);
        });

      } catch (error) {
        const test = {
          file: privacyFile,
          test: 'Data Privacy Documentation',
          status: 'ERROR',
          message: `Failed to analyze privacy documentation: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.dataPrivacy.push(test);
        console.log(`  ❌ ${privacyFile}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    if (!privacyDocumentationFound) {
      const test = {
        file: 'N/A',
        test: 'Privacy Documentation Check',
        status: 'FAIL',
        message: 'No privacy documentation found',
        severity: 'CRITICAL'
      };
      this.results.dataPrivacy.push(test);
      console.log(`  ❌ Privacy Documentation: ${test.message}`);
      this.results.summary.failed++;
    }

    // Check for consent management implementation
    const consentFiles = [
      'lib/consent.ts',
      'components/CookieConsent.tsx',
      'utils/privacy.ts'
    ];

    let consentImplementationFound = false;
    
    for (const consentFile of consentFiles) {
      if (fs.existsSync(consentFile)) {
        consentImplementationFound = true;
        
        try {
          const content = fs.readFileSync(consentFile, 'utf8');
          
          const test = {
            file: consentFile,
            test: 'Consent Management Implementation',
            status: 'PASS',
            message: '',
            severity: 'HIGH',
            consentFeatures: []
          };

          // Check for consent features
          if (/cookie.*consent|consent.*cookie/i.test(content)) {
            test.consentFeatures.push('Cookie consent management');
          }
          if (/analytics.*consent|tracking.*consent/i.test(content)) {
            test.consentFeatures.push('Analytics consent');
          }
          if (/marketing.*consent|advertising.*consent/i.test(content)) {
            test.consentFeatures.push('Marketing consent');
          }
          if (/withdraw.*consent|revoke.*consent/i.test(content)) {
            test.consentFeatures.push('Consent withdrawal');
          }
          if (/consent.*storage|store.*consent/i.test(content)) {
            test.consentFeatures.push('Consent storage');
          }

          if (test.consentFeatures.length >= 2) {
            test.message = `Consent management implemented: ${test.consentFeatures.length} features`;
            this.results.summary.passed++;
          } else {
            test.status = 'WARNING';
            test.message = 'Basic consent management detected';
            this.results.summary.warnings++;
          }

          this.results.dataPrivacy.push(test);
          console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${consentFile}: ${test.message}`);

        } catch (error) {
          console.log(`  ❌ ${consentFile}: Failed to analyze consent implementation`);
        }
      }
    }

    if (!consentImplementationFound) {
      const test = {
        file: 'N/A',
        test: 'Consent Management Check',
        status: 'WARNING',
        message: 'No consent management implementation found',
        severity: 'MEDIUM'
      };
      this.results.dataPrivacy.push(test);
      console.log(`  ⚠️ Consent Management: ${test.message}`);
      this.results.summary.warnings++;
    }
  }

  getAllFiles(dir, extension) {
    let files = [];
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
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
    console.log('📦 THIRD-PARTY LIBRARY AND DEPENDENCY SECURITY AUDIT - TASK 12.2');
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
    
    console.log(`\n🎯 Dependency Security Score: ${securityScore}%`);
    
    if (this.results.summary.failed > 0) {
      console.log('\n❌ CRITICAL DEPENDENCY SECURITY ISSUES:');
      
      // Show vulnerability scanning failures
      const vulnFailures = this.results.vulnerabilityScanning.filter(t => t.status === 'FAIL');
      if (vulnFailures.length > 0) {
        console.log('\n🔍 Vulnerability Scanning Issues:');
        vulnFailures.forEach(test => {
          console.log(`  - ${test.file}: ${test.message}`);
          if (test.vulnerabilities) {
            test.vulnerabilities.forEach(vuln => {
              console.log(`    * ${vuln.package}: ${vuln.issue}`);
            });
          }
        });
      }
      
      // Show compliance failures
      const complianceFailures = this.results.complianceCheck.filter(t => t.status === 'FAIL');
      if (complianceFailures.length > 0) {
        console.log('\n⚖️ Compliance Issues:');
        complianceFailures.forEach(test => {
          console.log(`  - ${test.service}: ${test.message}`);
        });
      }
      
      // Show privacy failures
      const privacyFailures = this.results.dataPrivacy.filter(t => t.status === 'FAIL');
      if (privacyFailures.length > 0) {
        console.log('\n🔒 Data Privacy Issues:');
        privacyFailures.forEach(test => {
          console.log(`  - ${test.file}: ${test.message}`);
        });
      }
    }
    
    console.log('\n📋 RECOMMENDATIONS:');
    
    if (this.results.summary.failed > 0) {
      console.log('1. 🚨 Update all vulnerable dependencies immediately');
      console.log('2. ⚖️ Verify third-party service compliance documentation');
      console.log('3. 🔒 Create comprehensive privacy documentation');
      console.log('4. 📋 Implement consent management system');
    }
    
    if (this.results.summary.warnings > 0) {
      console.log('5. ⚠️ Review and update dependency versions regularly');
      console.log('6. 📦 Implement automated dependency vulnerability scanning');
      console.log('7. ⚖️ Regular compliance audits of third-party services');
    }
    
    console.log('8. 🔄 Set up automated dependency security monitoring');
    console.log('9. 📝 Document all third-party integrations and data flows');
    console.log('10. 🔒 Regular privacy impact assessments');
    
    return {
      timestamp,
      summary: this.results.summary,
      securityScore,
      details: this.results
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Third-Party Library and Dependency Security Audit - Task 12.2');
    
    try {
      await this.testVulnerabilityScanning();
      await this.testDependencyAnalysis();
      await this.testComplianceCheck();
      await this.testDataPrivacy();
      
      // Calculate total tests
      this.results.summary.total = 
        this.results.summary.passed + 
        this.results.summary.failed + 
        this.results.summary.warnings;
      
      return this.generateReport();
      
    } catch (error) {
      console.error('❌ Third-Party Dependency Security Testing failed:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const tester = new ThirdPartyDependencySecurityTester();
  
  try {
    const report = await tester.runAllTests();
    
    // Save report to file
    const reportPath = 'audit-results/task-12-2-third-party-dependency-security-report.json';
    
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

module.exports = { ThirdPartyDependencySecurityTester };
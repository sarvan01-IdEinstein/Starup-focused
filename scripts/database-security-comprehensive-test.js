#!/usr/bin/env node

/**
 * Task 11.1: Database Security Configuration Review
 * 
 * This script tests:
 * - Database connection encryption and security
 * - Database access controls and user privileges
 * - Data encryption at rest implementation
 * - Database backup security and access controls
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DatabaseSecurityTester {
  constructor() {
    this.results = {
      connectionSecurity: [],
      accessControls: [],
      encryptionAtRest: [],
      backupSecurity: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
    
    // Database configuration files to check
    this.configFiles = [
      '.env.local',
      '.env.production.template',
      '.env.example',
      'prisma/schema.prisma',
      'lib/db.ts',
      'lib/database.ts'
    ];

    // Security patterns to look for
    this.securityPatterns = {
      secure: [
        /ssl.*=.*true/i,
        /sslmode.*=.*require/i,
        /encrypt.*=.*true/i,
        /tls.*=.*true/i,
        /secure.*=.*true/i
      ],
      insecure: [
        /ssl.*=.*false/i,
        /sslmode.*=.*disable/i,
        /encrypt.*=.*false/i,
        /password.*=.*[^*]/i, // Plain text passwords
        /localhost.*:.*[0-9]+/i // Local connections without SSL
      ]
    };

    // Sensitive data patterns
    this.sensitivePatterns = [
      /DATABASE_URL.*=.*[^*]/i,
      /DB_PASSWORD.*=.*[^*]/i,
      /POSTGRES_PASSWORD.*=.*[^*]/i,
      /MYSQL_PASSWORD.*=.*[^*]/i,
      /password.*=.*[^*]/i
    ];
  }

  async testConnectionSecurity() {
    console.log('\n🔐 Testing Database Connection Security...');
    
    for (const configFile of this.configFiles) {
      if (!fs.existsSync(configFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(configFile, 'utf8');
        
        const test = {
          file: configFile,
          test: 'Database Connection Security',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          findings: []
        };

        // Check for secure connection patterns
        let hasSecureConfig = false;
        for (const pattern of this.securityPatterns.secure) {
          if (pattern.test(content)) {
            hasSecureConfig = true;
            test.findings.push({
              type: 'secure',
              pattern: pattern.toString(),
              description: 'Secure connection configuration found'
            });
          }
        }

        // Check for insecure patterns
        let hasInsecureConfig = false;
        for (const pattern of this.securityPatterns.insecure) {
          if (pattern.test(content)) {
            hasInsecureConfig = true;
            test.findings.push({
              type: 'insecure',
              pattern: pattern.toString(),
              description: 'Insecure connection configuration found'
            });
          }
        }

        // Check for exposed credentials
        let hasExposedCredentials = false;
        for (const pattern of this.sensitivePatterns) {
          const matches = content.match(pattern);
          if (matches && !matches[0].includes('***') && !matches[0].includes('your-')) {
            hasExposedCredentials = true;
            test.findings.push({
              type: 'exposed_credentials',
              pattern: pattern.toString(),
              description: 'Potentially exposed database credentials'
            });
          }
        }

        if (hasInsecureConfig || hasExposedCredentials) {
          test.status = 'FAIL';
          test.message = `Security issues found: ${test.findings.filter(f => f.type !== 'secure').length} issues`;
          this.results.summary.failed++;
        } else if (hasSecureConfig) {
          test.message = 'Secure database connection configuration detected';
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = 'No explicit security configuration found';
          this.results.summary.warnings++;
        }

        this.results.connectionSecurity.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${configFile}: ${test.message}`);

        if (test.findings.length > 0) {
          test.findings.forEach(finding => {
            const icon = finding.type === 'secure' ? '🔒' : finding.type === 'insecure' ? '🚨' : '⚠️';
            console.log(`    ${icon} ${finding.description}`);
          });
        }

      } catch (error) {
        const test = {
          file: configFile,
          test: 'Database Connection Security',
          status: 'ERROR',
          message: `Failed to read file: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.connectionSecurity.push(test);
        console.log(`  ❌ ${configFile}: ${test.message}`);
        this.results.summary.failed++;
      }
    }
  }

  async testAccessControls() {
    console.log('\n🛡️ Testing Database Access Controls...');
    
    // Check Prisma schema for access control patterns
    const prismaSchemaPath = 'prisma/schema.prisma';
    if (fs.existsSync(prismaSchemaPath)) {
      try {
        const content = fs.readFileSync(prismaSchemaPath, 'utf8');
        
        const test = {
          file: prismaSchemaPath,
          test: 'Database Access Controls',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          findings: []
        };

        // Check for user/role models
        const hasUserModel = /model\s+User\s*{/i.test(content);
        const hasRoleModel = /model\s+Role\s*{/i.test(content);
        const hasPermissionModel = /model\s+Permission\s*{/i.test(content);

        if (hasUserModel) {
          test.findings.push({
            type: 'user_model',
            description: 'User model found - good for access control'
          });
        }

        if (hasRoleModel || hasPermissionModel) {
          test.findings.push({
            type: 'rbac',
            description: 'Role/Permission model found - RBAC implementation detected'
          });
        }

        // Check for audit fields
        const hasAuditFields = /createdAt|updatedAt|deletedAt/i.test(content);
        if (hasAuditFields) {
          test.findings.push({
            type: 'audit_fields',
            description: 'Audit timestamp fields found'
          });
        }

        // Check for soft delete
        const hasSoftDelete = /deletedAt.*DateTime\?/i.test(content);
        if (hasSoftDelete) {
          test.findings.push({
            type: 'soft_delete',
            description: 'Soft delete implementation found'
          });
        }

        if (test.findings.length > 0) {
          test.message = `Access control features detected: ${test.findings.length} features`;
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = 'Limited access control features detected';
          this.results.summary.warnings++;
        }

        this.results.accessControls.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${prismaSchemaPath}: ${test.message}`);

        test.findings.forEach(finding => {
          console.log(`    🔒 ${finding.description}`);
        });

      } catch (error) {
        const test = {
          file: prismaSchemaPath,
          test: 'Database Access Controls',
          status: 'ERROR',
          message: `Failed to analyze schema: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.accessControls.push(test);
        console.log(`  ❌ ${prismaSchemaPath}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    // Check for database middleware/security files
    const securityFiles = [
      'lib/auth.ts',
      'lib/rbac.ts',
      'lib/permissions.ts',
      'middleware/auth.ts',
      'middleware/rbac.ts'
    ];

    for (const securityFile of securityFiles) {
      if (fs.existsSync(securityFile)) {
        try {
          const content = fs.readFileSync(securityFile, 'utf8');
          
          const test = {
            file: securityFile,
            test: 'Security Middleware',
            status: 'PASS',
            message: '',
            severity: 'MEDIUM',
            features: []
          };

          // Check for security features
          if (/role.*check|permission.*check/i.test(content)) {
            test.features.push('Role/Permission checking');
          }
          if (/audit.*log|activity.*log/i.test(content)) {
            test.features.push('Audit logging');
          }
          if (/rate.*limit|throttle/i.test(content)) {
            test.features.push('Rate limiting');
          }
          if (/encrypt|hash|bcrypt/i.test(content)) {
            test.features.push('Encryption/Hashing');
          }

          if (test.features.length > 0) {
            test.message = `Security features: ${test.features.join(', ')}`;
            this.results.summary.passed++;
          } else {
            test.status = 'WARNING';
            test.message = 'Security file exists but limited features detected';
            this.results.summary.warnings++;
          }

          this.results.accessControls.push(test);
          console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${securityFile}: ${test.message}`);

        } catch (error) {
          console.log(`  ❌ ${securityFile}: Failed to analyze - ${error.message}`);
        }
      }
    }
  }

  async testEncryptionAtRest() {
    console.log('\n🔒 Testing Data Encryption at Rest...');
    
    // Check environment variables for encryption settings
    const envFiles = ['.env.local', '.env.production.template'];
    
    for (const envFile of envFiles) {
      if (!fs.existsSync(envFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(envFile, 'utf8');
        
        const test = {
          file: envFile,
          test: 'Encryption at Rest Configuration',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          encryptionFeatures: []
        };

        // Check for encryption-related environment variables
        const encryptionPatterns = [
          /ENCRYPTION_KEY/i,
          /SECRET_KEY/i,
          /JWT_SECRET/i,
          /NEXTAUTH_SECRET/i,
          /DATABASE.*ENCRYPT/i,
          /SSL.*CERT/i
        ];

        for (const pattern of encryptionPatterns) {
          if (pattern.test(content)) {
            test.encryptionFeatures.push(pattern.toString().replace(/[\/\\^$*+?.()|[\]{}]/g, ''));
          }
        }

        if (test.encryptionFeatures.length > 0) {
          test.message = `Encryption configuration found: ${test.encryptionFeatures.length} settings`;
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = 'No explicit encryption configuration found';
          this.results.summary.warnings++;
        }

        this.results.encryptionAtRest.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${envFile}: ${test.message}`);

      } catch (error) {
        console.log(`  ❌ ${envFile}: Failed to check encryption config - ${error.message}`);
      }
    }

    // Check for encryption utilities
    const encryptionFiles = [
      'lib/encryption.ts',
      'lib/crypto.ts',
      'utils/encryption.ts',
      'utils/crypto.ts'
    ];

    for (const encFile of encryptionFiles) {
      if (fs.existsSync(encFile)) {
        try {
          const content = fs.readFileSync(encFile, 'utf8');
          
          const test = {
            file: encFile,
            test: 'Encryption Implementation',
            status: 'PASS',
            message: '',
            severity: 'HIGH',
            methods: []
          };

          // Check for encryption methods
          if (/AES|aes/i.test(content)) test.methods.push('AES encryption');
          if (/bcrypt/i.test(content)) test.methods.push('bcrypt hashing');
          if (/scrypt/i.test(content)) test.methods.push('scrypt hashing');
          if (/pbkdf2/i.test(content)) test.methods.push('PBKDF2 hashing');
          if (/crypto\.randomBytes/i.test(content)) test.methods.push('Secure random generation');

          if (test.methods.length > 0) {
            test.message = `Encryption methods: ${test.methods.join(', ')}`;
            this.results.summary.passed++;
          } else {
            test.status = 'WARNING';
            test.message = 'Encryption file exists but no standard methods detected';
            this.results.summary.warnings++;
          }

          this.results.encryptionAtRest.push(test);
          console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${encFile}: ${test.message}`);

        } catch (error) {
          console.log(`  ❌ ${encFile}: Failed to analyze encryption implementation - ${error.message}`);
        }
      }
    }
  }

  async testBackupSecurity() {
    console.log('\n💾 Testing Database Backup Security...');
    
    // Check for backup-related scripts and configurations
    const backupFiles = [
      'scripts/backup-database.js',
      'scripts/backup.sh',
      'scripts/restore-database.js',
      'backup.config.js',
      'docker-compose.yml',
      'package.json'
    ];

    for (const backupFile of backupFiles) {
      if (!fs.existsSync(backupFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(backupFile, 'utf8');
        
        const test = {
          file: backupFile,
          test: 'Backup Security Configuration',
          status: 'PASS',
          message: '',
          severity: 'MEDIUM',
          backupFeatures: []
        };

        // Check for backup-related patterns
        if (/pg_dump|mysqldump|mongodump/i.test(content)) {
          test.backupFeatures.push('Database dump utilities');
        }
        if (/encrypt.*backup|backup.*encrypt/i.test(content)) {
          test.backupFeatures.push('Backup encryption');
        }
        if (/s3.*backup|backup.*s3|aws.*backup/i.test(content)) {
          test.backupFeatures.push('Cloud backup storage');
        }
        if (/cron|schedule.*backup/i.test(content)) {
          test.backupFeatures.push('Scheduled backups');
        }
        if (/backup.*retention|retention.*policy/i.test(content)) {
          test.backupFeatures.push('Backup retention policy');
        }

        // Check for insecure backup practices
        const insecurePatterns = [
          /backup.*password.*[^*]/i,
          /backup.*key.*[^*]/i,
          /\.sql.*commit/i // SQL files in version control
        ];

        let hasInsecurePractices = false;
        for (const pattern of insecurePatterns) {
          if (pattern.test(content)) {
            hasInsecurePractices = true;
            test.backupFeatures.push('⚠️ Insecure backup practice detected');
          }
        }

        if (hasInsecurePractices) {
          test.status = 'FAIL';
          test.message = 'Insecure backup practices detected';
          this.results.summary.failed++;
        } else if (test.backupFeatures.length > 0) {
          test.message = `Backup features: ${test.backupFeatures.join(', ')}`;
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = 'File exists but no backup features detected';
          this.results.summary.warnings++;
        }

        this.results.backupSecurity.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${backupFile}: ${test.message}`);

      } catch (error) {
        console.log(`  ❌ ${backupFile}: Failed to analyze backup configuration - ${error.message}`);
      }
    }

    // Check for .gitignore to ensure backups aren't committed
    if (fs.existsSync('.gitignore')) {
      try {
        const content = fs.readFileSync('.gitignore', 'utf8');
        
        const test = {
          file: '.gitignore',
          test: 'Backup File Exclusion',
          status: 'PASS',
          message: '',
          severity: 'HIGH'
        };

        const backupPatterns = [
          /\.sql/i,
          /\.dump/i,
          /backup/i,
          /\.db/i
        ];

        let excludesBackups = false;
        for (const pattern of backupPatterns) {
          if (pattern.test(content)) {
            excludesBackups = true;
            break;
          }
        }

        if (excludesBackups) {
          test.message = 'Backup files properly excluded from version control';
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = 'No explicit backup file exclusions found in .gitignore';
          this.results.summary.warnings++;
        }

        this.results.backupSecurity.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} .gitignore: ${test.message}`);

      } catch (error) {
        console.log(`  ❌ .gitignore: Failed to check backup exclusions - ${error.message}`);
      }
    }
  }

  generateReport() {
    const timestamp = new Date().toISOString();
    
    console.log('\n' + '='.repeat(80));
    console.log('🔒 DATABASE SECURITY CONFIGURATION REVIEW - TASK 11.1');
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
    
    console.log(`\n🎯 Database Security Score: ${securityScore}%`);
    
    if (this.results.summary.failed > 0) {
      console.log('\n❌ CRITICAL DATABASE SECURITY ISSUES:');
      
      // Show connection security failures
      const connectionFailures = this.results.connectionSecurity.filter(t => t.status === 'FAIL');
      if (connectionFailures.length > 0) {
        console.log('\n🔐 Connection Security Issues:');
        connectionFailures.forEach(test => {
          console.log(`  - ${test.file}: ${test.message}`);
          if (test.findings) {
            test.findings.filter(f => f.type !== 'secure').forEach(finding => {
              console.log(`    * ${finding.description}`);
            });
          }
        });
      }
      
      // Show backup security failures
      const backupFailures = this.results.backupSecurity.filter(t => t.status === 'FAIL');
      if (backupFailures.length > 0) {
        console.log('\n💾 Backup Security Issues:');
        backupFailures.forEach(test => {
          console.log(`  - ${test.file}: ${test.message}`);
        });
      }
    }
    
    console.log('\n📋 RECOMMENDATIONS:');
    
    if (this.results.summary.failed > 0) {
      console.log('1. 🚨 Fix all database connection security issues immediately');
      console.log('2. 🔐 Implement proper database encryption and secure connections');
      console.log('3. 💾 Secure backup procedures and remove insecure practices');
    }
    
    if (this.results.summary.warnings > 0) {
      console.log('4. ⚠️ Address all warning-level database security issues');
      console.log('5. 🛡️ Implement comprehensive access controls and RBAC');
      console.log('6. 🔒 Add encryption at rest for sensitive data');
    }
    
    console.log('7. 📊 Implement database security monitoring and alerting');
    console.log('8. 💾 Set up automated, encrypted database backups');
    console.log('9. 🔄 Regular database security audits and penetration testing');
    console.log('10. 📝 Document database security policies and procedures');
    
    return {
      timestamp,
      summary: this.results.summary,
      securityScore,
      details: this.results
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Database Security Configuration Review - Task 11.1');
    
    try {
      await this.testConnectionSecurity();
      await this.testAccessControls();
      await this.testEncryptionAtRest();
      await this.testBackupSecurity();
      
      // Calculate total tests
      this.results.summary.total = 
        this.results.summary.passed + 
        this.results.summary.failed + 
        this.results.summary.warnings;
      
      return this.generateReport();
      
    } catch (error) {
      console.error('❌ Database Security Testing failed:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const tester = new DatabaseSecurityTester();
  
  try {
    const report = await tester.runAllTests();
    
    // Save report to file
    const reportPath = 'audit-results/task-11-1-database-security-report.json';
    
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

module.exports = { DatabaseSecurityTester };
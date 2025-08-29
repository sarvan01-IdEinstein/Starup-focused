#!/usr/bin/env node

/**
 * Task 11.2: Data Integrity and Audit Logging Verification
 * 
 * This script tests:
 * - Data migration security and integrity validation
 * - Audit logging implementation and security
 * - Data retention and deletion procedures
 * - Compliance with data protection regulations
 */

const fs = require('fs');
const path = require('path');

class DataIntegrityAuditTester {
  constructor() {
    this.results = {
      dataMigration: [],
      auditLogging: [],
      dataRetention: [],
      compliance: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };
    
    // Files to check for data integrity and audit features
    this.migrationFiles = [
      'prisma/migrations',
      'prisma/schema.prisma',
      'scripts/migrate-data.js',
      'scripts/seed.js'
    ];

    this.auditFiles = [
      'lib/audit.ts',
      'lib/logging.ts',
      'middleware/audit.ts',
      'utils/audit.ts'
    ];

    this.complianceFiles = [
      'privacy-policy.md',
      'terms-of-service.md',
      'data-protection-policy.md',
      'gdpr-compliance.md'
    ];
  }

  async testDataMigrationSecurity() {
    console.log('\n🔄 Testing Data Migration Security and Integrity...');
    
    // Check Prisma migrations directory
    const migrationsDir = 'prisma/migrations';
    if (fs.existsSync(migrationsDir)) {
      try {
        const migrations = fs.readdirSync(migrationsDir);
        
        const test = {
          directory: migrationsDir,
          test: 'Migration Security Analysis',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          migrationCount: migrations.length,
          securityFeatures: []
        };

        // Analyze migration files for security patterns
        for (const migration of migrations) {
          const migrationPath = path.join(migrationsDir, migration);
          if (fs.statSync(migrationPath).isDirectory()) {
            const sqlFile = path.join(migrationPath, 'migration.sql');
            if (fs.existsSync(sqlFile)) {
              const content = fs.readFileSync(sqlFile, 'utf8');
              
              // Check for security-related migration patterns
              if (/CREATE.*INDEX.*ON.*\(/i.test(content)) {
                test.securityFeatures.push('Database indexes for performance');
              }
              if (/CONSTRAINT.*FOREIGN KEY/i.test(content)) {
                test.securityFeatures.push('Foreign key constraints');
              }
              if (/NOT NULL/i.test(content)) {
                test.securityFeatures.push('NOT NULL constraints');
              }
              if (/UNIQUE/i.test(content)) {
                test.securityFeatures.push('Unique constraints');
              }
              if (/CHECK.*\(/i.test(content)) {
                test.securityFeatures.push('Check constraints');
              }
              
              // Check for potential security issues
              if (/DROP.*TABLE/i.test(content)) {
                test.securityFeatures.push('⚠️ Table drops detected');
              }
              if (/ALTER.*DROP.*COLUMN/i.test(content)) {
                test.securityFeatures.push('⚠️ Column drops detected');
              }
            }
          }
        }

        if (test.migrationCount > 0) {
          test.message = `${test.migrationCount} migrations found with ${test.securityFeatures.length} security features`;
          this.results.summary.passed++;
        } else {
          test.status = 'WARNING';
          test.message = 'No migrations found';
          this.results.summary.warnings++;
        }

        this.results.dataMigration.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${migrationsDir}: ${test.message}`);

        if (test.securityFeatures.length > 0) {
          test.securityFeatures.forEach(feature => {
            const icon = feature.includes('⚠️') ? '⚠️' : '🔒';
            console.log(`    ${icon} ${feature}`);
          });
        }

      } catch (error) {
        const test = {
          directory: migrationsDir,
          test: 'Migration Security Analysis',
          status: 'ERROR',
          message: `Failed to analyze migrations: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.dataMigration.push(test);
        console.log(`  ❌ ${migrationsDir}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    // Check Prisma schema for data integrity features
    const schemaPath = 'prisma/schema.prisma';
    if (fs.existsSync(schemaPath)) {
      try {
        const content = fs.readFileSync(schemaPath, 'utf8');
        
        const test = {
          file: schemaPath,
          test: 'Schema Data Integrity',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          integrityFeatures: []
        };

        // Check for data integrity features
        if (/@unique/i.test(content)) {
          test.integrityFeatures.push('Unique constraints');
        }
        if (/@default/i.test(content)) {
          test.integrityFeatures.push('Default values');
        }
        if (/@@index/i.test(content)) {
          test.integrityFeatures.push('Database indexes');
        }
        if (/@@unique/i.test(content)) {
          test.integrityFeatures.push('Composite unique constraints');
        }
        if (/String.*@db\.VarChar/i.test(content)) {
          test.integrityFeatures.push('String length constraints');
        }
        if (/Int.*@db\.SmallInt|@db\.TinyInt/i.test(content)) {
          test.integrityFeatures.push('Integer size constraints');
        }
        if (/createdAt.*DateTime.*@default\(now\(\)\)/i.test(content)) {
          test.integrityFeatures.push('Audit timestamps (createdAt)');
        }
        if (/updatedAt.*DateTime.*@updatedAt/i.test(content)) {
          test.integrityFeatures.push('Audit timestamps (updatedAt)');
        }
        if (/deletedAt.*DateTime\?/i.test(content)) {
          test.integrityFeatures.push('Soft delete support');
        }

        if (test.integrityFeatures.length >= 3) {
          test.message = `Strong data integrity: ${test.integrityFeatures.length} features`;
          this.results.summary.passed++;
        } else if (test.integrityFeatures.length > 0) {
          test.status = 'WARNING';
          test.message = `Basic data integrity: ${test.integrityFeatures.length} features`;
          this.results.summary.warnings++;
        } else {
          test.status = 'FAIL';
          test.message = 'No data integrity features detected';
          this.results.summary.failed++;
        }

        this.results.dataMigration.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${schemaPath}: ${test.message}`);

        test.integrityFeatures.forEach(feature => {
          console.log(`    🔒 ${feature}`);
        });

      } catch (error) {
        const test = {
          file: schemaPath,
          test: 'Schema Data Integrity',
          status: 'ERROR',
          message: `Failed to analyze schema: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.dataMigration.push(test);
        console.log(`  ❌ ${schemaPath}: ${test.message}`);
        this.results.summary.failed++;
      }
    }
  }

  async testAuditLogging() {
    console.log('\n📊 Testing Audit Logging Implementation...');
    
    for (const auditFile of this.auditFiles) {
      if (!fs.existsSync(auditFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(auditFile, 'utf8');
        
        const test = {
          file: auditFile,
          test: 'Audit Logging Implementation',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          auditFeatures: []
        };

        // Check for audit logging features
        if (/log.*create|create.*log/i.test(content)) {
          test.auditFeatures.push('Create operation logging');
        }
        if (/log.*update|update.*log/i.test(content)) {
          test.auditFeatures.push('Update operation logging');
        }
        if (/log.*delete|delete.*log/i.test(content)) {
          test.auditFeatures.push('Delete operation logging');
        }
        if (/log.*access|access.*log/i.test(content)) {
          test.auditFeatures.push('Access logging');
        }
        if (/user.*id|userId|actor/i.test(content)) {
          test.auditFeatures.push('User identification in logs');
        }
        if (/timestamp|createdAt|loggedAt/i.test(content)) {
          test.auditFeatures.push('Timestamp logging');
        }
        if (/ip.*address|ipAddress|clientIp/i.test(content)) {
          test.auditFeatures.push('IP address logging');
        }
        if (/before.*value|after.*value|old.*value|new.*value/i.test(content)) {
          test.auditFeatures.push('Change tracking (before/after values)');
        }
        if (/audit.*trail|activity.*log|event.*log/i.test(content)) {
          test.auditFeatures.push('Comprehensive audit trail');
        }

        // Check for security in audit logging
        if (/encrypt.*log|log.*encrypt/i.test(content)) {
          test.auditFeatures.push('🔒 Encrypted audit logs');
        }
        if (/sanitize|redact|mask/i.test(content)) {
          test.auditFeatures.push('🔒 Data sanitization in logs');
        }

        if (test.auditFeatures.length >= 5) {
          test.message = `Comprehensive audit logging: ${test.auditFeatures.length} features`;
          this.results.summary.passed++;
        } else if (test.auditFeatures.length >= 2) {
          test.status = 'WARNING';
          test.message = `Basic audit logging: ${test.auditFeatures.length} features`;
          this.results.summary.warnings++;
        } else {
          test.status = 'FAIL';
          test.message = 'Limited audit logging features';
          this.results.summary.failed++;
        }

        this.results.auditLogging.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${auditFile}: ${test.message}`);

        test.auditFeatures.forEach(feature => {
          const icon = feature.includes('🔒') ? '🔒' : '📊';
          console.log(`    ${icon} ${feature}`);
        });

      } catch (error) {
        const test = {
          file: auditFile,
          test: 'Audit Logging Implementation',
          status: 'ERROR',
          message: `Failed to analyze audit file: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.auditLogging.push(test);
        console.log(`  ❌ ${auditFile}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    // Check for audit logging in API routes
    const apiDir = 'app/api';
    if (fs.existsSync(apiDir)) {
      try {
        const apiFiles = this.getAllFiles(apiDir, '.ts');
        let auditingApiCount = 0;
        let totalApiCount = apiFiles.length;

        for (const apiFile of apiFiles) {
          const content = fs.readFileSync(apiFile, 'utf8');
          if (/audit|log.*activity|track.*action/i.test(content)) {
            auditingApiCount++;
          }
        }

        const test = {
          directory: apiDir,
          test: 'API Audit Logging Coverage',
          status: 'PASS',
          message: '',
          severity: 'MEDIUM',
          coverage: Math.round((auditingApiCount / totalApiCount) * 100)
        };

        if (test.coverage >= 70) {
          test.message = `Good audit coverage: ${auditingApiCount}/${totalApiCount} APIs (${test.coverage}%)`;
          this.results.summary.passed++;
        } else if (test.coverage >= 30) {
          test.status = 'WARNING';
          test.message = `Partial audit coverage: ${auditingApiCount}/${totalApiCount} APIs (${test.coverage}%)`;
          this.results.summary.warnings++;
        } else {
          test.status = 'FAIL';
          test.message = `Poor audit coverage: ${auditingApiCount}/${totalApiCount} APIs (${test.coverage}%)`;
          this.results.summary.failed++;
        }

        this.results.auditLogging.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${apiDir}: ${test.message}`);

      } catch (error) {
        console.log(`  ❌ ${apiDir}: Failed to analyze API audit coverage - ${error.message}`);
      }
    }
  }

  async testDataRetention() {
    console.log('\n🗂️ Testing Data Retention and Deletion Procedures...');
    
    // Check for data retention policies in code
    const retentionFiles = [
      'lib/data-retention.ts',
      'scripts/cleanup-data.js',
      'scripts/purge-old-data.js',
      'utils/data-cleanup.ts'
    ];

    for (const retentionFile of retentionFiles) {
      if (!fs.existsSync(retentionFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(retentionFile, 'utf8');
        
        const test = {
          file: retentionFile,
          test: 'Data Retention Implementation',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          retentionFeatures: []
        };

        // Check for retention features
        if (/delete.*old|cleanup.*old|purge.*old/i.test(content)) {
          test.retentionFeatures.push('Old data cleanup');
        }
        if (/retention.*period|keep.*days|expire.*after/i.test(content)) {
          test.retentionFeatures.push('Retention period configuration');
        }
        if (/soft.*delete|mark.*deleted|deletedAt/i.test(content)) {
          test.retentionFeatures.push('Soft delete implementation');
        }
        if (/hard.*delete|permanent.*delete|destroy/i.test(content)) {
          test.retentionFeatures.push('Hard delete capability');
        }
        if (/backup.*before.*delete|archive.*before/i.test(content)) {
          test.retentionFeatures.push('Backup before deletion');
        }
        if (/gdpr.*delete|right.*to.*be.*forgotten/i.test(content)) {
          test.retentionFeatures.push('GDPR compliance (right to be forgotten)');
        }
        if (/schedule.*cleanup|cron.*cleanup/i.test(content)) {
          test.retentionFeatures.push('Scheduled data cleanup');
        }

        if (test.retentionFeatures.length >= 3) {
          test.message = `Comprehensive data retention: ${test.retentionFeatures.length} features`;
          this.results.summary.passed++;
        } else if (test.retentionFeatures.length > 0) {
          test.status = 'WARNING';
          test.message = `Basic data retention: ${test.retentionFeatures.length} features`;
          this.results.summary.warnings++;
        } else {
          test.status = 'FAIL';
          test.message = 'No data retention features detected';
          this.results.summary.failed++;
        }

        this.results.dataRetention.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${retentionFile}: ${test.message}`);

        test.retentionFeatures.forEach(feature => {
          console.log(`    🗂️ ${feature}`);
        });

      } catch (error) {
        const test = {
          file: retentionFile,
          test: 'Data Retention Implementation',
          status: 'ERROR',
          message: `Failed to analyze retention file: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.dataRetention.push(test);
        console.log(`  ❌ ${retentionFile}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    // Check Prisma schema for soft delete support
    const schemaPath = 'prisma/schema.prisma';
    if (fs.existsSync(schemaPath)) {
      try {
        const content = fs.readFileSync(schemaPath, 'utf8');
        
        const test = {
          file: schemaPath,
          test: 'Schema Soft Delete Support',
          status: 'PASS',
          message: '',
          severity: 'MEDIUM'
        };

        const hasSoftDelete = /deletedAt.*DateTime\?/i.test(content);
        const hasCreatedAt = /createdAt.*DateTime/i.test(content);
        const hasUpdatedAt = /updatedAt.*DateTime/i.test(content);

        if (hasSoftDelete && hasCreatedAt && hasUpdatedAt) {
          test.message = 'Full audit trail with soft delete support';
          this.results.summary.passed++;
        } else if (hasSoftDelete) {
          test.status = 'WARNING';
          test.message = 'Soft delete support detected, missing some audit fields';
          this.results.summary.warnings++;
        } else {
          test.status = 'WARNING';
          test.message = 'No soft delete support - only hard deletes available';
          this.results.summary.warnings++;
        }

        this.results.dataRetention.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : '⚠️'} ${schemaPath}: ${test.message}`);

      } catch (error) {
        console.log(`  ❌ ${schemaPath}: Failed to check soft delete support - ${error.message}`);
      }
    }
  }

  async testComplianceFeatures() {
    console.log('\n⚖️ Testing Data Protection Compliance...');
    
    // Check for compliance documentation
    for (const complianceFile of this.complianceFiles) {
      if (!fs.existsSync(complianceFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(complianceFile, 'utf8');
        
        const test = {
          file: complianceFile,
          test: 'Compliance Documentation',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          complianceFeatures: []
        };

        // Check for GDPR compliance features
        if (/gdpr|general.*data.*protection/i.test(content)) {
          test.complianceFeatures.push('GDPR compliance');
        }
        if (/right.*to.*be.*forgotten|data.*deletion/i.test(content)) {
          test.complianceFeatures.push('Right to be forgotten');
        }
        if (/data.*portability|export.*data/i.test(content)) {
          test.complianceFeatures.push('Data portability');
        }
        if (/consent.*management|cookie.*consent/i.test(content)) {
          test.complianceFeatures.push('Consent management');
        }
        if (/data.*retention|retention.*policy/i.test(content)) {
          test.complianceFeatures.push('Data retention policy');
        }
        if (/privacy.*by.*design|data.*minimization/i.test(content)) {
          test.complianceFeatures.push('Privacy by design');
        }
        if (/data.*breach|incident.*response/i.test(content)) {
          test.complianceFeatures.push('Data breach procedures');
        }

        if (test.complianceFeatures.length >= 4) {
          test.message = `Comprehensive compliance: ${test.complianceFeatures.length} features`;
          this.results.summary.passed++;
        } else if (test.complianceFeatures.length >= 2) {
          test.status = 'WARNING';
          test.message = `Basic compliance: ${test.complianceFeatures.length} features`;
          this.results.summary.warnings++;
        } else {
          test.status = 'FAIL';
          test.message = 'Limited compliance features';
          this.results.summary.failed++;
        }

        this.results.compliance.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${complianceFile}: ${test.message}`);

        test.complianceFeatures.forEach(feature => {
          console.log(`    ⚖️ ${feature}`);
        });

      } catch (error) {
        const test = {
          file: complianceFile,
          test: 'Compliance Documentation',
          status: 'ERROR',
          message: `Failed to analyze compliance file: ${error.message}`,
          severity: 'HIGH'
        };
        this.results.compliance.push(test);
        console.log(`  ❌ ${complianceFile}: ${test.message}`);
        this.results.summary.failed++;
      }
    }

    // Check for compliance implementation in code
    const complianceCodeFiles = [
      'lib/gdpr.ts',
      'lib/compliance.ts',
      'utils/data-export.ts',
      'utils/data-deletion.ts'
    ];

    for (const codeFile of complianceCodeFiles) {
      if (!fs.existsSync(codeFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(codeFile, 'utf8');
        
        const test = {
          file: codeFile,
          test: 'Compliance Code Implementation',
          status: 'PASS',
          message: '',
          severity: 'HIGH',
          implementations: []
        };

        // Check for compliance implementations
        if (/export.*user.*data|data.*export/i.test(content)) {
          test.implementations.push('Data export functionality');
        }
        if (/delete.*user.*data|purge.*user/i.test(content)) {
          test.implementations.push('User data deletion');
        }
        if (/anonymize.*data|pseudonymize/i.test(content)) {
          test.implementations.push('Data anonymization');
        }
        if (/consent.*tracking|consent.*log/i.test(content)) {
          test.implementations.push('Consent tracking');
        }
        if (/data.*subject.*request|dsr/i.test(content)) {
          test.implementations.push('Data subject request handling');
        }

        if (test.implementations.length >= 2) {
          test.message = `Compliance implementations: ${test.implementations.join(', ')}`;
          this.results.summary.passed++;
        } else if (test.implementations.length > 0) {
          test.status = 'WARNING';
          test.message = `Limited compliance implementation: ${test.implementations.join(', ')}`;
          this.results.summary.warnings++;
        } else {
          test.status = 'FAIL';
          test.message = 'No compliance implementations detected';
          this.results.summary.failed++;
        }

        this.results.compliance.push(test);
        console.log(`  ${test.status === 'PASS' ? '✅' : test.status === 'FAIL' ? '❌' : '⚠️'} ${codeFile}: ${test.message}`);

      } catch (error) {
        console.log(`  ❌ ${codeFile}: Failed to analyze compliance implementation - ${error.message}`);
      }
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
    console.log('📊 DATA INTEGRITY AND AUDIT LOGGING VERIFICATION - TASK 11.2');
    console.log('='.repeat(80));
    console.log(`Generated: ${timestamp}`);
    
    console.log('\n📊 SUMMARY:');
    console.log(`Total Tests: ${this.results.summary.total}`);
    console.log(`✅ Passed: ${this.results.summary.passed}`);
    console.log(`❌ Failed: ${this.results.summary.failed}`);
    console.log(`⚠️ Warnings: ${this.results.summary.warnings}`);
    
    const integrityScore = this.results.summary.total > 0 
      ? Math.round((this.results.summary.passed / this.results.summary.total) * 100)
      : 0;
    
    console.log(`\n🎯 Data Integrity Score: ${integrityScore}%`);
    
    if (this.results.summary.failed > 0) {
      console.log('\n❌ CRITICAL DATA INTEGRITY ISSUES:');
      
      // Show data migration failures
      const migrationFailures = this.results.dataMigration.filter(t => t.status === 'FAIL');
      if (migrationFailures.length > 0) {
        console.log('\n🔄 Data Migration Issues:');
        migrationFailures.forEach(test => {
          console.log(`  - ${test.file || test.directory}: ${test.message}`);
        });
      }
      
      // Show audit logging failures
      const auditFailures = this.results.auditLogging.filter(t => t.status === 'FAIL');
      if (auditFailures.length > 0) {
        console.log('\n📊 Audit Logging Issues:');
        auditFailures.forEach(test => {
          console.log(`  - ${test.file || test.directory}: ${test.message}`);
        });
      }
      
      // Show compliance failures
      const complianceFailures = this.results.compliance.filter(t => t.status === 'FAIL');
      if (complianceFailures.length > 0) {
        console.log('\n⚖️ Compliance Issues:');
        complianceFailures.forEach(test => {
          console.log(`  - ${test.file}: ${test.message}`);
        });
      }
    }
    
    console.log('\n📋 RECOMMENDATIONS:');
    
    if (this.results.summary.failed > 0) {
      console.log('1. 🚨 Implement comprehensive data integrity constraints');
      console.log('2. 📊 Set up comprehensive audit logging for all operations');
      console.log('3. ⚖️ Implement GDPR and data protection compliance features');
      console.log('4. 🗂️ Create data retention and deletion procedures');
    }
    
    if (this.results.summary.warnings > 0) {
      console.log('5. ⚠️ Enhance existing data integrity and audit features');
      console.log('6. 📊 Improve audit logging coverage across all APIs');
      console.log('7. 🗂️ Implement automated data cleanup procedures');
    }
    
    console.log('8. 🔄 Regular data integrity validation and testing');
    console.log('9. 📊 Set up audit log monitoring and alerting');
    console.log('10. ⚖️ Regular compliance audits and documentation updates');
    
    return {
      timestamp,
      summary: this.results.summary,
      integrityScore,
      details: this.results
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Data Integrity and Audit Logging Verification - Task 11.2');
    
    try {
      await this.testDataMigrationSecurity();
      await this.testAuditLogging();
      await this.testDataRetention();
      await this.testComplianceFeatures();
      
      // Calculate total tests
      this.results.summary.total = 
        this.results.summary.passed + 
        this.results.summary.failed + 
        this.results.summary.warnings;
      
      return this.generateReport();
      
    } catch (error) {
      console.error('❌ Data Integrity Testing failed:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const tester = new DataIntegrityAuditTester();
  
  try {
    const report = await tester.runAllTests();
    
    // Save report to file
    const reportPath = 'audit-results/task-11-2-data-integrity-audit-report.json';
    
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

module.exports = { DataIntegrityAuditTester };
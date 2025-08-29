#!/usr/bin/env node

/**
 * Verification Script for Task 11 Database Security Fixes
 * Tests that all database security issues have been resolved
 */

const fs = require('fs');
const path = require('path');

class Task11FixVerifier {
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

  checkSecureConnectionString(filePath, description) {
    if (!fs.existsSync(filePath)) {
      this.log('INFO', `File not found: ${filePath}`);
      return true;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for SSL mode requirement
      if (content.includes('sslmode=require')) {
        this.log('PASS', `${description}: SSL mode required`);
        return true;
      } else if (content.includes('DATABASE_URL') && !content.includes('sslmode')) {
        this.log('FAIL', `${description}: Missing SSL configuration`);
        return false;
      } else {
        this.log('PASS', `${description}: No database URL or properly configured`);
        return true;
      }
    } catch (error) {
      this.log('FAIL', `Error checking ${filePath}: ${error.message}`);
      return false;
    }
  }

  checkCredentialSecurity(filePath, description) {
    if (!fs.existsSync(filePath)) {
      this.log('INFO', `File not found: ${filePath}`);
      return true;
    }

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for exposed credentials (should be templates/placeholders)
      const exposedPatterns = [
        /ZOHO_CLIENT_SECRET=(?!.*your-|.*\*\*\*).{10,}/,
        /NEXTAUTH_SECRET=(?!.*your-|.*\*\*\*).{10,}/,
        /DATABASE_URL=.*password=(?!.*your-|.*\*\*\*).{5,}/
      ];

      let hasExposedCredentials = false;
      for (const pattern of exposedPatterns) {
        if (pattern.test(content)) {
          hasExposedCredentials = true;
          break;
        }
      }

      if (!hasExposedCredentials) {
        this.log('PASS', `${description}: No exposed credentials detected`);
        return true;
      } else {
        this.log('FAIL', `${description}: Exposed credentials detected`);
        return false;
      }
    } catch (error) {
      this.log('FAIL', `Error checking ${filePath}: ${error.message}`);
      return false;
    }
  }

  async testDatabaseConnectionSecurity() {
    console.log('\n🔐 Testing Database Connection Security...');
    
    // Check environment files for secure connection strings
    this.checkSecureConnectionString('.env.example', 'Environment example');
    this.checkSecureConnectionString('.env.local', 'Local environment');
    this.checkSecureConnectionString('.env.production.template', 'Production template');
    
    // Check Prisma schema
    this.checkFileExists('prisma/schema.prisma', 'Prisma Schema');
    this.checkFileContent('prisma/schema.prisma', 'postgresql', 'PostgreSQL provider');
  }

  async testCredentialSecurity() {
    console.log('\n🔑 Testing Credential Security...');
    
    // Check that credentials are properly templated
    this.checkCredentialSecurity('.env.example', 'Environment example credentials');
    this.checkCredentialSecurity('.env.production.template', 'Production template credentials');
  }

  async testAuditLoggingSystem() {
    console.log('\n📊 Testing Audit Logging System...');
    
    // Check if audit logger exists
    this.checkFileExists('lib/audit-logger.ts', 'Audit Logger');
    
    // Check audit logger features
    this.checkFileContent('lib/audit-logger.ts', 'AuditLogger', 'AuditLogger class');
    this.checkFileContent('lib/audit-logger.ts', 'logApiAccess', 'API access logging');
    this.checkFileContent('lib/audit-logger.ts', 'logAuth', 'Authentication logging');
    this.checkFileContent('lib/audit-logger.ts', 'logDataAccess', 'Data access logging');
    this.checkFileContent('lib/audit-logger.ts', 'logSecurity', 'Security event logging');
    this.checkFileContent('lib/audit-logger.ts', 'sanitizeMeta', 'Data sanitization');
    
    // Check audit middleware
    this.checkFileExists('lib/audit-middleware.ts', 'Audit Middleware');
    this.checkFileContent('lib/audit-middleware.ts', 'createAuditMiddleware', 'Audit middleware factory');
    this.checkFileContent('lib/audit-middleware.ts', 'withAudit', 'Audit wrapper function');
  }

  async testDataIntegrityEnhancements() {
    console.log('\n🛡️ Testing Data Integrity Enhancements...');
    
    // Check Prisma schema for integrity features
    const schemaPath = 'prisma/schema.prisma';
    if (fs.existsSync(schemaPath)) {
      const content = fs.readFileSync(schemaPath, 'utf8');
      
      // Check for soft delete support
      if (content.includes('deletedAt DateTime?')) {
        this.log('PASS', 'Soft delete support added to models');
      } else {
        this.log('FAIL', 'Soft delete support missing');
      }
      
      // Check for database constraints
      if (content.includes('@db.VarChar')) {
        this.log('PASS', 'String length constraints added');
      } else {
        this.log('FAIL', 'String length constraints missing');
      }
      
      // Check for indexes
      if (content.includes('@@index')) {
        this.log('PASS', 'Database indexes defined');
      } else {
        this.log('FAIL', 'Database indexes missing');
      }
      
      // Check for unique constraints
      if (content.includes('@unique')) {
        this.log('PASS', 'Unique constraints defined');
      } else {
        this.log('FAIL', 'Unique constraints missing');
      }
    }
  }

  async testAuditLogModel() {
    console.log('\n📋 Testing Audit Log Database Model...');
    
    // Check if AuditLog model exists in schema
    this.checkFileContent('prisma/schema.prisma', 'model AuditLog', 'AuditLog model');
    this.checkFileContent('prisma/schema.prisma', 'userId      String?', 'AuditLog userId field');
    this.checkFileContent('prisma/schema.prisma', 'action      String', 'AuditLog action field');
    this.checkFileContent('prisma/schema.prisma', 'ipAddress   String?', 'AuditLog IP address field');
    this.checkFileContent('prisma/schema.prisma', 'timestamp   DateTime', 'AuditLog timestamp field');
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📋 TASK 11 DATABASE SECURITY FIXES VERIFICATION REPORT');
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
      console.log('\n🎉 Excellent! All Task 11 database security fixes have been successfully implemented.');
      console.log('✅ Ready to proceed to Task 12 fixes.');
    } else {
      console.log('\n⚠️ Some issues need to be addressed before proceeding.');
    }
    
    return this.results.failed === 0;
  }

  async runAllTests() {
    console.log('🚀 Starting Task 11 Database Security Fixes Verification...\n');
    
    try {
      await this.testDatabaseConnectionSecurity();
      await this.testCredentialSecurity();
      await this.testAuditLoggingSystem();
      await this.testDataIntegrityEnhancements();
      await this.testAuditLogModel();
      
      return this.generateReport();
    } catch (error) {
      console.error('❌ Verification failed:', error.message);
      return false;
    }
  }
}

// Main execution
async function main() {
  const verifier = new Task11FixVerifier();
  const success = await verifier.runAllTests();
  process.exit(success ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { Task11FixVerifier };
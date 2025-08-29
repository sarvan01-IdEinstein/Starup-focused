#!/usr/bin/env node

/**
 * Task 11: Database Security and Data Protection Audit - Complete Runner
 * 
 * This script executes both subtasks:
 * - 11.1: Database security configuration review
 * - 11.2: Data integrity and audit logging verification
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class Task11Runner {
  constructor() {
    this.results = {
      task11_1: null,
      task11_2: null,
      summary: {
        totalTests: 0,
        passed: 0,
        failed: 0,
        warnings: 0,
        overallScore: 0
      }
    };
  }

  async runScript(scriptPath, taskName) {
    return new Promise((resolve, reject) => {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`🚀 Starting ${taskName}`);
      console.log(`${'='.repeat(60)}`);
      
      const child = spawn('node', [scriptPath], {
        stdio: 'inherit'
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log(`✅ ${taskName} completed successfully`);
          resolve({ success: true, code });
        } else {
          console.log(`⚠️ ${taskName} completed with issues (exit code: ${code})`);
          resolve({ success: false, code });
        }
      });

      child.on('error', (error) => {
        console.error(`❌ ${taskName} failed to start:`, error.message);
        reject(error);
      });
    });
  }

  loadReportResults() {
    try {
      // Load Task 11.1 results
      const task11_1Path = 'audit-results/task-11-1-database-security-report.json';
      if (fs.existsSync(task11_1Path)) {
        this.results.task11_1 = JSON.parse(fs.readFileSync(task11_1Path, 'utf8'));
      }

      // Load Task 11.2 results
      const task11_2Path = 'audit-results/task-11-2-data-integrity-audit-report.json';
      if (fs.existsSync(task11_2Path)) {
        this.results.task11_2 = JSON.parse(fs.readFileSync(task11_2Path, 'utf8'));
      }

      // Calculate combined summary
      if (this.results.task11_1 && this.results.task11_2) {
        this.results.summary.totalTests = 
          this.results.task11_1.summary.total + this.results.task11_2.summary.total;
        this.results.summary.passed = 
          this.results.task11_1.summary.passed + this.results.task11_2.summary.passed;
        this.results.summary.failed = 
          this.results.task11_1.summary.failed + this.results.task11_2.summary.failed;
        this.results.summary.warnings = 
          this.results.task11_1.summary.warnings + this.results.task11_2.summary.warnings;
        
        this.results.summary.overallScore = this.results.summary.totalTests > 0
          ? Math.round((this.results.summary.passed / this.results.summary.totalTests) * 100)
          : 0;
      }

    } catch (error) {
      console.error('⚠️ Error loading report results:', error.message);
    }
  }

  generateCombinedReport() {
    const timestamp = new Date().toISOString();
    
    console.log('\n' + '='.repeat(80));
    console.log('🔒 TASK 11: DATABASE SECURITY AND DATA PROTECTION AUDIT - COMPLETE REPORT');
    console.log('='.repeat(80));
    console.log(`Generated: ${timestamp}`);
    
    console.log('\n📊 OVERALL SUMMARY:');
    console.log(`Total Tests: ${this.results.summary.totalTests}`);
    console.log(`✅ Passed: ${this.results.summary.passed}`);
    console.log(`❌ Failed: ${this.results.summary.failed}`);
    console.log(`⚠️ Warnings: ${this.results.summary.warnings}`);
    console.log(`🎯 Overall Database Security Score: ${this.results.summary.overallScore}%`);
    
    if (this.results.task11_1) {
      console.log('\n📋 TASK 11.1 - Database Security Configuration:');
      console.log(`  Tests: ${this.results.task11_1.summary.total}`);
      console.log(`  Passed: ${this.results.task11_1.summary.passed}`);
      console.log(`  Failed: ${this.results.task11_1.summary.failed}`);
      console.log(`  Warnings: ${this.results.task11_1.summary.warnings}`);
      console.log(`  Score: ${this.results.task11_1.securityScore}%`);
    }
    
    if (this.results.task11_2) {
      console.log('\n📋 TASK 11.2 - Data Integrity & Audit Logging:');
      console.log(`  Tests: ${this.results.task11_2.summary.total}`);
      console.log(`  Passed: ${this.results.task11_2.summary.passed}`);
      console.log(`  Failed: ${this.results.task11_2.summary.failed}`);
      console.log(`  Warnings: ${this.results.task11_2.summary.warnings}`);
      console.log(`  Score: ${this.results.task11_2.integrityScore}%`);
    }
    
    // Database security assessment
    let securityLevel = 'EXCELLENT';
    if (this.results.summary.overallScore < 70) securityLevel = 'POOR';
    else if (this.results.summary.overallScore < 85) securityLevel = 'FAIR';
    else if (this.results.summary.overallScore < 95) securityLevel = 'GOOD';
    
    console.log(`\n🛡️ Database Security Assessment: ${securityLevel}`);
    
    if (this.results.summary.failed > 0) {
      console.log('\n❌ CRITICAL DATABASE SECURITY ISSUES REQUIRE IMMEDIATE ATTENTION:');
      console.log('1. 🔐 Database connection security vulnerabilities detected');
      console.log('2. 📊 Insufficient audit logging and data integrity controls');
      console.log('3. 🗂️ Missing data retention and deletion procedures');
      console.log('4. ⚖️ Incomplete compliance with data protection regulations');
    }
    
    console.log('\n📋 KEY FINDINGS:');
    
    // Database Security Findings
    if (this.results.task11_1) {
      console.log('\n🔐 Database Security Configuration:');
      if (this.results.task11_1.summary.failed > 0) {
        console.log('  ❌ Critical connection security issues found');
        console.log('  ❌ Insecure database configuration detected');
      } else {
        console.log('  ✅ Database connection security properly configured');
      }
      
      if (this.results.task11_1.summary.warnings > 0) {
        console.log('  ⚠️ Some security enhancements recommended');
      }
    }
    
    // Data Integrity Findings
    if (this.results.task11_2) {
      console.log('\n📊 Data Integrity & Audit Logging:');
      if (this.results.task11_2.summary.failed > 0) {
        console.log('  ❌ Insufficient data integrity controls');
        console.log('  ❌ Limited audit logging implementation');
      } else {
        console.log('  ✅ Good data integrity and audit logging');
      }
      
      if (this.results.task11_2.summary.warnings > 0) {
        console.log('  ⚠️ Audit logging coverage could be improved');
      }
    }
    
    console.log('\n📋 IMMEDIATE ACTION ITEMS:');
    
    if (this.results.summary.failed > 0) {
      console.log('1. 🚨 Fix all database connection security vulnerabilities');
      console.log('2. 🔐 Implement proper database encryption and access controls');
      console.log('3. 📊 Set up comprehensive audit logging for all database operations');
      console.log('4. 🗂️ Implement data retention and deletion procedures');
      console.log('5. ⚖️ Ensure GDPR and data protection compliance');
    }
    
    console.log('6. 💾 Set up secure, encrypted database backups');
    console.log('7. 🔄 Implement database integrity monitoring');
    console.log('8. 📊 Set up database security alerting and monitoring');
    console.log('9. 📝 Document database security policies and procedures');
    console.log('10. ➡️ Proceed to Task 12: Third-Party Integration Security Review');
    
    // Save combined report
    const combinedReport = {
      timestamp,
      task: 'Task 11: Database Security and Data Protection Audit',
      summary: this.results.summary,
      task11_1: this.results.task11_1,
      task11_2: this.results.task11_2,
      securityLevel,
      keyFindings: {
        databaseSecurity: this.results.task11_1?.summary || {},
        dataIntegrity: this.results.task11_2?.summary || {}
      },
      recommendations: [
        'Fix all database connection security vulnerabilities',
        'Implement comprehensive audit logging',
        'Set up data retention and deletion procedures',
        'Ensure GDPR and data protection compliance',
        'Implement secure database backup procedures'
      ]
    };

    const reportPath = 'audit-results/task-11-complete-database-security-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(combinedReport, null, 2));
    console.log(`\n📄 Complete report saved to: ${reportPath}`);
    
    return combinedReport;
  }

  async runTask11() {
    console.log('🚀 Starting Task 11: Database Security and Data Protection Audit');
    console.log('This task includes comprehensive database security and data integrity testing');
    
    try {
      // Ensure audit results directory exists
      if (!fs.existsSync('audit-results')) {
        fs.mkdirSync('audit-results', { recursive: true });
      }

      // Run Task 11.1: Database Security Configuration Review
      const task11_1Result = await this.runScript(
        'scripts/database-security-comprehensive-test.js',
        'Task 11.1: Database Security Configuration Review'
      );

      // Run Task 11.2: Data Integrity and Audit Logging Verification
      const task11_2Result = await this.runScript(
        'scripts/data-integrity-audit-test.js',
        'Task 11.2: Data Integrity and Audit Logging Verification'
      );

      // Load and combine results
      this.loadReportResults();
      
      // Generate combined report
      const combinedReport = this.generateCombinedReport();
      
      // Determine overall success
      const overallSuccess = task11_1Result.success && task11_2Result.success && 
                           this.results.summary.failed === 0;
      
      if (overallSuccess) {
        console.log('\n🎉 Task 11 completed successfully! All database security tests passed.');
        return { success: true, report: combinedReport };
      } else {
        console.log('\n⚠️ Task 11 completed with database security issues that need attention.');
        return { success: false, report: combinedReport };
      }
      
    } catch (error) {
      console.error('❌ Task 11 execution failed:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const runner = new Task11Runner();
  
  try {
    const result = await runner.runTask11();
    
    if (result.success) {
      console.log('\n✅ Task 11: Database Security and Data Protection Audit - COMPLETED');
      process.exit(0);
    } else {
      console.log('\n⚠️ Task 11: Database Security and Data Protection Audit - COMPLETED WITH ISSUES');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Task 11 execution failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { Task11Runner };
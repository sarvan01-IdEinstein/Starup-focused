#!/usr/bin/env node

/**
 * Task 12: Third-Party Integration Security Review - Complete Runner
 * 
 * This script executes both subtasks:
 * - 12.1: Zoho and external service integration security testing
 * - 12.2: Third-party library and dependency security audit
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class Task12Runner {
  constructor() {
    this.results = {
      task12_1: null,
      task12_2: null,
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
      // Load Task 12.1 results
      const task12_1Path = 'audit-results/task-12-1-third-party-integration-security-report.json';
      if (fs.existsSync(task12_1Path)) {
        this.results.task12_1 = JSON.parse(fs.readFileSync(task12_1Path, 'utf8'));
      }

      // Load Task 12.2 results
      const task12_2Path = 'audit-results/task-12-2-third-party-dependency-security-report.json';
      if (fs.existsSync(task12_2Path)) {
        this.results.task12_2 = JSON.parse(fs.readFileSync(task12_2Path, 'utf8'));
      }

      // Calculate combined summary
      if (this.results.task12_1 && this.results.task12_2) {
        this.results.summary.totalTests = 
          this.results.task12_1.summary.total + this.results.task12_2.summary.total;
        this.results.summary.passed = 
          this.results.task12_1.summary.passed + this.results.task12_2.summary.passed;
        this.results.summary.failed = 
          this.results.task12_1.summary.failed + this.results.task12_2.summary.failed;
        this.results.summary.warnings = 
          this.results.task12_1.summary.warnings + this.results.task12_2.summary.warnings;
        
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
    console.log('🔗 TASK 12: THIRD-PARTY INTEGRATION SECURITY REVIEW - COMPLETE REPORT');
    console.log('='.repeat(80));
    console.log(`Generated: ${timestamp}`);
    
    console.log('\n📊 OVERALL SUMMARY:');
    console.log(`Total Tests: ${this.results.summary.totalTests}`);
    console.log(`✅ Passed: ${this.results.summary.passed}`);
    console.log(`❌ Failed: ${this.results.summary.failed}`);
    console.log(`⚠️ Warnings: ${this.results.summary.warnings}`);
    console.log(`🎯 Overall Third-Party Security Score: ${this.results.summary.overallScore}%`);
    
    if (this.results.task12_1) {
      console.log('\n📋 TASK 12.1 - Third-Party Integration Security:');
      console.log(`  Tests: ${this.results.task12_1.summary.total}`);
      console.log(`  Passed: ${this.results.task12_1.summary.passed}`);
      console.log(`  Failed: ${this.results.task12_1.summary.failed}`);
      console.log(`  Warnings: ${this.results.task12_1.summary.warnings}`);
      console.log(`  Score: ${this.results.task12_1.securityScore}%`);
    }
    
    if (this.results.task12_2) {
      console.log('\n📋 TASK 12.2 - Dependency Security Audit:');
      console.log(`  Tests: ${this.results.task12_2.summary.total}`);
      console.log(`  Passed: ${this.results.task12_2.summary.passed}`);
      console.log(`  Failed: ${this.results.task12_2.summary.failed}`);
      console.log(`  Warnings: ${this.results.task12_2.summary.warnings}`);
      console.log(`  Score: ${this.results.task12_2.securityScore}%`);
    }
    
    // Third-party security assessment
    let securityLevel = 'EXCELLENT';
    if (this.results.summary.overallScore < 70) securityLevel = 'POOR';
    else if (this.results.summary.overallScore < 85) securityLevel = 'FAIR';
    else if (this.results.summary.overallScore < 95) securityLevel = 'GOOD';
    
    console.log(`\n🛡️ Third-Party Security Assessment: ${securityLevel}`);
    
    if (this.results.summary.failed > 0) {
      console.log('\n❌ CRITICAL THIRD-PARTY SECURITY ISSUES REQUIRE IMMEDIATE ATTENTION:');
      console.log('1. 🔗 Third-party integration security vulnerabilities detected');
      console.log('2. 📦 Vulnerable dependencies requiring immediate updates');
      console.log('3. 🔑 API key security and credential management issues');
      console.log('4. ⚖️ Missing compliance documentation and privacy policies');
    }
    
    console.log('\n📋 KEY FINDINGS:');
    
    // Integration Security Findings
    if (this.results.task12_1) {
      console.log('\n🔗 Third-Party Integration Security:');
      if (this.results.task12_1.summary.failed > 0) {
        console.log('  ❌ Critical integration security issues found');
        console.log('  ❌ API key or webhook security vulnerabilities detected');
      } else {
        console.log('  ✅ Third-party integrations properly secured');
      }
      
      if (this.results.task12_1.summary.warnings > 0) {
        console.log('  ⚠️ Some integration security enhancements recommended');
      }
    }
    
    // Dependency Security Findings
    if (this.results.task12_2) {
      console.log('\n📦 Dependency Security:');
      if (this.results.task12_2.summary.failed > 0) {
        console.log('  ❌ Vulnerable dependencies requiring updates');
        console.log('  ❌ Missing privacy documentation or compliance issues');
      } else {
        console.log('  ✅ Dependencies are secure and up-to-date');
      }
      
      if (this.results.task12_2.summary.warnings > 0) {
        console.log('  ⚠️ Some dependency updates or compliance improvements needed');
      }
    }
    
    console.log('\n📋 IMMEDIATE ACTION ITEMS:');
    
    if (this.results.summary.failed > 0) {
      console.log('1. 🚨 Fix all third-party integration security vulnerabilities');
      console.log('2. 📦 Update all vulnerable dependencies immediately');
      console.log('3. 🔑 Secure all API keys and implement proper credential management');
      console.log('4. 🔗 Implement webhook signature verification and security');
      console.log('5. ⚖️ Create comprehensive privacy documentation and compliance policies');
    }
    
    console.log('6. 🌐 Ensure all external connections use HTTPS with valid certificates');
    console.log('7. 📊 Set up automated dependency vulnerability scanning');
    console.log('8. 🔄 Implement regular third-party security audits');
    console.log('9. 📝 Document all third-party integrations and data flows');
    console.log('10. ➡️ Proceed to Task 13: Production Environment Security Configuration');
    
    // Save combined report
    const combinedReport = {
      timestamp,
      task: 'Task 12: Third-Party Integration Security Review',
      summary: this.results.summary,
      task12_1: this.results.task12_1,
      task12_2: this.results.task12_2,
      securityLevel,
      keyFindings: {
        integrationSecurity: this.results.task12_1?.summary || {},
        dependencySecurity: this.results.task12_2?.summary || {}
      },
      recommendations: [
        'Fix all third-party integration security vulnerabilities',
        'Update all vulnerable dependencies immediately',
        'Secure all API keys and implement proper credential management',
        'Implement webhook signature verification and security',
        'Create comprehensive privacy documentation and compliance policies'
      ]
    };

    const reportPath = 'audit-results/task-12-complete-third-party-security-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(combinedReport, null, 2));
    console.log(`\n📄 Complete report saved to: ${reportPath}`);
    
    return combinedReport;
  }

  async runTask12() {
    console.log('🚀 Starting Task 12: Third-Party Integration Security Review');
    console.log('This task includes comprehensive third-party integration and dependency security testing');
    
    try {
      // Ensure audit results directory exists
      if (!fs.existsSync('audit-results')) {
        fs.mkdirSync('audit-results', { recursive: true });
      }

      // Run Task 12.1: Third-Party Integration Security Testing
      const task12_1Result = await this.runScript(
        'scripts/third-party-integration-security-test.js',
        'Task 12.1: Third-Party Integration Security Testing'
      );

      // Run Task 12.2: Third-Party Dependency Security Audit
      const task12_2Result = await this.runScript(
        'scripts/third-party-dependency-security-test.js',
        'Task 12.2: Third-Party Dependency Security Audit'
      );

      // Load and combine results
      this.loadReportResults();
      
      // Generate combined report
      const combinedReport = this.generateCombinedReport();
      
      // Determine overall success
      const overallSuccess = task12_1Result.success && task12_2Result.success && 
                           this.results.summary.failed === 0;
      
      if (overallSuccess) {
        console.log('\n🎉 Task 12 completed successfully! All third-party security tests passed.');
        return { success: true, report: combinedReport };
      } else {
        console.log('\n⚠️ Task 12 completed with third-party security issues that need attention.');
        return { success: false, report: combinedReport };
      }
      
    } catch (error) {
      console.error('❌ Task 12 execution failed:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const runner = new Task12Runner();
  
  try {
    const result = await runner.runTask12();
    
    if (result.success) {
      console.log('\n✅ Task 12: Third-Party Integration Security Review - COMPLETED');
      process.exit(0);
    } else {
      console.log('\n⚠️ Task 12: Third-Party Integration Security Review - COMPLETED WITH ISSUES');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Task 12 execution failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { Task12Runner };
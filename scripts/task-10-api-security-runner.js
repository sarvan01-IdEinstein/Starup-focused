#!/usr/bin/env node

/**
 * Task 10: API Security and Rate Limiting Assessment - Complete Runner
 * 
 * This script executes both subtasks:
 * - 10.1: API security testing using Postman MCP automation
 * - 10.2: API versioning and error handling security review
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class Task10Runner {
  constructor() {
    this.results = {
      task10_1: null,
      task10_2: null,
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
        stdio: 'inherit',
        env: { ...process.env, TEST_URL: process.env.TEST_URL || 'http://localhost:3000' }
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
      // Load Task 10.1 results
      const task10_1Path = 'audit-results/task-10-1-api-security-report.json';
      if (fs.existsSync(task10_1Path)) {
        this.results.task10_1 = JSON.parse(fs.readFileSync(task10_1Path, 'utf8'));
      }

      // Load Task 10.2 results
      const task10_2Path = 'audit-results/task-10-2-api-versioning-security-report.json';
      if (fs.existsSync(task10_2Path)) {
        this.results.task10_2 = JSON.parse(fs.readFileSync(task10_2Path, 'utf8'));
      }

      // Calculate combined summary
      if (this.results.task10_1 && this.results.task10_2) {
        this.results.summary.totalTests = 
          this.results.task10_1.summary.total + this.results.task10_2.summary.total;
        this.results.summary.passed = 
          this.results.task10_1.summary.passed + this.results.task10_2.summary.passed;
        this.results.summary.failed = 
          this.results.task10_1.summary.failed + this.results.task10_2.summary.failed;
        this.results.summary.warnings = 
          this.results.task10_1.summary.warnings + this.results.task10_2.summary.warnings;
        
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
    console.log('🔒 TASK 10: API SECURITY AND RATE LIMITING ASSESSMENT - COMPLETE REPORT');
    console.log('='.repeat(80));
    console.log(`Generated: ${timestamp}`);
    
    console.log('\n📊 OVERALL SUMMARY:');
    console.log(`Total Tests: ${this.results.summary.totalTests}`);
    console.log(`✅ Passed: ${this.results.summary.passed}`);
    console.log(`❌ Failed: ${this.results.summary.failed}`);
    console.log(`⚠️ Warnings: ${this.results.summary.warnings}`);
    console.log(`🎯 Overall Security Score: ${this.results.summary.overallScore}%`);
    
    if (this.results.task10_1) {
      console.log('\n📋 TASK 10.1 - API Security Testing:');
      console.log(`  Tests: ${this.results.task10_1.summary.total}`);
      console.log(`  Passed: ${this.results.task10_1.summary.passed}`);
      console.log(`  Failed: ${this.results.task10_1.summary.failed}`);
      console.log(`  Warnings: ${this.results.task10_1.summary.warnings}`);
      console.log(`  Score: ${this.results.task10_1.securityScore}%`);
    }
    
    if (this.results.task10_2) {
      console.log('\n📋 TASK 10.2 - API Versioning & Error Handling:');
      console.log(`  Tests: ${this.results.task10_2.summary.total}`);
      console.log(`  Passed: ${this.results.task10_2.summary.passed}`);
      console.log(`  Failed: ${this.results.task10_2.summary.failed}`);
      console.log(`  Warnings: ${this.results.task10_2.summary.warnings}`);
      console.log(`  Score: ${this.results.task10_2.securityScore}%`);
    }
    
    // Security assessment
    let securityLevel = 'EXCELLENT';
    if (this.results.summary.overallScore < 70) securityLevel = 'POOR';
    else if (this.results.summary.overallScore < 85) securityLevel = 'FAIR';
    else if (this.results.summary.overallScore < 95) securityLevel = 'GOOD';
    
    console.log(`\n🛡️ Security Assessment: ${securityLevel}`);
    
    if (this.results.summary.failed > 0) {
      console.log('\n❌ CRITICAL SECURITY ISSUES REQUIRE IMMEDIATE ATTENTION:');
      console.log('1. 🚨 API authentication and authorization vulnerabilities detected');
      console.log('2. 🔍 Sensitive data exposure in API responses');
      console.log('3. ⏱️ Missing or inadequate rate limiting');
      console.log('4. 🚨 Information disclosure in error messages');
    }
    
    console.log('\n📋 NEXT STEPS:');
    console.log('1. 🔧 Address all critical security vulnerabilities immediately');
    console.log('2. 🛡️ Implement comprehensive API security controls');
    console.log('3. 📊 Set up continuous API security monitoring');
    console.log('4. 📝 Update API security documentation and policies');
    console.log('5. ➡️ Proceed to Task 11: Database Security and Data Protection Audit');
    
    // Save combined report
    const combinedReport = {
      timestamp,
      task: 'Task 10: API Security and Rate Limiting Assessment',
      summary: this.results.summary,
      task10_1: this.results.task10_1,
      task10_2: this.results.task10_2,
      securityLevel,
      recommendations: [
        'Address all critical security vulnerabilities immediately',
        'Implement comprehensive API security controls',
        'Set up continuous API security monitoring',
        'Update API security documentation and policies'
      ]
    };

    const reportPath = 'audit-results/task-10-complete-api-security-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(combinedReport, null, 2));
    console.log(`\n📄 Complete report saved to: ${reportPath}`);
    
    return combinedReport;
  }

  async runTask10() {
    console.log('🚀 Starting Task 10: API Security and Rate Limiting Assessment');
    console.log('This task includes comprehensive API security testing and validation');
    
    try {
      // Ensure audit results directory exists
      if (!fs.existsSync('audit-results')) {
        fs.mkdirSync('audit-results', { recursive: true });
      }

      // Run Task 10.1: API Security Testing
      const task10_1Result = await this.runScript(
        'scripts/api-security-comprehensive-test.js',
        'Task 10.1: API Security Testing'
      );

      // Run Task 10.2: API Versioning and Error Handling Security
      const task10_2Result = await this.runScript(
        'scripts/api-versioning-security-test.js',
        'Task 10.2: API Versioning & Error Handling Security'
      );

      // Load and combine results
      this.loadReportResults();
      
      // Generate combined report
      const combinedReport = this.generateCombinedReport();
      
      // Determine overall success
      const overallSuccess = task10_1Result.success && task10_2Result.success && 
                           this.results.summary.failed === 0;
      
      if (overallSuccess) {
        console.log('\n🎉 Task 10 completed successfully! All API security tests passed.');
        return { success: true, report: combinedReport };
      } else {
        console.log('\n⚠️ Task 10 completed with security issues that need attention.');
        return { success: false, report: combinedReport };
      }
      
    } catch (error) {
      console.error('❌ Task 10 execution failed:', error.message);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const runner = new Task10Runner();
  
  try {
    const result = await runner.runTask10();
    
    if (result.success) {
      console.log('\n✅ Task 10: API Security and Rate Limiting Assessment - COMPLETED');
      process.exit(0);
    } else {
      console.log('\n⚠️ Task 10: API Security and Rate Limiting Assessment - COMPLETED WITH ISSUES');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Task 10 execution failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { Task10Runner };
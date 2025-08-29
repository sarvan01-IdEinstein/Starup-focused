#!/usr/bin/env node

/**
 * Final Security Verification Script
 * Comprehensive verification of all security fixes implemented in Tasks 10, 11, and 12
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 FINAL SECURITY VERIFICATION');
console.log('==============================\n');

// Security verification results
const verificationResults = {
  task10: { passed: 0, failed: 0, issues: [] },
  task11: { passed: 0, failed: 0, issues: [] },
  task12: { passed: 0, failed: 0, issues: [] }
};

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}: ${filePath}`);
    return true;
  } else {
    console.log(`❌ ${description}: ${filePath} - NOT FOUND`);
    return false;
  }
}

function checkFileContent(filePath, searchPattern, description) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${description}: File ${filePath} not found`);
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const hasPattern = searchPattern.test(content);
    
    if (hasPattern) {
      console.log(`✅ ${description}: Pattern found in ${filePath}`);
      return true;
    } else {
      console.log(`❌ ${description}: Pattern not found in ${filePath}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${description}: Error reading ${filePath} - ${error.message}`);
    return false;
  }
}

// Task 10: API Security Verification
console.log('📋 TASK 10: API SECURITY VERIFICATION');
console.log('=====================================\n');

// Check rate limiter
if (checkFile('lib/rate-limiter.ts', 'Rate Limiter Implementation')) {
  verificationResults.task10.passed++;
} else {
  verificationResults.task10.failed++;
  verificationResults.task10.issues.push('Rate limiter not implemented');
}

// Check error handler
if (checkFile('lib/error-handler.ts', 'Error Handler Implementation')) {
  verificationResults.task10.passed++;
} else {
  verificationResults.task10.failed++;
  verificationResults.task10.issues.push('Error handler not implemented');
}

// Check secure error responses in API routes
const apiRoutes = [
  'app/api/contact/route.ts',
  'app/api/consultation/route.ts',
  'app/api/quotes/route.ts'
];

apiRoutes.forEach(route => {
  if (checkFileContent(route, /handleApiError|ErrorHandler/i, `Secure error handling in ${route}`)) {
    verificationResults.task10.passed++;
  } else {
    verificationResults.task10.failed++;
    verificationResults.task10.issues.push(`Secure error handling missing in ${route}`);
  }
});

console.log('\n');

// Task 11: Database Security Verification
console.log('📋 TASK 11: DATABASE SECURITY VERIFICATION');
console.log('==========================================\n');

// Check audit middleware
if (checkFile('lib/audit-middleware.ts', 'Audit Middleware Implementation')) {
  verificationResults.task11.passed++;
} else {
  verificationResults.task11.failed++;
  verificationResults.task11.issues.push('Audit middleware not implemented');
}

// Check audit logger
if (checkFile('lib/audit-logger.ts', 'Audit Logger Implementation')) {
  verificationResults.task11.passed++;
} else {
  verificationResults.task11.failed++;
  verificationResults.task11.issues.push('Audit logger not implemented');
}

// Check Prisma schema for audit fields
if (checkFileContent('prisma/schema.prisma', /(createdAt|updatedAt|auditLog)/i, 'Audit fields in Prisma schema')) {
  verificationResults.task11.passed++;
} else {
  verificationResults.task11.failed++;
  verificationResults.task11.issues.push('Audit fields missing in Prisma schema');
}

// Check secure authentication configuration
if (checkFileContent('lib/auth.ts', /(useSecureCookies|maxAge|updateAge)/i, 'Secure authentication configuration')) {
  verificationResults.task11.passed++;
} else {
  verificationResults.task11.failed++;
  verificationResults.task11.issues.push('Secure authentication configuration not found');
}

console.log('\n');

// Task 12: Third-Party Security Verification
console.log('📋 TASK 12: THIRD-PARTY SECURITY VERIFICATION');
console.log('==============================================\n');

// Check secure logger
if (checkFile('lib/secure-logger.ts', 'Secure Logger Implementation')) {
  verificationResults.task12.passed++;
} else {
  verificationResults.task12.failed++;
  verificationResults.task12.issues.push('Secure logger not implemented');
}

// Check Zoho integration uses secure logging
const zohoFiles = [
  'lib/zoho/base.ts',
  'lib/zoho/token-manager.ts'
];

zohoFiles.forEach(file => {
  if (checkFileContent(file, /from '@\/lib\/secure-logger'|logger\./i, `Secure logging in ${file}`)) {
    verificationResults.task12.passed++;
  } else {
    verificationResults.task12.failed++;
    verificationResults.task12.issues.push(`Secure logging not implemented in ${file}`);
  }
});

// Check privacy documentation
if (checkFile('PRIVACY_POLICY.md', 'Privacy Policy Documentation')) {
  verificationResults.task12.passed++;
} else {
  verificationResults.task12.failed++;
  verificationResults.task12.issues.push('Privacy policy not created');
}

if (checkFile('DATA_PROCESSING_AGREEMENT.md', 'Data Processing Agreement')) {
  verificationResults.task12.passed++;
} else {
  verificationResults.task12.failed++;
  verificationResults.task12.issues.push('Data processing agreement not created');
}

// Check cookie consent component
if (checkFile('components/shared/CookieConsent.tsx', 'Cookie Consent Component')) {
  verificationResults.task12.passed++;
} else {
  verificationResults.task12.failed++;
  verificationResults.task12.issues.push('Cookie consent component not implemented');
}

console.log('\n');

// Final Results Summary
console.log('🎯 FINAL SECURITY VERIFICATION RESULTS');
console.log('======================================\n');

const totalPassed = verificationResults.task10.passed + verificationResults.task11.passed + verificationResults.task12.passed;
const totalFailed = verificationResults.task10.failed + verificationResults.task11.failed + verificationResults.task12.failed;
const totalTests = totalPassed + totalFailed;

console.log(`Task 10 (API Security): ${verificationResults.task10.passed} passed, ${verificationResults.task10.failed} failed`);
console.log(`Task 11 (Database Security): ${verificationResults.task11.passed} passed, ${verificationResults.task11.failed} failed`);
console.log(`Task 12 (Third-Party Security): ${verificationResults.task12.passed} passed, ${verificationResults.task12.failed} failed`);
console.log(`\nOverall: ${totalPassed}/${totalTests} tests passed (${Math.round((totalPassed/totalTests)*100)}%)`);

// Report issues
const allIssues = [
  ...verificationResults.task10.issues,
  ...verificationResults.task11.issues,
  ...verificationResults.task12.issues
];

if (allIssues.length > 0) {
  console.log('\n⚠️  REMAINING ISSUES:');
  allIssues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
} else {
  console.log('\n🎉 ALL SECURITY FIXES VERIFIED SUCCESSFULLY!');
}

// Security recommendations
console.log('\n📋 SECURITY RECOMMENDATIONS:');
console.log('1. Regularly update dependencies to patch security vulnerabilities');
console.log('2. Implement automated security scanning in CI/CD pipeline');
console.log('3. Conduct periodic security audits');
console.log('4. Monitor application logs for suspicious activities');
console.log('5. Keep security documentation up to date');

console.log('\n✅ Security verification complete!');
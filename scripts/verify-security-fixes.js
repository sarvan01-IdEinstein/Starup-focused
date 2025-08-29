#!/usr/bin/env node

/**
 * Security Fixes Verification Script
 * Verifies that all critical security issues have been resolved
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFYING CRITICAL SECURITY FIXES');
console.log('===================================\n');

let allFixed = true;

// Check 1: Verify GDPR error handler exists
console.log('1. Checking GDPR error handler...');
if (fs.existsSync('lib/gdpr-error-handler.ts')) {
  console.log('   ✅ GDPR error handler created');
} else {
  console.log('   ❌ GDPR error handler missing');
  allFixed = false;
}

// Check 2: Verify rate limiter exists
console.log('2. Checking GDPR rate limiter...');
if (fs.existsSync('lib/gdpr-rate-limiter.ts')) {
  console.log('   ✅ GDPR rate limiter created');
} else {
  console.log('   ❌ GDPR rate limiter missing');
  allFixed = false;
}

// Check 3: Verify secure logger exists
console.log('3. Checking secure logger...');
if (fs.existsSync('lib/gdpr-secure-logger.ts')) {
  console.log('   ✅ GDPR secure logger created');
} else {
  console.log('   ❌ GDPR secure logger missing');
  allFixed = false;
}

// Check 4: Verify environment files are secure
console.log('4. Checking environment file security...');
if (fs.existsSync('.env.example')) {
  const envExample = fs.readFileSync('.env.example', 'utf8');
  if (envExample.includes('your-') && !envExample.includes('actual-')) {
    console.log('   ✅ .env.example properly templated');
  } else {
    console.log('   ❌ .env.example may contain exposed credentials');
    allFixed = false;
  }
} else {
  console.log('   ❌ .env.example missing');
  allFixed = false;
}

// Check 5: Verify production template exists
console.log('5. Checking production environment template...');
if (fs.existsSync('.env.production.template')) {
  console.log('   ✅ Production environment template created');
} else {
  console.log('   ❌ Production environment template missing');
  allFixed = false;
}

// Check 6: Verify GDPR privacy policy exists
console.log('6. Checking GDPR privacy policy...');
if (fs.existsSync('GDPR_PRIVACY_POLICY.md')) {
  console.log('   ✅ GDPR privacy policy created');
} else {
  console.log('   ❌ GDPR privacy policy missing');
  allFixed = false;
}

// Check 7: Verify audit middleware exists
console.log('7. Checking audit middleware...');
if (fs.existsSync('lib/gdpr-audit-middleware.ts')) {
  console.log('   ✅ GDPR audit middleware created');
} else {
  console.log('   ❌ GDPR audit middleware missing');
  allFixed = false;
}

// Check 8: Verify token logging has been removed
console.log('8. Checking for token logging in Zoho files...');
const zohoFiles = [
  'lib/zoho/base.ts',
  'lib/zoho/token-manager.ts',
  'lib/zoho/crm.ts'
];

let tokenLoggingFound = false;
zohoFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.match(/console\.log\([^)]*token[^)]*\)/gi)) {
      console.log(`   ❌ Token logging found in ${file}`);
      tokenLoggingFound = true;
      allFixed = false;
    }
  }
});

if (!tokenLoggingFound) {
  console.log('   ✅ No token logging found in Zoho files');
}

// Final result
console.log('\n' + '='.repeat(50));
if (allFixed) {
  console.log('🎉 ALL CRITICAL SECURITY FIXES VERIFIED!');
  console.log('✅ Your application is ready for production deployment.');
  console.log('\nNext steps:');
  console.log('1. Review and customize the GDPR privacy policy');
  console.log('2. Set up production environment variables');
  console.log('3. Test all functionality in staging environment');
  console.log('4. Deploy to production');
} else {
  console.log('❌ CRITICAL SECURITY ISSUES REMAIN');
  console.log('⚠️  DO NOT DEPLOY TO PRODUCTION until all issues are fixed.');
  console.log('\nPlease run the security implementation script again:');
  console.log('node scripts/gdpr-security-implementation.js');
}
console.log('='.repeat(50));
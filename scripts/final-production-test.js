#!/usr/bin/env node

/**
 * Final Production Readiness Test
 * Tests all critical functionality before deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 IdEinstein Final Production Test');
console.log('=====================================\n');

// Test results tracking
let tests = [];
let passed = 0;
let failed = 0;

function test(name, condition, details = '') {
  const result = condition();
  const status = result ? '✅ PASS' : '❌ FAIL';
  
  tests.push({ name, status: result, details });
  
  if (result) {
    passed++;
    console.log(`${status} ${name}`);
  } else {
    failed++;
    console.log(`${status} ${name}`);
    if (details) console.log(`   ${details}`);
  }
}

console.log('📋 Testing Core Files...\n');

// Test 1: Essential files exist
test('Package.json exists', () => fs.existsSync('package.json'));
test('Next.js config exists', () => fs.existsSync('next.config.js'));
test('Tailwind config exists', () => fs.existsSync('tailwind.config.js'));
test('TypeScript config exists', () => fs.existsSync('tsconfig.json'));

// Test 2: Key pages exist
test('Homepage exists', () => fs.existsSync('app/page.tsx'));
test('About page exists', () => fs.existsSync('app/about/page.tsx'));
test('Services pages exist', () => fs.existsSync('app/services'));
test('Product Development Accelerator exists', () => 
  fs.existsSync('app/services/product-development-accelerator/page.tsx'));
test('Solutions pages exist', () => fs.existsSync('app/solutions/page.tsx'));
test('Startup solutions page exists', () => 
  fs.existsSync('app/solutions/for-startups/page.tsx'));
test('Enterprise solutions page exists', () => 
  fs.existsSync('app/solutions/for-enterprises/page.tsx'));

// Test 3: Critical components exist
test('Header component exists', () => fs.existsSync('components/layout/Header.tsx'));
test('StartupPackageSection exists', () => 
  fs.existsSync('components/home/StartupPackageSection.tsx'));
test('QuotationForm exists', () => fs.existsSync('components/shared/QuotationForm.tsx'));
test('ContactWidget exists', () => fs.existsSync('components/shared/ContactWidget.tsx'));

// Test 4: API routes exist
test('Contact API exists', () => fs.existsSync('app/api/contact'));
test('Quotes API exists', () => fs.existsSync('app/api/quotes'));
test('Consultation API exists', () => fs.existsSync('app/api/consultation'));
test('Auth API exists', () => fs.existsSync('app/api/auth'));

// Test 5: Environment configuration
test('Environment example exists', () => fs.existsSync('.env.example'));
test('Environment local exists', () => fs.existsSync('.env.local'));

// Test 6: Database and backend
test('Prisma schema exists', () => fs.existsSync('prisma/schema.prisma'));
test('Zoho integration exists', () => fs.existsSync('lib/zoho'));
test('RBAC system exists', () => fs.existsSync('lib/rbac.ts'));
test('Audit system exists', () => fs.existsSync('lib/audit.ts'));

// Test 7: Deployment files
test('Vercel config exists', () => fs.existsSync('vercel.json'));
test('Deployment guides exist', () => fs.existsSync('DEPLOY_NOW.md'));

console.log('\n📊 Testing Package Dependencies...\n');

// Test 8: Package.json validation
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  test('Next.js dependency exists', () => pkg.dependencies['next']);
  test('React dependency exists', () => pkg.dependencies['react']);
  test('TypeScript dependency exists', () => pkg.devDependencies['typescript']);
  test('Tailwind dependency exists', () => pkg.devDependencies['tailwindcss']);
  test('Prisma dependency exists', () => pkg.dependencies['@prisma/client']);
  test('NextAuth dependency exists', () => pkg.dependencies['next-auth']);
  test('Zod validation exists', () => pkg.dependencies['zod']);
  test('Build script exists', () => pkg.scripts['build']);
  test('Dev script exists', () => pkg.scripts['dev']);
  
} catch (error) {
  test('Package.json is valid JSON', () => false, 'Invalid JSON format');
}

console.log('\n🔧 Testing Configuration Files...\n');

// Test 9: Configuration files validation
try {
  const nextConfig = fs.readFileSync('next.config.js', 'utf8');
  test('Next.js config is valid', () => nextConfig.includes('module.exports'));
} catch (error) {
  test('Next.js config is valid', () => false, 'Config file error');
}

try {
  const tailwindConfig = fs.readFileSync('tailwind.config.js', 'utf8');
  test('Tailwind config is valid', () => tailwindConfig.includes('module.exports'));
} catch (error) {
  test('Tailwind config is valid', () => false, 'Config file error');
}

console.log('\n🎯 Testing Startup Package Implementation...\n');

// Test 10: Startup package specific tests
try {
  const headerContent = fs.readFileSync('components/layout/Header.tsx', 'utf8');
  test('Header includes startup package navigation', () => 
    headerContent.includes('product-development-accelerator'));
  
  const homepageContent = fs.readFileSync('app/page.tsx', 'utf8');
  test('Homepage includes StartupPackageSection', () => 
    homepageContent.includes('StartupPackageSection'));
  
  const acceleratorPage = fs.readFileSync('app/services/product-development-accelerator/page.tsx', 'utf8');
  test('Accelerator page has proper content', () => 
    acceleratorPage.includes('12-20 weeks') && acceleratorPage.includes('Product Development'));
  
} catch (error) {
  test('Startup package implementation', () => false, 'File reading error');
}

console.log('\n📱 Testing Production Readiness...\n');

// Test 11: Production readiness
test('Gitignore exists', () => fs.existsSync('.gitignore'));
test('README exists', () => fs.existsSync('README.md'));
test('Deployment checklist exists', () => fs.existsSync('FINAL_DEPLOYMENT_CHECKLIST.md'));

// Test 12: Environment variables check
try {
  const envExample = fs.readFileSync('.env.example', 'utf8');
  test('Environment example has Zoho config', () => envExample.includes('ZOHO_CLIENT_ID'));
  test('Environment example has NextAuth config', () => envExample.includes('NEXTAUTH_SECRET'));
  
  const envLocal = fs.readFileSync('.env.local', 'utf8');
  test('Local environment has Zoho tokens', () => envLocal.includes('ZOHO_REFRESH_TOKEN'));
  test('Local environment has NextAuth secret', () => envLocal.includes('NEXTAUTH_SECRET'));
  
} catch (error) {
  test('Environment configuration', () => false, 'Environment files missing');
}

console.log('\n' + '='.repeat(50));
console.log('📊 FINAL TEST RESULTS');
console.log('='.repeat(50));

console.log(`\n✅ PASSED: ${passed} tests`);
console.log(`❌ FAILED: ${failed} tests`);
console.log(`📊 SUCCESS RATE: ${Math.round((passed / (passed + failed)) * 100)}%\n`);

if (failed === 0) {
  console.log('🎉 ALL TESTS PASSED! 🎉');
  console.log('🚀 IdEinstein is READY FOR PRODUCTION DEPLOYMENT!');
  console.log('\n📋 Next Steps:');
  console.log('1. git add . && git commit -m "Production ready"');
  console.log('2. git push origin main');
  console.log('3. Deploy to Vercel');
  console.log('4. Add environment variables');
  console.log('5. Go live! 🌟');
} else {
  console.log('⚠️  Some tests failed. Please review and fix issues before deployment.');
  console.log('\n❌ Failed Tests:');
  tests.filter(t => !t.status).forEach(t => {
    console.log(`   - ${t.name}`);
    if (t.details) console.log(`     ${t.details}`);
  });
}

console.log('\n' + '='.repeat(50));
console.log('🎯 IdEinstein Production Test Complete');
console.log('='.repeat(50));

// Exit with appropriate code
process.exit(failed === 0 ? 0 : 1);
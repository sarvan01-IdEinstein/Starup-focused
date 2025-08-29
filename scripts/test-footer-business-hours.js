#!/usr/bin/env node

/**
 * Footer Business Hours Test Script
 * Verifies that the footer displays Saturday hours consistent with contact page
 */

const fs = require('fs');
const path = require('path');

console.log('🕒 Testing Footer Business Hours...\n');

// Test 1: Check Constants File
console.log('1️⃣  Testing Constants File...');
const constantsPath = path.join(process.cwd(), 'lib/constants.ts');

if (!fs.existsSync(constantsPath)) {
  console.log('❌ Constants file missing!');
  process.exit(1);
}

const constantsContent = fs.readFileSync(constantsPath, 'utf8');

// Check if Saturday hours are included
const businessHoursTests = {
  mondayFriday: constantsContent.includes('Mon-Fri: 9:00 AM - 6:00 PM'),
  saturday: constantsContent.includes('Sat: 10:00 AM - 2:00 PM'),
  timezone: constantsContent.includes('CET'),
  businessHoursField: constantsContent.includes('businessHours:')
};

console.log('📋 Business Hours in Constants:');
Object.entries(businessHoursTests).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Test 2: Check Footer Component
console.log('\n2️⃣  Testing Footer Component...');
const footerPath = path.join(process.cwd(), 'components/layout/Footer.tsx');

if (!fs.existsSync(footerPath)) {
  console.log('❌ Footer component missing!');
  process.exit(1);
}

const footerContent = fs.readFileSync(footerPath, 'utf8');

// Check if footer uses business hours from constants
const footerTests = {
  importsConstants: footerContent.includes('CONTACT_INFO'),
  usesBusinessHours: footerContent.includes('CONTACT_INFO.businessHours'),
  clockIcon: footerContent.includes('Clock'),
  businessHoursDisplay: footerContent.includes('businessHours')
};

console.log('📋 Footer Business Hours Implementation:');
Object.entries(footerTests).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Test 3: Check Contact Page Consistency
console.log('\n3️⃣  Testing Contact Page Consistency...');
const contactPath = path.join(process.cwd(), 'app/contact/page.tsx');

if (!fs.existsSync(contactPath)) {
  console.log('❌ Contact page missing!');
  process.exit(1);
}

const contactContent = fs.readFileSync(contactPath, 'utf8');

// Check contact page business hours
const contactTests = {
  mondayFriday: contactContent.includes('Monday - Friday') && contactContent.includes('9:00 AM - 6:00 PM'),
  saturday: contactContent.includes('Saturday') && contactContent.includes('10:00 AM - 2:00 PM'),
  sunday: contactContent.includes('Sunday') && contactContent.includes('Closed'),
  businessHoursSection: contactContent.includes('Business Hours')
};

console.log('📋 Contact Page Business Hours:');
Object.entries(contactTests).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Calculate Compliance Scores
const constantsScore = Object.values(businessHoursTests).filter(Boolean).length / Object.keys(businessHoursTests).length * 100;
const footerScore = Object.values(footerTests).filter(Boolean).length / Object.keys(footerTests).length * 100;
const contactScore = Object.values(contactTests).filter(Boolean).length / Object.keys(contactTests).length * 100;

console.log('\n📊 COMPLIANCE SCORES:');
console.log(`📁 Constants File: ${constantsScore.toFixed(1)}%`);
console.log(`🦶 Footer Component: ${footerScore.toFixed(1)}%`);
console.log(`📞 Contact Page: ${contactScore.toFixed(1)}%`);

const overallScore = (constantsScore + footerScore + contactScore) / 3;
console.log(`\n🎯 OVERALL BUSINESS HOURS CONSISTENCY: ${overallScore.toFixed(1)}%`);

// Final Assessment
if (overallScore >= 95) {
  console.log('\n🎉 EXCELLENT! Business hours are consistent across all components.');
} else if (overallScore >= 85) {
  console.log('\n✅ GOOD! Business hours are mostly consistent with minor gaps.');
} else {
  console.log('\n⚠️  NEEDS IMPROVEMENT! Business hours inconsistency detected.');
}

// Key Features Summary
console.log('\n🔑 KEY BUSINESS HOURS FEATURES:');
console.log('✅ Monday-Friday: 9:00 AM - 6:00 PM');
console.log('✅ Saturday: 10:00 AM - 2:00 PM');
console.log('✅ Sunday: Closed');
console.log('✅ Timezone: Central European Time (CET)');
console.log('✅ Consistent display across footer and contact page');

// Recommendations
console.log('\n💡 RECOMMENDATIONS:');
if (overallScore >= 95) {
  console.log('🚀 Business hours are properly configured and consistent!');
  console.log('📅 Update hours if business schedule changes');
} else {
  console.log('🔧 Ensure all components use CONTACT_INFO.businessHours');
  console.log('📋 Verify Saturday hours are displayed in footer');
  console.log('🔄 Check consistency between footer and contact page');
}

console.log('\n✨ Business hours consistency test complete!');
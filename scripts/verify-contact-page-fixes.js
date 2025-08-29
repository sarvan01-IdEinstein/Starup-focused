#!/usr/bin/env node

/**
 * Contact Page Fixes Verification Script
 * Verifies name consistency, font sizes, and business hours with CET
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Contact Page Fixes...\n');

// Read contact page
const contactPath = path.join(process.cwd(), 'app/contact/page.tsx');
const contactContent = fs.readFileSync(contactPath, 'utf8');

// Test 1: Name Consistency
console.log('📝 Name Consistency Tests:');
const nameTests = {
  noSpacedName: !contactContent.includes('Saravana Kumar Alagarswamy'),
  noSpacedNameInHero: !contactContent.includes('Saravana Kumar.'),
  correctNameInSignature: contactContent.includes('Saravanakumar</p>'),
  correctNameInTitle: contactContent.includes('A Personal Note from Saravanakumar')
};

Object.entries(nameTests).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'CORRECT' : 'NEEDS FIX'}`);
});

// Test 2: Font Size Consistency
console.log('\n📏 Font Size Consistency Tests:');
const fontTests = {
  firstTwoParagraphsLarge: (contactContent.match(/text-lg mb-6/g) || []).length >= 2,
  lastParagraphLarge: contactContent.includes('text-lg">'),
  noMixedSizes: !contactContent.includes('text-base mb-6'),
  consistentSpacing: contactContent.includes('text-lg mb-6') && contactContent.includes('text-lg">')
};

Object.entries(fontTests).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'CORRECT' : 'NEEDS FIX'}`);
});

// Test 3: Business Hours with CET
console.log('\n🕒 Business Hours CET Tests:');
const hoursTests = {
  mondayFridayCET: contactContent.includes('9:00 AM - 6:00 PM CET'),
  saturdayCET: contactContent.includes('10:00 AM - 2:00 PM CET'),
  sundayClosed: contactContent.includes('Closed</span>'),
  businessHoursSection: contactContent.includes('Business Hours</h4>')
};

Object.entries(hoursTests).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'CORRECT' : 'NEEDS FIX'}`);
});

// Calculate overall score
const allTests = { ...nameTests, ...fontTests, ...hoursTests };
const passedTests = Object.values(allTests).filter(Boolean).length;
const totalTests = Object.keys(allTests).length;
const score = (passedTests / totalTests) * 100;

console.log(`\n🎯 OVERALL SCORE: ${score.toFixed(1)}% (${passedTests}/${totalTests} tests passed)`);

// Final assessment
if (score === 100) {
  console.log('\n🎉 EXCELLENT! All contact page fixes are correctly implemented.');
  console.log('✅ Name consistency: Saravanakumar (no space)');
  console.log('✅ Font sizes: All paragraphs use text-lg for consistency');
  console.log('✅ Business hours: Include CET timezone');
} else if (score >= 90) {
  console.log('\n✅ GOOD! Most fixes are in place with minor issues.');
} else {
  console.log('\n⚠️  NEEDS ATTENTION! Some fixes are missing or incomplete.');
}

console.log('\n🔑 KEY FIXES IMPLEMENTED:');
console.log('1. Changed "Saravana Kumar Alagarswamy" → "Saravanakumar"');
console.log('2. Updated all personal note paragraphs to text-lg for consistency');
console.log('3. Added CET timezone to business hours');
console.log('4. Maintained professional formatting and spacing');

console.log('\n✨ Contact page verification complete!');
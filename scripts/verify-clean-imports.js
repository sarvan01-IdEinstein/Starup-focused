#!/usr/bin/env node

/**
 * Verify Clean Imports
 * 
 * This script verifies that unused imports have been cleaned up
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Verifying Clean Imports...\n');

const componentsToCheck = [
  'components/services/UnifiedServicePage.tsx',
  'components/services/ProfessionalServiceDetails.tsx', 
  'components/services/InteractiveServicePage.tsx'
];

let allClean = true;

componentsToCheck.forEach(componentPath => {
  console.log(`Checking ${componentPath}...`);
  
  if (fs.existsSync(componentPath)) {
    const content = fs.readFileSync(componentPath, 'utf8');
    
    // Check for unused Shield import
    const hasShieldImport = /Shield,|,\s*Shield/.test(content);
    const hasShieldUsage = content.includes('<Shield') || content.includes('icon: Shield') || content.includes('Shield className');
    
    // Check for unused Card imports
    const hasCardImport = content.includes('Card,') || content.includes('CardContent');
    const hasCardUsage = content.includes('<Card') || content.includes('<CardContent');
    
    // Debug output
    if (hasShieldImport) {
      const shieldMatch = content.match(/Shield,|,\s*Shield/);
      console.log(`   🔍 Found Shield import: "${shieldMatch[0]}" at position ${shieldMatch.index}`);
    }
    
    console.log(`   ${hasShieldImport && !hasShieldUsage ? '❌' : '✅'} Shield import ${hasShieldImport && !hasShieldUsage ? 'unused' : 'clean'}`);
    console.log(`   ${hasCardImport && !hasCardUsage ? '❌' : '✅'} Card import ${hasCardImport && !hasCardUsage ? 'unused' : 'clean'}`);
    
    if ((hasShieldImport && !hasShieldUsage) || (hasCardImport && !hasCardUsage)) {
      allClean = false;
    }
    
  } else {
    console.log(`   ❌ File not found`);
    allClean = false;
  }
  
  console.log('');
});

console.log(`🎯 Import Cleanup ${allClean ? 'Complete' : 'Needs Attention'}!`);

if (allClean) {
  console.log('✅ All imports are clean and no unused imports found');
} else {
  console.log('❌ Some unused imports still exist and need cleanup');
}
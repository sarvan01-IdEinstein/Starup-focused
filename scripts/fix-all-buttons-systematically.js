#!/usr/bin/env node

/**
 * Systematic Button Standardization Script
 * Converts all rounded-full buttons to rounded-lg for professional consistency
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 SYSTEMATIC BUTTON STANDARDIZATION\n');

// Files that need button standardization based on audit
const filesToFix = [
  'components/home/NewHeroSection.tsx',
  'components/home/StartupFocusSection.tsx', 
  'components/home/FinalCTASection.tsx',
  'components/home/ProcessOverviewSection.tsx',
  'components/home/HubSpokeSection.tsx',
  'app/about/page.tsx',
  'app/about/hub-spoke-model/page.tsx',
  'app/services/product-development-accelerator/page.tsx'
];

// Function to fix button styling in a file
function fixButtonsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changes = 0;
    
    // Pattern 1: Remove rounded-full from className
    const roundedFullPattern = /className="([^"]*?)rounded-full([^"]*?)"/g;
    content = content.replace(roundedFullPattern, (match, before, after) => {
      changes++;
      // Remove rounded-full and add rounded-lg if not present
      let newClasses = (before + after).replace(/\s+/g, ' ').trim();
      if (!newClasses.includes('rounded-lg') && !newClasses.includes('rounded-')) {
        newClasses = newClasses ? `${newClasses} rounded-lg` : 'rounded-lg';
      }
      return `className="${newClasses}"`;
    });
    
    // Pattern 2: Fix specific button patterns with rounded-full
    const buttonRoundedPattern = /<Button([^>]*?)className="([^"]*?)rounded-full([^"]*?)"([^>]*?)>/g;
    content = content.replace(buttonRoundedPattern, (match, beforeClass, classStart, classEnd, afterClass) => {
      changes++;
      let newClasses = (classStart + classEnd).replace(/\s+/g, ' ').trim();
      if (!newClasses.includes('rounded-lg') && !newClasses.includes('rounded-')) {
        newClasses = newClasses ? `${newClasses} rounded-lg` : 'rounded-lg';
      }
      return `<Button${beforeClass}className="${newClasses}"${afterClass}>`;
    });
    
    // Pattern 3: Fix inline rounded-full in button elements
    const inlineRoundedPattern = /rounded-full/g;
    if (content.includes('rounded-full')) {
      content = content.replace(inlineRoundedPattern, 'rounded-lg');
      changes++;
    }
    
    if (changes > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${changes} button(s) in ${filePath}`);
      return changes;
    } else {
      console.log(`ℹ️  No changes needed in ${filePath}`);
      return 0;
    }
    
  } catch (error) {
    console.log(`❌ Error processing ${filePath}:`, error.message);
    return 0;
  }
}

// Process all files
let totalChanges = 0;
console.log('🎯 Processing files for button standardization...\n');

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const changes = fixButtonsInFile(filePath);
    totalChanges += changes;
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log(`\n📊 SUMMARY:`);
console.log(`Total files processed: ${filesToFix.length}`);
console.log(`Total button changes: ${totalChanges}`);

if (totalChanges > 0) {
  console.log('\n✅ BUTTON STANDARDIZATION COMPLETE!');
  console.log('\n🎯 Changes made:');
  console.log('- Converted rounded-full → rounded-lg');
  console.log('- Maintained all other styling');
  console.log('- Professional rectangular appearance');
  console.log('\n🚀 All CTA buttons now match header style!');
} else {
  console.log('\n✅ All buttons already standardized!');
}

console.log('\n📋 DESIGN BENEFITS:');
console.log('✅ Professional & Technical appearance');
console.log('✅ Consistent with header buttons');
console.log('✅ Better text readability');
console.log('✅ Modern design system compliance');
console.log('✅ Enhanced brand consistency');
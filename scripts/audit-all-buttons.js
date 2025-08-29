#!/usr/bin/env node

/**
 * Comprehensive Button Audit Script
 * Scans all components for button usage and styling inconsistencies
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 COMPREHENSIVE BUTTON AUDIT\n');

// Function to scan a file for button usage
function scanFileForButtons(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const buttons = [];
    
    // Look for Button components
    const buttonMatches = content.match(/<Button[^>]*>/g);
    if (buttonMatches) {
      buttonMatches.forEach(match => {
        buttons.push({
          type: 'Button Component',
          code: match,
          line: content.substring(0, content.indexOf(match)).split('\n').length
        });
      });
    }
    
    // Look for button elements
    const htmlButtonMatches = content.match(/<button[^>]*>/g);
    if (htmlButtonMatches) {
      htmlButtonMatches.forEach(match => {
        buttons.push({
          type: 'HTML Button',
          code: match,
          line: content.substring(0, content.indexOf(match)).split('\n').length
        });
      });
    }
    
    // Look for Link components that might be styled as buttons
    const linkButtonMatches = content.match(/<Link[^>]*className[^>]*button[^>]*>/gi);
    if (linkButtonMatches) {
      linkButtonMatches.forEach(match => {
        buttons.push({
          type: 'Link as Button',
          code: match,
          line: content.substring(0, content.indexOf(match)).split('\n').length
        });
      });
    }
    
    return buttons;
  } catch (error) {
    return [];
  }
}

// Function to scan directory recursively
function scanDirectory(dir, results = {}) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      scanDirectory(filePath, results);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const buttons = scanFileForButtons(filePath);
      if (buttons.length > 0) {
        results[filePath] = buttons;
      }
    }
  });
  
  return results;
}

// Scan key directories
const directories = [
  'components',
  'app'
];

console.log('📊 BUTTON USAGE ANALYSIS\n');

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`🔍 Scanning ${dir}/...`);
    const results = scanDirectory(dir);
    
    Object.keys(results).forEach(filePath => {
      const relativePath = filePath.replace(process.cwd() + path.sep, '');
      console.log(`\n📄 ${relativePath}:`);
      
      results[filePath].forEach(button => {
        console.log(`   ${button.type} (Line ${button.line}):`);
        console.log(`   ${button.code.substring(0, 100)}${button.code.length > 100 ? '...' : ''}`);
      });
    });
  }
});

console.log('\n🎯 KEY COMPONENTS TO CHECK:\n');

const keyComponents = [
  'components/home/NewHeroSection.tsx',
  'components/home/HeroSection.tsx', 
  'components/home/StartupFocusSection.tsx',
  'components/home/FinalCTASection.tsx',
  'components/home/ProcessOverviewSection.tsx',
  'components/services/ServiceCard.tsx',
  'components/services/ServiceDetails.tsx',
  'components/shared/UnifiedCard.tsx',
  'components/layout/Header.tsx'
];

keyComponents.forEach(component => {
  if (fs.existsSync(component)) {
    console.log(`✅ ${component} - EXISTS`);
    const buttons = scanFileForButtons(component);
    if (buttons.length > 0) {
      console.log(`   Found ${buttons.length} button(s)`);
      buttons.forEach(btn => {
        // Extract variant if present
        const variantMatch = btn.code.match(/variant="([^"]+)"/);
        const classMatch = btn.code.match(/className="([^"]+)"/);
        
        if (variantMatch) {
          console.log(`   - Variant: ${variantMatch[1]}`);
        }
        if (classMatch) {
          console.log(`   - Classes: ${classMatch[1].substring(0, 50)}...`);
        }
      });
    }
  } else {
    console.log(`❌ ${component} - NOT FOUND`);
  }
});

console.log('\n🔧 BUTTON CONSISTENCY ANALYSIS:\n');

// Check button variants used across the site
const allVariants = new Set();
const allCustomClasses = new Set();

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const results = scanDirectory(dir);
    
    Object.values(results).forEach(buttons => {
      buttons.forEach(button => {
        const variantMatch = button.code.match(/variant="([^"]+)"/);
        const classMatch = button.code.match(/className="([^"]+)"/);
        
        if (variantMatch) {
          allVariants.add(variantMatch[1]);
        }
        if (classMatch && button.code.includes('rounded')) {
          allCustomClasses.add(classMatch[1]);
        }
      });
    });
  }
});

console.log('📋 Button Variants Found:');
Array.from(allVariants).forEach(variant => {
  console.log(`   - ${variant}`);
});

console.log('\n📋 Custom Rounded Classes Found:');
Array.from(allCustomClasses).forEach(className => {
  if (className.includes('rounded')) {
    console.log(`   - ${className.substring(0, 100)}...`);
  }
});

console.log('\n🎯 RECOMMENDATIONS:\n');
console.log('1. Check header buttons vs section CTA buttons');
console.log('2. Standardize on either rectangular (rounded-lg) or oval (rounded-full)');
console.log('3. Update button variants to ensure consistency');
console.log('4. Focus on main CTA buttons in hero sections');
console.log('5. Ensure all action buttons follow the same design pattern');

console.log('\n✨ Run this audit to identify button inconsistencies!');
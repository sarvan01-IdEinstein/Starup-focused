#!/usr/bin/env node

/**
 * Diagnostic script to identify why the site is showing a white page
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 DIAGNOSING SITE LOADING ISSUE');
console.log('================================\n');

// Check if key files exist
const criticalFiles = [
  'app/page.tsx',
  'app/layout.tsx',
  'components/home/DualAudienceHeroSection.tsx',
  'lib/contexts/AudienceContext.tsx',
  'components/home/DualCTASection.tsx',
  'components/shared/UnifiedConsultationCard.tsx',
  'components/ui/dialog.tsx',
  'lib/utils.ts'
];

console.log('1. Checking critical files...');
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING!`);
  }
});

// Check package.json dependencies
console.log('\n2. Checking key dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const keyDeps = [
  'react',
  'next',
  'framer-motion',
  '@radix-ui/react-dialog',
  'react-hook-form',
  'zod',
  'lucide-react'
];

keyDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    const version = packageJson.dependencies[dep] || packageJson.devDependencies[dep];
    console.log(`  ✅ ${dep}: ${version}`);
  } else {
    console.log(`  ❌ ${dep} - MISSING!`);
  }
});

// Check for TypeScript errors in key files
console.log('\n3. Checking for obvious syntax issues...');

function checkFileForSyntaxIssues(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Basic checks
    const issues = [];
    
    // Check for unmatched brackets
    const openBrackets = (content.match(/\{/g) || []).length;
    const closeBrackets = (content.match(/\}/g) || []).length;
    if (openBrackets !== closeBrackets) {
      issues.push(`Unmatched brackets: ${openBrackets} open, ${closeBrackets} close`);
    }
    
    // Check for unmatched parentheses
    const openParens = (content.match(/\(/g) || []).length;
    const closeParens = (content.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      issues.push(`Unmatched parentheses: ${openParens} open, ${closeParens} close`);
    }
    
    // Check for missing imports
    if (content.includes('useAudience') && !content.includes("from '@/lib/contexts/AudienceContext'")) {
      issues.push('Missing AudienceContext import');
    }
    
    return issues;
  } catch (error) {
    return [`Error reading file: ${error.message}`];
  }
}

const filesToCheck = [
  'app/page.tsx',
  'components/home/DualCTASection.tsx',
  'lib/contexts/AudienceContext.tsx'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const issues = checkFileForSyntaxIssues(file);
    if (issues.length === 0) {
      console.log(`  ✅ ${file} - No obvious issues`);
    } else {
      console.log(`  ❌ ${file} - Issues found:`);
      issues.forEach(issue => console.log(`    - ${issue}`));
    }
  }
});

// Check middleware
console.log('\n4. Checking middleware...');
if (fs.existsSync('middleware.ts')) {
  console.log('  ✅ middleware.ts exists');
  const middlewareContent = fs.readFileSync('middleware.ts', 'utf8');
  if (middlewareContent.includes('grid.svg')) {
    console.log('  ✅ middleware excludes grid.svg');
  } else {
    console.log('  ⚠️  middleware might be blocking grid.svg');
  }
} else {
  console.log('  ❌ middleware.ts missing');
}

// Check public files
console.log('\n5. Checking public files...');
const publicFiles = ['public/grid.svg', 'public/logo.png'];
publicFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING!`);
  }
});

console.log('\n🎯 RECOMMENDATIONS:');
console.log('==================');
console.log('1. Check browser console for JavaScript errors');
console.log('2. Try clearing Next.js cache: rm -rf .next');
console.log('3. Restart development server');
console.log('4. Check if any components are throwing runtime errors');
console.log('5. Temporarily simplify app/page.tsx to isolate the issue');

console.log('\n💡 QUICK TEST:');
console.log('==============');
console.log('Replace app/page.tsx content with:');
console.log(`
export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Hello World</h1>
    </div>
  );
}
`);
console.log('If this works, the issue is in one of the imported components.');
#!/usr/bin/env node

/**
 * Comprehensive File Usage Analysis Script
 * Analyzes the entire project to understand file dependencies and usage
 * before making any cleanup decisions
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Starting comprehensive file usage analysis...\n');

// File extensions to scan for references
const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md'];
const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build'];

// Collect all files in the project
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Extract imports and references from a file
function extractReferences(filePath, content) {
  const references = new Set();
  
  // Import statements
  const importRegex = /import.*?from\s+['"`]([^'"`]+)['"`]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    references.add(match[1]);
  }
  
  // Require statements
  const requireRegex = /require\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
  while ((match = requireRegex.exec(content)) !== null) {
    references.add(match[1]);
  }
  
  // Dynamic imports
  const dynamicImportRegex = /import\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    references.add(match[1]);
  }
  
  // File path references (for images, docs, etc.)
  const pathRegex = /['"`]([^'"`]*\.(md|png|jpg|jpeg|gif|svg|pdf|json))['"`]/g;
  while ((match = pathRegex.exec(content)) !== null) {
    references.add(match[1]);
  }
  
  // Script references in package.json
  if (filePath.endsWith('package.json')) {
    try {
      const pkg = JSON.parse(content);
      if (pkg.scripts) {
        Object.values(pkg.scripts).forEach(script => {
          // Extract file references from scripts
          const scriptFileRegex = /(?:node\s+)?([^\s]+\.js)/g;
          while ((match = scriptFileRegex.exec(script)) !== null) {
            references.add(match[1]);
          }
        });
      }
    } catch (e) {
      // Ignore JSON parse errors
    }
  }
  
  return Array.from(references);
}

// Analyze file usage across the project
function analyzeFileUsage() {
  console.log('📂 Scanning project files...');
  
  const allFiles = getAllFiles('.');
  const codeFiles = allFiles.filter(file => 
    codeExtensions.some(ext => file.endsWith(ext))
  );
  
  console.log(`Found ${allFiles.length} total files, ${codeFiles.length} code files\n`);
  
  const fileReferences = new Map();
  const referencedFiles = new Set();
  
  // Scan all code files for references
  codeFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const references = extractReferences(filePath, content);
      
      if (references.length > 0) {
        fileReferences.set(filePath, references);
        references.forEach(ref => referencedFiles.add(ref));
      }
    } catch (error) {
      console.log(`⚠️ Could not read ${filePath}: ${error.message}`);
    }
  });
  
  return { allFiles, codeFiles, fileReferences, referencedFiles };
}

// Generate usage report
function generateReport(analysisData) {
  const { allFiles, codeFiles, fileReferences, referencedFiles } = analysisData;
  
  console.log('📊 COMPREHENSIVE FILE USAGE ANALYSIS REPORT');
  console.log('=' .repeat(60));
  
  // 1. Files that are definitely being used
  console.log('\n✅ FILES CONFIRMED AS BEING USED:');
  console.log('-'.repeat(40));
  
  const confirmedUsed = [];
  referencedFiles.forEach(ref => {
    // Try to resolve the reference to actual files
    const possiblePaths = [
      ref,
      ref + '.js',
      ref + '.ts',
      ref + '.tsx',
      ref + '.jsx',
      path.join('.', ref),
      path.join('.', ref + '.js'),
      path.join('.', ref + '.ts'),
      path.join('.', ref + '.tsx'),
      path.join('.', ref + '.jsx')
    ];
    
    possiblePaths.forEach(possiblePath => {
      if (fs.existsSync(possiblePath)) {
        confirmedUsed.push(possiblePath);
        console.log(`  ${possiblePath}`);
      }
    });
  });
  
  // 2. Documentation and guide files
  console.log('\n📚 DOCUMENTATION AND GUIDE FILES:');
  console.log('-'.repeat(40));
  
  const docFiles = allFiles.filter(file => 
    file.endsWith('.md') && 
    (file.includes('GUIDE') || 
     file.includes('README') || 
     file.includes('SETUP') ||
     file.includes('COMPLETE') ||
     file.includes('SUMMARY'))
  );
  
  docFiles.forEach(file => {
    console.log(`  ${file}`);
  });
  
  // 3. Script files
  console.log('\n🔧 SCRIPT FILES:');
  console.log('-'.repeat(40));
  
  const scriptFiles = allFiles.filter(file => 
    file.startsWith('scripts/') && file.endsWith('.js')
  );
  
  scriptFiles.forEach(file => {
    console.log(`  ${file}`);
  });
  
  // 4. Potentially unused files (be very conservative)
  console.log('\n⚠️ POTENTIALLY UNUSED FILES (REVIEW CAREFULLY):');
  console.log('-'.repeat(40));
  console.log('NOTE: These files may still be important. Manual review required.');
  
  const potentiallyUnused = allFiles.filter(file => {
    const isConfirmedUsed = confirmedUsed.some(used => 
      path.resolve(used) === path.resolve(file)
    );
    const isNodeModules = file.includes('node_modules');
    const isGitFile = file.includes('.git');
    const isBuildFile = file.includes('.next') || file.includes('dist');
    
    return !isConfirmedUsed && !isNodeModules && !isGitFile && !isBuildFile &&
           codeExtensions.some(ext => file.endsWith(ext));
  });
  
  if (potentiallyUnused.length === 0) {
    console.log('  None found - all files appear to be in use!');
  } else {
    potentiallyUnused.slice(0, 20).forEach(file => { // Limit output
      console.log(`  ${file}`);
    });
    if (potentiallyUnused.length > 20) {
      console.log(`  ... and ${potentiallyUnused.length - 20} more`);
    }
  }
  
  // 5. Summary and recommendations
  console.log('\n📋 SUMMARY AND RECOMMENDATIONS:');
  console.log('-'.repeat(40));
  console.log(`Total files analyzed: ${allFiles.length}`);
  console.log(`Code files: ${codeFiles.length}`);
  console.log(`Files with references: ${fileReferences.size}`);
  console.log(`Confirmed used files: ${confirmedUsed.length}`);
  console.log(`Documentation files: ${docFiles.length}`);
  console.log(`Script files: ${scriptFiles.length}`);
  console.log(`Potentially unused: ${potentiallyUnused.length}`);
  
  console.log('\n🎯 SAFE CLEANUP RECOMMENDATIONS:');
  console.log('1. Focus only on MCP configuration cleanup (already done)');
  console.log('2. Keep ALL documentation files - they contain important context');
  console.log('3. Keep ALL script files - they may be used for maintenance');
  console.log('4. Only remove files after manual verification of non-usage');
  console.log('5. Consider archiving instead of deleting important documentation');
  
  return {
    confirmedUsed: confirmedUsed.length,
    potentiallyUnused: potentiallyUnused.length,
    docFiles: docFiles.length,
    scriptFiles: scriptFiles.length
  };
}

// Main execution
async function main() {
  try {
    const analysisData = analyzeFileUsage();
    const summary = generateReport(analysisData);
    
    console.log('\n✅ Analysis completed successfully!');
    console.log('\n🚨 IMPORTANT: Do not remove files without careful manual review.');
    console.log('This analysis helps identify usage patterns but cannot catch all dependencies.');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    process.exit(1);
  }
}

main();
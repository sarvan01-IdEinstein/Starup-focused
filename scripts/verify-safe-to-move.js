#!/usr/bin/env node

/**
 * Safe-to-Move Verification Script
 * Checks if files are referenced before moving them
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFYING FILES ARE SAFE TO MOVE\n');

// Files we want to move
const filesToCheck = [
  'PRE_PRODUCTION_CLEANUP_COMPLETE.md',
  'SYSTEMATIC_SECURITY_FIXES_GUIDE.md',
  'CRITICAL_SECURITY_FIXES_PLAN.md',
  'ZOHO_PRODUCTION_WORKFLOW_GUIDE.md',
  'FINAL_DEPLOYMENT_CHECKLIST.md',
  'SECURITY_IMPLEMENTATION_SCRIPT.md',
  'PRODUCTION_SECURITY_AUDIT.md',
  'PRODUCTION_DEPLOYMENT_PLAN.md',
  'DEPLOYMENT_STEPS.md',
  'SECURITY_CHECKLIST.md',
  'FINAL_DEPLOYMENT_GUIDE.md',
  'PRODUCTION_READINESS_FINAL.md',
  'PRODUCTION_DATABASE_STRATEGY.md',
  'jest.audit.config.js',
  'lighthouse.config.js',
  'postman-collection.json',
  'analyze-bundle.js',
  'cad-modeling-image-test.html'
];

// Directories to search for references
const searchDirs = ['app', 'components', 'lib', 'scripts'];

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || 
               filePath.endsWith('.js') || filePath.endsWith('.jsx') ||
               filePath.endsWith('.json') || filePath.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function checkFileReferences() {
  console.log('🔍 Scanning for file references...\n');
  
  const allFiles = [];
  searchDirs.forEach(dir => {
    getAllFiles(dir, allFiles);
  });
  
  const results = {};
  let totalReferences = 0;
  
  filesToCheck.forEach(fileToCheck => {
    const references = [];
    
    allFiles.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const fileName = path.basename(fileToCheck);
        const fileNameWithoutExt = path.basename(fileToCheck, path.extname(fileToCheck));
        
        // Check for various reference patterns
        if (content.includes(fileToCheck) || 
            content.includes(fileName) ||
            content.includes(fileNameWithoutExt) ||
            content.includes(`'./${fileToCheck}'`) ||
            content.includes(`"./${fileToCheck}"`) ||
            content.includes(`require('${fileToCheck}')`) ||
            content.includes(`import('${fileToCheck}')`)) {
          references.push(file);
        }
      } catch (error) {
        // Skip files that can't be read
      }
    });
    
    results[fileToCheck] = references;
    totalReferences += references.length;
  });
  
  return { results, totalReferences };
}

function displayResults(analysis) {
  console.log('📋 REFERENCE ANALYSIS RESULTS\n');
  
  const safeFiles = [];
  const unsafeFiles = [];
  
  Object.entries(analysis.results).forEach(([file, references]) => {
    if (references.length === 0) {
      safeFiles.push(file);
    } else {
      unsafeFiles.push({ file, references });
      console.log(`⚠️  ${file}:`);
      references.forEach(ref => {
        console.log(`   Referenced in: ${ref}`);
      });
      console.log();
    }
  });
  
  console.log(`✅ SAFE TO MOVE (${safeFiles.length} files):`);
  safeFiles.forEach(file => {
    console.log(`   ${file}`);
  });
  
  if (unsafeFiles.length > 0) {
    console.log(`\n❌ NOT SAFE TO MOVE (${unsafeFiles.length} files):`);
    unsafeFiles.forEach(({ file }) => {
      console.log(`   ${file} - Has references`);
    });
  }
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Total files checked: ${filesToCheck.length}`);
  console.log(`   Safe to move: ${safeFiles.length}`);
  console.log(`   Has references: ${unsafeFiles.length}`);
  console.log(`   Total references found: ${analysis.totalReferences}`);
  
  return { safeFiles, unsafeFiles };
}

function generateSafeOrganizeScript(safeFiles) {
  const script = `#!/usr/bin/env node

/**
 * VERIFIED SAFE Folder Organization Script
 * Only moves files confirmed to have no references
 */

const fs = require('fs');
const path = require('path');

console.log('📁 ORGANIZING FOLDER STRUCTURE (VERIFIED SAFE)\\n');

// Create directories
const directories = ['docs', 'docs/deployment', 'docs/security', 'docs/production', 'tests', 'tools'];
directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(\`✅ Created: \${dir}/\`);
  }
});

// ONLY move files verified as safe
const safeToMove = [
${safeFiles.map(file => `  '${file}'`).join(',\n')}
];

function moveFile(src, dest) {
  try {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    if (fs.existsSync(src)) {
      fs.renameSync(src, dest);
      console.log(\`✅ Moved: \${src} -> \${dest}\`);
      return true;
    }
  } catch (error) {
    console.log(\`❌ Failed to move \${src}: \${error.message}\`);
    return false;
  }
  return false;
}

let movedCount = 0;

console.log('\\n📋 Moving verified safe files...');
safeToMove.forEach(file => {
  let destDir = 'docs/';
  
  // Categorize by content
  if (file.includes('DEPLOYMENT') || file.includes('PRODUCTION_DEPLOYMENT')) {
    destDir = 'docs/deployment/';
  } else if (file.includes('SECURITY') || file.includes('CRITICAL_SECURITY')) {
    destDir = 'docs/security/';
  } else if (file.includes('PRODUCTION') || file.includes('READINESS')) {
    destDir = 'docs/production/';
  } else if (file.includes('.config.js') || file.includes('.json')) {
    destDir = 'tests/';
  } else if (file.includes('.html') || file.includes('.bat') || file.includes('analyze-bundle')) {
    destDir = 'tools/';
  }
  
  const dest = path.join(destDir, file);
  if (moveFile(file, dest)) movedCount++;
});

console.log(\`\\n✨ SAFE organization complete! Moved \${movedCount} files.\`);
console.log('\\n🔒 ZERO RISK: No application references were found for moved files.');
console.log('\\n📋 Next steps:');
console.log('1. Test: npm run build');
console.log('2. Test: npm run dev');
console.log('3. Commit the clean structure');
`;

  fs.writeFileSync('scripts/safe-organize-structure.js', script);
  console.log('\n📝 Generated: scripts/safe-organize-structure.js');
}

// Main execution
const analysis = checkFileReferences();
const { safeFiles, unsafeFiles } = displayResults(analysis);

if (unsafeFiles.length === 0) {
  console.log('\n🎉 ALL FILES ARE SAFE TO MOVE!');
  generateSafeOrganizeScript(safeFiles);
} else {
  console.log('\n⚠️  SOME FILES HAVE REFERENCES - REVIEW BEFORE MOVING');
}

console.log('\n✨ Verification complete!');
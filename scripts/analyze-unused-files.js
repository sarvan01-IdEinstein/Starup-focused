#!/usr/bin/env node

/**
 * Comprehensive Unused Files Analysis Script
 * Identifies unused components, files, and assets for cleanup
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 COMPREHENSIVE PROJECT CLEANUP ANALYSIS\n');
console.log('=' .repeat(60));

// Core directories to analyze
const DIRECTORIES = {
  components: 'components',
  lib: 'lib',
  app: 'app',
  public: 'public',
  scripts: 'scripts'
};

// Files that should always be kept (core Next.js and project files)
const ALWAYS_KEEP = [
  'package.json',
  'next.config.js',
  'tailwind.config.js',
  'tsconfig.json',
  '.gitignore',
  'vercel.json',
  'README.md',
  '.env.example',
  'prisma/schema.prisma'
];

// Current production pages (actively used)
const PRODUCTION_PAGES = [
  'app/page.tsx',                    // Homepage
  'app/about/page.tsx',              // About page
  'app/about/hub-spoke-model/page.tsx', // Hub-spoke model
  'app/contact/page.tsx',            // Contact page
  'app/blog/page.tsx',               // Blog listing
  'app/blog/[slug]/page.tsx',        // Blog posts
  'app/services/[slug]/page.tsx',    // Dynamic service pages
  'app/services/product-development-accelerator/page.tsx', // Accelerator
  'app/solutions/page.tsx',          // Solutions overview
  'app/solutions/for-startups/page.tsx',    // Startup solutions
  'app/solutions/for-enterprises/page.tsx', // Enterprise solutions
  'app/privacy/page.tsx',            // Privacy policy
  'app/terms/page.tsx',              // Terms & conditions
  'app/impressum/page.tsx',          // Legal notice
  'app/not-found.tsx',               // 404 page
  'app/layout.tsx',                  // Root layout
  'app/globals.css'                  // Global styles
];

// Current production components (actively used)
const PRODUCTION_COMPONENTS = [
  // Layout components
  'components/layout/Header.tsx',
  'components/layout/Footer.tsx',
  
  // Shared components
  'components/shared/UnifiedCard.tsx',
  'components/shared/UnifiedSection.tsx',
  'components/shared/UnifiedHero.tsx',
  'components/shared/PageHero.tsx',
  'components/shared/ConsultationForm.tsx',
  'components/shared/QuotationForm.tsx',
  'components/shared/ContactWidget.tsx',
  'components/shared/CookieConsent.tsx',
  'components/shared/FloatingContactHub.tsx',
  'components/shared/WhatsAppButton.tsx',
  'components/shared/StructuredData.tsx',
  'components/shared/FAQAccordion.tsx',
  
  // Home page components
  'components/home/HeroSection.tsx',
  'components/home/InteractiveServices.tsx',
  'components/home/ValuePropositionSection.tsx',
  'components/home/ProcessOverviewSection.tsx',
  'components/home/TestimonialsSection.tsx',
  'components/home/FinalCTASection.tsx',
  'components/home/HubSpokeSection.tsx',
  'components/home/ProvenResultsSection.tsx',
  'components/home/StartupPackageSection.tsx',
  'components/home/MyApproachSection.tsx',
  'components/home/MyNetworkSection.tsx',
  'components/home/WhyWorkWithMeSection.tsx',
  'components/home/EinsteinQuoteSection.tsx',
  
  // Service components
  'components/services/UnifiedServicePage.tsx',
  'components/services/InteractiveServicePage.tsx',
  'components/services/ServiceDetails.tsx',
  'components/services/ServiceCard.tsx',
  'components/services/ServiceGrid.tsx',
  'components/services/ProcessFlow.tsx',
  
  // About components
  'components/about/TeamSection.tsx',
  
  // Blog components
  'components/blog/BlogClient.tsx',
  'components/blog/BlogPageClient.tsx',
  'components/blog/BlogPageWrapper.tsx',
  'components/blog/SimpleBlogCTA.tsx',
  'components/blog/BlogFloatingButtons.tsx',
  
  // UI components
  'components/ui/button.tsx',
  'components/ui/calendar.tsx'
];

// Current production lib files (actively used)
const PRODUCTION_LIB = [
  'lib/constants.ts',
  'lib/blog-data.ts',
  'lib/services-data.ts',
  'lib/services/3d-printing.ts',
  'lib/dynamic-imports.tsx',
  'lib/email.ts',
  'lib/analytics.ts',
  'lib/performance.ts',
  'lib/zoho.ts',
  'lib/auth.ts'
];

// Current production API routes (actively used)
const PRODUCTION_API = [
  'app/api/contact/route.ts',
  'app/api/consultation/route.ts',
  'app/api/newsletter/route.ts',
  'app/api/blog/posts/route.ts',
  'app/api/quotes/route.ts'
];

// Essential scripts (keep for maintenance)
const ESSENTIAL_SCRIPTS = [
  'scripts/test-all-legal-compliance.js',
  'scripts/test-privacy-policy-compliance.js',
  'scripts/test-impressum-compliance.js',
  'scripts/test-terms-compliance.js',
  'scripts/test-footer-business-hours.js',
  'scripts/deploy-production.js'
];

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, .next, .git, etc.
      if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      fileList.push(filePath.replace(/\\/g, '/'));
    }
  });
  
  return fileList;
}

function analyzeFileUsage() {
  console.log('📁 Analyzing file usage...\n');
  
  const allFiles = getAllFiles('.');
  const usedFiles = new Set();
  const unusedFiles = [];
  const documentationFiles = [];
  const testFiles = [];
  const legacyFiles = [];
  
  // Mark production files as used
  [...PRODUCTION_PAGES, ...PRODUCTION_COMPONENTS, ...PRODUCTION_LIB, ...PRODUCTION_API, ...ESSENTIAL_SCRIPTS, ...ALWAYS_KEEP]
    .forEach(file => usedFiles.add(file));
  
  // Analyze each file
  allFiles.forEach(file => {
    const relativePath = file;
    const fileName = path.basename(file);
    const ext = path.extname(file);
    
    // Skip certain directories and file types
    if (file.includes('node_modules') || 
        file.includes('.next') || 
        file.includes('.git') ||
        file.includes('.kiro/settings')) {
      return;
    }
    
    // Categorize files
    if (usedFiles.has(relativePath)) {
      // Already marked as used
      return;
    }
    
    // Documentation files
    if (ext === '.md' || fileName.includes('GUIDE') || fileName.includes('README')) {
      documentationFiles.push(relativePath);
      return;
    }
    
    // Test files
    if (fileName.includes('test-') || fileName.includes('.test.') || fileName.includes('.spec.')) {
      testFiles.push(relativePath);
      return;
    }
    
    // Legacy/unused patterns
    if (fileName.includes('Particle') ||
        fileName.includes('Background') ||
        fileName.includes('Legacy') ||
        fileName.includes('Old') ||
        fileName.includes('Backup') ||
        file.includes('unused') ||
        file.includes('archive') ||
        file.includes('backup')) {
      legacyFiles.push(relativePath);
      return;
    }
    
    // Check if it's a component/lib file that might be unused
    if ((file.startsWith('components/') || file.startsWith('lib/') || file.startsWith('app/')) && 
        (ext === '.tsx' || ext === '.ts' || ext === '.js' || ext === '.jsx')) {
      
      // Check if this file is imported anywhere
      const isImported = checkIfFileIsImported(relativePath, allFiles);
      
      if (!isImported) {
        unusedFiles.push(relativePath);
      } else {
        usedFiles.add(relativePath);
      }
    } else {
      // Other files (images, configs, etc.)
      unusedFiles.push(relativePath);
    }
  });
  
  return {
    usedFiles: Array.from(usedFiles),
    unusedFiles,
    documentationFiles,
    testFiles,
    legacyFiles
  };
}

function checkIfFileIsImported(filePath, allFiles) {
  const fileName = path.basename(filePath, path.extname(filePath));
  const relativePath = filePath.replace(/\.(tsx?|jsx?)$/, '');
  
  // Check if any file imports this one
  for (const file of allFiles) {
    if (file === filePath) continue;
    
    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for various import patterns
        if (content.includes(`from '${relativePath}'`) ||
            content.includes(`from "${relativePath}"`) ||
            content.includes(`from '@/${relativePath}'`) ||
            content.includes(`from "@/${relativePath}"`) ||
            content.includes(`import('${relativePath}')`) ||
            content.includes(`import("${relativePath}")`) ||
            content.includes(`require('${relativePath}')`) ||
            content.includes(`require("${relativePath}")`)) {
          return true;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  }
  
  return false;
}

function generateCleanupPlan(analysis) {
  console.log('📋 CLEANUP ANALYSIS RESULTS\n');
  
  console.log(`✅ PRODUCTION FILES (${analysis.usedFiles.length} files):`);
  console.log('   These files are actively used and should be kept.\n');
  
  console.log(`🗑️  UNUSED FILES (${analysis.unusedFiles.length} files):`);
  if (analysis.unusedFiles.length > 0) {
    console.log('   These files appear to be unused and can be moved to archive:');
    analysis.unusedFiles.slice(0, 20).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (analysis.unusedFiles.length > 20) {
      console.log(`   ... and ${analysis.unusedFiles.length - 20} more files`);
    }
  } else {
    console.log('   No unused files detected!');
  }
  console.log();
  
  console.log(`📚 DOCUMENTATION FILES (${analysis.documentationFiles.length} files):`);
  if (analysis.documentationFiles.length > 0) {
    console.log('   These are documentation files - consider archiving old ones:');
    analysis.documentationFiles.slice(0, 10).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (analysis.documentationFiles.length > 10) {
      console.log(`   ... and ${analysis.documentationFiles.length - 10} more files`);
    }
  }
  console.log();
  
  console.log(`🧪 TEST FILES (${analysis.testFiles.length} files):`);
  if (analysis.testFiles.length > 0) {
    console.log('   These are test files - keep essential ones, archive old tests:');
    analysis.testFiles.slice(0, 10).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (analysis.testFiles.length > 10) {
      console.log(`   ... and ${analysis.testFiles.length - 10} more files`);
    }
  }
  console.log();
  
  console.log(`🏛️  LEGACY FILES (${analysis.legacyFiles.length} files):`);
  if (analysis.legacyFiles.length > 0) {
    console.log('   These appear to be legacy files and can be archived:');
    analysis.legacyFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
  }
  console.log();
}

function generateMoveScript(analysis) {
  const moveScript = `#!/usr/bin/env node

/**
 * Auto-generated file cleanup script
 * Moves unused files to archive folder
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Moving unused files to archive...');

// Create archive directory
const archiveDir = 'archive';
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

// Files to move
const filesToMove = [
${analysis.unusedFiles.map(file => `  '${file}'`).join(',\n')}
];

const documentationToMove = [
${analysis.documentationFiles.filter(file => 
  !file.includes('README') && 
  !file.includes('DEPLOYMENT') && 
  !file.includes('SECURITY')
).map(file => `  '${file}'`).join(',\n')}
];

const legacyToMove = [
${analysis.legacyFiles.map(file => `  '${file}'`).join(',\n')}
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

console.log('\\n📁 Moving unused files...');
filesToMove.forEach(file => {
  const dest = path.join(archiveDir, 'unused', file);
  if (moveFile(file, dest)) movedCount++;
});

console.log('\\n📚 Moving old documentation...');
documentationToMove.forEach(file => {
  const dest = path.join(archiveDir, 'documentation', file);
  if (moveFile(file, dest)) movedCount++;
});

console.log('\\n🏛️  Moving legacy files...');
legacyToMove.forEach(file => {
  const dest = path.join(archiveDir, 'legacy', file);
  if (moveFile(file, dest)) movedCount++;
});

console.log(\`\\n✨ Cleanup complete! Moved \${movedCount} files to archive.\`);
console.log('\\n📋 Next steps:');
console.log('1. Review the archived files');
console.log('2. Test your application to ensure nothing is broken');
console.log('3. If everything works, you can delete the archive folder');
console.log('4. Commit the cleaned up project');
`;

  fs.writeFileSync('scripts/cleanup-unused-files.js', moveScript);
  console.log('📝 Generated cleanup script: scripts/cleanup-unused-files.js');
}

// Main execution
const analysis = analyzeFileUsage();
generateCleanupPlan(analysis);
generateMoveScript(analysis);

console.log('\n' + '='.repeat(60));
console.log('🎯 CLEANUP RECOMMENDATIONS');
console.log('='.repeat(60));

console.log('\n1. 📋 REVIEW THE ANALYSIS ABOVE');
console.log('   - Check if any "unused" files are actually needed');
console.log('   - Verify production files list is complete');

console.log('\n2. 🧪 TEST BEFORE CLEANUP');
console.log('   - Run: npm run build');
console.log('   - Run: npm run dev');
console.log('   - Test all major functionality');

console.log('\n3. 🗂️  EXECUTE CLEANUP');
console.log('   - Run: node scripts/cleanup-unused-files.js');
console.log('   - This will move files to archive/ folder');

console.log('\n4. ✅ VERIFY AFTER CLEANUP');
console.log('   - Test the application again');
console.log('   - Run: npm run build');
console.log('   - Check all pages load correctly');

console.log('\n5. 🚀 FINALIZE');
console.log('   - If everything works, delete archive/ folder');
console.log('   - Commit the cleaned project');
console.log('   - Deploy to production');

console.log('\n💡 SAFETY NOTES:');
console.log('   - Files are moved, not deleted (reversible)');
console.log('   - Always test before finalizing cleanup');
console.log('   - Keep a backup of your project');

console.log('\n✨ Project cleanup analysis complete!');
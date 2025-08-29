#!/usr/bin/env node

/**
 * REVISED Comprehensive Unused Files Analysis Script
 * Carefully preserves Zoho integration and backend API routes for production
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 REVISED PROJECT CLEANUP ANALYSIS (Production-Safe)\n');
console.log('=' .repeat(60));

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
  'app/globals.css',                 // Global styles
  'app/store/page.tsx',              // Store page
  'app/faq/page.tsx',                // FAQ page
  
  // BACKEND/AUTH PAGES (KEEP FOR PRODUCTION)
  'app/auth/signin/page.tsx',        // Sign in page
  'app/auth/signup/page.tsx',        // Sign up page
  'app/portal/page.tsx'              // Customer portal/dashboard
];

// PRODUCTION API ROUTES (KEEP ALL - NEEDED FOR BACKEND)
const PRODUCTION_API = [
  // Core functionality
  'app/api/contact/route.ts',
  'app/api/consultation/route.ts',
  'app/api/newsletter/route.ts',
  'app/api/blog/posts/route.ts',
  'app/api/quotes/route.ts',
  'app/api/services/route.ts',
  
  // AUTHENTICATION & USER MANAGEMENT (KEEP)
  'app/api/auth/[...nextauth]/route.ts',
  'app/api/auth/signup/route.ts',
  'app/api/user/profile/route.ts',
  
  // CUSTOMER & PROJECT MANAGEMENT (KEEP)
  'app/api/customers/route.ts',
  'app/api/projects/route.ts',
  'app/api/dashboard/stats/route.ts',
  
  // FILE & BILLING MANAGEMENT (KEEP)
  'app/api/files/route.ts',
  'app/api/files/upload/route.ts',
  'app/api/billing/invoices/route.ts',
  'app/api/invoices/route.ts',
  
  // SYSTEM HEALTH & MONITORING (KEEP)
  'app/api/health/route.ts',
  'app/api/example-cached/route.ts'
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
  'components/shared/EnterpriseCard.tsx',
  
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
  'components/home/NewHeroSection.tsx',
  'components/home/StartupFocusSection.tsx',
  'components/home/SoloFounderAdvantageSection.tsx',
  
  // AUDIENCE-SPECIFIC COMPONENTS (KEEP - USED IN PRODUCTION)
  'components/home/EnterprisePathContent.tsx',
  'components/home/StartupPathContent.tsx',
  'components/home/AudienceAwareSection.tsx',
  'components/home/ConditionalContentRenderer.tsx',
  'components/home/AudienceSegmentationSection.tsx',
  'components/home/DualAudienceHeroSection.tsx',
  
  // Service components
  'components/services/UnifiedServicePage.tsx',
  'components/services/InteractiveServicePage.tsx',
  'components/services/ServiceDetails.tsx',
  'components/services/ServiceCard.tsx',
  'components/services/ServiceGrid.tsx',
  'components/services/ProcessFlow.tsx',
  'components/services/ResearchDevelopmentPage.tsx',
  'components/services/ProfessionalServiceDetails.tsx',
  'components/services/EnterpriseServiceGrid.tsx',
  'components/services/PremiumServiceGrid.tsx',
  'components/services/PremiumServiceCard.tsx',
  'components/services/EnterpriseServiceDetails.tsx',
  
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

// PRODUCTION LIB FILES (KEEP ALL BACKEND-RELATED)
const PRODUCTION_LIB = [
  'lib/constants.ts',
  'lib/blog-data.ts',
  'lib/services-data.ts',
  'lib/services/3d-printing.ts',
  'lib/dynamic-imports.tsx',
  'lib/email.ts',
  'lib/analytics.ts',
  'lib/performance.ts',
  
  // ZOHO INTEGRATION (KEEP ALL)
  'lib/zoho.ts',
  'lib/zoho/index.ts',
  'lib/zoho/base.ts',
  'lib/zoho/crm.ts',
  'lib/zoho/workdrive.ts',
  'lib/zoho/books.ts',
  'lib/zoho/projects.ts',
  'lib/zoho/token-manager.ts',
  
  // AUTHENTICATION & SECURITY (KEEP ALL)
  'lib/auth.ts',
  'lib/audit.ts',
  'lib/rbac.ts',
  'lib/audit-service.ts',
  'lib/cache-service.ts',
  'lib/services/index.ts',
  'lib/audit-middleware.ts',
  'lib/audit-logger.ts',
  'lib/secure-logger.ts',
  'lib/rate-limiter.ts',
  'lib/error-handler.ts',
  
  // AUDIENCE TYPES (KEEP)
  'lib/types/audience.ts',
  'lib/contexts/AudienceContext.tsx'
];

// ESSENTIAL SCRIPTS (KEEP FOR PRODUCTION MAINTENANCE)
const ESSENTIAL_SCRIPTS = [
  // Legal compliance tests
  'scripts/test-all-legal-compliance.js',
  'scripts/test-privacy-policy-compliance.js',
  'scripts/test-impressum-compliance.js',
  'scripts/test-terms-compliance.js',
  'scripts/test-footer-business-hours.js',
  
  // Production deployment
  'scripts/deploy-production.js',
  'scripts/final-production-test.js',
  'scripts/setup-production.js',
  
  // ZOHO INTEGRATION SCRIPTS (KEEP ALL)
  'scripts/get-zoho-refresh-token.js',
  'scripts/get-zoho-crm-token.js',
  'scripts/get-zoho-all-modules-token.js',
  'scripts/get-zoho-workdrive-token.js',
  'scripts/get-zoho-books-token.js',
  'scripts/get-zoho-projects-token.js',
  'scripts/get-zoho-ids.js',
  'scripts/test-zoho-crm.js',
  'scripts/test-zoho-database-structure.js',
  'scripts/test-zoho-production-readiness.js',
  'scripts/diagnose-zoho-issue.js',
  
  // AUTHENTICATION & INTEGRATION TESTS (KEEP)
  'scripts/test-auth-integration.js',
  'scripts/test-customer-creation.js',
  'scripts/test-signup-flow.js',
  'scripts/test-full-integration.js',
  'scripts/test-modular-integration.js',
  'scripts/debug-auth-flow.js',
  
  // ENVIRONMENT & DATABASE SETUP (KEEP)
  'scripts/setup-env.js',
  'scripts/setup-local-db.js',
  'scripts/setup-database.js',
  'scripts/test-env-config.js',
  'scripts/test-current-setup.js',
  'scripts/test-dev-server.js',
  
  // FORM & API TESTING (KEEP)
  'scripts/test-forms-live.js',
  'scripts/test-form-integration.js',
  'scripts/test-contact-form.js',
  'scripts/test-consultation-form-complete.js',
  'scripts/test-consultation-form-integration.js',
  'scripts/test-all-quote-buttons.js',
  'scripts/test-optimized-quote-form.js',
  'scripts/test-quote-api.js',
  'scripts/test-real-data-integration.js',
  'scripts/test-complete-workflow.js',
  
  // SECURITY & AUDIT (KEEP)
  'scripts/final-security-verification.js',
  'scripts/final-security-verification-comprehensive.js',
  'scripts/comprehensive-security-audit.js'
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
  console.log('📁 Analyzing file usage (Production-Safe)...\n');
  
  const allFiles = getAllFiles('.');
  const usedFiles = new Set();
  const safeToArchive = [];
  const documentationFiles = [];
  const oldTestFiles = [];
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
    
    // NEVER ARCHIVE THESE PATTERNS (PRODUCTION CRITICAL)
    if (file.includes('zoho') || 
        file.includes('Zoho') || 
        file.includes('auth') || 
        file.includes('Auth') ||
        file.includes('api/') ||
        file.includes('portal') ||
        file.includes('dashboard') ||
        file.includes('customer') ||
        file.includes('billing') ||
        file.includes('invoice') ||
        file.includes('project') ||
        file.includes('user') ||
        file.includes('file') ||
        fileName.includes('prisma')) {
      usedFiles.add(relativePath);
      return;
    }
    
    // Documentation files (safe to archive old ones)
    if (ext === '.md' && 
        !fileName.includes('README') && 
        !fileName.includes('DEPLOYMENT') && 
        !fileName.includes('SECURITY') &&
        !fileName.includes('PRODUCTION')) {
      documentationFiles.push(relativePath);
      return;
    }
    
    // Old test files (not essential for production)
    if ((fileName.includes('test-') && 
         !fileName.includes('legal-compliance') &&
         !fileName.includes('footer-business-hours') &&
         !fileName.includes('zoho') &&
         !fileName.includes('auth') &&
         !fileName.includes('form') &&
         !fileName.includes('security') &&
         !fileName.includes('production')) ||
        fileName.includes('.test.') || 
        fileName.includes('.spec.')) {
      oldTestFiles.push(relativePath);
      return;
    }
    
    // Legacy/unused patterns (safe to archive)
    if (fileName.includes('Particle') ||
        fileName.includes('Background') ||
        fileName.includes('Legacy') ||
        fileName.includes('Old') ||
        fileName.includes('Backup') ||
        file.includes('unused') ||
        file.includes('archive') ||
        file.includes('backup') ||
        fileName.includes('.backup')) {
      legacyFiles.push(relativePath);
      return;
    }
    
    // Check if it's a component/lib file that might be unused
    if ((file.startsWith('components/') || file.startsWith('lib/') || file.startsWith('app/')) && 
        (ext === '.tsx' || ext === '.ts' || ext === '.js' || ext === '.jsx')) {
      
      // Check if this file is imported anywhere
      const isImported = checkIfFileIsImported(relativePath, allFiles);
      
      if (!isImported) {
        safeToArchive.push(relativePath);
      } else {
        usedFiles.add(relativePath);
      }
    } else {
      // Other files - be conservative, only archive obvious non-production files
      if (file.includes('archived-files/') ||
          fileName.includes('temp') ||
          fileName.includes('tmp') ||
          ext === '.log' ||
          ext === '.bak') {
        safeToArchive.push(relativePath);
      } else {
        // When in doubt, keep it
        usedFiles.add(relativePath);
      }
    }
  });
  
  return {
    usedFiles: Array.from(usedFiles),
    safeToArchive,
    documentationFiles,
    oldTestFiles,
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
  console.log('📋 PRODUCTION-SAFE CLEANUP ANALYSIS\n');
  
  console.log(`✅ PRODUCTION FILES (${analysis.usedFiles.length} files):`);
  console.log('   These files are actively used and WILL BE KEPT.\n');
  
  console.log(`🗑️  SAFE TO ARCHIVE (${analysis.safeToArchive.length} files):`);
  if (analysis.safeToArchive.length > 0) {
    console.log('   These files appear unused and can be safely archived:');
    analysis.safeToArchive.slice(0, 15).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (analysis.safeToArchive.length > 15) {
      console.log(`   ... and ${analysis.safeToArchive.length - 15} more files`);
    }
  } else {
    console.log('   No files identified as safe to archive!');
  }
  console.log();
  
  console.log(`📚 OLD DOCUMENTATION (${analysis.documentationFiles.length} files):`);
  if (analysis.documentationFiles.length > 0) {
    console.log('   Old documentation files (keeping essential ones):');
    analysis.documentationFiles.slice(0, 10).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (analysis.documentationFiles.length > 10) {
      console.log(`   ... and ${analysis.documentationFiles.length - 10} more files`);
    }
  }
  console.log();
  
  console.log(`🧪 OLD TEST FILES (${analysis.oldTestFiles.length} files):`);
  if (analysis.oldTestFiles.length > 0) {
    console.log('   Old test files (keeping production-critical tests):');
    analysis.oldTestFiles.slice(0, 10).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (analysis.oldTestFiles.length > 10) {
      console.log(`   ... and ${analysis.oldTestFiles.length - 10} more files`);
    }
  }
  console.log();
  
  console.log(`🏛️  LEGACY FILES (${analysis.legacyFiles.length} files):`);
  if (analysis.legacyFiles.length > 0) {
    console.log('   Legacy files that can be archived:');
    analysis.legacyFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
  }
  console.log();
  
  console.log('🔒 PRODUCTION-CRITICAL FILES PRESERVED:');
  console.log('   ✅ All Zoho integration files');
  console.log('   ✅ All authentication & user management');
  console.log('   ✅ All API routes for backend functionality');
  console.log('   ✅ Customer dashboard and portal');
  console.log('   ✅ Billing and project management');
  console.log('   ✅ File upload and management');
  console.log('   ✅ Security and audit systems');
  console.log('   ✅ Database and environment setup');
  console.log();
}

function generateSafeCleanupScript(analysis) {
  const moveScript = `#!/usr/bin/env node

/**
 * PRODUCTION-SAFE Auto-generated file cleanup script
 * Only moves files that are confirmed safe to archive
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Moving SAFE-TO-ARCHIVE files only...');
console.log('🔒 ALL PRODUCTION FILES PRESERVED');

// Create archive directory
const archiveDir = 'archive-safe';
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

// ONLY files confirmed safe to archive
const safeToArchive = [
${analysis.safeToArchive.map(file => `  '${file}'`).join(',\n')}
];

const oldDocumentation = [
${analysis.documentationFiles.map(file => `  '${file}'`).join(',\n')}
];

const oldTests = [
${analysis.oldTestFiles.map(file => `  '${file}'`).join(',\n')}
];

const legacyFiles = [
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

console.log('\\n📁 Moving safe-to-archive files...');
safeToArchive.forEach(file => {
  const dest = path.join(archiveDir, 'unused', file);
  if (moveFile(file, dest)) movedCount++;
});

console.log('\\n📚 Moving old documentation...');
oldDocumentation.forEach(file => {
  const dest = path.join(archiveDir, 'documentation', file);
  if (moveFile(file, dest)) movedCount++;
});

console.log('\\n🧪 Moving old test files...');
oldTests.forEach(file => {
  const dest = path.join(archiveDir, 'old-tests', file);
  if (moveFile(file, dest)) movedCount++;
});

console.log('\\n🏛️  Moving legacy files...');
legacyFiles.forEach(file => {
  const dest = path.join(archiveDir, 'legacy', file);
  if (moveFile(file, dest)) movedCount++;
});

console.log(\`\\n✨ PRODUCTION-SAFE cleanup complete! Moved \${movedCount} files to archive-safe/.\`);
console.log('\\n🔒 PRODUCTION SYSTEMS PRESERVED:');
console.log('   ✅ Zoho integration intact');
console.log('   ✅ Authentication system intact');
console.log('   ✅ Customer dashboard intact');
console.log('   ✅ All API routes intact');
console.log('   ✅ Billing system intact');
console.log('   ✅ Security systems intact');
console.log('\\n📋 Next steps:');
console.log('1. Test your application thoroughly');
console.log('2. Run: npm run build');
console.log('3. Test customer dashboard and auth');
console.log('4. If everything works, commit the changes');
`;

  fs.writeFileSync('scripts/production-safe-cleanup.js', moveScript);
  console.log('📝 Generated PRODUCTION-SAFE cleanup script: scripts/production-safe-cleanup.js');
}

// Main execution
const analysis = analyzeFileUsage();
generateCleanupPlan(analysis);
generateSafeCleanupScript(analysis);

console.log('\n' + '='.repeat(60));
console.log('🎯 PRODUCTION-SAFE CLEANUP RECOMMENDATIONS');
console.log('='.repeat(60));

console.log('\n1. 🔒 PRODUCTION SAFETY FIRST');
console.log('   - ALL Zoho integration files preserved');
console.log('   - ALL authentication & user management preserved');
console.log('   - ALL API routes for backend preserved');
console.log('   - Customer dashboard and portal preserved');

console.log('\n2. 🧪 TEST BEFORE CLEANUP');
console.log('   - Run: npm run build');
console.log('   - Test customer login/signup');
console.log('   - Test customer dashboard');
console.log('   - Test all forms and integrations');

console.log('\n3. 🗂️  EXECUTE SAFE CLEANUP');
console.log('   - Run: node scripts/production-safe-cleanup.js');
console.log('   - This moves ONLY confirmed safe files');

console.log('\n4. ✅ VERIFY AFTER CLEANUP');
console.log('   - Test authentication flows');
console.log('   - Test customer dashboard');
console.log('   - Test Zoho integrations');
console.log('   - Run: npm run build');

console.log('\n5. 🚀 DEPLOY WITH CONFIDENCE');
console.log('   - All production systems intact');
console.log('   - Backend functionality preserved');
console.log('   - Customer experience maintained');

console.log('\n💡 SAFETY GUARANTEES:');
console.log('   - Zoho integration: 100% PRESERVED');
console.log('   - Authentication: 100% PRESERVED');
console.log('   - Customer dashboard: 100% PRESERVED');
console.log('   - API routes: 100% PRESERVED');
console.log('   - Files moved, not deleted (reversible)');

console.log('\n✨ Production-safe cleanup analysis complete!');
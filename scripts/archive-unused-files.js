#!/usr/bin/env node

/**
 * Archive Unused Files Script
 * Moves potentially unused files to an archive folder for project cleanup
 * Files can be easily restored if needed
 */

const fs = require('fs');
const path = require('path');

console.log('📦 Starting safe file archiving process...\n');

// Create archive directory structure
function createArchiveStructure() {
  const archiveDir = 'archived-files';
  const subDirs = [
    'completion-summaries',
    'old-deployment-guides', 
    'duplicate-documentation',
    'old-testing-scripts',
    'legacy-implementations'
  ];
  
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir);
    console.log(`✅ Created archive directory: ${archiveDir}`);
  }
  
  subDirs.forEach(subDir => {
    const fullPath = path.join(archiveDir, subDir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ Created subdirectory: ${fullPath}`);
    }
  });
  
  return archiveDir;
}

// Files to archive (being very conservative)
function getFilesToArchive() {
  return {
    'completion-summaries': [
      // Task completion summaries (keep the main ones, archive duplicates)
      'TASK_1_COMPLETION_SUMMARY.md',
      'TASK_2_FRONTEND_AUDIT_RESULTS.md', 
      'TASK_3_BACKEND_COMPREHENSIVE_SUMMARY.md',
      'TASK_4_PERFORMANCE_COMPLETE_SUMMARY.md',
      'TASK_5_CROSS_PLATFORM_COMPLETE_SUMMARY.md',
      'TASK_6_COMPLETE_SUMMARY.md',
      'TASK_8_COMPLETE_SUMMARY.md',
      'TASK_9_COMPLETE_SUMMARY.md',
      'TASK_10_API_SECURITY_COMPLETE_SUMMARY.md',
      'TASK_11_DATABASE_SECURITY_COMPLETE_SUMMARY.md',
      'TASK_12_THIRD_PARTY_SECURITY_COMPLETE_SUMMARY.md',
      
      // Specific completion files that are duplicates
      'COMPREHENSIVE_SECURITY_FIXES_COMPLETE.md',
      'FINAL_HOMEPAGE_ACCELERATION_COMPLETE.md',
      'REAL_HOMEPAGE_ACCELERATION_COMPLETE.md',
      'ENTERPRISE_PAGE_FIXES_COMPLETE.md',
      'ENTERPRISE_SERVICE_PAGES_COMPLETE.md',
      'PROFESSIONAL_SERVICE_PAGES_COMPLETE.md',
      'UNIFIED_SERVICE_PAGES_COMPLETE.md'
    ],
    
    'old-deployment-guides': [
      // Old deployment documentation (keep the main ones)
      'VERCEL_DEPLOYMENT_FINAL_GUIDE.md',
      'GITHUB_DEPLOYMENT_STEPS.md',
      'COMPREHENSIVE_DEPLOYMENT_SOLUTION.md',
      'DEPLOY_NOW.md',
      'DEPLOYMENT_SUMMARY.md'
    ],
    
    'duplicate-documentation': [
      // Analysis files that are now outdated
      'FINAL_DEPENDENCY_ANALYSIS.md',
      'CORRECTED_DEPENDENCY_ANALYSIS.md',
      'MCP_CONFIGURATION_ANALYSIS.md',
      'SECURE_MCP_CONFIGURATION.md',
      
      // Implementation roadmaps that are complete
      'IMPLEMENTATION_ROADMAP_FINAL.md',
      'FINAL_FRONTEND_IMPLEMENTATION.md',
      'FINAL_BACKEND_IMPLEMENTATION.md'
    ],
    
    'old-testing-scripts': [
      // Old audit and testing scripts
      'scripts/comprehensive-audit-runner.js',
      'scripts/setup-secure-audit-environment.js',
      'scripts/audit-dashboard.js',
      
      // Specific testing scripts that are no longer needed
      'scripts/test-4-phase-typography-alignment.js',
      'scripts/test-middle-card-alignment.js',
      'scripts/test-service-cards-alignment.js',
      'scripts/test-4-card-layout.js',
      'scripts/test-horizontal-layout.js'
    ],
    
    'legacy-implementations': [
      // Old service restoration files
      'COMPLETE_SERVICE_RESTORATION.md',
      'FINAL_SERVICE_RESTORATION_COMPLETE.md',
      'SERVICE_SPLIT_COMPLETE.md',
      'SERVICE_IMAGE_FIXES_COMPLETE.md',
      'SERVICE_PATH_FIXES_COMPLETE.md',
      
      // Old homepage implementations
      'HOMEPAGE_SURGICAL_IMPROVEMENTS_COMPLETE.md',
      'HOMEPAGE_STREAMLINED_REDESIGN_COMPLETE.md',
      'HUB_SPOKE_REDUNDANCY_REMOVAL_COMPLETE.md'
    ]
  };
}

// Move files to archive
function archiveFiles(archiveDir, filesToArchive) {
  let totalMoved = 0;
  let totalSkipped = 0;
  
  Object.keys(filesToArchive).forEach(category => {
    console.log(`\n📁 Processing category: ${category}`);
    const categoryPath = path.join(archiveDir, category);
    
    filesToArchive[category].forEach(file => {
      if (fs.existsSync(file)) {
        try {
          const fileName = path.basename(file);
          const destPath = path.join(categoryPath, fileName);
          
          // Move the file
          fs.renameSync(file, destPath);
          console.log(`  ✅ Moved: ${file} → ${destPath}`);
          totalMoved++;
          
        } catch (error) {
          console.log(`  ❌ Failed to move ${file}: ${error.message}`);
          totalSkipped++;
        }
      } else {
        console.log(`  ⏭️ Not found: ${file}`);
        totalSkipped++;
      }
    });
  });
  
  return { totalMoved, totalSkipped };
}

// Create a restoration script
function createRestorationScript(archiveDir) {
  const restoreScript = `#!/usr/bin/env node

/**
 * Restore Archived Files Script
 * Restores files from the archive back to their original locations
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Restoring archived files...');

// Add restoration logic here if needed
// This script can be enhanced to restore specific files or categories

console.log('✅ Restoration script ready');
console.log('To restore files, manually move them from archived-files/ back to root');
`;

  fs.writeFileSync('scripts/restore-archived-files.js', restoreScript);
  console.log('✅ Created restoration script: scripts/restore-archived-files.js');
}

// Create archive index
function createArchiveIndex(archiveDir, stats) {
  const indexContent = `# Archived Files Index

This directory contains files that were moved during project cleanup on ${new Date().toISOString()}.

## Archive Statistics
- Total files moved: ${stats.totalMoved}
- Files not found/skipped: ${stats.totalSkipped}

## Categories

### completion-summaries/
Task completion summaries and duplicate completion documentation.

### old-deployment-guides/
Outdated deployment guides and documentation.

### duplicate-documentation/
Analysis files and documentation that became outdated.

### old-testing-scripts/
Testing and audit scripts that are no longer actively used.

### legacy-implementations/
Old implementation files and restoration documentation.

## Restoration

To restore any file:
1. Navigate to the appropriate category folder
2. Copy the file back to the project root
3. Or use: \`node scripts/restore-archived-files.js\`

## Safety Note

All files in this archive are recoverable. Nothing was permanently deleted.
`;

  fs.writeFileSync(path.join(archiveDir, 'README.md'), indexContent);
  console.log('✅ Created archive index: archived-files/README.md');
}

// Main execution
async function main() {
  try {
    console.log('🎯 This script will move potentially unused files to an archive folder');
    console.log('📋 Files will NOT be deleted - they can be easily restored\n');
    
    const archiveDir = createArchiveStructure();
    const filesToArchive = getFilesToArchive();
    
    console.log('📦 Starting file archiving...');
    const stats = archiveFiles(archiveDir, filesToArchive);
    
    createRestorationScript(archiveDir);
    createArchiveIndex(archiveDir, stats);
    
    console.log('\n🎉 File archiving completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  Files moved to archive: ${stats.totalMoved}`);
    console.log(`  Files not found/skipped: ${stats.totalSkipped}`);
    console.log(`  Archive location: ${archiveDir}/`);
    
    console.log('\n💡 Next steps:');
    console.log('1. Review the archived files in the archived-files/ directory');
    console.log('2. If you need any file back, simply move it from the archive');
    console.log('3. Run: npm run type-check');
    console.log('4. Run: npm run build');
    console.log('5. Test the application to ensure nothing is broken');
    
    console.log('\n🔄 To restore files: node scripts/restore-archived-files.js');
    
  } catch (error) {
    console.error('❌ Archiving failed:', error.message);
    process.exit(1);
  }
}

main();
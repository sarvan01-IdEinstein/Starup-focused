#!/usr/bin/env node

/**
 * Project Files Cleanup Script
 * Removes outdated documentation and cleans up MCP configuration
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Starting project files cleanup...\n');

// 1. Clean up MCP Configuration
function cleanupMCPConfig() {
  console.log('📋 Cleaning up MCP Configuration...');
  
  const mcpConfigPath = '.kiro/settings/mcp.json';
  
  if (fs.existsSync(mcpConfigPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));
      
      // Keep only official and essential servers
      const cleanConfig = {
        mcpServers: {}
      };
      
      // Keep these reliable servers
      const keepServers = [
        'brave-search',
        'basic-memory', 
        'playwright',
        'sequential-thinking',
        'context7',
        'filesystem'
      ];
      
      keepServers.forEach(serverName => {
        if (config.mcpServers && config.mcpServers[serverName]) {
          // Enable the server and clean up config
          const serverConfig = { ...config.mcpServers[serverName] };
          serverConfig.disabled = false;
          cleanConfig.mcpServers[serverName] = serverConfig;
        }
      });
      
      fs.writeFileSync(mcpConfigPath, JSON.stringify(cleanConfig, null, 2));
      console.log('✅ MCP configuration cleaned and optimized');
      
    } catch (error) {
      console.error('❌ Error cleaning MCP config:', error.message);
    }
  } else {
    console.log('ℹ️ No MCP config found to clean');
  }
}

// 2. Remove outdated documentation files
function cleanupOutdatedFiles() {
  console.log('🗑️ Removing outdated documentation files...');
  
  const filesToRemove = [
    // Duplicate analysis files
    'FINAL_DEPENDENCY_ANALYSIS.md',
    'CORRECTED_DEPENDENCY_ANALYSIS.md',
    'MCP_CONFIGURATION_ANALYSIS.md',
    'SECURE_MCP_CONFIGURATION.md',
    
    // Outdated implementation files
    'FINAL_FRONTEND_IMPLEMENTATION.md',
    'FINAL_BACKEND_IMPLEMENTATION.md', 
    'IMPLEMENTATION_ROADMAP_FINAL.md',
    
    // Old service restoration files
    'COMPLETE_SERVICE_RESTORATION.md',
    'FINAL_SERVICE_RESTORATION_COMPLETE.md',
    'SERVICE_SPLIT_COMPLETE.md',
    
    // Duplicate deployment guides
    'VERCEL_DEPLOYMENT_FINAL_GUIDE.md',
    'GITHUB_DEPLOYMENT_STEPS.md',
    'COMPREHENSIVE_DEPLOYMENT_SOLUTION.md',
    'DEPLOY_NOW.md',
    
    // Old testing and audit files
    'scripts/comprehensive-audit-runner.js',
    'scripts/setup-secure-audit-environment.js',
    'scripts/audit-dashboard.js',
    
    // Redundant completion summaries
    'TASKS_1_TO_12_COMPLETION_SUMMARY.md',
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
    'TASK_12_THIRD_PARTY_SECURITY_COMPLETE_SUMMARY.md'
  ];
  
  let removedCount = 0;
  let skippedCount = 0;
  
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      try {
        fs.unlinkSync(file);
        removedCount++;
        console.log(`  ✅ Removed: ${file}`);
      } catch (error) {
        console.log(`  ❌ Failed to remove: ${file} - ${error.message}`);
        skippedCount++;
      }
    } else {
      skippedCount++;
    }
  });
  
  console.log(`\n📊 Cleanup Summary:`);
  console.log(`  - Files removed: ${removedCount}`);
  console.log(`  - Files not found/skipped: ${skippedCount}`);
}

// 3. Update package.json with useful scripts
function updatePackageScripts() {
  console.log('📝 Updating package.json scripts...');
  
  const packagePath = 'package.json';
  if (fs.existsSync(packagePath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      // Add/update useful scripts
      const newScripts = {
        "clean": "rm -rf .next && rm -rf node_modules/.cache",
        "type-check": "tsc --noEmit",
        "lint:fix": "next lint --fix",
        "format": "prettier --write .",
        "pre-deploy": "npm run type-check && npm run lint && npm run build",
        "audit:security": "npm audit --audit-level moderate",
        "dev:clean": "npm run clean && npm run dev"
      };
      
      pkg.scripts = {
        ...pkg.scripts,
        ...newScripts
      };
      
      fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
      console.log('✅ Package.json scripts updated');
      
    } catch (error) {
      console.error('❌ Error updating package.json:', error.message);
    }
  }
}

// Main execution
async function main() {
  try {
    cleanupMCPConfig();
    cleanupOutdatedFiles();
    updatePackageScripts();
    
    console.log('\n🎉 Project cleanup completed successfully!');
    console.log('\nProject is now cleaner and more maintainable.');
    console.log('\nRecommended next steps:');
    console.log('1. Run the dependency installation script');
    console.log('2. Run: npm run type-check');
    console.log('3. Run: npm run lint:fix');
    console.log('4. Run: npm run build');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  }
}

main();
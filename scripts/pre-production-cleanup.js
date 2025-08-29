#!/usr/bin/env node

/**
 * Pre-Production Comprehensive Cleanup Script
 * Handles MCP config, dependencies, and code cleanup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Pre-Production Cleanup...\n');

// 1. MCP Configuration Cleanup
function cleanupMCPConfig() {
  console.log('📋 Cleaning up MCP Configuration...');
  
  const mcpConfigPath = '.kiro/settings/mcp.json';
  
  if (fs.existsSync(mcpConfigPath)) {
    const config = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));
    
    // Keep only official and reliable servers
    const cleanConfig = {
      mcpServers: {
        // Keep official servers
        "brave-search": config.mcpServers["brave-search"],
        "basic-memory": config.mcpServers["basic-memory"],
        "playwright": config.mcpServers["playwright"],
        "sequential-thinking": config.mcpServers["sequential-thinking"],
        "context7": config.mcpServers["context7"],
        
        // Keep essential third-party
        "filesystem": config.mcpServers["filesystem"]
      }
    };
    
    // Remove disabled or problematic servers
    Object.keys(cleanConfig.mcpServers).forEach(key => {
      if (!cleanConfig.mcpServers[key] || cleanConfig.mcpServers[key].disabled) {
        delete cleanConfig.mcpServers[key];
      }
    });
    
    fs.writeFileSync(mcpConfigPath, JSON.stringify(cleanConfig, null, 2));
    console.log('✅ MCP configuration cleaned');
  }
}

// 2. Install Missing Dependencies
function installMissingDependencies() {
  console.log('📦 Installing missing dependencies...');
  
  const missingDeps = [
    'next-auth',
    'axios',
    'dotenv',
    'node-fetch',
    '@radix-ui/react-accordion',
    '@radix-ui/react-alert-dialog',
    '@radix-ui/react-avatar',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-label',
    '@radix-ui/react-popover',
    '@radix-ui/react-progress',
    '@radix-ui/react-radio-group',
    '@radix-ui/react-scroll-area',
    '@radix-ui/react-separator',
    '@radix-ui/react-slider',
    '@radix-ui/react-switch',
    '@radix-ui/react-textarea',
    '@radix-ui/react-toast',
    '@radix-ui/react-tooltip'
  ];
  
  try {
    console.log('Installing production dependencies...');
    execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ Missing dependencies installed');
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
  }
}

// 3. Remove Unused Dependencies
function removeUnusedDependencies() {
  console.log('🗑️ Removing unused dependencies...');
  
  const unusedDeps = [
    '@react-three/drei',
    '@react-three/fiber',
    'three',
    '@radix-ui/react-tabs',
    'jest',
    '@testing-library/jest-dom',
    'puppeteer'
  ];
  
  try {
    console.log('Removing unused dependencies...');
    execSync(`npm uninstall ${unusedDeps.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ Unused dependencies removed');
  } catch (error) {
    console.error('❌ Error removing dependencies:', error.message);
  }
}

// 4. Clean up duplicate and outdated files
function cleanupFiles() {
  console.log('🧹 Cleaning up duplicate and outdated files...');
  
  const filesToRemove = [
    // Outdated documentation
    'FINAL_DEPENDENCY_ANALYSIS.md',
    'CORRECTED_DEPENDENCY_ANALYSIS.md',
    'MCP_CONFIGURATION_ANALYSIS.md',
    'SECURE_MCP_CONFIGURATION.md',
    
    // Duplicate implementation files
    'FINAL_FRONTEND_IMPLEMENTATION.md',
    'FINAL_BACKEND_IMPLEMENTATION.md',
    'IMPLEMENTATION_ROADMAP_FINAL.md',
    
    // Old service restoration files
    'COMPLETE_SERVICE_RESTORATION.md',
    'FINAL_SERVICE_RESTORATION_COMPLETE.md',
    'SERVICE_SPLIT_COMPLETE.md',
    
    // Outdated deployment guides
    'VERCEL_DEPLOYMENT_FINAL_GUIDE.md',
    'GITHUB_DEPLOYMENT_STEPS.md',
    'COMPREHENSIVE_DEPLOYMENT_SOLUTION.md',
    'DEPLOY_NOW.md',
    
    // Old testing files
    'scripts/comprehensive-audit-runner.js',
    'scripts/setup-secure-audit-environment.js',
    'scripts/audit-dashboard.js'
  ];
  
  let removedCount = 0;
  filesToRemove.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      removedCount++;
      console.log(`  Removed: ${file}`);
    }
  });
  
  console.log(`✅ Cleaned up ${removedCount} outdated files`);
}

// 5. Update package.json scripts
function updatePackageScripts() {
  console.log('📝 Updating package.json scripts...');
  
  const packagePath = 'package.json';
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Add useful scripts
    pkg.scripts = {
      ...pkg.scripts,
      "clean": "rm -rf .next && rm -rf node_modules/.cache",
      "type-check": "tsc --noEmit",
      "lint:fix": "next lint --fix",
      "format": "prettier --write .",
      "pre-deploy": "npm run type-check && npm run lint && npm run build",
      "audit:security": "npm audit --audit-level moderate"
    };
    
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
    console.log('✅ Package.json scripts updated');
  }
}

// Main execution
async function main() {
  try {
    cleanupMCPConfig();
    installMissingDependencies();
    removeUnusedDependencies();
    cleanupFiles();
    updatePackageScripts();
    
    console.log('\n🎉 Pre-production cleanup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run type-check');
    console.log('2. Run: npm run lint:fix');
    console.log('3. Run: npm run build');
    console.log('4. Test the application thoroughly');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  }
}

main();
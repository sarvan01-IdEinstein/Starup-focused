#!/usr/bin/env node

/**
 * Dependency Cleanup Script
 * Removes unused dependencies and installs missing ones
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Starting dependency cleanup...\n');

// Read current package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

console.log('📦 Current dependencies analysis...');
console.log(`Dependencies: ${Object.keys(packageJson.dependencies || {}).length}`);
console.log(`DevDependencies: ${Object.keys(packageJson.devDependencies || {}).length}\n`);

// Dependencies to remove (confirmed unused after careful analysis)
const definitelyUnusedDependencies = [
  '@radix-ui/react-tabs'  // No Tabs components found in codebase
];

const definitelyUnusedDevDependencies = [
  '@testing-library/jest-dom',  // No Jest tests found
  'jest',                       // No Jest configuration found
  'puppeteer'                   // Redundant with Playwright MCP
];

// Actually safe to remove - Three.js not currently used (animations are Framer Motion)
const safeToRemoveUnusedDependencies = [
  '@react-three/drei',      // Not used - animations are Framer Motion
  '@react-three/fiber',     // Not used - animations are Framer Motion  
  'three'                   // Not used - animations are Framer Motion
];

const safeToRemoveUnusedDevDependencies = [
  '@types/three'            // Not needed since Three.js not used
];

// Dependencies to install (missing)
const missingDependencies = [
  'next-auth',
  'axios', 
  'dotenv',
  'node-fetch',
  '@prisma/client',
  'form-data',
  '@radix-ui/react-slot',
  'react-dropzone',
  '@radix-ui/react-label',
  '@radix-ui/react-popover', 
  '@radix-ui/react-slider',
  'date-fns',
  'react-icons',
  'lodash'
];

try {
  // Remove definitely unused dependencies (safe removals)
  if (definitelyUnusedDependencies.length > 0) {
    console.log('🗑️  Removing confirmed unused dependencies...');
    const unusedToRemove = definitelyUnusedDependencies.filter(dep => 
      packageJson.dependencies && packageJson.dependencies[dep]
    );
    
    if (unusedToRemove.length > 0) {
      console.log(`Removing: ${unusedToRemove.join(', ')}`);
      execSync(`npm uninstall ${unusedToRemove.join(' ')}`, { stdio: 'inherit' });
    }
  }

  // Remove definitely unused dev dependencies  
  if (definitelyUnusedDevDependencies.length > 0) {
    console.log('🗑️  Removing confirmed unused dev dependencies...');
    const unusedDevToRemove = definitelyUnusedDevDependencies.filter(dep =>
      packageJson.devDependencies && packageJson.devDependencies[dep]
    );
    
    if (unusedDevToRemove.length > 0) {
      console.log(`Removing: ${unusedDevToRemove.join(', ')}`);
      execSync(`npm uninstall ${unusedDevToRemove.join(' ')}`, { stdio: 'inherit' });
    }
  }

  // Remove Three.js libraries (confirmed not used - animations are Framer Motion)
  const allUnusedToRemove = [...safeToRemoveUnusedDependencies, ...safeToRemoveUnusedDevDependencies]
    .filter(dep => 
      (packageJson.dependencies && packageJson.dependencies[dep]) ||
      (packageJson.devDependencies && packageJson.devDependencies[dep])
    );
  
  if (allUnusedToRemove.length > 0) {
    console.log('\n🗑️  Removing Three.js libraries (animations are Framer Motion, not Three.js)...');
    console.log(`Removing: ${allUnusedToRemove.join(', ')}`);
    execSync(`npm uninstall ${allUnusedToRemove.join(' ')}`, { stdio: 'inherit' });
  }

  console.log('\n✅ Note: Framer Motion animations preserved (this powers the About page animations)');
  console.log('   tsparticles libraries kept (ParticlesBackground component exists)');

  // Install missing dependencies
  if (missingDependencies.length > 0) {
    console.log('📥 Installing missing dependencies...');
    const currentDeps = Object.keys(packageJson.dependencies || {});
    const toInstall = missingDependencies.filter(dep => !currentDeps.includes(dep));
    
    if (toInstall.length > 0) {
      console.log(`Installing: ${toInstall.join(', ')}`);
      execSync(`npm install ${toInstall.join(' ')}`, { stdio: 'inherit' });
    }
  }

  // Run type check and lint
  console.log('\n🔍 Running type check...');
  execSync('npm run type-check', { stdio: 'inherit' });
  
  console.log('\n🔍 Running lint check...');
  execSync('npm run lint', { stdio: 'inherit' });

  console.log('\n✅ Dependency cleanup completed successfully!');
  
  // Show final stats
  const updatedPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log('\n📊 Final dependency count:');
  console.log(`Dependencies: ${Object.keys(updatedPackageJson.dependencies || {}).length}`);
  console.log(`DevDependencies: ${Object.keys(updatedPackageJson.devDependencies || {}).length}`);

} catch (error) {
  console.error('❌ Error during cleanup:', error.message);
  process.exit(1);
}
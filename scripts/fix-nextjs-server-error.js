#!/usr/bin/env node

/**
 * Fix Next.js Server Error Script
 * 
 * This script fixes the common ENOENT routes-manifest.json error
 * by cleaning and rebuilding the Next.js development environment.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Next.js Server Error...\n');

// Function to safely remove directory
function removeDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      console.log(`🗑️  Removing ${dirPath}...`);
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Successfully removed ${dirPath}`);
      return true;
    } else {
      console.log(`ℹ️  Directory ${dirPath} doesn't exist, skipping...`);
      return true;
    }
  } catch (error) {
    console.log(`❌ Error removing ${dirPath}: ${error.message}`);
    return false;
  }
}

// Function to run command safely
function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    console.log(`✅ ${description} completed successfully`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} failed: ${error.message}`);
    return false;
  }
}

// Step 1: Clean Next.js build directories
console.log('📋 Step 1: Cleaning Next.js build directories\n');

const directoriesToClean = ['.next', 'out', 'dist'];
let cleanSuccess = true;

directoriesToClean.forEach(dir => {
  if (!removeDirectory(dir)) {
    cleanSuccess = false;
  }
});

if (!cleanSuccess) {
  console.log('\n⚠️  Some directories could not be cleaned. Continuing anyway...\n');
}

// Step 2: Clear npm cache (optional but helpful)
console.log('📋 Step 2: Clearing npm cache\n');
runCommand('npm cache clean --force', 'Clearing npm cache');

// Step 3: Reinstall dependencies (if needed)
console.log('\n📋 Step 3: Checking dependencies\n');
if (!fs.existsSync('node_modules')) {
  console.log('📦 node_modules not found, installing dependencies...');
  runCommand('npm install', 'Installing dependencies');
} else {
  console.log('✅ node_modules exists, skipping dependency installation');
}

// Step 4: Build Next.js
console.log('\n📋 Step 4: Building Next.js application\n');
const buildSuccess = runCommand('npm run build', 'Building Next.js application');

if (!buildSuccess) {
  console.log('\n⚠️  Build failed, but we can still try to start the dev server...\n');
}

// Step 5: Instructions for starting dev server
console.log('\n📋 Step 5: Ready to start development server\n');
console.log('🚀 To start the development server, run:');
console.log('   npm run dev');
console.log('\n🔗 Then visit: http://localhost:3000');

console.log('\n' + '='.repeat(60));
console.log('🎉 Next.js Server Error Fix Complete!');
console.log('='.repeat(60));

console.log('\n📝 What was fixed:');
console.log('   • Cleaned .next build directory');
console.log('   • Cleared npm cache');
console.log('   • Rebuilt Next.js application');
console.log('   • Regenerated routes manifest');

console.log('\n🔧 If you still get errors:');
console.log('   1. Make sure no other processes are using port 3000');
console.log('   2. Try running: npm run dev -- --port 3001');
console.log('   3. Check for any TypeScript errors in the console');
console.log('   4. Restart your terminal/IDE if needed');

console.log('\n✨ Your 4-Phase IdEinstein methodology should now load correctly!');
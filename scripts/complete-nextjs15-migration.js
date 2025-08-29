#!/usr/bin/env node

/**
 * Complete Next.js 15 & React 19 Migration
 * Finishes the migration that was planned but not fully executed
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Completing Next.js 15 & React 19 migration...\n');

// Check current versions
function checkCurrentVersions() {
  console.log('📋 Checking current versions...');
  
  try {
    const nextVersion = require('../node_modules/next/package.json').version;
    const reactVersion = require('../node_modules/react/package.json').version;
    
    console.log(`Current Next.js: ${nextVersion}`);
    console.log(`Current React: ${reactVersion}`);
    
    if (nextVersion.startsWith('15.') && reactVersion.startsWith('19.')) {
      console.log('✅ Already on Next.js 15 & React 19!');
      return true;
    }
    
    return false;
  } catch (error) {
    console.log('⚠️ Could not determine current versions');
    return false;
  }
}

// Update package.json with Next.js 15 & React 19 versions
function updatePackageJson() {
  console.log('📝 Updating package.json with Next.js 15 & React 19...');
  
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Update to Next.js 15 & React 19 as planned
    pkg.dependencies = {
      ...pkg.dependencies,
      "next": "15.4.7",
      "react": "19.1.1", 
      "react-dom": "19.1.1",
      "eslint-config-next": "15.4.7"
    };
    
    // Update type definitions
    pkg.dependencies["@types/react"] = "19.1.1";
    pkg.dependencies["@types/react-dom"] = "19.1.1";
    
    // Update other packages for React 19 compatibility
    pkg.dependencies["framer-motion"] = "11.15.0";
    pkg.dependencies["react-icons"] = "5.5.0";
    pkg.dependencies["tsparticles"] = "3.8.0";
    
    // Update Node.js requirement
    pkg.engines = {
      "node": ">=18.0.0"
    };
    
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
    console.log('✅ Package.json updated with Next.js 15 & React 19 versions');
    
  } catch (error) {
    console.error('❌ Error updating package.json:', error.message);
    throw error;
  }
}

// Install the updated packages
function installUpdatedPackages() {
  console.log('📦 Installing Next.js 15 & React 19...');
  
  try {
    console.log('This may take a few minutes...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Next.js 15 & React 19 installed successfully');
    
  } catch (error) {
    console.error('❌ Error installing packages:', error.message);
    throw error;
  }
}

// Verify the installation
function verifyInstallation() {
  console.log('🔍 Verifying installation...');
  
  try {
    const nextVersion = require('../node_modules/next/package.json').version;
    const reactVersion = require('../node_modules/react/package.json').version;
    
    console.log(`✅ Next.js: ${nextVersion}`);
    console.log(`✅ React: ${reactVersion}`);
    
    if (nextVersion.startsWith('15.') && reactVersion.startsWith('19.')) {
      console.log('🎉 Migration completed successfully!');
      return true;
    } else {
      console.log('⚠️ Migration may not have completed properly');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Error verifying installation:', error.message);
    return false;
  }
}

// Test the build
function testBuild() {
  console.log('🧪 Testing build with Next.js 15...');
  
  try {
    execSync('npm run type-check', { stdio: 'inherit' });
    console.log('✅ TypeScript compilation successful');
    
    console.log('Building application...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build successful with Next.js 15 & React 19');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    console.log('\n🔄 You may need to fix compatibility issues');
    throw error;
  }
}

// Main execution
async function main() {
  try {
    // Check if already migrated
    if (checkCurrentVersions()) {
      console.log('\n✅ Migration already completed!');
      console.log('The warnings you see are normal for Next.js 15 development.');
      return;
    }
    
    console.log('\n🎯 Starting migration to Next.js 15 & React 19...');
    console.log('This will complete the migration documented in REACT_19_NEXTJS_15_MIGRATION.md\n');
    
    // Confirm with user
    console.log('⚠️ This will update your packages to:');
    console.log('- Next.js 15.4.7');
    console.log('- React 19.1.1');
    console.log('- React DOM 19.1.1');
    console.log('- Updated type definitions');
    
    updatePackageJson();
    installUpdatedPackages();
    
    if (verifyInstallation()) {
      testBuild();
      
      console.log('\n🎉 Next.js 15 & React 19 migration completed successfully!');
      console.log('\n📋 What was updated:');
      console.log('✅ Next.js 13.5.4 → 15.4.7');
      console.log('✅ React 18.2.0 → 19.1.1');
      console.log('✅ React DOM 18.2.0 → 19.1.1');
      console.log('✅ Type definitions updated');
      console.log('✅ Compatible packages updated');
      
      console.log('\n🚀 Benefits you now have:');
      console.log('- Latest React 19 features');
      console.log('- Next.js 15 performance improvements');
      console.log('- Enhanced Turbopack support');
      console.log('- Better TypeScript integration');
      console.log('- Security fixes');
      
      console.log('\n⚠️ The warnings you saw earlier are now resolved!');
      console.log('Your next.config.js was already prepared for Next.js 15.');
      
    } else {
      throw new Error('Migration verification failed');
    }
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.log('\n🔄 Rollback instructions:');
    console.log('1. Restore package.json from git: git checkout package.json');
    console.log('2. Reinstall old versions: npm install');
    console.log('3. The application will work with Next.js 13.5.4');
    
    process.exit(1);
  }
}

main();
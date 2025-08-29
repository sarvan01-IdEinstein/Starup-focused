#!/usr/bin/env node

/**
 * Install Missing Dependencies Script
 * Installs all the missing dependencies identified in the audit
 */

const { execSync } = require('child_process');

console.log('📦 Installing missing dependencies...\n');

// Critical missing dependencies that are actually used in the codebase
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
  '@radix-ui/react-toast',
  '@radix-ui/react-tooltip'
];

// Development dependencies
const devDeps = [
  '@types/node-fetch'
];

function installDependencies() {
  try {
    console.log('Installing production dependencies...');
    console.log(`Dependencies: ${missingDeps.join(', ')}\n`);
    
    execSync(`npm install ${missingDeps.join(' ')}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('\n✅ Production dependencies installed successfully');
    
    console.log('\nInstalling development dependencies...');
    execSync(`npm install -D ${devDeps.join(' ')}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    console.log('✅ Development dependencies installed successfully');
    
  } catch (error) {
    console.error('❌ Error installing dependencies:', error.message);
    process.exit(1);
  }
}

function verifyInstallation() {
  console.log('\n🔍 Verifying installation...');
  
  try {
    // Check if key dependencies are installed
    const keyDeps = ['next-auth', 'axios', '@radix-ui/react-accordion'];
    
    keyDeps.forEach(dep => {
      try {
        require.resolve(dep);
        console.log(`✅ ${dep} - installed`);
      } catch (e) {
        console.log(`❌ ${dep} - missing`);
      }
    });
    
  } catch (error) {
    console.error('Error during verification:', error.message);
  }
}

// Main execution
async function main() {
  try {
    installDependencies();
    verifyInstallation();
    
    console.log('\n🎉 Missing dependencies installation completed!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run type-check');
    console.log('2. Run: npm run lint');
    console.log('3. Run: npm run build');
    
  } catch (error) {
    console.error('❌ Installation failed:', error.message);
    process.exit(1);
  }
}

main();
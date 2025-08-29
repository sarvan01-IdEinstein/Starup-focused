#!/usr/bin/env node

/**
 * Service Image Path Verification Script
 * This script checks all service image paths against the actual directory structure
 */

const fs = require('fs');
const path = require('path');

function checkFileExists(imagePath) {
  // Remove leading slash and 'images/' from the path
  const relativePath = imagePath.replace(/^\/images\//, '');
  const fullPath = path.join(__dirname, '..', 'public', 'images', relativePath);
  return fs.existsSync(fullPath);
}

function extractImagePaths() {
  const servicesDataPath = path.join(__dirname, '..', 'lib', 'services-data.ts');
  const content = fs.readFileSync(servicesDataPath, 'utf8');
  
  // Extract all image paths
  const imagePathRegex = /src: "([^"]*step-hero\.jpg)"/g;
  const paths = [];
  let match;
  
  while ((match = imagePathRegex.exec(content)) !== null) {
    paths.push(match[1]);
  }
  
  return paths;
}

function verifyServiceImagePaths() {
  console.log('🔍 Verifying all service image paths...\n');
  
  const imagePaths = extractImagePaths();
  const issues = [];
  const verified = [];
  
  imagePaths.forEach((imagePath, index) => {
    const exists = checkFileExists(imagePath);
    
    if (exists) {
      verified.push(imagePath);
      console.log(`✅ ${index + 1}. ${imagePath}`);
    } else {
      issues.push(imagePath);
      console.log(`❌ ${index + 1}. ${imagePath} - FILE NOT FOUND`);
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Verified: ${verified.length} paths`);
  console.log(`❌ Issues: ${issues.length} paths`);
  
  if (issues.length > 0) {
    console.log(`\n🚨 Paths with issues:`);
    issues.forEach((issue, index) => {
      console.log(`${index + 1}. ${issue}`);
    });
    
    // Suggest actual directory structure
    console.log(`\n💡 Checking actual directory structure...`);
    const servicesDir = path.join(__dirname, '..', 'public', 'images', 'services');
    
    function listDirectories(dir, prefix = '') {
      try {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        items.forEach(item => {
          if (item.isDirectory()) {
            const fullPath = path.join(dir, item.name);
            console.log(`${prefix}📁 ${item.name}/`);
            
            // If this looks like a process directory, list its contents
            if (item.name === 'process') {
              listDirectories(fullPath, prefix + '  ');
            } else if (prefix.includes('process')) {
              // This is a step directory, don't go deeper
              return;
            } else {
              listDirectories(fullPath, prefix + '  ');
            }
          }
        });
      } catch (error) {
        console.log(`${prefix}❌ Cannot read directory: ${dir}`);
      }
    }
    
    listDirectories(servicesDir);
  }
  
  return issues.length === 0;
}

// Run the verification
const allGood = verifyServiceImagePaths();

if (allGood) {
  console.log('\n🎉 All service image paths are verified and correct!');
} else {
  console.log('\n⚠️  Some image paths need to be fixed.');
  process.exit(1);
}
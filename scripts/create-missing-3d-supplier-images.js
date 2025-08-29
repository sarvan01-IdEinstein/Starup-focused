const fs = require('fs');
const path = require('path');

console.log('📁 Creating missing 3D Printing and Supplier Sourcing image directories...');

// Define the new paths that need to be created
const newImagePaths = [
  // 3D Printing
  '/images/services/manufacturing/3d-printing/process/TP-2-file-preparation-orientation/step-hero.jpg',
  '/images/services/manufacturing/3d-printing/process/TP-3-printer-selection-parameter-optimization/step-hero.jpg',
  '/images/services/manufacturing/3d-printing/process/TP-7-dimensional-verification-quality-control/step-hero.jpg',
  
  // Supplier Sourcing
  '/images/services/manufacturing/supplier-sourcing/process/TP-2-risk-assessment/step-hero.jpg',
  '/images/services/manufacturing/supplier-sourcing/process/TP-4-supplier-evaluation/step-hero.jpg',
  '/images/services/manufacturing/supplier-sourcing/process/TP-5-supplier-selection/step-hero.jpg',
  '/images/services/manufacturing/supplier-sourcing/process/TP-6-contract-negotiation/step-hero.jpg',
  '/images/services/manufacturing/supplier-sourcing/process/TP-7-supplier-onboarding/step-hero.jpg',
  '/images/services/manufacturing/supplier-sourcing/process/TP-8-performance-monitoring/step-hero.jpg'
];

// Function to create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  }
  return false;
}

// Function to copy an existing image as placeholder
function copyPlaceholderImage(targetPath) {
  // Use an existing image as a template
  const sourcePath = path.join(__dirname, '..', 'public', 'images', 'services', 'manufacturing', '3d-printing', 'process', 'TP-1-design-review', 'step-hero.jpg');
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    return true;
  } else {
    // Fallback to R&D image
    const fallbackPath = path.join(__dirname, '..', 'public', 'images', 'services', 'engineering', 'research-development', 'process', 'RD-1-scope', 'step-hero.jpg');
    if (fs.existsSync(fallbackPath)) {
      fs.copyFileSync(fallbackPath, targetPath);
      return true;
    }
  }
  return false;
}

let createdDirs = 0;
let createdFiles = 0;

console.log(`🔄 Processing ${newImagePaths.length} image paths...`);

newImagePaths.forEach((imagePath, index) => {
  // Convert web path to file system path
  const relativePath = imagePath.replace(/^\/images\//, '');
  const fullPath = path.join(__dirname, '..', 'public', 'images', relativePath);
  const dirPath = path.dirname(fullPath);
  
  const serviceName = imagePath.includes('3d-printing') ? '3D Printing' : 'Supplier Sourcing';
  const stepName = imagePath.split('/').slice(-2, -1)[0];
  
  // Create directory if needed
  if (ensureDirectoryExists(dirPath)) {
    createdDirs++;
    console.log(`📁 [${serviceName}] Created directory: ${stepName}`);
  }
  
  // Create image file if it doesn't exist
  if (!fs.existsSync(fullPath)) {
    if (copyPlaceholderImage(fullPath)) {
      createdFiles++;
      console.log(`✅ ${index + 1}. [${serviceName}] Created: ${stepName}/step-hero.jpg`);
    } else {
      console.log(`❌ ${index + 1}. [${serviceName}] Failed to create: ${stepName}/step-hero.jpg`);
    }
  } else {
    console.log(`⏭️  ${index + 1}. [${serviceName}] Already exists: ${stepName}/step-hero.jpg`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`📁 Directories created: ${createdDirs}`);
console.log(`🖼️  Images created: ${createdFiles}`);
console.log(`\n🎉 Missing 3D Printing and Supplier Sourcing images have been created!`);
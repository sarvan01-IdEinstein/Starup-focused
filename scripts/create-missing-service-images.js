const fs = require('fs');
const path = require('path');

console.log('📁 Creating missing service image directories and files...');

// Define the new paths that need to be created
const newImagePaths = [
  // CAD Modeling
  '/images/services/design/cad-modeling/process/ED-6-design-validation/step-hero.jpg',
  '/images/services/design/cad-modeling/process/ED-7-post-validation-iteration/step-hero.jpg',
  
  // FEA & CFD
  '/images/services/engineering/finite-element-cfd/process/FA-5-multi-condition-analysis/step-hero.jpg',
  
  // GD&T
  '/images/services/engineering/gdt-tolerance/process/ED-1-design-review/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-2-manufacturing-method-analysis/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-3-gdt-implementation/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-4-tolerance-stack-up-analysis/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-5-measurement-system-design/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-6-design-optimization/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-7-process-control-implementation/step-hero.jpg'
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
  const sourcePath = path.join(__dirname, '..', 'public', 'images', 'services', 'engineering', 'research-development', 'process', 'RD-1-scope', 'step-hero.jpg');
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    return true;
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
  
  // Create directory if needed
  if (ensureDirectoryExists(dirPath)) {
    createdDirs++;
    console.log(`📁 Created directory: ${relativePath.split('/').slice(0, -1).join('/')}`);
  }
  
  // Create image file if it doesn't exist
  if (!fs.existsSync(fullPath)) {
    if (copyPlaceholderImage(fullPath)) {
      createdFiles++;
      console.log(`✅ ${index + 1}. Created: ${relativePath.split('/').pop()}`);
    } else {
      console.log(`❌ ${index + 1}. Failed to create: ${relativePath.split('/').pop()}`);
    }
  } else {
    console.log(`⏭️  ${index + 1}. Already exists: ${relativePath.split('/').pop()}`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`📁 Directories created: ${createdDirs}`);
console.log(`🖼️  Images created: ${createdFiles}`);
console.log(`\n🎉 Missing service images have been created!`);
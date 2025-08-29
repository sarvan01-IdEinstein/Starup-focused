const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying all service image paths against actual file system...');

// Define the service files to check
const serviceFiles = [
  'lib/services/research-development.ts',
  'lib/services/cad-modeling.ts',
  'lib/services/3d-printing.ts',
  'lib/services/machine-design.ts',
  'lib/services/biw-design.ts',
  'lib/services/finite-element-cfd.ts',
  'lib/services/gdt-tolerance.ts',
  'lib/services/technical-documentation.ts',
  'lib/services/supplier-sourcing.ts'
];

// Function to extract all image paths from a service file
function extractImagePaths(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const srcRegex = /src:\s*["']([^"']*step-hero\.jpg)["']/g;
  const paths = [];
  let match;
  
  while ((match = srcRegex.exec(content)) !== null) {
    paths.push(match[1]);
  }
  
  return paths;
}

// Function to check if image file exists
function checkImageExists(webPath) {
  // Convert web path to file system path
  const relativePath = webPath.replace(/^\/images\//, '');
  const fullPath = path.join(__dirname, '..', 'public', 'images', relativePath);
  return fs.existsSync(fullPath);
}

let totalPaths = 0;
let workingPaths = 0;
let brokenPaths = 0;
const brokenPathsList = [];

console.log(`🔄 Checking ${serviceFiles.length} service files...\n`);

serviceFiles.forEach((serviceFile, index) => {
  const serviceName = serviceFile.split('/').pop().replace('.ts', '');
  console.log(`${index + 1}. Checking ${serviceName}...`);
  
  const filePath = path.join(__dirname, '..', serviceFile);
  
  if (!fs.existsSync(filePath)) {
    console.log(`   ❌ Service file not found: ${serviceFile}`);
    return;
  }
  
  const imagePaths = extractImagePaths(filePath);
  console.log(`   Found ${imagePaths.length} image paths`);
  
  let serviceWorkingPaths = 0;
  let serviceBrokenPaths = 0;
  
  imagePaths.forEach((imagePath, pathIndex) => {
    const exists = checkImageExists(imagePath);
    const stepName = imagePath.split('/').slice(-2, -1)[0];
    
    if (exists) {
      console.log(`   ✅ ${pathIndex + 1}. ${stepName} - OK`);
      serviceWorkingPaths++;
      workingPaths++;
    } else {
      console.log(`   ❌ ${pathIndex + 1}. ${stepName} - MISSING`);
      serviceBrokenPaths++;
      brokenPaths++;
      brokenPathsList.push({
        service: serviceName,
        path: imagePath,
        step: stepName
      });
    }
    totalPaths++;
  });
  
  console.log(`   📊 ${serviceName}: ${serviceWorkingPaths}/${imagePaths.length} working\n`);
});

console.log(`📊 FINAL VERIFICATION RESULTS:`);
console.log(`✅ Working paths: ${workingPaths}/${totalPaths}`);
console.log(`❌ Broken paths: ${brokenPaths}/${totalPaths}`);

if (brokenPaths === 0) {
  console.log(`\n🎉 PERFECT! All service image paths are working correctly!`);
  console.log(`\n🚀 All 9 services should now load without any 404 errors:`);
  console.log(`   ✅ Research & Development`);
  console.log(`   ✅ CAD Modeling`);
  console.log(`   ✅ 3D Printing Services`);
  console.log(`   ✅ Machine Design`);
  console.log(`   ✅ BIW Design`);
  console.log(`   ✅ FEA & CFD Analysis`);
  console.log(`   ✅ GD&T & Tolerance Analysis`);
  console.log(`   ✅ Technical Documentation`);
  console.log(`   ✅ Supplier Sourcing`);
} else {
  console.log(`\n⚠️  Found ${brokenPaths} broken paths:`);
  brokenPathsList.forEach((broken, index) => {
    console.log(`   ${index + 1}. [${broken.service}] ${broken.step}`);
    console.log(`      Path: ${broken.path}`);
  });
  console.log(`\n🔧 These paths need to be fixed or the corresponding image files need to be created.`);
}

const successRate = ((workingPaths / totalPaths) * 100).toFixed(1);
console.log(`\n📈 Success Rate: ${successRate}%`);
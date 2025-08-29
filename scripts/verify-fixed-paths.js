const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying fixed service image paths...');

// Define the paths that were causing 404 errors
const problematicPaths = [
  // CAD Modeling
  '/images/services/design/cad-modeling/process/ED-6-design-validation/step-hero.jpg',
  '/images/services/design/cad-modeling/process/ED-7-post-validation-iteration/step-hero.jpg',
  
  // FEA & CFD
  '/images/services/engineering/finite-element-cfd/process/FA-5-multi-condition-analysis/step-hero.jpg',
  
  // GD&T
  '/images/services/engineering/gdt-tolerance/process/ED-2-manufacturing-method-analysis/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-4-tolerance-stack-up-analysis/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-5-measurement-system-design/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-6-design-optimization/step-hero.jpg',
  '/images/services/engineering/gdt-tolerance/process/ED-7-process-control-implementation/step-hero.jpg'
];

function checkFileExists(imagePath) {
  const relativePath = imagePath.replace(/^\/images\//, '');
  const fullPath = path.join(__dirname, '..', 'public', 'images', relativePath);
  return fs.existsSync(fullPath);
}

console.log(`🔄 Checking ${problematicPaths.length} previously problematic paths...`);

let fixedCount = 0;
let stillMissingCount = 0;

problematicPaths.forEach((imagePath, index) => {
  const exists = checkFileExists(imagePath);
  const fileName = imagePath.split('/').pop();
  const serviceName = imagePath.includes('cad-modeling') ? 'CAD' : 
                     imagePath.includes('finite-element-cfd') ? 'FEA/CFD' : 'GD&T';
  
  if (exists) {
    console.log(`✅ ${index + 1}. [${serviceName}] ${fileName} - FIXED`);
    fixedCount++;
  } else {
    console.log(`❌ ${index + 1}. [${serviceName}] ${fileName} - STILL MISSING`);
    stillMissingCount++;
  }
});

console.log(`\n📊 Verification Summary:`);
console.log(`✅ Fixed: ${fixedCount} paths`);
console.log(`❌ Still missing: ${stillMissingCount} paths`);

if (stillMissingCount === 0) {
  console.log(`\n🎉 SUCCESS! All previously problematic image paths are now working!`);
  console.log(`\n🚀 The 5 services should now load correctly:`);
  console.log(`   • CAD Modeling`);
  console.log(`   • FEA & CFD Analysis`);
  console.log(`   • GD&T & Tolerance Analysis`);
  console.log(`   • 3D Printing Services (was already working)`);
  console.log(`   • Supplier Sourcing (was already working)`);
} else {
  console.log(`\n⚠️  Some paths still need attention.`);
}
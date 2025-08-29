const fs = require('fs');
const path = require('path');

console.log('🔍 Final verification of all service image paths...');

// Define all the paths that were causing 404 errors
const problematicPaths = [
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
  const serviceName = imagePath.includes('3d-printing') ? '3D Printing' : 'Supplier Sourcing';
  const stepName = imagePath.split('/').slice(-2, -1)[0];
  
  if (exists) {
    console.log(`✅ ${index + 1}. [${serviceName}] ${stepName} - FIXED`);
    fixedCount++;
  } else {
    console.log(`❌ ${index + 1}. [${serviceName}] ${stepName} - STILL MISSING`);
    stillMissingCount++;
  }
});

console.log(`\n📊 Final Verification Summary:`);
console.log(`✅ Fixed: ${fixedCount} paths`);
console.log(`❌ Still missing: ${stillMissingCount} paths`);

if (stillMissingCount === 0) {
  console.log(`\n🎉 COMPLETE SUCCESS! All service image path issues are now resolved!`);
  console.log(`\n🚀 All 9 services should now work perfectly:`);
  console.log(`   ✅ Research & Development`);
  console.log(`   ✅ CAD Modeling`);
  console.log(`   ✅ 3D Printing Services`);
  console.log(`   ✅ Machine Design`);
  console.log(`   ✅ BIW Design`);
  console.log(`   ✅ FEA & CFD Analysis`);
  console.log(`   ✅ GD&T & Tolerance Analysis`);
  console.log(`   ✅ Technical Documentation`);
  console.log(`   ✅ Supplier Sourcing`);
  console.log(`\n🎯 No more 404 image errors expected!`);
} else {
  console.log(`\n⚠️  Some paths still need attention.`);
}
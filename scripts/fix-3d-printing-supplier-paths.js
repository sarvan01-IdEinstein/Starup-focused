const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing 3D Printing and Supplier Sourcing image paths...');

// Define the path corrections based on the error logs
const pathCorrections = [
  // 3D Printing fixes - website expects longer names
  {
    file: 'lib/services/3d-printing.ts',
    old: '/images/services/manufacturing/3d-printing/process/TP-2-file-preparation/step-hero.jpg',
    new: '/images/services/manufacturing/3d-printing/process/TP-2-file-preparation-orientation/step-hero.jpg'
  },
  {
    file: 'lib/services/3d-printing.ts',
    old: '/images/services/manufacturing/3d-printing/process/TP-3-printer-selection/step-hero.jpg',
    new: '/images/services/manufacturing/3d-printing/process/TP-3-printer-selection-parameter-optimization/step-hero.jpg'
  },
  {
    file: 'lib/services/3d-printing.ts',
    old: '/images/services/manufacturing/3d-printing/process/TP-7-quality-control/step-hero.jpg',
    new: '/images/services/manufacturing/3d-printing/process/TP-7-dimensional-verification-quality-control/step-hero.jpg'
  },
  
  // Supplier Sourcing fixes - website expects TP- prefix instead of SS-
  {
    file: 'lib/services/supplier-sourcing.ts',
    old: '/images/services/manufacturing/supplier-sourcing/process/SS-2-risk-assessment/step-hero.jpg',
    new: '/images/services/manufacturing/supplier-sourcing/process/TP-2-risk-assessment/step-hero.jpg'
  },
  {
    file: 'lib/services/supplier-sourcing.ts',
    old: '/images/services/manufacturing/supplier-sourcing/process/SS-4-supplier-evaluation/step-hero.jpg',
    new: '/images/services/manufacturing/supplier-sourcing/process/TP-4-supplier-evaluation/step-hero.jpg'
  },
  {
    file: 'lib/services/supplier-sourcing.ts',
    old: '/images/services/manufacturing/supplier-sourcing/process/SS-5-supplier-selection/step-hero.jpg',
    new: '/images/services/manufacturing/supplier-sourcing/process/TP-5-supplier-selection/step-hero.jpg'
  },
  {
    file: 'lib/services/supplier-sourcing.ts',
    old: '/images/services/manufacturing/supplier-sourcing/process/SS-6-contract-negotiation/step-hero.jpg',
    new: '/images/services/manufacturing/supplier-sourcing/process/TP-6-contract-negotiation/step-hero.jpg'
  },
  {
    file: 'lib/services/supplier-sourcing.ts',
    old: '/images/services/manufacturing/supplier-sourcing/process/SS-7-supplier-onboarding/step-hero.jpg',
    new: '/images/services/manufacturing/supplier-sourcing/process/TP-7-supplier-onboarding/step-hero.jpg'
  },
  {
    file: 'lib/services/supplier-sourcing.ts',
    old: '/images/services/manufacturing/supplier-sourcing/process/SS-8-performance-monitoring/step-hero.jpg',
    new: '/images/services/manufacturing/supplier-sourcing/process/TP-8-performance-monitoring/step-hero.jpg'
  }
];

console.log(`📝 Applying ${pathCorrections.length} path corrections...`);

let correctionCount = 0;

pathCorrections.forEach((correction, index) => {
  const filePath = path.join(__dirname, '..', correction.file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(correction.old)) {
      content = content.replace(correction.old, correction.new);
      fs.writeFileSync(filePath, content, 'utf8');
      correctionCount++;
      
      const serviceName = correction.file.includes('3d-printing') ? '3D Printing' : 'Supplier Sourcing';
      const oldName = correction.old.split('/').pop().replace('step-hero.jpg', '').slice(0, -1);
      const newName = correction.new.split('/').pop().replace('step-hero.jpg', '').slice(0, -1);
      
      console.log(`✅ ${index + 1}. [${serviceName}] ${oldName} → ${newName}`);
    } else {
      console.log(`⚠️  ${index + 1}. Path not found in ${correction.file}`);
    }
  } else {
    console.log(`❌ ${index + 1}. File not found: ${correction.file}`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Applied: ${correctionCount} corrections`);
console.log(`⚠️  Skipped: ${pathCorrections.length - correctionCount} (not found)`);

if (correctionCount > 0) {
  console.log(`\n🎉 Service files updated! Now creating missing image directories...`);
} else {
  console.log(`\n⚠️  No corrections were applied. Check the file paths.`);
}
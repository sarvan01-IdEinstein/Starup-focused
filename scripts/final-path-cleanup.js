const fs = require('fs');
const path = require('path');

console.log('🧹 Final cleanup of remaining path issues...');

// Define the specific path corrections needed based on the verification results
const pathCorrections = [
  // Research Development - has duplicate RD-3 entry with old path
  {
    file: 'lib/services/research-development.ts',
    old: '/images/services/engineering/research-development/process/RD-3-proof-of-concept/step-hero.jpg',
    new: '/images/services/Engineering services/research-development/process/RD-3-proof-of-concept/step-hero.jpg'
  },
  
  // CAD Modeling - has old paths
  {
    file: 'lib/services/cad-modeling.ts',
    old: '/images/services/design/cad-modeling/process/ED-3-3d-modeling/step-hero.jpg',
    new: '/images/services/Engineering services/cad-modeling/process/ED-3-3d-modeling/step-hero.jpg'
  },
  {
    file: 'lib/services/cad-modeling.ts',
    old: '/images/services/design/cad-modeling/process/ED-4-assembly-modeling/step-hero.jpg',
    new: '/images/services/Engineering services/cad-modeling/process/ED-4-assembly-modeling/step-hero.jpg'
  },
  
  // 3D Printing - has old paths
  {
    file: 'lib/services/3d-printing.ts',
    old: '/images/services/manufacturing/3d-printing/process/TP-4-material-selection/step-hero.jpg',
    new: '/images/services/Manufacturing solutions/3d printing/process/TP-4-material-selection/step-hero.jpg'
  },
  {
    file: 'lib/services/3d-printing.ts',
    old: '/images/services/manufacturing/3d-printing/process/TP-5-printing-process/step-hero.jpg',
    new: '/images/services/Manufacturing solutions/3d printing/process/TP-5-printing-process/step-hero.jpg'
  },
  
  // Machine Design - has old paths
  {
    file: 'lib/services/machine-design.ts',
    old: '/images/services/engineering/machine-design/process/MD-3-conceptual-design/step-hero.jpg',
    new: '/images/services/Engineering services/machine-design/process/MD-3-conceptual-design/step-hero.jpg'
  },
  {
    file: 'lib/services/machine-design.ts',
    old: '/images/services/engineering/machine-design/process/MD-4-detailed-mechanical-design/step-hero.jpg',
    new: '/images/services/Engineering services/machine-design/process/MD-4-detailed-mechanical-design/step-hero.jpg'
  },
  
  // BIW Design - has old path
  {
    file: 'lib/services/biw-design.ts',
    old: '/images/services/engineering/biw-design/process/BD-3-fixture-design/step-hero.jpg',
    new: '/images/services/Engineering services/biw-design/process/BD-3-fixture-design/step-hero.jpg'
  },
  
  // FEA & CFD - has old path
  {
    file: 'lib/services/finite-element-cfd.ts',
    old: '/images/services/engineering/finite-element-cfd/process/FA-6-results-analysis/step-hero.jpg',
    new: '/images/services/Engineering services/finite-element-cfd/process/FA-6-results-analysis/step-hero.jpg'
  },
  
  // GD&T - has old paths
  {
    file: 'lib/services/gdt-tolerance.ts',
    old: '/images/services/engineering/gdt-tolerance/process/ED-4-tolerance-stack-up-analysis/step-hero.jpg',
    new: '/images/services/Engineering services/gdt-tolerance/process/ED-4-tolerance-stack-up-analysis/step-hero.jpg'
  },
  {
    file: 'lib/services/gdt-tolerance.ts',
    old: '/images/services/engineering/gdt-tolerance/process/ED-5-measurement-system-design/step-hero.jpg',
    new: '/images/services/Engineering services/gdt-tolerance/process/ED-5-measurement-system-design/step-hero.jpg'
  },
  {
    file: 'lib/services/gdt-tolerance.ts',
    old: '/images/services/engineering/gdt-tolerance/process/ED-7-process-control-implementation/step-hero.jpg',
    new: '/images/services/Engineering services/gdt-tolerance/process/ED-7-process-control-implementation/step-hero.jpg'
  },
  
  // Supplier Sourcing - has old SS- prefix
  {
    file: 'lib/services/supplier-sourcing.ts',
    old: '/images/services/manufacturing/supplier-sourcing/process/SS-3-supplier-identification/step-hero.jpg',
    new: '/images/services/Manufacturing solutions/supplier-sourcing/process/TP-3-supplier-identification/step-hero.jpg'
  }
];

console.log(`📝 Applying ${pathCorrections.length} final corrections...`);

let correctionCount = 0;

pathCorrections.forEach((correction, index) => {
  const filePath = path.join(__dirname, '..', correction.file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes(correction.old)) {
      content = content.replace(correction.old, correction.new);
      fs.writeFileSync(filePath, content, 'utf8');
      correctionCount++;
      
      const serviceName = correction.file.split('/').pop().replace('.ts', '');
      const stepName = correction.old.split('/').slice(-2, -1)[0];
      
      console.log(`✅ ${index + 1}. [${serviceName}] Fixed: ${stepName}`);
    } else {
      console.log(`⚠️  ${index + 1}. Path not found in ${correction.file.split('/').pop()}`);
    }
  } else {
    console.log(`❌ ${index + 1}. File not found: ${correction.file}`);
  }
});

console.log(`\n📊 Final Cleanup Summary:`);
console.log(`✅ Applied: ${correctionCount} corrections`);
console.log(`⚠️  Skipped: ${pathCorrections.length - correctionCount} (not found)`);

if (correctionCount > 0) {
  console.log(`\n🎉 Final cleanup completed! All service files should now have correct paths.`);
  console.log(`\n🔍 Run the verification script again to confirm all paths are working.`);
} else {
  console.log(`\n⚠️  No corrections were applied. The paths might already be correct or need manual review.`);
}
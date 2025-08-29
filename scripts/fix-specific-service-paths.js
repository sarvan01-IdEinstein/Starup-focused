const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing specific service image paths...');

// Read the current services-data.ts file
const servicesDataPath = path.join(__dirname, '..', 'lib', 'services-data.ts');
let content = fs.readFileSync(servicesDataPath, 'utf8');

// Define the path corrections needed based on the error logs
const pathCorrections = [
  // CAD Modeling fixes
  {
    old: '/images/services/design/cad-modeling/process/ED-6-review-revision/step-hero.jpg',
    new: '/images/services/design/cad-modeling/process/ED-6-design-validation/step-hero.jpg'
  },
  {
    old: '/images/services/design/cad-modeling/process/ED-7-final-documentation/step-hero.jpg',
    new: '/images/services/design/cad-modeling/process/ED-7-post-validation-iteration/step-hero.jpg'
  },
  
  // FEA & CFD fixes
  {
    old: '/images/services/engineering/finite-element-cfd/process/FA-5-multi-condition/step-hero.jpg',
    new: '/images/services/engineering/finite-element-cfd/process/FA-5-multi-condition-analysis/step-hero.jpg'
  },
  
  // GD&T fixes - change GT- prefix to ED- and add suffixes
  {
    old: '/images/services/engineering/gdt-tolerance/process/GT-1-design-review/step-hero.jpg',
    new: '/images/services/engineering/gdt-tolerance/process/ED-1-design-review/step-hero.jpg'
  },
  {
    old: '/images/services/engineering/gdt-tolerance/process/GT-2-manufacturing-method/step-hero.jpg',
    new: '/images/services/engineering/gdt-tolerance/process/ED-2-manufacturing-method-analysis/step-hero.jpg'
  },
  {
    old: '/images/services/engineering/gdt-tolerance/process/GT-3-gdt-implementation/step-hero.jpg',
    new: '/images/services/engineering/gdt-tolerance/process/ED-3-gdt-implementation/step-hero.jpg'
  },
  {
    old: '/images/services/engineering/gdt-tolerance/process/GT-4-tolerance-stack-up/step-hero.jpg',
    new: '/images/services/engineering/gdt-tolerance/process/ED-4-tolerance-stack-up-analysis/step-hero.jpg'
  },
  {
    old: '/images/services/engineering/gdt-tolerance/process/GT-5-measurement-system/step-hero.jpg',
    new: '/images/services/engineering/gdt-tolerance/process/ED-5-measurement-system-design/step-hero.jpg'
  },
  {
    old: '/images/services/engineering/gdt-tolerance/process/GT-6-design-optimization/step-hero.jpg',
    new: '/images/services/engineering/gdt-tolerance/process/ED-6-design-optimization/step-hero.jpg'
  },
  {
    old: '/images/services/engineering/gdt-tolerance/process/GT-7-process-control/step-hero.jpg',
    new: '/images/services/engineering/gdt-tolerance/process/ED-7-process-control-implementation/step-hero.jpg'
  }
];

console.log(`📝 Applying ${pathCorrections.length} path corrections...`);

// Apply each correction
let correctionCount = 0;
pathCorrections.forEach((correction, index) => {
  if (content.includes(correction.old)) {
    content = content.replace(correction.old, correction.new);
    correctionCount++;
    console.log(`✅ ${index + 1}. Fixed: ${correction.old.split('/').pop()} → ${correction.new.split('/').pop()}`);
  } else {
    console.log(`⚠️  ${index + 1}. Not found: ${correction.old.split('/').pop()}`);
  }
});

// Write the updated content back to the file
fs.writeFileSync(servicesDataPath, content, 'utf8');

console.log(`\n📊 Summary:`);
console.log(`✅ Applied: ${correctionCount} corrections`);
console.log(`⚠️  Skipped: ${pathCorrections.length - correctionCount} (not found)`);
console.log(`\n🎉 Services data updated! The website should now load the correct image paths.`);
const fs = require('fs');
const path = require('path');

console.log('=== SUPPLIER SOURCING SERVICE FOLDER ALIGNMENT VERIFICATION ===\n');

const basePath = 'public/images/services/Manufacturing solutions/supplier-sourcing/process';

// Expected folders based on service file image paths
const expectedSteps = [
  {
    step: 1,
    title: "Requirements Definition",
    folder: "TP-1-requirements-definition",
    servicePath: "/images/services/Manufacturing solutions/supplier-sourcing/process/TP-1-requirements-definition/step-hero.jpg"
  },
  {
    step: 2,
    title: "Risk Assessment",
    folder: "TP-2-risk-assessment",
    servicePath: "/images/services/Manufacturing solutions/supplier-sourcing/process/TP-2-risk-assessment/step-hero.jpg"
  },
  {
    step: 3,
    title: "Supplier Identification",
    folder: "TP-3-supplier-identification",
    servicePath: "/images/services/Manufacturing solutions/supplier-sourcing/process/TP-3-supplier-identification/step-hero.jpg"
  },
  {
    step: 4,
    title: "Supplier Evaluation",
    folder: "TP-4-supplier-evaluation",
    servicePath: "/images/services/Manufacturing solutions/supplier-sourcing/process/TP-4-supplier-evaluation/step-hero.jpg"
  },
  {
    step: 5,
    title: "Supplier Selection",
    folder: "TP-5-supplier-selection",
    servicePath: "/images/services/Manufacturing solutions/supplier-sourcing/process/TP-5-supplier-selection/step-hero.jpg"
  },
  {
    step: 6,
    title: "Contract Negotiation",
    folder: "TP-6-contract-negotiation",
    servicePath: "/images/services/Manufacturing solutions/supplier-sourcing/process/TP-6-contract-negotiation/step-hero.jpg"
  },
  {
    step: 7,
    title: "Supplier Onboarding",
    folder: "TP-7-supplier-onboarding",
    servicePath: "/images/services/Manufacturing solutions/supplier-sourcing/process/TP-7-supplier-onboarding/step-hero.jpg"
  },
  {
    step: 8,
    title: "Performance Monitoring",
    folder: "TP-8-performance-monitoring",
    servicePath: "/images/services/Manufacturing solutions/supplier-sourcing/process/TP-8-performance-monitoring/step-hero.jpg"
  }
];

console.log('Checking folder alignment with service file:\n');

let allAligned = true;

expectedSteps.forEach(item => {
  const folderPath = path.join(basePath, item.folder);
  const imagePath = path.join('public', item.servicePath);
  
  const folderExists = fs.existsSync(folderPath);
  const imageExists = fs.existsSync(imagePath);
  
  console.log(`Step ${item.step}: ${item.title}`);
  console.log(`  Expected folder: ${item.folder}`);
  console.log(`  Folder exists: ${folderExists ? '✓' : '✗'}`);
  console.log(`  Image exists: ${imageExists ? '✓' : '✗'}`);
  
  if (!folderExists || !imageExists) {
    allAligned = false;
  }
  
  console.log('');
});

console.log('=== SUMMARY ===');
console.log(`Alignment status: ${allAligned ? '✓ All folders match service file perfectly' : '✗ Some misalignments found'}`);

// Check for any extra folders
console.log('\nChecking for extra folders...');
try {
  const actualFolders = fs.readdirSync(basePath);
  const expectedFolderNames = expectedSteps.map(f => f.folder);
  
  const extraFolders = actualFolders.filter(folder => !expectedFolderNames.includes(folder));
  
  if (extraFolders.length > 0) {
    console.log('Extra folders found:');
    extraFolders.forEach(folder => console.log(`  - ${folder}`));
  } else {
    console.log('✓ No extra folders found');
  }
} catch (error) {
  console.log('Error reading directory:', error.message);
}

if (allAligned) {
  console.log('\n🎉 SUPPLIER SOURCING SERVICE IS PERFECTLY ALIGNED!');
  console.log('No folder renaming needed - everything matches the service file exactly.');
}
const fs = require('fs');
const path = require('path');

console.log('=== FEA & CFD FOLDER ALIGNMENT VERIFICATION ===\n');

const basePath = 'public/images/services/Engineering services/finite-element-cfd/process';

// Expected folders based on service file image paths
const expectedSteps = [
  {
    step: 1,
    title: "Problem Definition",
    folder: "FA-1-problem-definition",
    servicePath: "/images/services/Engineering services/finite-element-cfd/process/FA-1-problem-definition/step-hero.jpg"
  },
  {
    step: 2,
    title: "Pre-Analysis",
    folder: "FA-2-pre-analysis",
    servicePath: "/images/services/Engineering services/finite-element-cfd/process/FA-2-pre-analysis/step-hero.jpg"
  },
  {
    step: 3,
    title: "Model Preparation",
    folder: "FA-3-model-preparation",
    servicePath: "/images/services/Engineering services/finite-element-cfd/process/FA-3-model-preparation/step-hero.jpg"
  },
  {
    step: 4,
    title: "Simulation Execution",
    folder: "FA-4-simulation-execution",
    servicePath: "/images/services/Engineering services/finite-element-cfd/process/FA-4-simulation-execution/step-hero.jpg"
  },
  {
    step: 5,
    title: "Multi-Condition Analysis",
    folder: "FA-5-multi-condition-analysis",
    servicePath: "/images/services/Engineering services/finite-element-cfd/process/FA-5-multi-condition-analysis/step-hero.jpg"
  },
  {
    step: 6,
    title: "Results Analysis",
    folder: "FA-6-results-analysis",
    servicePath: "/images/services/Engineering services/finite-element-cfd/process/FA-6-results-analysis/step-hero.jpg"
  },
  {
    step: 7,
    title: "Report Generation",
    folder: "FA-7-report-generation",
    servicePath: "/images/services/Engineering services/finite-element-cfd/process/FA-7-report-generation/step-hero.jpg"
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
  console.log('\n🎉 FEA & CFD SERVICE IS PERFECTLY ALIGNED!');
  console.log('All folders match the service file exactly.');
}
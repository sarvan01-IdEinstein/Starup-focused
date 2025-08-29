const fs = require('fs');
const path = require('path');

console.log('=== MACHINE DESIGN FOLDER ALIGNMENT VERIFICATION ===\n');

const basePath = 'public/images/services/Engineering services/machine-design/process';

// Expected folders based on service file image paths
const expectedSteps = [
  {
    step: 1,
    title: "Requirements Analysis",
    folder: "MD-1-requirements-analysis",
    servicePath: "/images/services/Engineering services/machine-design/process/MD-1-requirements-analysis/step-hero.jpg"
  },
  {
    step: 2,
    title: "Safety Assessment",
    folder: "MD-2-safety-assessment",
    servicePath: "/images/services/Engineering services/machine-design/process/MD-2-safety-assessment/step-hero.jpg"
  },
  {
    step: 3,
    title: "Conceptual Design",
    folder: "MD-3-conceptual-design",
    servicePath: "/images/services/Engineering services/machine-design/process/MD-3-conceptual-design/step-hero.jpg"
  },
  {
    step: 4,
    title: "Detailed Mechanical Design",
    folder: "MD-4-detailed-mechanical-design",
    servicePath: "/images/services/Engineering services/machine-design/process/MD-4-detailed-mechanical-design/step-hero.jpg"
  },
  {
    step: 5,
    title: "Control System Design",
    folder: "MD-5-control-system",
    servicePath: "/images/services/Engineering services/machine-design/process/MD-5-control-system/step-hero.jpg"
  },
  {
    step: 6,
    title: "Analysis & Optimization",
    folder: "MD-6-analysis-optimization",
    servicePath: "/images/services/Engineering services/machine-design/process/MD-6-analysis-optimization/step-hero.jpg"
  },
  {
    step: 7,
    title: "Maintenance Planning",
    folder: "MD-7-maintenance-planning",
    servicePath: "/images/services/Engineering services/machine-design/process/MD-7-maintenance-planning/step-hero.jpg"
  },
  {
    step: 8,
    title: "Operator Training",
    folder: "MD-8-training",
    servicePath: "/images/services/Engineering services/machine-design/process/MD-8-training/step-hero.jpg"
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
  console.log('\n🎉 MACHINE DESIGN SERVICE IS PERFECTLY ALIGNED!');
  console.log('No folder renaming needed - everything matches the service file exactly.');
}
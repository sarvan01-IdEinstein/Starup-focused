const fs = require('fs');
const path = require('path');

console.log('=== 3D PRINTING SERVICE FOLDER ALIGNMENT VERIFICATION ===\n');

const basePath = 'public/images/services/Manufacturing solutions/3d printing/process';

// Expected folders based on service file image paths
const expectedSteps = [
  {
    step: 1,
    title: "Design Review",
    folder: "TP-1-design-review",
    servicePath: "/images/services/Manufacturing solutions/3d printing/process/TP-1-design-review/step-hero.jpg"
  },
  {
    step: 2,
    title: "File Preparation & Orientation",
    folder: "TP-2-file-preparation",
    servicePath: "/images/services/Manufacturing solutions/3d printing/process/TP-2-file-preparation/step-hero.jpg"
  },
  {
    step: 3,
    title: "Printer Selection & Parameter Optimization",
    folder: "TP-3-printer-selection",
    servicePath: "/images/services/Manufacturing solutions/3d printing/process/TP-3-printer-selection/step-hero.jpg"
  },
  {
    step: 4,
    title: "Material Selection",
    folder: "TP-4-material-selection",
    servicePath: "/images/services/Manufacturing solutions/3d printing/process/TP-4-material-selection/step-hero.jpg"
  },
  {
    step: 5,
    title: "Printing Process",
    folder: "TP-5-printing-process",
    servicePath: "/images/services/Manufacturing solutions/3d printing/process/TP-5-printing-process/step-hero.jpg"
  },
  {
    step: 6,
    title: "Post-Processing",
    folder: "TP-6-post-processing",
    servicePath: "/images/services/Manufacturing solutions/3d printing/process/TP-6-post-processing/step-hero.jpg"
  },
  {
    step: 7,
    title: "Dimensional Verification & Quality Control",
    folder: "TP-7-quality-control",
    servicePath: "/images/services/Manufacturing solutions/3d printing/process/TP-7-quality-control/step-hero.jpg"
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
  console.log('\n🎉 3D PRINTING SERVICE IS PERFECTLY ALIGNED!');
  console.log('No folder renaming needed - everything matches the service file exactly.');
}
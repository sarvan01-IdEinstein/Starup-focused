const fs = require('fs');
const path = require('path');

console.log('=== GD&T & TOLERANCE ANALYSIS FOLDER ALIGNMENT VERIFICATION ===\n');

const basePath = 'public/images/services/Engineering services/gdt-tolerance/process';

// Expected folders based on service file image paths
const expectedSteps = [
  {
    step: 1,
    title: "Design Review",
    folder: "GT-1-design-review",
    servicePath: "/images/services/Engineering services/gdt-tolerance/process/GT-1-design-review/step-hero.jpg"
  },
  {
    step: 2,
    title: "Manufacturing Method Analysis",
    folder: "GT-2-manufacturing-method",
    servicePath: "/images/services/Engineering services/gdt-tolerance/process/GT-2-manufacturing-method/step-hero.jpg"
  },
  {
    step: 3,
    title: "GD&T Implementation",
    folder: "GT-3-gdt-implementation",
    servicePath: "/images/services/Engineering services/gdt-tolerance/process/GT-3-gdt-implementation/step-hero.jpg"
  },
  {
    step: 4,
    title: "Tolerance Stack-up Analysis",
    folder: "GT-4-tolerance-stack-up",
    servicePath: "/images/services/Engineering services/gdt-tolerance/process/GT-4-tolerance-stack-up/step-hero.jpg"
  },
  {
    step: 5,
    title: "Measurement System Design",
    folder: "GT-5-measurement-system",
    servicePath: "/images/services/Engineering services/gdt-tolerance/process/GT-5-measurement-system/step-hero.jpg"
  },
  {
    step: 6,
    title: "Design Optimization",
    folder: "GT-6-design-optimization",
    servicePath: "/images/services/Engineering services/gdt-tolerance/process/GT-6-design-optimization/step-hero.jpg"
  },
  {
    step: 7,
    title: "Process Control Implementation",
    folder: "GT-7-process-control",
    servicePath: "/images/services/Engineering services/gdt-tolerance/process/GT-7-process-control/step-hero.jpg"
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
  console.log('\n🎉 GD&T & TOLERANCE ANALYSIS SERVICE IS PERFECTLY ALIGNED!');
  console.log('No folder renaming needed - everything matches the service file exactly.');
}
const fs = require('fs');
const path = require('path');

console.log('=== BIW DESIGN FOLDER ALIGNMENT VERIFICATION ===\n');

const basePath = 'public/images/services/Engineering services/biw-design/process';

// Expected folders based on service file image paths
const expectedSteps = [
  {
    step: 1,
    title: "Process Planning",
    folder: "BD-1-process-planning",
    servicePath: "/images/services/Engineering services/biw-design/process/BD-1-process-planning/step-hero.jpg"
  },
  {
    step: 2,
    title: "Cross-Team Integration",
    folder: "BD-2-cross-team-integration",
    servicePath: "/images/services/Engineering services/biw-design/process/BD-2-cross-team-integration/step-hero.jpg"
  },
  {
    step: 3,
    title: "Fixture Design",
    folder: "BD-3-fixture-design",
    servicePath: "/images/services/Engineering services/biw-design/process/BD-3-fixture-design/step-hero.jpg"
  },
  {
    step: 4,
    title: "Welding Equipment Design",
    folder: "BD-4-welding-equipment",
    servicePath: "/images/services/Engineering services/biw-design/process/BD-4-welding-equipment/step-hero.jpg"
  },
  {
    step: 5,
    title: "Manufacturing Simulation",
    folder: "BD-5-manufacturing-simulation",
    servicePath: "/images/services/Engineering services/biw-design/process/BD-5-manufacturing-simulation/step-hero.jpg"
  },
  {
    step: 6,
    title: "Assembly System Design",
    folder: "BD-6-assembly-system",
    servicePath: "/images/services/Engineering services/biw-design/process/BD-6-assembly-system/step-hero.jpg"
  },
  {
    step: 7,
    title: "Enhanced Validation",
    folder: "BD-7-enhanced-validation",
    servicePath: "/images/services/Engineering services/biw-design/process/BD-7-enhanced-validation/step-hero.jpg"
  },
  {
    step: 8,
    title: "Documentation & Training",
    folder: "BD-8-documentation-training",
    servicePath: "/images/services/Engineering services/biw-design/process/BD-8-documentation-training/step-hero.jpg"
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
  console.log('\n🎉 BIW DESIGN SERVICE IS PERFECTLY ALIGNED!');
  console.log('No folder renaming needed - everything matches the service file exactly.');
}
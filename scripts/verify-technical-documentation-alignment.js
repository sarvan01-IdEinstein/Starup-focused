const fs = require('fs');
const path = require('path');

console.log('=== TECHNICAL DOCUMENTATION SERVICE FOLDER ALIGNMENT VERIFICATION ===\n');

const basePath = 'public/images/services/Manufacturing solutions/technical-documentation/process';

// Expected folders based on service file image paths
const expectedSteps = [
  {
    step: 1,
    title: "User Needs Analysis",
    folder: "TD-1-user-needs",
    servicePath: "/images/services/Manufacturing solutions/technical-documentation/process/TD-1-user-needs/step-hero.jpg"
  },
  {
    step: 2,
    title: "Content Planning",
    folder: "TD-2-content-planning",
    servicePath: "/images/services/Manufacturing solutions/technical-documentation/process/TD-2-content-planning/step-hero.jpg"
  },
  {
    step: 3,
    title: "Technical Writing",
    folder: "TD-3-technical-writing",
    servicePath: "/images/services/Manufacturing solutions/technical-documentation/process/TD-3-technical-writing/step-hero.jpg"
  },
  {
    step: 4,
    title: "3D Modeling & Visualization",
    folder: "TD-4-3d-modeling",
    servicePath: "/images/services/Manufacturing solutions/technical-documentation/process/TD-4-3d-modeling/step-hero.jpg"
  },
  {
    step: 5,
    title: "Rendering & Graphics",
    folder: "TD-5-rendering",
    servicePath: "/images/services/Manufacturing solutions/technical-documentation/process/TD-5-rendering/step-hero.jpg"
  },
  {
    step: 6,
    title: "Accessibility & Standards",
    folder: "TD-6-accessibility",
    servicePath: "/images/services/Manufacturing solutions/technical-documentation/process/TD-6-accessibility/step-hero.jpg"
  },
  {
    step: 7,
    title: "User Testing & Validation",
    folder: "TD-7-user-testing",
    servicePath: "/images/services/Manufacturing solutions/technical-documentation/process/TD-7-user-testing/step-hero.jpg"
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
  console.log('\n🎉 TECHNICAL DOCUMENTATION SERVICE IS PERFECTLY ALIGNED!');
  console.log('No folder renaming needed - everything matches the service file exactly.');
}
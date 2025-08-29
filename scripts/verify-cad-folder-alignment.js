const fs = require('fs');
const path = require('path');

console.log('=== CAD MODELING FOLDER ALIGNMENT VERIFICATION ===\n');

const basePath = 'public/images/services/Engineering services/cad-modeling/process';

// Expected folders based on service file image paths
const expectedFolders = [
  {
    step: 1,
    title: "Requirements Analysis",
    folder: "ED-1-requirements",
    servicePath: "/images/services/Engineering services/cad-modeling/process/ED-1-requirements/step-hero.jpg"
  },
  {
    step: 2,
    title: "Concept Development",
    folder: "ED-2-concept-sketching", 
    servicePath: "/images/services/Engineering services/cad-modeling/process/ED-2-concept-sketching/step-hero.jpg"
  },
  {
    step: 3,
    title: "Detailed 3D Modeling",
    folder: "ED-3-3d-modeling",
    servicePath: "/images/services/Engineering services/cad-modeling/process/ED-3-3d-modeling/step-hero.jpg"
  },
  {
    step: 4,
    title: "Technical Documentation", 
    folder: "ED-4-Technical documantation",
    servicePath: "/images/services/Engineering services/cad-modeling/process/ED-4-Technical documantation/step-hero.jpg"
  },
  {
    step: 5,
    title: "Design Validation",
    folder: "ED-6-review-revision",
    servicePath: "/images/services/Engineering services/cad-modeling/process/ED-6-review-revision/step-hero.jpg"
  },
  {
    step: 6,
    title: "Post-Validation Iteration",
    folder: "ED-7-final-documentation",
    servicePath: "/images/services/Engineering services/cad-modeling/process/ED-7-final-documentation/step-hero.jpg"
  },
  {
    step: 7,
    title: "Design Handover",
    folder: "ED-7-final-documentation", 
    servicePath: "/images/services/Engineering services/cad-modeling/process/ED-7-final-documentation/step-hero.jpg",
    note: "Shares folder with step 6"
  }
];

console.log('Checking folder alignment with service file:\n');

let allAligned = true;

expectedFolders.forEach(item => {
  const folderPath = path.join(basePath, item.folder);
  const imagePath = path.join('public', item.servicePath);
  
  const folderExists = fs.existsSync(folderPath);
  const imageExists = fs.existsSync(imagePath);
  
  console.log(`Step ${item.step}: ${item.title}`);
  console.log(`  Expected folder: ${item.folder}`);
  console.log(`  Folder exists: ${folderExists ? '✓' : '✗'}`);
  console.log(`  Image exists: ${imageExists ? '✓' : '✗'}`);
  
  if (item.note) {
    console.log(`  Note: ${item.note}`);
  }
  
  if (!folderExists || !imageExists) {
    allAligned = false;
  }
  
  console.log('');
});

console.log('=== SUMMARY ===');
console.log(`Alignment status: ${allAligned ? '✓ All folders match service file' : '✗ Some misalignments found'}`);

// Check for any extra folders
console.log('\nChecking for extra folders...');
try {
  const actualFolders = fs.readdirSync(basePath);
  const expectedFolderNames = [...new Set(expectedFolders.map(f => f.folder))];
  
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
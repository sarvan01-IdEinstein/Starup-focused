const fs = require('fs');
const path = require('path');

// Verify CAD Modeling folder alignment
console.log('=== CAD MODELING FOLDER ALIGNMENT VERIFICATION ===\n');

const basePath = 'public/images/services/Engineering services/cad-modeling/process';

// Expected process steps and their corresponding folders
const processSteps = [
  {
    step: 1,
    title: 'Requirements Analysis',
    expectedFolder: 'ED-1-requirements',
    servicePath: '/images/services/Engineering services/cad-modeling/process/ED-1-requirements/step-hero.jpg'
  },
  {
    step: 2,
    title: 'Concept Development',
    expectedFolder: 'ED-2-concept-sketching',
    servicePath: '/images/services/Engineering services/cad-modeling/process/ED-2-concept-sketching/step-hero.jpg',
    note: 'Folder name is "concept-sketching" but step is "Concept Development"'
  },
  {
    step: 3,
    title: 'Detailed 3D Modeling',
    expectedFolder: 'ED-3-3d-modeling',
    servicePath: '/images/services/Engineering services/cad-modeling/process/ED-3-3d-modeling/step-hero.jpg'
  },
  {
    step: 4,
    title: 'Technical Documentation',
    expectedFolder: 'ED-4-Technical documantation',
    servicePath: '/images/services/Engineering services/cad-modeling/process/ED-4-Technical documantation/step-hero.jpg',
    note: 'Typo in folder name: "documantation" should be "documentation"'
  },
  {
    step: 5,
    title: 'Design Validation',
    expectedFolder: 'ED-5-Design validation',
    servicePath: '/images/services/Engineering services/cad-modeling/process/ED-5-Design validation/step-hero.jpg'
  },
  {
    step: 6,
    title: 'Post-Validation Iteration',
    expectedFolder: 'ED-6-Post-validation iteration',
    servicePath: '/images/services/Engineering services/cad-modeling/process/ED-6-Post-validation iteration/step-hero.jpg'
  },
  {
    step: 7,
    title: 'Design Handover',
    expectedFolder: 'ED-7-Design handover',
    servicePath: '/images/services/Engineering services/cad-modeling/process/ED-7-Design handover/step-hero.jpg'
  }
];

console.log('Checking folder existence and image files:\n');

let allGood = true;

processSteps.forEach(step => {
  const folderPath = path.join(basePath, step.expectedFolder);
  const imagePath = path.join('public', step.servicePath);
  
  const folderExists = fs.existsSync(folderPath);
  const imageExists = fs.existsSync(imagePath);
  
  console.log(`Step ${step.step}: ${step.title}`);
  console.log(`  Folder: ${step.expectedFolder}`);
  console.log(`  Exists: ${folderExists ? '✓' : '✗'}`);
  console.log(`  Image: ${imageExists ? '✓' : '✗'}`);
  
  if (step.note) {
    console.log(`  Note: ${step.note}`);
  }
  
  if (!folderExists || !imageExists) {
    allGood = false;
  }
  
  console.log('');
});

console.log('=== SUMMARY ===');
console.log(`Overall status: ${allGood ? '✓ All folders and images found' : '✗ Some issues found'}`);

if (!allGood) {
  console.log('\nRecommendations:');
  console.log('1. Fix typo: Rename "ED-4-Technical documantation" to "ED-4-Technical documentation"');
  console.log('2. Consider renaming "ED-2-concept-sketching" to "ED-2-Concept development" for consistency');
}
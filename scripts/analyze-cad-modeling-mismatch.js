const fs = require('fs');
const path = require('path');

console.log('=== CAD MODELING FOLDER ANALYSIS ===\n');

// Process steps from service file with their current image paths
const serviceSteps = [
  {
    step: 1,
    title: "Requirements Analysis",
    currentImagePath: "/images/services/Engineering services/cad-modeling/process/ED-1-requirements/step-hero.jpg"
  },
  {
    step: 2,
    title: "Concept Development", 
    currentImagePath: "/images/services/Engineering services/cad-modeling/process/ED-2-concept-sketching/step-hero.jpg"
  },
  {
    step: 3,
    title: "Detailed 3D Modeling",
    currentImagePath: "/images/services/Engineering services/cad-modeling/process/ED-3-3d-modeling/step-hero.jpg"
  },
  {
    step: 4,
    title: "Technical Documentation",
    currentImagePath: "/images/services/Engineering services/cad-modeling/process/ED-4-Technical documantation/step-hero.jpg"
  },
  {
    step: 5,
    title: "Design Validation",
    currentImagePath: "/images/services/Engineering services/cad-modeling/process/ED-6-review-revision/step-hero.jpg"
  },
  {
    step: 6,
    title: "Post-Validation Iteration",
    currentImagePath: "/images/services/Engineering services/cad-modeling/process/ED-7-final-documentation/step-hero.jpg"
  },
  {
    step: 7,
    title: "Design Handover",
    currentImagePath: "/images/services/Engineering services/cad-modeling/process/ED-7-final-documentation/step-hero.jpg"
  }
];

// Current actual folders
const actualFolders = [
  "ED-1-requirements",
  "ED-2-concept-sketching", 
  "ED-3-3d-modeling",
  "ED-4-Technical documantation",
  "ED-5-Design validation",
  "ED-6-Post-validation iteration",
  "ED-7-Design handover"
];

console.log('ANALYSIS: Service File vs Actual Folders\n');

serviceSteps.forEach(step => {
  const expectedFolder = step.currentImagePath.split('/').slice(-2)[0];
  const actualFolder = actualFolders[step.step - 1];
  const match = expectedFolder === actualFolder;
  
  console.log(`Step ${step.step}: ${step.title}`);
  console.log(`  Service expects: ${expectedFolder}`);
  console.log(`  Actual folder:   ${actualFolder}`);
  console.log(`  Match: ${match ? '✓' : '✗'}`);
  console.log('');
});

console.log('=== ISSUES FOUND ===');
console.log('1. Step 5 (Design Validation): Service expects "ED-6-review-revision" but folder is "ED-5-Design validation"');
console.log('2. Step 6 (Post-Validation Iteration): Service expects "ED-7-final-documentation" but folder is "ED-6-Post-validation iteration"');
console.log('3. Step 7 (Design Handover): Service expects "ED-7-final-documentation" but folder is "ED-7-Design handover"');
console.log('4. Steps 6 and 7 both point to same folder "ED-7-final-documentation" in service file');

console.log('\n=== RECOMMENDED FOLDER RENAMES ===');
console.log('To match the service file exactly:');
console.log('1. Rename "ED-5-Design validation" → "ED-6-review-revision"');
console.log('2. Rename "ED-6-Post-validation iteration" → "ED-7-final-documentation"');  
console.log('3. Delete "ED-7-Design handover" (duplicate path in service)');

console.log('\nOR fix the service file to have proper sequential paths.');
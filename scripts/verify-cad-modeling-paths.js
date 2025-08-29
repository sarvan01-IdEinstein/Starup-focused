const fs = require('fs');
const path = require('path');

console.log('=== CAD MODELING PATH VERIFICATION ===\n');

// Expected paths based on actual folder structure
const expectedPaths = [
  {
    step: 1,
    title: "Requirements Analysis",
    path: "/images/services/Engineering services/cad-modeling/process/ED-1-requirements/step-hero.jpg"
  },
  {
    step: 2,
    title: "Concept Development",
    path: "/images/services/Engineering services/cad-modeling/process/ED-2-concept-sketching/step-hero.jpg"
  },
  {
    step: 3,
    title: "Detailed 3D Modeling",
    path: "/images/services/Engineering services/cad-modeling/process/ED-3-3d-modeling/step-hero.jpg"
  },
  {
    step: 4,
    title: "Technical Documentation",
    path: "/images/services/Engineering services/cad-modeling/process/ED-4-Technical documentation/step-hero.jpg"
  },
  {
    step: 5,
    title: "Design Validation",
    path: "/images/services/Engineering services/cad-modeling/process/ED-5-Design Validation/step-hero.jpg"
  },
  {
    step: 6,
    title: "Post-Validation Iteration",
    path: "/images/services/Engineering services/cad-modeling/process/ED-6-Post-Validation Iteration/step-hero.jpg"
  },
  {
    step: 7,
    title: "Design Handover",
    path: "/images/services/Engineering services/cad-modeling/process/ED-7-Design Handover/step-hero.jpg"
  }
];

console.log('Verifying image paths exist:\n');

let allPathsExist = true;

expectedPaths.forEach(item => {
  const fullPath = path.join('public', item.path);
  const exists = fs.existsSync(fullPath);
  
  console.log(`Step ${item.step}: ${item.title}`);
  console.log(`  Path: ${item.path}`);
  console.log(`  Exists: ${exists ? '✓' : '✗'}`);
  
  if (!exists) {
    allPathsExist = false;
  }
  
  console.log('');
});

console.log('=== SUMMARY ===');
console.log(`All paths working: ${allPathsExist ? '✓ YES' : '✗ NO'}`);

if (allPathsExist) {
  console.log('\n🎉 CAD MODELING PATHS SUCCESSFULLY FIXED!');
  console.log('All image paths are now working correctly.');
} else {
  console.log('\n❌ Some paths still need fixing.');
}
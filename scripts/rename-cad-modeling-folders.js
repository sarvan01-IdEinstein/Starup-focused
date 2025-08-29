const fs = require("fs");
const path = require("path");

// CAD Modeling folder renaming script
const basePath =
  "public/images/services/Engineering services/cad-modeling/process";

// Current folder names vs required folder names based on process steps
const folderMappings = [
  {
    current: "ED-1-requirements",
    target: "requirements-analysis",
    stepTitle: "Requirements Analysis",
  },
  {
    current: "ED-2-concept-sketching",
    target: "concept-development",
    stepTitle: "Concept Development",
  },
  {
    current: "ED-3-3d-modeling",
    target: "detailed-3d-modeling",
    stepTitle: "Detailed 3D Modeling",
  },
  {
    current: "ED-4-assembly-modeling",
    target: "technical-documentation",
    stepTitle: "Technical Documentation",
    note: "ED-4 will be renamed to match step 4",
  },
  {
    current: "ED-5-technical-drawings",
    target: "design-validation",
    stepTitle: "Design Validation",
    note: "ED-5 will be renamed to match step 5",
  },
  {
    current: "ED-6-review-revision",
    target: "post-validation-iteration",
    stepTitle: "Post-Validation Iteration",
    note: "ED-6 will be renamed to match step 6",
  },
  {
    current: "ED-7-final-documentation",
    target: "design-handover",
    stepTitle: "Design Handover",
    note: "ED-7 will be renamed to match step 7",
  },
];

console.log("=== CAD MODELING FOLDER ANALYSIS ===\n");

// First, let's analyze what we have vs what we need
console.log("Current folder structure analysis:");
folderMappings.forEach((mapping, index) => {
  const currentPath = path.join(basePath, mapping.current);
  const exists = fs.existsSync(currentPath);

  console.log(`${index + 1}. ${mapping.current} -> ${mapping.target}`);
  console.log(`   Step: "${mapping.stepTitle}"`);
  console.log(`   Exists: ${exists ? "✓" : "✗"}`);
  if (mapping.note) {
    console.log(`   Note: ${mapping.note}`);
  }
  console.log("");
});

// Function to rename folders
function renameFolders() {
  console.log("\n=== STARTING FOLDER RENAMING ===\n");

  let renamedCount = 0;
  let errors = [];

  folderMappings.forEach((mapping, index) => {
    const currentPath = path.join(basePath, mapping.current);
    const targetPath = path.join(basePath, mapping.target);

    try {
      if (fs.existsSync(currentPath)) {
        // Check if target already exists
        if (fs.existsSync(targetPath)) {
          console.log(`⚠️  Target folder already exists: ${mapping.target}`);
          console.log(`   Skipping rename of: ${mapping.current}`);
        } else {
          fs.renameSync(currentPath, targetPath);
          console.log(`✓ Renamed: ${mapping.current} -> ${mapping.target}`);
          renamedCount++;
        }
      } else {
        console.log(`⚠️  Source folder not found: ${mapping.current}`);
      }
    } catch (error) {
      const errorMsg = `Failed to rename ${mapping.current}: ${error.message}`;
      console.log(`✗ ${errorMsg}`);
      errors.push(errorMsg);
    }
  });

  console.log(`\n=== RENAMING COMPLETE ===`);
  console.log(`Successfully renamed: ${renamedCount} folders`);
  if (errors.length > 0) {
    console.log(`Errors encountered: ${errors.length}`);
    errors.forEach((error) => console.log(`  - ${error}`));
  }
}

// Function to verify the new structure
function verifyNewStructure() {
  console.log("\n=== VERIFYING NEW STRUCTURE ===\n");

  folderMappings.forEach((mapping, index) => {
    const targetPath = path.join(basePath, mapping.target);
    const exists = fs.existsSync(targetPath);
    const stepHeroExists = fs.existsSync(
      path.join(targetPath, "step-hero.jpg")
    );

    console.log(`${index + 1}. ${mapping.target}`);
    console.log(`   Folder exists: ${exists ? "✓" : "✗"}`);
    console.log(`   step-hero.jpg: ${stepHeroExists ? "✓" : "✗"}`);
    console.log("");
  });
}

// Run the analysis first
console.log('Run with argument "rename" to perform the actual renaming:');
console.log("node scripts/rename-cad-modeling-folders.js rename\n");

if (process.argv[2] === "rename") {
  renameFolders();
  verifyNewStructure();
} else {
  console.log(
    'Analysis complete. Add "rename" argument to execute the renaming.'
  );
}

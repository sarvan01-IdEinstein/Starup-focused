const fs = require("fs");
const path = require("path");

console.log("🔧 Fixing specific service issues based on original structure...");

// Based on the original file, here are the correct process steps and their mappings
const serviceCorrections = {
  "cad-modeling": {
    file: "lib/services/cad-modeling.ts",
    correctSteps: [
      {
        title: "Requirements Analysis",
        folder: "ED-1-requirements",
        originalImage: "requirements-analysis.jpg",
      },
      {
        title: "Concept Development",
        folder: "ED-2-concept-sketching",
        originalImage: "concept-development.jpg",
      },
      {
        title: "Detailed 3D Modeling",
        folder: "ED-3-3d-modeling",
        originalImage: "detailed-modeling.jpg",
      },
      {
        title: "Technical Documentation",
        folder: "ED-5-technical-drawings",
        originalImage: "technical-documentation.jpg",
      },
      {
        title: "Design Validation",
        folder: "ED-6-review-revision",
        originalImage: "design-validation.jpg",
      },
      {
        title: "Post-Validation Iteration",
        folder: "ED-7-final-documentation",
        originalImage: "post-validation.jpg",
      },
      {
        title: "Design Handover",
        folder: "ED-7-final-documentation", // Reuse same folder
        originalImage: "design-handover.jpg",
      },
    ],
  },
  "gdt-tolerance": {
    file: "lib/services/gdt-tolerance.ts",
    correctSteps: [
      {
        folder: "GT-1-design-review",
      },
      {
        folder: "GT-2-manufacturing-method",
      },
      {
        folder: "GT-3-gdt-implementation",
      },
      {
        folder: "GT-4-tolerance-stack-up",
      },
      {
        folder: "GT-5-measurement-system",
      },
      {
        folder: "GT-6-design-optimization",
      },
      {
        folder: "GT-7-process-control",
      },
    ],
  },
  "3d-printing": {
    file: "lib/services/3d-printing.ts",
    correctSteps: [
      {
        title: "Design Review",
        folder: "TP-1-design-review",
        originalImage: "design-review.jpg",
      },
      {
        title: "File Preparation & Orientation",
        folder: "TP-2-file-preparation",
        originalImage: "file-preparation.jpg",
      },
      {
        title: "Printer Selection & Parameter Optimization",
        folder: "TP-3-printer-selection",
        originalImage: "printer-selection.jpg",
      },
      {
        title: "Material Selection",
        folder: "TP-4-material-selection",
        originalImage: "material-selection.jpg",
      },
      {
        title: "Printing Process",
        folder: "TP-5-printing-process",
        originalImage: "printing-process.jpg",
      },
      {
        title: "Post-Processing",
        folder: "TP-6-post-processing",
        originalImage: "post-processing.jpg",
      },
      {
        title: "Dimensional Verification & Quality Control",
        folder: "TP-7-quality-control",
        originalImage: "quality-control.jpg",
      },
    ],
  },
  "supplier-sourcing": {
    file: "lib/services/supplier-sourcing.ts",
    correctSteps: [
      {
        folder: "TP-1-requirements-definition",
      },
      {
        folder: "TP-2-risk-assessment",
      },
      {
        folder: "TP-3-supplier-identification",
      },
      {
        folder: "TP-4-supplier-evaluation",
      },
      {
        folder: "TP-5-supplier-selection",
      },
      {
        folder: "TP-6-contract-negotiation",
      },
      {
        folder: "TP-7-supplier-onboarding",
      },
      {
        folder: "TP-8-performance-monitoring",
      },
    ],
  },
};

// Function to fix a specific service
function fixService(serviceName, corrections) {
  const filePath = path.join(__dirname, "..", corrections.file);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ Service file not found: ${corrections.file}`);
    return false;
  }

  let content = fs.readFileSync(filePath, "utf8");
  let updatedCount = 0;

  console.log(`\n📁 Fixing ${serviceName}:`);

  // Get the correct base path for this service
  let basePath;
  if (serviceName === "3d-printing" || serviceName === "supplier-sourcing") {
    basePath = "/images/services/Manufacturing solutions";
    if (serviceName === "3d-printing") {
      basePath += "/3d printing/process";
    } else {
      basePath += "/supplier-sourcing/process";
    }
  } else {
    basePath = "/images/services/Engineering services";
    if (serviceName === "cad-modeling") {
      basePath += "/cad-modeling/process";
    } else if (serviceName === "gdt-tolerance") {
      basePath += "/gdt-tolerance/process";
    }
  }

  // Replace all image paths with correct ones
  corrections.correctSteps.forEach((step, index) => {
    const correctPath = `${basePath}/${step.folder}/step-hero.jpg`;

    // Find the nth occurrence of step-hero.jpg and replace it
    const stepHeroRegex = /src:\s*["']([^"']*step-hero\.jpg)["']/g;
    let matches = [];
    let match;

    while ((match = stepHeroRegex.exec(content)) !== null) {
      matches.push({
        fullMatch: match[0],
        path: match[1],
        index: match.index,
      });
    }

    if (matches[index]) {
      const oldPath = matches[index].path;
      if (oldPath !== correctPath) {
        content = content.replace(oldPath, correctPath);
        updatedCount++;
        console.log(`   ✅ ${index + 1}. Updated: ${step.folder}`);
        console.log(`      ${oldPath} → ${correctPath}`);
      } else {
        console.log(`   ⏭️  ${index + 1}. Already correct: ${step.folder}`);
      }
    } else {
      console.log(`   ⚠️  ${index + 1}. No path found for: ${step.folder}`);
    }
  });

  // Write the updated content back
  if (updatedCount > 0) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`   📝 Updated ${updatedCount} paths in ${corrections.file}`);
  } else {
    console.log(`   📝 No updates needed for ${corrections.file}`);
  }

  return updatedCount > 0;
}

// Process each service
let totalUpdated = 0;
Object.keys(serviceCorrections).forEach((serviceName, index) => {
  console.log(`${index + 1}. Processing ${serviceName}...`);
  const wasUpdated = fixService(serviceName, serviceCorrections[serviceName]);
  if (wasUpdated) {
    totalUpdated++;
  }
});

console.log(`\n📊 Final Summary:`);
console.log(`✅ Services processed: ${Object.keys(serviceCorrections).length}`);
console.log(`📝 Services updated: ${totalUpdated}`);
console.log(`\n🎉 Specific service issues have been addressed!`);
console.log(`\n🔍 Run verification script to confirm all paths are working.`);

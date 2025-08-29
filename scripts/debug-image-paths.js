// Debug script to simulate ProcessFlow image path generation

// Simulate the getStepDirectoryName function logic
const getStepDirectoryName = (stepTitle, stepIndex, category, serviceSlug) => {
  console.log(`\\nDEBUG: getStepDirectoryName called with:`);
  console.log(`  stepTitle: "${stepTitle}"`);
  console.log(`  stepIndex: ${stepIndex}`);
  console.log(`  category: "${category}"`);
  console.log(`  serviceSlug: "${serviceSlug}"`);

  // For 3D Printing service
  if (serviceSlug === "3d-printing") {
    console.log(`  -> Matched 3D printing service`);
    const printingStepMap = {
      "Design Review": "TP-1-design-review",
      "File Preparation & Orientation": "TP-2-file-preparation",
      "Printer Selection & Parameter Optimization": "TP-3-printer-selection",
      "Material Selection": "TP-4-material-selection",
      "Printing Process": "TP-5-printing-process",
      "Post-Processing": "TP-6-post-processing",
      "Dimensional Verification & Quality Control": "TP-7-quality-control",
    };
    
    const directoryName = printingStepMap[stepTitle];
    console.log(`  -> Directory mapping result: "${directoryName}"`);
    if (directoryName) {
      return directoryName;
    }
  }

  // For Supplier Sourcing service
  if (serviceSlug === "supplier-sourcing") {
    console.log(`  -> Matched supplier sourcing service`);
    const supplierStepMap = {
      "Requirements Definition": "TP-1-requirements-definition",
      "Risk Assessment": "TP-2-risk-assessment",
      "Supplier Identification": "TP-3-supplier-identification",
      "Supplier Evaluation": "TP-4-supplier-evaluation",
      "Supplier Selection": "TP-5-supplier-selection",
      "Contract Negotiation": "TP-6-contract-negotiation",
      "Supplier Onboarding": "TP-7-supplier-onboarding",
      "Performance Monitoring": "TP-8-performance-monitoring",
    };
    
    const directoryName = supplierStepMap[stepTitle];
    console.log(`  -> Directory mapping result: "${directoryName}"`);
    if (directoryName) {
      return directoryName;
    }
  }

  console.log(`  -> No mapping found, using fallback`);
  return `fallback-${stepIndex + 1}-step`;
};

// Simulate the getProcessStepImage function
const getProcessStepImage = (step, stepIndex, category, serviceSlug) => {
  console.log(`\\n=== getProcessStepImage called ===`);
  console.log(`step.title: "${step.title}"`);
  console.log(`stepIndex: ${stepIndex}`);
  console.log(`category: "${category}"`);
  console.log(`serviceSlug: "${serviceSlug}"`);

  const servicePathMap = {
    "research-development": "Engineering services/research-development",
    "cad-modeling": "Engineering services/cad-modeling",
    "3d-printing": "Manufacturing solutions/3d printing",
    "machine-design": "Engineering services/machine-design",
    "biw-design": "Engineering services/biw-design",
    "finite-element-cfd": "Engineering services/finite-element-cfd",
    "gdt-tolerance": "Engineering services/gdt-tolerance",
    "technical-documentation": "Manufacturing solutions/technical-documentation",
    "supplier-sourcing": "Manufacturing solutions/supplier-sourcing"
  };
  
  const servicePath = servicePathMap[serviceSlug || ""] || `engineering/${serviceSlug}`;
  console.log(`servicePath: "${servicePath}"`);
  
  const stepDir = getStepDirectoryName(step.title, stepIndex, category, serviceSlug);
  console.log(`stepDir: "${stepDir}"`);
  
  const finalPath = `/images/services/${servicePath}/process/${stepDir}/step-hero.jpg`;
  console.log(`Final image path: "${finalPath}"`);
  
  return finalPath;
};

// Test with 3D printing steps
console.log('=== TESTING 3D PRINTING STEPS ===');
const printingSteps = [
  { title: "Design Review" },
  { title: "File Preparation & Orientation" },
  { title: "Printer Selection & Parameter Optimization" },
  { title: "Material Selection" },
  { title: "Printing Process" },
  { title: "Post-Processing" },
  { title: "Dimensional Verification & Quality Control" }
];

printingSteps.forEach((step, index) => {
  getProcessStepImage(step, index, "Manufacturing", "3d-printing");
});

// Test with supplier sourcing steps
console.log('\\n\\n=== TESTING SUPPLIER SOURCING STEPS ===');
const supplierSteps = [
  { title: "Requirements Definition" },
  { title: "Risk Assessment" },
  { title: "Supplier Identification" },
  { title: "Supplier Evaluation" },
  { title: "Supplier Selection" },
  { title: "Contract Negotiation" },
  { title: "Supplier Onboarding" },
  { title: "Performance Monitoring" }
];

supplierSteps.forEach((step, index) => {
  getProcessStepImage(step, index, "Manufacturing", "supplier-sourcing");
});
#!/usr/bin/env node

/**
 * Comprehensive Service Image Path Fixer
 * This script systematically fixes all service image paths to match the actual directory structure
 */

const fs = require('fs');
const path = require('path');

// Define the correct image path mappings based on actual directory structure
const SERVICE_IMAGE_MAPPINGS = {
  // CAD Modeling - uses ED- prefix
  'cad-modeling': {
    basePath: '/images/services/design/cad-modeling/process',
    steps: [
      { current: 'requirements-analysis', correct: 'ED-1-requirements' },
      { current: 'concept-development', correct: 'ED-2-concept-sketching' },
      { current: 'detailed-modeling', correct: 'ED-3-3d-modeling' },
      { current: 'assembly-modeling', correct: 'ED-4-assembly-modeling' },
      { current: 'technical-documentation', correct: 'ED-5-technical-drawings' },
      { current: 'design-validation', correct: 'ED-6-review-revision' },
      { current: 'post-validation', correct: 'ED-7-final-documentation' },
      { current: 'design-handover', correct: 'ED-7-final-documentation' }
    ]
  },

  // 3D Printing - uses TP- prefix (should be correct but verify)
  '3d-printing': {
    basePath: '/images/services/manufacturing/3d-printing/process',
    steps: [
      { current: 'TP-1-design-review', correct: 'TP-1-design-review' },
      { current: 'TP-2-file-preparation', correct: 'TP-2-file-preparation' },
      { current: 'TP-3-printer-selection', correct: 'TP-3-printer-selection' },
      { current: 'TP-4-material-selection', correct: 'TP-4-material-selection' },
      { current: 'TP-5-printing-process', correct: 'TP-5-printing-process' },
      { current: 'TP-6-post-processing', correct: 'TP-6-post-processing' },
      { current: 'TP-7-quality-control', correct: 'TP-7-quality-control' }
    ]
  },

  // Machine Design - uses MD- prefix
  'machine-design': {
    basePath: '/images/services/engineering/machine-design/process',
    steps: [
      { current: 'MD-1-requirements-analysis', correct: 'MD-1-requirements-analysis' },
      { current: 'MD-2-safety-assessment', correct: 'MD-2-safety-assessment' },
      { current: 'MD-3-conceptual-design', correct: 'MD-3-conceptual-design' },
      { current: 'MD-4-detailed-design', correct: 'MD-4-detailed-mechanical-design' },
      { current: 'MD-5-control-system', correct: 'MD-5-control-system' },
      { current: 'MD-6-analysis-optimization', correct: 'MD-6-analysis-optimization' },
      { current: 'MD-7-maintenance-planning', correct: 'MD-7-maintenance-planning' },
      { current: 'MD-8-operator-training', correct: 'MD-8-training' }
    ]
  },

  // BIW Design - uses BD- prefix (should be correct but verify)
  'biw-design': {
    basePath: '/images/services/engineering/biw-design/process',
    steps: [
      { current: 'BD-1-process-planning', correct: 'BD-1-process-planning' },
      { current: 'BD-2-cross-team-integration', correct: 'BD-2-cross-team-integration' },
      { current: 'BD-3-fixture-design', correct: 'BD-3-fixture-design' },
      { current: 'BD-4-welding-equipment', correct: 'BD-4-welding-equipment' },
      { current: 'BD-5-manufacturing-simulation', correct: 'BD-5-manufacturing-simulation' },
      { current: 'BD-6-assembly-system', correct: 'BD-6-assembly-system' },
      { current: 'BD-7-enhanced-validation', correct: 'BD-7-enhanced-validation' },
      { current: 'BD-8-documentation-training', correct: 'BD-8-documentation-training' }
    ]
  },

  // FEA & CFD - uses FA- prefix, should be in engineering not analysis-simulation
  'finite-element-cfd': {
    basePath: '/images/services/engineering/finite-element-cfd/process',
    steps: [
      { current: 'FA-1-problem-definition', correct: 'FA-1-problem-definition' },
      { current: 'FA-2-pre-analysis', correct: 'FA-2-pre-analysis' },
      { current: 'FA-3-model-preparation', correct: 'FA-3-model-preparation' },
      { current: 'FA-4-simulation-execution', correct: 'FA-4-simulation-execution' },
      { current: 'FA-5-multi-condition', correct: 'FA-5-multi-condition' },
      { current: 'FA-6-results-analysis', correct: 'FA-6-results-analysis' },
      { current: 'FA-7-report-generation', correct: 'FA-7-report-generation' }
    ]
  },

  // GD&T - uses GT- prefix, should be in engineering not analysis-simulation
  'gdt-tolerance': {
    basePath: '/images/services/engineering/gdt-tolerance/process',
    steps: [
      { current: 'GT-1-design-review', correct: 'GT-1-design-review' },
      { current: 'GT-2-manufacturing-method', correct: 'GT-2-manufacturing-method' },
      { current: 'GT-3-gdt-implementation', correct: 'GT-3-gdt-implementation' },
      { current: 'GT-4-tolerance-analysis', correct: 'GT-4-tolerance-stack-up' },
      { current: 'GT-5-measurement-system', correct: 'GT-5-measurement-system' },
      { current: 'GT-6-design-optimization', correct: 'GT-6-design-optimization' },
      { current: 'GT-7-process-control', correct: 'GT-7-process-control' }
    ]
  },

  // Technical Documentation - uses TD- prefix
  'technical-documentation': {
    basePath: '/images/services/design/technical-documentation/process',
    steps: [
      { current: 'TD-1-user-research', correct: 'TD-1-user-needs' },
      { current: 'TD-2-content-planning', correct: 'TD-2-content-planning' },
      { current: 'TD-3-technical-writing', correct: 'TD-3-technical-writing' },
      { current: 'TD-4-3d-modeling', correct: 'TD-4-3d-modeling' },
      { current: 'TD-5-rendering', correct: 'TD-5-rendering' },
      { current: 'TD-6-accessibility', correct: 'TD-6-accessibility' },
      { current: 'TD-7-user-testing', correct: 'TD-7-user-testing' }
    ]
  },

  // Supplier Sourcing - uses SS- prefix (should be correct but verify)
  'supplier-sourcing': {
    basePath: '/images/services/manufacturing/supplier-sourcing/process',
    steps: [
      { current: 'SS-1-requirements-definition', correct: 'SS-1-requirements-definition' },
      { current: 'SS-2-risk-assessment', correct: 'SS-2-risk-assessment' },
      { current: 'SS-3-supplier-identification', correct: 'SS-3-supplier-identification' },
      { current: 'SS-4-supplier-evaluation', correct: 'SS-4-supplier-evaluation' },
      { current: 'SS-5-supplier-selection', correct: 'SS-5-supplier-selection' },
      { current: 'SS-6-contract-negotiation', correct: 'SS-6-contract-negotiation' },
      { current: 'SS-7-supplier-onboarding', correct: 'SS-7-supplier-onboarding' },
      { current: 'SS-8-performance-monitoring', correct: 'SS-8-performance-monitoring' }
    ]
  },

  // R&D - uses RD- prefix (should be correct but verify)
  'research-development': {
    basePath: '/images/services/engineering/research-development/process',
    steps: [
      { current: 'RD-1-scope', correct: 'RD-1-scope' },
      { current: 'RD-2-concept', correct: 'RD-2-concept' },
      { current: 'RD-3-proof-of-concept', correct: 'RD-3-proof-of-concept' },
      { current: 'RD-4-engineering-analysis', correct: 'RD-4-engineering-analysis' },
      { current: 'RD-5-final-design-prototype', correct: 'RD-5-final-design-prototype' },
      { current: 'RD-6-user-validation', correct: 'RD-6-user-validation' },
      { current: 'RD-7-regulatory-compliance', correct: 'RD-7-regulatory-compliance' },
      { current: 'RD-8-manufacturing', correct: 'RD-8-manufacturing' },
      { current: 'RD-9-launch', correct: 'RD-9-launch' }
    ]
  }
};

function fixServiceImagePaths() {
  const servicesDataPath = path.join(__dirname, '..', 'lib', 'services-data.ts');
  
  if (!fs.existsSync(servicesDataPath)) {
    console.error('services-data.ts not found!');
    return;
  }

  let content = fs.readFileSync(servicesDataPath, 'utf8');
  let changesMade = 0;

  console.log('🔧 Starting comprehensive service image path fixes...\n');

  // Process each service
  Object.entries(SERVICE_IMAGE_MAPPINGS).forEach(([serviceKey, config]) => {
    console.log(`📁 Processing ${serviceKey}...`);
    
    config.steps.forEach((step, index) => {
      // Build the current and correct paths
      const currentPath = `${config.basePath}/${step.current}/step-hero.jpg`;
      const correctPath = `${config.basePath}/${step.correct}/step-hero.jpg`;
      
      if (currentPath !== correctPath) {
        // Create regex to match the current path
        const currentPathRegex = new RegExp(
          `src: "${currentPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
          'g'
        );
        
        const newContent = content.replace(currentPathRegex, `src: "${correctPath}"`);
        
        if (newContent !== content) {
          console.log(`  ✅ Fixed step ${index + 1}: ${step.current} → ${step.correct}`);
          content = newContent;
          changesMade++;
        }
      }
    });
  });

  // Also fix any remaining analysis-simulation paths that should be engineering
  const analysisSimulationRegex = /src: "\/images\/services\/analysis-simulation\/(fea-cfd|gdt-tolerance)\/process\//g;
  content = content.replace(analysisSimulationRegex, (match, service) => {
    const replacement = match.replace('/analysis-simulation/', '/engineering/');
    console.log(`  ✅ Fixed analysis-simulation path: ${match} → ${replacement}`);
    changesMade++;
    return replacement;
  });

  if (changesMade > 0) {
    fs.writeFileSync(servicesDataPath, content, 'utf8');
    console.log(`\n🎉 Successfully fixed ${changesMade} image paths!`);
    console.log('✅ All service image paths should now be correct.');
  } else {
    console.log('\n✅ No changes needed - all paths are already correct!');
  }
}

// Run the fix
fixServiceImagePaths();
const fs = require('fs');
const path = require('path');

console.log('🔍 Re-scanning directory structure and updating service paths...');

// Define the service mapping between slugs and their actual directory paths
const serviceMapping = {
  'research-development': {
    slug: 'research-development',
    file: 'lib/services/research-development.ts',
    actualPath: 'public/images/services/Engineering services/research-development/process',
    webPath: '/images/services/Engineering services/research-development/process'
  },
  'cad-modeling': {
    slug: 'cad-modeling',
    file: 'lib/services/cad-modeling.ts',
    actualPath: 'public/images/services/Engineering services/cad-modeling/process',
    webPath: '/images/services/Engineering services/cad-modeling/process'
  },
  '3d-printing': {
    slug: '3d-printing',
    file: 'lib/services/3d-printing.ts',
    actualPath: 'public/images/services/Manufacturing solutions/3d printing/process',
    webPath: '/images/services/Manufacturing solutions/3d printing/process'
  },
  'machine-design': {
    slug: 'machine-design',
    file: 'lib/services/machine-design.ts',
    actualPath: 'public/images/services/Engineering services/machine-design/process',
    webPath: '/images/services/Engineering services/machine-design/process'
  },
  'biw-design': {
    slug: 'biw-design',
    file: 'lib/services/biw-design.ts',
    actualPath: 'public/images/services/Engineering services/biw-design/process',
    webPath: '/images/services/Engineering services/biw-design/process'
  },
  'finite-element-cfd': {
    slug: 'finite-element-cfd',
    file: 'lib/services/finite-element-cfd.ts',
    actualPath: 'public/images/services/Engineering services/finite-element-cfd/process',
    webPath: '/images/services/Engineering services/finite-element-cfd/process'
  },
  'gdt-tolerance': {
    slug: 'gdt-tolerance',
    file: 'lib/services/gdt-tolerance.ts',
    actualPath: 'public/images/services/Engineering services/gdt-tolerance/process',
    webPath: '/images/services/Engineering services/gdt-tolerance/process'
  },
  'technical-documentation': {
    slug: 'technical-documentation',
    file: 'lib/services/technical-documentation.ts',
    actualPath: 'public/images/services/Manufacturing solutions/technical-documentation/process',
    webPath: '/images/services/Manufacturing solutions/technical-documentation/process'
  },
  'supplier-sourcing': {
    slug: 'supplier-sourcing',
    file: 'lib/services/supplier-sourcing.ts',
    actualPath: 'public/images/services/Manufacturing solutions/supplier-sourcing/process',
    webPath: '/images/services/Manufacturing solutions/supplier-sourcing/process'
  }
};

// Function to scan directory and get all process step folders
function scanProcessSteps(actualPath) {
  const fullPath = path.join(__dirname, '..', actualPath);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const items = fs.readdirSync(fullPath);
  const processSteps = [];
  
  items.forEach(item => {
    const itemPath = path.join(fullPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      // Check if step-hero.jpg exists in this directory
      const heroImagePath = path.join(itemPath, 'step-hero.jpg');
      if (fs.existsSync(heroImagePath)) {
        processSteps.push(item);
      }
    }
  });
  
  return processSteps.sort();
}

// Function to completely replace all image paths in a service file
function updateServiceFileCompletely(serviceInfo, processSteps) {
  const filePath = path.join(__dirname, '..', serviceInfo.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Service file not found: ${serviceInfo.file}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let updatedCount = 0;
  
  console.log(`\n📁 Processing ${serviceInfo.slug}:`);
  console.log(`   Found ${processSteps.length} actual process folders`);
  
  // Replace all image src paths with the correct ones
  processSteps.forEach((stepFolder, index) => {
    const correctPath = `${serviceInfo.webPath}/${stepFolder}/step-hero.jpg`;
    
    // Find any existing path that might correspond to this step
    // Look for patterns like step number or similar naming
    const stepNumber = stepFolder.match(/\d+/)?.[0];
    
    if (stepNumber) {
      // Create a regex to find any path with this step number
      const stepRegex = new RegExp(`src:\\s*["']([^"']*[-_]${stepNumber}[-_][^"']*step-hero\\.jpg)["']`, 'g');
      const match = stepRegex.exec(content);
      
      if (match) {
        const oldPath = match[1];
        content = content.replace(oldPath, correctPath);
        updatedCount++;
        console.log(`   ✅ ${index + 1}. Updated step ${stepNumber}: ${stepFolder}`);
      } else {
        // If no match found, try to find any path with step-hero.jpg and replace the nth occurrence
        const allStepHeroPaths = content.match(/src:\s*["']([^"']*step-hero\.jpg)["']/g);
        if (allStepHeroPaths && allStepHeroPaths[index]) {
          const oldPathMatch = allStepHeroPaths[index].match(/src:\s*["']([^"']*step-hero\.jpg)["']/);
          if (oldPathMatch) {
            const oldPath = oldPathMatch[1];
            content = content.replace(oldPath, correctPath);
            updatedCount++;
            console.log(`   ✅ ${index + 1}. Updated by position: ${stepFolder}`);
          }
        } else {
          console.log(`   ⚠️  ${index + 1}. No matching path found for: ${stepFolder}`);
        }
      }
    }
  });
  
  // Write the updated content back to the file
  if (updatedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`   📝 Updated ${updatedCount} paths in ${serviceInfo.file}`);
  } else {
    console.log(`   📝 No updates needed for ${serviceInfo.file}`);
  }
  
  return updatedCount > 0;
}

// Main execution
console.log(`🔄 Processing ${Object.keys(serviceMapping).length} services...\n`);

let totalUpdated = 0;
let servicesProcessed = 0;

Object.values(serviceMapping).forEach((serviceInfo, index) => {
  console.log(`${index + 1}. Scanning ${serviceInfo.slug}...`);
  
  // Scan the actual directory structure
  const processSteps = scanProcessSteps(serviceInfo.actualPath);
  
  if (processSteps.length === 0) {
    console.log(`   ⚠️  No process steps found in ${serviceInfo.actualPath}`);
    return;
  }
  
  console.log(`   Found process steps: ${processSteps.map(s => s.split('-')[1] || s.substring(0, 20)).join(', ')}`);
  
  // Update the service file
  const wasUpdated = updateServiceFileCompletely(serviceInfo, processSteps);
  
  if (wasUpdated) {
    totalUpdated++;
  }
  servicesProcessed++;
});

console.log(`\n📊 Final Summary:`);
console.log(`✅ Services processed: ${servicesProcessed}`);
console.log(`📝 Services updated: ${totalUpdated}`);
console.log(`\n🎉 All service files have been systematically updated to match the current directory structure!`);
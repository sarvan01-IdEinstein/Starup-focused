const fs = require('fs');
const path = require('path');

console.log('📂 Splitting services-data.ts into individual service files...');

// Read the current services-data.ts file
const servicesDataPath = path.join(__dirname, '..', 'lib', 'services-data.ts');
const content = fs.readFileSync(servicesDataPath, 'utf8');

// Create services directory
const servicesDir = path.join(__dirname, '..', 'lib', 'services');
if (!fs.existsSync(servicesDir)) {
  fs.mkdirSync(servicesDir, { recursive: true });
  console.log('📁 Created lib/services directory');
}

// Extract the Service type import
const typeImport = 'import type { Service } from "@/lib/types";';

// Define service slugs and their corresponding file names
const services = [
  { slug: 'research-development', fileName: 'research-development.ts' },
  { slug: 'cad-modeling', fileName: 'cad-modeling.ts' },
  { slug: '3d-printing', fileName: '3d-printing.ts' },
  { slug: 'machine-design', fileName: 'machine-design.ts' },
  { slug: 'biw-design', fileName: 'biw-design.ts' },
  { slug: 'finite-element-cfd', fileName: 'finite-element-cfd.ts' },
  { slug: 'gdt-tolerance', fileName: 'gdt-tolerance.ts' },
  { slug: 'technical-documentation', fileName: 'technical-documentation.ts' },
  { slug: 'supplier-sourcing', fileName: 'supplier-sourcing.ts' }
];

// Function to extract service data from the content
function extractServiceData(content, serviceSlug) {
  const startPattern = `"${serviceSlug}": {`;
  const startIndex = content.indexOf(startPattern);
  
  if (startIndex === -1) {
    console.log(`⚠️  Service "${serviceSlug}" not found in content`);
    return null;
  }
  
  // Find the matching closing brace
  let braceCount = 0;
  let currentIndex = startIndex + startPattern.length - 1; // Start from the opening brace
  let foundStart = false;
  
  while (currentIndex < content.length) {
    const char = content[currentIndex];
    
    if (char === '{') {
      braceCount++;
      foundStart = true;
    } else if (char === '}') {
      braceCount--;
      if (foundStart && braceCount === 0) {
        // Found the matching closing brace
        const serviceData = content.substring(startIndex + startPattern.length - 1, currentIndex + 1);
        return serviceData;
      }
    }
    currentIndex++;
  }
  
  return null;
}

console.log(`🔄 Processing ${services.length} services...`);

let successCount = 0;
const serviceExports = [];

services.forEach((service, index) => {
  console.log(`\n${index + 1}. Processing ${service.slug}...`);
  
  const serviceData = extractServiceData(content, service.slug);
  
  if (serviceData) {
    // Create the individual service file content
    const fileContent = `${typeImport}

export const ${service.slug.replace(/-/g, '_')}: Service = ${serviceData};
`;
    
    // Write the individual service file
    const filePath = path.join(servicesDir, service.fileName);
    fs.writeFileSync(filePath, fileContent, 'utf8');
    
    console.log(`   ✅ Created: lib/services/${service.fileName}`);
    successCount++;
    
    // Add to exports array
    serviceExports.push({
      slug: service.slug,
      exportName: service.slug.replace(/-/g, '_'),
      fileName: service.fileName.replace('.ts', '')
    });
  } else {
    console.log(`   ❌ Failed to extract data for ${service.slug}`);
  }
});

// Create the new index file that imports all services
const indexContent = `import type { Service } from "@/lib/types";

// Import all individual services
${serviceExports.map(s => `import { ${s.exportName} } from "./${s.fileName}";`).join('\n')}

// Export all services as a record
export const servicesData: Record<string, Service> = {
${serviceExports.map(s => `  "${s.slug}": ${s.exportName},`).join('\n')}
};

// Export individual services for direct access
export {
${serviceExports.map(s => `  ${s.exportName},`).join('\n')}
};
`;

// Write the new index file
const newIndexPath = path.join(servicesDir, 'index.ts');
fs.writeFileSync(newIndexPath, indexContent, 'utf8');

console.log(`\n📊 Summary:`);
console.log(`✅ Successfully created: ${successCount} service files`);
console.log(`📄 Created index file: lib/services/index.ts`);
console.log(`\n🎉 Services data has been split successfully!`);
console.log(`\n📝 Next steps:`);
console.log(`   1. Update imports in your components to use: import { servicesData } from "@/lib/services"`);
console.log(`   2. Test the application to ensure everything works`);
console.log(`   3. Consider backing up the original services-data.ts file`);
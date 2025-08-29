const fs = require('fs');
const path = require('path');

console.log('=== COMPREHENSIVE SERVICE DIRECTORY SCAN ===\n');

// Scan all service directories
const serviceBasePaths = [
  'Engineering services',
  'Manufacturing solutions'
];

const allServices = {};

serviceBasePaths.forEach(basePath => {
  const fullBasePath = path.join('public', 'images', 'services', basePath);
  
  if (fs.existsSync(fullBasePath)) {
    console.log(`📁 ${basePath}/`);
    
    const services = fs.readdirSync(fullBasePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    services.forEach(serviceName => {
      const servicePath = path.join(fullBasePath, serviceName);
      console.log(`  📁 ${serviceName}/`);
      
      // Check main directory
      const mainPath = path.join(servicePath, 'main');
      const mainExists = fs.existsSync(mainPath);
      console.log(`    📁 main/ ${mainExists ? '✅' : '❌'}`);
      
      if (mainExists) {
        const mainFiles = fs.readdirSync(mainPath);
        mainFiles.forEach(file => {
          console.log(`      📄 ${file}`);
        });
      }
      
      // Check process directory
      const processPath = path.join(servicePath, 'process');
      const processExists = fs.existsSync(processPath);
      console.log(`    📁 process/ ${processExists ? '✅' : '❌'}`);
      
      if (processExists) {
        const processSteps = fs.readdirSync(processPath, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);
        
        processSteps.forEach(stepDir => {
          const stepPath = path.join(processPath, stepDir);
          const stepFiles = fs.readdirSync(stepPath);
          console.log(`      📁 ${stepDir}/`);
          stepFiles.forEach(file => {
            console.log(`        📄 ${file}`);
          });
        });
      }
      
      // Store service info
      allServices[serviceName] = {
        basePath: basePath,
        mainExists: mainExists,
        processExists: processExists,
        processSteps: processExists ? fs.readdirSync(processPath, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name) : []
      };
    });
  }
});

console.log('\n=== SERVICE MAPPING SUMMARY ===');
Object.keys(allServices).forEach(serviceName => {
  const service = allServices[serviceName];
  console.log(`\\n${serviceName}:`);
  console.log(`  Base Path: ${service.basePath}`);
  console.log(`  Main Hero: ${service.mainExists ? '✅' : '❌'}`);
  console.log(`  Process Steps: ${service.processSteps.length}`);
  service.processSteps.forEach((step, index) => {
    console.log(`    ${index + 1}. ${step}`);
  });
});
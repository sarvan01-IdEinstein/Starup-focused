#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing service directory names for web compatibility');
console.log('=====================================================');

// Define the problematic paths and their shorter alternatives
const pathMappings = [
  // R&D paths
  {
    old: 'public/images/services/engineering/research-development/process/RD-1-Scope and Constraints',
    new: 'public/images/services/engineering/research-development/process/RD-1-scope'
  },
  {
    old: 'public/images/services/engineering/research-development/process/RD-2-Research & Initial Concept Design',
    new: 'public/images/services/engineering/research-development/process/RD-2-concept'
  },
  {
    old: 'public/images/services/engineering/research-development/process/RD-8-Manufacturing Plan',
    new: 'public/images/services/engineering/research-development/process/RD-8-manufacturing'
  },
  {
    old: 'public/images/services/engineering/research-development/process/RD-9-Marketing Renders & Launch Support',
    new: 'public/images/services/engineering/research-development/process/RD-9-launch'
  }
];

// Function to rename directories and files
function renamePathsRecursively() {
  pathMappings.forEach(mapping => {
    try {
      if (fs.existsSync(mapping.old)) {
        console.log(`📁 Renaming: ${mapping.old}`);
        console.log(`   → ${mapping.new}`);
        
        // Create parent directory if it doesn't exist
        const parentDir = path.dirname(mapping.new);
        if (!fs.existsSync(parentDir)) {
          fs.mkdirSync(parentDir, { recursive: true });
        }
        
        // Rename the directory/file
        fs.renameSync(mapping.old, mapping.new);
        console.log('✅ Renamed successfully');
      } else {
        console.log(`⚠️  Path not found: ${mapping.old}`);
      }
    } catch (error) {
      console.error(`❌ Error renaming ${mapping.old}:`, error.message);
    }
  });
}

// Run the fixes
renamePathsRecursively();

console.log('\n🎉 Service path fixes completed!');
console.log('Updated directory names to be web-friendly and shorter.');
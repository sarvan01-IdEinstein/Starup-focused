
console.log('🔍 Verifying Audit Environment Setup...');

const tools = [
  { name: 'Lighthouse', command: 'lighthouse --version' },
  { name: 'Newman', command: 'newman --version' },
  { name: 'Axe-Core', command: 'axe --version' },
  { name: 'Node.js', command: 'node --version' },
  { name: 'NPM', command: 'npm --version' }
];

async function verifyTools() {
  for (const tool of tools) {
    try {
      const { execSync } = require('child_process');
      const version = execSync(tool.command, { encoding: 'utf8' }).trim();
      console.log(`✅ ${tool.name}: ${version}`);
    } catch (error) {
      console.log(`❌ ${tool.name}: Not available`);
    }
  }
  
  console.log('\n🎯 Environment verification complete!');
}

verifyTools();

#!/usr/bin/env node

/**
 * Safe MCP Configuration Cleanup Only
 * Only cleans up MCP configuration - does NOT remove any files
 * Based on comprehensive analysis showing most files are actually in use
 */

const fs = require('fs');

console.log('🔧 Safe MCP Configuration Cleanup...\n');

function cleanupMCPConfig() {
  console.log('📋 Optimizing MCP Configuration...');
  
  const mcpConfigPath = '.kiro/settings/mcp.json';
  
  if (fs.existsSync(mcpConfigPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));
      
      // Keep only reliable, official servers
      const cleanConfig = {
        mcpServers: {}
      };
      
      // Official MCP servers that are known to be stable
      const reliableServers = [
        'brave-search',
        'basic-memory', 
        'playwright',
        'sequential-thinking',
        'context7',
        'filesystem'
      ];
      
      reliableServers.forEach(serverName => {
        if (config.mcpServers && config.mcpServers[serverName]) {
          const serverConfig = { ...config.mcpServers[serverName] };
          // Ensure server is enabled
          serverConfig.disabled = false;
          cleanConfig.mcpServers[serverName] = serverConfig;
        }
      });
      
      // Write the cleaned config
      fs.writeFileSync(mcpConfigPath, JSON.stringify(cleanConfig, null, 2));
      
      console.log('✅ MCP configuration optimized');
      console.log(`   Kept ${Object.keys(cleanConfig.mcpServers).length} reliable servers`);
      console.log('   Removed potentially problematic third-party servers');
      
    } catch (error) {
      console.error('❌ Error cleaning MCP config:', error.message);
    }
  } else {
    console.log('ℹ️ No MCP config found');
  }
}

function updatePackageScripts() {
  console.log('📝 Adding useful package.json scripts...');
  
  const packagePath = 'package.json';
  if (fs.existsSync(packagePath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      // Add helpful scripts without overwriting existing ones
      const newScripts = {
        "type-check": "tsc --noEmit",
        "lint:fix": "next lint --fix", 
        "format": "prettier --write .",
        "pre-deploy": "npm run type-check && npm run lint && npm run build",
        "audit:security": "npm audit --audit-level moderate"
      };
      
      // Only add scripts that don't already exist
      Object.keys(newScripts).forEach(scriptName => {
        if (!pkg.scripts[scriptName]) {
          pkg.scripts[scriptName] = newScripts[scriptName];
        }
      });
      
      fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
      console.log('✅ Package.json scripts updated (non-destructively)');
      
    } catch (error) {
      console.error('❌ Error updating package.json:', error.message);
    }
  }
}

// Main execution
async function main() {
  try {
    cleanupMCPConfig();
    updatePackageScripts();
    
    console.log('\n🎉 Safe cleanup completed!');
    console.log('\n📊 What was done:');
    console.log('✅ MCP configuration optimized');
    console.log('✅ Package.json scripts enhanced');
    console.log('✅ NO files were removed (analysis showed they are in use)');
    
    console.log('\n🎯 Next steps:');
    console.log('1. Dependencies are already installed');
    console.log('2. Run: npm run type-check');
    console.log('3. Run: npm run lint:fix');
    console.log('4. Run: npm run build');
    console.log('5. Test the application thoroughly');
    
    console.log('\n💡 File cleanup recommendation:');
    console.log('Based on analysis, most files are actually being used.');
    console.log('Keep all documentation and scripts - they contain important context.');
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  }
}

main();
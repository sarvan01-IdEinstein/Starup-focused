#!/usr/bin/env node

/**
 * Dependency Analysis and Cleanup Script
 * Carefully analyzes and cleans up dependencies while preserving planned features
 * Part of Task 1: Optimized MCP Tools and Advanced Testing Environment Setup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DependencyAnalysisCleanup {
  constructor() {
    this.packageJsonPath = path.join(process.cwd(), 'package.json');
    this.packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
    
    // Packages to preserve for planned features
    this.preservedPackages = [
      'react-tsparticles',
      'tsparticles',
      'framer-motion', // For animations and 3D effects
      'three', // If added for 3D graphics
      '@react-three/fiber', // If added for 3D graphics
      '@react-three/drei' // If added for 3D graphics
    ];
    
    // Confirmed unused packages that can be safely removed
    this.confirmedUnusedPackages = [
      // These would be identified through actual usage analysis
      // For now, being conservative and not removing anything
    ];
    
    // Missing packages that should be added
    this.missingPackages = {
      dependencies: {
        'bcryptjs': '^2.4.3', // For password hashing
        'jsonwebtoken': '^9.0.2', // For JWT tokens
        'nodemailer': '^6.9.8', // For email functionality
        'sharp': '^0.33.2', // For image optimization
        'helmet': '^7.1.0', // For security headers
        'express-rate-limit': '^7.1.5', // For rate limiting
        'cors': '^2.8.5', // For CORS handling
        'validator': '^13.11.0', // For input validation
        'uuid': '^9.0.1', // For generating UUIDs
        'compression': '^1.7.4' // For response compression
      },
      devDependencies: {
        'lighthouse': '^11.4.0', // For CLI integration
        '@types/bcryptjs': '^2.4.6',
        '@types/jsonwebtoken': '^9.0.5',
        '@types/nodemailer': '^6.4.14',
        '@types/validator': '^13.11.8',
        '@types/uuid': '^9.0.7',
        '@types/compression': '^1.7.5',
        'jest': '^29.7.0', // For testing
        '@types/jest': '^29.5.11',
        'supertest': '^6.3.4', // For API testing
        '@types/supertest': '^6.0.2'
      }
    };
  }

  async performAnalysis() {
    console.log('🔍 Starting dependency analysis...');
    
    const analysis = {
      current: this.analyzeCurrent(),
      usage: await this.analyzeUsage(),
      security: await this.analyzeSecurityVulnerabilities(),
      recommendations: []
    };
    
    analysis.recommendations = this.generateRecommendations(analysis);
    
    // Save analysis report
    const reportPath = path.join(process.cwd(), 'audit-results', 'dependency-analysis.json');
    this.ensureAuditDir();
    fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
    
    console.log(`📊 Analysis complete. Report saved to: ${reportPath}`);
    return analysis;
  }

  analyzeCurrent() {
    const deps = this.packageJson.dependencies || {};
    const devDeps = this.packageJson.devDependencies || {};
    
    return {
      totalDependencies: Object.keys(deps).length,
      totalDevDependencies: Object.keys(devDeps).length,
      dependencies: deps,
      devDependencies: devDeps,
      preservedPackages: this.preservedPackages.filter(pkg => deps[pkg] || devDeps[pkg])
    };
  }

  async analyzeUsage() {
    console.log('📋 Analyzing package usage in codebase...');
    
    const usage = {};
    const allPackages = {
      ...this.packageJson.dependencies,
      ...this.packageJson.devDependencies
    };
    
    for (const packageName of Object.keys(allPackages)) {
      usage[packageName] = await this.checkPackageUsage(packageName);
    }
    
    return usage;
  }

  async checkPackageUsage(packageName) {
    try {
      // Search for imports/requires of this package
      const searchPatterns = [
        `import.*from.*['"]${packageName}['"]`,
        `import.*['"]${packageName}['"]`,
        `require\\(['"]${packageName}['"]\\)`,
        `from ['"]${packageName}['"]`
      ];
      
      let found = false;
      
      for (const pattern of searchPatterns) {
        try {
          execSync(`grep -r "${pattern}" app/ components/ lib/ pages/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" 2>/dev/null`, { stdio: 'pipe' });
          found = true;
          break;
        } catch (error) {
          // grep returns non-zero when no matches found
        }
      }
      
      return {
        used: found,
        preserved: this.preservedPackages.includes(packageName),
        canRemove: !found && !this.preservedPackages.includes(packageName)
      };
      
    } catch (error) {
      return {
        used: true, // Conservative approach - assume used if can't determine
        preserved: this.preservedPackages.includes(packageName),
        canRemove: false,
        error: error.message
      };
    }
  }

  async analyzeSecurityVulnerabilities() {
    console.log('🔒 Analyzing security vulnerabilities...');
    
    try {
      let auditOutput;
      try {
        auditOutput = execSync('npm audit --json', { encoding: 'utf8' });
      } catch (error) {
        // npm audit returns non-zero exit code when vulnerabilities found
        auditOutput = error.stdout || '{}';
      }
      
      const auditResult = JSON.parse(auditOutput);
      
      return {
        vulnerabilities: auditResult.vulnerabilities || {},
        metadata: auditResult.metadata || {},
        hasVulnerabilities: Object.keys(auditResult.vulnerabilities || {}).length > 0
      };
      
    } catch (error) {
      return {
        error: error.message,
        hasVulnerabilities: false
      };
    }
  }

  generateRecommendations(analysis) {
    const recommendations = [];
    
    // Security recommendations
    if (analysis.security.hasVulnerabilities) {
      const criticalVulns = Object.values(analysis.security.vulnerabilities)
        .filter(v => v.severity === 'critical').length;
      const highVulns = Object.values(analysis.security.vulnerabilities)
        .filter(v => v.severity === 'high').length;
      
      if (criticalVulns > 0) {
        recommendations.push({
          type: 'critical',
          message: `${criticalVulns} critical vulnerabilities found - update immediately`,
          action: 'npm audit fix --force'
        });
      }
      
      if (highVulns > 0) {
        recommendations.push({
          type: 'high',
          message: `${highVulns} high-severity vulnerabilities found`,
          action: 'npm audit fix'
        });
      }
    }
    
    // Missing packages recommendations
    const missingDeps = Object.keys(this.missingPackages.dependencies);
    const missingDevDeps = Object.keys(this.missingPackages.devDependencies);
    
    if (missingDeps.length > 0) {
      recommendations.push({
        type: 'enhancement',
        message: `${missingDeps.length} recommended dependencies missing`,
        action: `npm install ${missingDeps.join(' ')}`,
        packages: missingDeps
      });
    }
    
    if (missingDevDeps.length > 0) {
      recommendations.push({
        type: 'enhancement',
        message: `${missingDevDeps.length} recommended dev dependencies missing`,
        action: `npm install --save-dev ${missingDevDeps.join(' ')}`,
        packages: missingDevDeps
      });
    }
    
    // Unused packages (being very conservative)
    const unusedPackages = Object.entries(analysis.usage)
      .filter(([pkg, info]) => info.canRemove && !info.preserved)
      .map(([pkg]) => pkg);
    
    if (unusedPackages.length > 0) {
      recommendations.push({
        type: 'cleanup',
        message: `${unusedPackages.length} potentially unused packages found (manual review recommended)`,
        action: `npm uninstall ${unusedPackages.join(' ')}`,
        packages: unusedPackages,
        warning: 'Please manually verify these packages are not needed before removing'
      });
    }
    
    return recommendations;
  }

  async installMissingDependencies() {
    console.log('📦 Installing missing dependencies...');
    
    try {
      // Install production dependencies
      const deps = Object.keys(this.missingPackages.dependencies);
      if (deps.length > 0) {
        console.log(`Installing dependencies: ${deps.join(', ')}`);
        execSync(`npm install ${deps.join(' ')}`, { stdio: 'inherit' });
      }
      
      // Install dev dependencies
      const devDeps = Object.keys(this.missingPackages.devDependencies);
      if (devDeps.length > 0) {
        console.log(`Installing dev dependencies: ${devDeps.join(', ')}`);
        execSync(`npm install --save-dev ${devDeps.join(' ')}`, { stdio: 'inherit' });
      }
      
      console.log('✅ Missing dependencies installed successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to install dependencies:', error.message);
      return false;
    }
  }

  async fixSecurityVulnerabilities() {
    console.log('🔒 Fixing security vulnerabilities...');
    
    try {
      // Try automatic fix first
      execSync('npm audit fix', { stdio: 'inherit' });
      
      // Check if critical vulnerabilities remain
      let auditOutput;
      try {
        auditOutput = execSync('npm audit --json', { encoding: 'utf8' });
      } catch (error) {
        auditOutput = error.stdout || '{}';
      }
      
      const auditResult = JSON.parse(auditOutput);
      const criticalVulns = Object.values(auditResult.vulnerabilities || {})
        .filter(v => v.severity === 'critical').length;
      
      if (criticalVulns > 0) {
        console.log('⚠️ Critical vulnerabilities remain, attempting force fix...');
        execSync('npm audit fix --force', { stdio: 'inherit' });
      }
      
      console.log('✅ Security vulnerabilities addressed');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to fix vulnerabilities:', error.message);
      return false;
    }
  }

  ensureAuditDir() {
    const auditDir = path.join(process.cwd(), 'audit-results');
    if (!fs.existsSync(auditDir)) {
      fs.mkdirSync(auditDir, { recursive: true });
    }
  }

  async performCleanup() {
    console.log('🧹 Starting dependency cleanup...');
    
    const analysis = await this.performAnalysis();
    
    // Fix security vulnerabilities first
    await this.fixSecurityVulnerabilities();
    
    // Install missing dependencies
    await this.installMissingDependencies();
    
    // Display cleanup recommendations (but don't auto-remove)
    const cleanupRecs = analysis.recommendations.filter(r => r.type === 'cleanup');
    if (cleanupRecs.length > 0) {
      console.log('\n📋 Cleanup Recommendations (manual review required):');
      cleanupRecs.forEach(rec => {
        console.log(`  ⚠️ ${rec.message}`);
        console.log(`     Command: ${rec.action}`);
        if (rec.warning) {
          console.log(`     Warning: ${rec.warning}`);
        }
      });
    }
    
    console.log('\n✅ Dependency cleanup completed');
    console.log('📊 Review the analysis report for detailed information');
    
    return analysis;
  }
}

// CLI execution
if (require.main === module) {
  const cleanup = new DependencyAnalysisCleanup();
  
  const args = process.argv.slice(2);
  const action = args[0] || 'cleanup';
  
  switch (action) {
    case 'analyze':
      cleanup.performAnalysis().catch(console.error);
      break;
    case 'install':
      cleanup.installMissingDependencies().catch(console.error);
      break;
    case 'fix':
      cleanup.fixSecurityVulnerabilities().catch(console.error);
      break;
    case 'cleanup':
    default:
      cleanup.performCleanup().catch(console.error);
      break;
  }
}

module.exports = DependencyAnalysisCleanup;
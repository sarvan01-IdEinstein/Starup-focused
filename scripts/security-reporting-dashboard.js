#!/usr/bin/env node

/**
 * Centralized Security Reporting Dashboard
 * Aggregates results from Lighthouse, OWASP ZAP, and other security tools
 * Part of Task 1: Optimized MCP Tools and Advanced Testing Environment Setup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SecurityReportingDashboard {
  constructor() {
    this.auditResultsDir = path.join(process.cwd(), 'audit-results');
    this.dashboardDir = path.join(this.auditResultsDir, 'dashboard');
    this.ensureDirectories();
  }

  ensureDirectories() {
    [this.auditResultsDir, this.dashboardDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async generateComprehensiveReport() {
    console.log('📊 Generating comprehensive security report...');
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    try {
      // Collect all security data
      const securityData = {
        timestamp,
        lighthouse: await this.collectLighthouseData(),
        zap: await this.collectZAPData(),
        dependencies: await this.analyzeDependencies(),
        nextjsSecurity: await this.analyzeNextJSSecurity(),
        summary: {}
      };
      
      // Generate summary
      securityData.summary = this.generateSecuritySummary(securityData);
      
      // Save comprehensive report
      const reportFile = path.join(this.dashboardDir, `security-report-${timestamp}.json`);
      fs.writeFileSync(reportFile, JSON.stringify(securityData, null, 2));
      
      // Generate HTML dashboard
      const htmlFile = await this.generateHTMLDashboard(securityData, timestamp);
      
      console.log('✅ Comprehensive security report generated:');
      console.log(`  📄 JSON Report: ${reportFile}`);
      console.log(`  🌐 HTML Dashboard: ${htmlFile}`);
      
      return {
        success: true,
        jsonReport: reportFile,
        htmlDashboard: htmlFile,
        data: securityData
      };
      
    } catch (error) {
      console.error('❌ Failed to generate security report:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async collectLighthouseData() {
    const lighthouseDir = path.join(this.auditResultsDir, 'lighthouse');
    
    if (!fs.existsSync(lighthouseDir)) {
      return { available: false, message: 'No Lighthouse data found' };
    }
    
    try {
      const files = fs.readdirSync(lighthouseDir)
        .filter(file => file.endsWith('.json') && file.includes('security-audit'))
        .sort()
        .reverse(); // Most recent first
      
      if (files.length === 0) {
        return { available: false, message: 'No Lighthouse audit files found' };
      }
      
      // Get the most recent report
      const latestFile = path.join(lighthouseDir, files[0]);
      const data = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
      
      return {
        available: true,
        latestReport: files[0],
        totalReports: files.length,
        metrics: this.extractLighthouseMetrics(data),
        recommendations: this.generateLighthouseRecommendations(data)
      };
      
    } catch (error) {
      return {
        available: false,
        error: error.message
      };
    }
  }

  async collectZAPData() {
    const zapDir = path.join(this.auditResultsDir, 'zap');
    
    if (!fs.existsSync(zapDir)) {
      return { available: false, message: 'No ZAP data found' };
    }
    
    try {
      const summaryFiles = fs.readdirSync(zapDir)
        .filter(file => file.startsWith('zap-summary-') && file.endsWith('.json'))
        .sort()
        .reverse();
      
      if (summaryFiles.length === 0) {
        return { available: false, message: 'No ZAP summary files found' };
      }
      
      const latestSummary = path.join(zapDir, summaryFiles[0]);
      const data = JSON.parse(fs.readFileSync(latestSummary, 'utf8'));
      
      return {
        available: true,
        latestReport: summaryFiles[0],
        totalReports: summaryFiles.length,
        vulnerabilities: data,
        recommendations: this.generateZAPRecommendations(data)
      };
      
    } catch (error) {
      return {
        available: false,
        error: error.message
      };
    }
  }

  async analyzeDependencies() {
    try {
      console.log('🔍 Analyzing dependencies for security vulnerabilities...');
      
      // Run npm audit
      let auditResult;
      try {
        const auditOutput = execSync('npm audit --json', { encoding: 'utf8' });
        auditResult = JSON.parse(auditOutput);
      } catch (auditError) {
        // npm audit returns non-zero exit code when vulnerabilities are found
        if (auditError.stdout) {
          auditResult = JSON.parse(auditError.stdout);
        } else {
          throw auditError;
        }
      }
      
      return {
        available: true,
        vulnerabilities: auditResult.vulnerabilities || {},
        metadata: auditResult.metadata || {},
        recommendations: this.generateDependencyRecommendations(auditResult)
      };
      
    } catch (error) {
      return {
        available: false,
        error: error.message
      };
    }
  }

  async analyzeNextJSSecurity() {
    try {
      const nextConfig = this.analyzeNextConfig();
      const middlewareConfig = this.analyzeMiddleware();
      const apiRoutes = this.analyzeAPIRoutes();
      
      return {
        available: true,
        nextConfig,
        middleware: middlewareConfig,
        apiRoutes,
        recommendations: this.generateNextJSRecommendations({
          nextConfig,
          middleware: middlewareConfig,
          apiRoutes
        })
      };
      
    } catch (error) {
      return {
        available: false,
        error: error.message
      };
    }
  }

  analyzeNextConfig() {
    const configPath = path.join(process.cwd(), 'next.config.js');
    
    if (!fs.existsSync(configPath)) {
      return { exists: false };
    }
    
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    return {
      exists: true,
      hasSecurityHeaders: configContent.includes('headers()'),
      hasCSP: configContent.includes('Content-Security-Policy'),
      hasImageOptimization: configContent.includes('images:'),
      hasRemotePatterns: configContent.includes('remotePatterns'),
      content: configContent
    };
  }

  analyzeMiddleware() {
    const middlewarePath = path.join(process.cwd(), 'middleware.ts');
    const middlewareJSPath = path.join(process.cwd(), 'middleware.js');
    
    const middlewareFile = fs.existsSync(middlewarePath) ? middlewarePath : 
                          fs.existsSync(middlewareJSPath) ? middlewareJSPath : null;
    
    if (!middlewareFile) {
      return { exists: false };
    }
    
    const middlewareContent = fs.readFileSync(middlewareFile, 'utf8');
    
    return {
      exists: true,
      hasCSP: middlewareContent.includes('Content-Security-Policy'),
      hasNonce: middlewareContent.includes('nonce'),
      hasRateLimiting: middlewareContent.includes('rate') || middlewareContent.includes('limit'),
      hasAuth: middlewareContent.includes('auth') || middlewareContent.includes('session'),
      content: middlewareContent
    };
  }

  analyzeAPIRoutes() {
    const apiDir = path.join(process.cwd(), 'app', 'api');
    
    if (!fs.existsSync(apiDir)) {
      return { exists: false };
    }
    
    const routes = this.findAPIRoutes(apiDir);
    
    return {
      exists: true,
      totalRoutes: routes.length,
      routes: routes.map(route => ({
        path: route,
        hasAuth: this.checkFileForAuth(route),
        hasValidation: this.checkFileForValidation(route),
        hasRateLimit: this.checkFileForRateLimit(route)
      }))
    };
  }

  findAPIRoutes(dir, routes = []) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.findAPIRoutes(fullPath, routes);
      } else if (item === 'route.ts' || item === 'route.js') {
        routes.push(fullPath);
      }
    });
    
    return routes;
  }

  checkFileForAuth(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('auth') || content.includes('session') || content.includes('token');
  }

  checkFileForValidation(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('zod') || content.includes('validate') || content.includes('schema');
  }

  checkFileForRateLimit(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('rate') || content.includes('limit') || content.includes('throttle');
  }

  generateSecuritySummary(data) {
    const summary = {
      overallScore: 0,
      criticalIssues: 0,
      recommendations: [],
      strengths: [],
      timestamp: data.timestamp
    };
    
    // Lighthouse scoring
    if (data.lighthouse.available && data.lighthouse.metrics) {
      const lighthouseScore = (
        (data.lighthouse.metrics.performanceScore || 0) +
        (data.lighthouse.metrics.bestPracticesScore || 0) +
        (data.lighthouse.metrics.accessibilityScore || 0) +
        (data.lighthouse.metrics.seoScore || 0)
      ) / 4;
      
      summary.lighthouseScore = Math.round(lighthouseScore * 100);
      summary.overallScore += summary.lighthouseScore * 0.3;
    }
    
    // ZAP scoring
    if (data.zap.available && data.zap.vulnerabilities) {
      const zapData = data.zap.vulnerabilities;
      const highRisk = zapData.riskLevels?.high || 0;
      const mediumRisk = zapData.riskLevels?.medium || 0;
      
      summary.criticalIssues += highRisk;
      summary.zapScore = Math.max(0, 100 - (highRisk * 20) - (mediumRisk * 5));
      summary.overallScore += summary.zapScore * 0.4;
    }
    
    // Dependencies scoring
    if (data.dependencies.available) {
      const vulns = data.dependencies.vulnerabilities;
      const criticalVulns = Object.values(vulns).filter(v => v.severity === 'critical').length;
      const highVulns = Object.values(vulns).filter(v => v.severity === 'high').length;
      
      summary.criticalIssues += criticalVulns;
      summary.dependencyScore = Math.max(0, 100 - (criticalVulns * 25) - (highVulns * 10));
      summary.overallScore += summary.dependencyScore * 0.2;
    }
    
    // Next.js configuration scoring
    if (data.nextjsSecurity.available) {
      let configScore = 0;
      const config = data.nextjsSecurity;
      
      if (config.nextConfig.hasSecurityHeaders) configScore += 25;
      if (config.nextConfig.hasCSP) configScore += 25;
      if (config.middleware.hasCSP) configScore += 25;
      if (config.middleware.hasAuth) configScore += 25;
      
      summary.nextjsScore = configScore;
      summary.overallScore += summary.nextjsScore * 0.1;
    }
    
    summary.overallScore = Math.round(summary.overallScore);
    
    // Generate recommendations based on scores
    if (summary.overallScore < 70) {
      summary.recommendations.push('Overall security score is below acceptable threshold');
    }
    
    if (summary.criticalIssues > 0) {
      summary.recommendations.push(`${summary.criticalIssues} critical security issues need immediate attention`);
    }
    
    return summary;
  }

  extractLighthouseMetrics(data) {
    // This would extract relevant metrics from Lighthouse data
    return data.metrics || {};
  }

  generateLighthouseRecommendations(data) {
    const recommendations = [];
    
    if (data.metrics?.performanceScore < 0.9) {
      recommendations.push('Improve performance score for better security posture');
    }
    
    if (data.metrics?.bestPracticesScore < 0.9) {
      recommendations.push('Address best practices issues identified by Lighthouse');
    }
    
    return recommendations;
  }

  generateZAPRecommendations(data) {
    const recommendations = [];
    
    if (data.riskLevels?.high > 0) {
      recommendations.push(`Address ${data.riskLevels.high} high-risk vulnerabilities immediately`);
    }
    
    if (data.riskLevels?.medium > 5) {
      recommendations.push(`Review and fix ${data.riskLevels.medium} medium-risk vulnerabilities`);
    }
    
    return recommendations;
  }

  generateDependencyRecommendations(auditResult) {
    const recommendations = [];
    
    if (auditResult.metadata?.vulnerabilities?.total > 0) {
      recommendations.push('Update vulnerable dependencies using npm audit fix');
    }
    
    return recommendations;
  }

  generateNextJSRecommendations(config) {
    const recommendations = [];
    
    if (!config.nextConfig.hasSecurityHeaders) {
      recommendations.push('Add security headers to next.config.js');
    }
    
    if (!config.middleware.hasCSP) {
      recommendations.push('Implement Content Security Policy in middleware');
    }
    
    return recommendations;
  }

  async generateHTMLDashboard(data, timestamp) {
    const htmlContent = this.generateHTMLContent(data);
    const htmlFile = path.join(this.dashboardDir, `security-dashboard-${timestamp}.html`);
    
    fs.writeFileSync(htmlFile, htmlContent);
    return htmlFile;
  }

  generateHTMLContent(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Security Dashboard - ${data.timestamp}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: #2c3e50; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .score-card { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .score { font-size: 48px; font-weight: bold; text-align: center; }
        .score.good { color: #27ae60; }
        .score.warning { color: #f39c12; }
        .score.danger { color: #e74c3c; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .metric { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .recommendations { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin-top: 20px; }
        .critical { background: #f8d7da; border: 1px solid #f5c6cb; }
        ul { margin: 0; padding-left: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 Security Dashboard</h1>
            <p>Generated: ${data.timestamp}</p>
        </div>
        
        <div class="score-card">
            <h2>Overall Security Score</h2>
            <div class="score ${this.getScoreClass(data.summary.overallScore)}">${data.summary.overallScore}/100</div>
            ${data.summary.criticalIssues > 0 ? `<div class="critical"><strong>⚠️ ${data.summary.criticalIssues} Critical Issues Detected</strong></div>` : ''}
        </div>
        
        <div class="grid">
            ${this.generateLighthouseSection(data.lighthouse)}
            ${this.generateZAPSection(data.zap)}
            ${this.generateDependencySection(data.dependencies)}
            ${this.generateNextJSSection(data.nextjsSecurity)}
        </div>
        
        ${this.generateRecommendationsSection(data.summary)}
    </div>
</body>
</html>`;
  }

  getScoreClass(score) {
    if (score >= 80) return 'good';
    if (score >= 60) return 'warning';
    return 'danger';
  }

  generateLighthouseSection(lighthouse) {
    if (!lighthouse.available) {
      return `<div class="metric"><h3>🚨 Lighthouse</h3><p>No data available</p></div>`;
    }
    
    return `
      <div class="metric">
        <h3>🚀 Lighthouse Security</h3>
        <p><strong>Performance:</strong> ${Math.round((lighthouse.metrics?.performanceScore || 0) * 100)}%</p>
        <p><strong>Best Practices:</strong> ${Math.round((lighthouse.metrics?.bestPracticesScore || 0) * 100)}%</p>
        <p><strong>Accessibility:</strong> ${Math.round((lighthouse.metrics?.accessibilityScore || 0) * 100)}%</p>
        <p><strong>SEO:</strong> ${Math.round((lighthouse.metrics?.seoScore || 0) * 100)}%</p>
      </div>`;
  }

  generateZAPSection(zap) {
    if (!zap.available) {
      return `<div class="metric"><h3>🛡️ OWASP ZAP</h3><p>No data available</p></div>`;
    }
    
    const vulns = zap.vulnerabilities;
    return `
      <div class="metric">
        <h3>🛡️ OWASP ZAP Scan</h3>
        <p><strong>Total Alerts:</strong> ${vulns.totalAlerts || 0}</p>
        <p><strong>High Risk:</strong> ${vulns.riskLevels?.high || 0}</p>
        <p><strong>Medium Risk:</strong> ${vulns.riskLevels?.medium || 0}</p>
        <p><strong>Low Risk:</strong> ${vulns.riskLevels?.low || 0}</p>
      </div>`;
  }

  generateDependencySection(deps) {
    if (!deps.available) {
      return `<div class="metric"><h3>📦 Dependencies</h3><p>No data available</p></div>`;
    }
    
    const total = deps.metadata?.vulnerabilities?.total || 0;
    return `
      <div class="metric">
        <h3>📦 Dependency Security</h3>
        <p><strong>Total Vulnerabilities:</strong> ${total}</p>
        <p><strong>Status:</strong> ${total === 0 ? '✅ Clean' : '⚠️ Issues Found'}</p>
      </div>`;
  }

  generateNextJSSection(nextjs) {
    if (!nextjs.available) {
      return `<div class="metric"><h3>⚛️ Next.js Config</h3><p>No data available</p></div>`;
    }
    
    return `
      <div class="metric">
        <h3>⚛️ Next.js Security</h3>
        <p><strong>Security Headers:</strong> ${nextjs.nextConfig?.hasSecurityHeaders ? '✅' : '❌'}</p>
        <p><strong>CSP:</strong> ${nextjs.middleware?.hasCSP ? '✅' : '❌'}</p>
        <p><strong>Middleware:</strong> ${nextjs.middleware?.exists ? '✅' : '❌'}</p>
        <p><strong>API Routes:</strong> ${nextjs.apiRoutes?.totalRoutes || 0}</p>
      </div>`;
  }

  generateRecommendationsSection(summary) {
    if (summary.recommendations.length === 0) {
      return '<div class="recommendations"><h3>✅ No Critical Recommendations</h3><p>Your security posture looks good!</p></div>';
    }
    
    return `
      <div class="recommendations">
        <h3>📋 Security Recommendations</h3>
        <ul>
          ${summary.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>`;
  }
}

// CLI execution
if (require.main === module) {
  const dashboard = new SecurityReportingDashboard();
  dashboard.generateComprehensiveReport().catch(console.error);
}

module.exports = SecurityReportingDashboard;
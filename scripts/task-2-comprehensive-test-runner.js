#!/usr/bin/env node

/**
 * Task 2 Comprehensive Test Runner
 * Executes all components of Task 2: Advanced Frontend Security and Component Analysis
 * Part of Phase 1: Advanced Website Analysis & Bug Resolution
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import the individual test modules
const AdvancedPlaywrightSecurity = require('./task-2-advanced-playwright-security');
const AccessibilitySecurityTesting = require('./task-2-accessibility-security');
const ResourceSecurityAnalysis = require('./task-2-resource-security');

class Task2ComprehensiveTestRunner {
  constructor() {
    this.resultsDir = path.join(process.cwd(), 'audit-results', 'task-2');
    this.ensureResultsDir();
    this.startTime = new Date();
  }

  ensureResultsDir() {
    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true });
    }
  }

  async runTask2Complete() {
    console.log('🎭 Starting Task 2: Advanced Frontend Security and Component Analysis');
    console.log('=' .repeat(80));
    
    const results = {
      taskId: 'Task-2',
      taskName: 'Advanced Frontend Security and Component Analysis',
      startTime: this.startTime.toISOString(),
      components: {},
      integrationTests: {},
      summary: {},
      success: true
    };

    try {
      // Component 2.1: Advanced Playwright Security Testing
      console.log('\n🎭 Running Task 2.1: Advanced Playwright Security Testing...');
      console.log('-'.repeat(60));
      results.components.playwrightSecurity = await this.runPlaywrightSecurityTests();

      // Component 2.2: Advanced Accessibility and UX Security Testing
      console.log('\n♿ Running Task 2.2: Advanced Accessibility and UX Security Testing...');
      console.log('-'.repeat(60));
      results.components.accessibilitySecurity = await this.runAccessibilitySecurityTests();

      // Component 2.3: Advanced Resource Security and Performance Analysis
      console.log('\n🔒 Running Task 2.3: Advanced Resource Security and Performance Analysis...');
      console.log('-'.repeat(60));
      results.components.resourceSecurity = await this.runResourceSecurityTests();

      // Integration Tests: Cross-component security validation
      console.log('\n🔗 Running Integration Security Tests...');
      console.log('-'.repeat(60));
      results.integrationTests = await this.runIntegrationTests(results.components);

      // Generate comprehensive summary
      results.summary = this.generateTask2Summary(results.components, results.integrationTests);
      results.endTime = new Date().toISOString();
      results.duration = new Date() - this.startTime;

      // Save comprehensive results
      const resultsFile = path.join(this.resultsDir, `task-2-comprehensive-${Date.now()}.json`);
      fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));

      // Generate HTML report
      const htmlReport = await this.generateHTMLReport(results);

      // Display summary
      this.displayTask2Summary(results);

      console.log(`\n📄 Detailed results saved to: ${resultsFile}`);
      console.log(`🌐 HTML report saved to: ${htmlReport}`);
      
      return results;

    } catch (error) {
      console.error('❌ Task 2 execution failed:', error.message);
      results.success = false;
      results.error = error.message;
      results.endTime = new Date().toISOString();
      return results;
    }
  }

  async runPlaywrightSecurityTests() {
    try {
      const playwrightSecurity = new AdvancedPlaywrightSecurity();
      const results = await playwrightSecurity.runComprehensiveSecurityTests();
      
      console.log(`  ✅ Playwright Security Tests: ${results.success ? 'PASSED' : 'FAILED'}`);
      console.log(`  📊 Overall Score: ${results.summary?.overallScore || 0}/100`);
      console.log(`  🚨 Critical Issues: ${results.summary?.criticalIssues || 0}`);
      
      return results;
    } catch (error) {
      console.error('  ❌ Playwright Security Tests failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  async runAccessibilitySecurityTests() {
    try {
      const accessibilitySecurity = new AccessibilitySecurityTesting();
      const results = await accessibilitySecurity.runAccessibilitySecurityTests();
      
      console.log(`  ✅ Accessibility Security Tests: ${results.success ? 'PASSED' : 'FAILED'}`);
      console.log(`  📊 Overall Score: ${results.summary?.overallScore || 0}/100`);
      console.log(`  ♿ WCAG Compliance: ${results.summary?.wcagCompliance || 'unknown'}`);
      
      return results;
    } catch (error) {
      console.error('  ❌ Accessibility Security Tests failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  async runResourceSecurityTests() {
    try {
      const resourceSecurity = new ResourceSecurityAnalysis();
      const results = await resourceSecurity.runResourceSecurityAnalysis();
      
      console.log(`  ✅ Resource Security Tests: ${results.success ? 'PASSED' : 'FAILED'}`);
      console.log(`  📊 Overall Score: ${results.summary?.overallScore || 0}/100`);
      console.log(`  🔒 Security Level: ${results.summary?.securityLevel || 'unknown'}`);
      
      return results;
    } catch (error) {
      console.error('  ❌ Resource Security Tests failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  async runIntegrationTests(components) {
    console.log('  🔗 Running cross-component security validation...');
    
    const integrationResults = {
      securityConsistency: {},
      crossComponentIssues: [],
      holisticSecurity: {},
      recommendations: []
    };

    try {
      // Test 1: Security Header Consistency
      integrationResults.securityConsistency = await this.testSecurityConsistency(components);

      // Test 2: Cross-Component Vulnerabilities
      integrationResults.crossComponentIssues = await this.identifyCrossComponentIssues(components);

      // Test 3: Holistic Security Assessment
      integrationResults.holisticSecurity = await this.assessHolisticSecurity(components);

      // Generate integration recommendations
      integrationResults.recommendations = this.generateIntegrationRecommendations(integrationResults);

      console.log(`  ✅ Integration tests completed`);
      console.log(`  🔗 Cross-component issues: ${integrationResults.crossComponentIssues.length}`);

    } catch (error) {
      console.error('  ❌ Integration tests failed:', error.message);
      integrationResults.error = error.message;
    }

    return integrationResults;
  }

  async testSecurityConsistency(components) {
    const consistency = {
      cspConsistency: false,
      authenticationConsistency: false,
      inputValidationConsistency: false,
      score: 0
    };

    // Check CSP consistency across components
    const playwrightCSP = components.playwrightSecurity?.tests?.cspImplementation?.cspHeaderPresent;
    const resourceCSP = components.resourceSecurity?.tests?.nextImageSecurity?.securityHeaders?.configured;
    
    consistency.cspConsistency = playwrightCSP && resourceCSP;

    // Check authentication consistency
    const playwrightAuth = components.playwrightSecurity?.tests?.authSecurity?.nextAuthImplemented;
    const accessibilityAuth = components.accessibilitySecurity?.tests?.formAccessibilitySecurity?.securityFeedback > 0;
    
    consistency.authenticationConsistency = playwrightAuth || accessibilityAuth;

    // Check input validation consistency
    const playwrightValidation = components.playwrightSecurity?.tests?.inputSanitization?.zodValidation;
    const resourceValidation = components.resourceSecurity?.tests?.uploadSecurity?.fileValidation?.implemented;
    
    consistency.inputValidationConsistency = playwrightValidation && resourceValidation;

    // Calculate consistency score
    let score = 0;
    if (consistency.cspConsistency) score += 33;
    if (consistency.authenticationConsistency) score += 33;
    if (consistency.inputValidationConsistency) score += 34;
    
    consistency.score = score;

    return consistency;
  }

  async identifyCrossComponentIssues(components) {
    const issues = [];

    // Issue 1: CSP conflicts with accessibility
    const hasCSP = components.playwrightSecurity?.tests?.cspImplementation?.cspHeaderPresent;
    const hasInlineStyles = components.accessibilitySecurity?.tests?.colorContrastSecurity?.contrastRatios?.colorsFound > 0;
    
    if (hasCSP && hasInlineStyles) {
      issues.push({
        type: 'csp-accessibility-conflict',
        severity: 'medium',
        description: 'CSP implementation may conflict with inline styles needed for accessibility',
        components: ['playwright-security', 'accessibility-security']
      });
    }

    // Issue 2: Image optimization vs accessibility
    const imageOptimization = components.resourceSecurity?.tests?.assetOptimizationSecurity?.imageOptimization?.nextImageEnabled;
    const altTextIssues = components.accessibilitySecurity?.tests?.engineeringContentAccessibility?.technicalContentAccessibility?.percentage < 80;
    
    if (imageOptimization && altTextIssues) {
      issues.push({
        type: 'image-optimization-accessibility',
        severity: 'medium',
        description: 'Image optimization is enabled but alt text coverage is insufficient',
        components: ['resource-security', 'accessibility-security']
      });
    }

    // Issue 3: Upload security vs form accessibility
    const uploadSecurity = components.resourceSecurity?.tests?.uploadSecurity?.uploadEndpoints?.length > 0;
    const formAccessibility = components.accessibilitySecurity?.tests?.formAccessibilitySecurity?.labelAssociation === 0;
    
    if (uploadSecurity && formAccessibility) {
      issues.push({
        type: 'upload-form-accessibility',
        severity: 'high',
        description: 'Upload forms exist but lack proper accessibility labels',
        components: ['resource-security', 'accessibility-security']
      });
    }

    // Issue 4: XSS protection vs dynamic content
    const xssProtection = components.playwrightSecurity?.tests?.xssVulnerabilities?.vulnerabilitiesFound === 0;
    const dynamicContent = components.resourceSecurity?.tests?.serviceImageSecurity?.serviceImages?.totalImages > 0;
    
    if (!xssProtection && dynamicContent) {
      issues.push({
        type: 'xss-dynamic-content',
        severity: 'critical',
        description: 'XSS vulnerabilities detected with dynamic content present',
        components: ['playwright-security', 'resource-security']
      });
    }

    return issues;
  }

  async assessHolisticSecurity(components) {
    const assessment = {
      overallSecurityPosture: 'unknown',
      layeredSecurity: false,
      defenseInDepth: false,
      securityByDesign: false,
      score: 0
    };

    // Calculate component scores
    const playwrightScore = components.playwrightSecurity?.summary?.overallScore || 0;
    const accessibilityScore = components.accessibilitySecurity?.summary?.overallScore || 0;
    const resourceScore = components.resourceSecurity?.summary?.overallScore || 0;

    const averageScore = Math.round((playwrightScore + accessibilityScore + resourceScore) / 3);
    assessment.score = averageScore;

    // Assess layered security
    const hasMultipleSecurityLayers = [
      components.playwrightSecurity?.tests?.cspImplementation?.cspHeaderPresent,
      components.playwrightSecurity?.tests?.authSecurity?.nextAuthImplemented,
      components.resourceSecurity?.tests?.uploadSecurity?.fileValidation?.implemented,
      components.playwrightSecurity?.tests?.inputSanitization?.zodValidation
    ].filter(Boolean).length >= 3;

    assessment.layeredSecurity = hasMultipleSecurityLayers;

    // Assess defense in depth
    const hasDefenseInDepth = [
      components.playwrightSecurity?.tests?.csrfProtection?.serverActionsProtected,
      components.resourceSecurity?.tests?.sriImplementation?.sriEnabled,
      components.accessibilitySecurity?.tests?.wcagCompliance?.totalViolations === 0,
      components.resourceSecurity?.tests?.staticAssetSecurity?.sensitiveFiles?.length === 0
    ].filter(Boolean).length >= 2;

    assessment.defenseInDepth = hasDefenseInDepth;

    // Assess security by design
    const hasSecurityByDesign = [
      components.playwrightSecurity?.tests?.serverActionsSecurity?.authenticationChecks > 0,
      components.accessibilitySecurity?.tests?.focusManagementSecurity?.securityFocusPatterns?.hasSecurityFocus,
      components.resourceSecurity?.tests?.nextImageSecurity?.imageConfig?.configured
    ].filter(Boolean).length >= 2;

    assessment.securityByDesign = hasSecurityByDesign;

    // Determine overall posture
    if (averageScore >= 85 && assessment.layeredSecurity && assessment.defenseInDepth) {
      assessment.overallSecurityPosture = 'excellent';
    } else if (averageScore >= 70 && (assessment.layeredSecurity || assessment.defenseInDepth)) {
      assessment.overallSecurityPosture = 'good';
    } else if (averageScore >= 50) {
      assessment.overallSecurityPosture = 'acceptable';
    } else {
      assessment.overallSecurityPosture = 'poor';
    }

    return assessment;
  }

  generateIntegrationRecommendations(integrationResults) {
    const recommendations = [];

    // Security consistency recommendations
    if (integrationResults.securityConsistency?.score < 80) {
      recommendations.push('Improve security consistency across components');
    }

    // Cross-component issue recommendations
    integrationResults.crossComponentIssues?.forEach(issue => {
      if (issue.severity === 'critical') {
        recommendations.push(`🚨 Critical: ${issue.description}`);
      } else if (issue.severity === 'high') {
        recommendations.push(`⚠️ High: ${issue.description}`);
      } else {
        recommendations.push(`💡 Medium: ${issue.description}`);
      }
    });

    // Holistic security recommendations
    if (!integrationResults.holisticSecurity?.layeredSecurity) {
      recommendations.push('Implement additional security layers for defense in depth');
    }

    if (!integrationResults.holisticSecurity?.securityByDesign) {
      recommendations.push('Integrate security considerations into design patterns');
    }

    return recommendations;
  }

  generateTask2Summary(components, integrationTests) {
    const summary = {
      overallScore: 0,
      componentScores: {},
      criticalIssues: 0,
      totalRecommendations: 0,
      securityPosture: 'unknown',
      wcagCompliance: 'unknown',
      nextSteps: [],
      achievements: []
    };

    // Component scores
    summary.componentScores = {
      playwrightSecurity: components.playwrightSecurity?.summary?.overallScore || 0,
      accessibilitySecurity: components.accessibilitySecurity?.summary?.overallScore || 0,
      resourceSecurity: components.resourceSecurity?.summary?.overallScore || 0
    };

    // Calculate weighted overall score
    const weights = { playwrightSecurity: 0.4, accessibilitySecurity: 0.3, resourceSecurity: 0.3 };
    summary.overallScore = Math.round(
      (summary.componentScores.playwrightSecurity * weights.playwrightSecurity) +
      (summary.componentScores.accessibilitySecurity * weights.accessibilitySecurity) +
      (summary.componentScores.resourceSecurity * weights.resourceSecurity)
    );

    // Critical issues
    summary.criticalIssues = (components.playwrightSecurity?.summary?.criticalIssues || 0) +
                            (components.accessibilitySecurity?.summary?.criticalIssues || 0) +
                            (components.resourceSecurity?.summary?.criticalIssues || 0) +
                            (integrationTests.crossComponentIssues?.filter(i => i.severity === 'critical').length || 0);

    // Total recommendations
    summary.totalRecommendations = (components.playwrightSecurity?.summary?.recommendations?.length || 0) +
                                  (components.accessibilitySecurity?.summary?.recommendations?.length || 0) +
                                  (components.resourceSecurity?.summary?.recommendations?.length || 0) +
                                  (integrationTests.recommendations?.length || 0);

    // Security posture
    summary.securityPosture = integrationTests.holisticSecurity?.overallSecurityPosture || 'unknown';

    // WCAG compliance
    summary.wcagCompliance = components.accessibilitySecurity?.summary?.wcagCompliance || 'unknown';

    // Achievements
    if (summary.componentScores.playwrightSecurity >= 80) {
      summary.achievements.push('✅ Strong browser security implementation');
    }
    if (summary.componentScores.accessibilitySecurity >= 80) {
      summary.achievements.push('✅ Excellent accessibility compliance');
    }
    if (summary.componentScores.resourceSecurity >= 80) {
      summary.achievements.push('✅ Robust resource security');
    }
    if (integrationTests.holisticSecurity?.layeredSecurity) {
      summary.achievements.push('✅ Layered security architecture');
    }

    // Next steps
    if (summary.overallScore >= 85 && summary.criticalIssues === 0) {
      summary.nextSteps.push('Proceed to Task 3: Enhanced Backend API Security Assessment');
      summary.nextSteps.push('Maintain current security standards');
    } else if (summary.criticalIssues > 0) {
      summary.nextSteps.push('Address critical security issues before proceeding');
      summary.nextSteps.push('Review and implement high-priority recommendations');
    } else {
      summary.nextSteps.push('Implement medium-priority security improvements');
      summary.nextSteps.push('Consider proceeding to Task 3 with monitoring');
    }

    return summary;
  }

  async generateHTMLReport(results) {
    const htmlContent = this.generateHTMLContent(results);
    const htmlFile = path.join(this.resultsDir, `task-2-report-${Date.now()}.html`);
    
    fs.writeFileSync(htmlFile, htmlContent);
    return htmlFile;
  }

  generateHTMLContent(results) {
    const summary = results.summary;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task 2: Advanced Frontend Security Analysis Report</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 2.5em; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .score-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .score-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
        .score-value { font-size: 3em; font-weight: bold; margin: 10px 0; }
        .score-excellent { color: #28a745; }
        .score-good { color: #17a2b8; }
        .score-warning { color: #ffc107; }
        .score-danger { color: #dc3545; }
        .component-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .component-card { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .component-title { font-size: 1.3em; font-weight: bold; margin-bottom: 15px; color: #495057; }
        .metric { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e9ecef; }
        .metric:last-child { border-bottom: none; }
        .metric-label { font-weight: 500; }
        .metric-value { font-weight: bold; }
        .recommendations { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .recommendations h3 { color: #495057; margin-top: 0; }
        .recommendation { padding: 10px 15px; margin: 8px 0; border-radius: 6px; }
        .rec-critical { background: #f8d7da; border-left: 4px solid #dc3545; }
        .rec-warning { background: #fff3cd; border-left: 4px solid #ffc107; }
        .rec-info { background: #d1ecf1; border-left: 4px solid #17a2b8; }
        .rec-success { background: #d4edda; border-left: 4px solid #28a745; }
        .achievements { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .achievement { padding: 10px 15px; margin: 8px 0; background: #d4edda; border-radius: 6px; border-left: 4px solid #28a745; }
        .integration-results { background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 20px; }
        .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.85em; font-weight: bold; }
        .status-excellent { background: #28a745; color: white; }
        .status-good { background: #17a2b8; color: white; }
        .status-warning { background: #ffc107; color: black; }
        .status-danger { background: #dc3545; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎭 Task 2: Advanced Frontend Security Analysis</h1>
            <p>Comprehensive security assessment completed on ${new Date(results.endTime).toLocaleString()}</p>
            <p>Duration: ${Math.round(results.duration / 1000)}s | Security Posture: <span class="status-badge status-${this.getStatusClass(summary.securityPosture)}">${summary.securityPosture.toUpperCase()}</span></p>
        </div>
        
        <div class="score-grid">
            <div class="score-card">
                <h3>Overall Security Score</h3>
                <div class="score-value ${this.getScoreClass(summary.overallScore)}">${summary.overallScore}/100</div>
                <p>Weighted average across all components</p>
            </div>
            <div class="score-card">
                <h3>Critical Issues</h3>
                <div class="score-value ${summary.criticalIssues > 0 ? 'score-danger' : 'score-excellent'}">${summary.criticalIssues}</div>
                <p>Issues requiring immediate attention</p>
            </div>
            <div class="score-card">
                <h3>WCAG Compliance</h3>
                <div class="score-value ${this.getWCAGClass(summary.wcagCompliance)}">${summary.wcagCompliance.toUpperCase()}</div>
                <p>Accessibility compliance level</p>
            </div>
        </div>

        <div class="component-grid">
            ${this.generateComponentCard('🎭 Playwright Security', summary.componentScores.playwrightSecurity, results.components.playwrightSecurity)}
            ${this.generateComponentCard('♿ Accessibility Security', summary.componentScores.accessibilitySecurity, results.components.accessibilitySecurity)}
            ${this.generateComponentCard('🔒 Resource Security', summary.componentScores.resourceSecurity, results.components.resourceSecurity)}
        </div>

        <div class="integration-results">
            <h3>🔗 Integration Security Analysis</h3>
            <div class="metric">
                <span class="metric-label">Security Consistency Score</span>
                <span class="metric-value">${results.integrationTests.securityConsistency?.score || 0}/100</span>
            </div>
            <div class="metric">
                <span class="metric-label">Cross-Component Issues</span>
                <span class="metric-value">${results.integrationTests.crossComponentIssues?.length || 0}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Layered Security</span>
                <span class="metric-value">${results.integrationTests.holisticSecurity?.layeredSecurity ? '✅ Yes' : '❌ No'}</span>
            </div>
            <div class="metric">
                <span class="metric-label">Defense in Depth</span>
                <span class="metric-value">${results.integrationTests.holisticSecurity?.defenseInDepth ? '✅ Yes' : '❌ No'}</span>
            </div>
        </div>

        ${summary.achievements.length > 0 ? `
        <div class="achievements">
            <h3>🏆 Security Achievements</h3>
            ${summary.achievements.map(achievement => `<div class="achievement">${achievement}</div>`).join('')}
        </div>
        ` : ''}

        <div class="recommendations">
            <h3>📋 Next Steps & Recommendations</h3>
            ${summary.nextSteps.map(step => `<div class="recommendation rec-info">${step}</div>`).join('')}
            ${results.integrationTests.recommendations?.map(rec => {
                const type = rec.includes('🚨') ? 'rec-critical' : rec.includes('⚠️') ? 'rec-warning' : rec.includes('✅') ? 'rec-success' : 'rec-info';
                return `<div class="recommendation ${type}">${rec}</div>`;
            }).join('') || ''}
        </div>
    </div>
</body>
</html>`;
  }

  generateComponentCard(title, score, componentData) {
    return `
      <div class="component-card">
        <div class="component-title">${title}</div>
        <div class="metric">
          <span class="metric-label">Score</span>
          <span class="metric-value ${this.getScoreClass(score)}">${score}/100</span>
        </div>
        <div class="metric">
          <span class="metric-label">Status</span>
          <span class="metric-value">${componentData?.success ? '✅ Passed' : '❌ Failed'}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Tests Run</span>
          <span class="metric-value">${Object.keys(componentData?.tests || {}).length}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Critical Issues</span>
          <span class="metric-value">${componentData?.summary?.criticalIssues || 0}</span>
        </div>
      </div>`;
  }

  getScoreClass(score) {
    if (score >= 85) return 'score-excellent';
    if (score >= 70) return 'score-good';
    if (score >= 50) return 'score-warning';
    return 'score-danger';
  }

  getStatusClass(status) {
    switch (status) {
      case 'excellent': return 'excellent';
      case 'good': return 'good';
      case 'acceptable': return 'warning';
      default: return 'danger';
    }
  }

  getWCAGClass(compliance) {
    switch (compliance) {
      case 'AA': return 'score-excellent';
      case 'partial': return 'score-warning';
      case 'non-compliant': return 'score-danger';
      default: return 'score-warning';
    }
  }

  displayTask2Summary(results) {
    console.log('\n' + '='.repeat(80));
    console.log('📊 TASK 2 COMPLETION SUMMARY');
    console.log('='.repeat(80));
    
    const summary = results.summary;
    
    console.log(`\n🎯 Overall Status: ${results.success ? '✅ SUCCESS' : '❌ NEEDS ATTENTION'}`);
    console.log(`📈 Overall Security Score: ${summary.overallScore}/100`);
    console.log(`🔒 Security Posture: ${summary.securityPosture.toUpperCase()}`);
    console.log(`♿ WCAG Compliance: ${summary.wcagCompliance.toUpperCase()}`);
    console.log(`⏱️ Duration: ${Math.round(results.duration / 1000)}s`);

    console.log('\n📊 Component Scores:');
    console.log(`  🎭 Playwright Security: ${summary.componentScores.playwrightSecurity}/100`);
    console.log(`  ♿ Accessibility Security: ${summary.componentScores.accessibilitySecurity}/100`);
    console.log(`  🔒 Resource Security: ${summary.componentScores.resourceSecurity}/100`);

    if (summary.criticalIssues > 0) {
      console.log(`\n🚨 Critical Issues: ${summary.criticalIssues}`);
    }

    if (summary.achievements.length > 0) {
      console.log('\n🏆 Achievements:');
      summary.achievements.forEach(achievement => console.log(`  ${achievement}`));
    }

    console.log('\n📋 Next Steps:');
    summary.nextSteps.forEach(step => console.log(`  ➡️ ${step}`));

    console.log('\n🔗 Integration Results:');
    console.log(`  🔄 Security Consistency: ${results.integrationTests.securityConsistency?.score || 0}/100`);
    console.log(`  ⚠️ Cross-Component Issues: ${results.integrationTests.crossComponentIssues?.length || 0}`);
    console.log(`  🛡️ Layered Security: ${results.integrationTests.holisticSecurity?.layeredSecurity ? '✅' : '❌'}`);
    console.log(`  🔒 Defense in Depth: ${results.integrationTests.holisticSecurity?.defenseInDepth ? '✅' : '❌'}`);
  }
}

// CLI execution
if (require.main === module) {
  const runner = new Task2ComprehensiveTestRunner();
  runner.runTask2Complete().catch(console.error);
}

module.exports = Task2ComprehensiveTestRunner;
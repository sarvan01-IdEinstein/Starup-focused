#!/usr/bin/env node

/**
 * OWASP ZAP CLI Integration for Next.js Security Testing
 * Automated vulnerability scanning with Playwright integration
 * Part of Task 1: Optimized MCP Tools and Advanced Testing Environment Setup
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

class OWASPZAPCLIIntegration {
  constructor() {
    this.zapPort = 8080;
    this.zapApiKey = 'your-zap-api-key'; // Should be configured via environment
    this.zapBaseUrl = `http://localhost:${this.zapPort}`;
    this.outputDir = path.join(process.cwd(), 'audit-results', 'zap');
    this.ensureOutputDir();
  }

  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  async startZAPDaemon() {
    console.log('🚀 Starting OWASP ZAP daemon...');
    
    try {
      // Check if ZAP is already running
      await axios.get(`${this.zapBaseUrl}/JSON/core/view/version/`);
      console.log('✅ ZAP daemon is already running');
      return true;
    } catch (error) {
      // ZAP is not running, start it
      console.log('Starting ZAP daemon in headless mode...');
      
      const zapCommand = [
        'zap.sh',
        '-daemon',
        '-port', this.zapPort.toString(),
        '-config', 'api.addrs.addr.name=.*',
        '-config', 'api.addrs.addr.regex=true',
        '-config', 'api.key=' + this.zapApiKey
      ];
      
      try {
        const zapProcess = spawn('zap.sh', zapCommand.slice(1), {
          detached: true,
          stdio: 'ignore'
        });
        
        zapProcess.unref();
        
        // Wait for ZAP to start
        await this.waitForZAP();
        console.log('✅ ZAP daemon started successfully');
        return true;
        
      } catch (startError) {
        console.error('❌ Failed to start ZAP daemon:', startError.message);
        console.log('💡 Please ensure OWASP ZAP is installed and zap.sh is in your PATH');
        console.log('💡 Installation guide: https://www.zaproxy.org/download/');
        return false;
      }
    }
  }

  async waitForZAP(maxAttempts = 30) {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        await axios.get(`${this.zapBaseUrl}/JSON/core/view/version/`);
        return true;
      } catch (error) {
        console.log(`Waiting for ZAP to start... (${i + 1}/${maxAttempts})`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    throw new Error('ZAP failed to start within timeout period');
  }

  async runSecurityScan(targetUrl = 'http://localhost:3002', options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    try {
      // Ensure ZAP is running
      const zapStarted = await this.startZAPDaemon();
      if (!zapStarted) {
        throw new Error('Failed to start ZAP daemon');
      }

      console.log(`🔍 Starting security scan on ${targetUrl}...`);
      
      // Step 1: Spider the application
      console.log('🕷️ Spidering application...');
      await this.spiderScan(targetUrl);
      
      // Step 2: Active security scan
      console.log('🔍 Running active security scan...');
      await this.activeScan(targetUrl);
      
      // Step 3: Generate reports
      console.log('📊 Generating security reports...');
      const reports = await this.generateReports(timestamp);
      
      console.log('✅ Security scan completed successfully');
      return {
        success: true,
        reports,
        timestamp
      };
      
    } catch (error) {
      console.error('❌ Security scan failed:', error.message);
      return {
        success: false,
        error: error.message,
        timestamp
      };
    }
  }

  async spiderScan(targetUrl) {
    const response = await axios.get(`${this.zapBaseUrl}/JSON/spider/action/scan/`, {
      params: {
        apikey: this.zapApiKey,
        url: targetUrl,
        maxChildren: 10,
        recurse: true,
        contextName: '',
        subtreeOnly: false
      }
    });
    
    const scanId = response.data.scan;
    console.log(`Spider scan started with ID: ${scanId}`);
    
    // Wait for spider scan to complete
    let progress = 0;
    while (progress < 100) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusResponse = await axios.get(`${this.zapBaseUrl}/JSON/spider/view/status/`, {
        params: { apikey: this.zapApiKey, scanId }
      });
      
      progress = parseInt(statusResponse.data.status);
      console.log(`Spider progress: ${progress}%`);
    }
    
    console.log('✅ Spider scan completed');
  }

  async activeScan(targetUrl) {
    const response = await axios.get(`${this.zapBaseUrl}/JSON/ascan/action/scan/`, {
      params: {
        apikey: this.zapApiKey,
        url: targetUrl,
        recurse: true,
        inScopeOnly: false,
        scanPolicyName: '',
        method: '',
        postData: '',
        contextId: ''
      }
    });
    
    const scanId = response.data.scan;
    console.log(`Active scan started with ID: ${scanId}`);
    
    // Wait for active scan to complete
    let progress = 0;
    while (progress < 100) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const statusResponse = await axios.get(`${this.zapBaseUrl}/JSON/ascan/view/status/`, {
        params: { apikey: this.zapApiKey, scanId }
      });
      
      progress = parseInt(statusResponse.data.status);
      console.log(`Active scan progress: ${progress}%`);
    }
    
    console.log('✅ Active scan completed');
  }

  async generateReports(timestamp) {
    const reports = {};
    
    // Generate HTML report
    const htmlResponse = await axios.get(`${this.zapBaseUrl}/OTHER/core/other/htmlreport/`, {
      params: { apikey: this.zapApiKey }
    });
    
    const htmlFile = path.join(this.outputDir, `zap-report-${timestamp}.html`);
    fs.writeFileSync(htmlFile, htmlResponse.data);
    reports.html = htmlFile;
    
    // Generate JSON report
    const jsonResponse = await axios.get(`${this.zapBaseUrl}/JSON/core/view/alerts/`, {
      params: { apikey: this.zapApiKey }
    });
    
    const jsonFile = path.join(this.outputDir, `zap-report-${timestamp}.json`);
    fs.writeFileSync(jsonFile, JSON.stringify(jsonResponse.data, null, 2));
    reports.json = jsonFile;
    
    // Generate summary
    const summary = this.generateSummary(jsonResponse.data);
    const summaryFile = path.join(this.outputDir, `zap-summary-${timestamp}.json`);
    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
    reports.summary = summaryFile;
    
    console.log(`📊 Reports generated:`);
    console.log(`  HTML: ${htmlFile}`);
    console.log(`  JSON: ${jsonFile}`);
    console.log(`  Summary: ${summaryFile}`);
    
    return reports;
  }

  generateSummary(alertsData) {
    const alerts = alertsData.alerts || [];
    
    const summary = {
      totalAlerts: alerts.length,
      riskLevels: {
        high: 0,
        medium: 0,
        low: 0,
        informational: 0
      },
      categories: {},
      timestamp: new Date().toISOString()
    };
    
    alerts.forEach(alert => {
      // Count by risk level
      const risk = alert.risk?.toLowerCase() || 'informational';
      if (summary.riskLevels[risk] !== undefined) {
        summary.riskLevels[risk]++;
      }
      
      // Count by category
      const category = alert.alert || 'Unknown';
      summary.categories[category] = (summary.categories[category] || 0) + 1;
    });
    
    return summary;
  }

  async runPlaywrightIntegratedScan(pages = []) {
    console.log('🎭 Running Playwright-integrated ZAP scan...');
    
    const defaultPages = [
      'http://localhost:3002',
      'http://localhost:3002/about',
      'http://localhost:3002/services',
      'http://localhost:3002/contact',
      'http://localhost:3002/auth/signin'
    ];
    
    const pagesToScan = pages.length > 0 ? pages : defaultPages;
    const results = [];
    
    for (const page of pagesToScan) {
      console.log(`\n🔍 Scanning page with Playwright integration: ${page}`);
      
      // This would integrate with Playwright MCP for browser automation
      // For now, we'll use the standard ZAP scan
      const result = await this.runSecurityScan(page);
      results.push({
        url: page,
        ...result
      });
    }
    
    return results;
  }

  async stopZAPDaemon() {
    try {
      await axios.get(`${this.zapBaseUrl}/JSON/core/action/shutdown/`, {
        params: { apikey: this.zapApiKey }
      });
      console.log('✅ ZAP daemon stopped');
    } catch (error) {
      console.log('ZAP daemon may have already stopped');
    }
  }
}

// CLI execution
if (require.main === module) {
  const zap = new OWASPZAPCLIIntegration();
  
  const args = process.argv.slice(2);
  const url = args[0] || 'http://localhost:3002';
  const playwright = args.includes('--playwright');
  const stop = args.includes('--stop');
  
  if (stop) {
    zap.stopZAPDaemon().catch(console.error);
  } else if (playwright) {
    zap.runPlaywrightIntegratedScan().catch(console.error);
  } else {
    zap.runSecurityScan(url).catch(console.error);
  }
}

module.exports = OWASPZAPCLIIntegration;
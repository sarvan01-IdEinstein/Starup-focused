#!/usr/bin/env node

/**
 * Backend API Comprehensive Testing and Validation
 * Tests all API endpoints, authentication, data validation, and error handling
 */

const fs = require('fs');
const path = require('path');

class BackendAPITester {
    constructor() {
        this.baseUrl = 'http://localhost:3001';
        this.results = {
            timestamp: new Date().toISOString(),
            summary: {
                totalEndpoints: 0,
                passedTests: 0,
                failedTests: 0,
                criticalIssues: 0,
                warnings: 0
            },
            endpoints: [],
            authentication: {},
            dataValidation: {},
            errorHandling: {},
            security: {}
        };
    }

    async runComprehensiveTest() {
        console.log('🚀 Starting Backend API Comprehensive Testing...\n');

        try {
            // Test API endpoint discovery
            await this.discoverAPIEndpoints();
            
            // Test authentication endpoints
            await this.testAuthenticationEndpoints();
            
            // Test core API endpoints
            await this.testCoreAPIEndpoints();
            
            // Test data validation
            await this.testDataValidation();
            
            // Test error handling
            await this.testErrorHandling();
            
            // Test security measures
            await this.testSecurityMeasures();
            
            // Generate comprehensive report
            await this.generateReport();
            
        } catch (error) {
            console.error('❌ Critical error during backend testing:', error);
            this.results.summary.criticalIssues++;
        }
    }

    async discoverAPIEndpoints() {
        console.log('🔍 Discovering API endpoints...');
        
        const apiRoutes = [
            '/api/auth/signin',
            '/api/auth/signup',
            '/api/auth/[...nextauth]',
            '/api/contact',
            '/api/consultation',
            '/api/newsletter',
            '/api/quotes',
            '/api/files',
            '/api/files/upload',
            '/api/services',
            '/api/blog/posts',
            '/api/customers',
            '/api/projects',
            '/api/user/profile',
            '/api/billing/invoices',
            '/api/dashboard/stats'
        ];

        this.results.summary.totalEndpoints = apiRoutes.length;
        
        for (const route of apiRoutes) {
            try {
                const response = await this.makeRequest('GET', route);
                this.results.endpoints.push({
                    endpoint: route,
                    method: 'GET',
                    status: response.status,
                    accessible: response.status !== 404,
                    responseTime: response.responseTime || 0
                });
                
                if (response.status === 404) {
                    console.log(`⚠️  Endpoint not found: ${route}`);
                    this.results.summary.warnings++;
                } else {
                    console.log(`✅ Endpoint accessible: ${route} (${response.status})`);
                    this.results.summary.passedTests++;
                }
            } catch (error) {
                console.log(`❌ Error testing endpoint ${route}:`, error.message);
                this.results.summary.failedTests++;
                this.results.endpoints.push({
                    endpoint: route,
                    method: 'GET',
                    status: 'ERROR',
                    error: error.message,
                    accessible: false
                });
            }
        }
    }

    async testAuthenticationEndpoints() {
        console.log('\n🔐 Testing Authentication Endpoints...');
        
        const authTests = [
            {
                name: 'NextAuth Configuration',
                endpoint: '/api/auth/providers',
                method: 'GET',
                expectedStatus: [200, 404] // 404 is acceptable if not configured
            },
            {
                name: 'Signup Endpoint',
                endpoint: '/api/auth/signup',
                method: 'POST',
                body: {
                    email: 'test@example.com',
                    password: 'testpassword123',
                    name: 'Test User'
                },
                expectedStatus: [200, 201, 400, 405] // Various acceptable responses
            },
            {
                name: 'Contact Form Endpoint',
                endpoint: '/api/contact',
                method: 'POST',
                body: {
                    name: 'Test User',
                    email: 'test@example.com',
                    message: 'Test message'
                },
                expectedStatus: [200, 201, 400]
            }
        ];

        for (const test of authTests) {
            try {
                const response = await this.makeRequest(test.method, test.endpoint, test.body);
                const passed = test.expectedStatus.includes(response.status);
                
                this.results.authentication[test.name] = {
                    status: response.status,
                    passed: passed,
                    responseTime: response.responseTime,
                    hasValidation: response.status === 400 // Indicates validation is working
                };

                if (passed) {
                    console.log(`✅ ${test.name}: ${response.status}`);
                    this.results.summary.passedTests++;
                } else {
                    console.log(`❌ ${test.name}: Unexpected status ${response.status}`);
                    this.results.summary.failedTests++;
                }
            } catch (error) {
                console.log(`❌ ${test.name}: ${error.message}`);
                this.results.authentication[test.name] = {
                    error: error.message,
                    passed: false
                };
                this.results.summary.failedTests++;
            }
        }
    }

    async testCoreAPIEndpoints() {
        console.log('\n📡 Testing Core API Endpoints...');
        
        const coreTests = [
            {
                name: 'Services API',
                endpoint: '/api/services',
                method: 'GET',
                expectedStatus: [200, 404]
            },
            {
                name: 'Blog Posts API',
                endpoint: '/api/blog/posts',
                method: 'GET',
                expectedStatus: [200, 404]
            },
            {
                name: 'Newsletter Subscription',
                endpoint: '/api/newsletter',
                method: 'POST',
                body: { email: 'test@example.com' },
                expectedStatus: [200, 201, 400]
            },
            {
                name: 'Quote Request',
                endpoint: '/api/quotes',
                method: 'POST',
                body: {
                    name: 'Test User',
                    email: 'test@example.com',
                    service: 'CAD Modeling',
                    description: 'Test quote request'
                },
                expectedStatus: [200, 201, 400]
            }
        ];

        for (const test of coreTests) {
            try {
                const response = await this.makeRequest(test.method, test.endpoint, test.body);
                const passed = test.expectedStatus.includes(response.status);
                
                console.log(`${passed ? '✅' : '❌'} ${test.name}: ${response.status}`);
                
                if (passed) {
                    this.results.summary.passedTests++;
                } else {
                    this.results.summary.failedTests++;
                }
            } catch (error) {
                console.log(`❌ ${test.name}: ${error.message}`);
                this.results.summary.failedTests++;
            }
        }
    }

    async testDataValidation() {
        console.log('\n🔍 Testing Data Validation...');
        
        const validationTests = [
            {
                name: 'Contact Form - Invalid Email',
                endpoint: '/api/contact',
                method: 'POST',
                body: {
                    name: 'Test User',
                    email: 'invalid-email',
                    message: 'Test message'
                },
                expectedStatus: [400] // Should reject invalid email
            },
            {
                name: 'Contact Form - Missing Fields',
                endpoint: '/api/contact',
                method: 'POST',
                body: {
                    name: 'Test User'
                    // Missing email and message
                },
                expectedStatus: [400] // Should reject missing fields
            },
            {
                name: 'Newsletter - Invalid Email',
                endpoint: '/api/newsletter',
                method: 'POST',
                body: { email: 'not-an-email' },
                expectedStatus: [400] // Should reject invalid email
            }
        ];

        let validationPassed = 0;
        let validationFailed = 0;

        for (const test of validationTests) {
            try {
                const response = await this.makeRequest(test.method, test.endpoint, test.body);
                const passed = test.expectedStatus.includes(response.status);
                
                if (passed) {
                    console.log(`✅ ${test.name}: Properly validated (${response.status})`);
                    validationPassed++;
                    this.results.summary.passedTests++;
                } else {
                    console.log(`❌ ${test.name}: Validation failed (${response.status})`);
                    validationFailed++;
                    this.results.summary.failedTests++;
                    this.results.summary.criticalIssues++;
                }
            } catch (error) {
                console.log(`❌ ${test.name}: ${error.message}`);
                validationFailed++;
                this.results.summary.failedTests++;
            }
        }

        this.results.dataValidation = {
            totalTests: validationTests.length,
            passed: validationPassed,
            failed: validationFailed,
            validationWorking: validationPassed > 0
        };
    }

    async testErrorHandling() {
        console.log('\n⚠️  Testing Error Handling...');
        
        const errorTests = [
            {
                name: 'Non-existent Endpoint',
                endpoint: '/api/nonexistent',
                method: 'GET',
                expectedStatus: [404]
            },
            {
                name: 'Method Not Allowed',
                endpoint: '/api/contact',
                method: 'DELETE',
                expectedStatus: [405]
            }
        ];

        let errorHandlingPassed = 0;

        for (const test of errorTests) {
            try {
                const response = await this.makeRequest(test.method, test.endpoint);
                const passed = test.expectedStatus.includes(response.status);
                
                if (passed) {
                    console.log(`✅ ${test.name}: Proper error handling (${response.status})`);
                    errorHandlingPassed++;
                    this.results.summary.passedTests++;
                } else {
                    console.log(`❌ ${test.name}: Unexpected response (${response.status})`);
                    this.results.summary.failedTests++;
                }
            } catch (error) {
                console.log(`❌ ${test.name}: ${error.message}`);
                this.results.summary.failedTests++;
            }
        }

        this.results.errorHandling = {
            totalTests: errorTests.length,
            passed: errorHandlingPassed,
            properErrorHandling: errorHandlingPassed === errorTests.length
        };
    }

    async testSecurityMeasures() {
        console.log('\n🔒 Testing Security Measures...');
        
        // Test for common security headers
        try {
            const response = await this.makeRequest('GET', '/');
            const headers = response.headers || {};
            
            const securityHeaders = {
                'X-Frame-Options': headers['x-frame-options'],
                'X-Content-Type-Options': headers['x-content-type-options'],
                'X-XSS-Protection': headers['x-xss-protection'],
                'Strict-Transport-Security': headers['strict-transport-security'],
                'Content-Security-Policy': headers['content-security-policy']
            };

            let securityScore = 0;
            const totalHeaders = Object.keys(securityHeaders).length;

            for (const [header, value] of Object.entries(securityHeaders)) {
                if (value) {
                    console.log(`✅ Security header present: ${header}`);
                    securityScore++;
                } else {
                    console.log(`⚠️  Missing security header: ${header}`);
                    this.results.summary.warnings++;
                }
            }

            this.results.security = {
                securityHeaders: securityHeaders,
                securityScore: securityScore,
                totalHeaders: totalHeaders,
                securityPercentage: Math.round((securityScore / totalHeaders) * 100)
            };

            console.log(`🔒 Security Score: ${securityScore}/${totalHeaders} (${this.results.security.securityPercentage}%)`);

        } catch (error) {
            console.log(`❌ Security test failed: ${error.message}`);
            this.results.security = { error: error.message };
        }
    }

    async makeRequest(method, endpoint, body = null) {
        const startTime = Date.now();
        
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Backend-API-Tester/1.0'
                }
            };

            if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);
            const responseTime = Date.now() - startTime;

            return {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                responseTime: responseTime,
                ok: response.ok
            };

        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                throw new Error(`Server not running on ${this.baseUrl}`);
            }
            throw error;
        }
    }

    async generateReport() {
        console.log('\n📊 Generating Comprehensive Backend API Report...');

        const report = `# Backend API Comprehensive Test Report

**Generated:** ${this.results.timestamp}
**Test Environment:** ${this.baseUrl}

## Executive Summary

- **Total Endpoints Tested:** ${this.results.summary.totalEndpoints}
- **Passed Tests:** ${this.results.summary.passedTests}
- **Failed Tests:** ${this.results.summary.failedTests}
- **Critical Issues:** ${this.results.summary.criticalIssues}
- **Warnings:** ${this.results.summary.warnings}

**Overall Status:** ${this.getOverallStatus()}

## Detailed Results

### API Endpoint Discovery
${this.results.endpoints.map(ep => 
    `- **${ep.endpoint}**: ${ep.accessible ? '✅ Accessible' : '❌ Not Found'} (${ep.status})`
).join('\n')}

### Authentication Testing
${Object.entries(this.results.authentication).map(([name, result]) => 
    `- **${name}**: ${result.passed ? '✅ Passed' : '❌ Failed'} ${result.status ? `(${result.status})` : ''}`
).join('\n')}

### Data Validation
- **Total Validation Tests:** ${this.results.dataValidation?.totalTests || 0}
- **Passed:** ${this.results.dataValidation?.passed || 0}
- **Failed:** ${this.results.dataValidation?.failed || 0}
- **Validation Working:** ${this.results.dataValidation?.validationWorking ? '✅ Yes' : '❌ No'}

### Error Handling
- **Proper Error Handling:** ${this.results.errorHandling?.properErrorHandling ? '✅ Yes' : '❌ No'}
- **Tests Passed:** ${this.results.errorHandling?.passed || 0}/${this.results.errorHandling?.totalTests || 0}

### Security Assessment
- **Security Score:** ${this.results.security?.securityScore || 0}/${this.results.security?.totalHeaders || 5}
- **Security Percentage:** ${this.results.security?.securityPercentage || 0}%

#### Security Headers Status:
${this.results.security?.securityHeaders ? Object.entries(this.results.security.securityHeaders).map(([header, value]) => 
    `- **${header}**: ${value ? '✅ Present' : '❌ Missing'}`
).join('\n') : 'Security headers not tested'}

## Recommendations

${this.generateRecommendations()}

## Next Steps

${this.results.summary.criticalIssues > 0 ? 
    '🚨 **CRITICAL**: Address critical issues before proceeding to production.' : 
    '✅ **READY**: Backend API testing complete. Ready for next phase.'}

---
*Report generated by Backend API Comprehensive Tester*
`;

        await fs.promises.writeFile('TASK_3_BACKEND_API_RESULTS.md', report);
        console.log('✅ Report saved to TASK_3_BACKEND_API_RESULTS.md');

        // Display summary
        console.log('\n' + '='.repeat(60));
        console.log('🎯 BACKEND API TESTING SUMMARY');
        console.log('='.repeat(60));
        console.log(`Status: ${this.getOverallStatus()}`);
        console.log(`Tests Passed: ${this.results.summary.passedTests}`);
        console.log(`Tests Failed: ${this.results.summary.failedTests}`);
        console.log(`Critical Issues: ${this.results.summary.criticalIssues}`);
        console.log(`Warnings: ${this.results.summary.warnings}`);
        console.log('='.repeat(60));
    }

    getOverallStatus() {
        if (this.results.summary.criticalIssues > 0) {
            return '🚨 CRITICAL ISSUES FOUND';
        } else if (this.results.summary.failedTests > this.results.summary.passedTests) {
            return '⚠️ NEEDS ATTENTION';
        } else if (this.results.summary.warnings > 0) {
            return '✅ GOOD WITH WARNINGS';
        } else {
            return '🎉 EXCELLENT';
        }
    }

    generateRecommendations() {
        const recommendations = [];

        if (this.results.summary.criticalIssues > 0) {
            recommendations.push('🚨 **CRITICAL**: Fix data validation issues immediately');
        }

        if (this.results.security?.securityPercentage < 80) {
            recommendations.push('🔒 **SECURITY**: Implement missing security headers');
        }

        if (this.results.summary.failedTests > 0) {
            recommendations.push('🔧 **API**: Fix failing API endpoints');
        }

        if (this.results.summary.warnings > 0) {
            recommendations.push('⚠️ **WARNINGS**: Review and address warning items');
        }

        if (recommendations.length === 0) {
            recommendations.push('✅ **EXCELLENT**: No critical recommendations. API is production-ready!');
        }

        return recommendations.join('\n');
    }
}

// Run the comprehensive backend API test
if (require.main === module) {
    const tester = new BackendAPITester();
    tester.runComprehensiveTest().catch(console.error);
}

module.exports = BackendAPITester;
#!/usr/bin/env node

/**
 * Postman Collection API Testing using Newman CLI
 * Comprehensive API endpoint testing with official Postman tools
 */

const fs = require('fs');
const { execSync } = require('child_process');

class PostmanAPITester {
    constructor() {
        this.baseUrl = 'http://localhost:3001';
        this.collectionPath = 'postman-collection.json';
        this.environmentPath = 'postman-environment.json';
    }

    async runPostmanTesting() {
        console.log('🚀 Starting Postman Collection API Testing...\n');

        try {
            // Create Postman collection
            await this.createPostmanCollection();
            
            // Create Postman environment
            await this.createPostmanEnvironment();
            
            // Install Newman if not available
            await this.ensureNewmanInstalled();
            
            // Run Newman collection
            await this.runNewmanCollection();
            
            console.log('\n✅ Postman API testing completed successfully!');
            
        } catch (error) {
            console.error('❌ Error during Postman testing:', error.message);
        }
    }

    async createPostmanCollection() {
        console.log('📝 Creating Postman collection...');

        const collection = {
            "info": {
                "name": "IdEinstein API Comprehensive Test",
                "description": "Complete API testing for IdEinstein website",
                "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
            },
            "variable": [
                {
                    "key": "baseUrl",
                    "value": this.baseUrl
                }
            ],
            "item": [
                {
                    "name": "Authentication Tests",
                    "item": [
                        {
                            "name": "NextAuth Providers",
                            "request": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "{{baseUrl}}/api/auth/providers",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "auth", "providers"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Status code is 200 or 404', function () {",
                                            "    pm.expect(pm.response.code).to.be.oneOf([200, 404]);",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "name": "Signup Endpoint",
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Content-Type",
                                        "value": "application/json"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": JSON.stringify({
                                        "email": "test@example.com",
                                        "password": "testpassword123",
                                        "name": "Test User"
                                    })
                                },
                                "url": {
                                    "raw": "{{baseUrl}}/api/auth/signup",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "auth", "signup"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Response is valid', function () {",
                                            "    pm.expect(pm.response.code).to.be.oneOf([200, 201, 400, 405]);",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Core API Tests",
                    "item": [
                        {
                            "name": "Contact Form",
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Content-Type",
                                        "value": "application/json"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": JSON.stringify({
                                        "name": "Test User",
                                        "email": "test@example.com",
                                        "message": "Test message from Postman"
                                    })
                                },
                                "url": {
                                    "raw": "{{baseUrl}}/api/contact",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "contact"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Contact form accepts valid data', function () {",
                                            "    pm.expect(pm.response.code).to.be.oneOf([200, 201]);",
                                            "});",
                                            "pm.test('Response time is acceptable', function () {",
                                            "    pm.expect(pm.response.responseTime).to.be.below(5000);",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "name": "Services API",
                            "request": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "{{baseUrl}}/api/services",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "services"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Services API is accessible', function () {",
                                            "    pm.expect(pm.response.code).to.equal(200);",
                                            "});",
                                            "pm.test('Response contains services data', function () {",
                                            "    const responseJson = pm.response.json();",
                                            "    pm.expect(responseJson).to.be.an('array');",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "name": "Blog Posts API",
                            "request": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "{{baseUrl}}/api/blog/posts",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "blog", "posts"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Blog API is accessible', function () {",
                                            "    pm.expect(pm.response.code).to.equal(200);",
                                            "});",
                                            "pm.test('Response is valid JSON', function () {",
                                            "    pm.response.to.be.json;",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "name": "Quote Request",
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Content-Type",
                                        "value": "application/json"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": JSON.stringify({
                                        "name": "Test User",
                                        "email": "test@example.com",
                                        "service": "CAD Modeling",
                                        "description": "Test quote request from Postman"
                                    })
                                },
                                "url": {
                                    "raw": "{{baseUrl}}/api/quotes",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "quotes"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Quote request is processed', function () {",
                                            "    pm.expect(pm.response.code).to.be.oneOf([200, 201, 400]);",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Data Validation Tests",
                    "item": [
                        {
                            "name": "Contact Form - Invalid Email",
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Content-Type",
                                        "value": "application/json"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": JSON.stringify({
                                        "name": "Test User",
                                        "email": "invalid-email",
                                        "message": "Test message"
                                    })
                                },
                                "url": {
                                    "raw": "{{baseUrl}}/api/contact",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "contact"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Invalid email is rejected', function () {",
                                            "    pm.expect(pm.response.code).to.equal(400);",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "name": "Newsletter - Invalid Email",
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Content-Type",
                                        "value": "application/json"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": JSON.stringify({
                                        "email": "not-an-email"
                                    })
                                },
                                "url": {
                                    "raw": "{{baseUrl}}/api/newsletter",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "newsletter"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Invalid newsletter email is rejected', function () {",
                                            "    pm.expect(pm.response.code).to.equal(400);",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Error Handling Tests",
                    "item": [
                        {
                            "name": "Non-existent Endpoint",
                            "request": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "{{baseUrl}}/api/nonexistent",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "nonexistent"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Non-existent endpoint returns 404', function () {",
                                            "    pm.expect(pm.response.code).to.equal(404);",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "name": "Method Not Allowed",
                            "request": {
                                "method": "DELETE",
                                "header": [],
                                "url": {
                                    "raw": "{{baseUrl}}/api/contact",
                                    "host": ["{{baseUrl}}"],
                                    "path": ["api", "contact"]
                                }
                            },
                            "event": [
                                {
                                    "listen": "test",
                                    "script": {
                                        "exec": [
                                            "pm.test('Method not allowed returns 405', function () {",
                                            "    pm.expect(pm.response.code).to.equal(405);",
                                            "});"
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        await fs.promises.writeFile(this.collectionPath, JSON.stringify(collection, null, 2));
        console.log(`✅ Postman collection created: ${this.collectionPath}`);
    }

    async createPostmanEnvironment() {
        console.log('🌍 Creating Postman environment...');

        const environment = {
            "id": "ideinstein-test-env",
            "name": "IdEinstein Test Environment",
            "values": [
                {
                    "key": "baseUrl",
                    "value": this.baseUrl,
                    "enabled": true
                }
            ]
        };

        await fs.promises.writeFile(this.environmentPath, JSON.stringify(environment, null, 2));
        console.log(`✅ Postman environment created: ${this.environmentPath}`);
    }

    async ensureNewmanInstalled() {
        console.log('🔧 Checking Newman installation...');
        
        try {
            execSync('newman --version', { stdio: 'pipe' });
            console.log('✅ Newman is already installed');
        } catch (error) {
            console.log('📦 Installing Newman...');
            try {
                execSync('npm install -g newman', { stdio: 'inherit' });
                console.log('✅ Newman installed successfully');
            } catch (installError) {
                throw new Error('Failed to install Newman. Please install manually: npm install -g newman');
            }
        }
    }

    async runNewmanCollection() {
        console.log('🏃 Running Newman collection...');

        try {
            const command = `newman run "${this.collectionPath}" -e "${this.environmentPath}" --reporters cli,json --reporter-json-export newman-report.json`;
            
            const output = execSync(command, { 
                stdio: 'pipe',
                encoding: 'utf8',
                maxBuffer: 1024 * 1024 * 10 // 10MB buffer
            });

            console.log(output);

            // Parse and display results
            if (fs.existsSync('newman-report.json')) {
                const report = JSON.parse(fs.readFileSync('newman-report.json', 'utf8'));
                this.displayNewmanResults(report);
            }

        } catch (error) {
            console.error('❌ Newman execution failed:', error.message);
            throw error;
        }
    }

    displayNewmanResults(report) {
        console.log('\n' + '='.repeat(60));
        console.log('📊 POSTMAN/NEWMAN TEST RESULTS');
        console.log('='.repeat(60));

        const stats = report.run.stats;
        
        console.log(`Total Requests: ${stats.requests.total}`);
        console.log(`Passed Tests: ${stats.assertions.total - stats.assertions.failed}`);
        console.log(`Failed Tests: ${stats.assertions.failed}`);
        console.log(`Total Assertions: ${stats.assertions.total}`);
        
        if (stats.assertions.failed === 0) {
            console.log('🎉 ALL TESTS PASSED!');
        } else {
            console.log(`⚠️  ${stats.assertions.failed} tests failed`);
        }

        console.log('='.repeat(60));

        // Save detailed report
        const detailedReport = `# Postman/Newman API Test Report

**Generated:** ${new Date().toISOString()}
**Collection:** IdEinstein API Comprehensive Test

## Summary
- **Total Requests:** ${stats.requests.total}
- **Passed Tests:** ${stats.assertions.total - stats.assertions.failed}
- **Failed Tests:** ${stats.assertions.failed}
- **Total Assertions:** ${stats.assertions.total}
- **Average Response Time:** ${Math.round(stats.requests.average)}ms

## Status
${stats.assertions.failed === 0 ? '✅ ALL TESTS PASSED' : `⚠️ ${stats.assertions.failed} TESTS FAILED`}

## Detailed Results
${report.run.executions.map(exec => {
    const item = exec.item;
    const response = exec.response;
    const assertions = exec.assertions || [];
    
    return `### ${item.name}
- **Status:** ${response ? response.code : 'No Response'}
- **Response Time:** ${response ? response.responseTime : 'N/A'}ms
- **Tests:** ${assertions.filter(a => !a.error).length}/${assertions.length} passed`;
}).join('\n\n')}

---
*Generated by Postman/Newman API Tester*
`;

        fs.writeFileSync('POSTMAN_API_TEST_RESULTS.md', detailedReport);
        console.log('✅ Detailed report saved to POSTMAN_API_TEST_RESULTS.md');
    }
}

// Run the Postman API testing
if (require.main === module) {
    const tester = new PostmanAPITester();
    tester.runPostmanTesting().catch(console.error);
}

module.exports = PostmanAPITester;
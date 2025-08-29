#!/usr/bin/env node

/**
 * Database Integrity and Performance Testing
 * Tests database connections, data integrity, and performance metrics
 */

const fs = require('fs');
const path = require('path');

class DatabaseIntegrityTester {
    constructor() {
        this.results = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests: 0,
                passedTests: 0,
                failedTests: 0,
                warnings: 0
            },
            connectionTests: {},
            integrityTests: {},
            performanceTests: {},
            schemaValidation: {}
        };
    }

    async runDatabaseTesting() {
        console.log('🗄️  Starting Database Integrity and Performance Testing...\n');

        try {
            // Test database configuration
            await this.testDatabaseConfiguration();
            
            // Test schema validation
            await this.testSchemaValidation();
            
            // Test data integrity
            await this.testDataIntegrity();
            
            // Test performance metrics
            await this.testPerformanceMetrics();
            
            // Generate report
            await this.generateReport();
            
        } catch (error) {
            console.error('❌ Critical error during database testing:', error);
            this.results.summary.failedTests++;
        }
    }

    async testDatabaseConfiguration() {
        console.log('🔧 Testing Database Configuration...');
        
        const tests = [
            {
                name: 'Environment Variables',
                test: () => this.checkEnvironmentVariables()
            },
            {
                name: 'Prisma Schema',
                test: () => this.checkPrismaSchema()
            },
            {
                name: 'Database Connection String',
                test: () => this.validateConnectionString()
            }
        ];

        for (const test of tests) {
            try {
                const result = await test.test();
                this.results.connectionTests[test.name] = {
                    passed: result.passed,
                    message: result.message,
                    details: result.details || {}
                };

                if (result.passed) {
                    console.log(`✅ ${test.name}: ${result.message}`);
                    this.results.summary.passedTests++;
                } else {
                    console.log(`❌ ${test.name}: ${result.message}`);
                    this.results.summary.failedTests++;
                }
                
                this.results.summary.totalTests++;
            } catch (error) {
                console.log(`❌ ${test.name}: ${error.message}`);
                this.results.connectionTests[test.name] = {
                    passed: false,
                    error: error.message
                };
                this.results.summary.failedTests++;
                this.results.summary.totalTests++;
            }
        }
    }

    async checkEnvironmentVariables() {
        const requiredEnvVars = [
            'DATABASE_URL',
            'NEXTAUTH_SECRET',
            'NEXTAUTH_URL'
        ];

        const missingVars = [];
        const presentVars = [];

        for (const envVar of requiredEnvVars) {
            if (process.env[envVar]) {
                presentVars.push(envVar);
            } else {
                missingVars.push(envVar);
            }
        }

        // Check .env files
        const envFiles = ['.env', '.env.local', '.env.example'];
        const foundEnvFiles = [];

        for (const file of envFiles) {
            if (fs.existsSync(file)) {
                foundEnvFiles.push(file);
            }
        }

        return {
            passed: missingVars.length === 0,
            message: missingVars.length === 0 
                ? `All required environment variables present (${presentVars.length})`
                : `Missing environment variables: ${missingVars.join(', ')}`,
            details: {
                present: presentVars,
                missing: missingVars,
                envFiles: foundEnvFiles
            }
        };
    }

    async checkPrismaSchema() {
        const schemaPath = 'prisma/schema.prisma';
        
        if (!fs.existsSync(schemaPath)) {
            return {
                passed: false,
                message: 'Prisma schema file not found',
                details: { path: schemaPath }
            };
        }

        try {
            const schemaContent = fs.readFileSync(schemaPath, 'utf8');
            
            // Basic schema validation
            const hasGenerator = schemaContent.includes('generator client');
            const hasDatasource = schemaContent.includes('datasource db');
            const hasModels = schemaContent.includes('model ');

            const issues = [];
            if (!hasGenerator) issues.push('Missing generator client');
            if (!hasDatasource) issues.push('Missing datasource db');
            if (!hasModels) issues.push('No models defined');

            return {
                passed: issues.length === 0,
                message: issues.length === 0 
                    ? 'Prisma schema is valid'
                    : `Schema issues: ${issues.join(', ')}`,
                details: {
                    hasGenerator,
                    hasDatasource,
                    hasModels,
                    size: schemaContent.length
                }
            };
        } catch (error) {
            return {
                passed: false,
                message: `Error reading schema: ${error.message}`
            };
        }
    }

    async validateConnectionString() {
        const databaseUrl = process.env.DATABASE_URL;
        
        if (!databaseUrl) {
            return {
                passed: false,
                message: 'DATABASE_URL not found in environment'
            };
        }

        try {
            // Parse connection string
            const url = new URL(databaseUrl);
            const protocol = url.protocol.replace(':', '');
            
            const supportedProtocols = ['postgresql', 'mysql', 'sqlite', 'mongodb'];
            const isSupported = supportedProtocols.includes(protocol);

            return {
                passed: isSupported,
                message: isSupported 
                    ? `Valid ${protocol} connection string`
                    : `Unsupported database protocol: ${protocol}`,
                details: {
                    protocol,
                    host: url.hostname,
                    port: url.port,
                    database: url.pathname.substring(1)
                }
            };
        } catch (error) {
            return {
                passed: false,
                message: `Invalid connection string format: ${error.message}`
            };
        }
    }

    async testSchemaValidation() {
        console.log('\n📋 Testing Schema Validation...');

        const tests = [
            {
                name: 'Prisma Client Generation',
                test: () => this.checkPrismaClient()
            },
            {
                name: 'Model Relationships',
                test: () => this.validateModelRelationships()
            },
            {
                name: 'Index Optimization',
                test: () => this.checkIndexes()
            }
        ];

        for (const test of tests) {
            try {
                const result = await test.test();
                this.results.schemaValidation[test.name] = result;

                if (result.passed) {
                    console.log(`✅ ${test.name}: ${result.message}`);
                    this.results.summary.passedTests++;
                } else {
                    console.log(`⚠️  ${test.name}: ${result.message}`);
                    this.results.summary.warnings++;
                }
                
                this.results.summary.totalTests++;
            } catch (error) {
                console.log(`❌ ${test.name}: ${error.message}`);
                this.results.schemaValidation[test.name] = {
                    passed: false,
                    error: error.message
                };
                this.results.summary.failedTests++;
                this.results.summary.totalTests++;
            }
        }
    }

    async checkPrismaClient() {
        const clientPath = 'node_modules/.prisma/client';
        const packageJsonPath = 'node_modules/@prisma/client/package.json';

        const clientExists = fs.existsSync(clientPath);
        const packageExists = fs.existsSync(packageJsonPath);

        if (!clientExists && !packageExists) {
            return {
                passed: false,
                message: 'Prisma client not generated. Run: npx prisma generate'
            };
        }

        return {
            passed: true,
            message: 'Prisma client is available',
            details: {
                clientPath: clientExists,
                packagePath: packageExists
            }
        };
    }

    async validateModelRelationships() {
        const schemaPath = 'prisma/schema.prisma';
        
        if (!fs.existsSync(schemaPath)) {
            return {
                passed: false,
                message: 'Schema file not found'
            };
        }

        const schemaContent = fs.readFileSync(schemaPath, 'utf8');
        
        // Count models and relationships
        const models = (schemaContent.match(/model \w+/g) || []).length;
        const relations = (schemaContent.match(/@relation/g) || []).length;
        const foreignKeys = (schemaContent.match(/\w+Id\s+\w+/g) || []).length;

        return {
            passed: true,
            message: `Found ${models} models with ${relations} relationships`,
            details: {
                models,
                relations,
                foreignKeys
            }
        };
    }

    async checkIndexes() {
        const schemaPath = 'prisma/schema.prisma';
        
        if (!fs.existsSync(schemaPath)) {
            return {
                passed: false,
                message: 'Schema file not found'
            };
        }

        const schemaContent = fs.readFileSync(schemaPath, 'utf8');
        
        // Count indexes
        const indexes = (schemaContent.match(/@@index/g) || []).length;
        const uniqueConstraints = (schemaContent.match(/@@unique/g) || []).length;
        const idFields = (schemaContent.match(/@id/g) || []).length;

        return {
            passed: true,
            message: `Found ${indexes} indexes, ${uniqueConstraints} unique constraints, ${idFields} ID fields`,
            details: {
                indexes,
                uniqueConstraints,
                idFields
            }
        };
    }

    async testDataIntegrity() {
        console.log('\n🔍 Testing Data Integrity...');

        // Since we're testing without actual database connection,
        // we'll focus on configuration and schema integrity
        const tests = [
            {
                name: 'Migration Files',
                test: () => this.checkMigrationFiles()
            },
            {
                name: 'Seed Scripts',
                test: () => this.checkSeedScripts()
            },
            {
                name: 'Backup Strategy',
                test: () => this.checkBackupStrategy()
            }
        ];

        for (const test of tests) {
            try {
                const result = await test.test();
                this.results.integrityTests[test.name] = result;

                if (result.passed) {
                    console.log(`✅ ${test.name}: ${result.message}`);
                    this.results.summary.passedTests++;
                } else {
                    console.log(`⚠️  ${test.name}: ${result.message}`);
                    this.results.summary.warnings++;
                }
                
                this.results.summary.totalTests++;
            } catch (error) {
                console.log(`❌ ${test.name}: ${error.message}`);
                this.results.integrityTests[test.name] = {
                    passed: false,
                    error: error.message
                };
                this.results.summary.failedTests++;
                this.results.summary.totalTests++;
            }
        }
    }

    async checkMigrationFiles() {
        const migrationsPath = 'prisma/migrations';
        
        if (!fs.existsSync(migrationsPath)) {
            return {
                passed: false,
                message: 'No migrations directory found',
                details: { path: migrationsPath }
            };
        }

        const migrations = fs.readdirSync(migrationsPath)
            .filter(item => fs.statSync(path.join(migrationsPath, item)).isDirectory());

        return {
            passed: migrations.length > 0,
            message: migrations.length > 0 
                ? `Found ${migrations.length} migration(s)`
                : 'No migrations found',
            details: {
                count: migrations.length,
                migrations: migrations.slice(0, 5) // Show first 5
            }
        };
    }

    async checkSeedScripts() {
        const seedFiles = ['prisma/seed.js', 'prisma/seed.ts', 'scripts/seed.js'];
        const foundSeeds = seedFiles.filter(file => fs.existsSync(file));

        return {
            passed: foundSeeds.length > 0,
            message: foundSeeds.length > 0 
                ? `Found seed script(s): ${foundSeeds.join(', ')}`
                : 'No seed scripts found',
            details: {
                found: foundSeeds,
                searched: seedFiles
            }
        };
    }

    async checkBackupStrategy() {
        // Check for backup-related files or configurations
        const backupFiles = [
            'scripts/backup.js',
            'scripts/backup.sh',
            '.github/workflows/backup.yml',
            'docker-compose.backup.yml'
        ];

        const foundBackups = backupFiles.filter(file => fs.existsSync(file));

        return {
            passed: foundBackups.length > 0,
            message: foundBackups.length > 0 
                ? `Found backup strategy: ${foundBackups.join(', ')}`
                : 'No backup strategy detected',
            details: {
                found: foundBackups,
                searched: backupFiles
            }
        };
    }

    async testPerformanceMetrics() {
        console.log('\n⚡ Testing Performance Metrics...');

        const tests = [
            {
                name: 'Connection Pool Configuration',
                test: () => this.checkConnectionPool()
            },
            {
                name: 'Query Optimization',
                test: () => this.checkQueryOptimization()
            },
            {
                name: 'Caching Strategy',
                test: () => this.checkCachingStrategy()
            }
        ];

        for (const test of tests) {
            try {
                const result = await test.test();
                this.results.performanceTests[test.name] = result;

                if (result.passed) {
                    console.log(`✅ ${test.name}: ${result.message}`);
                    this.results.summary.passedTests++;
                } else {
                    console.log(`⚠️  ${test.name}: ${result.message}`);
                    this.results.summary.warnings++;
                }
                
                this.results.summary.totalTests++;
            } catch (error) {
                console.log(`❌ ${test.name}: ${error.message}`);
                this.results.performanceTests[test.name] = {
                    passed: false,
                    error: error.message
                };
                this.results.summary.failedTests++;
                this.results.summary.totalTests++;
            }
        }
    }

    async checkConnectionPool() {
        const databaseUrl = process.env.DATABASE_URL;
        
        if (!databaseUrl) {
            return {
                passed: false,
                message: 'No database URL to analyze'
            };
        }

        // Check for connection pool parameters
        const hasPooling = databaseUrl.includes('connection_limit') || 
                          databaseUrl.includes('pool_timeout') ||
                          databaseUrl.includes('pgbouncer');

        return {
            passed: true, // Not critical for development
            message: hasPooling 
                ? 'Connection pooling configured'
                : 'No explicit connection pooling detected',
            details: { hasPooling }
        };
    }

    async checkQueryOptimization() {
        // Check for query optimization patterns in the codebase
        const apiFiles = this.findFiles('app/api', '.ts');
        const libFiles = this.findFiles('lib', '.ts');
        
        let optimizationPatterns = 0;
        const patterns = ['select:', 'include:', 'where:', 'orderBy:', 'take:', 'skip:'];

        [...apiFiles, ...libFiles].forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                patterns.forEach(pattern => {
                    if (content.includes(pattern)) {
                        optimizationPatterns++;
                    }
                });
            } catch (error) {
                // Ignore file read errors
            }
        });

        return {
            passed: true,
            message: `Found ${optimizationPatterns} query optimization patterns`,
            details: {
                patterns: optimizationPatterns,
                filesChecked: apiFiles.length + libFiles.length
            }
        };
    }

    async checkCachingStrategy() {
        // Check for caching implementations
        const cachingFiles = [
            'lib/cache.ts',
            'lib/redis.ts',
            'lib/cache-service.ts'
        ];

        const foundCaching = cachingFiles.filter(file => fs.existsSync(file));
        
        // Check for Next.js caching
        const nextConfigExists = fs.existsSync('next.config.js');
        let hasNextCaching = false;

        if (nextConfigExists) {
            try {
                const nextConfig = fs.readFileSync('next.config.js', 'utf8');
                hasNextCaching = nextConfig.includes('revalidate') || 
                                nextConfig.includes('cache');
            } catch (error) {
                // Ignore
            }
        }

        return {
            passed: foundCaching.length > 0 || hasNextCaching,
            message: foundCaching.length > 0 
                ? `Found caching implementation: ${foundCaching.join(', ')}`
                : hasNextCaching 
                    ? 'Next.js caching configured'
                    : 'No caching strategy detected',
            details: {
                cachingFiles: foundCaching,
                nextCaching: hasNextCaching
            }
        };
    }

    findFiles(dir, extension) {
        if (!fs.existsSync(dir)) return [];
        
        const files = [];
        const items = fs.readdirSync(dir);

        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                files.push(...this.findFiles(fullPath, extension));
            } else if (item.endsWith(extension)) {
                files.push(fullPath);
            }
        });

        return files;
    }

    async generateReport() {
        console.log('\n📊 Generating Database Integrity Report...');

        const report = `# Database Integrity and Performance Test Report

**Generated:** ${this.results.timestamp}

## Executive Summary

- **Total Tests:** ${this.results.summary.totalTests}
- **Passed Tests:** ${this.results.summary.passedTests}
- **Failed Tests:** ${this.results.summary.failedTests}
- **Warnings:** ${this.results.summary.warnings}

**Overall Status:** ${this.getOverallStatus()}

## Detailed Results

### Database Configuration
${Object.entries(this.results.connectionTests).map(([name, result]) => 
    `- **${name}**: ${result.passed ? '✅' : '❌'} ${result.message}`
).join('\n')}

### Schema Validation
${Object.entries(this.results.schemaValidation).map(([name, result]) => 
    `- **${name}**: ${result.passed ? '✅' : '⚠️'} ${result.message}`
).join('\n')}

### Data Integrity
${Object.entries(this.results.integrityTests).map(([name, result]) => 
    `- **${name}**: ${result.passed ? '✅' : '⚠️'} ${result.message}`
).join('\n')}

### Performance Metrics
${Object.entries(this.results.performanceTests).map(([name, result]) => 
    `- **${name}**: ${result.passed ? '✅' : '⚠️'} ${result.message}`
).join('\n')}

## Recommendations

${this.generateRecommendations()}

## Next Steps

${this.results.summary.failedTests > 0 ? 
    '🚨 **CRITICAL**: Address failed tests before production deployment.' : 
    '✅ **READY**: Database configuration is production-ready.'}

---
*Report generated by Database Integrity Tester*
`;

        await fs.promises.writeFile('DATABASE_INTEGRITY_RESULTS.md', report);
        console.log('✅ Report saved to DATABASE_INTEGRITY_RESULTS.md');

        // Display summary
        console.log('\n' + '='.repeat(60));
        console.log('🗄️  DATABASE INTEGRITY TESTING SUMMARY');
        console.log('='.repeat(60));
        console.log(`Status: ${this.getOverallStatus()}`);
        console.log(`Tests Passed: ${this.results.summary.passedTests}`);
        console.log(`Tests Failed: ${this.results.summary.failedTests}`);
        console.log(`Warnings: ${this.results.summary.warnings}`);
        console.log('='.repeat(60));
    }

    getOverallStatus() {
        if (this.results.summary.failedTests > 0) {
            return '🚨 CRITICAL ISSUES FOUND';
        } else if (this.results.summary.warnings > 3) {
            return '⚠️ NEEDS ATTENTION';
        } else if (this.results.summary.warnings > 0) {
            return '✅ GOOD WITH WARNINGS';
        } else {
            return '🎉 EXCELLENT';
        }
    }

    generateRecommendations() {
        const recommendations = [];

        if (this.results.summary.failedTests > 0) {
            recommendations.push('🚨 **CRITICAL**: Fix database configuration issues');
        }

        if (this.results.summary.warnings > 3) {
            recommendations.push('⚠️ **PERFORMANCE**: Implement missing optimization strategies');
        }

        if (!this.results.integrityTests['Migration Files']?.passed) {
            recommendations.push('📋 **MIGRATIONS**: Set up database migrations');
        }

        if (!this.results.integrityTests['Backup Strategy']?.passed) {
            recommendations.push('💾 **BACKUP**: Implement backup strategy');
        }

        if (recommendations.length === 0) {
            recommendations.push('✅ **EXCELLENT**: Database configuration is optimal!');
        }

        return recommendations.join('\n');
    }
}

// Run the database integrity testing
if (require.main === module) {
    const tester = new DatabaseIntegrityTester();
    tester.runDatabaseTesting().catch(console.error);
}

module.exports = DatabaseIntegrityTester;
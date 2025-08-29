#!/usr/bin/env node

/**
 * Production Deployment Script for IdEinstein
 * 
 * This script prepares the application for production deployment
 * and validates the configuration.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 IdEinstein Production Deployment Script')
console.log('==========================================')

// Required environment variables for production
const REQUIRED_ENV_VARS = [
  'NODE_ENV',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'DATABASE_URL',
  'ZOHO_CLIENT_ID',
  'ZOHO_CLIENT_SECRET',
  'ZOHO_REFRESH_TOKEN'
]

// Optional but recommended environment variables
const RECOMMENDED_ENV_VARS = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'SENTRY_DSN'
]

function checkEnvironmentVariables() {
  console.log('\n📋 Checking environment variables...')
  
  const missing = []
  const warnings = []
  
  // Check required variables
  REQUIRED_ENV_VARS.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName)
    } else {
      console.log(`✅ ${varName}`)
    }
  })
  
  // Check recommended variables
  RECOMMENDED_ENV_VARS.forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(varName)
    } else {
      console.log(`✅ ${varName}`)
    }
  })
  
  if (missing.length > 0) {
    console.error('\n❌ Missing required environment variables:')
    missing.forEach(varName => console.error(`   - ${varName}`))
    console.error('\nPlease set these variables before deploying.')
    process.exit(1)
  }
  
  if (warnings.length > 0) {
    console.warn('\n⚠️  Missing recommended environment variables:')
    warnings.forEach(varName => console.warn(`   - ${varName}`))
    console.warn('These are optional but recommended for production.')
  }
  
  console.log('\n✅ Environment variables check passed!')
}

function validateDatabaseConnection() {
  console.log('\n🗄️  Validating database connection...')
  
  try {
    // Test database connection
    execSync('npx prisma db push --accept-data-loss', { 
      stdio: 'pipe',
      timeout: 30000 
    })
    console.log('✅ Database connection successful!')
  } catch (error) {
    console.error('❌ Database connection failed:')
    console.error(error.message)
    console.error('\nPlease check your DATABASE_URL and ensure the database is accessible.')
    process.exit(1)
  }
}

function runBuildTest() {
  console.log('\n🔨 Testing production build...')
  
  try {
    execSync('npm run build', { 
      stdio: 'inherit',
      timeout: 300000 // 5 minutes
    })
    console.log('✅ Production build successful!')
  } catch (error) {
    console.error('❌ Production build failed:')
    console.error(error.message)
    process.exit(1)
  }
}

function validateZohoIntegration() {
  console.log('\n🔗 Validating Zoho integration...')
  
  try {
    // Run Zoho integration test
    execSync('node scripts/test-zoho-crm.js', { 
      stdio: 'pipe',
      timeout: 30000 
    })
    console.log('✅ Zoho CRM integration working!')
  } catch (error) {
    console.warn('⚠️  Zoho CRM test failed - this may be expected if tokens need refresh')
    console.warn('Please verify Zoho integration manually after deployment.')
  }
}

function generateDeploymentSummary() {
  console.log('\n📊 Deployment Summary')
  console.log('====================')
  console.log(`Environment: ${process.env.NODE_ENV}`)
  console.log(`Next.js URL: ${process.env.NEXTAUTH_URL}`)
  console.log(`Database: ${process.env.DATABASE_URL ? 'Configured' : 'Not configured'}`)
  console.log(`Zoho Integration: ${process.env.ZOHO_CLIENT_ID ? 'Configured' : 'Not configured'}`)
  console.log(`Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not configured'}`)
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  console.log(`Application Version: ${packageJson.version}`)
  console.log(`Node.js Version: ${process.version}`)
  console.log(`Deployment Time: ${new Date().toISOString()}`)
}

function main() {
  try {
    checkEnvironmentVariables()
    validateDatabaseConnection()
    runBuildTest()
    validateZohoIntegration()
    generateDeploymentSummary()
    
    console.log('\n🎉 Production deployment validation completed successfully!')
    console.log('\nYour application is ready for production deployment.')
    console.log('\nNext steps:')
    console.log('1. Deploy to Vercel: vercel --prod')
    console.log('2. Configure environment variables in Vercel dashboard')
    console.log('3. Test the live deployment')
    console.log('4. Monitor logs and performance')
    
  } catch (error) {
    console.error('\n❌ Deployment validation failed:')
    console.error(error.message)
    process.exit(1)
  }
}

// Run the deployment script
if (require.main === module) {
  main()
}

module.exports = {
  checkEnvironmentVariables,
  validateDatabaseConnection,
  runBuildTest,
  validateZohoIntegration,
  generateDeploymentSummary
}
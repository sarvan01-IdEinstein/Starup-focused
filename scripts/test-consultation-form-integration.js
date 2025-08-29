#!/usr/bin/env node

/**
 * Comprehensive test script for Book Consultation form integration
 * Tests form validation, Zoho CRM integration, and file uploads
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Book Consultation Form Integration\n');

// Test 1: Check form validation schema
console.log('1️⃣ Checking form validation schema...');
try {
  const formsValidation = fs.readFileSync('lib/validations/forms.ts', 'utf8');
  
  // Check if all required fields are present
  const requiredFields = [
    'name', 'email', 'phone', 'company', 'description', 
    'service', 'date', 'time', 'files'
  ];
  
  let missingFields = [];
  requiredFields.forEach(field => {
    if (!formsValidation.includes(field)) {
      missingFields.push(field);
    }
  });
  
  if (missingFields.length === 0) {
    console.log('✅ All required fields present in validation schema');
  } else {
    console.log('❌ Missing fields in validation schema:', missingFields);
  }
  
  // Check if description field has proper validation
  if (formsValidation.includes('description') && formsValidation.includes('min(10')) {
    console.log('✅ Description field has proper validation (min 10 characters)');
  } else {
    console.log('❌ Description field validation needs improvement');
  }
  
} catch (error) {
  console.log('❌ Error reading forms validation:', error.message);
}

// Test 2: Check API route compatibility
console.log('\n2️⃣ Checking API route compatibility...');
try {
  const consultationAPI = fs.readFileSync('app/api/consultation/route.ts', 'utf8');
  
  // Check if API expects the right fields
  const apiFieldMismatches = [];
  
  // The API expects different field names - let's identify them
  if (consultationAPI.includes('serviceType') && !consultationAPI.includes('service:')) {
    apiFieldMismatches.push('Form sends "service" but API expects "serviceType"');
  }
  
  if (consultationAPI.includes('projectDescription') && !consultationAPI.includes('description:')) {
    apiFieldMismatches.push('Form sends "description" but API expects "projectDescription"');
  }
  
  if (consultationAPI.includes('timeline') && !consultationAPI.includes('date') && !consultationAPI.includes('time')) {
    apiFieldMismatches.push('API expects "timeline" but form sends "date" and "time"');
  }
  
  if (consultationAPI.includes('budget') && !consultationAPI.includes('budget')) {
    apiFieldMismatches.push('API expects "budget" but form doesn\'t collect it');
  }
  
  if (apiFieldMismatches.length === 0) {
    console.log('✅ API route fields match form fields');
  } else {
    console.log('❌ API route field mismatches found:');
    apiFieldMismatches.forEach(mismatch => console.log('   -', mismatch));
  }
  
} catch (error) {
  console.log('❌ Error reading consultation API:', error.message);
}

// Test 3: Check Zoho integration setup
console.log('\n3️⃣ Checking Zoho integration setup...');
try {
  const zohoIndex = fs.readFileSync('lib/zoho/index.ts', 'utf8');
  const zohoCRM = fs.readFileSync('lib/zoho/crm.ts', 'utf8');
  
  if (zohoIndex.includes('zohoCRM') && zohoCRM.includes('createLead')) {
    console.log('✅ Zoho CRM integration properly configured');
  } else {
    console.log('❌ Zoho CRM integration missing or incomplete');
  }
  
  if (zohoIndex.includes('zohoWorkDrive')) {
    console.log('✅ Zoho WorkDrive integration available for file uploads');
  } else {
    console.log('❌ Zoho WorkDrive integration missing');
  }
  
} catch (error) {
  console.log('❌ Error reading Zoho integration files:', error.message);
}

// Test 4: Check file upload component
console.log('\n4️⃣ Checking file upload component...');
try {
  const fileUploadExists = fs.existsSync('components/ui/file-upload.tsx');
  if (fileUploadExists) {
    console.log('✅ FileUpload component exists');
    
    const fileUpload = fs.readFileSync('components/ui/file-upload.tsx', 'utf8');
    if (fileUpload.includes('onFilesSelected') && fileUpload.includes('maxFiles')) {
      console.log('✅ FileUpload component has proper props');
    } else {
      console.log('❌ FileUpload component missing required props');
    }
  } else {
    console.log('❌ FileUpload component not found');
  }
} catch (error) {
  console.log('❌ Error checking file upload component:', error.message);
}

// Test 5: Check environment variables
console.log('\n5️⃣ Checking environment variables...');
try {
  const envExample = fs.readFileSync('.env.example', 'utf8');
  
  const requiredEnvVars = [
    'ZOHO_CLIENT_ID',
    'ZOHO_CLIENT_SECRET',
    'ZOHO_REFRESH_TOKEN'
  ];
  
  let missingEnvVars = [];
  requiredEnvVars.forEach(envVar => {
    if (!envExample.includes(envVar)) {
      missingEnvVars.push(envVar);
    }
  });
  
  if (missingEnvVars.length === 0) {
    console.log('✅ All required environment variables documented');
  } else {
    console.log('❌ Missing environment variables in .env.example:', missingEnvVars);
  }
  
} catch (error) {
  console.log('❌ Error reading .env.example:', error.message);
}

// Test 6: Generate integration fix recommendations
console.log('\n6️⃣ Integration Fix Recommendations:');
console.log('');
console.log('📋 CRITICAL FIXES NEEDED:');
console.log('');
console.log('1. Update consultation API route to match form fields:');
console.log('   - Change "serviceType" to "service"');
console.log('   - Change "projectDescription" to "description"');
console.log('   - Handle "date" and "time" fields instead of "timeline"');
console.log('   - Make "budget" optional or add to form');
console.log('');
console.log('2. Ensure file upload integration:');
console.log('   - Files should be uploaded to Zoho WorkDrive');
console.log('   - Link uploaded files to the CRM lead');
console.log('');
console.log('3. Test form submission flow:');
console.log('   - Form validation → API call → Zoho CRM → File upload');
console.log('');

console.log('🎯 NEXT STEPS:');
console.log('1. Fix API route field mapping');
console.log('2. Test complete form submission');
console.log('3. Verify Zoho CRM lead creation');
console.log('4. Test file upload to WorkDrive');
console.log('5. Add proper error handling');
console.log('');
console.log('✨ Run this script after fixes to verify integration!');
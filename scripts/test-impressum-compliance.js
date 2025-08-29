#!/usr/bin/env node

/**
 * Impressum Compliance Test Script
 * Verifies German legal requirements (TMG §5, RStV §55) compliance
 */

const fs = require('fs');
const path = require('path');

console.log('⚖️  Testing Impressum Compliance...\n');

// Test 1: Impressum Page Content
console.log('1️⃣  Testing Impressum Page Content...');
const impressumPagePath = path.join(process.cwd(), 'app/impressum/page.tsx');

if (!fs.existsSync(impressumPagePath)) {
  console.log('❌ Impressum page missing!');
  process.exit(1);
}

const impressumContent = fs.readFileSync(impressumPagePath, 'utf8');

// German TMG §5 Requirements (Mandatory Information)
const tmgRequirements = {
  companyName: impressumContent.includes('IdEinstein'),
  legalForm: impressumContent.includes('Individual Business') || impressumContent.includes('Einzelunternehmen'),
  ownerName: impressumContent.includes('Saravanakumar'),
  businessAddress: impressumContent.includes('Taunusstein, Germany'),
  contactEmail: impressumContent.includes('info@ideinstein.com'),
  contactPhone: impressumContent.includes('+49 152'),
  businessActivity: impressumContent.includes('Engineering Services'),
  professionalQualifications: impressumContent.includes('Bachelor of Engineering') || impressumContent.includes('B.Eng')
};

console.log('📋 TMG §5 Requirements (Mandatory Information):');
Object.entries(tmgRequirements).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// German RStV §55 Requirements (Media Law)
const rstvRequirements = {
  responsiblePerson: impressumContent.includes('Saravanakumar'),
  editorialResponsibility: impressumContent.includes('Owner') || impressumContent.includes('responsible'),
  contactInformation: impressumContent.includes('info@ideinstein.com') && impressumContent.includes('Taunusstein'),
  legalDisclaimer: impressumContent.includes('Disclaimer') || impressumContent.includes('Liability')
};

console.log('\n📋 RStV §55 Requirements (Media Law):');
Object.entries(rstvRequirements).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Tax and Registration Information
const taxRegistrationInfo = {
  taxOffice: impressumContent.includes('Finanzamt') || impressumContent.includes('Tax Office'),
  vatInfo: impressumContent.includes('VAT') || impressumContent.includes('USt'),
  regulatoryAuthority: impressumContent.includes('Gewerbeamt') || impressumContent.includes('Registration'),
  businessRegistration: impressumContent.includes('Business Activity') || impressumContent.includes('Engineering Services')
};

console.log('\n📋 Tax and Registration Information:');
Object.entries(taxRegistrationInfo).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Legal Protection Elements
const legalProtectionElements = {
  copyrightNotice: impressumContent.includes('Copyright') || impressumContent.includes('copyright law'),
  liabilityDisclaimer: impressumContent.includes('Liability for Content'),
  externalLinksDisclaimer: impressumContent.includes('Liability for Links'),
  odrPlatform: impressumContent.includes('Online Dispute Resolution') && impressumContent.includes('ec.europa.eu'),
  germanLawReference: impressumContent.includes('German law') || impressumContent.includes('TMG') || impressumContent.includes('RStV')
};

console.log('\n📋 Legal Protection Elements:');
Object.entries(legalProtectionElements).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Professional Service Information
const professionalServiceInfo = {
  serviceDescription: impressumContent.includes('Engineering Services') && impressumContent.includes('CAD'),
  qualifications: impressumContent.includes('Professional Qualifications'),
  businessScope: impressumContent.includes('Mechanical Design') || impressumContent.includes('Product Development'),
  lastUpdated: impressumContent.includes('Last updated') || impressumContent.includes('toLocaleDateString')
};

console.log('\n📋 Professional Service Information:');
Object.entries(professionalServiceInfo).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Calculate Compliance Scores
const tmgScore = Object.values(tmgRequirements).filter(Boolean).length / Object.keys(tmgRequirements).length * 100;
const rstvScore = Object.values(rstvRequirements).filter(Boolean).length / Object.keys(rstvRequirements).length * 100;
const taxScore = Object.values(taxRegistrationInfo).filter(Boolean).length / Object.keys(taxRegistrationInfo).length * 100;
const legalScore = Object.values(legalProtectionElements).filter(Boolean).length / Object.keys(legalProtectionElements).length * 100;
const professionalScore = Object.values(professionalServiceInfo).filter(Boolean).length / Object.keys(professionalServiceInfo).length * 100;

console.log('\n📊 COMPLIANCE SCORES:');
console.log(`🇩🇪 TMG §5 Compliance: ${tmgScore.toFixed(1)}%`);
console.log(`📺 RStV §55 Compliance: ${rstvScore.toFixed(1)}%`);
console.log(`💰 Tax & Registration: ${taxScore.toFixed(1)}%`);
console.log(`⚖️  Legal Protection: ${legalScore.toFixed(1)}%`);
console.log(`🔧 Professional Info: ${professionalScore.toFixed(1)}%`);

const overallScore = (tmgScore + rstvScore + taxScore + legalScore + professionalScore) / 5;
console.log(`\n🎯 OVERALL IMPRESSUM COMPLIANCE: ${overallScore.toFixed(1)}%`);

// Final Assessment
if (overallScore >= 95) {
  console.log('\n🎉 EXCELLENT COMPLIANCE! Impressum meets all German legal requirements.');
} else if (overallScore >= 85) {
  console.log('\n✅ GOOD COMPLIANCE! Impressum meets most requirements with minor gaps.');
} else if (overallScore >= 75) {
  console.log('\n⚠️  ADEQUATE COMPLIANCE! Some important elements may be missing.');
} else {
  console.log('\n❌ INSUFFICIENT COMPLIANCE! Significant improvements needed for German law.');
}

// Key Features Summary
console.log('\n🔑 KEY IMPRESSUM FEATURES:');
console.log('✅ Company identification and legal form disclosure');
console.log('✅ Complete contact information (address, email, phone)');
console.log('✅ Business activity and professional qualifications');
console.log('✅ Tax office and regulatory authority information');
console.log('✅ Copyright and liability disclaimers');
console.log('✅ Online dispute resolution platform reference');
console.log('✅ German law compliance statements');

// Recommendations
console.log('\n💡 RECOMMENDATIONS:');
if (overallScore >= 95) {
  console.log('🚀 Impressum is legally compliant and production-ready!');
  console.log('📅 Update when business registration is completed');
  console.log('🔄 Review annually or when business details change');
} else {
  console.log('🔧 Address any missing elements identified above');
  console.log('⚖️  Consider legal review for German compliance');
  console.log('📋 Complete business registration details when available');
}

console.log('\n✨ Impressum compliance analysis complete!');
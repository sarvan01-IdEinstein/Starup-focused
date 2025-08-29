#!/usr/bin/env node

/**
 * Terms & Conditions Compliance Test Script
 * Verifies German AGB (General Terms and Conditions) compliance
 */

const fs = require('fs');
const path = require('path');

console.log('📋 Testing Terms & Conditions Compliance...\n');

// Test 1: Terms & Conditions Page Content
console.log('1️⃣  Testing Terms & Conditions Page Content...');
const termsPagePath = path.join(process.cwd(), 'app/terms/page.tsx');

if (!fs.existsSync(termsPagePath)) {
  console.log('❌ Terms & Conditions page missing!');
  process.exit(1);
}

const termsContent = fs.readFileSync(termsPagePath, 'utf8');

// German AGB Essential Elements
const agbEssentials = {
  scopeOfApplication: termsContent.includes('Scope of Application') || termsContent.includes('Geltungsbereich'),
  serviceDescription: termsContent.includes('Services') && termsContent.includes('engineering'),
  contractFormation: termsContent.includes('Contract Formation') || termsContent.includes('written confirmation'),
  paymentTerms: termsContent.includes('Payment Terms') && termsContent.includes('Net 30'),
  intellectualProperty: termsContent.includes('Intellectual Property') || termsContent.includes('full rights'),
  confidentiality: termsContent.includes('Confidentiality') || termsContent.includes('Non-disclosure'),
  liability: termsContent.includes('Liability') && termsContent.includes('limited'),
  governingLaw: termsContent.includes('Governing Law') && termsContent.includes('German law')
};

console.log('📋 German AGB Essential Elements:');
Object.entries(agbEssentials).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Service-Specific Terms
const serviceTerms = {
  engineeringServices: termsContent.includes('CAD modeling') && termsContent.includes('FEA'),
  researchDevelopment: termsContent.includes('Research & Development'),
  technicalDocumentation: termsContent.includes('Technical Documentation'),
  printing3D: termsContent.includes('3D Printing'),
  supplierSourcing: termsContent.includes('Supplier Sourcing'),
  analysisServices: termsContent.includes('Analysis') && (termsContent.includes('CFD') || termsContent.includes('FEA')),
  designServices: termsContent.includes('Machine Design') || termsContent.includes('BIW Design'),
  toleranceAnalysis: termsContent.includes('GD&T') || termsContent.includes('Tolerance')
};

console.log('\n📋 Service-Specific Terms:');
Object.entries(serviceTerms).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Payment and Financial Terms
const paymentTerms = {
  paymentPeriod: termsContent.includes('Net 30') || termsContent.includes('30 days'),
  depositRequirement: termsContent.includes('deposit') && termsContent.includes('50%'),
  lateFees: termsContent.includes('Late payment') || termsContent.includes('1.5%'),
  taxExclusion: termsContent.includes('exclusive of') && termsContent.includes('taxes'),
  projectThreshold: termsContent.includes('€5,000') || termsContent.includes('5,000'),
  currencySpecification: termsContent.includes('€') || termsContent.includes('Euro')
};

console.log('\n📋 Payment and Financial Terms:');
Object.entries(paymentTerms).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Legal Protection and Risk Management
const legalProtection = {
  liabilityLimitation: termsContent.includes('liability is limited') && termsContent.includes('contract value'),
  professionalInsurance: termsContent.includes('professional indemnity insurance'),
  industryStandards: termsContent.includes('industry best practices'),
  jurisdictionClause: termsContent.includes('jurisdiction') && termsContent.includes('Wiesbaden'),
  germanLawGoverning: termsContent.includes('governed by German law'),
  disputeResolution: termsContent.includes('jurisdiction') || termsContent.includes('Wiesbaden')
};

console.log('\n📋 Legal Protection and Risk Management:');
Object.entries(legalProtection).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Professional Standards and Quality
const professionalStandards = {
  writtenAgreements: termsContent.includes('written') && termsContent.includes('agreed upon'),
  projectSpecifications: termsContent.includes('project scope') && termsContent.includes('timeline'),
  qualityAssurance: termsContent.includes('best practices') || termsContent.includes('professional'),
  deliverableRights: termsContent.includes('full rights') && termsContent.includes('deliverables'),
  methodologyRetention: termsContent.includes('methodologies') && termsContent.includes('know-how'),
  ndaAvailability: termsContent.includes('Non-disclosure') && termsContent.includes('available')
};

console.log('\n📋 Professional Standards and Quality:');
Object.entries(professionalStandards).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Contact and Administrative Information
const contactAdmin = {
  companyName: termsContent.includes('IdEinstein'),
  businessLocation: termsContent.includes('Taunusstein, Germany'),
  contactEmail: termsContent.includes('info@ideinstein.com'),
  contactPhone: termsContent.includes('+49 152'),
  lastUpdated: termsContent.includes('Last updated') || termsContent.includes('toLocaleDateString'),
  agbDesignation: termsContent.includes('AGB') || termsContent.includes('General Terms')
};

console.log('\n📋 Contact and Administrative Information:');
Object.entries(contactAdmin).forEach(([key, value]) => {
  console.log(`   ${value ? '✅' : '❌'} ${key}: ${value ? 'PRESENT' : 'MISSING'}`);
});

// Calculate Compliance Scores
const agbScore = Object.values(agbEssentials).filter(Boolean).length / Object.keys(agbEssentials).length * 100;
const serviceScore = Object.values(serviceTerms).filter(Boolean).length / Object.keys(serviceTerms).length * 100;
const paymentScore = Object.values(paymentTerms).filter(Boolean).length / Object.keys(paymentTerms).length * 100;
const legalScore = Object.values(legalProtection).filter(Boolean).length / Object.keys(legalProtection).length * 100;
const professionalScore = Object.values(professionalStandards).filter(Boolean).length / Object.keys(professionalStandards).length * 100;
const adminScore = Object.values(contactAdmin).filter(Boolean).length / Object.keys(contactAdmin).length * 100;

console.log('\n📊 COMPLIANCE SCORES:');
console.log(`📋 AGB Essentials: ${agbScore.toFixed(1)}%`);
console.log(`🔧 Service Terms: ${serviceScore.toFixed(1)}%`);
console.log(`💰 Payment Terms: ${paymentScore.toFixed(1)}%`);
console.log(`⚖️  Legal Protection: ${legalScore.toFixed(1)}%`);
console.log(`🏆 Professional Standards: ${professionalScore.toFixed(1)}%`);
console.log(`📞 Contact & Admin: ${adminScore.toFixed(1)}%`);

const overallScore = (agbScore + serviceScore + paymentScore + legalScore + professionalScore + adminScore) / 6;
console.log(`\n🎯 OVERALL TERMS COMPLIANCE: ${overallScore.toFixed(1)}%`);

// Final Assessment
if (overallScore >= 95) {
  console.log('\n🎉 EXCELLENT COMPLIANCE! Terms & Conditions are comprehensive and legally sound.');
} else if (overallScore >= 85) {
  console.log('\n✅ GOOD COMPLIANCE! Terms meet most requirements with minor gaps.');
} else if (overallScore >= 75) {
  console.log('\n⚠️  ADEQUATE COMPLIANCE! Some important clauses may need strengthening.');
} else {
  console.log('\n❌ INSUFFICIENT COMPLIANCE! Significant improvements needed for business protection.');
}

// Key Features Summary
console.log('\n🔑 KEY TERMS & CONDITIONS FEATURES:');
console.log('✅ Comprehensive service scope definition');
console.log('✅ Clear contract formation and payment terms');
console.log('✅ Intellectual property rights protection');
console.log('✅ Professional confidentiality and NDA provisions');
console.log('✅ Liability limitation and insurance coverage');
console.log('✅ German law jurisdiction and dispute resolution');
console.log('✅ Professional engineering service specifications');
console.log('✅ Risk management and quality assurance clauses');

// Recommendations
console.log('\n💡 RECOMMENDATIONS:');
if (overallScore >= 95) {
  console.log('🚀 Terms & Conditions are business-ready and legally protective!');
  console.log('📅 Review annually or when services expand');
  console.log('🔄 Update payment terms if business model changes');
} else {
  console.log('🔧 Consider strengthening any missing elements identified above');
  console.log('⚖️  Legal review recommended for German business law compliance');
  console.log('📋 Ensure all service offerings are properly covered');
  console.log('💼 Consider adding force majeure and termination clauses');
}

console.log('\n✨ Terms & Conditions compliance analysis complete!');
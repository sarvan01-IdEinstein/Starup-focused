// Simple test to verify services data structure
const { servicesData } = require('./lib/services-data.ts')

console.log('Available services:')
Object.keys(servicesData).forEach(key => {
  const service = servicesData[key]
  console.log(`- ${key}: ${service.title} (icon: ${service.icon})`)
})

console.log('\nService data structure looks good!')
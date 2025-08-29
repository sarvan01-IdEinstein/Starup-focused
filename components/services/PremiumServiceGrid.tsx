'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import PremiumServiceCard from './PremiumServiceCard'
import type { Service } from '@/lib/types'
import { SERVICE_CATEGORIES } from '@/lib/constants'

interface PremiumServiceGridProps {
  services: Service[]
}

const PremiumServiceGrid = ({ services }: PremiumServiceGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(service => service.category.includes(selectedCategory))

  const categoryColors = {
    'All': 'bg-gray-900 text-white border-gray-900',
    'Engineering': 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
    'Design': 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100',
    'Manufacturing': 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100',
    'Simulation & Analysis': 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100',
    'Documentation': 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100',
    'Consulting': 'bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100'
  }

  return (
    <div className="space-y-12">
      {/* Enhanced Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {['All', ...SERVICE_CATEGORIES].map((category) => {
          const isSelected = selectedCategory === category
          const colorClass = isSelected 
            ? 'bg-gray-900 text-white border-gray-900 shadow-lg' 
            : categoryColors[category as keyof typeof categoryColors] || 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
          
          return (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 ${colorClass}`}
            >
              {category}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Services Count */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center"
      >
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredServices.length}</span> 
          {selectedCategory === 'All' ? ' engineering services' : ` ${selectedCategory.toLowerCase()} services`}
        </p>
      </motion.div>

      {/* Premium Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => (
          <PremiumServiceCard 
            key={service.id} 
            service={service} 
            index={index} 
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
          <p className="text-gray-500 mb-6">Try selecting a different category to see available services.</p>
          <Button 
            variant="outline" 
            onClick={() => setSelectedCategory('All')}
          >
            View All Services
          </Button>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100"
      >
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Need a Custom Solution?
        </h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Don't see exactly what you're looking for? We specialize in custom engineering solutions 
          tailored to your unique requirements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8 py-4 text-lg">
            Discuss Your Project
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
            View Case Studies
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default PremiumServiceGrid
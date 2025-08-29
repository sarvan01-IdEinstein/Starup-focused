'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Service } from '@/lib/types'

interface PremiumServiceCardProps {
  service: Service
  index: number
}

const PremiumServiceCard = ({ service, index }: PremiumServiceCardProps) => {
  // Dynamic icon loading
  const IconComponent = typeof service.icon === 'string' 
    ? null 
    : service.icon

  // Get the first category for color theming
  const primaryCategory = service.category[0]
  
  // Color schemes based on category
  const categoryColors = {
    'Engineering': {
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      icon: 'text-blue-500'
    },
    'Design': {
      gradient: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      icon: 'text-purple-500'
    },
    'Manufacturing': {
      gradient: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      icon: 'text-green-500'
    },
    'Simulation & Analysis': {
      gradient: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
      icon: 'text-orange-500'
    },
    'Documentation': {
      gradient: 'from-indigo-500 to-indigo-600',
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-200',
      icon: 'text-indigo-500'
    },
    'Consulting': {
      gradient: 'from-teal-500 to-teal-600',
      bg: 'bg-teal-50',
      text: 'text-teal-600',
      border: 'border-teal-200',
      icon: 'text-teal-500'
    }
  }

  const colors = categoryColors[primaryCategory as keyof typeof categoryColors] || categoryColors['Engineering']

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group h-full"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col overflow-hidden border border-gray-100 hover:border-gray-200">
        {/* Header with Icon and Category */}
        <div className={`${colors.bg} px-8 py-6 border-b ${colors.border}`}>
          <div className="flex items-center justify-between mb-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className={`w-16 h-16 bg-gradient-to-r ${colors.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
            >
              {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
            </motion.div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
            {service.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Features List */}
        <div className="px-8 py-6 flex-grow">
          <div className="space-y-4">
            {service.features.slice(0, 6).map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: (index * 0.1) + (i * 0.05) }}
                className="flex items-start space-x-3"
              >
                <CheckCircle className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
                <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Additional Features Count */}
          {service.features.length > 6 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className={`text-sm ${colors.text} font-medium`}>
                +{service.features.length - 6} more capabilities
              </span>
            </div>
          )}
        </div>

        {/* Categories and CTA */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {service.category.map((cat) => (
              <span
                key={cat}
                className={`text-xs px-3 py-1 ${colors.bg} ${colors.text} rounded-full font-medium border ${colors.border}`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Link href={`/services/${service.slug}`} className="block">
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all duration-300"
            >
              <span>Learn More</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  )
}

export default PremiumServiceCard
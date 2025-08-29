'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket, Building2, Users, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { UnifiedConsultationCard } from '@/components/shared/UnifiedConsultationCard'
import { useAudience } from '@/lib/contexts/AudienceContext'
import { AudienceSegmentationProps, AudienceType } from '@/lib/types/audience'

export default function AudienceSegmentationSection() {
  const [showConsultation, setShowConsultation] = useState(false)
  const { selectAudience, audienceState } = useAudience()
  const selectedAudience = audienceState.selectedAudience

  const handleConsultationSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Consultation booked successfully! ${result.message}`)
        setShowConsultation(false)
      } else {
        alert(`Failed to book consultation: ${result.message}`)
      }
    } catch (error) {
      console.error('Consultation booking error:', error)
      alert('Failed to book consultation. Please try again.')
    }
  }

  const handleAudienceSelect = (audience: AudienceType) => {
    if (audience) {
      selectAudience(audience, 'explicit')
      // Smooth scroll to conditional content section
      setTimeout(() => {
        const element = document.getElementById('conditional-content')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  const audienceDefinitions = [
    {
      type: 'startup' as AudienceType,
      title: 'For Startups',
      definition: 'Early-stage companies (0-50 employees) building innovative products',
      characteristics: [
        'Limited budget and resources',
        'Need rapid product development',
        'Focus on MVP and market validation',
        'Require cost-efficient solutions'
      ],
      benefits: [
        'Product Development Accelerator (12-20 weeks)',
        'Direct engineer access & rapid prototyping',
        'Flexible scope & cost-efficient approach',
        'Startup-focused methodology'
      ],
      primaryCTA: 'Choose Startup Path',
      icon: Rocket,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-400/50',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-900'
    },
    {
      type: 'enterprise' as AudienceType,
      title: 'For Enterprises',
      definition: 'Established organizations (50+ employees) with complex engineering needs',
      characteristics: [
        'Complex regulatory requirements',
        'Multi-stakeholder coordination',
        'Global manufacturing needs',
        'Quality and compliance focus'
      ],
      benefits: [
        'Hub & Spoke model & regulatory compliance',
        'Global manufacturing & quality oversight',
        'Enterprise partnerships & dedicated support',
        'German quality standards'
      ],
      primaryCTA: 'Choose Enterprise Path',
      icon: Building2,
      color: 'from-slate-600 to-slate-700',
      borderColor: 'border-slate-400/50',
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-900'
    }
  ]

  return (
    <section id="audience-segmentation" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 text-sm font-medium mb-6 rounded-lg">
            <Users className="w-4 h-4 mr-2" />
            Choose Your Engineering Partnership
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Which Path Is Right for You?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I serve both startups and enterprises with tailored approaches. Choose the path that best fits your organization's size, needs, and goals.
          </p>
        </motion.div>

        {/* Audience Selection Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {audienceDefinitions.map((audience, index) => (
            <motion.div
              key={audience.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 group cursor-pointer ${
                selectedAudience === audience.type 
                  ? `${audience.borderColor} border-2` 
                  : 'border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => handleAudienceSelect(audience.type)}
            >
              {/* Selection Indicator */}
              {selectedAudience === audience.type && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-sm">✓</span>
                </motion.div>
              )}

              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${audience.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <audience.icon className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Title and Definition */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {audience.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {audience.definition}
                </p>
              </div>

              {/* Characteristics */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Typical Characteristics:
                </h4>
                <div className="space-y-3">
                  {audience.characteristics.map((characteristic, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span className="text-gray-600 text-sm">{characteristic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  What You Get:
                </h4>
                <div className="space-y-3">
                  {audience.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${
                        audience.type === 'startup' ? 'bg-blue-500' : 'bg-slate-500'
                      }`}></span>
                      <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                className={`w-full group-hover:scale-105 transition-transform ${
                  audience.type === 'startup' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-slate-600 hover:bg-slate-700'
                } text-white`}
                size="lg"
              >
                {audience.primaryCTA}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Benefits Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 mb-12 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Aspect</th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-600">Startups</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-600">Enterprises</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">Timeline</td>
                  <td className="py-4 px-4 text-center text-blue-700">12-20 weeks</td>
                  <td className="py-4 px-4 text-center text-slate-700">Custom timeline</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">Approach</td>
                  <td className="py-4 px-4 text-center text-blue-700">Rapid prototyping</td>
                  <td className="py-4 px-4 text-center text-slate-700">Comprehensive planning</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-medium text-gray-900">Focus</td>
                  <td className="py-4 px-4 text-center text-blue-700">MVP & validation</td>
                  <td className="py-4 px-4 text-center text-slate-700">Compliance & scale</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-gray-900">Engagement</td>
                  <td className="py-4 px-4 text-center text-blue-700">Flexible scope</td>
                  <td className="py-4 px-4 text-center text-slate-700">Partnership model</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Enhanced Consultation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Still Not Sure Which Path Fits?
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            <strong>No problem!</strong> Many successful projects start with a simple conversation. 
            Let's discuss your specific needs, timeline, and goals in a free 30-minute consultation 
            to determine the perfect approach for your project.
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-6 border border-yellow-300">
            <p className="text-sm text-gray-700 mb-2"><strong>In our consultation, we'll cover:</strong></p>
            <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div>• Your project scope and timeline</div>
              <div>• Budget and resource considerations</div>
              <div>• Technical requirements and challenges</div>
              <div>• Best approach recommendation</div>
            </div>
          </div>
          
          <Button 
            variant="accelerator"
            size="lg"
            className="rounded-lg px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            onClick={() => setShowConsultation(true)}
          >
            🎯 Get Personalized Guidance
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Schedule a Free Consultation</DialogTitle>
          <UnifiedConsultationCard
            type="consultation"
            onSubmit={handleConsultationSubmit}
          />
        </DialogContent>
      </Dialog>
    </section>
  )
}
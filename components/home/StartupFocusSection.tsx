'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket, DollarSign, Clock, Users, Target, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { UnifiedConsultationCard } from '@/components/shared/UnifiedConsultationCard'

export default function StartupFocusSection() {
  const [showQuotation, setShowQuotation] = useState(false)

  const handleQuotationSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Quote request submitted successfully! Reference: ${result.quoteReference}`)
        setShowQuotation(false)
      } else {
        alert(`Failed to submit quote: ${result.error}`)
      }
    } catch (error) {
      console.error('Quote submission error:', error)
      alert('Failed to submit quote request. Please try again.')
    }
  }

  const challenges = [
    {
      icon: DollarSign,
      title: 'High Development Costs',
      problem: 'Traditional engineering services cost €100-200/hour',
      solution: 'Our model delivers same quality at 30-50% less cost'
    },
    {
      icon: Clock,
      title: 'Long Time-to-Market',
      problem: 'Typical product development takes 6-12 months',
      solution: 'We deliver market-ready products in 12-20 weeks'
    },
    {
      icon: Users,
      title: 'Expertise Gaps',
      problem: 'Startups lack in-house engineering expertise',
      solution: 'Get access to 26+ years of global engineering experience'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Rocket className="w-4 h-4 mr-2" />
            Perfect for Startups & SMEs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built for Startup Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand startup challenges. That's why we created a solution specifically 
            designed for companies that need enterprise-quality engineering without enterprise budgets.
          </p>
        </motion.div>

        {/* Challenges & Solutions */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <challenge.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {challenge.title}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-medium">❌ The Problem:</p>
                  <p className="text-red-700 text-sm mt-1">{challenge.problem}</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm font-medium">✅ Our Solution:</p>
                  <p className="text-green-700 text-sm mt-1">{challenge.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Development Accelerator Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
          </div>

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                  <Rocket className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Featured Solution</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Product Development Accelerator
                </h3>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Our flagship program that takes your idea from concept to market-ready product 
                  in just 12-20 weeks. Perfect for startups who need to move fast and validate quickly.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Target, text: '4-Phase Process' },
                    { icon: Zap, text: '12-20 Week Timeline' },
                    { icon: DollarSign, text: '30-50% Cost Savings' },
                    { icon: Users, text: 'Dedicated Team' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <feature.icon className="w-5 h-5 mr-3 text-yellow-400" />
                      <span className="text-blue-100">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/services/product-development-accelerator">
                    <Button variant="accelerator" size="lg" className="px-8 py-4 text-lg rounded-full">
                      🚀 Start Your Accelerator Journey
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="accelerator-outline" 
                    size="lg" 
                    className="px-8 py-4 text-lg rounded-full"
                    onClick={() => setShowQuotation(true)}
                  >
                    Get Free Quote
                  </Button>
                </div>
              </div>

              <div className="lg:text-right">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h4 className="text-2xl font-bold mb-6">What You Get:</h4>
                  <ul className="space-y-3 text-blue-100">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">✓</span>
                      <span>Concept validation & feasibility study</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">✓</span>
                      <span>MVP design & functional prototype</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">✓</span>
                      <span>Production optimization & testing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-3">✓</span>
                      <span>Market launch & manufacturing setup</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quotation Modal */}
      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Request a Quotation</DialogTitle>
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={handleQuotationSubmit}
            defaultService="product-development-accelerator"
          />
        </DialogContent>
      </Dialog>
    </section>
  )
}
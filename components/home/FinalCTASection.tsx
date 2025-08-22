'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket, MessageCircle, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { UnifiedConsultationCard } from '@/components/shared/UnifiedConsultationCard'

export default function FinalCTASection() {
  const [showConsultation, setShowConsultation] = useState(false)
  const [showQuotation, setShowQuotation] = useState(false)

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

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
                Idea
              </span>{' '}
              into Reality?
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join 100+ companies who chose IdEinstein to bridge German precision with Indian innovation. 
              Your next breakthrough is just 12-20 weeks away.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link href="/services/product-development-accelerator">
                <Button variant="accelerator" size="lg" className="px-10 py-5 text-xl rounded-full">
                  <Rocket className="mr-3 w-6 h-6" />
                  Start Your Accelerator
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              
              <Button 
                variant="secondary-light" 
                size="lg" 
                className="px-10 py-5 text-xl rounded-full"
                onClick={() => setShowQuotation(true)}
              >
                <Calendar className="mr-3 w-5 h-5" />
                Get Quote
              </Button>
            </div>
          </motion.div>

          {/* Three Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: Rocket,
                title: 'Start Immediately',
                description: 'Ready to begin? Jump straight into our Product Development Accelerator',
                action: 'Start Project',
                href: '/services/product-development-accelerator',
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: MessageCircle,
                title: 'Have Questions?',
                description: 'Want to learn more about our Hub & Spoke model and process?',
                action: 'Learn More',
                href: '/about/hub-spoke-model',
                color: 'from-blue-500 to-cyan-600'
              },
              {
                icon: Calendar,
                title: 'Need Consultation?',
                description: 'Discuss your specific requirements with our engineering experts',
                action: 'Book Call',
                href: '/contact',
                color: 'from-purple-500 to-pink-600',
                modal: 'consultation'
              }
            ].map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {option.title}
                </h3>
                
                <p className="text-blue-200 mb-6 leading-relaxed">
                  {option.description}
                </p>

                {option.modal === 'consultation' ? (
                  <Button 
                    variant="primary-light" 
                    className="w-full"
                    onClick={() => setShowConsultation(true)}
                  >
                    {option.action}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Link href={option.href}>
                    <Button variant="primary-light" className="w-full">
                      {option.action}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Final Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="border-t border-white/20 pt-12"
          >
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { icon: '🚀', text: '12-20 Week Delivery' },
                { icon: '💰', text: '30-50% Cost Savings' },
                { icon: '🏆', text: 'German Quality Standards' },
                { icon: '🌍', text: '24/7 Global Support' }
              ].map((feature, index) => (
                <div key={index} className="text-white/80">
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <div className="text-sm font-medium">{feature.text}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-blue-300 text-sm">
                🔒 No upfront costs • 💯 Satisfaction guaranteed • 🤝 Trusted by 100+ companies
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Consultation Modal */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Book a Consultation</DialogTitle>
          <UnifiedConsultationCard
            type="consultation"
            onSubmit={handleConsultationSubmit}
          />
        </DialogContent>
      </Dialog>

      {/* Quotation Modal */}
      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Request a Quotation</DialogTitle>
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={handleQuotationSubmit}
          />
        </DialogContent>
      </Dialog>
    </section>
  )
}
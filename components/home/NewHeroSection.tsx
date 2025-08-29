'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { UnifiedConsultationCard } from '@/components/shared/UnifiedConsultationCard'

export default function NewHeroSection() {
  const [showConsultation, setShowConsultation] = useState(false)

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

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
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

      {/* Subtle Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 blur-xl rounded-lg"
      />
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 blur-xl rounded-lg"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Clean Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 mb-8 rounded-lg"
          >
            <Globe className="w-4 h-4 mr-2 text-blue-400" />
            <span className="text-white/90 text-sm font-medium">
              Mechanical Engineering Expert
            </span>
          </motion.div>

          {/* Powerful Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
          >
            From Idea to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Market
            </span>
            <br />
            in 12-20 Weeks
          </motion.h1>

          {/* Customer-Focused Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Your idea deserves expert attention. I'm Saravanakumar, and I've spent 26+ years helping companies 
            turn concepts into successful products. 
            <span className="text-yellow-300 font-semibold"> Let's make your vision a reality.</span>
          </motion.p>

          {/* Clean Key Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12"
          >
            {[
              { 
                emoji: '💰',
                text: 'Cost-Effective',
                detail: 'Direct engineering without corporate overhead',
                color: 'from-green-500/40 to-emerald-500/40',
                borderColor: 'border-green-400/50',
                shadowColor: 'shadow-green-500/20'
              },
              { 
                emoji: '⚡',
                text: 'Fast Delivery',
                detail: 'Proven 4-phase process gets results',
                color: 'from-yellow-500/40 to-orange-500/40',
                borderColor: 'border-yellow-400/50',
                shadowColor: 'shadow-yellow-500/20'
              },
              { 
                emoji: '🎯',
                text: 'Personal Attention',
                detail: 'Work directly with an experienced engineer',
                color: 'from-purple-500/40 to-blue-500/40',
                borderColor: 'border-purple-400/50',
                shadowColor: 'shadow-purple-500/20'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 text-center h-full flex flex-col">
                  <div className="mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto ${benefit.borderColor} border ${benefit.shadowColor} shadow-lg group-hover:scale-110 transition-transform`}>
                      <span className="text-3xl">{benefit.emoji}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-2">
                    {benefit.text}
                  </h3>
                  
                  <p className="text-blue-200 text-sm leading-relaxed flex-grow">
                    {benefit.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Clear CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
          >
            <Link href="/services/product-development-accelerator">
              <Button 
                variant="accelerator" 
                size="hero" 
                className="rounded-lg"
              >
                🚀 Start Your Project
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            
            <Button 
              variant="secondary-light" 
              size="hero" 
              className="rounded-lg"
              onClick={() => setShowConsultation(true)}
            >
              Book Free Consultation
            </Button>
          </motion.div>

          {/* Simple Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="pt-6 border-t border-white/20"
          >
            <p className="text-white/70 text-sm font-medium">
              26+ Years of Mechanical Engineering Excellence • Based in Germany
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="w-6 h-10 border-2 border-white/30 flex items-start justify-center mb-2 rounded-lg">
            <div className="w-1 h-3 bg-white/60 mt-2 rounded-lg"></div>
          </div>
          <span className="text-white/50 text-xs font-medium whitespace-nowrap">Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Consultation Modal */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Book a Free Consultation</DialogTitle>
          <UnifiedConsultationCard
            type="consultation"
            onSubmit={handleConsultationSubmit}
          />
        </DialogContent>
      </Dialog>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Rocket, Building2 } from 'lucide-react'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { UnifiedConsultationCard } from '@/components/shared/UnifiedConsultationCard'
import { useAudience } from '@/lib/contexts/AudienceContext'


export default function DualAudienceHeroSection() {
  const [showConsultation, setShowConsultation] = useState(false)
  const { selectAudience } = useAudience()

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

  const handleStartupClick = () => {
    selectAudience('startup', 'explicit')
    // Smooth scroll to audience segmentation section
    const element = document.getElementById('audience-segmentation')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleEnterpriseClick = () => {
    selectAudience('enterprise', 'explicit')
    // Smooth scroll to audience segmentation section
    const element = document.getElementById('audience-segmentation')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleConsultationClick = () => {
    setShowConsultation(true)
  }

  return (
    <section className="relative pt-24 pb-12 md:pt-28 md:pb-16 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Bottom gradient fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
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
              26+ Years of German Engineering Excellence
            </span>
          </motion.div>

          {/* Powerful Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Where Ideas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Take Shape
            </span>
          </motion.h1>

          {/* Dual-Audience Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Whether you're building a startup or scaling an enterprise, I bring 26+ years of mechanical engineering expertise 
            to transform your concepts into successful products.
            <span className="text-yellow-300 font-semibold block mt-2">
              Direct access. German quality. Global efficiency.
            </span>
          </motion.p>



          {/* Audience Selection CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Choose Your Path</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
              {/* Startup Path */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group text-center h-full flex flex-col"
                onClick={handleStartupClick}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">For Startups</h3>
                <p className="text-blue-200 mb-4 leading-relaxed flex-grow text-sm">
                  Early-stage companies needing rapid, cost-effective product development
                </p>
                <div className="mt-auto">
                  <Button variant="primary-light" size="lg" className="w-full group-hover:scale-105 transition-transform">
                    Choose Startup Path
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>

              {/* Enterprise Path */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group text-center h-full flex flex-col"
                onClick={handleEnterpriseClick}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">For Enterprises</h3>
                <p className="text-blue-200 mb-4 leading-relaxed flex-grow text-sm">
                  Established organizations requiring complex engineering with German quality
                </p>
                <div className="mt-auto">
                  <Button variant="primary-light" size="lg" className="w-full group-hover:scale-105 transition-transform">
                    Choose Enterprise Path
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Consultation CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-center"
            >
              <p className="text-white/70 mb-4 text-lg">Not sure which path is right for you?</p>
              <Button 
                variant="accelerator" 
                size="hero" 
                className="rounded-lg px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                onClick={handleConsultationClick}
              >
                🚀 Schedule Free Consultation
              </Button>
            </motion.div>
          </motion.div>

          {/* Simple Credentials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-6 border-t border-white/20"
          >
            <p className="text-white/70 text-sm font-medium">
              26+ Years of Mechanical Engineering Excellence • Based in Germany • Serving Startups & Enterprises Worldwide
            </p>
          </motion.div>
        </div>
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
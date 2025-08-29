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
      solution: 'Direct engineering approach eliminates corporate overhead',
      color: 'from-green-500 to-emerald-600',
      shadowColor: 'shadow-green-500/30'
    },
    {
      icon: Clock,
      title: 'Long Time-to-Market',
      problem: 'Typical product development takes 6-12 months',
      solution: 'Streamlined 4-phase process targets 12-20 week delivery',
      color: 'from-orange-500 to-red-500',
      shadowColor: 'shadow-orange-500/30'
    },
    {
      icon: Users,
      title: 'Expertise Gaps',
      problem: 'Startups lack in-house engineering expertise',
      solution: 'Get access to 26+ years of mechanical engineering experience',
      color: 'from-purple-500 to-indigo-600',
      shadowColor: 'shadow-purple-500/30'
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
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 text-sm font-medium mb-6 rounded-lg">
            <Rocket className="w-4 h-4 mr-2" />
            Perfect for Startups & SMEs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Startup Challenges I Understand
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            After 26+ years in mechanical engineering, I've seen these challenges repeatedly. 
            Here's how my experience helps startups navigate the most common obstacles to successful product development.
          </p>
        </motion.div>

        {/* Startup Challenges & My Solutions */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${challenge.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${challenge.shadowColor} shadow-lg`}>
                <challenge.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {challenge.title}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-slate-300 p-4 rounded-r-xl shadow-sm">
                  <p className="text-slate-700 text-sm font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-slate-400 mr-2 rounded-lg"></span>
                    The Challenge:
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{challenge.problem}</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 rounded-r-xl shadow-sm">
                  <p className="text-blue-700 text-sm font-semibold mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 mr-2 rounded-lg"></span>
                    My Experience-Based Approach:
                  </p>
                  <p className="text-blue-600 text-sm leading-relaxed">{challenge.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience-Based Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 mb-16 border border-slate-100"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Experience Matters in Startup Engineering
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Two decades of corporate engineering experience has taught me exactly what startups need: 
              <span className="text-blue-600 font-semibold"> practical solutions that work within real-world constraints.</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: '🎯', 
                title: 'Strategic Focus', 
                desc: 'I know which features matter most for market validation',
                color: 'from-blue-500 to-blue-600'
              },
              { 
                icon: '⚡', 
                title: 'Proven Processes', 
                desc: 'Tested methodologies that eliminate common pitfalls',
                color: 'from-green-500 to-green-600'
              },
              { 
                icon: '💰', 
                title: 'Cost Intelligence', 
                desc: 'Deep understanding of where to invest and where to optimize',
                color: 'from-purple-500 to-purple-600'
              },
              { 
                icon: '🤝', 
                title: 'Direct Partnership', 
                desc: 'Personal commitment backed by decades of expertise',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 mb-6 rounded-lg">
                  <Rocket className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Featured Solution</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Product Development Accelerator
                </h3>
                
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  My flagship program that takes your idea from concept to market-ready product 
                  in just 12-20 weeks. Perfect for startups who need to move fast and validate quickly.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Target, text: '4-Phase Process' },
                    { icon: Zap, text: '12-20 Week Timeline' },
                    { icon: DollarSign, text: '30-50% Cost Savings' },
                    { icon: Users, text: 'Personal Attention' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <feature.icon className="w-5 h-5 mr-3 text-yellow-400" />
                      <span className="text-blue-100">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/services/product-development-accelerator">
                    <Button variant="accelerator" size="hero" className="rounded-lg">
                      🚀 Start Your Accelerator Journey
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="secondary-light" 
                    size="hero" 
                    className="rounded-lg"
                    onClick={() => setShowQuotation(true)}
                  >
                    Get Free Quote
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 relative overflow-hidden">
                  {/* Animated Background Elements */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-xl rounded-lg"
                  />
                  <motion.div
                    animate={{ 
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-lg rounded-lg"
                  />

                  <motion.h4 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-bold mb-8 relative z-10 text-center"
                  >
                    What You Get:
                  </motion.h4>
                  
                  <div className="space-y-6 text-blue-100 relative z-10 max-w-md mx-auto">
                    {[
                      {
                        icon: "🔍",
                        title: "Concept validation & feasibility study",
                        delay: 0.1
                      },
                      {
                        icon: "🚀",
                        title: "MVP design & functional prototype", 
                        delay: 0.2
                      },
                      {
                        icon: "⚙️",
                        title: "Production optimization & testing",
                        delay: 0.3
                      },
                      {
                        icon: "🏭",
                        title: "Market launch & manufacturing setup",
                        delay: 0.4
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        transition={{ 
                          duration: 0.6, 
                          delay: item.delay,
                          type: "spring",
                          stiffness: 300
                        }}
                        className="flex items-center group cursor-pointer justify-center text-center"
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: [0, -10, 10, 0] 
                          }}
                          transition={{ 
                            duration: 0.5,
                            type: "spring",
                            stiffness: 400
                          }}
                          className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-xl mr-4 border border-yellow-400/30 group-hover:border-yellow-400/60 transition-all duration-300"
                        >
                          <span className="text-xl">{item.icon}</span>
                        </motion.div>
                        
                        <motion.span 
                          className="group-hover:text-white transition-colors duration-300 font-medium"
                          whileHover={{ x: 3 }}
                        >
                          {item.title}
                        </motion.span>
                        
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="ml-auto"
                        >
                          <ArrowRight className="w-4 h-4 text-yellow-400/60 group-hover:text-yellow-400 transition-colors duration-300" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Hub & Spoke Model Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-8 pt-6 border-t border-white/20 relative z-10"
                  >
                    <Link href="/about/hub-spoke-model">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center space-x-2 text-blue-200 hover:text-white transition-colors duration-300 group cursor-pointer"
                      >
                        <motion.div
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.5 }}
                          className="text-lg"
                        >
                          🔗
                        </motion.div>
                        <span className="text-sm font-medium group-hover:underline">
                          Learn More About My Hub & Spoke Model
                        </span>
                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <ArrowRight className="w-4 h-4 group-hover:text-yellow-400 transition-colors duration-300" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* Floating Particles */}
                  <motion.div
                    animate={{ 
                      y: [-20, 20, -20],
                      x: [-10, 10, -10]
                    }}
                    transition={{ 
                      duration: 12, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-400/40 rounded-lg"
                  />
                  <motion.div
                    animate={{ 
                      y: [20, -20, 20],
                      x: [10, -10, 10]
                    }}
                    transition={{ 
                      duration: 15, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 2
                    }}
                    className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400/40 rounded-lg"
                  />
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
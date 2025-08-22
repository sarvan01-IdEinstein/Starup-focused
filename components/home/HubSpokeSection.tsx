'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export default function HubSpokeSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Secret: The Hub & Spoke Model
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            The bridge between German precision and Indian innovation. 
            This is how we deliver world-class results at startup-friendly prices.
          </p>
        </motion.div>

        {/* Visual Model */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* German Hub */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                  <span className="text-white text-4xl font-bold">🇩🇪</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-yellow-900" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">German Hub</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <ul className="text-blue-200 space-y-2 text-sm">
                  <li>• Quality Standards</li>
                  <li>• Client Relations</li>
                  <li>• Project Management</li>
                  <li>• Final Review</li>
                </ul>
              </div>
            </motion.div>

            {/* Connection Bridge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center relative"
            >
              {/* Connection Lines */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400"></div>
              
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-blue-400/50 rounded-full"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">IdEinstein Bridge</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <ul className="text-blue-200 space-y-2 text-sm">
                  <li>• Seamless Integration</li>
                  <li>• Quality Assurance</li>
                  <li>• Cultural Translation</li>
                  <li>• 24/7 Coordination</li>
                </ul>
              </div>
            </motion.div>

            {/* Indian Spoke */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-green-500 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                  <span className="text-white text-4xl font-bold">🇮🇳</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-green-900" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Indian Spoke</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <ul className="text-blue-200 space-y-2 text-sm">
                  <li>• Technical Execution</li>
                  <li>• Innovation & R&D</li>
                  <li>• Cost Optimization</li>
                  <li>• Rapid Development</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {[
            {
              title: 'Best of Both Worlds',
              description: 'German engineering standards with Indian cost efficiency and innovation speed.'
            },
            {
              title: '24/7 Development',
              description: 'Time zone advantage means your project never sleeps. Continuous progress around the clock.'
            },
            {
              title: 'Cultural Bridge',
              description: 'Deep understanding of both German business culture and Indian technical capabilities.'
            }
          ].map((benefit, index) => (
            <div key={benefit.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
              <p className="text-blue-200">{benefit.description}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <Link href="/about/hub-spoke-model">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full shadow-xl">
              Learn More About Our Model
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
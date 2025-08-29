'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Clock, DollarSign, Shield, Lightbulb, Globe } from 'lucide-react'

export default function WhyWorkWithMeSection() {
  const benefits = [
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'You work directly with me - the engineer who understands your project inside out. No communication gaps or project handoffs.'
    },
    {
      icon: Clock,
      title: 'Faster Decision Making',
      description: 'As a solo consultant, I can make quick decisions and pivot rapidly based on your feedback and changing requirements.'
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden costs or markup from multiple layers. You pay for engineering expertise, not corporate overhead.'
    },
    {
      icon: Shield,
      title: 'Personal Accountability',
      description: 'Your project success is my reputation. I take personal ownership of every deliverable and outcome.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Focus',
      description: 'Fresh perspective on every project. I stay current with latest technologies and manufacturing methods.'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access to carefully selected vendors and partners across Germany and India for comprehensive solutions.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Work with Me?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The advantages of working with an experienced solo engineering consultant 
            who puts your project first.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personal Touch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">
            Ready to Start Your Project?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your engineering needs. I'll personally review your project 
            and provide honest feedback on feasibility, timeline, and approach.
          </p>
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-sm font-medium">Usually respond within 24 hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { User, Target, Handshake, Zap } from 'lucide-react'

export default function MyApproachSection() {
  const approaches = [
    {
      icon: User,
      title: 'Personal Attention',
      description: 'Direct communication with the engineer working on your project - no middlemen or account managers'
    },
    {
      icon: Target,
      title: 'Focused Expertise',
      description: 'Specialized in mechanical engineering and product development for startups and SMEs'
    },
    {
      icon: Handshake,
      title: 'Trusted Network',
      description: 'Carefully vetted vendor partners for manufacturing, testing, and specialized services'
    },
    {
      icon: Zap,
      title: 'Agile Process',
      description: 'Quick iterations, rapid prototyping, and flexible project management'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Engineering Approach
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            As a solo engineering consultant, I offer something larger firms can't: 
            personal attention, direct communication, and complete project ownership.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <approach.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {approach.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {approach.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
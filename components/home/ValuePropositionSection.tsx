'use client'

import { motion } from 'framer-motion'
import { DollarSign, Clock, Shield, Users, TrendingUp, Zap } from 'lucide-react'

export default function ValuePropositionSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: '30-50% Cost Savings',
      description: 'Get German-quality engineering at Indian prices. Our Hub & Spoke model eliminates traditional overhead costs.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Clock,
      title: 'Faster Time-to-Market',
      description: '24/7 development cycle leveraging global time zones. From concept to production in 12-20 weeks.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Shield,
      title: 'German Quality Standards',
      description: 'Every project meets rigorous German engineering standards with comprehensive quality assurance.',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'Your own dedicated engineering team with 26+ years of combined global experience.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      description: 'Start small and scale up. Our flexible model grows with your business needs and funding stages.',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Proven Process',
      description: 'Battle-tested 4-phase methodology that has delivered 100+ successful projects worldwide.',
      color: 'from-yellow-500 to-orange-600'
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
            Why Choose IdEinstein?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another engineering service. We're your strategic partner 
            bridging the gap between German precision and Indian innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 hover:border-gray-200">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '26+', label: 'Years Experience' },
              { number: '100+', label: 'Projects Delivered' },
              { number: '30-50%', label: 'Cost Savings' },
              { number: '12-20', label: 'Weeks to Market' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Lightbulb, Cog, TestTube, Rocket } from 'lucide-react'

export default function ProcessOverviewSection() {
  const phases = [
    {
      number: '01',
      icon: Lightbulb,
      title: 'Concept Validation',
      duration: '2-4 weeks',
      description: 'Assess technical and commercial viability with comprehensive analysis',
      deliverables: [
        'Feasibility report',
        'Preliminary design concepts',
        'Technology roadmap',
        'Risk analysis'
      ],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      number: '02',
      icon: Cog,
      title: 'MVP Design & Prototyping',
      duration: '4-6 weeks',
      description: 'Develop functional prototype to test core functionalities',
      deliverables: [
        'Detailed 3D CAD models',
        'Functional prototype',
        'Performance testing',
        'Design optimization'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '03',
      icon: TestTube,
      title: 'Production Optimization',
      duration: '3-5 weeks',
      description: 'Optimize design for manufacturing and scale production',
      deliverables: [
        'Manufacturing drawings',
        'Production process plan',
        'Quality control systems',
        'Cost optimization'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '04',
      icon: Rocket,
      title: 'Market Launch Support',
      duration: '3-5 weeks',
      description: 'Support market entry with manufacturing and documentation',
      deliverables: [
        'Manufacturing setup',
        'Technical documentation',
        'Compliance certification',
        'Launch support'
      ],
      color: 'from-green-500 to-emerald-500'
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Proven 4-Phase Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A streamlined methodology that takes your idea from concept to market in 12-20 weeks. 
            Each phase builds on the previous one, ensuring quality and reducing risk.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="max-w-6xl mx-auto">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative mb-16 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:ml-auto'} lg:w-1/2`}
            >
              {/* Timeline Line */}
              {index < phases.length - 1 && (
                <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-0.5 h-32 bg-gradient-to-b from-blue-300 to-purple-300 z-0"></div>
              )}

              {/* Phase Card */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow relative z-10">
                {/* Phase Number & Icon */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${phase.color} flex items-center justify-center mr-4`}>
                    <phase.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-400 mb-1">
                      {phase.number}
                    </div>
                    <div className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full">
                      {phase.duration}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {phase.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {phase.description}
                </p>

                {/* Deliverables */}
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Deliverables:</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {phase.deliverables.map((deliverable, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow for desktop */}
                {index < phases.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center max-w-4xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our proven process has helped 100+ companies bring their ideas to market. 
            From concept to production in just 12-20 weeks.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">12-20</div>
              <div className="text-blue-200">Weeks to Market</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">4</div>
              <div className="text-blue-200">Structured Phases</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-blue-200">Successful Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Users, Settings, TestTube, Package, FileText, Globe } from 'lucide-react'

export default function MyNetworkSection() {
  const networkPartners = [
    {
      icon: Settings,
      title: 'Manufacturing Partners',
      description: 'Vetted machine shops and manufacturers across Germany and India',
      status: 'Evaluating & Expanding'
    },
    {
      icon: TestTube,
      title: 'Testing Facilities',
      description: 'Access to FEA/CFD analysis and physical testing laboratories',
      status: 'Established Connections'
    },
    {
      icon: Package,
      title: '3D Printing Services',
      description: 'Rapid prototyping partners for various materials and technologies',
      status: 'Ready to Deploy'
    },
    {
      icon: FileText,
      title: 'Documentation Specialists',
      description: 'Technical writers and certification experts for compliance',
      status: 'On-Demand Access'
    },
    {
      icon: Users,
      title: 'Subject Matter Experts',
      description: 'Specialized consultants for specific industries and technologies',
      status: 'Growing Network'
    },
    {
      icon: Globe,
      title: 'Global Suppliers',
      description: 'Component sourcing and supply chain management partners',
      status: 'Continuously Expanding'
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
            My Professional Network
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            While I work as a solo consultant, I have access to a carefully curated network 
            of specialists and vendors to handle any project requirement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {networkPartners.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <partner.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {partner.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {partner.description}
              </p>
              
              <div className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {partner.status}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transparency Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Transparent Partnership Approach
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">What This Means for You:</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>I personally vet all vendors and partners</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>You get transparent pricing with no hidden markups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Direct communication with all project stakeholders</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span>Flexible team scaling based on project needs</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">My Commitment:</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">→</span>
                  <span>Continuously evaluate and improve vendor relationships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">→</span>
                  <span>Maintain quality standards across all partnerships</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">→</span>
                  <span>Provide honest assessments of capabilities and limitations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3 mt-1">→</span>
                  <span>Take full responsibility for project coordination</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
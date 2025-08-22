'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Building2, 
  Shield, 
  Users, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Cog,
  FileText,
  Globe
} from 'lucide-react'

const ForEnterprisesPage = () => {
  const enterpriseNeeds = [
    {
      icon: Cog,
      title: 'Complex Engineering Projects',
      description: 'Multi-disciplinary projects requiring advanced technical expertise',
      solution: 'Dedicated project teams with specialized domain knowledge'
    },
    {
      icon: Shield,
      title: 'Compliance & Standards',
      description: 'Strict regulatory requirements and industry standards',
      solution: 'Comprehensive compliance management and documentation'
    },
    {
      icon: Users,
      title: 'Scale & Capacity',
      description: 'Large-scale projects requiring significant resources',
      solution: 'Scalable team allocation and project management'
    },
    {
      icon: Globe,
      title: 'Global Manufacturing',
      description: 'International supply chain and manufacturing coordination',
      solution: 'Cross-cultural expertise and global partner network'
    }
  ]

  const enterpriseServices = [
    {
      title: 'Advanced R&D Projects',
      description: 'Complex research and development initiatives with multiple stakeholders',
      features: ['Multi-year project planning', 'Cross-functional team coordination', 'IP management', 'Regulatory pathway planning']
    },
    {
      title: 'Large-Scale Manufacturing',
      description: 'High-volume production planning and supply chain optimization',
      features: ['Production scaling strategies', 'Supply chain optimization', 'Quality system implementation', 'Cost reduction initiatives']
    },
    {
      title: 'Compliance & Documentation',
      description: 'Comprehensive regulatory compliance and technical documentation',
      features: ['Regulatory strategy development', 'Standards compliance', 'Technical documentation', 'Audit preparation']
    },
    {
      title: 'Strategic Partnerships',
      description: 'Long-term engineering partnerships and capability development',
      features: ['Dedicated project teams', 'Knowledge transfer programs', 'Capability development', 'Strategic consulting']
    }
  ]

  const enterpriseMetrics = [
    { metric: '500+', description: 'Enterprise Projects', detail: 'Successfully delivered' },
    { metric: '26+', description: 'Years Experience', detail: 'In global engineering' },
    { metric: '95%', description: 'Client Retention', detail: 'Long-term partnerships' },
    { metric: '24/7', description: 'Support', detail: 'Global project coverage' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-20">
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Building2 className="w-16 h-16 text-blue-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-slate-200 bg-clip-text text-transparent">
                Enterprise Solutions
              </h1>
            </div>
            <p className="text-2xl md:text-3xl mb-8 text-gray-300 leading-relaxed">
              Advanced Engineering for Established Companies
            </p>
            <p className="text-xl mb-8 text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Comprehensive engineering solutions for complex projects, regulatory compliance, 
              and large-scale manufacturing operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="cta-white" size="lg">
                Discuss Your Project
                <Building2 className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                View Case Studies
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enterprise Needs & Solutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Enterprise Engineering Challenges</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We understand the complex requirements of established companies and provide tailored solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {enterpriseNeeds.map((need, index) => (
              <motion.div
                key={need.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <need.icon className="w-6 h-6 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{need.title}</h3>
                        <p className="text-slate-600 mb-4">{need.description}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                        <p className="text-blue-800 font-medium">Our Approach:</p>
                      </div>
                      <p className="text-blue-700 mt-1">{need.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Services */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Enterprise Engineering Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive solutions designed for the complexity and scale of enterprise operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {enterpriseServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group hover:scale-105">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Services for Enterprises */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800">All Engineering Services Available</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Access our complete range of engineering services, scaled and customized for enterprise requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Research & Development', href: '/services/research-development', description: 'Advanced R&D projects with regulatory compliance' },
              { title: 'CAD Modeling', href: '/services/cad-modeling', description: 'Complex assemblies and technical documentation' },
              { title: 'Machine Design', href: '/services/machine-design', description: 'Industrial machinery and automation systems' },
              { title: 'BIW Design', href: '/services/biw-design', description: 'Automotive body-in-white engineering' },
              { title: 'FEA & CFD Analysis', href: '/services/finite-element-cfd', description: 'Advanced simulation and optimization' },
              { title: 'GD&T Analysis', href: '/services/gdt-tolerance', description: 'Precision tolerance and quality systems' },
              { title: '3D Printing Services', href: '/services/3d-printing', description: 'Large-scale prototyping and production' },
              { title: 'Supplier Sourcing', href: '/services/supplier-sourcing', description: 'Strategic supplier development and management' },
              { title: 'Technical Documentation', href: '/services/technical-documentation', description: 'Comprehensive technical and compliance documentation' }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-3 text-slate-800">{service.title}</h3>
                    <p className="text-slate-600 mb-4">{service.description}</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={service.href} className="flex items-center">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Metrics */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Enterprise Track Record</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Proven experience delivering complex engineering solutions for established companies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseMetrics.map((metric, index) => (
              <motion.div
                key={metric.description}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-400">{metric.metric}</div>
                <div className="text-lg font-semibold mb-2">{metric.description}</div>
                <div className="text-slate-300 text-sm">{metric.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose IdEinstein for Enterprise */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Why Enterprises Choose IdEinstein</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Unique advantages that make us the preferred engineering partner for established companies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: 'Global Experience',
                description: '26+ years bridging German engineering standards with global manufacturing capabilities'
              },
              {
                icon: Shield,
                title: 'Compliance Expertise',
                description: 'Deep understanding of regulatory requirements across multiple industries and regions'
              },
              {
                icon: TrendingUp,
                title: 'Scalable Solutions',
                description: 'Proven ability to scale from pilot projects to full production implementations'
              }
            ].map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{advantage.title}</h3>
                <p className="text-slate-600">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Scale Your Engineering Capabilities?
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Let's discuss how our enterprise solutions can accelerate your next major project. 
              From concept to production, we're your strategic engineering partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta-white" size="lg">
                Schedule Enterprise Consultation
              </Button>
              <Button variant="outline" size="lg">
                Request Proposal
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ForEnterprisesPage
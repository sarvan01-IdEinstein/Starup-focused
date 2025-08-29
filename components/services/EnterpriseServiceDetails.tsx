'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, ArrowLeft, Check, Globe, Zap, Shield, Target, Clock, Users, Star, Building2, Award, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { UnifiedConsultationCard } from "@/components/shared/UnifiedConsultationCard"
import ProcessFlow from './ProcessFlow'
import type { Service } from '@/lib/types'

interface EnterpriseServiceDetailsProps {
  service: Service
}

// Helper function to get correct service hero image path
const getServiceHeroImage = (service: Service): string => {
  const servicePathMap: Record<string, string> = {
    "research-development": "engineering/research-development",
    "cad-modeling": "Engineering services/cad-modeling",
    "3d-printing": "manufacturing/3d-printing",
    "machine-design": "engineering/machine-design",
    "biw-design": "engineering/biw-design",
    "finite-element-cfd": "engineering/finite-element-cfd",
    "gdt-tolerance": "engineering/gdt-tolerance",
    "technical-documentation": "design/technical-documentation",
    "supplier-sourcing": "manufacturing/supplier-sourcing"
  }
  
  const servicePath = servicePathMap[service.slug] || `engineering/${service.slug}`
  return `/images/services/${servicePath}/main/service-hero.jpg`
}

// Enterprise-focused service customizations
const getEnterpriseCustomization = (slug: string) => {
  const customizations: Record<string, any> = {
    'research-development': {
      icon: '🔬',
      color: 'from-blue-600 to-indigo-700',
      challenge: 'Complex R&D projects requiring regulatory compliance and multi-stakeholder coordination',
      solution: 'Comprehensive R&D management with regulatory pathway planning and IP protection',
      timeline: '4-12 months',
      highlight: '87% Success Rate',
      enterpriseValue: 'Regulatory compliance, IP management, multi-year project planning'
    },
    'cad-modeling': {
      icon: '🎯',
      color: 'from-purple-600 to-blue-700',
      challenge: 'Large-scale CAD projects with complex assemblies and extensive documentation requirements',
      solution: 'Advanced CAD modeling with comprehensive technical documentation and version control',
      timeline: '2-8 weeks',
      highlight: 'Production-Ready',
      enterpriseValue: 'Complex assemblies, technical documentation, manufacturing integration'
    },
    'machine-design': {
      icon: '⚙️',
      color: 'from-orange-600 to-red-700',
      challenge: 'Industrial machinery design requiring safety compliance and automation integration',
      solution: 'Comprehensive machine design with safety standards and automation systems',
      timeline: '6-16 weeks',
      highlight: 'Industrial Grade',
      enterpriseValue: 'Safety compliance, automation integration, industrial standards'
    },
    '3d-printing': {
      icon: '🏭',
      color: 'from-green-600 to-teal-700',
      challenge: 'Large-scale prototyping and low-volume production with quality assurance',
      solution: 'Enterprise 3D printing with quality control and material certification',
      timeline: '1-4 weeks',
      highlight: 'Quality Assured',
      enterpriseValue: 'Large-scale production, quality control, material certification'
    },
    'finite-element-cfd': {
      icon: '🧮',
      color: 'from-cyan-600 to-blue-700',
      challenge: 'Advanced simulation for mission-critical applications requiring high accuracy',
      solution: 'High-fidelity FEA & CFD analysis with validation and optimization',
      timeline: '2-6 weeks',
      highlight: '99.5% Accuracy',
      enterpriseValue: 'Mission-critical analysis, validation protocols, optimization studies'
    },
    'gdt-tolerance': {
      icon: '📐',
      color: 'from-indigo-600 to-purple-700',
      challenge: 'Precision manufacturing with strict tolerance requirements and quality systems',
      solution: 'Comprehensive GD&T analysis with quality system implementation',
      timeline: '1-3 weeks',
      highlight: 'Precision Focus',
      enterpriseValue: 'Quality systems, precision manufacturing, tolerance optimization'
    },
    'supplier-sourcing': {
      icon: '🌐',
      color: 'from-emerald-600 to-green-700',
      challenge: 'Strategic supplier development and supply chain optimization for large-scale operations',
      solution: 'Global supplier network with quality assurance and risk management',
      timeline: '2-8 weeks',
      highlight: 'Global Network',
      enterpriseValue: 'Supply chain optimization, risk management, strategic partnerships'
    },
    'technical-documentation': {
      icon: '📋',
      color: 'from-yellow-600 to-orange-700',
      challenge: 'Comprehensive technical documentation for regulatory compliance and knowledge management',
      solution: 'Complete documentation systems with regulatory compliance and version control',
      timeline: '1-4 weeks',
      highlight: 'Compliance Ready',
      enterpriseValue: 'Regulatory compliance, knowledge management, documentation systems'
    },
    'biw-design': {
      icon: '🚗',
      color: 'from-red-600 to-pink-700',
      challenge: 'Automotive BIW engineering with crash safety and manufacturing optimization',
      solution: 'Advanced BIW design with crash simulation and manufacturing integration',
      timeline: '8-20 weeks',
      highlight: 'Automotive Grade',
      enterpriseValue: 'Crash safety, manufacturing optimization, automotive standards'
    }
  }
  
  return customizations[slug] || {
    icon: '🏢',
    color: 'from-blue-600 to-purple-700',
    challenge: 'Complex enterprise engineering challenges requiring specialized expertise',
    solution: 'Professional engineering solutions with enterprise-grade quality and compliance',
    timeline: '2-12 weeks',
    highlight: 'Enterprise Grade',
    enterpriseValue: 'Professional quality, compliance focus, scalable solutions'
  }
}

const EnterpriseServiceDetails = ({ service }: EnterpriseServiceDetailsProps) => {
  const router = useRouter()
  const [showQuotation, setShowQuotation] = useState(false)
  const customization = getEnterpriseCustomization(service.slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen">
      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Button
          onClick={() => router.push('/solutions/for-enterprises#services')}
          variant="secondary"
          className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Enterprise Services
        </Button>
      </motion.div>

      {/* Hero Section - Enterprise Professional */}
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

        {/* Floating Elements */}
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
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                {/* Badge */}
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 mb-8 rounded-lg">
                  <Building2 className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="text-white/90 text-sm font-medium">
                    Enterprise Engineering Service
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {service.title}
                </h1>

                {/* Enterprise Focus */}
                <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                  <span className="text-yellow-300 font-semibold">Enterprise-grade solutions</span> for {customization.challenge.toLowerCase()}, 
                  backed by 26+ years of mechanical engineering expertise and proven industry standards.
                </p>

                {/* Enterprise Value Proposition */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
                  <h3 className="text-lg font-bold text-white mb-3">Enterprise Value:</h3>
                  <p className="text-blue-200 leading-relaxed">{customization.enterpriseValue}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: Clock, text: customization.timeline, label: 'Timeline' },
                    { icon: Award, text: customization.highlight, label: 'Quality' },
                    { icon: Shield, text: 'Compliance', label: 'Standards' }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center"
                    >
                      <metric.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-white font-bold">{metric.text}</div>
                      <div className="text-blue-200 text-sm">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="primary-light" 
                    size="lg"
                    onClick={() => setShowQuotation(true)}
                    className="px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    Request Enterprise Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="secondary-light" 
                    size="lg"
                    asChild
                    className="px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    <Link href="/solutions/for-enterprises#services">View All Services</Link>
                  </Button>
                </div>
              </motion.div>

              {/* Right: Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl">
                  <Image
                    src={getServiceHeroImage(service)}
                    alt={`${service.title} enterprise service visualization`}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Fallback with service icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="text-center p-8">
                      <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${customization.color} flex items-center justify-center shadow-xl`}>
                        <span className="text-4xl">{customization.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 max-w-md leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </div>

                {/* Floating Enterprise Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${customization.color} flex items-center justify-center`}>
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">500+</div>
                      <div className="text-gray-600 text-sm">Enterprise Projects</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Challenge & Solution */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enterprise Engineering Challenge
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Understanding the complex requirements of established companies and providing scalable, 
              compliant solutions that meet enterprise standards.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-xl">⚠️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Enterprise Challenge</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {customization.challenge}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Complex regulatory requirements
                  </div>
                  <div className="flex items-center text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Large-scale project coordination
                  </div>
                  <div className="flex items-center text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Quality and compliance standards
                  </div>
                </div>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-xl">✅</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Enterprise Solution</h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {customization.solution}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    26+ years of enterprise experience
                  </div>
                  <div className="flex items-center text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Proven compliance management
                  </div>
                  <div className="flex items-center text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Scalable project delivery
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enterprise Service Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive features designed for enterprise-scale projects with compliance and quality focus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-start">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${customization.color} flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium leading-relaxed">{feature}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      {service.details?.process && (
        <ProcessFlow 
          process={service.details.process} 
          category={service.category[0]}
          serviceSlug={service.slug}
        />
      )}

      {/* Enterprise Track Record */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise Track Record
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Proven experience delivering complex engineering solutions for established companies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { number: '500+', label: 'Enterprise Projects', sublabel: 'Successfully delivered' },
              { number: '26+', label: 'Years Experience', sublabel: 'In global engineering' },
              { number: '95%', label: 'Client Retention', sublabel: 'Long-term partnerships' },
              { number: '24/7', label: 'Support', sublabel: 'Global project coverage' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-300">{stat.number}</div>
                <div className="text-lg font-semibold mb-2 text-white">{stat.label}</div>
                <div className="text-blue-200 text-sm">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>

          {/* Hub & Spoke for Enterprises */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-center mb-8">Hub & Spoke Model for Enterprises</h3>
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* German Hub */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-yellow-500 mx-auto flex items-center justify-center shadow-2xl rounded-full mb-4">
                    <span className="text-white text-2xl font-bold">🇩🇪</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">German Hub</h4>
                  <p className="text-blue-200 text-sm">Quality control, compliance management, client relations</p>
                </div>

                {/* Connection */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 mx-auto flex items-center justify-center shadow-2xl rounded-full mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Coordination</h4>
                  <p className="text-blue-200 text-sm">Project management, quality assurance, vendor coordination</p>
                </div>

                {/* Global Partners */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-green-500 mx-auto flex items-center justify-center shadow-2xl rounded-full mb-4">
                    <span className="text-white text-2xl font-bold">🌐</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Global Partners</h4>
                  <p className="text-blue-200 text-sm">Specialized execution, manufacturing, cost optimization</p>
                </div>
              </div>

              <div className="text-center mt-8">
                <a href="/about/hub-spoke-model">
                  <Button variant="primary-light" size="lg" className="rounded-full">
                    <Globe className="w-5 h-5 mr-2" />
                    Learn More About Our Enterprise Approach
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Enterprise CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Scale Your Engineering Capabilities?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Let's discuss how our enterprise {service.title.toLowerCase()} solutions can accelerate your next major project. 
              From concept to production, we're your strategic engineering partner.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowQuotation(true)}
                className="px-8 py-4 text-lg font-semibold rounded-full"
              >
                Schedule Enterprise Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <a href="/solutions/for-enterprises">
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-full"
                >
                  View All Enterprise Services
                </Button>
              </a>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              Enterprise consultation • Scalable solutions • Usually respond within 24 hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quotation Dialog */}
      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Request Enterprise Quotation</DialogTitle>
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={async (data) => {
              try {
                const response = await fetch('/api/quotes', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ...data,
                    service: service.slug,
                    clientType: 'enterprise'
                  }),
                })

                const result = await response.json()

                if (response.ok) {
                  alert(`Enterprise quote request submitted successfully! Reference: ${result.quoteReference}`)
                  setShowQuotation(false)
                } else {
                  alert(`Failed to submit quote: ${result.error}`)
                }
              } catch (error) {
                console.error('Quote submission error:', error)
                alert('Failed to submit quote request. Please try again.')
              }
            }}
            defaultService={service.slug}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EnterpriseServiceDetails
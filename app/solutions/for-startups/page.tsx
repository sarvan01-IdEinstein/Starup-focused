'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Rocket, 
  Clock, 
  DollarSign, 
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Users,
  TrendingUp
} from 'lucide-react'

const ForStartupsPage = () => {
  const challenges = [
    {
      icon: DollarSign,
      title: 'Limited Budget',
      description: 'Traditional engineering services are expensive and designed for large enterprises',
      solution: 'Our startup package offers 30-50% cost savings with flexible payment options'
    },
    {
      icon: Clock,
      title: 'Time Pressure',
      description: 'Investors and market demands require rapid product development',
      solution: 'Streamlined 12-20 week process from concept to production-ready'
    },
    {
      icon: Users,
      title: 'Expertise Gap',
      description: 'Lack of in-house engineering expertise for complex product development',
      solution: '26+ years of global engineering experience at your disposal'
    },
    {
      icon: Target,
      title: 'Manufacturing Complexity',
      description: 'Finding reliable, cost-effective manufacturing partners is challenging',
      solution: 'Pre-qualified network of Indian manufacturers with cultural bridge support'
    }
  ]

  const successMetrics = [
    { metric: '87%', description: 'Success Rate', detail: 'Projects reach market successfully' },
    { metric: '12-20', description: 'Weeks', detail: 'Concept to production timeline' },
    { metric: '30-50%', description: 'Cost Savings', detail: 'vs. traditional methods' },
    { metric: '40-60%', description: 'Faster', detail: 'Than enterprise solutions' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 pt-20">
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <Rocket className="w-16 h-16 text-yellow-400 mr-4" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-yellow-200 bg-clip-text text-transparent">
                Solutions for Startups
              </h1>
            </div>
            <p className="text-2xl md:text-3xl mb-8 text-gray-300 leading-relaxed">
              From Idea to Market in Record Time
            </p>
            <p className="text-xl mb-8 text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Specialized engineering solutions designed for startups. Fast, cost-effective, 
              and built to scale with your growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="cta-white" size="lg" asChild>
                <Link href="/services/product-development-accelerator">
                  Explore Our Startup Package
                  <Rocket className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Get Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Startup Challenges & Solutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Startup Challenges We Solve</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We understand the unique challenges startups face and have tailored solutions for each
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <challenge.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{challenge.title}</h3>
                        <p className="text-slate-600 mb-4">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                        <p className="text-green-800 font-medium">Our Solution:</p>
                      </div>
                      <p className="text-green-700 mt-1">{challenge.solution}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Solution: Product Development Accelerator */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800">
              Featured: Product Development Accelerator
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our flagship startup solution - a complete 4-phase program designed specifically for early-stage companies
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6">4-Phase Accelerator Process</h3>
                    <div className="space-y-4">
                      {[
                        { phase: 'Phase 1', title: 'Concept Validation', duration: '2-4 weeks' },
                        { phase: 'Phase 2', title: 'MVP & Prototyping', duration: '4-6 weeks' },
                        { phase: 'Phase 3', title: 'Manufacturing Ready', duration: '3-4 weeks' },
                        { phase: 'Phase 4', title: 'Production Support', duration: '2-3 weeks' }
                      ].map((phase, index) => (
                        <div key={phase.phase} className="flex items-center">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                            <span className="text-sm font-bold">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">{phase.title}</span>
                              <span className="text-blue-200 text-sm">{phase.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total Timeline:</span>
                        <span className="text-2xl font-bold text-yellow-300">12-20 weeks</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h4 className="text-xl font-bold text-slate-800 mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {[
                      'Comprehensive feasibility study',
                      'Functional prototype development',
                      'Manufacturing-ready design files',
                      'Qualified supplier identification',
                      'Quality control planning',
                      'Ongoing support and guidance'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-yellow-800 mb-2">💡 Startup Special:</h4>
                  <p className="text-yellow-700">
                    Save 30-40% compared to hiring individual services. 
                    Plus, get access to our pre-qualified Indian manufacturing network.
                  </p>
                </div>

                <Button variant="cta" size="lg" className="w-full" asChild>
                  <Link href="/services/product-development-accelerator">
                    Learn More About Our Accelerator
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Proven Startup Success</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our track record speaks for itself - helping startups bring innovative products to market
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={metric.description}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">{metric.metric}</div>
                <div className="text-lg font-semibold mb-2">{metric.description}</div>
                <div className="text-slate-300 text-sm">{metric.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Need Individual Services?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              While our accelerator package offers the best value, we also provide individual services for specific needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Research & Development', href: '/services/research-development', description: 'Concept validation and feasibility studies' },
              { title: 'CAD Modeling', href: '/services/cad-modeling', description: 'Professional 3D modeling and design' },
              { title: '3D Printing Services', href: '/services/3d-printing', description: 'Rapid prototyping and manufacturing' },
              { title: 'FEA & CFD Analysis', href: '/services/finite-element-cfd', description: 'Advanced simulation and analysis' },
              { title: 'Supplier Sourcing', href: '/services/supplier-sourcing', description: 'Manufacturing partner identification' },
              { title: 'Technical Documentation', href: '/services/technical-documentation', description: 'Professional documentation services' }
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-800">
              Ready to Launch Your Startup?
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Join successful startups who've brought their products to market with our proven solutions. 
              Get your custom timeline and quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg">
                Book Free Startup Consultation
              </Button>
              <Button variant="outline" size="lg">
                Get Custom Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ForStartupsPage
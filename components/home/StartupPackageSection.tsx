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
  Target
} from 'lucide-react'

const StartupPackageSection = () => {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Concept Validation',
      duration: '2-4 weeks',
      description: 'Feasibility study, risk analysis, and preliminary design concepts',
      icon: Target
    },
    {
      phase: 'Phase 2', 
      title: 'MVP & Prototyping',
      duration: '4-6 weeks',
      description: 'Functional prototype development and design validation',
      icon: Zap
    },
    {
      phase: 'Phase 3',
      title: 'Manufacturing Ready',
      duration: '3-4 weeks', 
      description: 'DFM optimization and qualified supplier identification',
      icon: CheckCircle
    },
    {
      phase: 'Phase 4',
      title: 'Production Support',
      duration: '2-3 weeks',
      description: 'Quality control and pilot production oversight (Optional)',
      icon: Rocket
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: '12-20 Weeks',
      subtitle: 'Concept to Production',
      description: '40-60% faster than traditional methods'
    },
    {
      icon: DollarSign,
      title: '30-50% Savings',
      subtitle: 'Cost Reduction',
      description: 'vs. enterprise solutions'
    },
    {
      icon: CheckCircle,
      title: 'Single Contact',
      subtitle: 'Simplified Management',
      description: 'One expert, entire process'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Rocket className="w-12 h-12 text-blue-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              Startup Package
            </h2>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">
            Product Development Accelerator
          </h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From idea to market-ready product in 12-20 weeks. Streamlined process designed specifically for startups, 
            combining German precision with Indian cost-efficiency.
          </p>
        </motion.div>

        {/* Benefits Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 mb-1">{benefit.title}</h4>
              <p className="text-lg font-semibold text-blue-600 mb-2">{benefit.subtitle}</p>
              <p className="text-slate-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 4-Phase Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Our 4-Phase Accelerator Process
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <phase.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-blue-600 mb-2">{phase.phase}</div>
                    <h4 className="text-lg font-bold text-slate-800 mb-2">{phase.title}</h4>
                    <div className="text-sm text-slate-500 mb-3">{phase.duration}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{phase.description}</p>
                  </CardContent>
                </Card>
                
                {/* Arrow connector (hidden on mobile) */}
                {index < phases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to Accelerate Your Startup?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join successful startups who've brought their products to market with our proven accelerator. 
              Get your custom timeline and quote today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="cta" size="lg" asChild>
                <Link href="/services/product-development-accelerator">
                  Explore Startup Package
                  <Rocket className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Get Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-slate-500">
              <p>💡 <strong>Startup Tip:</strong> Most founders save 30-40% by choosing our complete package vs. individual services</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StartupPackageSection
'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { 
  Lightbulb,
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Target, 
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Award,
  FileText,
  Cog
} from 'lucide-react'
import UnifiedHero from '@/components/shared/UnifiedHero'
import UnifiedSection from '@/components/shared/UnifiedSection'
import UnifiedCard from '@/components/shared/UnifiedCard'
import Link from 'next/link'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { UnifiedConsultationCard } from '@/components/shared/UnifiedConsultationCard'
import { research_development } from '@/lib/services/research-development'

export default function ResearchDevelopmentPage() {
  const [showQuotation, setShowQuotation] = useState(false)

  const handleQuotationSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          service: 'research-development'
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Quote request submitted successfully! Reference: ${result.quoteReference}`)
        setShowQuotation(false)
      } else {
        alert(`Failed to submit quote: ${result.error}`)
      }
    } catch (error) {
      console.error('Quote submission error:', error)
      alert('Failed to submit quote request. Please try again.')
    }
  }

  // R&D specific benefits
  const rdBenefits = [
    {
      icon: Zap,
      title: 'Rapid Innovation',
      description: 'Transform ideas into validated concepts in 4-12 months with our systematic approach',
      iconColor: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Comprehensive feasibility studies and validation reduce costly design changes later',
      iconColor: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: '87% Success Rate',
      description: 'Proven track record of bringing innovative products successfully to market',
      iconColor: 'from-purple-500 to-purple-600'
    },
    {
      icon: Globe,
      title: 'Regulatory Expertise',
      description: 'Navigate complex compliance requirements across multiple industries and regions',
      iconColor: 'from-orange-500 to-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'Market Validation',
      description: 'User testing and market analysis ensure product-market fit before launch',
      iconColor: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Cog,
      title: 'Manufacturing Ready',
      description: 'Design for manufacturing approach enables smooth transition to production',
      iconColor: 'from-yellow-500 to-yellow-600'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Unified Hero Section */}
      <UnifiedHero
        badge={{
          icon: Lightbulb,
          text: "R&D Engineering Service"
        }}
        title="Research & Development"
        subtitle="Transform innovative ideas into market-ready products"
        description="Comprehensive validation and regulatory compliance through our proven Hub & Spoke model combining German precision with global innovation."
        primaryCTA={{
          text: "Get R&D Quote",
          onClick: () => setShowQuotation(true),
          icon: ArrowRight
        }}
        secondaryCTA={{
          text: "View All Services",
          href: "/solutions/for-enterprises#services"
        }}
        metrics={[
          { icon: Clock, text: "4-12 Month Timeline" },
          { icon: Target, text: "87% Success Rate" },
          { icon: Shield, text: "Regulatory Compliance" }
        ]}
      />

      {/* Service Features */}
      <UnifiedSection
        title="R&D Service Features"
        subtitle="What's Included"
        description="End-to-end product development with comprehensive technical validation and market preparation"
        background="white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {research_development.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:border-blue-200 transition-colors"
            >
              <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </UnifiedSection>

      {/* Process Overview */}
      <UnifiedSection
        title="Our R&D Process"
        subtitle="9-Step Methodology"
        description="Systematic approach from concept validation to market-ready product with regulatory compliance"
        background="gray"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {research_development.details?.process?.slice(0, 9).map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-${500 + (index % 3) * 100} to-blue-${600 + (index % 3) * 100} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-xl font-bold text-white">{String(index + 1).padStart(2, '0')}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 text-center flex-grow">
                  {step.description}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-center text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4 mr-2" />
                    {step.timeline}
                  </div>

                  {step.keyPoints && step.keyPoints.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2 text-sm">Key Points:</h5>
                      <ul className="space-y-1">
                        {step.keyPoints.slice(0, 2).map((point, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start">
                            <span className="text-blue-500 mr-2 text-xs">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </UnifiedSection>

      {/* Benefits */}
      <UnifiedSection
        title="Why Choose Our R&D Service"
        subtitle="Key Advantages"
        description="Unique benefits that make our R&D approach the right choice for your innovation project"
        background="white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rdBenefits.map((benefit, index) => (
            <UnifiedCard
              key={benefit.title}
              icon={benefit.icon}
              iconColor={benefit.iconColor}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </UnifiedSection>



      {/* Startup Package Cross-Reference */}
      <UnifiedSection
        title="Perfect for Startups"
        subtitle="Included in Accelerator Package"
        description="This R&D service is included in our Product Development Accelerator package designed specifically for startups"
        background="gradient"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Included in Startup Package
              </h3>
            </div>
            <p className="text-blue-200 mb-8 leading-relaxed">
              Get comprehensive R&D services as part of our Product Development Accelerator, 
              designed to take your startup from idea to market in just 12-20 weeks with 30-50% cost savings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services/product-development-accelerator">
                <Button
                  variant="accelerator"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold rounded-full"
                >
                  🚀 View Startup Package
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="secondary-light"
                size="lg"
                onClick={() => setShowQuotation(true)}
                className="px-8 py-4 text-lg font-semibold rounded-full"
              >
                Get Individual Quote
              </Button>
            </div>
          </div>
        </div>
      </UnifiedSection>

      {/* Final CTA */}
      <UnifiedSection
        title="Ready to Start Your R&D Project?"
        subtitle="Next Steps"
        description="Contact us to discuss your innovation project and get a detailed R&D proposal"
        background="white"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowQuotation(true)}
              className="px-8 py-4 text-lg font-semibold rounded-full"
            >
              Get R&D Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href="/solutions/for-enterprises">
              <Button
                variant="secondary"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-full"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </UnifiedSection>

      {/* Quotation Dialog */}
      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Request R&D Service Quotation</DialogTitle>
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={handleQuotationSubmit}
            defaultService="research-development"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
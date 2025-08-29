'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { 
  Rocket, 
  Clock, 
  DollarSign, 
  Shield, 
  Users, 
  TrendingUp,
  ArrowRight,
  Target,
  Zap,
  Globe
} from 'lucide-react'
import UnifiedHero from '@/components/shared/UnifiedHero'
import UnifiedSection from '@/components/shared/UnifiedSection'
import UnifiedCard from '@/components/shared/UnifiedCard'
import Link from 'next/link'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { UnifiedConsultationCard } from '@/components/shared/UnifiedConsultationCard'

const ProductDevelopmentAcceleratorPage = () => {
  const [showQuotation, setShowQuotation] = useState(false)
  const [showConsultation, setShowConsultation] = useState(false)

  const handleQuotationSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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

  const handleConsultationSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Consultation booked successfully! ${result.message}`)
        setShowConsultation(false)
      } else {
        alert(`Failed to book consultation: ${result.message}`)
      }
    } catch (error) {
      console.error('Consultation booking error:', error)
      alert('Failed to book consultation. Please try again.')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Unified Hero Section */}
      <UnifiedHero
        badge={{
          icon: Rocket,
          text: "Featured Startup Solution"
        }}
        title="Product Development"
        highlight="Accelerator"
        subtitle="From Idea to Manufacturing Readiness"
        description="I guide startups from first idea through manufacturing readiness, with you at every stage. A comprehensive engineering program combining 26+ years of mechanical engineering expertise with cost-effective global partnerships."
        primaryCTA={{
          text: "Get Your Project Quote",
          onClick: () => setShowQuotation(true),
          icon: ArrowRight
        }}
        secondaryCTA={{
          text: "Download Process Guide",
          href: "/resources"
        }}
        metrics={[
          { icon: DollarSign, text: 'Budget-Conscious Approach' },
          { icon: Clock, text: 'Realistic Timelines' },
          { icon: Shield, text: 'Personal Founder Support' }
        ]}
      />

      {/* The Challenge Section */}
      <UnifiedSection
        title="Common Product Development Challenges"
        description="From my experience working with startups, these are the most frequent obstacles that slow down product development and increase costs"
        background="white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: DollarSign,
              title: 'High Development Costs',
              description: 'Traditional engineering services are expensive and designed for large enterprises',
              iconColor: 'from-red-500 to-red-600'
            },
            {
              icon: Clock,
              title: 'Long Time-to-Market',
              description: 'Complex processes and multiple vendors slow down product development',
              iconColor: 'from-orange-500 to-orange-600'
            },
            {
              icon: Users,
              title: 'Expertise Gaps',
              description: 'Startups lack in-house engineering expertise for complex product development',
              iconColor: 'from-purple-500 to-purple-600'
            },
            {
              icon: Target,
              title: 'Manufacturing Complexity',
              description: 'Finding reliable, cost-effective manufacturing partners is challenging',
              iconColor: 'from-blue-500 to-blue-600'
            }
          ].map((challenge, index) => (
            <UnifiedCard
              key={challenge.title}
              icon={challenge.icon}
              iconColor={challenge.iconColor}
              title={challenge.title}
              description={challenge.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </UnifiedSection>

      {/* Our Solution Section */}
      <UnifiedSection
        title="The 4-Phase IdEinstein Path"
        subtitle="For Startups"
        description="I guide startups from first idea through manufacturing readiness, with you at every stage. Here's exactly what you get in each phase:"
        background="gray"
      >
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[
            {
              phase: "01",
              title: "Concept & Feasibility",
              duration: "1-2 months",
              description: "Personal consultation to clarify your idea's technical/commercial viability",
              deliverables: [
                "Personal consultation to clarify your idea's technical/commercial viability",
                "Market/regulatory review to assess practical fit for EU/India",
                "Preliminary design sketches or flow diagrams",
                "Feasibility report: risks, recommendations, go/no-go factors"
              ],
              iconColor: "from-blue-500 to-blue-600"
            },
            {
              phase: "02", 
              title: "Design & Prototyping",
              duration: "2-4 months",
              description: "Coordination of CAD modeling and detailed drawings with prototype development",
              deliverables: [
                "Coordination of CAD modeling and detailed drawings",
                "Sourcing of one or more prototype partners (manual or 3D printed, as fits your budget/stage)",
                "Founder's review of prototype and test feedback",
                "Step-by-step management of design iterations"
              ],
              iconColor: "from-green-500 to-green-600"
            },
            {
              phase: "03",
              title: "Validation & Manufacturing Setup", 
              duration: "3-6 months",
              description: "GD&T/tolerance review for production readiness with supplier identification",
              deliverables: [
                "GD&T/tolerance review for production readiness",
                "Identification/search for potential Indian manufacturing partners",
                "Introductions and cultural navigation for supplier discussions",
                "Documentation and SOPs prepared for transfer to manufacturing"
              ],
              iconColor: "from-purple-500 to-purple-600"
            },
            {
              phase: "04",
              title: "Production & Ongoing Support",
              duration: "Ongoing", 
              description: "Ongoing founder-led communication and troubleshooting with suppliers",
              deliverables: [
                "Ongoing founder-led communication and troubleshooting with suppliers",
                "Coordination/review of first articles or pilot runs",
                "Coaching/guidance on quality processes and scaling",
                "Access to \"phone-a-friend\" support as needed as you grow"
              ],
              iconColor: "from-yellow-500 to-yellow-600"
            }
          ].map((step, index) => (
            <motion.div
              key={step.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.iconColor} flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <div className="text-2xl font-bold text-white">{step.phase}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Phase {step.phase}: {step.title}
                    </h3>
                    <div className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 inline-block rounded-lg mb-4">
                      {step.duration}
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">What you get:</h4>
                  <ul className="space-y-2">
                    {step.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </UnifiedSection>

      {/* Business Impact Section */}
      <UnifiedSection
        title="Why Startups Choose My Approach"
        subtitle="Personal Partnership Model"
        description="Unlike large consultancies, I understand startup constraints and work within your budget and timeline with personal attention"
        background="white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: Users,
              title: 'Direct Founder Access',
              description: 'Work directly with me - no account managers or middlemen. Get technical decisions made quickly with personal attention.',
              iconColor: 'from-blue-500 to-blue-600'
            },
            {
              icon: DollarSign,
              title: 'Budget-Conscious Solutions',
              description: 'Flexible approach that fits your funding stage. Cost-efficient global partnerships without compromising quality.',
              iconColor: 'from-green-500 to-green-600'
            },
            {
              icon: Shield,
              title: 'Cultural Bridge Advantage',
              description: 'Navigate supplier discussions with cultural understanding. I handle introductions and communication barriers.',
              iconColor: 'from-purple-500 to-purple-600'
            },
            {
              icon: Target,
              title: 'Realistic Timeline Planning',
              description: 'Honest timelines based on 26+ years experience. No overpromising - just realistic expectations and delivery.',
              iconColor: 'from-orange-500 to-orange-600'
            },
            {
              icon: TrendingUp,
              title: 'Long-term Partnership',
              description: 'Phone-a-friend support as you grow. I stay with your project beyond initial development phases.',
              iconColor: 'from-indigo-500 to-indigo-600'
            },
            {
              icon: Globe,
              title: 'EU-India Manufacturing Bridge',
              description: 'Leverage my network spanning German precision and Indian cost-efficiency for optimal manufacturing solutions.',
              iconColor: 'from-yellow-500 to-yellow-600'
            }
          ].map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${impact.iconColor} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <impact.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {impact.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-center flex-grow">
                  {impact.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Foundation */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Built on Solid Engineering Foundation
            </h3>
            <p className="text-gray-600">
              26+ years of engineering experience applied to startup challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '26+', label: 'Years Experience', sublabel: 'Mechanical Engineering' },
              { number: 'German', label: 'Quality Standards', sublabel: 'International expertise' },
              { number: '12-20', label: 'Weeks Timeline', sublabel: 'Concept to market-ready' },
              { number: '1-on-1', label: 'Personal Attention', sublabel: 'Direct communication' }
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </UnifiedSection>

      {/* How I Work Differently Section */}
      <UnifiedSection
        title="My Founder-Focused Approach"
        subtitle="Personal Engineering Partnership"
        description="What sets my methodology apart: combining deep technical expertise with the personal attention and cultural navigation startups need"
        background="gradient"
      >
        <div className="max-w-6xl mx-auto">
          {/* Main Working Style Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: '👨‍💼',
                title: 'Founder-to-Founder Communication',
                description: 'Direct access to me as the founder - understand your challenges because I\'ve been there',
                highlight: 'Entrepreneurial empathy'
              },
              {
                icon: '🌏',
                title: 'Cultural Navigation Support',
                description: 'Bridge communication gaps with suppliers - I handle cultural nuances and introductions',
                highlight: 'Cross-cultural expertise'
              },
              {
                icon: '📞',
                title: 'Phone-a-Friend Support',
                description: 'Ongoing access even after project completion - I\'m here as you scale and grow',
                highlight: 'Long-term partnership'
              },
              {
                icon: '💰',
                title: 'Budget-Stage Flexibility',
                description: 'Solutions that fit your funding stage - from bootstrap to Series A approaches',
                highlight: 'Startup-conscious pricing'
              },
              {
                icon: '🔍',
                title: 'Honest Feasibility Assessment',
                description: 'Realistic go/no-go recommendations based on market and technical realities',
                highlight: 'Transparent evaluation'
              },
              {
                icon: '🤝',
                title: 'Supplier Relationship Management',
                description: 'Personal coordination with manufacturing partners - I stay involved in supplier communications',
                highlight: 'Ongoing supplier support'
              }
            ].map((approach, index) => (
              <motion.div
                key={approach.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 h-full flex flex-col">
                  <div className="text-center mb-4">
                    <div className="text-4xl">{approach.icon}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 text-center">
                    {approach.title}
                  </h3>
                  
                  <p className="text-blue-200 leading-relaxed mb-4 text-center flex-grow">
                    {approach.description}
                  </p>
                  
                  <div className="mt-auto text-center">
                    <div className="inline-flex items-center bg-yellow-400/20 text-yellow-300 px-3 py-1 text-sm font-medium rounded-lg">
                      {approach.highlight}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Methodology Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Founder-Focused Engineering Partnership
            </h3>
            <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
              I guide startups personally through each phase, combining technical expertise with cultural navigation and long-term support.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-300 mb-1">Personal</div>
                <div className="text-blue-200 text-sm">Founder Guidance</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300 mb-1">Cultural</div>
                <div className="text-blue-200 text-sm">Bridge Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-300 mb-1">Ongoing</div>
                <div className="text-blue-200 text-sm">Partnership</div>
              </div>
            </div>
          </motion.div>
        </div>
      </UnifiedSection>

      {/* Hub & Spoke Reference */}
      <UnifiedSection
        title="Powered by My Hub & Spoke Model"
        description="How my unique approach combines German precision with carefully selected partners to deliver exceptional value"
        background="white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-4 rounded-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">The Bridge Between Two Worlds</h3>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              My Hub & Spoke model connects German engineering standards with carefully selected global partners, 
              delivering world-class results at startup-friendly prices.
            </p>
            
            {/* Hub & Spoke Model Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <Link href="/about/hub-spoke-model">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="group"
                >
                  <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Learn More About My Hub & Spoke Model
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">🇩🇪</div>
                <div className="font-semibold text-gray-900">German Standards</div>
                <div className="text-sm text-gray-600">Quality & Precision</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">🤝</div>
                <div className="font-semibold text-gray-900">Personal Coordination</div>
                <div className="text-sm text-gray-600">Direct Communication</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-2xl mb-2">🌐</div>
                <div className="font-semibold text-gray-900">Global Partners</div>
                <div className="text-sm text-gray-600">Cost Efficiency</div>
              </div>
            </div>
          </div>
        </div>
      </UnifiedSection>

      {/* Final CTA Section */}
      <UnifiedSection
        title="Ready to Start Your Startup Journey?"
        subtitle="Personal Founder Consultation"
        description="Let's have a founder-to-founder conversation about your idea and explore how I can help guide you through each phase"
        background="gradient"
      >
        <div className="max-w-4xl mx-auto">
          {/* Two-Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: What You Get */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Personal Consultation Includes:</h3>
              <ul className="space-y-3 text-blue-200">
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  Founder-to-founder discussion about your vision
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  Honest feasibility assessment and go/no-go factors
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  Realistic timeline and budget discussion
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  Cultural navigation strategy for manufacturing
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  Next steps roadmap tailored to your funding stage
                </li>
              </ul>
            </div>

            {/* Right: CTA */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's Talk About Your Idea
              </h3>
              <p className="text-blue-200 mb-6">
                Personal response within 24 hours
              </p>
              <Button 
                variant="accelerator" 
                size="hero" 
                className="w-full rounded-lg"
                onClick={() => setShowConsultation(true)}
              >
                Book Founder Consultation
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <p className="text-blue-300 text-sm mt-4">
                Free consultation • No commitment required • Direct founder access
              </p>
            </div>
          </div>
        </div>
      </UnifiedSection>

      {/* Quotation Modal */}
      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Request a Project Quotation</DialogTitle>
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={handleQuotationSubmit}
            defaultService="product-development-accelerator"
          />
        </DialogContent>
      </Dialog>

      {/* Consultation Modal */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Book a Free Consultation</DialogTitle>
          <UnifiedConsultationCard
            type="consultation"
            onSubmit={handleConsultationSubmit}
            defaultService="product-development-accelerator"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductDevelopmentAcceleratorPage
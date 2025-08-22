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

const ProductDevelopmentAcceleratorPage = () => {
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
        subtitle="From Idea to Market in 12-20 Weeks"
        description="Streamlined product development for startups. German precision meets Indian cost-efficiency, managed by 26+ years of global engineering experience."
        primaryCTA={{
          text: "Get Your Project Quote",
          href: "/contact",
          icon: ArrowRight
        }}
        secondaryCTA={{
          text: "Download Process Guide",
          href: "/resources"
        }}
        metrics={[
          { icon: DollarSign, text: '30-50% Cost Savings' },
          { icon: Clock, text: '12-20 Week Timeline' },
          { icon: Shield, text: 'German Quality Standards' }
        ]}
      />

      {/* The Challenge Section */}
      <UnifiedSection
        title="The Startup Challenge"
        description="Most startups struggle with product development complexity, high costs, and finding reliable manufacturing partners"
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
        title="Our Solution: 4-Phase Accelerator"
        subtitle="Streamlined Process"
        description="A streamlined, integrated approach that takes your idea from concept to production-ready in 12-20 weeks"
        background="gray"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              phase: "01",
              title: "Concept Validation",
              duration: "2-4 weeks",
              description: "Assess technical and commercial viability with comprehensive analysis",
              iconColor: "from-blue-500 to-blue-600"
            },
            {
              phase: "02", 
              title: "MVP Design & Prototyping",
              duration: "4-6 weeks",
              description: "Develop functional prototype to test core functionalities",
              iconColor: "from-green-500 to-green-600"
            },
            {
              phase: "03",
              title: "Production Optimization", 
              duration: "3-5 weeks",
              description: "Optimize design for manufacturing and scale production",
              iconColor: "from-purple-500 to-purple-600"
            },
            {
              phase: "04",
              title: "Market Launch Support",
              duration: "3-5 weeks", 
              description: "Support market entry with manufacturing and documentation",
              iconColor: "from-yellow-500 to-yellow-600"
            }
          ].map((step, index) => (
            <UnifiedCard
              key={step.phase}
              title={step.title}
              description={step.description}
              iconColor={step.iconColor}
              delay={index * 0.1}
            >
              <div className="mt-4">
                <div className="text-3xl font-bold text-primary mb-2">{step.phase}</div>
                <div className="text-sm text-blue-600 font-medium bg-blue-100 px-3 py-1 rounded-full inline-block">
                  {step.duration}
                </div>
              </div>
            </UnifiedCard>
          ))}
        </div>
      </UnifiedSection>

      {/* Value Proposition Section */}
      <UnifiedSection
        title="Why Startups Choose IdEinstein"
        subtitle="Unique Advantages"
        description="Unique advantages that accelerate your product development journey"
        background="white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: Zap,
              title: 'Accelerated Time-to-Market',
              description: 'Streamlined processes and expert network reduce development cycles by 40-60%',
              iconColor: 'from-blue-500 to-blue-600'
            },
            {
              icon: DollarSign,
              title: 'Cost-Effective Solutions',
              description: 'Access enterprise-level expertise without permanent hires. Leverage cost-efficient Indian manufacturing',
              iconColor: 'from-green-500 to-green-600'
            },
            {
              icon: Shield,
              title: 'Reduced Risk',
              description: '26+ years of global experience guides you through complex engineering and manufacturing challenges',
              iconColor: 'from-purple-500 to-purple-600'
            },
            {
              icon: Users,
              title: 'Single Point of Contact',
              description: 'Simplified project management. One expert managing your entire development process',
              iconColor: 'from-orange-500 to-orange-600'
            },
            {
              icon: TrendingUp,
              title: 'Scalability Built-In',
              description: 'Solutions designed to scale from MVP to mass production as your startup grows',
              iconColor: 'from-indigo-500 to-indigo-600'
            },
            {
              icon: Globe,
              title: 'Cross-Cultural Bridge',
              description: 'Seamless communication with Indian manufacturers. Cultural understanding eliminates friction',
              iconColor: 'from-yellow-500 to-yellow-600'
            }
          ].map((value, index) => (
            <UnifiedCard
              key={value.title}
              icon={value.icon}
              iconColor={value.iconColor}
              title={value.title}
              description={value.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </UnifiedSection>

      {/* Success Metrics Section */}
      <UnifiedSection
        title="Proven Results"
        subtitle="Track Record"
        description="Our accelerator delivers measurable outcomes for startup success"
        background="gradient"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { metric: '12-20', unit: 'Weeks', description: 'Concept to Production' },
            { metric: '40-60%', unit: 'Faster', description: 'Than Traditional Methods' },
            { metric: '30-50%', unit: 'Cost Savings', description: 'vs. Enterprise Solutions' },
            { metric: '26+', unit: 'Years', description: 'Global Experience' }
          ].map((stat, index) => (
            <motion.div
              key={stat.description}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">{stat.metric}</div>
              <div className="text-lg font-semibold mb-2 text-white">{stat.unit}</div>
              <div className="text-blue-200 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </UnifiedSection>

      {/* Hub & Spoke Reference */}
      <UnifiedSection
        title="Powered by Our Hub & Spoke Model"
        description="Learn how our unique business model combines German precision with Indian innovation to deliver exceptional value"
        background="white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">The Bridge Between Two Worlds</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our Hub & Spoke model connects German engineering standards with Indian technical expertise, 
              delivering world-class results at startup-friendly prices.
            </p>
            <Link href="/about/hub-spoke-model">
              <Button className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                Learn About Our Model
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </UnifiedSection>

      {/* Final CTA Section */}
      <UnifiedSection
        title="Ready to Accelerate Your Product Development?"
        subtitle="Get Started Today"
        description="Join successful startups who've brought their ideas to market with our proven 4-phase accelerator"
        background="gradient"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-lg font-semibold rounded-full">
                Get Your Project Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </UnifiedSection>
    </div>
  )
}

export default ProductDevelopmentAcceleratorPage
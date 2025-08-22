'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Zap, Shield, Users, TrendingUp, DollarSign, Clock, Target } from 'lucide-react'
import Link from 'next/link'
import ContactWidget from '@/components/shared/ContactWidget'
import UnifiedHero from '@/components/shared/UnifiedHero'
import UnifiedSection from '@/components/shared/UnifiedSection'
import UnifiedCard from '@/components/shared/UnifiedCard'

export default function HubSpokeModelPage() {
  return (
    <div className="min-h-screen">
      {/* Unified Hero Section */}
      <UnifiedHero
        badge={{
          icon: Globe,
          text: "Our Unique Business Model"
        }}
        title="Hub & Spoke"
        highlight="Model"
        subtitle="The Bridge Between German Precision and Indian Innovation"
        description="Our unique model delivers world-class engineering at startup-friendly prices by combining the best of both worlds."
        primaryCTA={{
          text: "Try Our Startup Package",
          href: "/services/product-development-accelerator",
          icon: ArrowRight
        }}
        secondaryCTA={{
          text: "Schedule Consultation",
          href: "/contact"
        }}
        metrics={[
          { icon: DollarSign, text: '30-50% Cost Savings' },
          { icon: Clock, text: '24/7 Development' },
          { icon: Shield, text: 'German Quality' }
        ]}
      />

      {/* Visual Model Section */}
      <UnifiedSection
        title="How Our Model Works"
        subtitle="Strategic Bridge"
        description="IdEinstein operates as a strategic bridge, connecting German engineering standards with Indian technical expertise to deliver exceptional value"
        background="white"
      >
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8 items-center relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-red-400 via-blue-400 to-green-400 transform -translate-y-1/2 z-0"></div>
            
            {/* German Hub */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative mb-6"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                  <span className="text-white text-4xl font-bold">🇩🇪</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-red-300/50 rounded-full"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-yellow-900" />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">German Hub</h3>
              <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-xl p-6 border border-red-100">
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center"><span className="text-red-500 mr-2">•</span>Quality Standards</li>
                  <li className="flex items-center"><span className="text-red-500 mr-2">•</span>Client Relations</li>
                  <li className="flex items-center"><span className="text-red-500 mr-2">•</span>Project Management</li>
                  <li className="flex items-center"><span className="text-red-500 mr-2">•</span>Final Review</li>
                </ul>
              </div>
            </motion.div>

            {/* IdEinstein Bridge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative mb-6"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-blue-400/50 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-blue-400 rounded-full"
                />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">IdEinstein Bridge</h3>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center"><span className="text-blue-500 mr-2">•</span>Seamless Integration</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">•</span>Quality Assurance</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">•</span>Cultural Translation</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">•</span>24/7 Coordination</li>
                </ul>
              </div>
            </motion.div>

            {/* Indian Spoke */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center relative z-10"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative mb-6"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-green-500 rounded-full mx-auto flex items-center justify-center shadow-2xl">
                  <span className="text-white text-4xl font-bold">🇮🇳</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-green-300/50 rounded-full"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-green-900" />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Indian Spoke</h3>
              <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-xl p-6 border border-green-100">
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li className="flex items-center"><span className="text-green-500 mr-2">•</span>Technical Execution</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">•</span>Innovation & R&D</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">•</span>Cost Optimization</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">•</span>Rapid Development</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </UnifiedSection>

      {/* Key Benefits Section */}
      <UnifiedSection
        title="Why This Model Works"
        subtitle="Six Key Advantages"
        description="Six key advantages that make our Hub & Spoke model the perfect choice for startups and enterprises"
        background="gray"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: DollarSign,
              title: "Cost Optimization",
              description: "30-50% cost savings compared to pure German engineering services while maintaining quality standards.",
              iconColor: "from-green-500 to-emerald-600"
            },
            {
              icon: Shield,
              title: "Quality Assurance",
              description: "German quality standards applied throughout the project lifecycle with rigorous review processes.",
              iconColor: "from-blue-500 to-cyan-600"
            },
            {
              icon: Zap,
              title: "Faster Delivery",
              description: "24/7 development cycle leveraging time zone differences for accelerated project completion.",
              iconColor: "from-purple-500 to-violet-600"
            },
            {
              icon: Users,
              title: "Technical Excellence",
              description: "Access to India's vast pool of skilled engineers and latest technological innovations.",
              iconColor: "from-orange-500 to-red-600"
            },
            {
              icon: Globe,
              title: "Cultural Bridge",
              description: "Deep understanding of both German business culture and Indian technical capabilities.",
              iconColor: "from-indigo-500 to-purple-600"
            },
            {
              icon: TrendingUp,
              title: "Scalability",
              description: "Ability to scale teams up or down based on project requirements without compromising quality.",
              iconColor: "from-yellow-500 to-orange-600"
            }
          ].map((benefit, index) => (
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

      {/* Startup vs Enterprise Benefits */}
      <UnifiedSection
        title="Perfect for Every Business Size"
        subtitle="Scalable Solutions"
        description="Whether you're a startup or enterprise, our Hub & Spoke model delivers value at every stage"
        background="gradient"
      >
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Startup Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Startup Advantages</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                'Access to world-class engineering without German prices',
                'Faster time-to-market with 24/7 development',
                'Scalable team size based on funding stages',
                'German quality standards for global market readiness'
              ].map((advantage, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-start text-blue-200"
                >
                  <span className="text-yellow-400 mr-3 text-lg">•</span>
                  <span>{advantage}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Enterprise Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Enterprise Benefits</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                'Significant cost reduction on large projects',
                'Access to specialized Indian engineering talent',
                'Maintain German compliance and standards',
                'Risk mitigation through proven delivery model'
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-start text-blue-200"
                >
                  <span className="text-yellow-400 mr-3 text-lg">•</span>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </UnifiedSection>

      {/* Process Flow Section */}
      <UnifiedSection
        title="Our Integrated Process"
        subtitle="Four Seamless Steps"
        description="Four seamless steps that bridge German precision with Indian innovation"
        background="white"
      >
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              step: "1",
              title: "German Consultation",
              description: "Initial consultation and requirement analysis with German engineering standards",
              location: "🇩🇪 Germany",
              iconColor: "from-red-500 to-yellow-500"
            },
            {
              step: "2",
              title: "Project Planning",
              description: "Detailed project planning and team allocation with quality checkpoints",
              location: "🌉 Bridge",
              iconColor: "from-blue-500 to-purple-500"
            },
            {
              step: "3",
              title: "Indian Execution",
              description: "Technical execution by skilled Indian engineers with continuous monitoring",
              location: "🇮🇳 India",
              iconColor: "from-orange-500 to-green-500"
            },
            {
              step: "4",
              title: "German Quality Review",
              description: "Final quality review and client delivery meeting German standards",
              location: "🇩🇪 Germany",
              iconColor: "from-purple-500 to-pink-500"
            }
          ].map((phase, index) => (
            <UnifiedCard
              key={index}
              title={phase.title}
              description={phase.description}
              iconColor={phase.iconColor}
              delay={index * 0.2}
            >
              <div className="mt-4 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${phase.iconColor} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                  {phase.step}
                </div>
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">{phase.location}</span>
              </div>
            </UnifiedCard>
          ))}
        </div>
      </UnifiedSection>

      {/* Success Metrics */}
      <UnifiedSection
        title="Proven Results"
        subtitle="Track Record"
        description="Numbers that demonstrate the power of our Hub & Spoke model"
        background="gray"
      >
        <div className="grid md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
          {[
            { metric: "30-50%", label: "Cost Savings", iconColor: "from-green-500 to-emerald-600" },
            { metric: "24/7", label: "Development Cycle", iconColor: "from-blue-500 to-cyan-600" },
            { metric: "100%", label: "German Quality Standards", iconColor: "from-purple-500 to-violet-600" },
            { metric: "12-20", label: "Weeks to Market", iconColor: "from-orange-500 to-red-600" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`text-5xl font-bold bg-gradient-to-r ${stat.iconColor} bg-clip-text text-transparent mb-2`}
              >
                {stat.metric}
              </motion.div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </UnifiedSection>

      {/* Final CTA Section */}
      <UnifiedSection
        title="Ready to Experience the Hub & Spoke Advantage?"
        subtitle="Get Started Today"
        description="Join startups and enterprises who have discovered the power of combining German precision with Indian innovation"
        background="gradient"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/services/product-development-accelerator">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-10 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105">
                🚀 Try Our Startup Package
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-10 py-5 text-xl font-semibold rounded-full backdrop-blur-sm">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </UnifiedSection>

      <ContactWidget />
    </div>
  );
}
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Users, 
  Target, 
  Zap,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Printer,
  Boxes,
  Cog,
  Shield,
  Globe,
  Info,
  Wrench,
  CheckSquare
} from 'lucide-react'
import ContactWidget from '@/components/shared/ContactWidget'
import { UnifiedConsultationCard } from '@/components/shared/UnifiedConsultationCard'
import { useRouter } from 'next/navigation'

// Icon mapping helper
const iconMap: Record<string, any> = {
  Lightbulb,
  Printer,
  Boxes,
  Cog,
  Zap,
  Shield,
  Target,
  Clock,
  Globe,
  Users,
  Wrench,
  CheckSquare,
  Info
}

interface ProcessStep {
  title: string
  description: string
  timeline: string
  keyPoints: string[]
  deliverables: string[]
}

interface ServiceSpec {
  category: string
  items: Array<{
    label: string
    value: string
  }>
}

interface InteractiveServicePageProps {
  title: string
  description: string
  icon: string
  features: string[]
  specifications: ServiceSpec[]
  process: ProcessStep[]
  benefits: Array<{
    icon: string
    title: string
    description: string
    iconColor?: string
  }>
  startupRelevant?: boolean
}

export default function InteractiveServicePage({
  title,
  description,
  icon: serviceIconName,
  features,
  specifications,
  process,
  benefits,
  startupRelevant = false
}: InteractiveServicePageProps) {
  const router = useRouter()
  const [showQuotation, setShowQuotation] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const ServiceIcon = iconMap[serviceIconName] || Boxes

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          className="shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40 bg-white hover:bg-white text-primary/80 hover:text-primary rounded-full px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
      </motion.div>

      <div className="container mx-auto px-4 pb-12 pt-24">
        {/* Startup Package Cross-Reference */}
        {startupRelevant && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">🚀</span>
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium">
                      <strong>Startup?</strong> This service is included in our Product Development Accelerator Package
                    </p>
                    <p className="text-blue-600 text-sm">Save 30-40% with our complete startup solution</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/product-development-accelerator" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                    View Package
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 md:py-12 rounded-2xl mb-12">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <ServiceIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    Professional Engineering Service
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-6 text-gray-900">{title}</h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">{description}</p>
                
                {/* Metrics */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Fast Delivery
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    Expert Team
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="w-4 h-4 mr-2 text-primary" />
                    Precise Results
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    onClick={() => setShowQuotation(true)}
                    className="bg-primary hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    Get Service Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    asChild
                    className="border-primary text-primary hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    <Link href="/solutions/for-enterprises">
                      View All Services
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100"
              >
                {/* Service visualization placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                      <ServiceIcon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
                    <p className="text-gray-600 max-w-md">{description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Features</h2>
              <p className="text-xl text-gray-600">What's included in this service</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
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
          </div>
        </section>

        {/* Interactive Process Flow */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl my-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
              <p className="text-xl text-gray-600">Step-by-step methodology for quality results</p>
            </motion.div>

            {/* Process Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 bg-white rounded-full p-2 shadow-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <div className="flex space-x-2 px-4">
                  {process.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentStep ? 'bg-primary' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(Math.min(process.length - 1, currentStep + 1))}
                  disabled={currentStep === process.length - 1}
                  className="rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Current Step Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <Card className="overflow-hidden shadow-xl">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Process Image */}
                      <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-100 to-indigo-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{currentStep + 1}</span>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Step {currentStep + 1}</h4>
                            <p className="text-gray-600">{process[currentStep].title}</p>
                          </div>
                        </div>
                      </div>

                      {/* Process Details */}
                      <div className="p-8">
                        <div className="flex items-center mb-4">
                          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                            Step {currentStep + 1} of {process.length}
                          </span>
                          <div className="flex items-center ml-4 text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {process[currentStep].timeline}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {process[currentStep].title}
                        </h3>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {process[currentStep].description}
                        </p>

                        {/* Key Points */}
                        {process[currentStep].keyPoints.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Key Points:</h4>
                            <ul className="space-y-2">
                              {process[currentStep].keyPoints.slice(0, 3).map((point, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Deliverables */}
                        {process[currentStep].deliverables.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Deliverables:</h4>
                            <div className="flex flex-wrap gap-2">
                              {process[currentStep].deliverables.map((deliverable, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                >
                                  {deliverable}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Service Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose This Service</h2>
              <p className="text-xl text-gray-600">Key benefits that make us the right choice</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {benefits.map((benefit, index) => {
                const BenefitIcon = iconMap[benefit.icon] || Target
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                      <CardContent className="p-8 text-center h-full flex flex-col">
                        <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${benefit.iconColor || 'from-blue-500 to-blue-600'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <BenefitIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed flex-grow">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Specifications</h2>
              <p className="text-xl text-gray-600">Detailed specifications and capabilities</p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              {specifications.map((spec, index) => (
                <motion.div
                  key={spec.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="mb-12 last:mb-0"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{spec.category}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {spec.items.map((item, idx) => (
                      <Card key={idx} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-3">
                            <span className="text-sm font-medium text-primary uppercase tracking-wide">
                              {item.label}
                            </span>
                            <span className="text-lg font-semibold text-gray-900 leading-relaxed">
                              {item.value}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 mb-8">Contact us to discuss your project requirements and get a detailed quote</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => setShowQuotation(true)}
                  className="bg-primary hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                >
                  Get Service Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                  className="border-primary text-primary hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full"
                >
                  <Link href="/solutions/for-enterprises">
                    View All Services
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Quotation Dialog */}
      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Request a Quotation</DialogTitle>
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={async (data) => {
              try {
                console.log('📝 Submitting quote request from service page:', data)
                
                const response = await fetch('/api/quotes', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })

                const result = await response.json()

                if (response.ok) {
                  console.log('✅ Quote submitted successfully:', result)
                  alert(`Quote request submitted successfully! Reference: ${result.quoteReference}`)
                  setShowQuotation(false)
                } else {
                  console.error('❌ Quote submission failed:', result)
                  alert(`Failed to submit quote: ${result.error}`)
                }
              } catch (error) {
                console.error('❌ Quote submission error:', error)
                alert('Failed to submit quote request. Please try again.')
              }
            }}
          />
        </DialogContent>
      </Dialog>

      <ContactWidget />
    </div>
  )
}
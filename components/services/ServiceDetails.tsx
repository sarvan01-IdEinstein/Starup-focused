'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UnifiedConsultationCard } from "@/components/shared/UnifiedConsultationCard";
import ProcessFlow from './ProcessFlow';
import type { Service } from '@/lib/types';

interface ServiceDetailsProps {
  service: Service;
}

// Helper function to get correct service hero image path
const getServiceHeroImage = (service: Service): string => {
  // Map service slugs to their actual directory structure
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
  };
  
  const servicePath = servicePathMap[service.slug] || `engineering/${service.slug}`;
  return `/images/services/${servicePath}/main/service-hero.jpg`;
};

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  const router = useRouter();
  const [showQuotation, setShowQuotation] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Button
          onClick={() => router.push('/solutions/for-enterprises#services')}
          variant="accelerator"
          className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6"
          aria-label="Go back to services overview page"
          role="button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
      </motion.div>

      <div className="container mx-auto px-4 pb-12 pt-24">
        {/* Startup Package Cross-Reference */}
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

        {/* Hero Section - Updated to use unified design */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
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

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge */}
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 mb-8 rounded-lg">
                  <span className="text-white/90 text-sm font-medium">
                    Professional Engineering Service
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                  {service.title}
                </h1>

                {/* Description */}
                <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
                  {service.description}
                </p>
                
                <p className="text-lg text-blue-200 mb-12 max-w-3xl mx-auto">
                  Delivered through our proven Hub & Spoke model combining German precision with global innovation.
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap justify-center gap-8 mb-12">
                  <div className="flex items-center text-sm text-white/80">
                    <div className="w-4 h-4 mr-2 text-blue-400">⏱️</div>
                    Fast Delivery
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <div className="w-4 h-4 mr-2 text-blue-400">👥</div>
                    Expert Team
                  </div>
                  <div className="flex items-center text-sm text-white/80">
                    <div className="w-4 h-4 mr-2 text-blue-400">🎯</div>
                    Precise Results
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    variant="primary-light"
                    size="lg"
                    onClick={() => setShowQuotation(true)}
                    className="px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    Get Service Quote
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
            </div>
          </div>
        </section>

        {/* Service Image Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >

              <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 shadow-xl">
                <Image
                  src={getServiceHeroImage(service)}
                  alt={`${service.title} service visualization`}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Fallback icon if image fails to load */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 group-[.error]:opacity-100">
                  <div className="text-center p-6">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {service.icon === 'Printer3d' ? (
                          <>
                            <path d="M6 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                          </>
                        ) : service.icon === 'Boxes' ? (
                          <>
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                          </>
                        ) : (
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        )}
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 max-w-md">{service.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section - Updated with unified design */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium mb-6 bg-blue-100 text-blue-800">
                What's Included
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Service Features</h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600">
                Comprehensive features designed to meet your engineering needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {service.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:border-blue-200 transition-colors"
                >
                  <Check className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
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



        {/* Startup Package Cross-Reference - Add this for startup-relevant services */}
        {(service.slug === 'research-development' || 
          service.slug === 'cad-modeling' || 
          service.slug === 'machine-design' ||
          service.slug === 'finite-element-cfd' ||
          service.slug === 'gdt-tolerance' ||
          service.slug === 'technical-documentation' ||
          service.slug === '3d-printing' ||
          service.slug === 'supplier-sourcing') && (
          <section className="py-20 bg-gradient-to-r from-primary via-blue-800 to-blue-900 text-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-sm font-medium mb-6 text-white/90">
                  Included in Accelerator Package
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Perfect for Startups</h2>
                <p className="text-xl max-w-3xl mx-auto leading-relaxed text-blue-200">
                  This service is included in our Product Development Accelerator package designed specifically for startups
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Included in Startup Package
                    </h3>
                  </div>
                  <p className="text-blue-200 mb-8 leading-relaxed">
                    Get this service as part of our comprehensive Product Development Accelerator, 
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
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium mb-6 bg-blue-100 text-blue-800">
                Next Steps
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Ready to Get Started?</h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-600 mb-8">
                Contact us to discuss your project requirements and get a detailed quote
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setShowQuotation(true)}
                  className="px-8 py-4 text-lg font-semibold rounded-full"
                >
                  Get Service Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <a href="/solutions/for-enterprises">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    View All Services
                  </Button>
                </a>
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
                console.log('📝 Submitting quote request from service page:', data);
                
                const response = await fetch('/api/quotes', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                  console.log('✅ Quote submitted successfully:', result);
                  alert(`Quote request submitted successfully! Reference: ${result.quoteReference}`);
                  setShowQuotation(false);
                } else {
                  console.error('❌ Quote submission failed:', result);
                  alert(`Failed to submit quote: ${result.error}`);
                }
              } catch (error) {
                console.error('❌ Quote submission error:', error);
                alert('Failed to submit quote request. Please try again.');
              }
            }}
            defaultService={service.slug}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceDetails;

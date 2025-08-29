"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Globe,
  Zap,
  Target,
  Clock,
  Users,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UnifiedConsultationCard } from "@/components/shared/UnifiedConsultationCard";
import ProcessFlow from "./ProcessFlow";
import type { Service } from "@/lib/types";

interface ProfessionalServiceDetailsProps {
  service: Service;
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
    "supplier-sourcing": "manufacturing/supplier-sourcing",
  };

  const servicePath =
    servicePathMap[service.slug] || `engineering/${service.slug}`;
  return `/images/services/${servicePath}/main/service-hero.jpg`;
};

// Service-specific customizations
const getServiceCustomization = (slug: string) => {
  const customizations: Record<string, any> = {
    "research-development": {
      emoji: "🔬",
      color: "from-blue-500 to-indigo-600",
      challenge: "Turning innovative ideas into market-ready products",
      solution: "Systematic R&D process with regulatory compliance",
      timeline: "4-12 months",
      highlight: "87% Success Rate",
    },
    "cad-modeling": {
      emoji: "🎯",
      color: "from-purple-500 to-blue-600",
      challenge: "Creating precise technical designs and documentation",
      solution: "Advanced CAD modeling with manufacturing focus",
      timeline: "2-8 weeks",
      highlight: "Production-Ready",
    },
    "machine-design": {
      emoji: "⚙️",
      color: "from-orange-500 to-red-600",
      challenge: "Designing complex industrial machinery systems",
      solution: "Comprehensive machine design with automation",
      timeline: "6-16 weeks",
      highlight: "Industrial Grade",
    },
    "3d-printing": {
      emoji: "🖨️",
      color: "from-green-500 to-teal-600",
      challenge: "Rapid prototyping and small-batch production",
      solution: "Multi-material 3D printing with post-processing",
      timeline: "1-4 weeks",
      highlight: "Same-Day Quotes",
    },
    "finite-element-cfd": {
      emoji: "🧮",
      color: "from-cyan-500 to-blue-600",
      challenge: "Optimizing designs through advanced simulation",
      solution: "FEA & CFD analysis with performance optimization",
      timeline: "2-6 weeks",
      highlight: "99% Accuracy",
    },
    "gdt-tolerance": {
      emoji: "📐",
      color: "from-indigo-500 to-purple-600",
      challenge: "Ensuring precision in manufacturing tolerances",
      solution: "GD&T analysis with quality system implementation",
      timeline: "1-3 weeks",
      highlight: "Precision Focus",
    },
    "supplier-sourcing": {
      emoji: "🌐",
      color: "from-emerald-500 to-green-600",
      challenge: "Finding reliable, cost-effective manufacturing partners",
      solution: "Global supplier network with quality assurance",
      timeline: "2-8 weeks",
      highlight: "Global Network",
    },
    "technical-documentation": {
      emoji: "📋",
      color: "from-yellow-500 to-orange-600",
      challenge: "Creating comprehensive technical documentation",
      solution: "Complete documentation with regulatory compliance",
      timeline: "1-4 weeks",
      highlight: "Compliance Ready",
    },
    "biw-design": {
      emoji: "🚗",
      color: "from-red-500 to-pink-600",
      challenge: "Automotive body-in-white engineering challenges",
      solution: "BIW design with crash safety and manufacturing focus",
      timeline: "8-20 weeks",
      highlight: "Automotive Grade",
    },
  };

  return (
    customizations[slug] || {
      emoji: "🔧",
      color: "from-blue-500 to-purple-600",
      challenge: "Complex engineering challenges",
      solution: "Professional engineering solutions",
      timeline: "2-12 weeks",
      highlight: "Expert Quality",
    }
  );
};

const ProfessionalServiceDetails = ({
  service,
}: ProfessionalServiceDetailsProps) => {
  const router = useRouter();
  const [showQuotation, setShowQuotation] = useState(false);
  const customization = getServiceCustomization(service.slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Check if service is startup-relevant
  const isStartupRelevant = [
    "research-development",
    "cad-modeling",
    "machine-design",
    "finite-element-cfd",
    "gdt-tolerance",
    "technical-documentation",
    "3d-printing",
    "supplier-sourcing",
  ].includes(service.slug);

  return (
    <div className="min-h-screen">
      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 left-8 z-50"
      >
        <Button
          onClick={() => router.push("/solutions/for-enterprises#services")}
          variant="accelerator"
          className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
      </motion.div>

      {/* Hero Section - Professional & Engaging */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
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
                  <span className="text-2xl mr-3">{customization.emoji}</span>
                  <span className="text-white/90 text-sm font-medium">
                    Professional Engineering Service
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {service.title}
                </h1>

                {/* Personal Touch */}
                <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                  <span className="text-yellow-300 font-semibold">
                    I personally handle
                  </span>{" "}
                  {customization.challenge.toLowerCase()}
                  using my 26+ years of mechanical engineering expertise.
                </p>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      icon: Clock,
                      text: customization.timeline,
                      label: "Timeline",
                    },
                    {
                      icon: Target,
                      text: customization.highlight,
                      label: "Quality",
                    },
                    {
                      icon: Users,
                      text: "Direct Access",
                      label: "To Engineer",
                    },
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
                      <div className="text-blue-200 text-sm">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="accelerator"
                    size="lg"
                    onClick={() => setShowQuotation(true)}
                    className="px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    Get Expert Quote
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
                    alt={`${service.title} service visualization`}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Fallback with service icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="text-center p-8">
                      <div
                        className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${customization.color} flex items-center justify-center shadow-xl`}
                      >
                        <span className="text-4xl">{customization.emoji}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 max-w-md leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${customization.color} flex items-center justify-center`}
                    >
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        26+
                      </div>
                      <div className="text-gray-600 text-sm">
                        Years Experience
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* The Challenge & My Solution */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Challenge I Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From my 26+ years of engineering experience, here's the specific
              challenge this service addresses and how my approach delivers
              results.
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
                  <h3 className="text-2xl font-bold text-gray-900">
                    The Challenge
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {customization.challenge}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Complex technical requirements
                  </div>
                  <div className="flex items-center text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Time and budget constraints
                  </div>
                  <div className="flex items-center text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Need for specialized expertise
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
                  <h3 className="text-2xl font-bold text-gray-900">
                    My Solution
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {customization.solution}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    26+ years of proven experience
                  </div>
                  <div className="flex items-center text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    German quality standards
                  </div>
                  <div className="flex items-center text-green-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Direct personal attention
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What You Get
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive service features designed with 26+ years of
              engineering experience
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
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-r ${customization.color} flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {feature}
                    </p>
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

      {/* Hub & Spoke Integration */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by My Hub & Spoke Model
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              How I deliver German quality standards with cost-effective global
              partnerships
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* German Hub */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-yellow-500 mx-auto flex items-center justify-center shadow-2xl rounded-full mb-6">
                  <span className="text-white text-3xl font-bold">🇩🇪</span>
                </div>
                <h3 className="text-xl font-bold mb-4">German Hub (Me)</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-blue-200 text-sm">
                    Quality control, client relations, project management
                  </p>
                </div>
              </motion.div>

              {/* Connection */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 mx-auto flex items-center justify-center shadow-2xl rounded-full mb-6">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">My Coordination</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-blue-200 text-sm">
                    Vendor selection, quality assurance, cultural bridge
                  </p>
                </div>
              </motion.div>

              {/* Global Partners */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-green-500 mx-auto flex items-center justify-center shadow-2xl rounded-full mb-6">
                  <span className="text-white text-3xl font-bold">🌐</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Selected Partners</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-blue-200 text-sm">
                    Technical execution, manufacturing, cost optimization
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mt-12"
            >
              <a href="/about/hub-spoke-model">
                <Button
                  variant="primary-light"
                  size="lg"
                  className="rounded-full"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Learn More About My Approach
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Let's discuss your {service.title.toLowerCase()} requirements. I
              typically respond within 24 hours with a detailed proposal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="accelerator"
                size="lg"
                onClick={() => setShowQuotation(true)}
                className="px-8 py-4 text-lg font-semibold rounded-full"
              >
                Get Expert Quote
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

            <p className="text-gray-500 text-sm mt-6">
              Free consultation • No commitment required • Usually respond
              within 24 hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quotation Dialog */}
      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">
            Request Expert Quotation
          </DialogTitle>
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={async (data) => {
              try {
                const response = await fetch("/api/quotes", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...data,
                    service: service.slug,
                  }),
                });

                const result = await response.json();

                if (response.ok) {
                  alert(
                    `Quote request submitted successfully! Reference: ${result.quoteReference}`
                  );
                  setShowQuotation(false);
                } else {
                  alert(`Failed to submit quote: ${result.error}`);
                }
              } catch (error) {
                console.error("Quote submission error:", error);
                alert("Failed to submit quote request. Please try again.");
              }
            }}
            defaultService={service.slug}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfessionalServiceDetails;

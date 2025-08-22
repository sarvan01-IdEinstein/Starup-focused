"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Target,
  Zap,
  Lightbulb,
  Printer,
  Boxes,
  Cog,
  Shield,
  Globe,
} from "lucide-react";
import Link from "next/link";
import UnifiedHero from "@/components/shared/UnifiedHero";
import UnifiedSection from "@/components/shared/UnifiedSection";
import UnifiedCard from "@/components/shared/UnifiedCard";
import ContactWidget from "@/components/shared/ContactWidget";
import type { LucideIcon } from "lucide-react";

// Icon mapping helper
const iconMap: Record<string, LucideIcon> = {
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
};

interface ProcessStep {
  title: string;
  description: string;
  timeline: string;
  keyPoints: string[];
  deliverables: string[];
}

interface ServiceSpec {
  category: string;
  items: Array<{
    label: string;
    value: string;
  }>;
}

interface UnifiedServicePageProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  specifications: ServiceSpec[];
  process: ProcessStep[];
  benefits: Array<{
    icon: string;
    title: string;
    description: string;
    iconColor?: string;
  }>;
  startupRelevant?: boolean;
}

export default function UnifiedServicePage({
  title,
  description,
  icon: serviceIconName,
  features,
  specifications,
  process,
  benefits,
  startupRelevant = false,
}: UnifiedServicePageProps) {
  const ServiceIcon = iconMap[serviceIconName] || Boxes;

  return (
    <div className="min-h-screen">
      {/* Unified Hero Section */}
      <UnifiedHero
        badge={{
          icon: ServiceIcon,
          text: "Professional Engineering Service",
        }}
        title={title}
        subtitle={description}
        description="Delivered through our proven Hub & Spoke model combining German precision with Indian innovation."
        primaryCTA={{
          text: "Get Service Quote",
          href: "/contact",
          icon: ArrowRight,
        }}
        secondaryCTA={{
          text: "View All Services",
          href: "/solutions/for-enterprises",
        }}
        metrics={[
          { icon: Clock, text: "Fast Delivery" },
          { icon: Users, text: "Expert Team" },
          { icon: Target, text: "Precise Results" },
        ]}
      />

      {/* Service Features */}
      <UnifiedSection
        title="Service Features"
        subtitle="What's Included"
        description="Comprehensive service features designed to meet your engineering needs"
        background="white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100"
            >
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>
      </UnifiedSection>

      {/* Service Benefits */}
      <UnifiedSection
        title="Why Choose This Service"
        subtitle="Key Benefits"
        description="Advantages that make our service the right choice for your project"
        background="gray"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <UnifiedCard
              key={benefit.title}
              icon={benefit.icon}
              iconColor={benefit.iconColor || "from-blue-500 to-blue-600"}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </UnifiedSection>

      {/* Process Overview */}
      <UnifiedSection
        title="Our Process"
        subtitle="Step-by-Step Approach"
        description="Our proven methodology ensures quality results and timely delivery"
        background="white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {process.slice(0, 6).map((step, index) => (
            <UnifiedCard
              key={step.title}
              title={step.title}
              description={step.description}
              delay={index * 0.1}
              iconColor={`from-blue-${500 + (index % 3) * 100} to-blue-${600 + (index % 3) * 100}`}
            >
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full w-fit">
                  <Clock className="w-4 h-4 mr-2" />
                  {step.timeline}
                </div>

                {step.keyPoints.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Key Points:
                    </h5>
                    <ul className="space-y-1">
                      {step.keyPoints.slice(0, 3).map((point, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <span className="text-blue-500 mr-2 text-xs">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </UnifiedCard>
          ))}
        </div>
      </UnifiedSection>

      {/* Specifications */}
      <UnifiedSection
        title="Service Specifications"
        subtitle="Technical Details"
        description="Detailed specifications and capabilities for this service"
        background="gray"
      >
        <div className="max-w-4xl mx-auto">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {spec.category}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {spec.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <span className="font-medium text-gray-700 mr-4">
                      {item.label}:
                    </span>
                    <span className="text-gray-600 text-right flex-1">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </UnifiedSection>

      {/* Startup Package Reference */}
      {startupRelevant && (
        <UnifiedSection
          title="Perfect for Startups"
          subtitle="Startup Package Available"
          description="This service is included in our Product Development Accelerator package designed specifically for startups"
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
              <p className="text-blue-200 mb-6 leading-relaxed">
                Get this service as part of our comprehensive Product
                Development Accelerator, designed to take your startup from idea
                to market in just 12-20 weeks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services/product-development-accelerator">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    🚀 View Startup Package
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm"
                  >
                    Get Individual Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </UnifiedSection>
      )}

      {/* Final CTA */}
      <UnifiedSection
        title="Ready to Get Started?"
        subtitle="Next Steps"
        description="Contact us to discuss your project requirements and get a detailed quote"
        background={startupRelevant ? "white" : "gradient"}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className={`px-8 py-4 text-lg font-semibold rounded-full ${
                  startupRelevant
                    ? "bg-primary hover:bg-blue-700 text-white"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
              >
                Get Service Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/solutions/for-enterprises">
              <Button
                variant="outline"
                size="lg"
                className={`px-8 py-4 text-lg font-semibold rounded-full ${
                  startupRelevant
                    ? "border-primary text-primary hover:bg-blue-50"
                    : "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                }`}
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </UnifiedSection>

      <ContactWidget />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SoloFounderAdvantageSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose a Single Engineering Expert?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlike large consultancies with team-based approaches, you get direct access to 26+ years of mechanical engineering expertise. 
            Personal attention, streamlined communication, and dedicated focus on your project success.
          </p>
        </motion.div>

        {/* Main Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {[
            {
              icon: "🔧",
              title: "Mechanical Engineering Focus",
              description:
                "Unlike software-heavy competitors, I specialize in physical product development and manufacturing",
              highlight: "Physical products expertise",
            },
            {
              icon: "👤",
              title: "Single Expert Model",
              description:
                "Direct access to experienced engineer vs team-based approaches of large consultancies",
              highlight: "No account manager layers",
            },
            {
              icon: "🌍",
              title: "Cross-Cultural Manufacturing",
              description:
                "India → Singapore → Germany journey provides unique global manufacturing perspective",
              highlight: "Global efficiency expertise",
            },
            {
              icon: "⚖️",
              title: "Flexible Engagement Scale",
              description:
                "Can serve both startup MVPs and enterprise complex projects with appropriate approach",
              highlight: "Startup to enterprise scale",
            },
            {
              icon: "🎯",
              title: "Personal Accountability",
              description:
                "I take personal responsibility for your project success from start to finish",
              highlight: "Your success is my reputation",
            },
            {
              icon: "⚡",
              title: "German Quality Standards",
              description:
                "13+ years of German engineering experience with quality processes and efficiency",
              highlight: "German quality + global efficiency",
            },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {benefit.description}
              </p>
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {benefit.highlight}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personal Commitment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-white rounded-2xl p-8 border border-gray-200 shadow-lg max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            The Single Expert Advantage
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Whether you're a startup or enterprise, you get my personal commitment, direct communication, 
            and 26+ years of mechanical engineering expertise focused on your success. No middlemen, no account managers.
          </p>

          {/* Personal Metrics */}
          <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">24h</div>
              <div className="text-gray-600 text-sm">
                Personal Response Time
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                1-on-1
              </div>
              <div className="text-gray-600 text-sm">Direct Access Always</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                100%
              </div>
              <div className="text-gray-600 text-sm">Personal Attention</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/product-development-accelerator">
              <Button
                variant="accelerator"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-lg"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about/hub-spoke-model">
              <Button
                variant="secondary"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-lg"
              >
                Learn About My Approach
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

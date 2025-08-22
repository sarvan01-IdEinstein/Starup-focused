'use client'

import { motion } from 'framer-motion'
import NewHeroSection from '@/components/home/NewHeroSection'
import ValuePropositionSection from '@/components/home/ValuePropositionSection'
import HubSpokeSection from '@/components/home/HubSpokeSection'
import StartupFocusSection from '@/components/home/StartupFocusSection'
import ProvenResultsSection from '@/components/home/ProvenResultsSection'
import ProcessOverviewSection from '@/components/home/ProcessOverviewSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <NewHeroSection />
      <ValuePropositionSection />
      <HubSpokeSection />
      <StartupFocusSection />
      <ProvenResultsSection />
      <ProcessOverviewSection />
      <TestimonialsSection />
      <FinalCTASection />
    </motion.div>
  );
}
'use client'

import { motion } from 'framer-motion'
import DualAudienceHeroSection from '@/components/home/DualAudienceHeroSection'
import SoloFounderAdvantageSection from '@/components/home/SoloFounderAdvantageSection'
import AudienceSegmentationSection from '@/components/home/AudienceSegmentationSection'
import ConditionalContentRenderer from '@/components/home/ConditionalContentRenderer'
import StartupPathContent from '@/components/home/StartupPathContent'
import EnterprisePathContent from '@/components/home/EnterprisePathContent'
import DualCTASection from '@/components/home/DualCTASection'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      {/* 1. Dual Audience Hero - Balanced for both audiences */}
      <DualAudienceHeroSection />
      
      {/* 2. Solo Founder Advantages - Universal appeal */}
      <SoloFounderAdvantageSection />
      
      {/* 3. Audience Segmentation - Let users choose their path */}
      <AudienceSegmentationSection />
      
      {/* 4. Conditional Content - Tailored to selected audience */}
      <ConditionalContentRenderer
        startupContent={<StartupPathContent />}
        enterpriseContent={<EnterprisePathContent />}
      />
      
      {/* 5. Final CTA - Audience-aware conversion actions */}
      <DualCTASection />
    </motion.div>
  );
}
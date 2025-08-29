'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useAudience } from '@/lib/contexts/AudienceContext'
import ConditionalContentRenderer from './ConditionalContentRenderer'

interface AudienceAwareSectionProps {
  children?: ReactNode
  startupContent?: ReactNode
  enterpriseContent?: ReactNode
  sharedContent?: ReactNode
  className?: string
  sectionId?: string
  showAlways?: boolean // If true, always show content regardless of audience selection
}

export default function AudienceAwareSection({
  children,
  startupContent,
  enterpriseContent,
  sharedContent,
  className = '',
  sectionId,
  showAlways = false
}: AudienceAwareSectionProps) {
  const { audienceState, isAudienceSelected } = useAudience()

  // If showAlways is true or no audience-specific content provided, show children
  if (showAlways || (!startupContent && !enterpriseContent)) {
    return (
      <section className={className} id={sectionId}>
        {sharedContent}
        {children}
      </section>
    )
  }

  // If audience is selected, show conditional content
  if (isAudienceSelected && (startupContent || enterpriseContent)) {
    return (
      <section className={className} id={sectionId}>
        {sharedContent}
        <ConditionalContentRenderer
          selectedAudience={audienceState.selectedAudience}
          startupContent={startupContent}
          enterpriseContent={enterpriseContent}
          defaultContent={children}
        />
      </section>
    )
  }

  // Default: show shared content and children
  return (
    <section className={className} id={sectionId}>
      {sharedContent}
      {children}
    </section>
  )
}

// Utility component for audience-specific content blocks
interface AudienceContentBlockProps {
  audience: 'startup' | 'enterprise'
  children: ReactNode
  className?: string
}

export function AudienceContentBlock({ 
  audience, 
  children, 
  className = '' 
}: AudienceContentBlockProps) {
  const { audienceState } = useAudience()
  
  // Only render if the current audience matches or no audience is selected
  if (audienceState.selectedAudience && audienceState.selectedAudience !== audience) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Utility component for shared content that appears for all audiences
interface SharedContentBlockProps {
  children: ReactNode
  className?: string
}

export function SharedContentBlock({ 
  children, 
  className = '' 
}: SharedContentBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
'use client'

import * as React from "react"
import { Calendar, FileText, Lightbulb, Clock, Users } from 'lucide-react'
import UnifiedHero from "@/components/shared/UnifiedHero"
import { UnifiedConsultationCard } from "@/components/shared/UnifiedConsultationCard"
import { FloatingButtons } from "@/components/shared/FloatingButtons"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

function HeroSection() {
  const [showConsultation, setShowConsultation] = React.useState(false)
  const [showQuotation, setShowQuotation] = React.useState(false)
  
  return (
    <>
      <UnifiedHero
        badge={{
          icon: Lightbulb,
          text: "German Precision × Indian Innovation"
        }}
        title="IdEinstein:"
        highlight="Your Global Engineering Partner"
        subtitle="Bridging Innovation from Germany to India, Delivering End-to-End Product Development for Startups & Enterprises"
        description="26+ years of engineering excellence now focused on transforming your ideas into market-ready products through our proven Hub & Spoke methodology."
        primaryCTA={{
          text: "Book Free Consulting",
          onClick: () => setShowConsultation(true),
          icon: Calendar
        }}
        secondaryCTA={{
          text: "Get Quotation",
          onClick: () => setShowQuotation(true)
        }}
        metrics={[
          { icon: Clock, text: "Fast Delivery" },
          { icon: Users, text: "Expert Team" },
          { icon: Lightbulb, text: "Proven Innovation" }
        ]}
      />

      {/* Desktop Modals */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent className="max-w-md">
          <UnifiedConsultationCard
            type="consultation"
            onSubmit={async (data) => {
              console.log('Consultation data:', data)
              setShowConsultation(false)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showQuotation} onOpenChange={setShowQuotation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <UnifiedConsultationCard
            type="quotation"
            onSubmit={async (data) => {
              try {
                console.log('📝 Submitting quote request from homepage:', data);
                
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
          />
        </DialogContent>
      </Dialog>

      {/* Mobile Floating Buttons */}
      <FloatingButtons />
    </>
  )
}

export default HeroSection

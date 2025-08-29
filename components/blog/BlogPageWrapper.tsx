'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { UnifiedConsultationCard } from "@/components/shared/UnifiedConsultationCard";

interface BlogPageWrapperProps {
  children: React.ReactNode;
}

export default function BlogPageWrapper({ children }: BlogPageWrapperProps) {
  const [showConsultation, setShowConsultation] = useState(false);

  useEffect(() => {
    const handleOpenBlogConsultation = () => {
      setShowConsultation(true);
    };

    window.addEventListener('openBlogConsultation', handleOpenBlogConsultation);
    
    return () => {
      window.removeEventListener('openBlogConsultation', handleOpenBlogConsultation);
    };
  }, []);

  const handleConsultationSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Consultation booked successfully! ${result.message}`);
        setShowConsultation(false);
      } else {
        alert(`Failed to book consultation: ${result.message}`);
      }
    } catch (error) {
      console.error('Consultation booking error:', error);
      alert('Failed to book consultation. Please try again.');
    }
  };

  return (
    <>
      {children}
      
      {/* Hero Button Consultation Modal */}
      <Dialog open={showConsultation} onOpenChange={setShowConsultation}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Book a Consultation</DialogTitle>
          <UnifiedConsultationCard
            type="consultation"
            onSubmit={handleConsultationSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
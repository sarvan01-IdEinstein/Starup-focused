'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GoogleAnalytics = () => {
  const [hasConsent, setHasConsent] = useState(false)
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    // Check for existing consent
    const consent = localStorage.getItem('cookie-consent')
    if (consent) {
      const preferences = JSON.parse(consent)
      setHasConsent(preferences.analytics === true)
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      const consent = localStorage.getItem('cookie-consent')
      if (consent) {
        const preferences = JSON.parse(consent)
        setHasConsent(preferences.analytics === true)
      }
    }

    window.addEventListener('storage', handleConsentChange)
    return () => window.removeEventListener('storage', handleConsentChange)
  }, [])

  if (!gaId || gaId === 'G-XXXXXXXXXX' || !hasConsent) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Set default consent to denied
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics
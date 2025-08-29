'use client';

import { useState, useEffect } from 'react';

export default function GDPRConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    document.cookie = 'gdpr-consent=accepted; path=/; max-age=31536000; secure; samesite=strict';
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('gdpr-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            🍪 Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. 
            Durch die weitere Nutzung stimmen Sie der Verwendung von Cookies zu.
            <a href="/privacy" className="underline ml-1">Datenschutzerklärung</a>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors"
          >
            Ablehnen
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
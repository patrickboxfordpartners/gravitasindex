'use client';

import React, { useState, useEffect } from 'react';
import { LeadMagnetModal } from './LeadMagnetModal';

export function ExitIntentPopup() {
  const [showModal, setShowModal] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem('exitIntentShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    let scrollDepthReached = false;

    // Desktop: Mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown) return;

      // Only trigger if mouse is leaving from top of viewport
      if (e.clientY <= 0) {
        setShowModal(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Mobile: Scroll depth detection (50%+)
    const handleScroll = () => {
      if (hasShown || scrollDepthReached) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 50) {
        scrollDepthReached = true;
        setShowModal(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasShown]);

  if (!showModal) return null;

  return <LeadMagnetModal onClose={() => setShowModal(false)} />;
}

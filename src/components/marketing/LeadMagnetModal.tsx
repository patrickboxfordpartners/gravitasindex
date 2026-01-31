'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { trackEvent, AnalyticsEvents, identifyUser } from '@/lib/analytics/posthog';

interface LeadMagnetModalProps {
  onClose: () => void;
}

export function LeadMagnetModal({ onClose }: LeadMagnetModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Track modal view on mount
  useEffect(() => {
    trackEvent(AnalyticsEvents.LEAD_MAGNET_VIEWED);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit');
      }

      setSubmitStatus('success');

      // Identify user and track conversion
      identifyUser(result.leadId, {
        name: formData.name,
        email: formData.email,
        source: 'lead_magnet',
      });

      trackEvent(AnalyticsEvents.LEAD_MAGNET_SUBMITTED, {
        email: formData.email,
      });

      // Auto-download PDF after short delay
      setTimeout(() => {
        if (result.downloadUrl) {
          window.open(result.downloadUrl, '_blank');
        }
      }, 1500);

    } catch (error) {
      console.error('Lead magnet submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close on background click
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      trackEvent(AnalyticsEvents.LEAD_MAGNET_CLOSED, { reason: 'background_click' });
      onClose();
    }
  };

  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-panel border border-border max-w-lg w-full p-8 md:p-12 relative animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-normal mb-4 text-text-main">
              Check Your Email
            </h3>
            <p className="text-text-muted mb-4">
              We&apos;ve sent you a link to download <strong>The Entity Search Playbook</strong>.
            </p>
            <p className="text-sm text-text-muted">
              Your download will start automatically. If it doesn&apos;t, check your email for the link.
            </p>
            <Button
              onClick={onClose}
              variant="default"
              className="mt-6"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="font-mono text-accent text-xs block mb-3 tracking-wider">
                FREE DOWNLOAD
              </span>
              <h2 className="font-serif text-3xl font-normal mb-3 text-text-main">
                The Entity Search Playbook
              </h2>
              <p className="text-text-muted leading-relaxed">
                Learn how Google&apos;s Entity Search works and the exact steps to position yourself
                as the market authority. 7 pages, zero fluff.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Smith"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
              />

              {submitStatus === 'error' && (
                <div className="bg-red-900/20 border border-red-500/50 px-4 py-3 rounded">
                  <p className="text-red-200 text-sm">{errorMessage}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="accent"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Download Free Playbook'}
              </Button>

              <p className="text-xs text-text-muted text-center">
                No spam. We respect your inbox.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

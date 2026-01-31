'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { LeadFormData } from '@/lib/validations/lead';
import { trackEvent, AnalyticsEvents, identifyUser } from '@/lib/analytics/posthog';

export function AlphaForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    market: '',
    role: '',
    pain: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  // Track form view on mount
  useEffect(() => {
    trackEvent(AnalyticsEvents.ALPHA_FORM_VIEWED);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // Track first interaction
    if (!hasStarted) {
      trackEvent(AnalyticsEvents.ALPHA_FORM_STARTED);
      setHasStarted(true);
    }

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
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSubmitStatus('success');

      // Identify user and track successful submission
      identifyUser(result.leadId, {
        name: formData.name,
        email: formData.email,
        market: formData.market,
        role: formData.role,
      });

      trackEvent(AnalyticsEvents.ALPHA_FORM_SUBMITTED, {
        market: formData.market,
        role: formData.role,
        hasPainPoint: !!formData.pain,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        market: '',
        role: '',
        pain: '',
      });

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');

      // Track error
      trackEvent(AnalyticsEvents.ALPHA_FORM_ERROR, {
        error: error instanceof Error ? error.message : 'Unknown error',
        market: formData.market,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-panel border border-border p-10">
      {submitStatus === 'success' ? (
        <div className="text-center py-12">
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
            Application Received
          </h3>
          <p className="text-text-muted mb-6">
            Thank you for your interest. We'll review your application and be in touch within
            24 hours.
          </p>
          <p className="text-sm text-text-muted">
            Check your email for confirmation and next steps.
          </p>
        </div>
      ) : (
        <>
          <h3 className="font-serif text-2xl font-normal mb-6 text-text-main">
            Apply for Alpha Access
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Primary Market"
                name="market"
                type="text"
                required
                value={formData.market}
                onChange={handleChange}
                placeholder="Denver, CO"
              />
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-panel border border-border px-4 py-3 text-text-main font-sans transition-all duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(56,189,248,0.18)]"
                >
                  <option value="">Select...</option>
                  <option value="solo_agent">Solo Agent</option>
                  <option value="team_lead">Team Lead</option>
                  <option value="broker_owner">Broker/Owner</option>
                </select>
              </div>
            </div>

            <TextArea
              label="Biggest Challenge (Optional)"
              name="pain"
              value={formData.pain}
              onChange={handleChange}
              placeholder="What's the biggest obstacle preventing you from dominating your market?"
              rows={4}
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
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>

            <p className="text-xs text-text-muted text-center">
              By submitting, you agree to our{' '}
              <a href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/terms" className="text-accent hover:underline">
                Terms of Service
              </a>
              .
            </p>
          </form>
        </>
      )}
    </div>
  );
}

import posthog from 'posthog-js';

export function initPostHog() {
  if (typeof window !== 'undefined') {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

    if (posthogKey) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('PostHog initialized');
          }
        },
        capture_pageview: false, // We'll manually capture pageviews
        capture_pageleave: true,
        autocapture: false, // Manual event tracking for precision
      });
    }
  }

  return posthog;
}

// Analytics event types
export const AnalyticsEvents = {
  // Page views
  PAGE_VIEWED: 'page_viewed',

  // Alpha form events
  ALPHA_FORM_VIEWED: 'alpha_form_viewed',
  ALPHA_FORM_STARTED: 'alpha_form_started',
  ALPHA_FORM_SUBMITTED: 'alpha_form_submitted',
  ALPHA_FORM_ERROR: 'alpha_form_error',

  // Lead magnet events
  EXIT_INTENT_TRIGGERED: 'exit_intent_triggered',
  LEAD_MAGNET_VIEWED: 'lead_magnet_viewed',
  LEAD_MAGNET_SUBMITTED: 'lead_magnet_submitted',
  LEAD_MAGNET_DOWNLOADED: 'lead_magnet_downloaded',
  LEAD_MAGNET_CLOSED: 'lead_magnet_closed',

  // Navigation events
  CTA_CLICKED: 'cta_clicked',
  NAV_LINK_CLICKED: 'nav_link_clicked',
  EXTERNAL_LINK_CLICKED: 'external_link_clicked',

  // Engagement events
  SECTION_VIEWED: 'section_viewed',
  VIDEO_PLAYED: 'video_played',
  FAQ_CLICKED: 'faq_clicked',
} as const;

// Helper function to track events
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  }
}

// Helper function to identify user
export function identifyUser(
  userId: string,
  properties?: Record<string, any>
) {
  if (typeof window !== 'undefined' && posthog) {
    posthog.identify(userId, properties);
  }
}

// Helper function to track page view
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      $pathname: pagePath,
      $title: pageTitle || document.title,
    });
  }
}

// Helper to reset user (on logout)
export function resetUser() {
  if (typeof window !== 'undefined' && posthog) {
    posthog.reset();
  }
}

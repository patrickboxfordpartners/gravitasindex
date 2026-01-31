import React from 'react';
import { Button } from './Button';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics/posthog';

interface TrackedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'accent';
  children: React.ReactNode;
  trackingLabel: string;
  trackingProperties?: Record<string, any>;
}

export function TrackedButton({
  trackingLabel,
  trackingProperties,
  onClick,
  ...props
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the click
    trackEvent(AnalyticsEvents.CTA_CLICKED, {
      label: trackingLabel,
      ...trackingProperties,
    });

    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return <Button onClick={handleClick} {...props} />;
}

'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error);

    // TODO: Log to error tracking service (e.g., Sentry) in production
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error);
    // }
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="bg-panel border border-border max-w-lg w-full p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="font-serif text-3xl font-normal mb-4 text-text-main">
          Something Went Wrong
        </h1>

        <p className="text-text-muted mb-8">
          We encountered an unexpected error. This has been logged and we'll look into it.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-8 text-left">
            <summary className="cursor-pointer text-text-muted text-sm mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="bg-bg border border-border p-4 rounded text-xs text-red-400 overflow-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={() => reset()} variant="accent">
            Try Again
          </Button>
          <Button onClick={() => window.location.href = '/'} variant="default">
            Go Home
          </Button>
        </div>

        <p className="text-text-muted text-sm mt-8">
          If this persists, contact{' '}
          <a href="mailto:hello@gravitasindex.com" className="text-accent hover:underline">
            hello@gravitasindex.com
          </a>
        </p>
      </div>
    </div>
  );
}

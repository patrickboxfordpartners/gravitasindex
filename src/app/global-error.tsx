'use client';

import { useEffect } from 'react';

/**
 * Global error boundary
 * Catches errors in root layout
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-bg text-text-main font-sans">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-lg w-full text-center">
            <h1 className="text-4xl font-bold mb-4">Application Error</h1>
            <p className="text-text-muted mb-8">
              Something went wrong. Please refresh the page or contact support.
            </p>
            <button
              onClick={() => reset()}
              className="bg-accent text-bg px-6 py-3 rounded font-medium hover:bg-accent/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

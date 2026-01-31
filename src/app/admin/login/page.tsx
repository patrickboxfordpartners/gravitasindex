'use client';

import { useState } from 'react';
import { signInWithEmail } from '@/lib/supabase/client-auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      await signInWithEmail(email);
      setStatus('success');
    } catch (error) {
      console.error('Login error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send login link');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="bg-panel border border-border max-w-md w-full p-8 md:p-12">
        <div className="flex items-center justify-center mb-8">
          <Logo className="mr-3" />
          <span className="font-serif text-2xl text-text-main">
            GRAVITAS INDEX
          </span>
        </div>

        {status === 'success' ? (
          <div className="text-center">
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
            <h2 className="font-serif text-2xl font-normal mb-4 text-text-main">
              Check Your Email
            </h2>
            <p className="text-text-muted">
              We've sent you a magic link to <strong className="text-text-main">{email}</strong>.
              Click the link to sign in to the admin dashboard.
            </p>
          </div>
        ) : (
          <>
            <h1 className="font-serif text-3xl font-normal mb-2 text-text-main text-center">
              Admin Login
            </h1>
            <p className="text-text-muted text-center mb-8">
              Enter your email to receive a magic link
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gravitasindex.com"
              />

              {status === 'error' && (
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
                {isSubmitting ? 'Sending...' : 'Send Magic Link'}
              </Button>

              <p className="text-xs text-text-muted text-center">
                Only authorized administrators can access this dashboard.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

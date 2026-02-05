'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPassword } from '@/lib/supabase/client-auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/ui/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await signInWithPassword(email, password);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="bg-panel border border-border max-w-md w-full p-8 md:p-12">
        <div className="flex items-center justify-center mb-8">
          <Logo />
        </div>

        <h1 className="font-serif text-3xl font-normal mb-2 text-text-main text-center">
          Admin Login
        </h1>
        <p className="text-text-muted text-center mb-8">
          Sign in with your credentials
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

          <Input
            label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          {errorMessage && (
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
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          <p className="text-xs text-text-muted text-center">
            Only authorized administrators can access this dashboard.
          </p>
        </form>
      </div>
    </div>
  );
}

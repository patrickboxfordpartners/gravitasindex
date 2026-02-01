'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useState, useEffect } from 'react';

/**
 * Create Supabase client for Client Components
 * Use this in any client component that needs auth
 */
export function createClientSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

/**
 * Hook to get current user in client components
 * Returns user object and loading state
 */
export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClientSupabaseClient();
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

/**
 * Sign in with email (magic link)
 */
export async function signInWithEmail(email: string) {
  const supabase = createClientSupabaseClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/admin/dashboard`,
    },
  });

  if (error) {
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function signOut() {
  const supabase = createClientSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

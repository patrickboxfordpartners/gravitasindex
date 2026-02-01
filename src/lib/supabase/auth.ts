import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Create Supabase client for Server Components
 * Handles cookie-based auth for server-side rendering
 */
export function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie setting errors (e.g., during static generation)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    }
  );
}

/**
 * Get the current authenticated user
 * Returns null if not authenticated
 */
export async function getUser() {
  const supabase = await createServerSupabaseClient();

  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting user:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error in getUser:', error);
    return null;
  }
}

/**
 * Get the current session
 * Returns null if no active session
 */
export async function getSession() {
  const supabase = await createServerSupabaseClient();

  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error in getSession:', error);
    return null;
  }
}

/**
 * Check if user is authenticated admin
 * Used in middleware and protected routes
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();
  return !!user;
}

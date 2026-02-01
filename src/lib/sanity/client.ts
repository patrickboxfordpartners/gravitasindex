import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for faster reads in production
});

// Helper for fetching content
export async function sanityFetch<T>(query: string, params?: Record<string, any>): Promise<T> {
  return params ? sanityClient.fetch<T>(query, params) : sanityClient.fetch<T>(query);
}

/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or Upstash
 */

type RateLimitStore = Map<string, { count: number; resetTime: number }>;

const store: RateLimitStore = new Map();

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed within the window
   */
  limit: number;

  /**
   * Time window in milliseconds
   */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const record = store.get(identifier);

  // Clean up expired entries periodically
  if (store.size > 10000) {
    cleanupExpiredEntries(now);
  }

  if (!record || now > record.resetTime) {
    // Create new record
    store.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });

    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: now + config.windowMs,
    };
  }

  // Increment count
  record.count++;

  if (record.count > config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - record.count,
    reset: record.resetTime,
  };
}

/**
 * Get client identifier for rate limiting
 * Uses IP address or falls back to user agent
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0] || 'unknown';

  // Combine with user agent for better uniqueness
  const userAgent = request.headers.get('user-agent') || '';
  return `${ip}-${userAgent.slice(0, 50)}`;
}

/**
 * Clean up expired entries from the store
 */
function cleanupExpiredEntries(now: number) {
  for (const [key, record] of store.entries()) {
    if (now > record.resetTime) {
      store.delete(key);
    }
  }
}

/**
 * Preset configurations for common use cases
 */
export const RATE_LIMITS = {
  // Strict limit for sensitive operations (login, payment)
  strict: {
    limit: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  // Moderate limit for form submissions
  moderate: {
    limit: 10,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  // Generous limit for API calls
  generous: {
    limit: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
} as const;

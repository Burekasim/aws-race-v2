/**
 * Simple in-memory rate limiter per IP.
 * In production with multiple Lambda instances, consider using DynamoDB or ElastiCache.
 * This provides basic per-instance anti-abuse.
 */
const requests = new Map();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 30; // per window

export function checkRateLimit(ip) {
  const now = Date.now();
  const key = ip || "unknown";

  if (!requests.has(key)) {
    requests.set(key, []);
  }

  const timestamps = requests.get(key).filter((t) => now - t < WINDOW_MS);
  requests.set(key, timestamps);

  if (timestamps.length >= MAX_REQUESTS) {
    return false;
  }

  timestamps.push(now);
  return true;
}

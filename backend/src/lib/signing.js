import crypto from "node:crypto";

// In production, set this via environment variable GAME_SECRET
const SECRET = process.env.GAME_SECRET || "aws-service-race-secret-k3y-2024";

/**
 * Create a game session token when the game starts.
 * The token signs: challengeId + startService + targetService + sessionId + startedAt
 */
export function createGameToken({ challengeId, startService, targetService }) {
  const sessionId = crypto.randomUUID().slice(0, 12);
  const startedAt = Date.now();
  const payload = `${challengeId}:${startService}:${targetService}:${sessionId}:${startedAt}`;
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex")
    .slice(0, 16);

  return {
    sessionId,
    startedAt,
    token: `${sessionId}:${startedAt}:${signature}`,
  };
}

/**
 * Verify a game token on score submission.
 * Returns { valid, sessionId, startedAt } or { valid: false }
 */
export function verifyGameToken(token, { challengeId, startService, targetService }) {
  if (!token || typeof token !== "string") return { valid: false };

  const parts = token.split(":");
  if (parts.length !== 3) return { valid: false };

  const [sessionId, startedAtStr, providedSig] = parts;
  const startedAt = parseInt(startedAtStr, 10);
  if (isNaN(startedAt)) return { valid: false };

  const payload = `${challengeId}:${startService}:${targetService}:${sessionId}:${startedAt}`;
  const expectedSig = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex")
    .slice(0, 16);

  if (providedSig !== expectedSig) return { valid: false };

  // Token must not be older than 1 hour
  const age = Date.now() - startedAt;
  if (age > 3600_000) return { valid: false };

  // Reported time must be plausible (>= 2 seconds, <= age + small buffer)
  return { valid: true, sessionId, startedAt };
}

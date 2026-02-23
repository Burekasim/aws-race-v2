import { v4 as uuidv4 } from "uuid";
import {
  putChallenge,
  getChallenge,
  putScore,
  getChallengeScores,
  getGlobalScores,
} from "../lib/dynamo.js";
import { checkRateLimit } from "../lib/rateLimit.js";
import { success, error, cors } from "../lib/response.js";
import { createGameToken, verifyGameToken } from "../lib/signing.js";
import {
  services,
  buildAdjacencyMap,
  isValidMove,
  pathExists,
  shortestPathLength,
} from "../../shared/serviceGraph.js";

const adjacencyMap = buildAdjacencyMap();

// Track used tokens (per Lambda instance — short-lived but helps)
const usedTokens = new Set();

function getCurrentRandomChallenge() {
  const epoch45min = Math.floor(Date.now() / (45 * 60 * 1000));
  const ids = Object.keys(services);
  let seed = epoch45min;
  const pseudoRandom = (max) => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed % max;
  };
  let attempts = 0;
  while (attempts < 200) {
    const startIdx = pseudoRandom(ids.length);
    const targetIdx = pseudoRandom(ids.length);
    const start = ids[startIdx];
    const target = ids[targetIdx];
    if (start !== target && shortestPathLength(start, target, adjacencyMap) >= 2) {
      return { challengeId: `random-${epoch45min}`, startService: start, targetService: target };
    }
    attempts++;
  }
  return { challengeId: `random-${epoch45min}`, startService: "cloudfront", targetService: "lambda" };
}

export async function handler(event) {
  const method = event.httpMethod || event.requestContext?.http?.method || "GET";
  const path = event.path || event.rawPath || "/";

  if (method === "OPTIONS") return cors();

  const ip =
    event.requestContext?.identity?.sourceIp ||
    event.requestContext?.http?.sourceIp ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return error(429, "Too many requests. Please slow down.");
  }

  try {
    // GET /api/challenge/random
    if (method === "GET" && path === "/api/challenge/random") {
      return success(getCurrentRandomChallenge());
    }

    // POST /api/challenge/create
    if (method === "POST" && path === "/api/challenge/create") {
      const body = JSON.parse(event.body || "{}");
      const { startService, targetService } = body;
      if (!services[startService] || !services[targetService]) return error(400, "Invalid service IDs.");
      if (startService === targetService) return error(400, "Start and target must be different.");
      if (!pathExists(startService, targetService, adjacencyMap)) return error(400, "No valid path exists.");

      const challengeId = uuidv4().slice(0, 8);
      const challenge = { challengeId, startService, targetService, createdAt: new Date().toISOString() };
      await putChallenge(challenge);
      return success(challenge);
    }

    // GET /api/challenge/:id
    if (method === "GET" && path.startsWith("/api/challenge/")) {
      const challengeId = path.split("/api/challenge/")[1];
      if (!challengeId || challengeId === "random") return error(400, "Invalid challenge ID.");
      const challenge = await getChallenge(challengeId);
      if (!challenge) return error(404, "Challenge not found.");
      return success(challenge);
    }

    // POST /api/game/start — issue signed game token
    if (method === "POST" && path === "/api/game/start") {
      const body = JSON.parse(event.body || "{}");
      const { challengeId, startService, targetService } = body;
      if (!challengeId || !startService || !targetService) return error(400, "Missing fields.");
      const { token } = createGameToken({ challengeId, startService, targetService });
      return success({ gameToken: token });
    }

    // POST /api/score/submit — verify signed token
    if (method === "POST" && path === "/api/score/submit") {
      const body = JSON.parse(event.body || "{}");
      const { challengeId, nickname, steps, timeMs, path: movePath, startService, targetService, gameToken } = body;

      if (!challengeId || !nickname || !steps || !timeMs || !movePath || !startService || !targetService || !gameToken) {
        return error(400, "Missing required fields.");
      }
      if (typeof nickname !== "string" || nickname.length < 1 || nickname.length > 20) {
        return error(400, "Nickname must be 1-20 characters.");
      }

      // Verify game token
      const tokenResult = verifyGameToken(gameToken, { challengeId, startService, targetService });
      if (!tokenResult.valid) return error(403, "Invalid or expired game token.");

      // Prevent reuse (best-effort per instance)
      if (usedTokens.has(gameToken)) {
        return error(403, "Score already submitted for this session.");
      }
      usedTokens.add(gameToken);

      // Time plausibility
      const actualElapsed = Date.now() - tokenResult.startedAt;
      if (timeMs > actualElapsed + 2000) return error(400, "Reported time does not match session.");

      // Validate path
      if (!Array.isArray(movePath) || movePath.length < 2) return error(400, "Invalid path.");
      if (movePath[0] !== startService || movePath[movePath.length - 1] !== targetService) {
        return error(400, "Path must start and end at correct services.");
      }
      for (let i = 0; i < movePath.length - 1; i++) {
        if (!isValidMove(movePath[i], movePath[i + 1], adjacencyMap)) {
          return error(400, `Invalid move: ${movePath[i]} → ${movePath[i + 1]}`);
        }
      }
      if (movePath.length - 1 !== steps) return error(400, "Steps mismatch.");

      const scoreId = uuidv4();
      const score = {
        scoreId,
        challengeId,
        globalPK: "GLOBAL",
        nickname: nickname.trim(),
        steps,
        timeMs,
        startService,
        targetService,
        createdAt: new Date().toISOString(),
      };
      await putScore(score);
      return success({ scoreId });
    }

    // GET /api/leaderboard/global
    if (method === "GET" && path === "/api/leaderboard/global") {
      const scores = await getGlobalScores(20);
      return success(scores);
    }

    // GET /api/leaderboard/:challengeId
    if (method === "GET" && path.startsWith("/api/leaderboard/")) {
      const challengeId = path.split("/api/leaderboard/")[1];
      if (!challengeId || challengeId === "global") return error(400, "Invalid challenge ID.");
      const scores = await getChallengeScores(challengeId, 20);
      return success(scores);
    }

    return error(404, "Not found.");
  } catch (err) {
    console.error("Handler error:", err);
    return error(500, "Internal server error.");
  }
}

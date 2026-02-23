/**
 * Local development server that emulates API Gateway + Lambda.
 * Uses in-memory storage instead of DynamoDB.
 */
import http from "node:http";
import {
  services,
  buildAdjacencyMap,
  isValidMove,
  shortestPathLength,
} from "../../shared/serviceGraph.js";
import { createGameToken, verifyGameToken } from "./lib/signing.js";

const PORT = 3001;
const adjacencyMap = buildAdjacencyMap();

// In-memory stores
const challenges = new Map();
const scores = [];
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
      return {
        challengeId: `random-${epoch45min}`,
        startService: start,
        targetService: target,
      };
    }
    attempts++;
  }
  return {
    challengeId: `random-${epoch45min}`,
    startService: "cloudfront",
    targetService: "lambda",
  };
}

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function json(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body ? JSON.parse(body) : {}));
  });
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === "OPTIONS") return json(res, 200, {});

  try {
    // GET /api/challenge/random
    if (method === "GET" && url === "/api/challenge/random") {
      return json(res, 200, getCurrentRandomChallenge());
    }

    // POST /api/challenge/create
    if (method === "POST" && url === "/api/challenge/create") {
      const body = await readBody(req);
      const { startService, targetService } = body;
      if (!services[startService] || !services[targetService]) {
        return json(res, 400, { error: "Invalid service IDs." });
      }
      if (startService === targetService) {
        return json(res, 400, { error: "Start and target must differ." });
      }
      if (!pathExists(startService, targetService, adjacencyMap)) {
        return json(res, 400, { error: "No valid path exists." });
      }
      const challengeId = generateId();
      const challenge = {
        challengeId,
        startService,
        targetService,
        createdAt: new Date().toISOString(),
      };
      challenges.set(challengeId, challenge);
      return json(res, 200, challenge);
    }

    // GET /api/challenge/:id
    if (method === "GET" && url.match(/^\/api\/challenge\/[^/]+$/)) {
      const challengeId = url.split("/api/challenge/")[1];
      if (challengeId.startsWith("random")) {
        return json(res, 200, getCurrentRandomChallenge());
      }
      const challenge = challenges.get(challengeId);
      if (!challenge) return json(res, 404, { error: "Not found." });
      return json(res, 200, challenge);
    }

    // POST /api/game/start — issue a signed game token
    if (method === "POST" && url === "/api/game/start") {
      const body = await readBody(req);
      const { challengeId, startService, targetService } = body;
      if (!challengeId || !startService || !targetService) {
        return json(res, 400, { error: "Missing fields." });
      }
      const { token } = createGameToken({ challengeId, startService, targetService });
      return json(res, 200, { gameToken: token });
    }

    // POST /api/score/submit — verify signed token
    if (method === "POST" && url === "/api/score/submit") {
      const body = await readBody(req);
      const {
        challengeId,
        nickname,
        steps,
        timeMs,
        path: movePath,
        startService,
        targetService,
        gameToken,
      } = body;

      if (!challengeId || !nickname || !steps || !timeMs || !movePath || !gameToken) {
        return json(res, 400, { error: "Missing fields." });
      }

      // Verify game token
      const tokenResult = verifyGameToken(gameToken, { challengeId, startService, targetService });
      if (!tokenResult.valid) {
        return json(res, 403, { error: "Invalid or expired game token." });
      }

      // Prevent token reuse
      if (usedTokens.has(gameToken)) {
        return json(res, 403, { error: "Score already submitted for this game session." });
      }
      usedTokens.add(gameToken);

      // Verify reported time is plausible
      const actualElapsed = Date.now() - tokenResult.startedAt;
      if (timeMs > actualElapsed + 2000) {
        return json(res, 400, { error: "Reported time does not match session." });
      }

      // Validate path
      for (let i = 0; i < movePath.length - 1; i++) {
        if (!isValidMove(movePath[i], movePath[i + 1], adjacencyMap)) {
          return json(res, 400, { error: `Invalid move: ${movePath[i]} → ${movePath[i + 1]}` });
        }
      }
      if (movePath.length - 1 !== steps) {
        return json(res, 400, { error: "Steps mismatch." });
      }

      const scoreId = generateId();
      const score = {
        scoreId,
        challengeId,
        nickname: nickname.trim().slice(0, 20),
        steps,
        timeMs,
        startService,
        targetService,
        createdAt: new Date().toISOString(),
      };
      scores.push(score);
      return json(res, 200, { scoreId });
    }

    // GET /api/leaderboard/global
    if (method === "GET" && url === "/api/leaderboard/global") {
      const sorted = [...scores].sort((a, b) => a.steps - b.steps || a.timeMs - b.timeMs);
      return json(res, 200, sorted.slice(0, 20));
    }

    // GET /api/leaderboard/:challengeId
    if (method === "GET" && url.match(/^\/api\/leaderboard\/[^/]+$/)) {
      const challengeId = url.split("/api/leaderboard/")[1];
      const filtered = scores
        .filter((s) => s.challengeId === challengeId)
        .sort((a, b) => a.steps - b.steps || a.timeMs - b.timeMs);
      return json(res, 200, filtered.slice(0, 20));
    }

    return json(res, 404, { error: "Not found." });
  } catch (err) {
    console.error(err);
    return json(res, 500, { error: "Internal server error." });
  }
});

server.listen(PORT, () => {
  console.log(`Local API server running at http://localhost:${PORT}`);
  console.log(`Services loaded: ${Object.keys(services).length}`);
});

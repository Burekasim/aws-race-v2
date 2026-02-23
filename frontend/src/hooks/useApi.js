const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  getRandomChallenge: () => request("/challenge/random"),

  createChallenge: (startService, targetService) =>
    request("/challenge/create", {
      method: "POST",
      body: JSON.stringify({ startService, targetService }),
    }),

  getChallenge: (challengeId) => request(`/challenge/${challengeId}`),

  startGame: (challengeId, startService, targetService) =>
    request("/game/start", {
      method: "POST",
      body: JSON.stringify({ challengeId, startService, targetService }),
    }),

  submitScore: (data) =>
    request("/score/submit", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getGlobalLeaderboard: () => request("/leaderboard/global"),

  getChallengeLeaderboard: (challengeId) =>
    request(`/leaderboard/${challengeId}`),
};

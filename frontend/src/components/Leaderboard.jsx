import React, { useState, useEffect, useCallback } from "react";
import { api } from "../hooks/useApi.js";
import { services } from "../data/serviceGraph.js";

function formatTime(ms) {
  const secs = Math.floor(ms / 1000);
  const mins = Math.floor(secs / 60);
  const remainSecs = secs % 60;
  return mins > 0 ? `${mins}m ${remainSecs}s` : `${secs}s`;
}

export default function Leaderboard({ challengeId, refreshTrigger }) {
  const [tab, setTab] = useState("challenge");
  const [globalScores, setGlobalScores] = useState([]);
  const [challengeScores, setChallengeScores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchScores = useCallback(async () => {
    setLoading(true);
    try {
      const [global, challenge] = await Promise.all([
        api.getGlobalLeaderboard().catch(() => []),
        challengeId
          ? api.getChallengeLeaderboard(challengeId).catch(() => [])
          : Promise.resolve([]),
      ]);
      setGlobalScores(global);
      setChallengeScores(challenge);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [challengeId]);

  useEffect(() => {
    fetchScores();
  }, [fetchScores, refreshTrigger]);

  const scores = tab === "global" ? globalScores : challengeScores;

  return (
    <div className="leaderboard">
      <div className="leaderboard__tabs">
        <button
          className={`leaderboard__tab ${tab === "challenge" ? "leaderboard__tab--active" : ""}`}
          onClick={() => setTab("challenge")}
        >
          Challenge
        </button>
        <button
          className={`leaderboard__tab ${tab === "global" ? "leaderboard__tab--active" : ""}`}
          onClick={() => setTab("global")}
        >
          Global
        </button>
      </div>

      <div className="leaderboard__title">
        {tab === "global" ? "Global Leaderboard" : "Challenge Leaderboard"}
      </div>

      {loading && <div className="leaderboard__empty">Loading...</div>}

      {!loading && scores.length === 0 && (
        <div className="leaderboard__empty">
          No scores yet. Be the first!
        </div>
      )}

      {!loading &&
        scores.map((score, i) => (
          <div key={score.scoreId || i} className="leaderboard__entry">
            <span className="leaderboard__rank">#{i + 1}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="leaderboard__nickname">{score.nickname}</div>
              {tab === "global" && score.startService && score.targetService && (
                <div className="leaderboard__meta">
                  {services[score.startService]?.name || score.startService} →{" "}
                  {services[score.targetService]?.name || score.targetService}
                </div>
              )}
            </div>
            <div className="leaderboard__stats">
              <span>{score.steps} steps</span>
              <span>{formatTime(score.timeMs)}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

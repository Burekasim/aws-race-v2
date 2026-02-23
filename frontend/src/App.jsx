import React, { useState, useEffect, useRef, useCallback } from "react";
import Logo from "./components/Logo.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import VictoryOverlay from "./components/VictoryOverlay.jsx";
import Confetti from "./components/Confetti.jsx";
import CustomChallengeModal from "./components/CustomChallengeModal.jsx";
import {
  services,
  CATEGORIES,
  buildAdjacencyMap,
  isValidMove,
  getNeighbors,
} from "./data/serviceGraph.js";
import { api } from "./hooks/useApi.js";

const adjacencyMap = buildAdjacencyMap();

function formatTimer(ms) {
  const secs = Math.floor(ms / 1000);
  const mins = Math.floor(secs / 60);
  const remainSecs = secs % 60;
  return `${mins}:${String(remainSecs).padStart(2, "0")}`;
}

function getShareUrl(challengeId) {
  return `${window.location.origin}${window.location.pathname}?challenge=${challengeId}`;
}

function getCategoryStyle(category) {
  const cat = CATEGORIES[category];
  if (!cat) return { color: "#666", borderColor: "#ccc" };
  return { color: cat.color, borderColor: cat.color };
}

export default function App() {
  const [screen, setScreen] = useState("loading"); // "loading" | "landing" | "game"
  const [challengeId, setChallengeId] = useState(null);
  const [startService, setStartService] = useState(null);
  const [targetService, setTargetService] = useState(null);
  const [currentService, setCurrentService] = useState(null);
  const [path, setPath] = useState([]);
  const [steps, setSteps] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [finalTimeMs, setFinalTimeMs] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);
  const [shareUrl, setShareUrl] = useState(null);
  const [gameToken, setGameToken] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    if (startTime && !gameWon && !gameOver) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime, gameWon, gameOver]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const initGame = useCallback(async (challenge) => {
    setChallengeId(challenge.challengeId);
    setStartService(challenge.startService);
    setTargetService(challenge.targetService);
    setCurrentService(challenge.startService);
    setPath([challenge.startService]);
    setSteps(0);
    setStartTime(Date.now());
    setElapsed(0);
    setGameWon(false);
    setGameOver(false);
    setFinalTimeMs(0);
    setShowVictory(false);
    setShowConfetti(false);
    setShareUrl(null);
    setScreen("game");

    // Request signed game token from server
    try {
      const { gameToken: token } = await api.startGame(
        challenge.challengeId,
        challenge.startService,
        challenge.targetService
      );
      setGameToken(token);
    } catch {
      setGameToken(null);
    }
  }, []);

  // Check URL for challenge param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const challengeParam = params.get("challenge");

    if (challengeParam) {
      // Direct link — skip landing, go straight to game
      api
        .getChallenge(challengeParam)
        .then((c) => initGame(c))
        .catch(() => {
          showToast("Challenge not found", "error");
          setScreen("landing");
        });
    } else {
      setScreen("landing");
    }
  }, [initGame]);

  const handleServiceClick = (serviceId) => {
    if (gameWon || gameOver || !currentService) return;
    if (serviceId === currentService) return;

    if (!isValidMove(currentService, serviceId, adjacencyMap)) {
      showToast("Invalid move!", "error");
      return;
    }

    const newPath = [...path, serviceId];
    const newSteps = steps + 1;
    setPath(newPath);
    setSteps(newSteps);
    setCurrentService(serviceId);

    if (serviceId === targetService) {
      const time = Date.now() - startTime;
      setFinalTimeMs(time);
      setGameWon(true);
      setShowVictory(true);
      setShowConfetti(true);
      clearInterval(timerRef.current);
    } else {
      const nextNeighbors = getNeighbors(serviceId, adjacencyMap).filter(
        (id) => !newPath.includes(id)
      );
      if (nextNeighbors.length === 0) {
        setGameOver(true);
        clearInterval(timerRef.current);
      }
    }
  };

  const handleSubmitScore = async (nickname) => {
    await api.submitScore({
      challengeId,
      nickname,
      steps,
      timeMs: finalTimeMs,
      path,
      startService,
      targetService,
      gameToken,
    });
    setRefreshLeaderboard((r) => r + 1);
    showToast("Score submitted!");
  };

  const handleRestart = () => {
    if (!startService || !targetService) return;
    initGame({ challengeId, startService, targetService });
  };

  const handleNewRandom = async () => {
    try {
      const challenge = await api.getRandomChallenge();
      await initGame(challenge);
      window.history.replaceState({}, "", window.location.pathname);
    } catch {
      showToast("Failed to load challenge", "error");
    }
  };

  const handleBackToHome = () => {
    clearInterval(timerRef.current);
    window.history.replaceState({}, "", window.location.pathname);
    setScreen("landing");
  };

  const handleCreateCustom = async (start, target) => {
    const challenge = await api.createChallenge(start, target);
    await initGame(challenge);
    const url = getShareUrl(challenge.challengeId);
    setShareUrl(url);
    window.history.replaceState({}, "", `?challenge=${challenge.challengeId}`);
    setShowCustomModal(false);
  };

  const handleCopyShareLink = () => {
    const url = shareUrl || getShareUrl(challengeId);
    navigator.clipboard.writeText(url).then(() => {
      showToast("Link copied to clipboard!");
    });
  };

  // ── Loading ──
  if (screen === "loading") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f4f6fa" }}>
        <div style={{ fontSize: 18, color: "#9aa5b4", fontWeight: 600 }}>Loading...</div>
      </div>
    );
  }

  // ── Landing Page ──
  if (screen === "landing") {
    return (
      <>
        <LandingPage
          onStartRandom={handleNewRandom}
          onStartCustom={() => setShowCustomModal(true)}
        />
        {showCustomModal && (
          <CustomChallengeModal
            onCreateChallenge={handleCreateCustom}
            onClose={() => setShowCustomModal(false)}
          />
        )}
        {toast && <div className={`toast toast--${toast.type}`}>{toast.message}</div>}
      </>
    );
  }

  // ── Game ──
  const neighbors = currentService
    ? getNeighbors(currentService, adjacencyMap).filter((id) => !path.includes(id))
    : [];

  const currentSvc = services[currentService];
  const targetSvc = services[targetService];
  const startSvc = services[startService];
  const catStyle = currentSvc ? getCategoryStyle(currentSvc.category) : {};
  const catLabel = currentSvc ? CATEGORIES[currentSvc.category]?.label : "";

  return (
    <>
      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar__logo">
          <Logo size={36} />
          <span className="topbar__logo-text"><span>AWS</span> Service Race</span>
        </div>
        <div className="topbar__challenge">
          <span className="topbar__pill topbar__pill--start">{startSvc?.name}</span>
          <span className="topbar__arrow">→</span>
          <span className="topbar__pill topbar__pill--target">{targetSvc?.name}</span>
        </div>
        <div className="topbar__stats">
          <div className="topbar__stat">
            <span className="topbar__stat-icon">⏱</span>
            <span className="topbar__stat-value">{formatTimer(gameWon ? finalTimeMs : elapsed)}</span>
          </div>
          <div className="topbar__stat">
            <span className="topbar__stat-icon">👣</span>
            <span className="topbar__stat-value">{steps}</span>
          </div>
        </div>
      </div>

      {/* Nav Row */}
      <div className="nav-row">
        <button className="nav-row__back" onClick={handleBackToHome}>
          ← Back to Home
        </button>
        <div className="nav-row__actions">
          <button className="btn btn--ghost" onClick={handleRestart}>Restart</button>
          <button className="btn btn--ghost" onClick={() => setShowCustomModal(true)}>Custom</button>
          <button className="btn btn--primary" onClick={handleCopyShareLink}>Share Link</button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        <div className="game-area">
          {/* Share Banner */}
          {shareUrl && (
            <div className="share-banner">
              <span>
                Challenge link: <span className="share-banner__link">{shareUrl}</span>
              </span>
              <button className="btn btn--primary" style={{ fontSize: 12, padding: "5px 12px" }} onClick={handleCopyShareLink}>
                Copy
              </button>
            </div>
          )}

          {/* Your Path */}
          <div className="path-section">
            <div className="path-section__label">◎ YOUR PATH</div>
            <div className="path-section__pills">
              {path.map((id, i) => (
                <React.Fragment key={id + i}>
                  {i > 0 && <span className="path-separator">→</span>}
                  <span className={`path-pill${i < path.length - 1 ? " path-pill--past" : ""}`}>
                    {services[id]?.name}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Current Service Card */}
          <div className="current-card">
            <div className="current-card__header">
              <div className="current-card__name">
                {currentSvc?.name}
                {currentService === startService && (
                  <span className="current-card__tag current-card__tag--start">✦ Start</span>
                )}
                {currentService === targetService && (
                  <span className="current-card__tag current-card__tag--target">✦ Target</span>
                )}
              </div>
              <span
                className="current-card__category"
                style={{ color: catStyle.color, borderColor: catStyle.color }}
              >
                {catLabel}
              </span>
            </div>
            <div className="current-card__subtitle">{currentSvc?.name}</div>
            <div className="current-card__desc">{currentSvc?.description}</div>
          </div>

          {/* Dead End */}
          {gameOver && (
            <div className="dead-end">
              <div className="dead-end__title">Dead End!</div>
              <div className="dead-end__text">
                No more connected services to visit. You've hit a dead end.
              </div>
              <div className="dead-end__actions">
                <button className="btn btn--primary" onClick={handleRestart}>Try Again</button>
                <button className="btn btn--ghost" onClick={handleNewRandom}>New Challenge</button>
              </div>
            </div>
          )}

          {/* Related Services */}
          {!gameWon && !gameOver && neighbors.length > 0 && (
            <div className="related-section">
              <div className="related-section__title">RELATED SERVICES</div>
              <div className="related-grid">
                {neighbors.map((id) => {
                  const svc = services[id];
                  if (!svc) return null;
                  const isTarget = id === targetService;
                  return (
                    <button
                      key={id}
                      className={`related-chip related-chip--${svc.category}${isTarget ? " related-chip--is-target" : ""}`}
                      onClick={() => handleServiceClick(id)}
                    >
                      {svc.name}
                      <span className="related-chip__arrow">→</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Won state */}
          {gameWon && (
            <div className="related-section" style={{ textAlign: "center" }}>
              <div className="related-grid" style={{ justifyContent: "center" }}>
                <span className={`related-chip related-chip--${targetSvc?.category} related-chip--won`}>
                  {targetSvc?.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <Leaderboard challengeId={challengeId} refreshTrigger={refreshLeaderboard} />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        A fun way to learn AWS service relationships by DoiT.com.
      </footer>

      {showVictory && (
        <VictoryOverlay
          steps={steps}
          timeMs={finalTimeMs}
          startService={startService}
          targetService={targetService}
          challengeUrl={shareUrl || getShareUrl(challengeId)}
          onSubmit={handleSubmitScore}
          onClose={() => setShowVictory(false)}
        />
      )}
      {showConfetti && <Confetti />}
      {showCustomModal && (
        <CustomChallengeModal
          onCreateChallenge={handleCreateCustom}
          onClose={() => setShowCustomModal(false)}
        />
      )}
      {toast && <div className={`toast toast--${toast.type}`}>{toast.message}</div>}
    </>
  );
}

import React from "react";
import Logo from "./Logo.jsx";

export default function LandingPage({ onStartRandom, onStartCustom }) {
  return (
    <div className="landing">
      <div className="landing__card">
        <Logo size={72} />
        <h1 className="landing__title">
          <span className="landing__title--orange">AWS</span> Service Race
        </h1>
        <p className="landing__subtitle">
          A Wikipedia Race-style game for AWS services
        </p>

        <div className="landing__desc">
          <p>
            Navigate from a <strong>Start</strong> service to a <strong>Target</strong> service
            by clicking through related AWS services. Each service connects to others it
            integrates with in real AWS architectures.
          </p>
          <p>
            Find the shortest path in the fastest time. Learn how AWS services
            connect while you race!
          </p>
        </div>

        <div className="landing__how">
          <div className="landing__how-title">How to play</div>
          <div className="landing__steps">
            <div className="landing__step">
              <div className="landing__step-num">1</div>
              <div className="landing__step-text">You start at a random AWS service</div>
            </div>
            <div className="landing__step">
              <div className="landing__step-num">2</div>
              <div className="landing__step-text">Click on related services to navigate forward</div>
            </div>
            <div className="landing__step">
              <div className="landing__step-num">3</div>
              <div className="landing__step-text">Reach the target service in the fewest steps</div>
            </div>
            <div className="landing__step">
              <div className="landing__step-num">4</div>
              <div className="landing__step-text">Submit your score and compete on the leaderboard</div>
            </div>
          </div>
        </div>

        <div className="landing__actions">
          <button className="landing__btn landing__btn--primary" onClick={onStartRandom}>
            Start Random Challenge
          </button>
          <button className="landing__btn landing__btn--ghost" onClick={onStartCustom}>
            Create Custom Challenge
          </button>
        </div>

        <div className="landing__features">
          <div className="landing__feature">
            <span className="landing__feature-icon">⏱</span>
            <span>Timed challenges</span>
          </div>
          <div className="landing__feature">
            <span className="landing__feature-icon">🏆</span>
            <span>Global leaderboard</span>
          </div>
          <div className="landing__feature">
            <span className="landing__feature-icon">🔗</span>
            <span>Shareable challenges</span>
          </div>
          <div className="landing__feature">
            <span className="landing__feature-icon">🔄</span>
            <span>New challenge every 45 min</span>
          </div>
        </div>
      </div>

      <footer className="footer">
        A fun way to learn AWS service relationships by DoiT.com.
      </footer>
    </div>
  );
}

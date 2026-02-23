import React, { useState } from "react";
import { services, buildAdjacencyMap, pathExists } from "../data/serviceGraph.js";

const adjacencyMap = buildAdjacencyMap();
const sortedServices = Object.values(services).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default function CustomChallengeModal({ onCreateChallenge, onClose }) {
  const [startService, setStartService] = useState("");
  const [targetService, setTargetService] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setError("");
    if (!startService || !targetService) {
      setError("Please select both services.");
      return;
    }
    if (startService === targetService) {
      setError("Start and target must be different.");
      return;
    }
    if (!pathExists(startService, targetService, adjacencyMap)) {
      setError("No valid path exists between these services. Try another pair.");
      return;
    }
    setLoading(true);
    try {
      await onCreateChallenge(startService, targetService);
    } catch (e) {
      setError(e.message || "Failed to create challenge.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__title">Create Custom Challenge</div>

        <label className="modal__label">Start Service</label>
        <select
          className="modal__select"
          value={startService}
          onChange={(e) => setStartService(e.target.value)}
        >
          <option value="">Select start service...</option>
          {sortedServices.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <label className="modal__label">Target Service</label>
        <select
          className="modal__select"
          value={targetService}
          onChange={(e) => setTargetService(e.target.value)}
        >
          <option value="">Select target service...</option>
          {sortedServices.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {error && <div className="modal__error">{error}</div>}

        <div className="modal__actions">
          <button className="btn btn--outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn--primary"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create & Play"}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { CATEGORIES } from "../data/serviceGraph.js";

export default function ServiceCard({
  service,
  isStart,
  isTarget,
  isCurrent,
  isNeighbor,
  isVisited,
  isTargetReached,
  onClick,
}) {
  const cat = CATEGORIES[service.category] || {};
  const disabled = !isNeighbor && !isCurrent && !isStart;

  let className = "service-card";
  if (isTargetReached && isTarget) className += " service-card--target-reached";
  else if (isCurrent) className += " service-card--current";
  else if (isStart) className += " service-card--start";
  else if (isTarget) className += " service-card--target";
  else if (isVisited) className += " service-card--visited";
  else if (isNeighbor) className += " service-card--neighbor";
  else className += " service-card--disabled";

  return (
    <div
      className={className}
      onClick={() => {
        if (isNeighbor && !isVisited && onClick) onClick(service.id);
      }}
      role="button"
      tabIndex={isNeighbor ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === "Enter" && isNeighbor && !isVisited && onClick)
          onClick(service.id);
      }}
    >
      {isStart && <span className="service-card__tag service-card__tag--start">START</span>}
      {isTarget && <span className="service-card__tag service-card__tag--target">TARGET</span>}
      <div className="service-card__header">
        <span className="service-card__name">{service.name}</span>
        <span
          className="service-card__badge"
          style={{
            background: `${cat.color || "#666"}22`,
            color: cat.color || "#666",
          }}
        >
          {cat.label || service.category}
        </span>
      </div>
      <p className="service-card__desc">{service.description}</p>
    </div>
  );
}

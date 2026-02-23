import React from "react";

export default function Logo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cloud shape */}
      <path
        d="M16 40c-4.4 0-8-3.6-8-8 0-3.7 2.5-6.8 5.9-7.7C14.6 18.5 19.8 14 26 14c5 0 9.3 3 11.3 7.2C38.4 20.4 39.7 20 41 20c4.4 0 8 3.6 8 8 0 .7-.1 1.4-.3 2 3 1.2 5.3 4.1 5.3 7.6 0 4.4-3.6 8-8 8H16z"
        fill="#FF9900"
        opacity="0.15"
      />
      <path
        d="M16 40c-4.4 0-8-3.6-8-8 0-3.7 2.5-6.8 5.9-7.7C14.6 18.5 19.8 14 26 14c5 0 9.3 3 11.3 7.2C38.4 20.4 39.7 20 41 20c4.4 0 8 3.6 8 8 0 .7-.1 1.4-.3 2 3 1.2 5.3 4.1 5.3 7.6 0 4.4-3.6 8-8 8H16z"
        stroke="#FF9900"
        strokeWidth="2"
        fill="none"
      />
      {/* Arrow path through cloud */}
      <path
        d="M18 32h20"
        stroke="#FF9900"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M34 26l8 6-8 6"
        stroke="#FF9900"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Dots representing services */}
      <circle cx="18" cy="32" r="3" fill="#22c55e" />
      <circle cx="28" cy="32" r="2.5" fill="#3b82f6" />
      <circle cx="42" cy="32" r="3" fill="#ef4444" />
      {/* Bottom bar */}
      <rect x="12" y="46" width="40" height="3" rx="1.5" fill="#FF9900" opacity="0.6" />
    </svg>
  );
}

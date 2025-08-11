import React from "react";

export default function ProgressBar({
  value = 0,
  size = "xs",           // xs | sm | md
  ariaLabel = "Progress"
}) {
  const pct = Math.min(Math.max(value, 0), 100);
  const h = size === "xs" ? "h-[6px]" : size === "sm" ? "h-2.5" : "h-3"; // 6px, 10px, 12px

  return (
    <div
      className={`w-full ${h} rounded-full bg-gray-300`}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`${h} rounded-full bg-blue-600`} style={{ width: `${pct}%` }} />
    </div>
  );
}

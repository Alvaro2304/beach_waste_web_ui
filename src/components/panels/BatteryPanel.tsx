"use client";

import { useRos } from "@/contexts/RosContext";

function getBatteryColor(pct: number): string {
  if (pct > 0.5) return "#5C8A5C";
  if (pct > 0.2) return "#B89B5E";
  return "#B85C5C";
}

export default function BatteryPanel() {
  const { battery } = useRos();
  const pct = battery.percentage;
  const color = getBatteryColor(pct);
  const displayPct = Math.round(pct * 100);

  return (
    <div className="ae-panel h-full flex flex-col">
      <div className="ae-panel-header">
        <span className="ae-panel-header-title">Battery</span>
      </div>
      <div className="ae-panel-body flex flex-col items-center gap-4 flex-1">
        {/* Minimal battery illustration */}
        <div className="relative">
          <svg width="56" height="96" viewBox="0 0 56 96">
            {/* Cap */}
            <rect x="18" y="2" width="20" height="6" rx="2" fill="#D1CCC4" />
            {/* Body */}
            <rect
              x="8" y="8" width="40" height="80" rx="6"
              fill="none" stroke="#D1CCC4" strokeWidth="2"
            />
            {/* Fill */}
            <rect
              x="12"
              y={12 + 72 * (1 - pct)}
              width="32"
              height={72 * pct}
              rx="4"
              fill={color}
              opacity="0.7"
              className="transition-all duration-700"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center pt-2">
            <span className="font-mono text-lg font-bold" style={{ color }}>
              {displayPct}%
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="ae-inset text-center">
            <div className="ae-label text-[10px]">Voltage</div>
            <div className="ae-value-sm">{battery.voltage.toFixed(1)}<span className="ae-unit">V</span></div>
          </div>
          <div className="ae-inset text-center">
            <div className="ae-label text-[10px]">Current</div>
            <div className="ae-value-sm">{battery.current.toFixed(1)}<span className="ae-unit">A</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

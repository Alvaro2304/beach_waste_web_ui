"use client";

import { useRos } from "@/contexts/RosContext";

function getBatteryColor(pct: number): string {
  if (pct > 0.5) return "#16A34A";
  if (pct > 0.2) return "#D97706";
  return "#DC2626";
}

export default function BatteryPanel() {
  const { battery } = useRos();
  const pct = battery.percentage;
  const color = getBatteryColor(pct);
  const displayPct = Math.round(pct * 100);

  return (
    <div className="retro-panel h-full flex flex-col">
      <div className="retro-panel-header">
        <span>🔋 Battery</span>
      </div>
      <div className="retro-panel-body flex flex-col items-center gap-4 flex-1">
        {/* Vintage battery illustration */}
        <div className="relative">
          <svg width="70" height="110" viewBox="0 0 70 110">
            {/* Battery cap */}
            <rect x="22" y="2" width="26" height="10" rx="1" fill="#111827" />
            {/* Battery body */}
            <rect
              x="8" y="12" width="54" height="90" rx="2"
              fill="#FFF8E7"
              stroke="#111827"
              strokeWidth="3"
            />
            {/* Battery fill */}
            <rect
              x="13"
              y={17 + 80 * (1 - pct)}
              width="44"
              height={80 * pct}
              rx="1"
              fill={color}
              className="transition-all duration-500"
            />
            {/* Segment lines */}
            {[0.25, 0.5, 0.75].map((seg) => (
              <line
                key={seg}
                x1="13"
                y1={17 + 80 * (1 - seg)}
                x2="57"
                y2={17 + 80 * (1 - seg)}
                stroke="#111827"
                strokeWidth="1"
                opacity="0.2"
              />
            ))}
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center pt-3">
            <span
              className="font-mono text-2xl font-bold"
              style={{ color: pct > 0.5 ? "#FFFFFF" : color }}
            >
              {displayPct}%
            </span>
          </div>
        </div>

        {/* Stats in vintage boxes */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="bg-cream border-2 border-text p-2 text-center shadow-retro-sm">
            <div className="retro-label-sm">Voltage</div>
            <div className="font-mono text-sm font-bold text-primary tabular-nums">
              {battery.voltage.toFixed(1)}V
            </div>
          </div>
          <div className="bg-cream border-2 border-text p-2 text-center shadow-retro-sm">
            <div className="retro-label-sm">Current</div>
            <div className="font-mono text-sm font-bold text-warning tabular-nums">
              {battery.current.toFixed(1)}A
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

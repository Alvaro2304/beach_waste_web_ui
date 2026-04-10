"use client";

import { useRos } from "@/contexts/RosContext";

function VintageThermometer({
  label,
  value,
  warningThreshold,
  dangerThreshold,
}: {
  label: string;
  value: number;
  warningThreshold: number;
  dangerThreshold: number;
}) {
  const color =
    value >= dangerThreshold
      ? "#DC2626"
      : value >= warningThreshold
      ? "#D97706"
      : "#3B82F6";

  const fillPct = Math.min(value / 80, 1);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="retro-label font-bold">{label}</span>

      {/* Classic thermometer SVG */}
      <div className="relative">
        <svg width="36" height="100" viewBox="0 0 36 100">
          {/* Tube */}
          <rect
            x="12" y="6" width="12" height="62" rx="6"
            fill="#FFF8E7" stroke="#111827" strokeWidth="2"
          />
          {/* Mercury fill */}
          <rect
            x="14"
            y={8 + 58 * (1 - fillPct)}
            width="8"
            height={58 * fillPct}
            rx="4"
            fill={color}
            className="transition-all duration-500"
          />
          {/* Bulb */}
          <circle
            cx="18" cy="82" r="12"
            fill={color} stroke="#111827" strokeWidth="2"
          />
          {/* Tick marks */}
          {[0, 20, 40, 60, 80].map((t) => (
            <g key={t}>
              <line
                x1="26" y1={8 + 58 * (1 - t / 80)}
                x2="32" y2={8 + 58 * (1 - t / 80)}
                stroke="#111827" strokeWidth="1.5"
              />
              <text
                x="33" y={12 + 58 * (1 - t / 80)}
                fontSize="6" fontFamily="JetBrains Mono"
                fill="#111827" opacity="0.5"
              >
                {t}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Value readout */}
      <div className="bg-cream border-2 border-text px-2 py-1 shadow-retro-sm text-center">
        <span className="font-mono text-lg font-bold tabular-nums" style={{ color }}>
          {value.toFixed(1)}
        </span>
        <span className="font-display text-xs text-text/50">°C</span>
      </div>
    </div>
  );
}

export default function TemperaturePanel() {
  const { temperature } = useRos();

  return (
    <div className="retro-panel h-full flex flex-col">
      <div className="retro-panel-header">
        <span>🌡️ Temperature</span>
      </div>
      <div className="retro-panel-body flex items-center justify-around gap-4 flex-1">
        <VintageThermometer
          label="Outside"
          value={temperature.outside}
          warningThreshold={35}
          dangerThreshold={40}
        />
        <VintageThermometer
          label="Internal"
          value={temperature.internal}
          warningThreshold={50}
          dangerThreshold={65}
        />
      </div>
    </div>
  );
}

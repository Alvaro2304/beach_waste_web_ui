"use client";

import { useRos } from "@/contexts/RosContext";

function TempReadout({
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
      ? "#B85C5C"
      : value >= warningThreshold
      ? "#B89B5E"
      : "#5C7A8A";

  const fillPct = Math.min(value / 80, 1);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="ae-label">{label}</span>

      {/* Minimal thermometer */}
      <div className="relative">
        <svg width="28" height="88" viewBox="0 0 28 88">
          {/* Tube */}
          <rect x="9" y="4" width="10" height="56" rx="5" fill="#F5F3EF" stroke="#D1CCC4" strokeWidth="1.5" />
          {/* Mercury */}
          <rect
            x="11"
            y={6 + 52 * (1 - fillPct)}
            width="6"
            height={52 * fillPct}
            rx="3"
            fill={color}
            opacity="0.7"
            className="transition-all duration-700"
          />
          {/* Bulb */}
          <circle cx="14" cy="74" r="10" fill={color} opacity="0.7" />
          <circle cx="14" cy="74" r="10" fill="none" stroke="#D1CCC4" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="ae-inset px-2 py-1 text-center">
        <span className="font-mono text-base font-semibold tabular-nums" style={{ color }}>
          {value.toFixed(1)}
        </span>
        <span className="ae-unit">°C</span>
      </div>
    </div>
  );
}

export default function TemperaturePanel() {
  const { temperature } = useRos();

  return (
    <div className="ae-panel h-full flex flex-col">
      <div className="ae-panel-header">
        <span className="ae-panel-header-title">Temperature</span>
      </div>
      <div className="ae-panel-body flex items-center justify-around gap-4 flex-1">
        <TempReadout
          label="Outside"
          value={temperature.outside}
          warningThreshold={35}
          dangerThreshold={40}
        />
        <TempReadout
          label="Internal"
          value={temperature.internal}
          warningThreshold={50}
          dangerThreshold={65}
        />
      </div>
    </div>
  );
}

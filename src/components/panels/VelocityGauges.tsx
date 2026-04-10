"use client";

import { useRos } from "@/contexts/RosContext";

function VintageGauge({
  label,
  value,
  max,
  unit,
  color,
  bgColor,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
  bgColor: string;
}) {
  const percentage = Math.min(Math.abs(value) / max, 1);
  const displayValue = value.toFixed(2);

  // Needle angle: -90deg (min) to +90deg (max)
  const needleAngle = -90 + percentage * 180;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="retro-label font-bold">{label}</span>

      {/* Vintage analog gauge */}
      <div className="relative w-[140px] h-[80px]">
        <svg viewBox="0 0 140 85" className="w-full h-full">
          {/* Gauge background */}
          <path
            d="M 10 75 A 60 60 0 0 1 130 75"
            fill={bgColor}
            stroke="#111827"
            strokeWidth="3"
          />

          {/* Colored zone segments */}
          <path
            d="M 10 75 A 60 60 0 0 1 40 22"
            fill="none"
            stroke="#16A34A"
            strokeWidth="6"
            strokeLinecap="butt"
            opacity="0.6"
          />
          <path
            d="M 40 22 A 60 60 0 0 1 100 22"
            fill="none"
            stroke="#D97706"
            strokeWidth="6"
            strokeLinecap="butt"
            opacity="0.6"
          />
          <path
            d="M 100 22 A 60 60 0 0 1 130 75"
            fill="none"
            stroke="#DC2626"
            strokeWidth="6"
            strokeLinecap="butt"
            opacity="0.6"
          />

          {/* Tick marks */}
          {Array.from({ length: 11 }, (_, i) => {
            const angle = Math.PI + (i / 10) * Math.PI;
            const x1 = 70 + Math.cos(angle) * 52;
            const y1 = 75 + Math.sin(angle) * 52;
            const x2 = 70 + Math.cos(angle) * 58;
            const y2 = 75 + Math.sin(angle) * 58;
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#111827"
                strokeWidth={i % 5 === 0 ? "2" : "1"}
              />
            );
          })}

          {/* Needle */}
          <g transform={`rotate(${needleAngle}, 70, 75)`}>
            <line
              x1="70" y1="75" x2="70" y2="22"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </g>

          {/* Center pin */}
          <circle cx="70" cy="75" r="6" fill="#111827" />
          <circle cx="70" cy="75" r="3" fill={color} />
        </svg>
      </div>

      {/* Digital readout */}
      <div className="bg-cream border-2 border-text px-3 py-1 shadow-retro-sm text-center">
        <span className="font-mono text-xl font-bold tabular-nums" style={{ color }}>
          {displayValue}
        </span>
        <span className="font-display text-xs text-text/50 ml-1">{unit}</span>
      </div>
    </div>
  );
}

export default function VelocityGauges() {
  const { odometry } = useRos();

  return (
    <div className="retro-panel h-full flex flex-col">
      <div className="retro-panel-header">
        <span>🏎️ Velocity</span>
      </div>
      <div className="retro-panel-body flex flex-col sm:flex-row items-center justify-around gap-4 flex-1">
        <VintageGauge
          label="Linear"
          value={odometry.linearVelocity.x}
          max={1.0}
          unit="m/s"
          color="#3B82F6"
          bgColor="#FFF8E7"
        />
        <VintageGauge
          label="Angular"
          value={odometry.angularVelocity.z}
          max={1.5}
          unit="rad/s"
          color="#D97706"
          bgColor="#FFF8E7"
        />
      </div>
    </div>
  );
}

"use client";

import { useRos } from "@/contexts/RosContext";

function MinimalGauge({
  label,
  value,
  max,
  unit,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
}) {
  const pct = Math.min(Math.abs(value) / max, 1);
  const needleAngle = -90 + pct * 180;

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="ae-label">{label}</span>

      {/* Minimal arc gauge */}
      <div className="relative w-[130px] h-[75px]">
        <svg viewBox="0 0 130 80" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10 70 A 55 55 0 0 1 120 70"
            fill="none"
            stroke="#E8E5E0"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d="M 10 70 A 55 55 0 0 1 120 70"
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${pct * 173} 173`}
            className="transition-all duration-500"
          />

          {/* Tick marks — just 0 and max */}
          {[0, 0.5, 1].map((t) => {
            const angle = Math.PI + t * Math.PI;
            const x1 = 65 + Math.cos(angle) * 48;
            const y1 = 70 + Math.sin(angle) * 48;
            const x2 = 65 + Math.cos(angle) * 53;
            const y2 = 70 + Math.sin(angle) * 53;
            return (
              <line
                key={t}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#D1CCC4"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Needle */}
          <g transform={`rotate(${needleAngle}, 65, 70)`}>
            <line
              x1="65" y1="70" x2="65" y2="24"
              stroke="#B85C5C"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </g>

          {/* Center pin */}
          <circle cx="65" cy="70" r="4" fill="#4A4A4A" />
          <circle cx="65" cy="70" r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Digital value */}
      <div className="ae-inset px-4 py-1 text-center">
        <span className="ae-value-sm">{value.toFixed(2)}</span>
        <span className="ae-unit">{unit}</span>
      </div>
    </div>
  );
}

export default function VelocityGauges() {
  const { odometry } = useRos();

  return (
    <div className="ae-panel h-full flex flex-col">
      <div className="ae-panel-header">
        <span className="ae-panel-header-title">Velocity</span>
      </div>
      <div className="ae-panel-body flex flex-col sm:flex-row items-center justify-around gap-5 flex-1">
        <MinimalGauge
          label="Linear"
          value={odometry.linearVelocity.x}
          max={1.0}
          unit="m/s"
        />
        <MinimalGauge
          label="Angular"
          value={odometry.angularVelocity.z}
          max={1.5}
          unit="rad/s"
        />
      </div>
    </div>
  );
}

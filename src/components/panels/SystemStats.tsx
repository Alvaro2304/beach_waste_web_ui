"use client";

import { useRos } from "@/contexts/RosContext";

function RetroBar({
  label,
  value,
  unit,
  warningThreshold,
  dangerThreshold,
}: {
  label: string;
  value: number;
  unit: string;
  warningThreshold: number;
  dangerThreshold: number;
}) {
  const color =
    value >= dangerThreshold
      ? "#DC2626"
      : value >= warningThreshold
      ? "#D97706"
      : "#3B82F6";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="font-display text-xs text-text/60">
          {label}
        </span>
        <span className="font-mono text-xs font-bold tabular-nums" style={{ color }}>
          {value.toFixed(0)}{unit}
        </span>
      </div>
      <div className="retro-gauge-track">
        <div
          className="retro-gauge-fill"
          style={{
            width: `${Math.min(value, 100)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

function DeviceCard({
  name,
  cpu,
  ram,
  temp,
  icon,
}: {
  name: string;
  cpu: number;
  ram: number;
  temp: number;
  icon: string;
}) {
  return (
    <div className="bg-cream border-2 border-text p-3 shadow-retro-sm">
      <div className="flex items-center gap-2 mb-2 pb-1 border-b-2 border-text/10">
        <span className="text-base">{icon}</span>
        <span className="font-display text-sm font-bold text-text">
          {name}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <RetroBar label="CPU" value={cpu} unit="%" warningThreshold={70} dangerThreshold={90} />
        <RetroBar label="RAM" value={ram} unit="%" warningThreshold={75} dangerThreshold={90} />
        <RetroBar label="Temp" value={temp} unit="°C" warningThreshold={60} dangerThreshold={75} />
      </div>
    </div>
  );
}

export default function SystemStats() {
  const { diagnostics } = useRos();

  return (
    <div className="retro-panel h-full flex flex-col">
      <div className="retro-panel-header">
        <span>🖥️ System Stats</span>
      </div>
      <div className="retro-panel-body flex flex-col gap-3 flex-1">
        <DeviceCard
          name="Raspberry Pi 4"
          icon="🍓"
          cpu={diagnostics.rpiCpu}
          ram={diagnostics.rpiRam}
          temp={diagnostics.rpiTemp}
        />
        <DeviceCard
          name="Jetson Nano"
          icon="🟢"
          cpu={diagnostics.jetsonCpu}
          ram={diagnostics.jetsonRam}
          temp={diagnostics.jetsonTemp}
        />
      </div>
    </div>
  );
}

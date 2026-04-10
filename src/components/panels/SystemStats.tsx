"use client";

import { useRos } from "@/contexts/RosContext";

function StatRow({
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
      ? "#B85C5C"
      : value >= warningThreshold
      ? "#B89B5E"
      : "#4A4A4A";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="font-body text-xs text-text-muted">{label}</span>
        <span className="font-mono text-xs font-medium tabular-nums" style={{ color }}>
          {value.toFixed(0)}{unit}
        </span>
      </div>
      <div className="ae-track">
        <div
          className="ae-track-fill"
          style={{
            width: `${Math.min(value, 100)}%`,
            backgroundColor: color,
            opacity: 0.6,
          }}
        />
      </div>
    </div>
  );
}

function DeviceBlock({
  name,
  cpu,
  ram,
  temp,
}: {
  name: string;
  cpu: number;
  ram: number;
  temp: number;
}) {
  return (
    <div className="ae-inset">
      <div className="font-body text-xs font-semibold text-text mb-2">{name}</div>
      <div className="flex flex-col gap-2">
        <StatRow label="CPU" value={cpu} unit="%" warningThreshold={70} dangerThreshold={90} />
        <StatRow label="RAM" value={ram} unit="%" warningThreshold={75} dangerThreshold={90} />
        <StatRow label="Temp" value={temp} unit="°C" warningThreshold={60} dangerThreshold={75} />
      </div>
    </div>
  );
}

export default function SystemStats() {
  const { diagnostics } = useRos();

  return (
    <div className="ae-panel h-full flex flex-col">
      <div className="ae-panel-header">
        <span className="ae-panel-header-title">System</span>
      </div>
      <div className="ae-panel-body flex flex-col gap-3 flex-1">
        <DeviceBlock
          name="Raspberry Pi 4"
          cpu={diagnostics.rpiCpu}
          ram={diagnostics.rpiRam}
          temp={diagnostics.rpiTemp}
        />
        <DeviceBlock
          name="Jetson Nano"
          cpu={diagnostics.jetsonCpu}
          ram={diagnostics.jetsonRam}
          temp={diagnostics.jetsonTemp}
        />
      </div>
    </div>
  );
}

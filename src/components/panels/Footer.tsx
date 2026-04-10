"use client";

import { useRos } from "@/contexts/RosContext";

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function Footer() {
  const { uptime, imuHz, gpsHz } = useRos();

  return (
    <footer className="retro-panel px-4 py-2 flex items-center justify-between gap-6 flex-wrap">
      {/* Uptime */}
      <div className="flex items-center gap-2">
        <span className="font-display text-sm text-text/60">⏱ Uptime</span>
        <span className="font-mono text-base font-bold text-text tabular-nums tracking-wider bg-cream border-2 border-text px-2 py-0.5 shadow-retro-sm">
          {formatUptime(uptime)}
        </span>
      </div>

      {/* Message rates */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="retro-dot retro-dot-ok" />
          <span className="font-display text-sm text-text/60">IMU</span>
          <span className="font-mono text-sm font-bold text-primary tabular-nums">
            {imuHz} Hz
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="retro-dot retro-dot-ok" />
          <span className="font-display text-sm text-text/60">GPS</span>
          <span className="font-mono text-sm font-bold text-success tabular-nums">
            {gpsHz} Hz
          </span>
        </div>
      </div>

      {/* Version */}
      <span className="font-display text-xs text-text/30">
        Beach Sentinel v0.1.0
      </span>
    </footer>
  );
}

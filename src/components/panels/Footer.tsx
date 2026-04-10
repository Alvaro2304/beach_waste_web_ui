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
    <footer className="ae-panel px-6 py-3 flex items-center justify-between gap-6 flex-wrap">
      {/* Uptime */}
      <div className="flex items-center gap-2">
        <span className="font-body text-xs text-text-muted">Uptime</span>
        <span className="ae-inset font-mono text-sm font-medium text-text tabular-nums px-3 py-0.5">
          {formatUptime(uptime)}
        </span>
      </div>

      {/* Message rates */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <div className="ae-dot ae-dot-ok" />
          <span className="font-body text-xs text-text-muted">IMU</span>
          <span className="font-mono text-xs font-medium text-text tabular-nums">
            {imuHz} Hz
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="ae-dot ae-dot-ok" />
          <span className="font-body text-xs text-text-muted">GPS</span>
          <span className="font-mono text-xs font-medium text-text tabular-nums">
            {gpsHz} Hz
          </span>
        </div>
      </div>

      {/* Version */}
      <span className="font-body text-[11px] text-text-muted">
        Beach Sentinel v0.1.0
      </span>
    </footer>
  );
}

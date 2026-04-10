"use client";

import { useRos } from "@/contexts/RosContext";

export default function CameraFeed() {
  const { connectionStatus, operationMode } = useRos();

  return (
    <div className="ae-panel h-full min-h-[280px] flex flex-col overflow-hidden">
      <div className="ae-panel-header">
        <span className="ae-panel-header-title">Camera Feed</span>
        <span className="ae-panel-header-sub">MJPEG — Front</span>
      </div>
      <div className="relative flex-1 bg-[#2D2D2D] flex items-center justify-center">
        {/* Placeholder */}
        <div className="flex flex-col items-center gap-4 text-white/25">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className="font-body text-sm tracking-wide">
            {connectionStatus === "connected"
              ? "Awaiting video signal"
              : "No signal"}
          </span>
        </div>

        {/* Mode badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`ae-badge backdrop-blur-sm ${
              operationMode === "auto"
                ? "bg-status-ok/20 text-white border border-white/10"
                : "bg-status-warn/20 text-white border border-white/10"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                operationMode === "auto" ? "bg-status-ok" : "bg-status-warn"
              }`}
            />
            {operationMode === "auto" ? "Auto" : "Manual"}
          </span>
        </div>

        {/* REC */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-status-err animate-pulse-soft" />
          <span className="font-mono text-[10px] text-status-err font-medium tracking-widest">
            REC
          </span>
        </div>
      </div>
    </div>
  );
}

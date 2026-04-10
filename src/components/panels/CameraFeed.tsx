"use client";

import { useRos } from "@/contexts/RosContext";

export default function CameraFeed() {
  const { connectionStatus, operationMode } = useRos();

  return (
    <div className="retro-panel h-full min-h-[280px] flex flex-col">
      <div className="retro-panel-header">
        <span>📹 Camera Feed</span>
        <span className="font-mono text-xs text-text/40">MJPEG — CAM_01</span>
      </div>
      <div className="relative flex-1 bg-text flex items-center justify-center overflow-hidden">
        {/* Mock camera placeholder */}
        <div className="flex flex-col items-center gap-4 text-surface/30">
          <svg
            className="w-20 h-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className="font-display text-lg tracking-wide">
            {connectionStatus === "connected"
              ? "Awaiting Video Signal..."
              : "No Signal"}
          </span>
          <span className="font-mono text-[11px] text-surface/15">
            web_video_server:8080
          </span>
        </div>

        {/* Mode overlay badge — top left */}
        <div className="absolute top-3 left-3">
          <span
            className={`retro-badge ${
              operationMode === "auto"
                ? "retro-badge-success"
                : "retro-badge-warning"
            }`}
          >
            {operationMode === "auto" ? "⚡ AUTO" : "🎮 MANUAL"}
          </span>
        </div>

        {/* REC indicator — top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-danger animate-blink border-2 border-surface/30" />
          <span className="font-mono text-xs text-danger font-bold tracking-wider">
            REC
          </span>
        </div>

        {/* Camera label — bottom left */}
        <div className="absolute bottom-3 left-3">
          <span className="font-mono text-[11px] text-surface/40">
            FRONT — 640×480
          </span>
        </div>
      </div>
    </div>
  );
}

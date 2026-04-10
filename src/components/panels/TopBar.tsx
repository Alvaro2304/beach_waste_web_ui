"use client";

import { useRos } from "@/contexts/RosContext";
import { useEffect, useState } from "react";

export default function TopBar() {
  const { connectionStatus, operationMode, setOperationMode } = useRos();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="retro-panel flex items-center justify-between px-4 py-3 gap-6 flex-wrap">
      {/* Logo / Name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 border-3 border-text bg-primary flex items-center justify-center shadow-retro-sm">
          <span className="text-2xl">🏖️</span>
        </div>
        <div>
          <h1 className="font-display text-2xl text-text leading-tight">
            Beach Sentinel
          </h1>
          <span className="font-display text-xs text-text/50 tracking-wider">
            Coastal Cleanup Unit — Mission Control
          </span>
        </div>
      </div>

      {/* Date / Time */}
      <div className="hidden sm:flex flex-col items-center bg-cream border-2 border-text px-4 py-1 shadow-retro-sm">
        <span className="font-mono text-xl font-bold text-text tabular-nums tracking-wider">
          {time}
        </span>
        <span className="font-display text-xs text-text/50">
          {date}
        </span>
      </div>

      {/* Connection Status */}
      <div className="flex items-center gap-2 bg-cream border-2 border-text px-3 py-1.5 shadow-retro-sm">
        <div
          className={`retro-dot ${
            connectionStatus === "connected" ? "retro-dot-ok" : "retro-dot-err"
          }`}
        />
        <span className="font-display text-sm font-bold">
          {connectionStatus === "connected" ? "Link OK" : "No Link"}
        </span>
      </div>

      {/* Mode Toggle */}
      <button
        onClick={() =>
          setOperationMode(operationMode === "auto" ? "manual" : "auto")
        }
        className={`retro-btn font-display text-base tracking-wide ${
          operationMode === "auto"
            ? "bg-success text-surface"
            : "bg-warning text-surface"
        }`}
      >
        ⚙ {operationMode === "auto" ? "AUTO" : "MANUAL"}
      </button>
    </header>
  );
}

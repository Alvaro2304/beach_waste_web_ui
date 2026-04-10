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
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="ae-panel flex items-center justify-between px-6 py-4 gap-6 flex-wrap">
      {/* Identity */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-widget bg-accent/8 flex items-center justify-center">
          <span className="font-display text-xl text-accent-warm">BS</span>
        </div>
        <div>
          <h1 className="font-display text-xl text-text leading-tight">
            Beach Sentinel
          </h1>
          <p className="font-body text-[11px] text-text-muted tracking-wider">
            Coastal Cleanup — Mission Control
          </p>
        </div>
      </div>

      {/* Clock */}
      <div className="hidden sm:flex flex-col items-center">
        <span className="font-mono text-lg font-semibold text-text tabular-nums">
          {time}
        </span>
        <span className="font-body text-[11px] text-text-muted">{date}</span>
      </div>

      {/* Connection */}
      <div className="flex items-center gap-2">
        <div
          className={`ae-dot ${
            connectionStatus === "connected" ? "ae-dot-ok" : "ae-dot-err"
          }`}
        />
        <span className="font-body text-sm text-text-secondary">
          {connectionStatus === "connected" ? "Connected" : "Offline"}
        </span>
      </div>

      {/* Mode toggle */}
      <button
        onClick={() =>
          setOperationMode(operationMode === "auto" ? "manual" : "auto")
        }
        className={`ae-badge cursor-pointer transition-colors ${
          operationMode === "auto" ? "ae-badge-ok" : "ae-badge-warn"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            operationMode === "auto" ? "bg-status-ok" : "bg-status-warn"
          }`}
        />
        {operationMode === "auto" ? "Autonomous" : "Manual"}
      </button>
    </header>
  );
}

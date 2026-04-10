"use client";

import { useRos } from "@/contexts/RosContext";
import { useEffect, useRef, useState } from "react";

export default function TeleopPad() {
  const { operationMode, sendCmdVel } = useRos();
  const padRef = useRef<HTMLDivElement>(null);
  const joystickRef = useRef<import("nipplejs").JoystickManager | null>(null);
  const [linearVel, setLinearVel] = useState(0);
  const [angularVel, setAngularVel] = useState(0);
  const disabled = operationMode === "auto";

  useEffect(() => {
    if (disabled || !padRef.current) return;

    import("nipplejs").then((nipplejs) => {
      if (!padRef.current) return;

      const manager = nipplejs.create({
        zone: padRef.current,
        mode: "static",
        position: { left: "50%", top: "50%" },
        color: "#9B9B9B",
        size: 110,
      });

      manager.on("move", (_, data) => {
        const maxLinear = 0.5;
        const maxAngular = 1.0;
        const distance = Math.min(data.distance / 55, 1);
        const angle = data.angle?.radian ?? 0;

        const lin = Math.cos(angle - Math.PI / 2) * distance * maxLinear * -1;
        const ang = Math.sin(angle - Math.PI / 2) * distance * maxAngular;

        setLinearVel(lin);
        setAngularVel(ang);
        sendCmdVel({
          linear: { x: lin, y: 0, z: 0 },
          angular: { x: 0, y: 0, z: ang },
        });
      });

      manager.on("end", () => {
        setLinearVel(0);
        setAngularVel(0);
        sendCmdVel({
          linear: { x: 0, y: 0, z: 0 },
          angular: { x: 0, y: 0, z: 0 },
        });
      });

      joystickRef.current = manager;
    });

    return () => {
      joystickRef.current?.destroy();
      joystickRef.current = null;
    };
  }, [disabled, sendCmdVel]);

  return (
    <div className="ae-panel h-full flex flex-col">
      <div className="ae-panel-header">
        <span className="ae-panel-header-title">Teleop</span>
        <span className={`ae-badge ${disabled ? "ae-badge-err" : "ae-badge-ok"}`}>
          {disabled ? "Locked" : "Active"}
        </span>
      </div>
      <div className="ae-panel-body flex flex-col items-center gap-4 flex-1">
        {/* Joystick zone */}
        <div
          ref={padRef}
          className={`relative w-[150px] h-[150px] rounded-full border transition-colors ${
            disabled
              ? "border-border bg-surface-alt opacity-40"
              : "border-border-strong bg-surface-alt"
          }`}
          style={{ touchAction: "none" }}
        >
          {disabled && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="font-body text-xs text-text-muted">Auto mode</span>
            </div>
          )}
          {/* Crosshair */}
          {!disabled && (
            <>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-3 bg-border-strong" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-px h-3 bg-border-strong" />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-px bg-border-strong" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-px bg-border-strong" />
            </>
          )}
        </div>

        {/* Velocity readouts */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className="ae-inset text-center">
            <div className="ae-label text-[10px]">Linear</div>
            <div className="font-mono text-lg font-semibold text-text tabular-nums">
              {linearVel.toFixed(2)}
            </div>
            <div className="ae-unit">m/s</div>
          </div>
          <div className="ae-inset text-center">
            <div className="ae-label text-[10px]">Angular</div>
            <div className="font-mono text-lg font-semibold text-text tabular-nums">
              {angularVel.toFixed(2)}
            </div>
            <div className="ae-unit">rad/s</div>
          </div>
        </div>
      </div>
    </div>
  );
}

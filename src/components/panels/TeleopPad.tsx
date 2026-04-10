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
        color: "#3B82F6",
        size: 120,
      });

      manager.on("move", (_, data) => {
        const maxLinear = 0.5;
        const maxAngular = 1.0;
        const distance = Math.min(data.distance / 60, 1);
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
    <div className="retro-panel h-full flex flex-col">
      <div className="retro-panel-header">
        <span>🕹️ Teleop Control</span>
        <span
          className={`retro-badge text-xs ${
            disabled ? "retro-badge-danger" : "retro-badge-success"
          }`}
        >
          {disabled ? "LOCKED" : "ACTIVE"}
        </span>
      </div>
      <div className="retro-panel-body flex flex-col items-center gap-4 flex-1">
        {/* Joystick area */}
        <div
          ref={padRef}
          className={`relative w-[160px] h-[160px] border-3 rounded-full ${
            disabled
              ? "border-text/20 bg-cream/50"
              : "border-text bg-cream"
          }`}
          style={{
            touchAction: "none",
            boxShadow: disabled ? "none" : "inset 2px 2px 0px rgba(0,0,0,0.08)",
          }}
        >
          {disabled && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="font-display text-sm text-danger/60 font-bold">
                Auto Mode
              </span>
            </div>
          )}
          {/* Crosshair marks */}
          {!disabled && (
            <>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-text/20" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-text/20" />
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-text/20" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-text/20" />
            </>
          )}
        </div>

        {/* Velocity readouts */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="text-center bg-cream border-2 border-text p-2 shadow-retro-sm">
            <div className="retro-label-sm">Linear</div>
            <div className="font-mono text-xl font-bold text-primary tabular-nums">
              {linearVel.toFixed(2)}
            </div>
            <div className="font-mono text-[10px] text-text/40">m/s</div>
          </div>
          <div className="text-center bg-cream border-2 border-text p-2 shadow-retro-sm">
            <div className="retro-label-sm">Angular</div>
            <div className="font-mono text-xl font-bold text-warning tabular-nums">
              {angularVel.toFixed(2)}
            </div>
            <div className="font-mono text-[10px] text-text/40">rad/s</div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import TopBar from "./panels/TopBar";
import CameraFeed from "./panels/CameraFeed";
import TeleopPad from "./panels/TeleopPad";
import VelocityGauges from "./panels/VelocityGauges";
import BatteryPanel from "./panels/BatteryPanel";
import TemperaturePanel from "./panels/TemperaturePanel";
import SystemStats from "./panels/SystemStats";
import Footer from "./panels/Footer";

const MapPanel = dynamic(() => import("./panels/MapPanel"), { ssr: false });

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 max-w-[1920px] mx-auto">
      {/* Top Bar */}
      <TopBar />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Row 1: Camera (8 cols) + Map (4 cols) */}
        <div className="lg:col-span-8">
          <CameraFeed />
        </div>
        <div className="lg:col-span-4">
          <MapPanel />
        </div>

        {/* Row 2: Teleop (3) + Velocity (3) + Battery (2) + Temp (2) + System (2) */}
        <div className="lg:col-span-3">
          <TeleopPad />
        </div>
        <div className="lg:col-span-3">
          <VelocityGauges />
        </div>
        <div className="lg:col-span-2">
          <BatteryPanel />
        </div>
        <div className="lg:col-span-2">
          <TemperaturePanel />
        </div>
        <div className="lg:col-span-2">
          <SystemStats />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import type {
  RosState,
  ConnectionStatus,
  OperationMode,
  OdometryData,
  GpsData,
  BatteryData,
  ImuData,
  DiagnosticData,
  TemperatureData,
  TwistCommand,
} from "@/types/ros";

// Beach near Cartagena, Colombia as default position
const DEFAULT_LAT = 10.3932;
const DEFAULT_LNG = -75.5144;

const defaultOdometry: OdometryData = {
  position: { x: 0, y: 0, z: 0 },
  orientation: { x: 0, y: 0, z: 0, w: 1 },
  linearVelocity: { x: 0, y: 0, z: 0 },
  angularVelocity: { x: 0, y: 0, z: 0 },
};

const defaultGps: GpsData = {
  latitude: DEFAULT_LAT,
  longitude: DEFAULT_LNG,
  altitude: 2.0,
  status: 2,
};

const defaultBattery: BatteryData = {
  voltage: 12.6,
  current: 2.1,
  percentage: 0.78,
  charging: false,
};

const defaultImu: ImuData = {
  orientation: { x: 0, y: 0, z: 0, w: 1 },
  angularVelocity: { x: 0, y: 0, z: 0 },
  linearAcceleration: { x: 0, y: 0, z: 9.81 },
};

const defaultDiagnostics: DiagnosticData = {
  rpiCpu: 45,
  rpiRam: 62,
  rpiTemp: 52,
  jetsonCpu: 38,
  jetsonRam: 55,
  jetsonTemp: 48,
};

const defaultTemperature: TemperatureData = {
  outside: 31,
  internal: 42,
};

const RosContext = createContext<RosState | null>(null);

export function useRos(): RosState {
  const ctx = useContext(RosContext);
  if (!ctx) throw new Error("useRos must be used within RosProvider");
  return ctx;
}

// Generate mock data that simulates a robot moving on a beach
function useMockData() {
  const [connectionStatus] = useState<ConnectionStatus>("connected");
  const [operationMode, setOperationMode] = useState<OperationMode>("auto");
  const [odometry, setOdometry] = useState<OdometryData>(defaultOdometry);
  const [gps, setGps] = useState<GpsData>(defaultGps);
  const [gpsHistory, setGpsHistory] = useState<{ lat: number; lng: number }[]>([]);
  const [battery, setBattery] = useState<BatteryData>(defaultBattery);
  const [imu, setImu] = useState<ImuData>(defaultImu);
  const [diagnostics, setDiagnostics] = useState<DiagnosticData>(defaultDiagnostics);
  const [temperature, setTemperature] = useState<TemperatureData>(defaultTemperature);
  const [imuHz, setImuHz] = useState(50);
  const [gpsHz, setGpsHz] = useState(5);
  const [uptime, setUptime] = useState(0);
  const angleRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((u) => u + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate robot moving in a pattern along the beach
  useEffect(() => {
    const interval = setInterval(() => {
      angleRef.current += 0.02;
      const a = angleRef.current;

      // Robot wanders in a figure-8 along the shore
      const latOffset = Math.sin(a) * 0.0003;
      const lngOffset = Math.sin(a * 2) * 0.0005;
      const newLat = DEFAULT_LAT + latOffset;
      const newLng = DEFAULT_LNG + lngOffset;

      const linVelX = 0.3 + Math.sin(a * 3) * 0.15;
      const angVelZ = Math.cos(a * 2) * 0.2;

      setOdometry({
        position: { x: Math.sin(a) * 10, y: Math.cos(a * 0.5) * 5, z: 0 },
        orientation: { x: 0, y: 0, z: Math.sin(a / 2), w: Math.cos(a / 2) },
        linearVelocity: { x: linVelX, y: 0, z: 0 },
        angularVelocity: { x: 0, y: 0, z: angVelZ },
      });

      setGps({ latitude: newLat, longitude: newLng, altitude: 2.0, status: 2 });
      setGpsHistory((prev) => {
        const next = [...prev, { lat: newLat, lng: newLng }];
        // Keep ~3 minutes of trail at 2Hz = ~360 points
        return next.length > 360 ? next.slice(-360) : next;
      });

      setImu({
        orientation: { x: 0, y: 0, z: Math.sin(a / 2), w: Math.cos(a / 2) },
        angularVelocity: { x: 0.01, y: 0.02, z: angVelZ },
        linearAcceleration: {
          x: Math.sin(a * 5) * 0.5,
          y: Math.cos(a * 5) * 0.3,
          z: 9.81 + Math.sin(a * 10) * 0.1,
        },
      });

      // Battery slowly drains
      setBattery((prev) => ({
        ...prev,
        percentage: Math.max(0.15, prev.percentage - 0.00005),
        voltage: 11.0 + prev.percentage * 2.0,
        current: 1.8 + Math.random() * 0.6,
      }));

      // System stats fluctuate
      setDiagnostics({
        rpiCpu: 40 + Math.random() * 20,
        rpiRam: 58 + Math.random() * 10,
        rpiTemp: 50 + Math.random() * 8,
        jetsonCpu: 35 + Math.random() * 25,
        jetsonRam: 50 + Math.random() * 15,
        jetsonTemp: 45 + Math.random() * 10,
      });

      setTemperature({
        outside: 30 + Math.sin(a * 0.1) * 2,
        internal: 40 + Math.random() * 5,
      });

      // Message rates with slight jitter
      setImuHz(48 + Math.floor(Math.random() * 5));
      setGpsHz(4 + Math.floor(Math.random() * 3));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sendCmdVel = useCallback((twist: TwistCommand) => {
    console.log("[MOCK] cmd_vel:", twist);
  }, []);

  return {
    connectionStatus,
    operationMode,
    odometry,
    gps,
    gpsHistory,
    battery,
    imu,
    diagnostics,
    temperature,
    imuHz,
    gpsHz,
    uptime,
    setOperationMode,
    sendCmdVel,
  };
}

export function RosProvider({ children }: { children: React.ReactNode }) {
  const state = useMockData();

  return <RosContext.Provider value={state}>{children}</RosContext.Provider>;
}

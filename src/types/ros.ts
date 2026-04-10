export interface OdometryData {
  position: { x: number; y: number; z: number };
  orientation: { x: number; y: number; z: number; w: number };
  linearVelocity: { x: number; y: number; z: number };
  angularVelocity: { x: number; y: number; z: number };
}

export interface GpsData {
  latitude: number;
  longitude: number;
  altitude: number;
  status: number;
}

export interface BatteryData {
  voltage: number;
  current: number;
  percentage: number;
  charging: boolean;
}

export interface ImuData {
  orientation: { x: number; y: number; z: number; w: number };
  angularVelocity: { x: number; y: number; z: number };
  linearAcceleration: { x: number; y: number; z: number };
}

export interface DiagnosticData {
  rpiCpu: number;
  rpiRam: number;
  rpiTemp: number;
  jetsonCpu: number;
  jetsonRam: number;
  jetsonTemp: number;
}

export interface TemperatureData {
  outside: number;
  internal: number;
}

export interface TwistCommand {
  linear: { x: number; y: number; z: number };
  angular: { x: number; y: number; z: number };
}

export type ConnectionStatus = "connected" | "disconnected" | "connecting";
export type OperationMode = "auto" | "manual";

export interface RosState {
  connectionStatus: ConnectionStatus;
  operationMode: OperationMode;
  odometry: OdometryData;
  gps: GpsData;
  gpsHistory: { lat: number; lng: number }[];
  battery: BatteryData;
  imu: ImuData;
  diagnostics: DiagnosticData;
  temperature: TemperatureData;
  imuHz: number;
  gpsHz: number;
  uptime: number;
  setOperationMode: (mode: OperationMode) => void;
  sendCmdVel: (twist: TwistCommand) => void;
}

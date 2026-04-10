# Beach Sentinel — Mission Control Dashboard

Web-based dashboard for remote monitoring and control of the Beach Sentinel
coastal cleanup robot. Connects to the robot's ROS 2 stack via rosbridge
WebSocket and renders real-time telemetry in the browser.

## Architecture

```
┌──────────────┐   WebSocket    ┌─────────────────────┐
│  Browser     │ ◄────────────► │  rosbridge_websocket │
│  (Next.js)   │   (roslibjs)   │  (Raspberry Pi 4)    │
└──────┬───────┘                └─────────────────────┘
       │
       │  HTTP / MJPEG
       ▼
┌──────────────────┐
│  web_video_server │
│  (Camera feed)    │
└──────────────────┘
```

- **Robot**: ROS 2 Humble on Raspberry Pi 4 + Jetson Nano
- **Backend**: `rosbridge_websocket` exposes ROS topics over WebSocket
- **Camera**: `web_video_server` streams MJPEG over HTTP (not via rosbridge)
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + roslibjs

## Dashboard panels

| Panel | Description | ROS Topic |
|-------|-------------|-----------|
| Camera Feed | Live MJPEG stream | `/camera/image/compressed` (via web_video_server) |
| GPS Map | Leaflet map with position + 3-min trail | `/gps/fix`, `/odometry/filtered` |
| Teleop Pad | Virtual joystick (nipplejs), manual mode only | Publishes to `/cmd_vel` |
| Velocity Gauges | Linear + angular velocity | `/odometry/filtered` |
| Battery | Level, voltage, current with color thresholds | `/battery_status` |
| Temperature | Outside + internal temp | Custom sensor topics |
| System Stats | RPi4 + Jetson: CPU, RAM, temp | `/diagnostics` |
| Footer | Uptime, IMU Hz, GPS Hz | Derived from message rates |

## Design branches

This repo has **three branches**, each with a different UI theme. They share
the same functional code (components, context, types) — only the styling
differs (Tailwind config, globals.css, component class names).

| Branch | Style | Description |
|--------|-------|-------------|
| `main` | Retro Fun | Bold colors, Macondo font, thick borders, hard drop shadows, vintage gauges |
| `retro-fun` | Retro Fun | Same as main (preserved copy) |
| `retro-aesthetic` | Retro Aesthetic | Muted neutrals, soft shadows, rounded panels, DM Sans + Macondo, elegant whitespace |

### Switching between designs

Since all branches use the same dependencies, switching is simple:

```bash
# Stop the dev server (Ctrl+C), then:
git checkout <branch-name>
npm run dev
```

For example:

```bash
# Switch to the muted elegant design
git checkout retro-aesthetic
npm run dev

# Switch back to the bold retro design
git checkout retro-fun
npm run dev
```

> **Note**: No need to run `npm install` when switching — all three branches
> use the same `package.json` and `node_modules`.

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
# Clone and enter the project
cd beach_waste_web_ui

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The dashboard runs with **mock data** by default — no robot connection
required. Mock data simulates a robot moving along a beach near Cartagena,
Colombia, with fluctuating battery, temperatures, and system stats.

### Connect to the real robot

To connect to a live ROS 2 robot, update the rosbridge URL in the ROS context
(`src/contexts/RosContext.tsx`) and switch from mock data to real subscriptions.
The robot must be running:

- `rosbridge_websocket` (default port 9090)
- `web_video_server` (default port 8080)

## Tech stack

- [Next.js 14](https://nextjs.org/) — App Router, React 18
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [roslibjs](https://github.com/RobotWebTools/roslibjs) — ROS WebSocket client
- [Leaflet.js](https://leafletjs.com/) — Interactive map
- [nipplejs](https://yoannmoi.net/nipplejs/) — Virtual joystick
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) + [Macondo](https://fonts.google.com/specimen/Macondo) — Typography

## Project structure

```
src/
├── app/
│   ├── globals.css         # Design tokens, component classes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Entry point (RosProvider + Dashboard)
├── components/
│   ├── Dashboard.tsx       # Main responsive 12-column grid
│   └── panels/
│       ├── TopBar.tsx      # Name, clock, connection, mode toggle
│       ├── CameraFeed.tsx  # MJPEG video placeholder
│       ├── MapPanel.tsx    # Leaflet GPS map with trail
│       ├── TeleopPad.tsx   # Joystick + velocity readout
│       ├── VelocityGauges.tsx  # Arc gauges with needles
│       ├── BatteryPanel.tsx    # SVG battery indicator
│       ├── TemperaturePanel.tsx # Thermometer displays
│       ├── SystemStats.tsx     # CPU/RAM/temp progress bars
│       └── Footer.tsx      # Uptime + message rate indicators
├── contexts/
│   └── RosContext.tsx      # ROS connection + mock data provider
└── types/
    ├── ros.ts              # TypeScript interfaces for ROS messages
    └── nipplejs.d.ts       # Type declarations for nipplejs
```

## License

Part of a thesis project (2026). All rights reserved.

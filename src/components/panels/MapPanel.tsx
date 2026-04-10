"use client";

import { useRos } from "@/contexts/RosContext";
import { useEffect, useRef, useState } from "react";

export default function MapPanel() {
  const { gps, gpsHistory } = useRos();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const trailRef = useRef<L.Polyline | null>(null);
  const initRef = useRef(false);
  const [mapReady, setMapReady] = useState(false);

  const gpsInitLat = useRef(gps.latitude);
  const gpsInitLng = useRef(gps.longitude);

  useEffect(() => {
    if (!mapContainerRef.current || initRef.current) return;
    initRef.current = true;

    import("leaflet").then((L) => {
      if (!mapContainerRef.current) return;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapContainerRef.current, {
        center: [gpsInitLat.current, gpsInitLng.current],
        zoom: 17,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      const robotIcon = L.divIcon({
        className: "robot-marker",
        html: `<div style="
          width: 18px; height: 18px;
          background: #3B82F6;
          border: 3px solid #111827;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(59,130,246,0.4);
        "></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      markerRef.current = L.marker([gpsInitLat.current, gpsInitLng.current], {
        icon: robotIcon,
      }).addTo(map);

      trailRef.current = L.polyline([], {
        color: "#DC2626",
        weight: 3,
        opacity: 0.8,
        dashArray: "8, 6",
      }).addTo(map);

      leafletMap.current = map;
      setMapReady(true);
    });

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
        initRef.current = false;
        setMapReady(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapReady) return;
    markerRef.current?.setLatLng([gps.latitude, gps.longitude]);
    trailRef.current?.setLatLngs(
      gpsHistory.map((p) => [p.lat, p.lng] as [number, number])
    );
    leafletMap.current?.panTo([gps.latitude, gps.longitude], { animate: true });
  }, [gps, gpsHistory, mapReady]);

  return (
    <div className="retro-panel h-full min-h-[250px] flex flex-col">
      <div className="retro-panel-header">
        <span>Map — GPS Track</span>
        <span className="font-mono text-xs text-text/50">
          {gps.latitude.toFixed(5)}, {gps.longitude.toFixed(5)}
        </span>
      </div>
      <div className="relative flex-1">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <div ref={mapContainerRef} className="w-full h-full" />
        <div className="absolute bottom-2 right-2 z-[1000] bg-surface border-2 border-text/20 px-2 py-1">
          <span className="font-display text-xs text-warning font-bold">
            ALT {gps.altitude.toFixed(1)}m
          </span>
        </div>
      </div>
    </div>
  );
}

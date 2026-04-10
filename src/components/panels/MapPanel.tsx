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
          width: 14px; height: 14px;
          background: #4A4A4A;
          border: 3px solid #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      markerRef.current = L.marker([gpsInitLat.current, gpsInitLng.current], {
        icon: robotIcon,
      }).addTo(map);

      trailRef.current = L.polyline([], {
        color: "#8B7355",
        weight: 2,
        opacity: 0.5,
        dashArray: "6, 4",
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
    <div className="ae-panel h-full min-h-[250px] flex flex-col overflow-hidden">
      <div className="ae-panel-header">
        <span className="ae-panel-header-title">GPS Track</span>
        <span className="ae-panel-header-sub">
          {gps.latitude.toFixed(5)}, {gps.longitude.toFixed(5)}
        </span>
      </div>
      <div className="relative flex-1">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <div ref={mapContainerRef} className="w-full h-full" />
        <div className="absolute bottom-3 right-3 z-[1000] ae-badge ae-badge-neutral backdrop-blur-sm">
          Alt {gps.altitude.toFixed(1)}m
        </div>
      </div>
    </div>
  );
}

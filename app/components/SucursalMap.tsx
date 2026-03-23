"use client";

import { useEffect, useRef, useState } from "react";
import { useJsApiLoader, GoogleMap, OverlayView } from "@react-google-maps/api";
import Image from "next/image";

interface SucursalMapProps {
  address: string;
}

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#02012B" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#02012B" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8892b0" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#0a0950" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#1a1870" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#010118" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#1a1960" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d1d5db" }] },
];

const LIBRARIES: ("geocoding")[] = [];

export default function SucursalMap({ address }: SucursalMapProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_KEY!,
    libraries: LIBRARIES,
  });

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const geocoded = useRef(false);

  useEffect(() => {
    if (!isLoaded || geocoded.current) return;
    geocoded.current = true;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const loc = results[0].geometry.location;
        setCoords({ lat: loc.lat(), lng: loc.lng() });
      }
    });
  }, [isLoaded, address]);

  if (!isLoaded || !coords) {
    return (
      <div
        className="w-full h-48 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <span className="text-zinc-500 text-sm font-mono animate-pulse-slow">
          {!isLoaded ? "Cargando mapa…" : "Geolocalizando…"}
        </span>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "192px", borderRadius: "12px 12px 0 0" }}
      center={coords}
      zoom={16}
      options={{
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: false,
        clickableIcons: false,
        gestureHandling: "none",
      }}
    >
      <OverlayView
        position={coords}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={(w, h) => ({ x: -w / 2, y: -h - 6 })}
      >
        <div className="flex flex-col items-center" style={{ filter: "drop-shadow(0 4px 12px rgba(233,78,27,0.5))" }}>
          <div
            className="rounded-lg px-2 py-1.5"
            style={{ background: "#02012B", border: "2px solid #E94E1B" }}
          >
            <Image src="/logo.svg" alt="Logincor" width={88} height={20} />
          </div>
          <div style={{ width: 2, height: 10, background: "#E94E1B" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E94E1B" }} />
        </div>
      </OverlayView>
    </GoogleMap>
  );
}

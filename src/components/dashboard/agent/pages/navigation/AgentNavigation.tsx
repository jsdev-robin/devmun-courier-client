'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

interface RouteEvent {
  route: {
    duration: number;
    distance: number;
  }[];
}

interface DirectionsWithEvents extends MapboxDirections {
  on: (event: 'route', callback: (e: RouteEvent) => void) => void;
}

const AgentNavigation = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const directions = useRef<DirectionsWithEvents | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.4125, 23.8103],
      zoom: 12,
    });

    map.current.on('load', () => {
      map.current?.addControl(new mapboxgl.NavigationControl(), 'top-right');

      directions.current = new MapboxDirections({
        accessToken: mapboxgl.accessToken!,
        unit: 'imperial',
        profile: 'mapbox/driving',
        controls: { inputs: true, instructions: true },
      }) as DirectionsWithEvents;

      map.current?.addControl(
        directions.current as unknown as mapboxgl.IControl,
        'top-left',
      );

      const dummyDestination: [number, number] = [90.407, 23.815];

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const userLocation: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          directions.current?.setOrigin(userLocation);
          directions.current?.setDestination(dummyDestination);
          map.current?.flyTo({ center: userLocation, zoom: 14 });
        },
        (err) => console.log(err),
        { enableHighAccuracy: true },
      );

      directions.current.on('route', (e) => {
        if (e.route && e.route.length > 0) {
          setDuration(e.route[0].duration);
          setDistance(e.route[0].distance);
        }
      });

      return () => navigator.geolocation.clearWatch(watchId);
    });
  }, []);

  return (
    <div className="-my-6 h-[calc(100vh-64px)]">
      <div ref={mapContainer} className="w-full h-screen" />
      {duration !== null && distance !== null && (
        <div className="bg-red-300 top-20 left-4 p-2  rounded shadow">
          Duration: {(duration / 60).toFixed(2)} minutes <br />
          Distance: {(distance / 1000).toFixed(2)} km
        </div>
      )}
    </div>
  );
};

export default AgentNavigation;

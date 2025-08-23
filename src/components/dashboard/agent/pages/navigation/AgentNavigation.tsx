'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import NavigationInformation from './particles/NavigationInformation';
import NavigationSheet from './particles/NavigationSheet';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

interface RouteEvent {
  route: {
    duration: number;
    distance: number;
    legs: {
      steps: {
        maneuver: { instruction: string; location: [number, number] };
        distance: number;
        duration: number;
      }[];
    }[];
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
  const [steps, setSteps] = useState<
    {
      maneuver: { instruction: string; location: [number, number] };
      distance: number;
      duration: number;
    }[]
  >([]);

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
        unit: 'metric',
        profile: 'mapbox/driving',
        controls: { inputs: true, instructions: true },
      }) as DirectionsWithEvents;

      map.current?.addControl(
        directions.current as unknown as mapboxgl.IControl,
        'top-left',
      );

      const destination: [number, number] = [90.407, 23.815];

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const userLocation: [number, number] = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          directions.current?.setOrigin(userLocation);
          directions.current?.setDestination(destination);
          map.current?.flyTo({ center: userLocation, zoom: 14 });
        },
        (err) => console.log(err),
        { enableHighAccuracy: true },
      );

      directions.current.on('route', (e) => {
        if (e.route && e.route.length > 0) {
          setDistance(e.route[0].distance);
          setDuration(e.route[0].duration);
          setSteps(e.route[0].legs[0].steps);
        }
      });

      return () => navigator.geolocation.clearWatch(watchId);
    });
  }, []);

  return (
    <div className="-my-6">
      <div className="grid lg:grid-cols-4">
        <div className="lg:col-span-3 relative">
          <div ref={mapContainer} className="w-full h-[calc(100vh-64px)]" />
          <NavigationSheet
            duration={duration}
            distance={distance}
            steps={steps}
          />
        </div>
        <div className="lg:col-span-1 overflow-y-auto h-[calc(100vh-64px)] relative hidden lg:block">
          <NavigationInformation
            duration={duration}
            distance={distance}
            steps={steps}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentNavigation;

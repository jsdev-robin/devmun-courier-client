'use client';

import React, { memo, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { cn } from '../../lib/utils';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

interface GetLocationProps {
  className?: string;
  setPickupLocation?: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >;
}

const GetLocation: React.FC<GetLocationProps> = ({
  className,
  setPickupLocation,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [90.4125, 23.8103],
      zoom: 12,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken!,
      placeholder: 'Search for address',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mapboxgl: mapboxgl as any,
    });

    mapRef.current.addControl(geocoder);

    geocoder.on('result', (e) => {
      const [lng, lat] = e.result.geometry.coordinates;
      setPickupLocation?.({ lng, lat });
      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapRef.current!);
      } else {
        markerRef.current.setLngLat([lng, lat]);
      }

      mapRef.current!.flyTo({ center: [lng, lat], zoom: 15 });
    });

    mapRef.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      setPickupLocation?.({ lng, lat });

      if (!markerRef.current) {
        markerRef.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(mapRef.current!);
      } else {
        markerRef.current.setLngLat([lng, lat]);
      }
    });

    return () => mapRef.current?.remove();
  }, [setPickupLocation]);

  return (
    <div>
      <div
        ref={mapContainer}
        className={cn('max-w-full h-109', className)}
        style={{
          width: '100%',
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default memo(GetLocation);

'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { socket } from '../../../lib/socket';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { createPulsingDot } from '../../../utils/pulsingDot';

const CustomerAgentTrackingMap = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const dummyCustomerId = 'CUSTOMER001';

  useEffect(() => {
    socket.emit('joinCustomerRoom', dummyCustomerId);

    socket.on('locationUpdate', (loc: { lat: number; lng: number }) => {
      setLocation(loc);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken =
      'pk.eyJ1Ijoicm9iaW5taW5kIiwiYSI6ImNtOGozb2xrcDBmaXgycXNlanl6NTI1bzEifQ.q7zst4iSdDY5rtAI_Sw_KQ';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 20],
      zoom: 1.5,
      projection: 'mercator',
    });

    const pulsingDot = createPulsingDot(mapRef.current);

    mapRef.current.on('load', () => {
      mapRef.current?.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      mapRef.current?.addSource('agent-location', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      mapRef.current?.addLayer({
        id: 'agent-point',
        type: 'symbol',
        source: 'agent-location',
        layout: { 'icon-image': 'pulsing-dot' },
      });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!location || !mapRef.current) return;

    const source = mapRef.current.getSource(
      'agent-location',
    ) as mapboxgl.GeoJSONSource;
    source.setData({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [location.lng, location.lat],
          },
          properties: {},
        },
      ],
    });

    if (mapRef.current.getZoom() < 5) {
      mapRef.current.jumpTo({ center: [location.lng, location.lat], zoom: 14 });
    } else {
      mapRef.current.setCenter([location.lng, location.lat]);
    }
  }, [location]);

  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Agent Tracking</CardTitle>
            <CardDescription>
              View live agent locations worldwide with interactive pulsing
              markers. Monitor delivery activity across different regions in
              real time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={mapContainerRef}
              className="w-full h-120 rounded-xl overflow-hidden border border-border"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CustomerAgentTrackingMap;

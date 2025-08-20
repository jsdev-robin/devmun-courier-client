'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { io, Socket } from 'socket.io-client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';

interface PulsingDot {
  width: number;
  height: number;
  data: Uint8ClampedArray;
  context: CanvasRenderingContext2D | null;
  onAdd(): void;
  render(): boolean;
}

const CustomerAgentTrackingMap = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const dummyCustomerId = 'CUSTOMER001';

  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoicm9iaW5taW5kIiwiYSI6ImNtOGozb2xrcDBmaXgycXNlanl6NTI1bzEifQ.q7zst4iSdDY5rtAI_Sw_KQ';

    const pulsingDot: PulsingDot = {
      width: 100,
      height: 100,
      data: new Uint8ClampedArray(100 * 100 * 4),
      context: null,
      onAdd() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },
      render() {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;
        const radius = (this.width / 2) * 0.3;
        const outerRadius = (this.width / 2) * 0.7 * t + radius;
        const context = this.context;
        if (!context) return false;

        context.clearRect(0, 0, this.width, this.height);

        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2,
        );
        context.fillStyle = `rgba(255, 100, 100, ${1 - t})`;
        context.fill();

        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 0, 0, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 2 * (1 - t);
        context.fill();
        context.stroke();

        this.data = context.getImageData(0, 0, this.width, this.height).data;
        mapRef.current?.triggerRepaint();
        return true;
      },
    };

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1.5,
      projection: 'equirectangular',
    });

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

    const socket: Socket = io('https://courier-api.devmun.xyz', {
      withCredentials: true,
    });

    socket.emit('joinCustomerRoom', dummyCustomerId);

    socket.on('locationUpdate', (loc: { lat: number; lng: number }) => {
      if (!mapRef.current) return;

      const source = mapRef.current.getSource(
        'agent-location',
      ) as mapboxgl.GeoJSONSource;
      source.setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [loc.lng, loc.lat] },
            properties: {},
          },
        ],
      });

      mapRef.current.flyTo({ center: [loc.lng, loc.lat], zoom: 10 });
    });

    return () => {
      socket.disconnect();
      mapRef.current?.remove();
    };
  }, []);

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

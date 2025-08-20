'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { socket } from '../../../lib/socket';
import { PulsingDot } from '../../../utils/pulsingDot';

const CustomerAgentTracking = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
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
    console.log('Updated location:', location);
  }, [location]);

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
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
      container: mapContainerRef.current as HTMLElement,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1.5,
      projection: 'mercator',
    });

    // new mapboxgl.Marker()
    //   .setLngLat([23.8435892, 90.0116677])
    //   .addTo(mapRef.current);

    // new mapboxgl.Marker({ color: 'black', rotation: 45 })
    //   .setLngLat([12.65147, 55.608166])
    //   .addTo(mapRef.current);

    if (location) {
      mapRef.current.on('load', () => {
        mapRef.current?.addImage('pulsing-dot', pulsingDot, {
          pixelRatio: 2,
        });

        mapRef.current?.addSource('dot-point', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: location
              ? [
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [location.lng, location.lat],
                    },
                    properties: {},
                  },
                ]
              : [],
          },
        });

        mapRef.current?.addLayer({
          id: 'points',
          type: 'symbol',
          source: 'dot-point',
          layout: {
            'icon-image': 'pulsing-dot',
          },
        });
      });
    }

    return () => {
      mapRef.current?.remove();
    };
  }, [location]);

  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Agent Tracking (Console Only)</CardTitle>
            <CardDescription>
              Open your browser console to see live agent location updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={mapContainerRef}
              className="w-full h-120 rounded-xl overflow-hidden border border-border"
              id="map"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CustomerAgentTracking;

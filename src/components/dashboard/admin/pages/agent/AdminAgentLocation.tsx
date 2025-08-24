'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { createSocket } from '../../../../../lib/socket';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../ui/card';
import { createPulsingDot } from '../../../../../utils/pulsingDot';
import useUser from '../../../../../guard/useUser';

const customerSocket = createSocket('customer');

interface PointGeometry {
  type: 'Point';
  coordinates: [number, number];
}

const AdminAgentLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [agentInfo, setAgentInfo] = useState({
    name: 'John Doe',
    status: 'In Transit',
    eta: '25 minutes',
    vehicle: 'Motorcycle',
    speed: '0 km/h',
  });
  const [isBroadcasting, setIsBroadcasting] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const user = useUser();

  // Initialize map only once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 20],
      zoom: 1.5,
      projection: 'mercator',
    });

    const map = mapRef.current;

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 25,
    });
    popupRef.current = popup;

    const pulsingDot = createPulsingDot(map, isBroadcasting);
    map.on('load', () => {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      map.addSource('dot-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'dot-point',
        layout: {
          'icon-image': 'pulsing-dot',
          'icon-size': 1,
        },
      });

      map.on('mouseenter', 'points', (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const geometry = feature.geometry as PointGeometry;
          const coordinates = geometry.coordinates.slice() as [number, number];
          const properties = feature.properties || {};

          popup
            .setLngLat(coordinates)
            .setHTML(
              `<div class="p-2">
                <h3 class="font-bold text-sm">${properties.name}</h3>
                <p class="text-xs"><strong>Status:</strong> ${properties.status}</p>
                <p class="text-xs"><strong>ETA:</strong> ${properties.eta}</p>
                <p class="text-xs"><strong>Vehicle:</strong> ${properties.vehicle}</p>
                <p class="text-xs"><strong>Speed:</strong> ${properties.speed}</p>
              </div>`,
            )
            .addTo(map);

          map.getCanvas().style.cursor = 'pointer';
        }
      });

      map.on('mouseleave', 'points', () => {
        popup.remove();
        map.getCanvas().style.cursor = '';
      });
    });

    return () => {
      map.remove();
    };
  }, [isBroadcasting]);

  // Socket listener
  useEffect(() => {
    customerSocket.emit('joinCustomerRoom', user?._id ?? '');

    customerSocket.on(
      'locationUpdate',
      (data: { lat: number; lng: number; speed: number }) => {
        setLocation({ lat: data.lat, lng: data.lng });
        setAgentInfo((prev) => ({
          ...prev,
          speed: `${data.speed} km/h`,
        }));
      },
    );

    customerSocket.on('broadcastingStatus', (status: boolean) => {
      setIsBroadcasting(status);
    });

    return () => {
      customerSocket.disconnect();
    };
  }, [user?._id]);

  // Update map source data when location changes
  useEffect(() => {
    if (!mapRef.current || !location) return;

    const map = mapRef.current;
    const source = map.getSource('dot-point') as mapboxgl.GeoJSONSource;
    if (!source) return;

    source.setData({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [location.lng, location.lat],
          },
          properties: agentInfo,
        },
      ],
    });

    // smoothly move camera
    map.flyTo({
      center: [location.lng, location.lat],
      zoom: 12,
      speed: 1.2,
    });
  }, [location, agentInfo]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time Agent Tracking</CardTitle>
        <CardDescription>
          View live agent locations worldwide with interactive pulsing markers.
          Hover over markers to see agent info.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={mapContainerRef}
          className="w-full h-120 rounded-xl overflow-hidden border border-border"
        />
      </CardContent>
    </Card>
  );
};

export default AdminAgentLocation;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { createSocket } from '../../lib/socket';
import { createPulsingDot } from '../../utils/pulsingDot';

const customerSocket = createSocket('customer');

interface PointGeometry {
  type: 'Point';
  coordinates: [number, number];
}

const GetLiveTrackingMap = ({
  id,
  name,
  status,
}: {
  id: string;
  status?: string;
  name?: string;
}) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [agentInfo, setAgentInfo] = useState({
    name: name,
    status: status,
    eta: '25 minutes',
    vehicle: 'Motorcycle',
    speed: '0 km/h',
  });
  const [isBroadcasting, setIsBroadcasting] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  // Dummy parcel location
  const [parcelLocation] = useState({
    lat: 23.8103, // Example: Dhaka, Bangladesh
    lng: 90.4125,
    info: {
      name: 'Parcel Destination',
      status: 'Waiting for delivery',
      eta: '25 minutes',
      vehicle: 'N/A',
      speed: 'N/A',
    },
  });

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
      // Add pulsing dot for agent
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      // Add package icon for parcel
      map.loadImage(
        'https://cdn-icons-png.flaticon.com/512/3502/3502689.png',
        (error, image) => {
          if (error) throw error;
          if (image) {
            map.addImage('parcel-icon', image, { pixelRatio: 2 });
          }
        },
      );

      // Source for agent location
      map.addSource('agent-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      // Source for parcel location
      map.addSource('parcel-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [parcelLocation.lng, parcelLocation.lat],
              },
              properties: parcelLocation.info,
            },
          ],
        },
      });

      // Layer for agent
      map.addLayer({
        id: 'agent-points',
        type: 'symbol',
        source: 'agent-point',
        layout: {
          'icon-image': 'pulsing-dot',
          'icon-size': 1,
        },
      });

      // Layer for parcel
      map.addLayer({
        id: 'parcel-points',
        type: 'symbol',
        source: 'parcel-point',
        layout: {
          'icon-image': 'parcel-icon',
          'icon-size': 0.08,
        },
      });

      // Add event handlers for both layers
      const addPopupHandlers = (layerId: string) => {
        map.on('mouseenter', layerId, (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const geometry = feature.geometry as PointGeometry;
            const coordinates = geometry.coordinates.slice() as [
              number,
              number,
            ];
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

        map.on('mouseleave', layerId, () => {
          popup.remove();
          map.getCanvas().style.cursor = '';
        });
      };

      addPopupHandlers('agent-points');
      addPopupHandlers('parcel-points');
    });

    return () => {
      map.remove();
    };
  }, [isBroadcasting, parcelLocation]);

  // Socket listener
  useEffect(() => {
    if (!id) return;

    if (!customerSocket.connected) {
      customerSocket.connect();
    }

    customerSocket.emit('joinCustomerRoom', id);

    const locationUpdateHandler = (data: {
      lat: number;
      lng: number;
      speed: number;
    }) => {
      setLocation({ lat: data.lat, lng: data.lng });
      setAgentInfo((prev) => ({
        ...prev,
        speed: `${data.speed} km/h`,
      }));
    };

    const broadcastingHandler = (status: boolean) => {
      setIsBroadcasting(status);
    };

    customerSocket.on('locationUpdate', locationUpdateHandler);
    customerSocket.on('broadcastingStatus', broadcastingHandler);

    return () => {
      customerSocket.off('locationUpdate', locationUpdateHandler);
      customerSocket.off('broadcastingStatus', broadcastingHandler);
    };
  }, [id]);

  // Update map source data when location changes
  useEffect(() => {
    if (!mapRef.current || !location) return;

    const map = mapRef.current;
    const source = map.getSource('agent-point') as mapboxgl.GeoJSONSource;
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

export default GetLiveTrackingMap;

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

interface PointGeometry {
  type: 'Point';
  coordinates: [number, number];
}

const CustomerAgentTrackingMap = () => {
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
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const dummyCustomerId = 'CUSTOMER001';

  useEffect(() => {
    socket.emit('joinCustomerRoom', dummyCustomerId);

    socket.on(
      'locationUpdate',
      (data: { lat: number; lng: number; speed: number }) => {
        setLocation({ lat: data.lat, lng: data.lng });

        setAgentInfo((prev) => ({
          ...prev,
          speed: `${data.speed} km/h`,
        }));
      },
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 20],
        zoom: 1.5,
        projection: 'mercator',
      });
    }

    const map = mapRef.current;

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 25,
    });

    popupRef.current = popup;

    if (location) {
      map.on('load', () => {
        const pulsingDot = createPulsingDot(map);

        if (map.getSource('dot-point')) {
          map.removeLayer('points');
          map.removeSource('dot-point');
        }

        map.addImage('pulsing-dot', pulsingDot, {
          pixelRatio: 2,
        });

        map.addSource('dot-point', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [location.lng, location.lat],
                },
                properties: {
                  name: agentInfo.name,
                  status: agentInfo.status,
                  eta: agentInfo.eta,
                  vehicle: agentInfo.vehicle,
                  speed: agentInfo.speed,
                },
              },
            ],
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
            const coordinates = geometry.coordinates.slice() as [
              number,
              number,
            ];
            const properties = feature.properties || {};

            popup
              .setLngLat(coordinates)
              .setHTML(
                `
                <div class="p-2">
                  <h3 class="font-bold text-sm">${properties.name}</h3>
                  <p class="text-xs"><strong>Status:</strong> ${properties.status}</p>
                  <p class="text-xs"><strong>ETA:</strong> ${properties.eta}</p>
                  <p class="text-xs"><strong>Vehicle:</strong> ${properties.vehicle}</p>
                  <p class="text-xs"><strong>Speed:</strong> ${properties.speed}</p>
                </div>
              `,
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

      // map.flyTo({
      //   center: [location.lng, location.lat],
      //   zoom: 12,
      //   speed: 1.2,
      // });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [location, agentInfo]);

  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader>
            <CardTitle>Real-Time Agent Tracking</CardTitle>
            <CardDescription>
              View live agent locations worldwide with interactive pulsing
              markers. Monitor delivery activity across different regions in
              real time. Hover over markers to see agent information.
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

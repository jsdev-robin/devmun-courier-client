'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetParcelByAgentQuery } from '../../../../../lib/features/services/agentControl/agentControllApi';
import { createPulsingDot } from '../../../../../utils/pulsingDot';
import { useRealTimeLocation } from '../../../../../hooks/useRealtimeLocation';

const AgentDeliveryRoute = () => {
  const { data } = useGetParcelByAgentQuery({
    queryParams: 'status[ne]=delivered',
  });
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { location: userLocation } = useRealTimeLocation();
  const mapInitializedRef = useRef(false);
  const userLocationAddedRef = useRef(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapInitializedRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.3563, 23.685],
      zoom: 7,
      projection: 'equirectangular',
    });

    mapRef.current.on('load', () => {
      const bounds = new mapboxgl.LngLatBounds();

      if (data?.data.data && data.data.data.length > 0) {
        const parcels =
          data.data.data.filter((parcel) => parcel.pickupLocation) || [];

        parcels.forEach((parcel) => {
          const el = document.createElement('div');
          el.className = 'w-4 h-4 bg-blue-600 rounded-full cursor-pointer';

          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            closeOnClick: false,
          }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-sm text-black">${
                parcel.trackingId || 'Parcel'
              }</h3>
              <p class="text-xs text-black"><strong>Receiver:</strong> ${
                parcel.receiverName || 'N/A'
              }</p>
              <p class="text-xs text-black"><strong>Address:</strong> ${
                parcel.deliveryAddress || 'N/A'
              }</p>
              <p class="text-xs text-black"><strong>Status:</strong> ${
                parcel.status || 'Pending'
              }</p>
            </div>
          `);

          const lngLat: [number, number] = [
            parcel.pickupLocation.lng,
            parcel.pickupLocation.lat,
          ];
          const marker = new mapboxgl.Marker(el)
            .setLngLat(lngLat)
            .setPopup(popup);

          if (mapRef.current) {
            marker.addTo(mapRef.current);
          }

          bounds.extend(lngLat);

          el.addEventListener('mouseenter', () => {
            if (mapRef.current) {
              popup.addTo(mapRef.current);
            }
          });
          el.addEventListener('mouseleave', () => popup.remove());
        });
      }

      if (data?.data.data && data.data.data.length > 0 && mapRef.current) {
        mapRef.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15,
          duration: 1000,
        });
      }

      mapInitializedRef.current = true;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapInitializedRef.current = false;
        userLocationAddedRef.current = false;
      }
    };
  }, [data]);

  useEffect(() => {
    if (!mapRef.current || !userLocation || !mapInitializedRef.current) return;

    const addUserLocation = () => {
      const pulsingDot = createPulsingDot(mapRef.current!, true);

      mapRef.current!.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      mapRef.current!.addSource('user-location', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: userLocation,
              },
              properties: {},
            },
          ],
        },
      });

      mapRef.current!.addLayer({
        id: 'user-location-layer',
        type: 'symbol',
        source: 'user-location',
        layout: {
          'icon-image': 'pulsing-dot',
          'icon-allow-overlap': true,
        },
      });

      userLocationAddedRef.current = true;
    };

    const updateUserLocation = () => {
      if (mapRef.current!.getSource('user-location')) {
        (
          mapRef.current!.getSource('user-location') as mapboxgl.GeoJSONSource
        ).setData({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: userLocation,
              },
              properties: {},
            },
          ],
        });
      }
    };

    if (!userLocationAddedRef.current) {
      addUserLocation();
    } else {
      updateUserLocation();
    }
  }, [userLocation]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Route</CardTitle>
        <CardDescription>
          Monitor all active parcel pickups and deliveries in real-time across
          Bangladesh. Hover over pins to view parcel details.
          {userLocation && (
            <span className="block mt-2 text-green-600">
              Your real-time location is being tracked.
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={mapContainerRef}
          className="w-full h-109 rounded-xl overflow-hidden border border-border"
        />
      </CardContent>
    </Card>
  );
};

export default AgentDeliveryRoute;

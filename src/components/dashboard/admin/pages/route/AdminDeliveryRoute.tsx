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
import { useGetParcelByAdminQuery } from '../../../../../lib/features/services/adminControl/adminControllApi';

const AdminDeliveryRoute = () => {
  const { data } = useGetParcelByAdminQuery({});
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!data?.data.data || data.data.data.length === 0) return;

    const parcels =
      data.data.data.filter((parcel) => parcel.pickupLocation) || [];

    if (parcels.length === 0) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [90.3563, 23.685],
      zoom: 7,
      projection: 'equirectangular',
    });

    mapRef.current.on('load', () => {
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

        new mapboxgl.Marker(el)
          .setLngLat([parcel.pickupLocation.lng, parcel.pickupLocation.lat])
          .setPopup(popup)
          .addTo(mapRef.current!);

        el.addEventListener('mouseenter', () => popup.addTo(mapRef.current!));
        el.addEventListener('mouseleave', () => popup.remove());
      });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Parcel Tracking</CardTitle>
        <CardDescription>
          Monitor all active parcel pickups and deliveries in real-time across
          Bangladesh. Hover over pins to view parcel details.
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

export default AdminDeliveryRoute;

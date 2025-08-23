import axios from 'axios';
import { useEffect, useState } from 'react';

interface UseDistanceResult {
  distance: number | null;
  duration: number | null;
  error: string | null;
  loading: boolean;
}

export const useMapboxDistance = (
  destination: [number, number],
): UseDistanceResult => {
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDistanceDuration = async (
      origin: [number, number],
      destination: [number, number],
    ) => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.join(
            ',',
          )};${destination.join(',')}`,
          {
            params: {
              access_token: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
              geometries: 'geojson',
              overview: 'simplified',
            },
          },
        );

        const route = response.data.routes[0];
        setDistance(route.distance);
        setDuration(route.duration);
      } catch {
        setError('Failed to fetch route');
      } finally {
        setLoading(false);
      }
    };

    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin: [number, number] = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        fetchDistanceDuration(origin, destination);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
  }, [destination]);

  return { distance, duration, error, loading };
};

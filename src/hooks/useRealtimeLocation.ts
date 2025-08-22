import { useEffect, useState } from 'react';

interface UseRealtimeLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const useRealtimeLocation = (
  options: UseRealtimeLocationOptions = {},
) => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const userLocation: [number, number] = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        setLocation(userLocation);
      },
      (err) => setError(err.message),
      {
        enableHighAccuracy: options.enableHighAccuracy ?? true,
        timeout: options.timeout ?? Infinity,
        maximumAge: options.maximumAge ?? 0,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  return { location, error };
};

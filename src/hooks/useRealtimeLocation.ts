'use client';

import { useEffect, useRef, useState } from 'react';

interface UseRealTimeLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface UseRealTimeLocationReturn {
  location: [number, number] | null;
  error: string | null;
  isLoading: boolean;
}

export const useRealTimeLocation = (
  options: UseRealTimeLocationOptions = {},
): UseRealTimeLocationReturn => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const watchId = useRef<number | null>(null);

  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 30000,
  } = options;

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const onSuccess = (position: GeolocationPosition) => {
      const { longitude, latitude } = position.coords;
      setLocation([longitude, latitude]);
      setError(null);
      setIsLoading(false);
    };

    const onError = (error: GeolocationPositionError) => {
      let errorMessage = 'Unable to retrieve your location';

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access denied by user';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information unavailable';
          break;
        case error.TIMEOUT:
          errorMessage = 'Location request timed out';
          break;
        default:
          errorMessage = `Unknown error: ${error.message}`;
      }

      setError(errorMessage);
      setIsLoading(false);
    };

    watchId.current = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    });

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [enableHighAccuracy, timeout, maximumAge]);

  return { location, error, isLoading };
};

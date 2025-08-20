'use client';

import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('My location:', latitude, longitude);

          // 👉 এখান থেকে Backend এ পাঠান (Socket.IO বা API দিয়ে)
        },
        (error) => console.error('Error getting location:', error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 },
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert('Geolocation not supported in this browser');
    }
  }, []);

  return <div>Home</div>;
};

export default Home;

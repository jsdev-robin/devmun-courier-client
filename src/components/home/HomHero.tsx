'use client';

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 23.8103,
  lng: 90.4125,
};

// import { io, Socket } from 'socket.io-client';

const HomHero = () => {
  // const [agentLocation, setAgentLocation] = useState({ lat: 0, lng: 0 });
  // const dummyCustomerId = 'CUSTOMER001';

  // console.log(agentLocation);

  // useEffect(() => {
  //   const socket: Socket = io('http://localhost:8080', {
  //     withCredentials: true,
  //   });

  //   socket.emit('joinCustomerRoom', dummyCustomerId);

  //   const handleLocationUpdate = (loc: { lat: number; lng: number }) => {
  //     setAgentLocation(loc);
  //     console.log('Location received:', loc);
  //   };

  //   socket.on('locationUpdate', handleLocationUpdate);

  //   return () => {
  //     socket.off('locationUpdate', handleLocationUpdate);
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB5I6_g8e41dCAQlC7gODcnOpsJJ9vx0zw">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default HomHero;

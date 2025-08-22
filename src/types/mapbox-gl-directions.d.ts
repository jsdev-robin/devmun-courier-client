declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
  interface DirectionsOptions {
    accessToken: string;
    unit?: 'metric' | 'imperial';
    profile?: 'mapbox/driving' | 'mapbox/walking' | 'mapbox/cycling';
    controls?: {
      inputs?: boolean;
      instructions?: boolean;
    };
  }

  class MapboxDirections {
    constructor(options: DirectionsOptions);
    setOrigin(origin: [number, number] | string): void;
    setDestination(destination: [number, number] | string): void;
  }

  export default MapboxDirections;
}

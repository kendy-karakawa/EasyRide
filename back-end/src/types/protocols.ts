export type ApplicationError = {
    error_code: string;
    error_description?: string;
};

export type ConfirmRideParams = { 
    customer_id: string, 
    origin: string, 
    destination: string, 
    distance: number, 
    duration: number, 
    driver: 
        { 
            id: number, 
            name: string 
        }, 
    value: number 
};

export type TransformedRouteResponse = {
    origin: {
      latitude: number;
      longitude: number;
    };
    destination: {
      latitude: number;
      longitude: number;
    };
    distance: number; 
    duration: number; 
    routeResponse: string; 
  };

export type RouteResponse = {
    routes: Array<{
      legs: Array<{
        distanceMeters: number;
        duration: string;
        polyline: {
          encodedPolyline: string;
        };
        startLocation: {
          latLng: {
            latitude: number;
            longitude: number;
          };
        };
        endLocation: {
          latLng: {
            latitude: number;
            longitude: number;
          };
        };
      }>;
    }>;
  };
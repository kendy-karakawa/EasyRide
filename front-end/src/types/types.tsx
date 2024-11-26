export type AlertType = 'info' | 'warning' | 'success';

export type AlertStyle = {
  bgColor: string;
  textColor: string;
};

export type AlertObj = {
    type: AlertType;
    message: string;
};

export type Driver = {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number;
        comment: string;
    };
    value: number;
    minKm: number
};

export type Coordinates = {
    latitude: number;
    longitude: number;
};

export type GetRrideEstimateRequest = {
    customer_id: number;
    origin: string;
    destination: string;
};

export type GetRrideEstimateResponse = {
    origin: Coordinates;
    destination: Coordinates;
    distance: number;
    duration: number;
    routeResponse: string;
    options: Driver[];
};

export type RoutesInfo = {
    origin: Coordinates;
    destination: Coordinates;
    routeResponse: string;
};

export type ConfirmRideRequest = {
    customer_id: number;
    origin: string;
    destination: string;
    distance: number;
    duration: number;
    driver: {
      id: number;
      name: string;
    },
    value: number;
};

export type ConfirmRideResponse = {
    success: boolean;
};

export type RideHistory = {
    id: number;
    date: string;
    origin: string;
    destination: string;
    distance: number;
    duration: number;
    value: number;
    driver: {
        id: number;
        name: string;
    }
};

export type RideHistoryResponse = {
    customer_id: number;
    rides: RideHistory[];
};

export type SelectDrive = {
    driver: {
        id: number;
        name: string;
    };
    distance: number;
    duration: number;
    value: number;
}



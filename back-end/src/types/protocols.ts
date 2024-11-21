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

  
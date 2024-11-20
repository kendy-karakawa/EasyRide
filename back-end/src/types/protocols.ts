export type ApplicationError = {
    error_code: string;
    error_description?: string;
};

export type ConfirmRideParams = { 
    customer_id: string, 
    origin: string, 
    destination: string, 
    distance: number, 
    duration: string, 
    driver: 
        { 
            id: number, 
            name: string 
        }, 
    value: number 
};

  
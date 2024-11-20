import { prisma } from "../configs/database";
import { ConfirmRideParams } from "../types/protocols";

async function createRide(data: ConfirmRideParams) {
    return await prisma.ride.create({
        data: {
            origin: data.origin,
            destination: data.destination,
            distance: data.distance,
            duration: data.duration,
            customerId: parseInt(data.customer_id), 
            driverId: data.driver.id, 
            value: data.value,
            timeStamp: new Date() 
        }
    });
};


const rideRepository = {
    createRide
};

export default rideRepository;
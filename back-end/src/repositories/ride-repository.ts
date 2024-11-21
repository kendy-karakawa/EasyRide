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
            timestamp: new Date() 
        }
    });
};

async function getRidesByCustomerId(customerId: number) {
    return await prisma.ride.findMany({
        where: {
            customerId
        }, 
        include: {
            driver: true
        }
    });
};

async function getRidesByCustomerIdAndDriverId(customerId: number, driverId: number) {
    return await prisma.ride.findMany({
        where: {
            customerId,
            driverId
        },
        include: {
            driver: true
        }
    });
}


const rideRepository = {
    createRide,
    getRidesByCustomerId,
    getRidesByCustomerIdAndDriverId
};

export default rideRepository;
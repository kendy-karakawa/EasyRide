
import { invalidDriverError } from "../errors/invalid-driver-error";
import { notFoundError } from "../errors/not-found-error";
import customerRepository from "../repositories/customer-repository";
import driverRepository from "../repositories/driver-repository";
import rideRepository from "../repositories/ride-repository";
import { ConfirmRideParams } from "../types/protocols";
import driverService from "./driver-service";


async function confirmRide( data: ConfirmRideParams) {
    await driverService.checkDriver(data.driver.id, data.distance);
    await rideRepository.createRide(data);
};

async function getRideHistory(customerId: number, driverId: number | undefined ) {
    const customer = await customerRepository.getCustomerById(customerId);
    if (!customer) throw notFoundError("NO_RIDES_FOUND", "Nenhum registro encontrado.");
    const rideHistory = driverId ? await getRidesForCustomerWithDriver(customerId, driverId) : await getRidesForCustomer(customerId);

    const response = {
        customer_id: customerId,
        rides: rideHistory.map(item => {
            return {
                id: item.id,
                date: item.timestamp,
                origin: item.origin,
                destination: item.destination,
                distance: item.distance,
                duration: item.duration,
                value: item.value,
                driver: {
                    id: item.driver.id,
                    name: item.driver.name
                }
            }
        })
    }
    return response;
}

async function getRidesForCustomer(customerId: number) {
    const rides = await rideRepository.getRidesByCustomerId(customerId);
    if (!rides.length) throw notFoundError("NO_RIDES_FOUND", "Nenhum registro encontrado.");
    return rides;
}

async function getRidesForCustomerWithDriver(customerId: number, driverId: number) {
    const driver = await driverRepository.getDriverById(driverId);
    if (!driver) throw invalidDriverError();
    const rides = await rideRepository.getRidesByCustomerIdAndDriverId(customerId, driverId);
    if (!rides.length) throw notFoundError("NO_RIDES_FOUND", "Nenhum registro encontrado.");
    return rides;
}

const rideService = {
    confirmRide,
    getRideHistory
};


export default rideService;
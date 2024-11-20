import { invalidDistanceError } from "../errors/invalid-distance-error";
import { notFoundError } from "../errors/not-found-error";
import driverRepository from "../repositories/driver-repository";
import rideRepository from "../repositories/ride-repository";
import { ConfirmRideParams } from "../types/protocols";


async function confirmRide( data: ConfirmRideParams) {
    await checkDriver(data.driver.id, data.distance);
    await rideRepository.createRide(data);
};

async function checkDriver (driverId:number, distance: number) {
    let selectedDriver = await driverRepository.getDriverById(driverId);
    if (!selectedDriver) throw notFoundError("DRIVER_NOT_FOUND", "Motorista não encontrado.");
    if (selectedDriver.minKm > distance) throw invalidDistanceError();
};

const rideService = {
    confirmRide
};


export default rideService;
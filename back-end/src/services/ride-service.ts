
import rideRepository from "../repositories/ride-repository";
import { ConfirmRideParams } from "../types/protocols";
import driverService from "./driver-service";


async function confirmRide( data: ConfirmRideParams) {
    await driverService.checkDriver(data.driver.id, data.distance);
    await rideRepository.createRide(data);
};


const rideService = {
    confirmRide
};


export default rideService;
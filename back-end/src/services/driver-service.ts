import { invalidDistanceError } from "../errors/invalid-distance-error";
import { notFoundError } from "../errors/not-found-error";
import driverRepository from "../repositories/driver-repository";

async function checkDriver (driverId:number, distance: number) {
    let selectedDriver = await driverRepository.getDriverById(driverId);
    if (!selectedDriver) throw notFoundError("DRIVER_NOT_FOUND", "Motorista não encontrado.");
    if (selectedDriver.minKm > distance) throw invalidDistanceError();
};

async function getAllDrivers() {
    const drivers = await driverRepository.findAll();
    const formattedDrivers = drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.car, 
      review: {
        rating: driver.review.rating,
        comment: driver.review.comment
      },
      value: driver.rate,
      minKm: driver.minKm
    }));

    return formattedDrivers;
}

const driverService = {
    checkDriver,
    getAllDrivers
};

export default driverService;
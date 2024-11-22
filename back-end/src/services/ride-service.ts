
import { invalidDriverError } from "../errors/invalid-driver-error";
import { notFoundError } from "../errors/not-found-error";
import googleMapsApi from "../integration/google-maps-api";
import driverRepository from "../repositories/driver-repository";
import rideRepository from "../repositories/ride-repository";
import { ConfirmRideParams, Ride, RideHistory, RouteResponse, TransformedRouteResponse } from "../types/protocols";
import customerService from "./customer-service";
import driverService from "./driver-service";

async function getEstimate(customerId: number, origin: string, destination: string) {
    await customerService.checkCustomer(customerId);
    const drivers = await driverService.getAllDrivers();
    const route = await getRoutes(origin, destination);
    return {...route, options: drivers};
}

async function confirmRide( data: ConfirmRideParams) {
    await driverService.checkDriver(data.driver.id, data.distance);
    await rideRepository.createRide(data);
};

async function getRideHistory(customerId: number, driverId: number | undefined ): Promise<RideHistory> {
    await customerService.checkCustomer(customerId);
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
    response.rides.sort((a: any, b: any) => b.date - a.date);
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

async function getRoutes(origin: string, destination: string): Promise<TransformedRouteResponse> {
    const routes: RouteResponse = await googleMapsApi.getRoutes(origin, destination);
    return transformRouteResponse(routes);
}

function transformRouteResponse(response: RouteResponse): TransformedRouteResponse {
    const leg = response.routes[0]?.legs[0]; 

    return {
        origin: {
            latitude: leg.startLocation.latLng.latitude,
            longitude: leg.startLocation.latLng.longitude,
        },
        destination: {
            latitude: leg.endLocation.latLng.latitude,
            longitude: leg.endLocation.latLng.longitude,
        },
        distance: (leg.distanceMeters/1000),
        duration: parseInt(leg.duration.replace("s", ""), 10),
        routeResponse: leg.polyline.encodedPolyline,
    };
}

const rideService = {
    getEstimate,
    confirmRide,
    getRideHistory
};


export default rideService;
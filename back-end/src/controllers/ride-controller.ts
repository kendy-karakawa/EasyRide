import { NextFunction, Request, Response } from "express"
import { invalidDataError } from "../errors/invalid-data-error";
import rideService from "../services/ride-service";
import { ConfirmRideParams } from "../types/protocols";


async function getEstimate(req: Request, res: Response, next: NextFunction) {
    const {customer_id, origin, destination} = req.body;
    try {
        if (origin === destination) throw invalidDataError(['Endereço de origem não pode ser igual ao endereço de destino.']);
        const response = await rideService.getEstimate(customer_id, origin, destination);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

async function confirmRide(req: Request, res: Response, next: NextFunction) {
    const data: ConfirmRideParams = req.body;
    try {
        if (data.origin === data.destination) throw invalidDataError(['Endereço de origem não pode ser igual ao endereço de destino.']);
        await rideService.confirmRide(data);
        res.status(200).send({ 
            "success": true 
           });
    } catch (error) {
        next(error);
    }
}

async function getRideHistory(req: Request, res: Response, next: NextFunction) {
    const customerId: string = req.params.customer_id;
    const driverId: string = req.query.driver_id as string;

    try {
        const rides = await rideService.getRideHistory(parseInt(customerId), parseInt(driverId));
        res.status(200).send(rides)
    } catch (error) {
        next(error);
    }
}

async function invalideRoute(req: Request, res: Response) {
    res.status(400).json(
        {
            error_code: "INVALID_DATA",
            error_description: "O parâmetro 'customer_id' é obrigatório e não pode estar vazio."
        });
}


const rideController = {
    getEstimate,
    confirmRide,
    getRideHistory,
    invalideRoute,
};

export default rideController;


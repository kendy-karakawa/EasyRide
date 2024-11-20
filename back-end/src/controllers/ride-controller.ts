import { NextFunction, Request, Response } from "express"
import { invalidDataError } from "../errors/invalid-data-error";
import rideService from "../services/ride-service";
import { ConfirmRideParams } from "../types/protocols";


async function getEstimate(req: Request, res: Response) {
    
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



const rideController = {
    getEstimate,
    confirmRide
};

export default rideController;


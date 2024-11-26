import { NextFunction, Request, Response } from "express"
import driverService from "../services/driver-service";


async function getAllDrivers(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await driverService.getAllDrivers();
        res.send(response);
    } catch (error) {
        next(error);
    }
};

const driverController = {
    getAllDrivers
};

export default driverController;

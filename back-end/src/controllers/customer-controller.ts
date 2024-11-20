import { NextFunction, Request, Response } from "express"
import customerService from "../services/customer-service";


async function createCustomer(req: Request, res: Response, next: NextFunction) {
    const {name} = req.body;

    try {
        const user = await customerService.createCustomer(name);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};


const customerController = {
    createCustomer
};

export default customerController;

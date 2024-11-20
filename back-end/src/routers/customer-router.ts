import { Router } from "express";
import customerController from "../controllers/customer-controller";


const customerRouter = Router();

customerRouter
    .post("/", customerController.createCustomer);

export default customerRouter;
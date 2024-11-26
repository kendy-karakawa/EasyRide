import { Router } from "express";
import driverController from "../controllers/driver-controller";

const driverRouter = Router();

driverRouter
    .get("/", driverController.getAllDrivers);

export default driverRouter;
import { Router } from "express";
import rideController from "../controllers/ride-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { getRideEstimateSchema } from "../schemas/ride-schemas";


const rideRouter = Router()

rideRouter
    .post("/estimate", validateBody(getRideEstimateSchema), rideController.getEstimate);



export default rideRouter;
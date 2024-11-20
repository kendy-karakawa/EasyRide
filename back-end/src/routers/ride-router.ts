import { Router } from "express";
import rideController from "../controllers/ride-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { getRideEstimateSchema, rideConfirmSchema } from "../schemas/ride-schemas";


const rideRouter = Router()

rideRouter
    .post("/estimate", validateBody(getRideEstimateSchema), rideController.getEstimate)
    .patch("/confirm", validateBody(rideConfirmSchema), rideController.confirmRide)



export default rideRouter;
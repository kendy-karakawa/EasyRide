import { Router } from "express";
import rideController from "../controllers/ride-controller";
import { validateBody, validateParams } from "../middlewares/validation-middleware";
import { getRideEstimateSchema, getRideHistorySchemas, rideConfirmSchema } from "../schemas/ride-schemas";


const rideRouter = Router()

rideRouter
    .post("/estimate", validateBody(getRideEstimateSchema), rideController.getEstimate)
    .patch("/confirm", validateBody(rideConfirmSchema), rideController.confirmRide)
    .get("/:customer_id", validateParams(getRideHistorySchemas), rideController.getRideHistory)
    .get('/', rideController.invalideRoute)
    
export default rideRouter;
import { Router } from "express";
import mapsController from "../controllers/maps-controller";

const mapsRouter = Router();

mapsRouter
    .post("/", mapsController.getStaticMapImageUrl);

export default mapsRouter;
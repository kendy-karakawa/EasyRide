import { NextFunction, Request, Response } from "express"
import { RoutesInfo } from "../types/protocols";
import googleMapsApi from "../integration/google-maps-api";


async function getStaticMapImageUrl(req: Request, res: Response, next: NextFunction) {
    const request: RoutesInfo = req.body;
    try {
        const response = await googleMapsApi.getStaticMapImageUrl(request);
        res.set("Content-Type", "image/png");
        res.send(response);
    } catch (error) {
        next(error);
    }
};

const mapsController = {
    getStaticMapImageUrl
};

export default mapsController;

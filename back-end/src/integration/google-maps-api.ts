import axios from "axios";
import { notFoundError } from "../errors/not-found-error";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
    throw notFoundError("GOOGLE_API_KEY_NOT_FOUND", "A chave da API do Google não foi configurada. Verifique suas variáveis de ambiente.");
}

async function getRoutes(origin: string, destination: string) {
    
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes?key=${GOOGLE_API_KEY}`;

    const body = {
        origin:{
            address: origin
        },
        destination:{
            address: destination
        },
        travelMode: "DRIVE",
        languageCode: "pt-BR",
        units: "METRIC"
    };

    const response = await axios.post(url, body, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-FieldMask': 'routes.legs.distanceMeters,routes.legs.duration,routes.legs.startLocation,routes.legs.endLocation,routes.legs.polyline',
        },
    });

    return response.data;
}

const googleMapsApi = {
    getRoutes
};

export default googleMapsApi;


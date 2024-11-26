import axios from "axios";
import { notFoundError } from "../errors/not-found-error";
import { RoutesInfo } from "../types/protocols";
import { invalidDataError } from "../errors/invalid-data-error";

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

    if (Object.keys(response.data).length === 0) throw invalidDataError("Endereço de origem e/ou de destino invalido.")
    return response.data;
}

async function getStaticMapImageUrl(body: RoutesInfo) {
    const {routeResponse, origin, destination} = body;

    const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?format=png&size=800x800&scale=2` +
        `&path=color:0x0000ff|weight:5|enc:${routeResponse}` +
        `&markers=color:green|label:A|${origin.latitude},${origin.longitude}` +
        `&markers=color:red|label:B|${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}`;

    const result = await axios.get(googleMapsUrl, {responseType: 'arraybuffer'});
    return result.data;
}

const googleMapsApi = {
    getRoutes,
    getStaticMapImageUrl
};

export default googleMapsApi;


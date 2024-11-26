"use client";

import ApiMaps from "@/services/apiMaps";
import { RoutesInfo } from "@/types/types";
import { useEffect, useState } from "react";

export default function Map({routesInfo}: {routesInfo: RoutesInfo}) {
    const [googleMapsUrl, setGoogleMapsUrl] = useState<string | null>(null);

    useEffect(()=> {
        async function getStaticMapImageUrl() {
            const response = await ApiMaps.getStaticMapImageUrl(routesInfo)
            const obj = URL.createObjectURL(response);
            setGoogleMapsUrl(obj)
        }
        getStaticMapImageUrl()
    }, [routesInfo]);

    if (!googleMapsUrl) return <div>Carregando mapa...</div>;

    return (
        <div >
            <img src={googleMapsUrl} alt="Static Google Map" className="rounded-lg shadow-lg border border-gray-500"/>
        </div>        
    )
}
"use client";

import ApiMaps from "@/services/apiMaps";
import { RoutesInfo } from "@/types/types";
import { useEffect, useState } from "react";

export default function Map({routesInfo}: {routesInfo: RoutesInfo}) {
    const [googleMapsUrl, setGoogleMapsUrl] = useState<string | null>(null);

    useEffect(()=> {
        const getStaticMapImageUrl = async() => {
            const response = await ApiMaps.getStaticMapImageUrl(routesInfo)
            const obj = URL.createObjectURL(response);
            setGoogleMapsUrl(obj)
        }
        getStaticMapImageUrl()
    }, [routesInfo]);

    if (!googleMapsUrl) return <div>Carregando mapa...</div>;

    return (
        <div className="h-full w-full bg-red-200 rounded-lg shadow-lg p-6border border-gray-200 p-1ok">
            <img src={googleMapsUrl} alt="Static Google Map"/>
        </div>        
    )
}
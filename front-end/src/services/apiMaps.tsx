import axios from "axios";
import { RoutesInfo } from "@/types/types";

async function getStaticMapImageUrl(params:RoutesInfo) {
    const {data: res} = await axios.post('http://localhost:8080/maps', params, {responseType: 'blob'})
    return res;
};

const ApiMaps = {
    getStaticMapImageUrl
};

export default ApiMaps;
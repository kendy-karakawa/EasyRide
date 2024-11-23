import { ConfirmRideRequest, ConfirmRideResponse, GetRrideEstimateRequest, GetRrideEstimateResponse, RideHistoryResponse } from "@/types/types";
import axios from "axios";

const baseUrl:string = 'http://localhost:8080/ride'

async function GetRrideEstimate(request: GetRrideEstimateRequest): Promise<GetRrideEstimateResponse> {
    const {data: res} = await axios.post(`${baseUrl}/estimate`, request);
    return res;
};

async function ConfirmRide (request: ConfirmRideRequest): Promise<ConfirmRideResponse> {
    const {data: res} = await axios.patch(`${baseUrl}/confirm`, request);
    return res;
};

async function GetRideHistory(customer_id:number): Promise<RideHistoryResponse> {
    const {data: res} = await axios.get(`${baseUrl}/${customer_id}`);
    return res;
}

async function GetRideHistoryPerDriver(customer_id:number, driver_id: number): Promise<RideHistoryResponse> {
    const {data: res} = await axios.get(`${baseUrl}/${customer_id}?driver_id=${driver_id}`);
    return res;
}

const ApiRide = {
    GetRrideEstimate,
    ConfirmRide,
    GetRideHistory,
    GetRideHistoryPerDriver
};

export default ApiRide;
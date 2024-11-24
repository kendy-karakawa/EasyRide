"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";

import Alert from "@/components/alert/alert";
import DriverCard from "@/components/cards/driverCard";
import EstimateForm from "@/components/forms/estimateForm";
import Header from "@/components/header/header";
import Map from "@/components/map/map";
import { AlertObj, ConfirmRideRequest, GetRrideEstimateRequest, GetRrideEstimateResponse, SelectDrive } from '@/types/types';
import ApiRide from '@/services/apiRide';

export default function Home() {
  const router = useRouter();
  const [alertList, setAlertList] = useState<AlertObj[]>([]);
  const [loading, setLoading] = useState(false);
  const [estimateResponse, setEstimateResponse] = useState<GetRrideEstimateResponse | null>(null);
  const [estimateInfo, setEstimateInfo] = useState<GetRrideEstimateRequest>({
    customer_id: 0,
    origin:  "",
    destination: ""
  });

  async function handleGetEstimate() {
    try {
      setLoading(true);
      const response: GetRrideEstimateResponse = await ApiRide.GetRrideEstimate(estimateInfo);
      // const filtro = response.options.filter((item, index, self) => index === self.findIndex((t) => t.name === item.name))
      // response.options = filtro
      setEstimateResponse(response);
    } catch (error: any) {
        const erro:AlertObj = {
          type: 'warning',
          message: error?.response?.data?.error_description,
        };
        setAlertList([...alertList, erro]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectDriver(data: SelectDrive) {
    try {
      const request: ConfirmRideRequest = {
        customer_id: estimateInfo.customer_id,
        origin: estimateInfo.origin,
        destination: estimateInfo.destination,
        distance: data.distance,
        duration: data.duration,
        driver: data.driver,
        value: data.value
    };
      await ApiRide.ConfirmRide(request);
      router.push(`/history/${request.customer_id}`)
    } catch (error: any) {
        const erro:AlertObj = {
          type: 'warning',
          message: error?.response?.data?.error_description,
        };
        setAlertList([...alertList, erro]);
    } finally {
      
    }
  }


  return (
    <>
      <Header />
      <div className='h-screen w-screen md:overflow-hidden p-20 bg-white'>
        {alertList.length > 0 && alertList.map((item: AlertObj, index) => (
                  <Alert key={index} alert={item}/>
                ) )}        
        <div className="flex flex-col md:flex-row items-stretch justify-between" >
          <div className="flex flex-col md:flex-row w-full md:w-1/2">
            <EstimateForm 
              estimateInfo={estimateInfo}
              setEstimateInfo={setEstimateInfo}
              handleGetEstimate={handleGetEstimate}
              loading={loading}
            />
            <div className="w-full md:w-3/5 h-1/2 overflow-hidden mt-5 md:mt-0">
              <div className="flex flex-row md:flex-col gap-4 h-full overflow-x-auto md:overflow-y-auto scrollbar-custom">
                {estimateResponse && estimateResponse.options.length > 0 && estimateResponse.options.map((item, index)=> (
                  <DriverCard key={index} driver={item} distance={estimateResponse.distance} handleSelectDriver={handleSelectDriver} duration={estimateResponse.duration}/>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-6 mt-5 md:mt-0">
            <div className="h-[300px] md:h-[800px]">
              <Map />
            </div>
            
          </div>
        </div>
      </div>
      
      
      {/* <DriverCard {driver}/> */}
    </>
  );
}

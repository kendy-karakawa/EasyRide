"use client";

import Header from '@/components/header/header';
import ApiRide from '@/services/apiRide';
import { AlertObj, Driver, RideHistory, RideHistoryResponse } from '@/types/types';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'
import Alert from '@/components/alert/alert';
import APIDriver from '@/services/apiDriver';

export default function History(){
  const params = useParams<{id: string;}>()
   
    const [customerId, setCustomerId] = useState(0);
    const [selectedDriver, setSelectedDriver] = useState<number>(0);
    const [rides, setRides]= useState<RideHistory[]>([]);
    const [alertList, setAlertList] = useState<AlertObj[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([]);

    const getRideHistory = async (customer_id:number, driver_id: number) => {
      try {
        const result: RideHistoryResponse = driver_id === 0 ? 
          await ApiRide.GetRideHistory(customer_id) : 
          await ApiRide.GetRideHistoryPerDriver(customer_id, driver_id);
        setRides(result.rides);
      } catch (error: any) {
        const erro:AlertObj = {
          type: 'warning',
          message: error?.response?.data?.error_description,
        };
        setAlertList([...alertList, erro]);
        setRides([]);
      }
    };

    const getAllDrivers = async () => {
      try {
        const result: Driver[] = await APIDriver.getAllDrivers();
        setDrivers(result)
      } catch (error: any) {
        console.info(error);
      }
    }

    const applyFilters = () => {
      if (customerId) {
        getRideHistory(customerId, selectedDriver);
      }
    };
    
    useEffect(() => {
      if (params.id && Number(params.id) !== 0) {
        setCustomerId(Number(params.id));
        getRideHistory(Number(params.id), 0);
      }
      getAllDrivers();
    }, [params]);


    return (
        <>
          <Header/>
          <div className="p-6 pt-20 bg-gray-100 min-h-[500px]">
            <div className=" mx-auto bg-white shadow-md rounded-lg p-6">
              {alertList.length > 0 && alertList.map((item: AlertObj, index) => (
                <Alert key={index} alert={item}/>
              ) )}
              {/* Filtros */}
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Histórico de Viagens</h1>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                  type="number"
                  value={customerId}
                  onChange={(e) => setCustomerId(Number(e.target.value))}
                  placeholder="ID do usuário"
                  className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3"
                />
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg p-3 w-full md:w-1/3"
                >
                  <option value="0">Todos os Motoristas</option>
                  {drivers.length > 0 && drivers.map((driver, index)=> (
                    <option key={index} value={driver.id}>{driver.name}</option>
                  ))}
                </select>
                <button
                  onClick={applyFilters}
                  className="bg-blue-500 text-white rounded-lg p-3 w-full md:w-1/3 hover:bg-blue-600"
                >
                  Aplicar Filtro
                </button>
              </div>
      
              {/* Lista de Viagens */}
              {rides.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-200">
                    <thead className="bg-gray-100 text-gray-600">
                      <tr>
                        <th className="p-3 border-b">Data e Hora</th>
                        <th className="p-3 border-b">Motorista</th>
                        <th className="p-3 border-b">Origem</th>
                        <th className="p-3 border-b">Destino</th>
                        <th className="p-3 border-b">Distância (km)</th>
                        <th className="p-3 border-b">Tempo (min)</th>
                        <th className="p-3 border-b">Valor (R$)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rides.map((ride: RideHistory) => (
                        <tr key={ride.id} className="hover:bg-gray-50">
                          <td className="p-3 border-b">
                            {new Date(ride.date).toLocaleString()}
                          </td>
                          <td className="p-3 border-b">{ride.driver.name}</td>
                          <td className="p-3 border-b">{ride.origin}</td>
                          <td className="p-3 border-b">{ride.destination}</td>
                          <td className="p-3 border-b">{(ride.distance).toFixed(2).replace('.', ',')} km</td>
                          <td className="p-3 border-b">{Math.floor(ride.duration/60)} min</td>
                          <td className="p-3 border-b">R$ {(ride.value * (ride.distance/1000)).toFixed(2).replace('.', ',')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">Nenhuma viagem encontrada.</p>
              )}
            </div>
          </div>
        </>
      );

    
}
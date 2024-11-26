import { GetRrideEstimateRequest } from '@/types/types';
import { FaCar } from 'react-icons/fa';

export default function EstimateForm({
  estimateInfo,
  setEstimateInfo,
  handleGetEstimate,
  loading
}: {
  estimateInfo: GetRrideEstimateRequest;
  setEstimateInfo: (info: GetRrideEstimateRequest) => void;
  handleGetEstimate: () => void;
  loading: boolean
}) {


  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-1/2 h-[350px] min-w-[300px]">
      {/* Ícone e título menor */}
      <div className="flex items-center mb-4">
        <div className="bg-gray-200 p-3 rounded-full">
          <FaCar className="text-black w-6 h-6" />
        </div>
        <span className="ml-3 text-2xl font-medium font-bold text-gray-900">Peça uma viagem</span>
      </div>

      {/* Campos de entrada */}
      
      <div className="space-y-3">
        <div className="relative flex items-center bg-gray-100 rounded-md">
          <span className="absolute left-2 top-2 text-black">&#9679;</span>
          <input
            type="number"
            min="0"
            step="1"
            onKeyDown={(e) => (e.key === '.' || e.key === ',') && e.preventDefault()}
            onChange={(e) => setEstimateInfo({...estimateInfo, customer_id: Number(e.target.value)})}
            placeholder="Informe seu ID"
            className="w-full pl-8 pr-4 py-2 text-gray-600 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="relative flex items-center bg-gray-100 rounded-md">
          <span className="absolute left-2 top-2 text-black">&#9679;</span>
          <input
            type="text"
            onChange={(e) => setEstimateInfo({...estimateInfo, origin: e.target.value})}
            placeholder="Endereço de origem"
            className="w-full pl-8 pr-4 py-2 text-gray-600 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="relative flex items-center bg-gray-100 rounded-md">
          <span className="absolute left-2 top-2 text-black">&#9679;</span>
          <input
            type="text"
            onChange={(e) => setEstimateInfo({...estimateInfo, destination: e.target.value})}
            placeholder="Endereço de Destino"
            className="w-full pl-8 pr-4 py-2 text-gray-600 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Botão */}
      <button className="mt-6 w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-800" 
      onClick={handleGetEstimate}
      disabled={loading}
      >
        {loading ? "Carregando..." : "Ver preços"}
      </button>
    </div>
  )
}
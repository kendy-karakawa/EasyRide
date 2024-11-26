import { Driver, SelectDrive } from '@/types/types';
import { FaStar } from 'react-icons/fa';


export default function DriverCard({
    driver, 
    distance, 
    duration, 
    handleSelectDriver
}: {driver: Driver, distance: number, duration: number ,handleSelectDriver: (data: SelectDrive)=> void}) { 
    function handleSelect(){
        const data: SelectDrive = {
            driver: {
                id: driver.id,
                name: driver.name
            },
            distance,
            duration,
            value: driver.value * distance
        }
        handleSelectDriver(data);
    };

    return (
        <div className="min-h-[500px] min-w-[300px] bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            {/* Nome do motorista */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{driver.name}</h2>

            {/* Descrição */}
            <p className="text-gray-600 mb-4">{driver.description}</p>

            {/* Veículo */}
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Veículo:</h3>
                <p className="text-gray-600">{driver.vehicle}</p>
            </div>

            {/* Avaliação */}
            <div className="flex items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mr-2">Avaliação:</h3>
                <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                    key={index}
                    className={`w-5 h-5 ${
                        index < driver.review.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    />
                ))}
                </div>
            </div>
            <p className="text-gray-600 italic">{driver.review.comment}</p>

            {/* Preço e distância mínima */}
            <div className="mt-4 flex justify-between items-center">
                <div>
                <p className="text-sm text-gray-700">Preço:</p>
                <p className="text-lg font-semibold text-gray-800">R$ {(driver.value * distance).toFixed(2).replace('.', ',')}</p>
                </div>
                <div>
                <p className="text-sm text-gray-700">tempo</p>
                <p className="text-lg font-semibold text-gray-800">{Math.floor(duration/60)} min</p>
                </div>
                <div>
                <p className="text-sm text-gray-700">Distância mínima:</p>
                <p className="text-lg font-semibold text-gray-800">{driver.minKm} km</p>
                </div>
            </div>

            {/* Botão */}
            <button className="mt-6 w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-800"
            onClick={handleSelect}
            >
                Escolher
            </button>
        </div>
    )
}
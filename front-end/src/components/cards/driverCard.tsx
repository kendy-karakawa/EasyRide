import { Driver } from '@/types/types';
import { FaStar } from 'react-icons/fa';


export default function DriverCard(driver: Driver) {
    driver = 
    {
      "id": 1,
      "name": "Homer Simpson",
      "description": "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      "vehicle": "Plymouth Valiant 1973 rosa e enferrujado",
      "review": {
        "rating": 2,
        "comment": "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts."
      },
      "value": 2.5,
      "minKm": 1
    };
   

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
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
                <p className="text-sm text-gray-700">Preço por km:</p>
                <p className="text-lg font-semibold text-gray-800">R$ {driver.value.toFixed(2)}</p>
                </div>
                <div>
                <p className="text-sm text-gray-700">Distância mínima:</p>
                <p className="text-lg font-semibold text-gray-800">{driver.minKm} km</p>
                </div>
            </div>

            {/* Botão */}
            <button className="mt-6 w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-800">
                Escolher
            </button>
        </div>
    )
}
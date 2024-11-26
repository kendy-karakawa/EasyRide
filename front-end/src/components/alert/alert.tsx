"use client"

import { AlertObj, AlertStyle, AlertType } from '@/types/types';
import { useState } from 'react';
import { FaInfoCircle, FaTimes } from 'react-icons/fa';

export default function Alert({alert}: { alert: AlertObj }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const alertStyles: Record<AlertType, AlertStyle> = {
    info: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700'
    },
    warning: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-700'
    },
    success: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-700'
    }
  };

  const { bgColor, textColor } =  alertStyles[alert.type];

  return (
    <div className="w-9/12 mx-auto">
        <div className={`flex items-center ${bgColor} p-4 rounded-lg shadow-md mb-4 `}>
            {/* Ícone */}
            <div className={`mr-3 ${textColor} text-lg`}><FaInfoCircle /></div>
            {/* Mensagem */}
            <div className={`flex-1 ${textColor} font-medium`}>
                {alert.message}
            </div>
            {/* Botão de fechar */}
            <button
                onClick={() => setVisible(false)}
                className="text-gray-500 hover:text-gray-700"
            >
                <FaTimes />
            </button>
        </div>
    </div>
    
  );
}

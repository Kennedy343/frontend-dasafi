// src/components/MetricCard.tsx

import React from 'react';
import type { IconType } from 'react-icons'; 
import { FaBox, FaClock, FaCalendarAlt } from 'react-icons/fa';

// Mapa para asociar el nombre del ícono (string) a su componente real
const IconMap: { [key: string]: IconType } = {
    FaBox,
    FaClock,
    FaCalendarAlt,
    // Puedes añadir más aquí según los necesites
};

interface MetricCardProps {
    title: string;
    value: string | number;
    iconName: keyof typeof IconMap; // Asegura que el nombre del icono es válido
    bgColor: string; // Clase de Tailwind para el color de fondo
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, iconName, bgColor }) => {
    const IconComponent = IconMap[iconName];

    return (
        <div className={`p-5 rounded-lg shadow-lg ${bgColor} transition-shadow duration-300 hover:shadow-xl`}>
            
            <div className="flex items-center">
                {/* Ícono */}
                {/* Nota: Mantenemos el ícono de color azul/gris claro ya que se ve bien en fondos claros */}
                <div className={`p-3 rounded-full mr-4 bg-opacity-30 bg-gray-50 text-primary-blue`}>
                    <IconComponent size={24} />
                </div>
                
                {/* Contenido */}
                <div>
                    {/* 🛑 CORRECCIÓN 1: Título sutil pero visible (text-gray-600) */}
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">{title}</p>
                    
                    {/* 🛑 CORRECCIÓN 2: Valor principal oscuro (text-gray-900) */}
                    <p className="text-4xl font-bold mt-1 text-gray-900">{value}</p> 
                </div>
            </div>
            
        </div>
    );
};

export default MetricCard;
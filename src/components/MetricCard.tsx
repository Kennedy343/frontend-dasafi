// src/components/MetricCard.tsx (CÓDIGO CORREGIDO)

import React from 'react';
import type { IconType } from 'react-icons'; 
import { FaBox, FaClock, FaCalendarAlt } from 'react-icons/fa';

const IconMap: { [key: string]: IconType } = {
    FaBox,
    FaClock,
    FaCalendarAlt,
};

interface MetricCardProps {
    title: string;
    value: string | number;
    iconName: keyof typeof IconMap;
    bgColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, iconName, bgColor }) => {
    const IconComponent = IconMap[iconName];

    return (
        <div className={`p-5 rounded-lg shadow-lg ${bgColor} transition-shadow duration-300 hover:shadow-xl`}>
            
            <div className="flex items-center">
                {/* Ícono */}
                {/* 🛑 CORRECCIÓN CLAVE: Cambiamos 'text-primary-blue' por 'text-blue-600' (azul oscuro estándar) 
                   o aseguramos que 'text-primary-blue' sea un azul oscuro visible. */}
                <div className={`p-3 rounded-full mr-4 bg-opacity-30 bg-gray-50 text-blue-600`}>
                    <IconComponent size={24} />
                </div>
                
                {/* Contenido (Ya corregido a texto oscuro) */}
                <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">{title}</p>
                    <p className="text-4xl font-bold mt-1 text-gray-900">{value}</p> 
                </div>
            </div>
            
        </div>
    );
};

export default MetricCard;
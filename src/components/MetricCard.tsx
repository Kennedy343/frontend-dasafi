// src/components/MetricCard.tsx

import React from 'react';
// ✅ CORRECCIÓN: Usamos 'import type' para importar solo el tipo
import type { IconType } from 'react-icons'; 
import { FaBox, FaClock, FaCalendarAlt } from 'react-icons/fa';

// ... el resto del código es idéntico
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
    // Usa 'dark-card' de tu tailwind.config.js para el fondo de las tarjetas
    <div className={`p-5 rounded-lg shadow-lg ${bgColor} transition-shadow duration-300 hover:shadow-xl`}>
      
      <div className="flex items-center">
        {/* Ícono */}
        <div className={`p-3 rounded-full mr-4 bg-opacity-30 bg-gray-50 text-primary-blue`}>
          <IconComponent size={24} />
        </div>
        
        {/* Contenido */}
        <div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-bold mt-1 text-white">{value}</p>
        </div>
      </div>
      
    </div>
  );
};

export default MetricCard;
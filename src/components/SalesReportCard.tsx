// src/components/SalesReportCard.tsx

import React from 'react';
import { FaChartLine } from 'react-icons/fa'; // Icono para las ventas

const SalesReportCard: React.FC = () => {
  return (
    // Usa 'dark-card' de tu tailwind.config.js para el fondo
    <div className="bg-dark-card p-6 rounded-lg shadow-lg">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Ventas Totales (Últimos 30 días)</h3>
        <FaChartLine size={24} className="text-primary-blue" />
      </div>

      <div className="text-4xl font-bold text-green-400 mb-2">$15,450.00</div>
      <p className="text-sm text-gray-400">
        <span className="text-green-400">+12.5%</span> respecto al mes anterior.
      </p>
      
      {/* Espacio reservado para un gráfico futuro */}
      <div className="mt-4 h-32 w-full bg-gray-700 rounded-md flex items-center justify-center text-gray-500">
        [Placeholder para Gráfico de Ventas]
      </div>

    </div>
  );
};

export default SalesReportCard;
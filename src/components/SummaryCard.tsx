// src/components/SummaryCard.tsx (Con Tailwind CSS)
import React from 'react';

interface SummaryCardProps {
    title: string;
    value: string;
    icon: React.ElementType; // Para aceptar iconos de Fa/Md/etc.
    trend: number; // Porcentaje de cambio (ej: 15.5)
    period: string; // Periodo de comparación (ej: vs Periodo Anterior)
    isCurrency?: boolean; // Si el valor es monetario
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, trend, period, isCurrency = false }) => {
    
    // Clases dinámicas para la tendencia (Verde si sube, Rojo si baja)
    const trendColor = trend >= 0 ? 'text-green-500' : 'text-red-500';
    const trendSymbol = trend >= 0 ? '▲' : '▼';

    return (
        // Tarjeta con fondo oscuro y sombra
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex flex-col space-y-3">
            
            {/* Icono y Título */}
            <div className="flex items-center text-gray-300">
                {/* Icono más grande, color azul para el dinero, gris para otros */}
                <Icon className={`w-6 h-6 mr-3 ${isCurrency ? 'text-green-400' : 'text-sky-400'}`} />
                <h3 className="text-sm font-medium uppercase tracking-wider">{title}</h3>
            </div>
            
            {/* Valor Principal */}
            <p className="text-3xl font-bold text-white">
                {isCurrency && 'Q'}{value}
            </p>
            
            {/* Tendencia (Comparación) */}
            <p className={`text-sm ${trendColor} flex items-center`}>
                <span className="font-bold mr-1">{trendSymbol}{Math.abs(trend).toFixed(1)}%</span> 
                <span className="text-gray-400 font-light ml-1 text-xs">{period}</span>
            </p>
        </div>
    );
};

export default SummaryCard;
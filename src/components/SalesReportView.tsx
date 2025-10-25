// src/components/SalesReportView.tsx (Con Tailwind CSS)
import React, { useState } from 'react';
import { FaChartLine, FaCalendarAlt, FaDollarSign, FaCheckCircle, FaSort } from 'react-icons/fa';
import SummaryCard from './SummaryCard'; // Importamos el componente de tarjeta

// --- COMPONENTE PRINCIPAL (SalesReportView) ---

const SalesReportView: React.FC = () => {
    // Estados simulados para filtros
    const [startDate, setStartDate] = useState('01/10/2025');
    const [endDate, setEndDate] = useState('31/10/2025');
    const [periodFilter, setPeriodFilter] = useState('Últimos 30 días');

    const handleGenerateReport = () => {
        alert(`Generando reporte de ${startDate} a ${endDate}`);
    };

    // Datos simulados para las tarjetas (Basado en tu imagen)
    const reportData = {
        ingresos: { value: '25,480', trend: 15.5, period: 'vs Periodo Anterior', isCurrency: true },
        ventas: { value: '450', trend: 8, period: 'vs Periodo Anterior', isCurrency: false },
        ticket: { value: '56.62', trend: -1.2, period: 'vs Periodo Anterior', isCurrency: true },
    };

    return (
        <div className="p-8 bg-dark-bg min-h-screen text-gray-100">
            
            {/* Título y Descripción */}
            <h1 className="text-3xl font-bold mb-2 flex items-center text-white">
                <FaChartLine className="mr-3 text-sky-400" /> Reporte de Ventas Detallado
            </h1>
            <p className="text-gray-400 mb-6">
                Análisis de rendimiento, filtrado por periodos, categorías y productos.
            </p>

            {/* Bloque de Filtros y Botón Generar Reporte */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-8 flex flex-wrap items-center gap-4">
                
                {/* Campos de Fecha (Simulación) */}
                <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400 w-4 h-4" />
                    <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} 
                           className="p-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500 w-32" />
                    <span className="text-gray-300">al</span>
                    <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} 
                           className="p-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500 w-32" />
                </div>

                {/* Filtro de Período (Dropdown) */}
                <select value={periodFilter} onChange={(e) => setPeriodFilter(e.target.value)}
                    className="p-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500 appearance-none">
                    <option>Últimos 30 días</option>
                    <option>Últimos 90 días</option>
                    <option>Mes Actual</option>
                </select>

                {/* Botón Generar Reporte */}
                <button
                    onClick={handleGenerateReport}
                    className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ml-auto"
                >
                    Generar Reporte
                </button>
            </div>

            {/* Tarjetas de Resumen (KPIs) - Usando Grid de 3 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <SummaryCard 
                    title="Ingresos Totales (30 días)" 
                    icon={FaDollarSign} 
                    {...reportData.ingresos}
                />
                <SummaryCard 
                    title="Ventas Concretadas" 
                    icon={FaCheckCircle} 
                    {...reportData.ventas}
                />
                <SummaryCard 
                    title="Ticket Promedio" 
                    icon={FaSort} 
                    {...reportData.ticket}
                />
            </div>

            {/* Gráfico de Líneas */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Tendencia de Ventas (Gráfico de Líneas)</h2>
                {/* Espacio para la integración del componente de gráfico */}
                <div className="bg-gray-900 h-96 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500">
                    [Espacio para la Integración de Gráficos (Ej: Chart.js o Recharts)]
                </div>
            </section>
            
            {/* Productos Más Vendidos */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Productos Más Vendidos por Ingresos</h2>
                <div className="bg-gray-900 h-64 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500">
                    [Espacio para la Tabla/Lista de Productos Más Vendidos]
                </div>
            </section>
        </div>
    );
};

export default SalesReportView;
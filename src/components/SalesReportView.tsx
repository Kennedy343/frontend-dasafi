import React, { useState } from 'react';
// Importamos los íconos de lucide-react
import { LineChart, Calendar, DollarSign, CheckCircle, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Clock, Download } from 'lucide-react';
// Seguimos sin usar 'recharts' para evitar el error de dependencia.

// --- TIPO DE DATOS ---

// Definición de las propiedades de la tarjeta de resumen
interface SummaryCardProps {
    title: string;
    value: string;
    trend: number;
    period: string;
    isCurrency: boolean;
    icon: React.ElementType; // Icono de lucide-react
}

// Datos simulados para la tabla
interface ProductSale {
    id: number;
    product: string;
    category: string;
    units: number;
    revenue: number;
}


// --- SUBCOMPONENTE 1: Tarjeta de Resumen (SummaryCard) ---

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, trend, period, isCurrency, icon: Icon }) => {
    const trendColor = trend >= 0 ? 'text-green-600' : 'text-red-600';
    const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown;
    const currencySymbol = isCurrency ? 'Q ' : ''; // Símbolo de Quetzales

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:shadow-xl hover:scale-[1.01]">
            <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">{title}</p>
                <Icon className="w-6 h-6 text-blue-600" />
            </div>
            
            <div className="text-3xl font-extrabold text-gray-900 mb-1">
                {currencySymbol}{value}
            </div>

            <div className="flex items-center text-sm">
                <TrendIcon className={`w-4 h-4 mr-1 ${trendColor}`} />
                <span className={`font-bold mr-1 ${trendColor}`}>{Math.abs(trend)}%</span>
                <span className="text-gray-500">{period}</span>
            </div>
        </div>
    );
};


// --- SUBCOMPONENTE 2: Tabla de Productos Más Vendidos ---

const TopProductsTable: React.FC<{ data: ProductSale[] }> = ({ data }) => {
    const [sortBy, setSortBy] = useState<'revenue' | 'units'>('revenue');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const handleSort = (column: 'revenue' | 'units') => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('desc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (sortDirection === 'asc') {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
    });

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Producto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Categoría
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:text-gray-900 transition"
                            onClick={() => handleSort('units')}>
                            Unidades Vendidas
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:text-gray-900 transition"
                            onClick={() => handleSort('revenue')}>
                            Ingresos Generados
                            {(sortBy === 'revenue') && (sortDirection === 'desc' ? <ArrowDownRight className="w-3 h-3 inline ml-1 text-gray-500" /> : <ArrowUpRight className="w-3 h-3 inline ml-1 text-gray-500" />)}
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50/50 transition duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-indigo-100 text-indigo-700">
                                    {item.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">{item.units.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-700">
                                Q {item.revenue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


// --- SUBCOMPONENTE 3: Gráfico de Barras Agrupadas (Reemplazo de Recharts) ---

interface ChartDataItem {
    name: string;
    Ingresos: number;
    Ventas: number;
}

const GroupedBarChartSimulation: React.FC<{ data: ChartDataItem[] }> = ({ data }) => {
    // 1. Calcular el valor máximo para escalar la altura de las barras de Ingresos (azul)
    const maxRevenue = Math.max(...data.map(item => item.Ingresos)) * 1.1; // 10% de margen
    // 2. Calcular el valor máximo para escalar la altura de las barras de Ventas (verde)
    const maxSales = Math.max(...data.map(item => item.Ventas)) * 1.1;

    return (
        <div className="flex flex-col space-y-4 pt-4">
            {/* Leyenda */}
            <div className="flex justify-end items-center space-x-4 text-sm font-medium text-gray-600">
                <span className="flex items-center"><span className="w-3 h-3 bg-blue-600 rounded-sm mr-1"></span> Ingresos (Q)</span>
                <span className="flex items-center"><span className="w-3 h-3 bg-green-600 rounded-sm mr-1"></span> Ventas (Unidades)</span>
            </div>
            
            {/* Contenedor del Gráfico y Eje X */}
            <div className="flex items-end h-72 border-b border-l border-gray-300 pr-2">
                {data.map((item, index) => (
                    // Contenedor para cada grupo de barras (un punto en el eje X)
                    <div key={index} className="flex flex-col justify-end items-center grow h-full px-2 group relative">
                        
                        {/* Contenedor de las dos barras */}
                        <div className="flex justify-center w-full h-full items-end">
                            
                            {/* Barra 1: Ingresos (Azul) */}
                            <div 
                                className="w-2/5 bg-blue-600/90 rounded-t-sm transition-all duration-500 ease-out shadow-md mx-0.5 relative" 
                                style={{ height: `${(item.Ingresos / maxRevenue) * 100}%` }} 
                            />
                            
                            {/* Barra 2: Ventas (Verde) */}
                            <div 
                                className="w-2/5 bg-green-600/90 rounded-t-sm transition-all duration-500 ease-out shadow-md mx-0.5 relative" 
                                style={{ height: `${(item.Ventas / maxSales) * 100}%` }} 
                            />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-3 p-3 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl transform translate-y-2 group-hover:translate-y-0">
                            <p className="font-bold text-blue-300">{item.name}</p>
                            <p>Ingresos: <span className="text-blue-200 font-medium">Q {item.Ingresos.toLocaleString()}</span></p>
                            <p>Ventas: <span className="text-green-200 font-medium">{item.Ventas.toLocaleString()}</span></p>
                            <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
                        </div>
                        
                        {/* Etiqueta del Día */}
                        <span className="text-xs text-gray-500 mt-1">{item.name.split(' ')[0]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL (SalesReportView) ---

const SalesReportView: React.FC = () => {
    // Estados simulados para filtros
    const [startDate, setStartDate] = useState('2025-10-01');
    const [endDate, setEndDate] = useState('2025-10-31');
    const [periodFilter, setPeriodFilter] = useState('Últimos 30 días');
    const [isGenerating, setIsGenerating] = useState(false);

    // Datos simulados para las tarjetas
    const reportData = {
        ingresos: { value: '25,480.50', trend: 15.5, period: 'vs Periodo Anterior', isCurrency: true, icon: DollarSign },
        ventas: { value: '450', trend: 8, period: 'vs Periodo Anterior', isCurrency: false, icon: CheckCircle },
        ticket: { value: '56.62', trend: -1.2, period: 'vs Periodo Anterior', isCurrency: true, icon: LineChart },
    };

    // Datos simulados para el gráfico
    const chartData: ChartDataItem[] = [
        { name: '01 Oct', Ingresos: 1200, Ventas: 10 },
        { name: '07 Oct', Ingresos: 1500, Ventas: 15 },
        { name: '14 Oct', Ingresos: 2000, Ventas: 18 },
        { name: '21 Oct', Ingresos: 1800, Ventas: 12 },
        { name: '28 Oct', Ingresos: 2500, Ventas: 25 },
        { name: '31 Oct', Ingresos: 3000, Ventas: 30 },
        { name: '07 Nov', Ingresos: 2800, Ventas: 28 },
        { name: '14 Nov', Ingresos: 3500, Ventas: 35 },
    ];

    // Datos simulados para la tabla
    const topProductsData: ProductSale[] = [
        { id: 1, product: 'Servicio Mantenimiento Premium', category: 'Servicios', units: 120, revenue: 8500.00 },
        { id: 2, product: 'Neumático Deportivo R18', category: 'Accesorios', units: 45, revenue: 5400.00 },
        { id: 3, product: 'Cambio de Aceite Sintético', category: 'Servicios', units: 210, revenue: 4200.00 },
        { id: 4, product: 'Filtro de Aire K&N', category: 'Repuestos', units: 75, revenue: 2100.00 },
        { id: 5, product: 'Alineación y Balanceo', category: 'Servicios', units: 90, revenue: 1800.00 },
    ];

    const handleGenerateReport = () => {
        setIsGenerating(true);
        console.log(`Generando reporte de ${startDate} a ${endDate}`);
        
        // Simulación de carga de 2 segundos
        setTimeout(() => {
            setIsGenerating(false);
            console.log("Reporte generado con éxito.");
        }, 2000);
    };

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen text-gray-900 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Título y Descripción */}
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 flex items-center text-gray-900">
                    <LineChart className="mr-3 w-7 h-7 text-blue-600" /> Reporte de Ventas Detallado
                </h1>
                <p className="text-gray-600 mb-8">
                    Análisis de rendimiento, filtrado por periodos, categorías y productos.
                </p>

                {/* Bloque de Filtros y Botón Generar Reporte */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-wrap items-center gap-4 border border-gray-200">
                    
                    {/* Campos de Fecha */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <Calendar className="text-gray-500 w-5 h-5" />
                        <label htmlFor="start-date" className="text-gray-700 text-sm">Desde:</label>
                        <input type="date" id="start-date" value={startDate} onChange={(e) => setStartDate(e.target.value)} 
                            className="p-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto" />
                        <label htmlFor="end-date" className="text-gray-700 text-sm">Hasta:</label>
                        <input type="date" id="end-date" value={endDate} onChange={(e) => setEndDate(e.target.value)} 
                            className="p-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto" />
                    </div>

                    {/* Filtro de Período (Dropdown) */}
                    <div className="flex items-center gap-2 ml-auto sm:ml-4">
                         <Clock className="text-gray-500 w-5 h-5" />
                        <select value={periodFilter} onChange={(e) => setPeriodFilter(e.target.value)}
                            className="p-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8">
                            <option>Últimos 30 días</option>
                            <option>Últimos 90 días</option>
                            <option>Mes Actual</option>
                            <option>Trimestre Actual</option>
                        </select>
                    </div>

                    {/* Botón Generar Reporte */}
                    <button
                        onClick={handleGenerateReport}
                        disabled={isGenerating}
                        className={`flex items-center font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-md w-full sm:w-auto mt-4 sm:mt-0 
                            ${isGenerating ? 'bg-blue-700 opacity-70 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        {isGenerating ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <Download className="w-4 h-4 mr-2" />
                        )}
                        {isGenerating ? 'Generando...' : 'Generar Reporte'}
                    </button>
                </div>

                {/* Tarjetas de Resumen (KPIs) - Usando Grid de 3 columnas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <SummaryCard 
                        title="Ingresos Totales (30 días)" 
                        {...reportData.ingresos}
                    />
                    <SummaryCard 
                        title="Ventas Concretadas" 
                        {...reportData.ventas}
                    />
                    <SummaryCard 
                        title="Ticket Promedio" 
                        {...reportData.ticket}
                    />
                </div>

                {/* Gráfico de Barras Agrupadas */}
                <section className="bg-white p-6 rounded-xl shadow-xl mb-10 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-3 flex items-center">
                        <LineChart className="w-5 h-5 mr-2 text-blue-600"/> Comparativa de Ingresos y Ventas
                    </h2>
                    
                    <GroupedBarChartSimulation data={chartData} />
                    
                </section>
                
                {/* Productos Más Vendidos (Tabla) */}
                <section className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-3 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-green-600"/> Productos Más Vendidos por Ingresos
                    </h2>
                    <TopProductsTable data={topProductsData} />
                </section>

            </div>
        </div>
    );
};

export default SalesReportView;

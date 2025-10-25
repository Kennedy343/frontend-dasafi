// src/components/CustomOrdersView.tsx (Con Tailwind CSS)
import React, { useState } from 'react';
import { FaShoppingCart, FaPlus, FaHistory, FaEye, FaUserTag } from 'react-icons/fa';

// --- INTERFACES Y DATOS ---

interface CustomOrder {
    id: number;
    client: string;
    date: string;
    description: string;
    value: string;
    status: 'En Proceso' | 'Cotización' | 'Enviado' | 'Entregado';
}

const mockOrders: CustomOrder[] = [
    { id: 501, client: 'María Soto', date: '2025-10-20', description: 'Bicicleta Montaña Personalizada', value: '$1,850.00', status: 'En Proceso' },
    { id: 502, client: 'Pedro Gómez', date: '2025-10-25', description: 'Kit de Calcomanías Personalizadas', value: '$45.50', status: 'Cotización' },
    { id: 503, client: 'Felipe Reyes', date: '2025-10-10', description: 'Asiento de Gel Ergonómico XL', value: '$120.99', status: 'Enviado' },
    { id: 504, client: 'Ana Díaz', date: '2025-10-10', description: 'Mantenimiento preventivo anual', value: '$80.00', status: 'Entregado' },
];

// --- Funciones de estilo dinámico (Tailwind) ---

const getStatusClasses = (status: CustomOrder['status']) => {
    switch (status) {
        case 'En Proceso': return 'bg-sky-600 text-white';
        case 'Cotización': return 'bg-orange-500 text-gray-900';
        case 'Enviado': return 'bg-purple-600 text-white'; // Usamos purple en lugar de verde para diferenciar de "Completado"
        case 'Entregado': return 'bg-green-600 text-white';
        default: return 'bg-gray-500 text-white';
    }
};

// --- COMPONENTE PRINCIPAL (CustomOrdersView) ---

const CustomOrdersView: React.FC = () => {
    const [orders] = useState(mockOrders);

    const handleCreateQuotation = () => {
        alert('Abriendo Modal para Crear Nueva Cotización...');
    };

    const handleViewHistory = () => {
        alert('Navegando a Historial de Pedidos...');
    };
    
    const handleViewOrder = (id: number) => {
        alert(`Viendo detalles del Pedido ID: ${id}`);
    };

    return (
        <div className="p-8 bg-dark-bg min-h-screen text-gray-100">
            
            {/* Título y Descripción */}
            <h1 className="text-3xl font-bold mb-2 flex items-center text-white">
                <FaShoppingCart className="mr-3 text-sky-400" /> Pedidos Personalizados y Cotizaciones
            </h1>
            <p className="text-gray-400 mb-6">
                Gestión y seguimiento de pedidos especiales, desde la solicitud inicial hasta la entrega final.
            </p>

            {/* Botones de Acción */}
            <div className="flex gap-4 mb-8">
                <button 
                    className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                    onClick={handleCreateQuotation}
                >
                    <FaPlus className="mr-2" /> Crear Nueva Cotización
                </button>
                <button 
                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                    onClick={handleViewHistory}
                >
                    <FaHistory className="mr-2" /> Ver Historial de Pedidos
                </button>
            </div>

            {/* Sección de la Tabla de Pedidos Activos */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-white">Pedidos Activos</h2>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID Pedido</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Descripción Breve</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Valor Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-700 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center">
                                        {/* Icono de persona simulado con Tailwind */}
                                        <FaUserTag className="mr-2 w-4 h-4 text-sky-400"/> {order.client}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300 max-w-sm truncate">{order.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-400">{order.value}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {/* Insignia de Estado */}
                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${getStatusClasses(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {/* Botón Ver (Ojo) */}
                                        <button
                                            title="Ver Detalles"
                                            onClick={() => handleViewOrder(order.id)}
                                            className="text-gray-400 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-150"
                                        >
                                            <FaEye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default CustomOrdersView;
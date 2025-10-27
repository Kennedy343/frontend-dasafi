// src/components/WorkshopServicesView.tsx
// servicios de taller y ordenes 
import type { FC } from 'react';
import { FaWrench, FaPlus, FaHistory, FaEdit, FaTrash } from 'react-icons/fa';

// --- INTERFACES Y DATOS MOCK ---

interface ServiceOrder {
    id: number;
    client: string;
    dateIn: string;
    service: string;
    estimatedCost: string;
    status: 'Pendiente' | 'En Progreso' | 'Finalizado' | 'Entregado';
}

const mockServiceOrders: ServiceOrder[] = [
    { id: 1001, client: 'Javier Pérez', dateIn: '2025-10-20', service: 'Mantenimiento General (Moto)', estimatedCost: '$85.00', status: 'En Progreso' },
    { id: 1002, client: 'Andrea López', dateIn: '2025-10-21', service: 'Cambio de Aceite y Filtros', estimatedCost: '$45.00', status: 'Pendiente' },
    { id: 1003, client: 'Roberto Sosa', dateIn: '2025-10-15', service: 'Reparación de Freno Trasero', estimatedCost: '$120.99', status: 'Finalizado' },
    { id: 1004, client: 'Carla Díaz', dateIn: '2025-10-10', service: 'Diagnóstico Eléctrico', estimatedCost: '$50.00', status: 'Entregado' },
];

// --- Funciones de estilo dinámico (Tailwind) ---

const getStatusClasses = (status: ServiceOrder['status']) => {
    switch (status) {
        case 'Pendiente': return 'bg-orange-500 text-gray-900';
        case 'En Progreso': return 'bg-sky-600 text-white';
        case 'Finalizado': return 'bg-green-600 text-white';
        case 'Entregado': return 'bg-purple-600 text-white';
        default: return 'bg-gray-500 text-white';
    }
};

// --- COMPONENTE PRINCIPAL (WorkshopServicesView) ---

const WorkshopServicesView: FC = () => {

    const handleNewOrder = () => alert('Abriendo formulario para Crear Nueva Orden de Servicio...');
    const handleViewHistory = () => alert('Navegando a Historial de Órdenes Finalizadas...');
    const handleEdit = (id: number) => alert(`Editando Orden ID: ${id}`);
    const handleDelete = (id: number) => alert(`Eliminando Orden ID: ${id}`);

    return (
        <div className="p-8 bg-dark-bg min-h-screen text-gray-100">
            
            {/* Título y Descripción */}
            <h1 className="text-3xl font-bold mb-2 flex items-center text-black">
                <FaWrench className="mr-3 text-sky-400" /> Servicios de Taller y Órdenes
            </h1>
            <p className="text-gray-400 mb-6">
                Gestión y seguimiento del estado de las órdenes de servicio, desde el ingreso hasta la entrega al cliente.
            </p>

            {/* Botones de Acción */}
            <div className="flex gap-4 mb-8">
                <button 
                    className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                    onClick={handleNewOrder}
                >
                    <FaPlus className="mr-2" /> Crear Nueva Orden
                </button>
                <button 
                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                    onClick={handleViewHistory}
                >
                    <FaHistory className="mr-2" /> Historial de Entregas
                </button>
            </div>

            {/* Sección de la Tabla de Órdenes Activas */}
            <section className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-black">Órdenes de Servicio Activas</h2>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha Ingreso</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Servicio Solicitado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Costo Estimado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {mockServiceOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-700 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.client}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.dateIn}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{order.service}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-cyan-400">{order.estimatedCost}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${getStatusClasses(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button
                                            title="Editar Orden"
                                            onClick={() => handleEdit(order.id)}
                                            className="text-gray-400 hover:text-sky-400 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-150 mr-2"
                                        >
                                            <FaEdit className="w-5 h-5" />
                                        </button>
                                        <button
                                            title="Eliminar Orden"
                                            onClick={() => handleDelete(order.id)}
                                            className="text-red-400 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-red-600 transition duration-150"
                                        >
                                            <FaTrash className="w-5 h-5" />
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

export default WorkshopServicesView;
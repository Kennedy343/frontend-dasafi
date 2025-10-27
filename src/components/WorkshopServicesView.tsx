import React, { useState } from 'react';
import type { FC } from 'react'; // Importación de tipo explícita para evitar errores TypeScript
import { Wrench, Plus, Edit, Trash2, X, AlertTriangle } from 'lucide-react';

// --- INTERFACES Y DATOS ---

type OrderStatus = 'Pendiente' | 'En Progreso' | 'Finalizado' | 'Entregado';
const ALL_STATUSES: OrderStatus[] = ['Pendiente', 'En Progreso', 'Finalizado', 'Entregado'];

interface ServiceOrder {
    id: number;
    client: string;
    dateIn: string;
    service: string;
    estimatedCost: string;
    status: OrderStatus;
}

const initialServiceOrders: ServiceOrder[] = [
    { id: 1001, client: 'Javier Pérez', dateIn: '2025-10-20', service: 'Mantenimiento General (Moto)', estimatedCost: '$85.00', status: 'En Progreso' },
    { id: 1002, client: 'Andrea López', dateIn: '2025-10-21', service: 'Cambio de Aceite y Filtros', estimatedCost: '$45.00', status: 'Pendiente' },
    { id: 1003, client: 'Roberto Sosa', dateIn: '2025-10-15', service: 'Reparación de Freno Trasero', estimatedCost: '$120.99', status: 'Finalizado' },
    { id: 1004, client: 'Carla Díaz', dateIn: '2025-10-10', service: 'Diagnóstico Eléctrico', estimatedCost: '$50.00', status: 'Entregado' },
];

// --- Funciones de estilo dinámico (Tailwind) ---

const getStatusClasses = (status: OrderStatus) => {
    switch (status) {
        // Colores de fondo más sutiles para el select, el texto se mantiene oscuro
        case 'Pendiente': return 'bg-orange-100 text-orange-800 border border-orange-300';
        case 'En Progreso': return 'bg-sky-100 text-sky-800 border border-sky-300';
        case 'Finalizado': return 'bg-green-100 text-green-800 border border-green-300';
        case 'Entregado': return 'bg-purple-100 text-purple-800 border border-purple-300';
        default: return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
};

// --- COMPONENTE PRINCIPAL (WorkshopServicesView) ---

const WorkshopServicesView: FC = () => {
    const [orders, setOrders] = useState<ServiceOrder[]>(initialServiceOrders);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const [editingOrder, setEditingOrder] = useState<ServiceOrder | null>(null); 
    const [deleteCandidateId, setDeleteCandidateId] = useState<number | null>(null); 

    // Estado para la creación de una nueva orden
    const [newOrder, setNewOrder] = useState<Omit<ServiceOrder, 'id'>>({
        client: '',
        dateIn: new Date().toISOString().substring(0, 10),
        service: '',
        estimatedCost: '$0.00',
        status: 'Pendiente',
    });

    // --- MANEJADORES DE ACCIONES ---
    
    // Nueva función para actualizar el estado de una orden directamente desde el select de la tabla
    const handleStatusChange = (id: number, newStatus: OrderStatus) => {
        setOrders(prevOrders => prevOrders.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
        console.log(`Estado de Orden ID ${id} cambiado a: ${newStatus}`);
    };

    const handleNewOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // 1. Generar nuevo ID
        const newId = Math.max(...orders.map(o => o.id), 1000) + 1;
        const finalNewOrder: ServiceOrder = { ...newOrder, id: newId };

        // 2. Actualizar el estado (agrega la nueva orden al inicio)
        setOrders([finalNewOrder, ...orders]);
        console.log('Orden Creada:', finalNewOrder);
        
        // 3. Cerrar y resetear
        setIsCreateModalOpen(false); 
        setNewOrder({ 
            client: '',
            dateIn: new Date().toISOString().substring(0, 10),
            service: '',
            estimatedCost: '$0.00',
            status: 'Pendiente',
        });
    };
    
    // Simula la apertura del modal para editar una orden existente
    const handleEditOrderClick = (order: ServiceOrder) => {
        setEditingOrder(order);
        setIsEditModalOpen(true);
    };

    // Maneja la actualización de la orden editada
    const handleEditOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingOrder) {
            // Actualiza la lista de órdenes con los cambios hechos en el modal
            setOrders(orders.map(order => 
                order.id === editingOrder.id 
                    ? editingOrder 
                    : order
            ));
            console.log(`Acción: Orden ID ${editingOrder.id} actualizada.`);
        }
        setIsEditModalOpen(false);
        setEditingOrder(null);
    };

    const confirmDeletion = (id: number) => {
        // Abre el modal de confirmación con el ID de la orden a borrar
        setDeleteCandidateId(id);
    };

    const executeDelete = () => {
        if (deleteCandidateId !== null) {
            // 1. Ejecutar la eliminación
            setOrders(orders.filter(order => order.id !== deleteCandidateId));
            console.log(`Acción: Eliminando Orden ID: ${deleteCandidateId}`);
            // 2. Cerrar el modal
            setDeleteCandidateId(null);
        }
    };

    // --- SUBCOMPONENTES ---

    const DeleteConfirmationModal: FC = () => (
        <Modal title="Confirmar Eliminación" onClose={() => setDeleteCandidateId(null)}>
            <div className="flex flex-col items-center p-4">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-gray-700 mb-6 text-center">
                    ¿Está seguro de que desea eliminar la Orden ID **{deleteCandidateId}**? Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end space-x-3 w-full">
                    <button 
                        type="button" 
                        onClick={() => setDeleteCandidateId(null)}
                        className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="button"
                        onClick={executeDelete}
                        className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
                    >
                        Sí, Eliminar
                    </button>
                </div>
            </div>
        </Modal>
    );

    const OrderModal: FC<{ 
        isEditing: boolean; 
        initialData?: ServiceOrder | Omit<ServiceOrder, 'id'>; 
        onClose: () => void; 
        onSubmit: (e: React.FormEvent) => void;
    }> = ({ isEditing, onClose, onSubmit }) => {
        
        // La fuente de datos actual es el estado superior (editingOrder o newOrder)
        const currentData = isEditing ? editingOrder : newOrder;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            const { id, value } = e.target;
            const updatedValue = id === 'status' ? value as OrderStatus : value;

            if (isEditing) {
                // Actualiza el estado 'editingOrder' del componente padre
                setEditingOrder(prev => ({ ...prev!, [id]: updatedValue } as ServiceOrder));
            } else {
                // Actualiza el estado 'newOrder' del componente padre
                setNewOrder(prev => ({ ...prev, [id]: updatedValue } as Omit<ServiceOrder, 'id'>));
            }
        };

        const title = isEditing 
            ? `Editar Orden de Servicio #${(currentData as ServiceOrder)?.id || 'N/A'}` 
            : 'Crear Nueva Orden de Servicio';

        return (
            <Modal title={title} onClose={onClose}>
                <form onSubmit={onSubmit} className="p-6 space-y-4">
                    {/* Formulario unificado para Crear/Editar */}
                    <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente:</label>
                        <input
                            type="text"
                            id="client"
                            required
                            value={currentData?.client || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
                        />
                    </div>
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Servicio Solicitado:</label>
                        <textarea
                            id="service"
                            required
                            rows={2}
                            value={currentData?.service || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="estimatedCost" className="block text-sm font-medium text-gray-700">Costo Estimado ($):</label>
                            <input
                                type="text"
                                id="estimatedCost"
                                value={currentData?.estimatedCost || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
                                placeholder="$0.00"
                            />
                        </div>
                        <div>
                            <label htmlFor="dateIn" className="block text-sm font-medium text-gray-700">Fecha de Ingreso:</label>
                            <input
                                type="date"
                                id="dateIn"
                                required
                                value={currentData?.dateIn || new Date().toISOString().substring(0, 10)}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border"
                            />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado:</label>
                            <select
                                id="status"
                                required
                                value={currentData?.status || 'Pendiente'}
                                onChange={handleChange}
                                className={`mt-1 block w-full rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border appearance-none cursor-pointer text-sm font-medium ${getStatusClasses(currentData?.status || 'Pendiente')}`}
                            >
                                {ALL_STATUSES.map(status => (
                                    <option key={status} value={status} className="bg-white text-gray-900">
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end space-x-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 transition"
                        >
                            {isEditing ? 'Guardar Cambios' : 'Guardar Orden'}
                        </button>
                    </div>
                </form>
            </Modal>
        );
    };

    // Componente base para Modales
    const Modal: FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
        // Overlay (Fondo claro transparente)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all scale-100 ease-out duration-300">
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );


    return (
        <div className="p-4 sm:p-8 bg-gray-100 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Título y Descripción */}
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 flex items-center text-gray-900">
                    <Wrench className="mr-3 w-7 h-7 text-sky-600" /> Gestión de Órdenes de Taller
                </h1>
                <p className="text-gray-600 mb-6">
                    Manejo en tiempo real de las órdenes de servicio, desde la creación hasta la entrega.
                </p>

                {/* Botones de Acción */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button 
                        className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded-xl transition duration-150 shadow-md hover:shadow-lg"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <Plus className="w-5 h-5 mr-2" /> Crear Nueva Orden
                    </button>
                </div>

                {/* Sección de la Tabla de Órdenes Activas */}
                <section className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                        Órdenes de Servicio Activas ({orders.length})
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fecha Ingreso</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Servicio Solicitado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Costo Est.</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-blue-50/50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.client}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.dateIn}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">{order.service}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-green-600">{order.estimatedCost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                            {/* Select de Estado: Ahora funcional para cambios directos */}
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                                className={`py-1 pl-2 pr-8 text-xs font-semibold rounded-lg shadow-sm appearance-none cursor-pointer transition ${getStatusClasses(order.status)} focus:ring-sky-500 focus:border-sky-500`}
                                                style={{ minWidth: '120px', lineHeight: '1.25' }}
                                            >
                                                {ALL_STATUSES.map(status => (
                                                    <option key={status} value={status} className="bg-white text-gray-900">
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            {/* Botón de Editar: Abre el modal de edición */}
                                            <button
                                                title="Editar / Ver Detalles de Orden"
                                                onClick={() => handleEditOrderClick(order)}
                                                className="text-gray-500 hover:text-sky-600 p-2 rounded-full transition duration-150 mr-2 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            {/* Botón de Eliminar: Abre el modal de confirmación */}
                                            <button
                                                title="Eliminar Orden"
                                                onClick={() => confirmDeletion(order.id)}
                                                className="text-gray-500 hover:text-red-600 p-2 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {orders.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No hay órdenes de servicio activas. ¡Crea una nueva!
                        </div>
                    )}
                </section>

                {/* Renderizado de Modales Condicionales */}
                {/* Modal para CREAR */}
                {isCreateModalOpen && (
                    <OrderModal 
                        isEditing={false} 
                        initialData={newOrder} 
                        onClose={() => setIsCreateModalOpen(false)}
                        onSubmit={handleNewOrderSubmit}
                    />
                )}
                {/* Modal para EDITAR/VER */}
                {isEditModalOpen && editingOrder && (
                    <OrderModal 
                        isEditing={true} 
                        initialData={editingOrder} 
                        onClose={() => setIsEditModalOpen(false)}
                        onSubmit={handleEditOrderSubmit}
                    />
                )}
                {/* Modal de CONFIRMACIÓN */}
                {deleteCandidateId !== null && <DeleteConfirmationModal />}

            </div>
        </div>
    );
};

export default WorkshopServicesView;

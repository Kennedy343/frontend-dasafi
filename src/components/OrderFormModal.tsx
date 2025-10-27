// src/components/OrderFormModal.tsx

import React from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

interface OrderFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    initialData?: any; // Datos iniciales del pedido/cotización
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({ isOpen, onClose, isEditing, initialData }) => {
    
    if (!isOpen) return null;

    const title = isEditing ? `Editar Pedido #${initialData?.id || ''}` : 'Crear Nueva Cotización';
    const buttonText = isEditing ? 'Guardar Cambios' : 'Generar Cotización';

    // Usaremos un fondo gris-oscuro semi-transparente (como lo ajustaste)
    const OVERLAY_CLASSES = "fixed inset-0 bg-opacity-75 flex items-center justify-center z-50 p-4";
    const MODAL_CONTENT_CLASSES = "bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 scale-100";
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`${title}: Datos procesados y cotización generada. (Simulado)`);
        onClose(); 
    };

    return (
        <div className={OVERLAY_CLASSES}>
            
            <div className={MODAL_CONTENT_CLASSES}>
                
                {/* Encabezado del Modal */}
                <div className="flex justify-between items-center p-5 bg-gray-100 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition">
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Cuerpo del Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 text-gray-900">
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente</label>
                            <input
                                type="text"
                                id="client"
                                defaultValue={initialData?.client || ''}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="value" className="block text-sm font-medium text-gray-700">Valor Total Estimado ($)</label>
                            <input
                                type="number"
                                id="value"
                                defaultValue={initialData?.value || 0}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción Detallada del Pedido</label>
                        <textarea
                            id="description"
                            rows={4}
                            defaultValue={initialData?.description || ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    
                    {/* Pie de Formulario (Botones) */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                        >
                            <FaSave className="mr-2" /> {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderFormModal;
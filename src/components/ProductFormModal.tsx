// src/components/ProductFormModal.tsx

import React from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    initialData?: any; // Datos del producto si estamos editando
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, isEditing, initialData }) => {
    
    if (!isOpen) return null; // No renderizar si no está abierto

    const title = isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto';
    const buttonText = isEditing ? 'Guardar Cambios' : 'Crear Producto';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario (POST/PUT a la API)
        alert(`${title}: Datos enviados correctamente. (Simulado)`);
        onClose(); // Cerrar el modal después de la acción
    };

    return (
        // Fondo Oscuro del Modal (Overlay)
<div className="fixed inset-0 bg-opacity-75 flex items-center justify-center z-50 p-4">
            
            {/* Contenido del Modal */}
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100">
                
                {/* Encabezado */}
                <div className="flex justify-between items-center p-5 bg-gray-100 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition">
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Cuerpo del Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    
                    <div>
                        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU / Código</label>
                        <input
                            type="text"
                            id="sku"
                            defaultValue={initialData?.sku || ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
                        <input
                            type="text"
                            id="name"
                            defaultValue={initialData?.name || ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio ($)</label>
                            <input
                                type="number"
                                id="price"
                                defaultValue={initialData?.price || ''}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Actual</label>
                            <input
                                type="number"
                                id="stock"
                                defaultValue={initialData?.stock || ''}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                                required
                            />
                        </div>
                    </div>

                    {/* Pie de Formulario (Botones) */}
                    <div className="flex justify-end pt-4 border-t border-gray-100">
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

export default ProductFormModal;
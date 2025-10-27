// src/components/UserFormModal.tsx
import React from 'react';
import { FaTimes, FaSave, FaUserPlus } from 'react-icons/fa';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'Cliente' | 'Administrador' | 'Editor' | 'Tecnico de Taller';
    status: 'Activo' | 'Inactivo' | 'Pendiente';
}

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    initialData?: User; // Datos iniciales del usuario
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, isEditing, initialData }) => {
    
    if (!isOpen) return null;

    const title = isEditing ? `Editar Usuario: ${initialData?.name || ''}` : 'Añadir Nuevo Usuario';
    const buttonText = isEditing ? 'Guardar Cambios' : 'Crear Usuario';

    // Clases de Tailwind para el fondo transparente (overlay)
    const OVERLAY_CLASSES = "fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4";
    const MODAL_CONTENT_CLASSES = "bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 scale-100";
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`${title}: Datos procesados y guardados. (Simulado)`);
        onClose(); 
    };

    return (
        <div className={OVERLAY_CLASSES}>
            
            <div className={MODAL_CONTENT_CLASSES}>
                
                {/* Encabezado del Modal */}
                <div className="flex justify-between items-center p-5 bg-gray-100 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <FaUserPlus className="mr-2 text-sky-600" /> {title}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition">
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Cuerpo del Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 text-gray-900">
                    
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            defaultValue={initialData?.name || ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            defaultValue={initialData?.email || ''}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                            <select
                                id="role"
                                defaultValue={initialData?.role || 'Cliente'}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                                required
                            >
                                <option value="Administrador">Administrador</option>
                                <option value="Editor">Editor</option>
                                <option value="Tecnico de Taller">Técnico de Taller</option>
                                <option value="Cliente">Cliente</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                            <select
                                id="status"
                                defaultValue={initialData?.status || 'Activo'}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                                required
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                                <option value="Pendiente">Pendiente</option>
                            </select>
                        </div>
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
                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 transition"
                        >
                            <FaSave className="mr-2" /> {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;
// src/components/RoleFormModal.tsx
import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaUserTag, FaLockOpen } from 'react-icons/fa';

// --- INTERFACES ---
export interface Role {
    id: number;
    name: string;
    description: string;
    isDefault: boolean;
    permissions: string[]; // Módulos a los que tiene acceso
}

interface RoleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    initialData?: Role; 
}

// Módulos disponibles en el sistema (basados en tu Sidebar)
const availableModules = [
    'Inventario', 
    'Ingresar Productos',
    'Pedidos Personalizados', 
    'Citas Agendadas', 
    'Servicios de Taller', 
    'Reporte de Ventas', 
    'Gestión de Usuarios', 
    'Gestión de Roles', 
    'Gestión de Reseñas'
];

// --- COMPONENTE DEL MODAL ---
const RoleFormModal: React.FC<RoleFormModalProps> = ({ isOpen, onClose, isEditing, initialData }) => {
    
    if (!isOpen) return null;

    const [roleName, setRoleName] = useState(initialData?.name || '');
    const [roleDescription, setRoleDescription] = useState(initialData?.description || '');
    const [isDefault, setIsDefault] = useState(initialData?.isDefault || false);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(initialData?.permissions || []);

    // Sincronizar estados si los datos iniciales cambian
    useEffect(() => {
        setRoleName(initialData?.name || '');
        setRoleDescription(initialData?.description || '');
        setIsDefault(initialData?.isDefault || false);
        setSelectedPermissions(initialData?.permissions || []);
    }, [initialData]);

    const handlePermissionChange = (module: string) => {
        setSelectedPermissions(prev => 
            prev.includes(module)
                ? prev.filter(p => p !== module) // Deseleccionar
                : [...prev, module] // Seleccionar
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!roleName || selectedPermissions.length === 0) {
            alert('El rol debe tener un nombre y al menos un permiso asignado.');
            return;
        }

        const newRole: Role = {
            id: initialData?.id || Date.now(), // ID temporal
            name: roleName,
            description: roleDescription,
            isDefault: isDefault,
            permissions: selectedPermissions,
        };

        console.log("Rol guardado/actualizado:", newRole);
        alert(`Rol "${roleName}" ${isEditing ? 'actualizado' : 'creado'} con ${selectedPermissions.length} permisos.`);
        onClose(); 
    };

    const title = isEditing ? `Editar Rol: ${initialData?.name || ''}` : 'Crear Nuevo Rol';
    const buttonText = isEditing ? 'Guardar Cambios' : 'Crear Rol';

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl overflow-hidden transform transition-all duration-300 scale-100">
                
                {/* Encabezado del Modal */}
                <div className="flex justify-between items-center p-5 bg-gray-100 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <FaUserTag className="mr-2 text-sky-600" /> {title}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition">
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Cuerpo del Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6 text-gray-900">
                    
                    {/* Sección de Datos Generales */}
                    <div className="space-y-4">
                        <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">Nombre del Rol</label>
                        <input
                            type="text"
                            id="roleName"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            placeholder="Ej: Gerente de Ventas"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                            required
                        />
                        
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción Breve</label>
                        <textarea
                            id="description"
                            value={roleDescription}
                            onChange={(e) => setRoleDescription(e.target.value)}
                            placeholder="Define las responsabilidades clave de este rol."
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 resize-none"
                        ></textarea>

                        {/* Checkbox para Rol Predeterminado */}
                        <div className="flex items-center pt-2">
                            <input
                                id="isDefault"
                                type="checkbox"
                                checked={isDefault}
                                onChange={(e) => setIsDefault(e.target.checked)}
                                className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                            />
                            <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
                                Rol Predeterminado (Asignar automáticamente a nuevos usuarios)
                            </label>
                        </div>
                    </div>

                    {/* Sección de Permisos */}
                    <fieldset className="p-4 border border-gray-300 rounded-md">
                        <legend className="text-lg font-bold text-sky-600 flex items-center px-2">
                            <FaLockOpen className="mr-2"/> Permisos del Sistema
                        </legend>
                        <p className="text-sm text-gray-600 mb-3">Selecciona los módulos a los que este rol tendrá acceso.</p>
                        
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {availableModules.map(module => (
                                <div key={module} className="flex items-center">
                                    <input
                                        id={`module-${module}`}
                                        type="checkbox"
                                        checked={selectedPermissions.includes(module)}
                                        onChange={() => handlePermissionChange(module)}
                                        className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                                    />
                                    <label htmlFor={`module-${module}`} className="ml-2 text-sm text-gray-700 font-medium">
                                        {module}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                    
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

export default RoleFormModal;
import React, { useState } from 'react';
// Importamos los íconos necesarios de lucide-react
import { Pencil, Trash2, Lock, Unlock, Plus, Eye, X } from 'lucide-react';

// Define el tipo de dato para un rol
interface Role {
    id: number;
    name: string;
    description: string;
    modules: number; // Número de permisos/módulos
    isDefault: boolean; // Si es predeterminado
}

// Datos de ejemplo
const dummyRoles: Role[] = [
    { id: 1, name: 'Administrador', description: 'Acceso total y control sobre todos los módulos y configuraciones.', modules: 5, isDefault: false },
    { id: 2, name: 'Editor', description: 'Gestión de inventario, productos, citas y reportes de ventas.', modules: 3, isDefault: true },
    { id: 3, name: 'Cliente', description: 'Rol asignado automáticamente a los nuevos usuarios registrados.', modules: 2, isDefault: false },
    { id: 4, name: 'Técnico de Taller', description: 'Gestión exclusiva de servicios de taller y órdenes de reparación.', modules: 4, isDefault: false },
];

// --- Subcomponente 1: Modal de Formulario de Rol (Crear/Editar) ---
interface RoleFormModalProps {
    role: Role | null; // null si es creación, Role si es edición
    isOpen: boolean;
    onClose: () => void;
    onSave: (role: Role) => void;
}

const RoleFormModal: React.FC<RoleFormModalProps> = ({ role, isOpen, onClose, onSave }) => {
    // Estado del formulario
    const [formData, setFormData] = useState<Omit<Role, 'id'>>({
        name: role?.name || '',
        description: role?.description || '',
        modules: role?.modules || 0,
        isDefault: role?.isDefault || false,
    });

    // Sincronizar el estado del formulario cuando cambia la propiedad 'role' (e.g., al abrir)
    React.useEffect(() => {
        setFormData({
            name: role?.name || '',
            description: role?.description || '',
            modules: role?.modules || 0,
            isDefault: role?.isDefault || false,
        });
    }, [role]);

    if (!isOpen) return null;

    const isEdit = role !== null;
    const title = isEdit ? 'Editar Rol' : 'Crear Nuevo Rol';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (name === 'modules' ? parseInt(value) || 0 : value)
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newRole: Role = isEdit
            ? { ...role!, ...formData }
            : { ...formData, id: Date.now() }; // Generar un ID simple para el nuevo rol
        
        onSave(newRole);
        onClose();
    };

    return (
        // Overlay
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body - Formulario */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Rol</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            name="description"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="modules" className="block text-sm font-medium text-gray-700">Módulos/Permisos Asignados</label>
                        <input
                            type="number"
                            name="modules"
                            id="modules"
                            value={formData.modules}
                            onChange={handleChange}
                            min="0"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isDefault"
                            id="isDefault-form"
                            checked={formData.isDefault}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="isDefault-form" className="ml-2 text-sm text-gray-700">Establecer como Rol Predeterminado</label>
                    </div>

                    {/* Footer - Botones de acción */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                        >
                            {isEdit ? 'Guardar Cambios' : 'Crear Rol'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Subcomponente 2: Modal de Confirmación para Eliminar ---
interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    roleName: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, roleName }) => {
    if (!isOpen) return null;

    return (
        // Overlay
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-100" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <div className="p-5 border-b bg-red-50 rounded-t-xl">
                    <h2 className="text-xl font-bold text-red-700">Confirmar Eliminación</h2>
                </div>

                {/* Body */}
                <div className="p-5">
                    <p className="text-gray-700">
                        ¿Está seguro de que desea eliminar el rol **"{roleName}"**? Esta acción no se puede deshacer.
                    </p>
                </div>

                {/* Footer - Botones de acción */}
                <div className="p-5 border-t flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Componente Principal: RoleManagementTable ---
const RoleManagementTable: React.FC = () => {
    const [roles, setRoles] = useState(dummyRoles);
    
    // Estado para Modales
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [currentRole, setCurrentRole] = useState<Role | null>(null); // Rol a editar/eliminar

    // FUNCIÓN NUEVA: Alterna el estado 'isDefault' de un rol
    const handleToggleDefault = (roleId: number) => {
        setRoles(prevRoles => prevRoles.map(role => {
            if (role.id === roleId) {
                // Si este rol se está marcando como predeterminado (o desmarcando si ya lo estaba)
                const newIsDefault = !role.isDefault;
                
                if (newIsDefault) {
                    // Si se está marcando como default, desmarcar todos los demás
                    console.log(`[ACCIÓN REAL] Rol: ${role.name} marcado como PREDETERMINADO.`);
                    return { ...role, isDefault: true };
                } else {
                    // Si se está desmarcando, simplemente actualiza
                    console.log(`[ACCIÓN REAL] Rol: ${role.name} desmarcado como PREDETERMINADO.`);
                    return { ...role, isDefault: false };
                }
            } else if (role.isDefault) {
                // Asegurar que solo uno sea predeterminado: si marcamos uno nuevo, desmarcamos el viejo
                const targetRole = prevRoles.find(r => r.id === roleId);
                if (targetRole && !targetRole.isDefault) {
                    // Solo desmarca si otro rol está siendo marcado como default
                    return { ...role, isDefault: false };
                }
            }
            return role;
        }));
    };

    // Función para manejar la acción de Crear o Editar
    const handleEditOrCreate = (roleToEdit: Role | null) => {
        setCurrentRole(roleToEdit);
        setIsFormModalOpen(true);
    };

    // Función para manejar la acción de Eliminar (abre el modal de confirmación)
    const handleDeleteClick = (roleToDelete: Role) => {
        setCurrentRole(roleToDelete);
        setIsConfirmationModalOpen(true);
    };

    // Función que se ejecuta tras confirmar la eliminación
    const handleConfirmDelete = () => {
        if (currentRole) {
            setRoles(prevRoles => prevRoles.filter(r => r.id !== currentRole.id));
            console.log(`[ACCIÓN REAL] Rol eliminado: ${currentRole.name}`);
        }
        setIsConfirmationModalOpen(false);
        setCurrentRole(null);
    };

    // Función que se ejecuta tras guardar en el formulario (Crear o Editar)
    const handleSaveRole = (role: Role) => {
        if (currentRole) {
            // Editar
            let updatedRoles = roles.map(r => r.id === role.id ? role : r);
            
            // Lógica para manejar el rol predeterminado al guardar
            if (role.isDefault) {
                updatedRoles = updatedRoles.map(r => r.id === role.id ? r : { ...r, isDefault: false });
            }
            
            setRoles(updatedRoles);
            console.log(`[ACCIÓN REAL] Rol editado: ${role.name}`);
        } else {
            // Crear
            let newRoles = [...roles, role];

             // Lógica para manejar el rol predeterminado al crear
            if (role.isDefault) {
                newRoles = newRoles.map(r => r.id === role.id ? r : { ...r, isDefault: false });
            }
            
            setRoles(newRoles);
            console.log(`[ACCIÓN REAL] Rol creado: ${role.name}`);
        }
        setIsFormModalOpen(false);
        setCurrentRole(null);
    };

    // Función para otras acciones globales (solo simulación)
    const handleGlobalAction = (action: string) => {
        console.log(`[SIMULACIÓN] Acción global: ${action}`);
    };

    return (
        // Contenedor principal
        <div className="p-4 sm:p-8 bg-gray-100 min-h-screen font-sans text-gray-900">
            <div className="max-w-7xl mx-auto">

                {/* Título de la vista */}
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 flex items-center text-gray-900">
                    <Lock className="mr-3 w-6 h-6 text-indigo-600" /> Gestión de Roles y Permisos
                </h1>
                
                {/* Contenedor de la tabla: Sigue el estilo de tarjeta blanca */}
                <div className="bg-white p-6 rounded-xl shadow-2xl overflow-x-auto border border-gray-200">
                    
                    {/* Descripción */}
                    <p className="text-gray-600 mb-6">
                        Definición de roles y configuración de permisos para cada nivel de usuario dentro del sistema.
                    </p>

                    {/* Botones de Acción Global */}
                    <div className="flex flex-wrap space-x-4 mb-8">
                        <button 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 flex items-center shadow-md hover:shadow-lg"
                            onClick={() => handleEditOrCreate(null)} // Abre el modal para crear (role: null)
                        >
                            <Plus className="w-4 h-4 mr-2" /> Crear Nuevo Rol
                        </button>
                        <button 
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-150 flex items-center shadow-md hover:shadow-lg"
                            onClick={() => handleGlobalAction('Auditoría de Permisos')}
                        >
                            <Eye className="w-4 h-4 mr-2" /> Auditoría de Permisos
                        </button>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Roles del Sistema</h3>

                    {/* Tabla */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            
                            {/* Cabecera de la tabla */}
                            <thead className="bg-gray-50"> 
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Nombre del Rol</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Descripción</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Permisos (Módulos)</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Predeterminado</th>
                                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            
                            {/* Cuerpo de la tabla */}
                            <tbody className="bg-white divide-y divide-gray-100">
                                {roles.map((role) => (
                                    <tr key={role.id} className="hover:bg-indigo-50/50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{role.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{role.description}</td>
                                        
                                        {/* Permisos (Módulos) */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold leading-5 rounded-full bg-indigo-100 text-indigo-700">
                                                {role.modules}
                                            </span>
                                        </td>
                                        
                                        {/* Predeterminado (INTERACTIVO) */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button 
                                                onClick={() => handleToggleDefault(role.id)} 
                                                title={role.isDefault ? "Desmarcar Predeterminado" : "Marcar como Predeterminado"}
                                                className="transition duration-150 hover:scale-110 active:scale-95 p-1 rounded-full"
                                            >
                                                {role.isDefault ? (
                                                    // Candado Cerrado (Predeterminado)
                                                    <Lock className="text-red-500 mx-auto w-5 h-5" />
                                                ) : (
                                                    // Candado Abierto (No Predeterminado)
                                                    <Unlock className="text-green-500 mx-auto w-5 h-5" />
                                                )}
                                            </button>
                                        </td>

                                        {/* ACCIONES */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center space-x-3">
                                            {/* Botón Editar */}
                                            <button 
                                                title="Editar Rol"
                                                className="p-2 rounded-full text-blue-600 hover:text-white bg-blue-100 hover:bg-blue-600 transition duration-150 shadow-sm"
                                                onClick={() => handleEditOrCreate(role)} // Abre el modal para editar (role: role)
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            {/* Botón Eliminar */}
                                            <button 
                                                title="Eliminar Rol"
                                                className="p-2 rounded-full text-red-600 hover:text-white bg-red-100 hover:bg-red-600 transition duration-150 shadow-sm"
                                                onClick={() => handleDeleteClick(role)} // Abre el modal de confirmación
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {roles.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No se encontraron roles.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Renderizar Modales */}
            <RoleFormModal
                role={currentRole}
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSave={handleSaveRole}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmDelete}
                roleName={currentRole?.name || ''}
            />
        </div>
    );
};

export default RoleManagementTable;

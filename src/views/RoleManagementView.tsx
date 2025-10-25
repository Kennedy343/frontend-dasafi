// src/views/RoleManagementView.tsx (Con Tailwind CSS)
import React, { useState } from 'react';
import { 
    FaEdit, FaTrashAlt, FaLock, FaCheckCircle, 
    FaPlus, FaUserShield 
} from 'react-icons/fa';

// --- INTERFACES Y DATOS ---

interface Role {
    id: number;
    name: string;
    description: string;
    permissionsCount: number;
    isDefault: boolean; // Si es un rol asignado automáticamente (como 'Cliente')
}

const mockRoles: Role[] = [
    { id: 1, name: 'Administrador', description: 'Acceso total y control sobre todos los módulos y configuraciones.', permissionsCount: 15, isDefault: false },
    { id: 2, name: 'Editor', description: 'Gestión de inventario, productos, citas y reportes de ventas.', permissionsCount: 8, isDefault: false },
    { id: 3, name: 'Cliente', description: 'Rol asignado automáticamente a los nuevos usuarios registrados.', permissionsCount: 2, isDefault: true },
    { id: 4, name: 'Técnico de Taller', description: 'Gestión exclusiva de servicios de taller y órdenes de reparación.', permissionsCount: 4, isDefault: false },
];

// --- COMPONENTE PRINCIPAL (RoleManagementView) ---

const RoleManagementView: React.FC = () => {
    const [roles, setRoles] = useState(mockRoles);
    
    // --- Manejadores de Eventos ---

    const handleCreateRole = () => {
        alert('Abriendo Modal para Crear Nuevo Rol...');
    };

    const handleAuditPermissions = () => {
        alert('Abriendo Vista/Modal de Auditoría de Permisos...');
    };
    
    const handleEditPermissions = (role: Role) => {
        alert(`Editando permisos para el rol: ${role.name}`);
    };

    const handleDeleteRole = (role: Role) => {
        if (role.isDefault) {
            alert('¡ERROR! No se puede eliminar un rol predeterminado.');
            return;
        }
        const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar el rol: ${role.name}?`);
        if (isConfirmed) {
            setRoles(prevRoles => prevRoles.filter(r => r.id !== role.id));
            alert(`Rol ${role.name} eliminado.`);
        }
    };

    return (
        // Contenedor principal con clases de Tailwind
        <div className="p-8 bg-dark-bg min-h-screen text-gray-100"> 
            <h1 className="text-3xl font-bold mb-2 flex items-center text-white">
                <FaUserShield className="mr-3 text-sky-400" /> Gestión de Roles
            </h1>
            <p className="text-gray-400 mb-6">
                Definición de roles y configuración de permisos para cada nivel de usuario dentro del sistema.
            </p>
            
            {/* Botones de acción con clases Tailwind */}
            <div className="flex gap-4 mb-8">
                {/* Botón Crear Nuevo Rol (Azul) */}
                <button 
                    className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                    onClick={handleCreateRole}
                >
                    <FaPlus className="mr-2" /> Crear Nuevo Rol
                </button>
                {/* Botón Auditoría de Permisos (Gris) */}
                <button 
                    className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                    onClick={handleAuditPermissions}
                >
                    Auditoría de Permisos
                </button>
            </div>

            {/* Sección de la tabla */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-white">Roles del Sistema</h2>
                
                {/* Tabla responsiva con clases Tailwind */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre del Rol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Descripción</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Permisos</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Predeterminado</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {roles.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-700 transition duration-150">
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{role.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{role.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300 max-w-lg truncate">{role.description}</td>
                                    
                                    {/* Conteo de Permisos */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-sky-400">
                                        {role.permissionsCount}
                                    </td>
                                    
                                    {/* Icono Predeterminado (Check o Lock) */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        {role.isDefault ? (
                                            <FaCheckCircle className="w-5 h-5 text-green-500 mx-auto" title="Asignado automáticamente" />
                                        ) : (
                                            <FaLock className="w-4 h-4 text-red-500 mx-auto" title="No asignado automáticamente" />
                                        )}
                                    </td>
                                    
                                    {/* Acciones */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {/* Botón Editar Permisos (Azul claro) */}
                                        <button
                                            title="Editar Permisos"
                                            onClick={() => handleEditPermissions(role)}
                                            className="text-sky-400 hover:text-sky-500 p-2 rounded-full transition duration-150"
                                        >
                                            <FaEdit className="w-5 h-5" />
                                        </button>
                                        
                                        {/* Botón Eliminar (Rojo - deshabilitado si es predeterminado) */}
                                        <button
                                            title={role.isDefault ? "No se puede eliminar" : "Eliminar Rol"}
                                            onClick={() => handleDeleteRole(role)}
                                            disabled={role.isDefault}
                                            className={`p-2 rounded-full transition duration-150 ml-2
                                                ${role.isDefault 
                                                    ? 'text-gray-500 cursor-not-allowed' 
                                                    : 'text-red-500 hover:text-red-700'
                                                }`}
                                        >
                                            <FaTrashAlt className="w-5 h-5" />
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

export default RoleManagementView;
// src/components/RoleManagementTable.tsx (CÓDIGO FINAL CON ESTILO DE IMAGEN Y TEMA CLARO)
// Gestion de roles 

import React from 'react';
// Importamos los íconos necesarios
import { FaEdit, FaTrash, FaLock, FaLockOpen, FaPlus } from 'react-icons/fa'; // FaPlus para el botón "Crear Nuevo Rol"

// Define el tipo de dato para un rol (Actualizado con campos de la imagen)
interface Role {
    id: number;
    name: string;
    description: string;
    modules: number; // Número de permisos/módulos
    isDefault: boolean; // Si es predeterminado
}

// Datos de ejemplo actualizados para que coincidan con la imagen y funcionalidad
const dummyRoles: Role[] = [
    { id: 1, name: 'Administrador', description: 'Acceso total y control sobre todos los módulos y configuraciones.', modules: 5, isDefault: false },
    { id: 2, name: 'Editor', description: 'Gestión de inventario, productos, citas y reportes de ventas.', modules: 3, isDefault: true },
    { id: 3, name: 'Cliente', description: 'Rol asignado automáticamente a los nuevos usuarios registrados.', modules: 2, isDefault: false },
    { id: 4, name: 'Técnico de Taller', description: 'Gestión exclusiva de servicios de taller y órdenes de reparación.', modules: 4, isDefault: false },
];

const RoleManagementTable: React.FC = () => {
    // Función de ejemplo para manejar el click en editar/eliminar/crear/auditar
    const handleAction = (action: string, roleName?: string) => {
        alert(`${action} ${roleName ? 'el rol: ' + roleName : ''}`);
        // Aquí iría la lógica real para mostrar modales o navegar
    };

    return (
        // Contenedor principal: El fondo de la tarjeta de roles es blanco
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto border border-gray-200">
            
            {/* 🛑 AÑADIDO: Título y descripción (como en la imagen, pero en gris oscuro) */}
            <p className="text-gray-600 mb-6">Definición de roles y configuración de permisos para cada nivel de usuario dentro del sistema.</p>

            {/* 🛑 AÑADIDO: Botones de Acción Global (Crear Nuevo Rol, Auditoría de Permisos) */}
            <div className="flex space-x-4 mb-8">
                <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 flex items-center"
                    onClick={() => handleAction('Crear', 'Nuevo Rol')}
                >
                    <FaPlus className="mr-2" /> Crear Nuevo Rol
                </button>
                <button 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-150 flex items-center"
                    onClick={() => handleAction('Ver', 'Auditoría de Permisos')}
                >
                    Auditoría de Permisos
                </button>
            </div>
            
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Roles del Sistema</h3>

            <table className="min-w-full divide-y divide-gray-300">
                
                {/* Cabecera de la tabla */}
                <thead className="bg-gray-50"> 
                    <tr>
                        {/* 🛑 AÑADIDO: Columna ID */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Nombre del Rol
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Descripción
                        </th>
                        {/* 🛑 AÑADIDO: Columna Permisos (Módulos) */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Permisos (Módulos)
                        </th>
                        {/* 🛑 AÑADIDO: Columna Predeterminado */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Predeterminado
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                
                {/* Cuerpo de la tabla */}
                <tbody className="divide-y divide-gray-200">
                    {dummyRoles.map((role) => (
                        <tr key={role.id} className="hover:bg-gray-50">
                            {/* ID del Rol */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.id}</td>
                            
                            {/* Nombre del Rol */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {role.name}
                            </td>
                            
                            {/* Descripción */}
                            <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{role.description}</td>
                            
                            {/* Permisos (Módulos) */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{role.modules}</td>
                            
                            {/* 🛑 PREDETERMINADO: Icono de candado */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                {role.isDefault ? (
                                    <FaLock className="text-red-500 mx-auto" size={16} title="Rol Predeterminado" />
                                ) : (
                                    // Puedes usar FaLockOpen si quieres mostrar algo para no predeterminado
                                    <FaLockOpen className="text-green-500 mx-auto" size={16} title="No Predeterminado" />
                                )}
                            </td>

                            {/* 🛑 ACCIONES: Editar y Eliminar con iconos */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                                {/* Botón Editar (Icono Azul) */}
                                <button 
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                    onClick={() => handleAction('Editar', role.name)}
                                >
                                    <FaEdit size={18} />
                                </button>
                                {/* Botón Eliminar (Icono Rojo) */}
                                <button 
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                    onClick={() => handleAction('Eliminar', role.name)}
                                >
                                    <FaTrash size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoleManagementTable;
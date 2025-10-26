// src/components/RoleManagementTable.tsx (CÓDIGO CORREGIDO)

import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Define el tipo de dato para un rol
interface Role {
    id: number;
    name: string;
    description: string;
    users: number;
}

// Datos de ejemplo
const dummyRoles: Role[] = [
    { id: 1, name: 'Administrador', description: 'Acceso total a la configuración y datos.', users: 3 },
    { id: 2, name: 'Inventario', description: 'Puede agregar, editar y eliminar productos.', users: 7 },
    { id: 3, name: 'Ventas', description: 'Puede crear pedidos y agendar citas.', users: 12 },
];

const RoleManagementTable: React.FC = () => {
    return (
        // 🛑 CORRECCIÓN: Usamos un fondo BLANCO para la tabla ya que el fondo de la página es claro
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto border border-gray-200">
            {/* 🛑 CORRECCIÓN: Dividers y fondo de encabezado son más claros para fondo blanco */}
            <table className="min-w-full divide-y divide-gray-300">
                
                {/* Cabecera de la tabla */}
                <thead className="bg-gray-50"> 
                    <tr>
                        {/* 🛑 CORRECCIÓN: Texto de encabezado a gris oscuro */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Nombre del Rol
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Descripción
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Usuarios
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                
                {/* Cuerpo de la tabla */}
                {/* 🛑 CORRECCIÓN: Dividers más claros, hover más claro */}
                <tbody className="divide-y divide-gray-200">
                    {dummyRoles.map((role) => (
                        <tr key={role.id} className="hover:bg-gray-50">
                            {/* 🛑 CORRECCIÓN: Texto del cuerpo a gris oscuro */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{role.description}</td>
                            {/* 🛑 CORRECCIÓN: El conteo de usuarios a gris oscuro */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{role.users}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                                {/* 🛑 CORRECCIÓN 1: Botón Editar visible y con texto */}
                                <button className="text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                                    <FaEdit size={16} className="mr-1" />
                                    Editar Rol 
                                </button>
                                {/* 🛑 CORRECCIÓN 2: Ícono Eliminar visible y con texto */}
                                <button className="text-red-600 hover:text-red-800 transition-colors flex items-center">
                                    <FaTrash size={16} className="mr-1" />
                                    Eliminar
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
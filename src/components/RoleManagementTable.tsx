// src/components/RoleManagementTable.tsx

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
    <div className="bg-dark-card p-6 rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        
        {/* Cabecera de la tabla */}
        <thead className="bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Nombre del Rol
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Usuarios
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        
        {/* Cuerpo de la tabla */}
        <tbody className="divide-y divide-gray-800">
          {dummyRoles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{role.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{role.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{role.users}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-primary-blue hover:text-blue-400 mr-3 transition-colors">
                  <FaEdit size={16} />
                </button>
                <button className="text-red-500 hover:text-red-400 transition-colors">
                  <FaTrash size={16} />
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
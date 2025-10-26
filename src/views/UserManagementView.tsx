// src/views/UserManagementView.tsx
import type { FC } from 'react';
import { 
    FaUsers, FaPlusCircle, FaFileExport, FaEdit, FaTrash, 
    FaLock, FaLockOpen
} from 'react-icons/fa';

// --- INTERFACES Y DATOS MOCK ---

interface User {
    id: number;
    name: string;
    email: string;
    role: 'Administrador' | 'Editor' | 'Cliente' | 'Técnico de Taller';
    status: 'Activo' | 'Inactivo' | 'Pendiente';
}

const mockUsers: User[] = [
    { id: 1, name: 'Elena Ramírez', email: 'elena.ramirez@example.com', role: 'Cliente', status: 'Activo' },
    { id: 2, name: 'Carlos Mendoza', email: 'carlos.mendoza@example.com', role: 'Administrador', status: 'Activo' },
    { id: 3, name: 'Sofía Vargas', email: 'sofia.vargas@example.com', role: 'Cliente', status: 'Inactivo' },
    { id: 4, name: 'Javier Torres', email: 'javier.torres@example.com', role: 'Editor', status: 'Activo' },
    { id: 5, name: 'Lucía Fernández', email: 'lucia.fernandez@example.com', role: 'Cliente', status: 'Pendiente' },
    { id: 6, name: 'Pedro García', email: 'pedro.garcia@example.com', role: 'Técnico de Taller', status: 'Activo' },
];

// --- Funciones de Ayuda ---

const getStatusClasses = (status: User['status']) => {
    switch (status) {
        case 'Activo': return 'bg-green-600 text-white';
        case 'Inactivo': return 'bg-red-600 text-white';
        case 'Pendiente': return 'bg-orange-500 text-gray-900';
        default: return 'bg-gray-500 text-white';
    }
};

const getRoleClasses = (role: User['role']) => {
    switch (role) {
        case 'Administrador': return 'bg-blue-800';
        case 'Editor': return 'bg-yellow-600';
        case 'Técnico de Taller': return 'bg-sky-600';
        case 'Cliente': return 'bg-gray-600';
        default: return 'bg-gray-500';
    }
};

// --- COMPONENTE PRINCIPAL (UserManagementView) ---

const UserManagementView: FC = () => {

    // Funciones de manejo de acciones
    const handleAddUser = () => alert("Abriendo formulario para Añadir Nuevo Usuario...");
    const handleExport = () => alert("Exportando lista de usuarios...");
    const handleEdit = (id: number) => alert(`Editando usuario ID: ${id}`);
    const handleDelete = (id: number) => {
        const userName = mockUsers.find(u => u.id === id)?.name || 'Usuario';
        if (window.confirm(`¿Estás seguro de que quieres eliminar a ${userName}?`)) {
            alert(`${userName} eliminado.`);
        }
    };
    const handleToggleStatus = (id: number, currentStatus: User['status']) => {
        const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
        alert(`Cambiando estado de usuario ID ${id} a ${newStatus}`);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
            
            {/* Título y Descripción */}
            <h1 className="text-3xl font-bold mb-2 flex items-center text-gray-800">
                <FaUsers className="mr-3 text-sky-600" /> Gestión de Usuarios
            </h1>
            <p className="text-gray-600 mb-6">
                Administración completa de cuentas, roles y estado de acceso de todos los usuarios del sistema.
            </p>

            {/* Botones de Acción Global */}
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={handleAddUser}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 shadow-md"
                >
                    <FaPlusCircle className="mr-2" /> Añadir Nuevo Usuario
                </button>
                <button 
                    onClick={handleExport}
                    className="flex items-center bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded transition duration-150 shadow-md"
                >
                    <FaFileExport className="mr-2" /> Exportar Lista
                </button>
            </div>

            {/* Sección de la Tabla de Usuarios */}
            <section className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Lista de Usuarios Registrados</h2>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full text-white ${getRoleClasses(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${getStatusClasses(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center space-x-2">
                                        
                                        {/* Botón Cambiar Estado */}
                                        <button
                                            title={user.status === 'Activo' ? "Desactivar Usuario" : "Activar Usuario"}
                                            onClick={() => handleToggleStatus(user.id, user.status)}
                                            className={`p-2 rounded-full transition duration-150 ${user.status === 'Activo' 
                                                ? 'text-red-500 hover:bg-red-100' 
                                                : 'text-green-500 hover:bg-green-100'}`
                                            }
                                        >
                                            {user.status === 'Activo' ? <FaLock className="w-5 h-5" /> : <FaLockOpen className="w-5 h-5" />}
                                        </button>

                                        {/* Botón Editar */}
                                        <button
                                            title="Editar Usuario"
                                            onClick={() => handleEdit(user.id)}
                                            className="text-sky-600 hover:text-sky-800 p-2 rounded-full hover:bg-sky-100 transition duration-150"
                                        >
                                            <FaEdit className="w-5 h-5" />
                                        </button>
                                        
                                        {/* Botón Eliminar */}
                                        <button
                                            title="Eliminar Usuario"
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150"
                                        >
                                            <FaTrash className="w-5 h-5" />
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

export default UserManagementView;
import React, { useState, useCallback } from 'react';
import type { FC } from 'react';
import { 
    Users, 
    CirclePlus, 
    FileText, 
    Edit, 
    Trash2, 
    Lock, 
    Unlock, 
    X,
    CheckCircle,
    AlertTriangle,
    Save
} from 'lucide-react';

// --- INTERFACES Y DATOS MOCK ---

type Role = 'Administrador' | 'Editor' | 'Cliente' | 'Técnico de Taller';
type Status = 'Activo' | 'Inactivo' | 'Pendiente';

interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    status: Status;
}

const mockUsers: User[] = [
    { id: 1, name: 'Elena Ramírez', email: 'elena.ramirez@example.com', role: 'Cliente', status: 'Activo' },
    { id: 2, name: 'Carlos Mendoza', email: 'carlos.mendoza@example.com', role: 'Administrador', status: 'Activo' },
    { id: 3, name: 'Sofía Vargas', email: 'sofia.vargas@example.com', role: 'Cliente', status: 'Inactivo' },
    { id: 4, name: 'Javier Torres', email: 'javier.torres@example.com', role: 'Editor', status: 'Activo' },
    { id: 5, name: 'Lucía Fernández', email: 'lucia.fernandez@example.com', role: 'Cliente', status: 'Pendiente' },
    { id: 6, name: 'Pedro García', email: 'pedro.garcia@example.com', role: 'Técnico de Taller', status: 'Activo' },
];

const availableRoles: Role[] = ['Administrador', 'Editor', 'Cliente', 'Técnico de Taller'];

// --- FUNCIONES DE AYUDA ---

const getStatusClasses = (status: Status) => {
    switch (status) {
        case 'Activo': return 'bg-green-600 text-white';
        case 'Inactivo': return 'bg-red-600 text-white';
        case 'Pendiente': return 'bg-orange-500 text-gray-900';
        default: return 'bg-gray-500 text-white';
    }
};

const getRoleClasses = (role: Role) => {
    switch (role) {
        case 'Administrador': return 'bg-blue-800';
        case 'Editor': return 'bg-yellow-600';
        case 'Técnico de Taller': return 'bg-sky-600';
        case 'Cliente': return 'bg-gray-600';
        default: return 'bg-gray-500';
    }
};

// --- SUBCOMPONENTES REUTILIZABLES ---

// 1. Componente Modal Genérico
const Modal: FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
        // Overlay (Fondo claro transparente)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4">
        <div className="bg-white text-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all scale-100 ease-out duration-300 border border-gray-200">
            <div className="flex justify-between items-center border-b p-4">
                <h3 className="text-xl font-bold text-sky-600">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                </button>
            </div>
            {children}
        </div>
    </div>
);

// 2. Componente Toast/Notificación
const Toast: FC<{ message: string; type: 'success' | 'error' | 'info'; onClose: () => void }> = ({ message, type, onClose }) => {
    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-xl shadow-lg flex items-center z-50 transition-transform duration-300";
    let icon, colorClasses;

    switch (type) {
        case 'success':
            icon = <CheckCircle className="w-5 h-5 mr-2" />;
            colorClasses = 'bg-green-600 text-white';
            break;
        case 'error':
            icon = <AlertTriangle className="w-5 h-5 mr-2" />;
            colorClasses = 'bg-red-600 text-white';
            break;
        case 'info':
        default:
            icon = <FileText className="w-5 h-5 mr-2" />;
            colorClasses = 'bg-sky-600 text-white';
            break;
    }

    return (
        <div className={`${baseClasses} ${colorClasses}`}>
            {icon}
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 opacity-75 hover:opacity-100">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL (UserManagementView) ---

const UserManagementView: FC = () => {
    const [users, setUsers] = useState(mockUsers);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; visible: boolean }>({
        message: '',
        type: 'info',
        visible: false,
    });
    
    // Estado para el formulario (usado tanto para crear como para editar)
    const initialFormData: Omit<User, 'id' | 'status'> = {
        name: '',
        email: '',
        role: 'Cliente',
    };
    const [formData, setFormData] = useState<Omit<User, 'id' | 'status'>>(initialFormData);
    const [formStatus, setFormStatus] = useState<Status>('Activo');


    // --- MANEJADORES DE ESTADO Y ACCIONES ---

    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
        setToast({ message, type, visible: true });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    }, []);

    // 1. Maneja la apertura del modal (Añadir o Editar)
    const handleOpenForm = (user: User | null) => {
        setEditingUser(user);
        if (user) {
            setFormData({ name: user.name, email: user.email, role: user.role });
            setFormStatus(user.status);
        } else {
            setFormData(initialFormData);
            setFormStatus('Activo');
        }
        setIsFormModalOpen(true);
    };

    // 2. Maneja el envío del formulario (Crear/Editar)
    const handleSaveUser = (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones básicas (se pueden mejorar)
        if (!formData.name || !formData.email || !formData.role) {
            showToast('Todos los campos son obligatorios.', 'error');
            return;
        }

        if (editingUser) {
            // EDICIÓN
            setUsers(prevUsers => prevUsers.map(u => 
                u.id === editingUser.id 
                    ? { ...u, ...formData, status: formStatus } 
                    : u
            ));
            showToast(`Usuario ${formData.name} actualizado.`, 'success');
        } else {
            // CREACIÓN
            const newId = Math.max(...users.map(u => u.id), 0) + 1;
            const newUser: User = { 
                id: newId, 
                ...formData, 
                status: 'Activo' 
            };
            setUsers(prevUsers => [newUser, ...prevUsers]);
            showToast(`Nuevo usuario ${formData.name} creado.`, 'success');
        }

        setIsFormModalOpen(false);
    };

    // 3. Maneja el cambio de estado (Activo/Inactivo)
    const handleToggleStatus = (id: number, currentStatus: Status) => {
        // No se permite cambiar el estado de un usuario 'Pendiente'
        if (currentStatus === 'Pendiente') {
            showToast('No se puede cambiar el estado de un usuario Pendiente.', 'error');
            return;
        }

        const newStatus: Status = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
        
        setUsers(prevUsers => prevUsers.map(u => 
            u.id === id ? { ...u, status: newStatus } : u
        ));

        const userName = users.find(u => u.id === id)?.name;
        showToast(`Estado de ${userName} cambiado a ${newStatus}.`, 'info');
    };
    
    // 4. Inicia la eliminación
    const handleDeleteUser = (id: number) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };

    // 5. Ejecuta la eliminación
    const handleConfirmDelete = () => {
        if (userToDelete !== null) {
            const userName = users.find(u => u.id === userToDelete)?.name || 'Usuario';
            setUsers(prevUsers => prevUsers.filter(u => u.id !== userToDelete));
            showToast(`${userName} eliminado permanentemente.`, 'success');
        }
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    // --- SUBCOMPONENTE DE FORMULARIO ---

    const UserFormModal: FC = () => {
        const title = editingUser ? `Editar Usuario: ${editingUser.name}` : 'Añadir Nuevo Usuario';
        const isEditing = !!editingUser;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value as any }));
        };

        const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormStatus(e.target.value as Status);
        };

        return (
            <Modal title={title} onClose={() => setIsFormModalOpen(false)}>
                <form onSubmit={handleSaveUser} className="p-6 space-y-5">
                    
                    {/* Campos de entrada */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2.5 text-gray-900"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2.5 text-gray-900"
                        />
                    </div>
                    
                    {/* Select Rol */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                            id="role"
                            name="role"
                            required
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2.5 text-gray-900 bg-white"
                        >
                            {availableRoles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    {/* Select Estado (Solo en Edición) */}
                    {isEditing && (
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado del Usuario</label>
                            <select
                                id="status"
                                name="status"
                                required
                                value={formStatus}
                                onChange={handleStatusChange}
                                className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2.5 text-gray-900 bg-white"
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                                <option value="Pendiente">Pendiente</option>
                            </select>
                        </div>
                    )}
                    
                    {/* Footer del Modal */}
                    <div className="pt-4 flex justify-end space-x-4 border-t">
                        <button 
                            type="button" 
                            onClick={() => setIsFormModalOpen(false)}
                            className="py-2 px-5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="flex items-center py-2 px-5 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 transition transform hover:scale-[1.02]"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
                        </button>
                    </div>
                </form>
            </Modal>
        );
    };
    
    // --- SUBCOMPONENTE DE CONFIRMACIÓN DE ELIMINACIÓN ---

    const DeleteConfirmationModal: FC = () => {
        const user = users.find(u => u.id === userToDelete);
        const userName = user?.name || 'este usuario';

        return (
            <Modal title="Confirmar Eliminación" onClose={() => setIsDeleteModalOpen(false)}>
                <div className="flex flex-col items-center p-6">
                    <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                    <p className="text-gray-700 mb-6 text-center text-lg font-medium">
                        ¿Está seguro de que desea eliminar a **{userName}**?
                    </p>
                    <p className="text-gray-500 mb-6 text-center text-sm">
                        Esta acción es permanente y el usuario perderá el acceso al sistema.
                    </p>
                    <div className="flex justify-end space-x-4 w-full pt-4 border-t">
                        <button 
                            type="button" 
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="py-2 px-5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="button"
                            onClick={handleConfirmDelete}
                            className="py-2 px-5 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition transform hover:scale-[1.02]"
                        >
                            Sí, Eliminar
                        </button>
                    </div>
                </div>
            </Modal>
        );
    };


    // --- RENDERIZADO PRINCIPAL ---
    return (
        <div className="p-4 sm:p-8 bg-white min-h-screen text-gray-900 font-sans"> 
            <div className="max-w-7xl mx-auto">
                
                {/* Título y Descripción */}
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 flex items-center text-gray-900">
                    <Users className="mr-3 w-7 h-7 text-sky-600" /> Gestión de Usuarios
                </h1>
                <p className="text-gray-600 mb-6">
                    Administración completa de cuentas, roles y estado de acceso de todos los usuarios del sistema.
                </p>
                
                {/* Botones de Acción Global */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {/* Botón Añadir Nuevo Usuario (Azul) */}
                    <button 
                        onClick={() => handleOpenForm(null)}
                        className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded-xl transition duration-150 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                    >
                        <CirclePlus className="w-5 h-5 mr-2" /> Añadir Nuevo Usuario
                    </button>
                </div>
                {/* Sección de la Tabla de Usuarios */}
                <section className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Lista de Usuarios Registrados ({users.length})</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rol</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-sky-50/50 transition duration-150">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{user.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full text-white shadow-sm ${getRoleClasses(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full shadow-sm ${getStatusClasses(user.status)}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center space-x-2">
                                            
                                            {/* Botón Cambiar Estado (Activar/Desactivar) */}
                                            <button
                                                title={user.status === 'Activo' ? "Desactivar Usuario" : user.status === 'Inactivo' ? "Activar Usuario" : "Estado Pendiente"}
                                                onClick={() => handleToggleStatus(user.id, user.status)}
                                                disabled={user.status === 'Pendiente'}
                                                className={`p-2 rounded-full transition duration-150 focus:outline-none focus:ring-2 
                                                    ${user.status === 'Activo' 
                                                        ? 'text-red-500 hover:bg-red-100 focus:ring-red-500/50' 
                                                        : user.status === 'Inactivo' 
                                                            ? 'text-green-500 hover:bg-green-100 focus:ring-green-500/50'
                                                            : 'text-gray-400 cursor-not-allowed'
                                                    }`}
                                            >
                                                {user.status === 'Activo' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                                            </button>

                                            {/* Botón Editar */}
                                            <button
                                                title="Editar Usuario"
                                                onClick={() => handleOpenForm(user)}
                                                className="text-sky-600 hover:text-sky-800 p-2 rounded-full hover:bg-sky-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            
                                            {/* Botón Eliminar */}
                                            <button
                                                title="Eliminar Usuario"
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                
                {/* Modales y Toast */}
                {isFormModalOpen && <UserFormModal />}
                {isDeleteModalOpen && <DeleteConfirmationModal />}
                {toast.visible && (
                    <Toast 
                        message={toast.message} 
                        type={toast.type} 
                        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
                    />
                )}

            </div>
        </div>
    );
};

export default UserManagementView;

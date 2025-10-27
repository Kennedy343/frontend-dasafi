//Gestion de Roles 
import React, { useState } from 'react';
import type { FC } from 'react';
import { 
    Shield, 
    Plus, 
    Edit,          // Icono de Editar (Lápiz)
    Trash2,        // Icono de Eliminar (Bote de basura)
    Lock, 
    CheckCircle, 
    X, 
    AlertTriangle,
    ListChecks
} from 'lucide-react';

// --- DEFINICIÓN DE PERMISOS ---

// Objeto que define todos los permisos posibles en el sistema
interface Permissions {
    gestion_inventario: boolean;
    ingresar_nuevos_productos: boolean;
    gestion_pedidos_personalizados: boolean;
    gestion_reportes_ventas: boolean;
    gestionar_usuarios: boolean;
    gestionar_resenas: boolean;
    gestion_roles: boolean;
    gestion_ordenes_taller: boolean;
    gestion_citas_agendadas: boolean;
}

// Mapa para mostrar los nombres de los permisos de forma amigable en la UI
const PERMISSION_LABELS: { [key in keyof Permissions]: string } = {
    gestion_inventario: "Gestión de Inventario",
    ingresar_nuevos_productos: "Ingresar Nuevos Productos",
    gestion_pedidos_personalizados: "Gestión de Pedidos Personalizados",
    gestion_reportes_ventas: "Gestión de Reportes de Ventas",
    gestionar_usuarios: "Gestionar Usuarios",
    gestionar_resenas: "Gestionar Reseñas",
    gestion_roles: "Gestión de Roles y Permisos",
    gestion_ordenes_taller: "Gestión de Órdenes de Taller",
    gestion_citas_agendadas: "Gestión de Citas Agendadas",
};

// Obtiene el estado inicial de permisos (todos en false)
const initialPermissions: Permissions = Object.keys(PERMISSION_LABELS).reduce((acc, key) => {
    acc[key as keyof Permissions] = false;
    return acc;
}, {} as Permissions);

// --- INTERFACES Y DATOS ---

interface Role {
    id: number;
    name: string;
    description: string;
    permissionsCount: number; // Mantenemos el conteo para la tabla
    isDefault: boolean; 
    permissions: Permissions; // Nuevo campo de permisos
}

// Interfaz para el formulario de Creación/Edición
interface RoleFormData extends Omit<Role, 'id' | 'permissionsCount'> {}

const mockRoles: Role[] = [
    { 
        id: 1, 
        name: 'Administrador', 
        description: 'Acceso total y control sobre todos los módulos y configuraciones.', 
        permissionsCount: 9, 
        isDefault: false,
        permissions: Object.keys(initialPermissions).reduce((acc, key) => {
            acc[key as keyof Permissions] = true; // El Administrador tiene todos los permisos
            return acc;
        }, {} as Permissions)
    },
    { 
        id: 2, 
        name: 'Editor', 
        description: 'Gestión de inventario, productos, citas y reportes de ventas.', 
        permissionsCount: 5, 
        isDefault: false,
        permissions: { 
            ...initialPermissions, 
            gestion_inventario: true,
            ingresar_nuevos_productos: true,
            gestion_reportes_ventas: true,
            gestion_citas_agendadas: true,
            gestion_pedidos_personalizados: true,
        }
    },
    { 
        id: 3, 
        name: 'Cliente', 
        description: 'Rol asignado automáticamente a los nuevos usuarios registrados.', 
        permissionsCount: 0, 
        isDefault: true,
        permissions: initialPermissions 
    },
    { 
        id: 4, 
        name: 'Técnico de Taller', 
        description: 'Gestión exclusiva de servicios de taller y órdenes de reparación.', 
        permissionsCount: 1, 
        isDefault: false,
        permissions: {
            ...initialPermissions,
            gestion_ordenes_taller: true
        }
    },
];

// Función utilitaria para contar permisos activos
const countActivePermissions = (perms: Permissions): number => {
    return Object.values(perms).filter(Boolean).length;
};

// --- COMPONENTE PRINCIPAL (RoleManagementView) ---

const RoleManagementView: FC = () => {
    const [roles, setRoles] = useState(mockRoles);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [deleteCandidateId, setDeleteCandidateId] = useState<number | null>(null);
    const [auditModalOpen, setAuditModalOpen] = useState(false); 

    const initialRoleState: RoleFormData = {
        name: '',
        description: '',
        isDefault: false,
        permissions: initialPermissions, // Incluimos permisos en el estado inicial
    };

    const [newRoleData, setNewRoleData] = useState<RoleFormData>(initialRoleState);

    // --- MANEJADORES DE ACCIONES ---

    // 1. Maneja la apertura del modal de Creación
    const handleCreateRoleClick = () => {
        setEditingRole(null);
        setNewRoleData(initialRoleState);
        setIsRoleModalOpen(true);
    };

    // 2. Maneja la apertura del modal de Edición (Asignado al Lápiz - Edit)
    const handleEditRoleClick = (role: Role) => {
        setEditingRole(role);
        setNewRoleData({ 
            name: role.name,
            description: role.description,
            isDefault: role.isDefault,
            permissions: role.permissions, // Cargamos los permisos existentes
        });
        setIsRoleModalOpen(true);
    };
    
    // 3. Envío del Formulario (Crear/Editar)
    const handleRoleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const activeCount = countActivePermissions(newRoleData.permissions);

        if (editingRole) {
            // Lógica de EDICIÓN
            const updatedRole: Role = { 
                ...editingRole, 
                name: newRoleData.name, 
                description: newRoleData.description,
                isDefault: newRoleData.isDefault,
                permissions: newRoleData.permissions,
                permissionsCount: activeCount, // Actualiza el conteo
            };

            // Regla: Si este rol se convierte en predeterminado, desactiva a todos los demás
            if (newRoleData.isDefault && !editingRole.isDefault) {
                setRoles(prevRoles => prevRoles.map(r => 
                    r.id === updatedRole.id 
                        ? updatedRole 
                        : { ...r, isDefault: false }
                ));
            } else {
                 setRoles(prevRoles => 
                    prevRoles.map(r => r.id === updatedRole.id ? updatedRole : r)
                );
            }

            console.log(`Rol ${updatedRole.name} actualizado con ${activeCount} permisos.`);

        } else {
            // Lógica de CREACIÓN
            const newId = Math.max(...roles.map(r => r.id), 0) + 1;
            const finalNewRole: Role = { 
                ...newRoleData, 
                id: newId, 
                permissionsCount: activeCount, 
            };

            if (finalNewRole.isDefault) {
                 // Si es predeterminado, desactiva el predeterminado actual
                 setRoles(prevRoles => [
                    finalNewRole, 
                    ...prevRoles.map(r => ({ ...r, isDefault: false }))
                 ]);
            } else {
                setRoles([finalNewRole, ...roles]);
            }

            console.log(`Rol ${finalNewRole.name} creado con ${activeCount} permisos.`);
        }

        // Cierra y resetea estados
        setIsRoleModalOpen(false);
        setEditingRole(null);
        setNewRoleData(initialRoleState);
    };

    // 4. Cambia el estado Predeterminado
    const handleToggleDefault = (roleId: number, isCurrentlyDefault: boolean) => {
        if (isCurrentlyDefault) {
            // No permitir deshabilitar si es el único predeterminado
            if (roles.filter(r => r.isDefault).length <= 1) {
                setDeleteCandidateId(-2); // Usamos -2 para el mensaje de error de 'Predeterminado'
                return;
            }
        }
        
        setRoles(prevRoles => {
            if (!isCurrentlyDefault) {
                return prevRoles.map(r => ({
                    ...r,
                    isDefault: r.id === roleId,
                }));
            }
            return prevRoles.map(r => r.id === roleId ? { ...r, isDefault: false } : r);
        });
    };

    // 5. Inicia la confirmación de Eliminación
    const confirmDeletion = (role: Role) => {
        if (role.isDefault) {
             setDeleteCandidateId(-1); // Usamos -1 como ID de error para el mensaje de eliminación
             return;
        }
        setDeleteCandidateId(role.id);
    };

    // 6. Ejecuta la Eliminación
    const executeDelete = () => {
        if (deleteCandidateId !== null && deleteCandidateId > 0) {
            setRoles(prevRoles => prevRoles.filter(r => r.id !== deleteCandidateId));
            console.log(`Rol ID ${deleteCandidateId} eliminado.`);
        }
        setDeleteCandidateId(null);
    };

    // --- SUBCOMPONENTES ---

    // Componente base para Modales (estilo claro)
    const Modal: FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
         // Overlay (Fondo claro transparente)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4">
            <div className="bg-white text-gray-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all scale-100 ease-out duration-300 border border-gray-200">
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

    const RoleFormModal: FC = () => {
        const title = editingRole ? `Editar Rol: ${editingRole.name}` : 'Crear Nuevo Rol';
        const isEditing = !!editingRole;

        // Manejador genérico para campos de texto/checkbox (aparte de permisos)
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value, type } = e.target;
            let finalValue: string | boolean = value;

            if (type === 'checkbox') {
                finalValue = (e.target as HTMLInputElement).checked;
            }

            setNewRoleData(prev => ({ ...prev, [name]: finalValue } as RoleFormData));
        };

        // Manejador específico para los checkboxes de permisos
        const handlePermissionChange = (permissionKey: keyof Permissions) => {
            setNewRoleData(prev => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [permissionKey]: !prev.permissions[permissionKey] // Toggle
                }
            }));
        };

        const activeCount = countActivePermissions(newRoleData.permissions);

        return (
            <Modal title={title} onClose={() => setIsRoleModalOpen(false)}>
                <form onSubmit={handleRoleSubmit} className="p-6 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Columna 1: Info Básica */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2">Información Básica</h4>
                            
                            {/* Nombre del Rol */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Rol:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={newRoleData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2.5 text-gray-900"
                                />
                            </div>
                            
                            {/* Descripción */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    rows={4}
                                    value={newRoleData.description}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2.5 text-gray-900"
                                />
                            </div>

                            {/* Checkbox Predeterminado */}
                            <div className="flex items-start pt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <input
                                    id="isDefault"
                                    name="isDefault"
                                    type="checkbox"
                                    checked={newRoleData.isDefault}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-sky-600 border-gray-300 rounded focus:ring-sky-500 mt-1 cursor-pointer"
                                    disabled={isEditing && editingRole.isDefault && roles.filter(r => r.isDefault).length <= 1 && !newRoleData.isDefault}
                                />
                                <div className="ml-3 text-sm">
                                    <label htmlFor="isDefault" className="font-medium text-gray-800 cursor-pointer">
                                        Rol Predeterminado
                                    </label>
                                    <p className="text-gray-500">Asignar este rol automáticamente a los nuevos usuarios registrados.</p>
                                </div>
                            </div>
                        </div>

                        {/* Columna 2: Permisos */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-gray-800 border-b pb-2 mb-2 flex items-center">
                                <ListChecks className="w-5 h-5 mr-2 text-sky-600"/> Permisos ({activeCount} / {Object.keys(PERMISSION_LABELS).length})
                            </h4>
                            
                            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto pr-3 custom-scrollbar">
                                {Object.entries(PERMISSION_LABELS).map(([key, label]) => {
                                    const permissionKey = key as keyof Permissions;
                                    return (
                                        <div key={key} className="flex items-center p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-sky-50 transition">
                                            <input
                                                id={`perm-${key}`}
                                                type="checkbox"
                                                checked={newRoleData.permissions[permissionKey]}
                                                onChange={() => handlePermissionChange(permissionKey)}
                                                className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 cursor-pointer"
                                            />
                                            <label htmlFor={`perm-${key}`} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                                                {label}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer del Modal */}
                    <div className="pt-6 flex justify-end space-x-4 border-t">
                        <button 
                            type="button" 
                            onClick={() => setIsRoleModalOpen(false)}
                            className="py-2 px-5 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="py-2 px-5 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 transition transform hover:scale-[1.02]"
                        >
                            {isEditing ? 'Guardar Cambios' : 'Crear Rol'}
                        </button>
                    </div>
                </form>
            </Modal>
        );
    };

    const DeleteConfirmationModal: FC = () => {
        const isDefaultError = deleteCandidateId === -1;
        const isToggleError = deleteCandidateId === -2;

        const handleClose = () => setDeleteCandidateId(null);
        
        return (
            <Modal 
                title={isDefaultError || isToggleError ? "Operación Restringida" : "Confirmar Eliminación"} 
                onClose={handleClose}
            >
                <div className="flex flex-col items-center p-6">
                    {isDefaultError ? (
                        <>
                            <Lock className="w-12 h-12 text-yellow-500 mb-4" />
                            <p className="text-gray-700 mb-6 text-center font-semibold">
                                ¡ERROR! No se puede eliminar un rol **predeterminado** del sistema.
                            </p>
                            <button 
                                type="button" 
                                onClick={handleClose}
                                className="py-2 px-4 rounded-xl shadow-md text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 transition w-full max-w-xs"
                            >
                                Entendido
                            </button>
                        </>
                    ) : isToggleError ? (
                        <>
                            <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
                            <p className="text-gray-700 mb-6 text-center font-semibold">
                                No se puede desasignar el rol **predeterminado** actual. Debe haber al menos un rol predeterminado activo.
                            </p>
                            <button 
                                type="button" 
                                onClick={handleClose}
                                className="py-2 px-4 rounded-xl shadow-md text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 transition w-full max-w-xs"
                            >
                                Entendido
                            </button>
                        </>
                    ) : (
                        <>
                            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                            <p className="text-gray-700 mb-6 text-center">
                                ¿Está seguro de que desea eliminar el rol **"{roles.find(r => r.id === deleteCandidateId)?.name || 'N/A'}"**? Esta acción no se puede deshacer.
                            </p>
                            <div className="flex justify-end space-x-3 w-full">
                                <button 
                                    type="button" 
                                    onClick={handleClose}
                                    className="py-2 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="button"
                                    onClick={executeDelete}
                                    className="py-2 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
                                >
                                    Sí, Eliminar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        );
    };


    return (
        <div className="p-4 sm:p-8 bg-gray-100 min-h-screen text-gray-900 font-sans"> 
            {/* Estilo para la barra de desplazamiento customizada */}
            {/* Se eliminaron 'jsx' y 'global' para evitar advertencias de React */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #ccc;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
            
            <div className="max-w-7xl mx-auto">
                
                {/* Título y Descripción */}
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 flex items-center text-gray-900">
                    <Shield className="mr-3 w-8 h-8 text-sky-600" /> Gestión de Roles y Permisos
                </h1>
                <p className="text-gray-600 mb-6">
                    Define y administra los niveles de acceso y los permisos de los usuarios en el sistema.
                </p>
                
                {/* Botón de acción */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {/* Botón Crear Nuevo Rol (Azul) */}
                    <button 
                        className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded-xl transition duration-150 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                        onClick={handleCreateRoleClick}
                    >
                        <Plus className="w-5 h-5 mr-2" /> Crear Nuevo Rol
                    </button>
                </div>

                {/* Sección de la tabla */}
                <section className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Roles del Sistema ({roles.length})</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nombre del Rol</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Descripción</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Permisos</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Predeterminado</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {roles.map((role) => (
                                    <tr key={role.id} className="hover:bg-sky-50/50 transition duration-150">
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{role.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{role.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 max-w-lg">{role.description}</td>
                                        
                                        {/* Conteo de Permisos */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-extrabold text-sky-600">
                                            {role.permissionsCount} / {Object.keys(PERMISSION_LABELS).length}
                                        </td>
                                        
                                        {/* Botón/Funcionalidad Predeterminado */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                            <button 
                                                title={role.isDefault ? "Desactivar Rol Predeterminado" : "Establecer como Rol Predeterminado Único"}
                                                onClick={() => handleToggleDefault(role.id, role.isDefault)}
                                                className={`p-2 rounded-full transition duration-150 
                                                    ${role.isDefault 
                                                        ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                                        : 'bg-gray-100 text-gray-500 hover:bg-sky-100 hover:text-sky-500'
                                                    }`}
                                            >
                                                {role.isDefault ? (
                                                    <CheckCircle className="w-5 h-5" />
                                                ) : (
                                                    <Lock className="w-5 h-5" />
                                                )}
                                            </button>
                                        </td>
                                        
                                        {/* Acciones */}
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex items-center justify-center space-x-2">
                                            
                                            {/* Botón Editar Rol (Lápiz) */}
                                            <button
                                                title="Editar Datos y Permisos del Rol"
                                                onClick={() => handleEditRoleClick(role)} 
                                                className="text-gray-500 hover:text-sky-600 p-2 rounded-full transition duration-150 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>

                                            {/* Botón Eliminar (Bote de basura) */}
                                            <button
                                                title={role.isDefault ? "No se puede eliminar un rol predeterminado" : "Eliminar Rol"}
                                                onClick={() => confirmDeletion(role)}
                                                disabled={role.isDefault}
                                                className={`p-2 rounded-full transition duration-150 focus:outline-none focus:ring-2 ${role.isDefault 
                                                        ? 'text-gray-400 cursor-not-allowed' 
                                                        : 'text-red-500 hover:text-red-700 focus:ring-red-500/50'
                                                    }`}
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

                {/* Modales */}
                {/* Modal de Creación/Edición */}
                {isRoleModalOpen && <RoleFormModal />}
                
                {/* Modal de Confirmación de Eliminación / Error */}
                {deleteCandidateId !== null && <DeleteConfirmationModal />}

                {/* Modal de Auditoría (Simulado) */}
                {auditModalOpen && (
                    <Modal title="Auditoría General de Permisos" onClose={() => setAuditModalOpen(false)}>
                        <div className="p-6 text-gray-700">
                            <p className="mb-4">
                                Esta vista mostraría una matriz detallada de todos los roles y los 
                                módulos del sistema, permitiendo una visión global de los accesos.
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>**Administrador:** Acceso a 100% de las funcionalidades.</li>
                                <li>**Editor:** Acceso a Módulos de Producto y Clientes.</li>
                                <li>**Cliente:** Solo puede ver su perfil y el estado de sus órdenes.</li>
                            </ul>
                        </div>
                    </Modal>
                )}

            </div>
        </div>
    );
};

export default RoleManagementView;

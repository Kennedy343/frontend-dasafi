// src/components/Sidebar.tsx (Código Corregido)
import React from 'react';
// ✅ CORRECCIÓN: Usamos 'import type' para IconType para eliminar la advertencia de valor no leído.

import { 
    FaHome, FaBoxes, FaPlusCircle, FaShoppingCart, FaCalendarAlt, 
    FaTools, FaChartLine, FaUsers, FaUserTag, FaStar, FaPowerOff 
} from 'react-icons/fa';

// Definición de las vistas/rutas disponibles
const menuItems = [
    { name: 'Inicio', icon: FaHome, view: 'Inicio' },
    { name: 'Inventario', icon: FaBoxes, view: 'InventoryView' },
    { name: 'Ingresar Productos', icon: FaPlusCircle, view: 'AddProductView' },
    { name: 'Pedidos Personalizados', icon: FaShoppingCart, view: 'CustomOrdersView' },
    { name: 'Citas Agendadas', icon: FaCalendarAlt, view: 'AppointmentsView' },
    { name: 'Servicios de Taller', icon: FaTools, view: 'WorkshopServicesView' },
    { name: 'Reporte de Ventas', icon: FaChartLine, view: 'SalesReportView' },
    { name: 'Gestión de Usuarios', icon: FaUsers, view: 'UserManagementView' },
    { name: 'Gestión de Roles', icon: FaUserTag, view: 'RoleManagementView' },
    { name: 'Gestión de Reseñas', icon: FaStar, view: 'ReviewManagementView' },
];

interface SidebarProps {
    currentView: string; 
    onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {

    const handleLogout = () => {
        const isConfirmed = window.confirm("¿Estás seguro que quieres cerrar la sesión?");
        if (isConfirmed) {
            alert("Cerrando Sesión... (Aquí iría la lógica de autenticación)");
        }
    };

    return (
        <div className="flex flex-col w-sidebar-width h-screen bg-gray-900 text-white shadow-xl fixed z-30">
            
            {/* Logo o Título Superior */}
            <div className="p-4 flex items-center justify-center h-16 bg-gray-900 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white tracking-wider">Dasafi Admin</h2>
            </div>

            {/* Menú de Navegación */}
            {/* ✅ CORRECCIÓN: Se cambia 'flex-grow' por 'grow' (clase canónica de Tailwind). */}
            <nav className="grow p-4 space-y-1 overflow-y-auto"> 
                {menuItems.map((item) => {
                    const isActive = currentView === item.view;
                    
                    return (
                        <button
                            key={item.name}
                            onClick={() => onNavigate(item.view)}
                            className={`
                                w-full flex items-center py-3 px-4 rounded-lg text-left transition duration-150 ease-in-out
                                ${isActive 
                                    ? 'bg-primary-blue text-white font-semibold' 
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }
                            `}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span className="text-sm">{item.name}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Botón de Cerrar Sesión (Sticky Bottom) */}
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center py-2 px-3 rounded-lg text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition duration-150"
                >
                    <FaPowerOff className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
// src/components/Sidebar.tsx (CÓDIGO FINAL CORREGIDO)
import React from 'react';
import { 
    FaHome, FaBoxes, FaPlusCircle, FaShoppingCart, FaCalendarAlt, 
    FaTools, FaChartLine, FaUsers, FaUserTag, FaStar, FaPowerOff 
} from 'react-icons/fa';

// Definición de las vistas/rutas disponibles
const menuItems = [
    // Usamos el 'name' como el valor de 'view' que se envía al Layout
    { name: 'Inicio', icon: FaHome, view: 'Inicio' },
    { name: 'Inventario', icon: FaBoxes, view: 'Inventario' }, // <-- CORRECCIÓN
    { name: 'Ingresar Productos', icon: FaPlusCircle, view: 'Ingresar Productos' }, // <-- CORRECCIÓN
    { name: 'Pedidos Personalizados', icon: FaShoppingCart, view: 'Pedidos Personalizados' }, // <-- CORRECCIÓN
    { name: 'Citas Agendadas', icon: FaCalendarAlt, view: 'Citas Agendadas' }, // <-- CORRECCIÓN
    { name: 'Servicios de Taller', icon: FaTools, view: 'Servicios de Taller' }, // <-- CORRECCIÓN
    { name: 'Reporte de Ventas', icon: FaChartLine, view: 'Reporte de Ventas' }, // <-- CORRECCIÓN
    { name: 'Gestión de Usuarios', icon: FaUsers, view: 'Gestión de Usuarios' }, // <-- CORRECCIÓN
    { name: 'Gestión de Roles', icon: FaUserTag, view: 'Gestión de Roles' }, // <-- CORRECCIÓN
    { name: 'Gestión de Reseñas', icon: FaStar, view: 'Gestión de Reseñas' }, // <-- CORRECCIÓN
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
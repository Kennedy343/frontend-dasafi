// src/views/DashboardLayout.tsx (CÓDIGO CORREGIDO Y FINAL)

import React, { useState } from 'react';
import type { FC } from 'react';

// --- Importaciones de Componentes (Desde ../components/ y ./views/) ---
import Sidebar from '../components/Sidebar'; 

// Importaciones de Vistas (Asegúrate de que estas rutas sean correctas)
import InventoryView from '../components/InventoryView';      // Asumo src/components/
import AddProductView from '../components/AddProductView';    // Asumo src/components/
import CustomOrdersView from '../components/CustomOrdersView';  // Asumo src/components/
import AppointmentsView from '../components/AppointmentsView';  // Asumo src/components/
import SalesReportView from '../components/SalesReportView';    // Asumo src/components/
import WorkshopServicesView from '../components/WorkshopServicesView'; // Asumo src/components/
import ReviewManagementView from '../components/ReviewManagementView'; // Asumo src/components/

// Vistas que están en la misma carpeta (src/views/)
import DashboardView from './DashboardView';            // Para 'Inicio'
import UserManagementView from './UserManagementView';  // Para 'Gestión de Usuarios'
import RoleManagementView from './RoleManagementView';  // Para 'Gestión de Roles'

// --- Mapeo de Vistas (La clave DEBE COINCIDIR con item.view del Sidebar) ---
const viewMap: { [key: string]: FC } = {
    // CLAVE DE MENÚ (Debe coincidir con la propiedad 'view' en Sidebar.tsx)
    'Inicio': DashboardView,
    'Inventario': InventoryView,
    'Ingresar Productos': AddProductView,
    'Pedidos Personalizados': CustomOrdersView,
    'Citas Agendadas': AppointmentsView,
    'Servicios de Taller': WorkshopServicesView,
    'Reporte de Ventas': SalesReportView,
    'Gestión de Usuarios': UserManagementView,
    'Gestión de Roles': RoleManagementView,
    'Gestión de Reseñas': ReviewManagementView,
    // La clave 'Inicio' debe ser la misma que el estado inicial
};

const DashboardLayout: React.FC = () => {
    // Estado para la vista activa (Inicia en 'Inicio')
    const [currentView, setCurrentView] = useState('Inicio');

    // Función que devuelve el componente a renderizar
    const ActiveComponent = viewMap[currentView] || (() => <div className="p-8 text-red-500">Error: Vista "{currentView}" no encontrada en el mapa.</div>);

    return (
        <div className="flex h-screen bg-gray-100 overflow-x-hidden">
            
            {/* 1. Sidebar (Le pasamos el estado y el setter) */}
            {/* Esto llama a setCurrentView en este componente (DashboardLayout) */}
            <Sidebar 
                currentView={currentView} 
                onNavigate={setCurrentView} 
            />
            
            {/* 2. Contenido Principal */}
            {/* Ajustamos el padding-left para que el contenido no se oculte detrás del sidebar fijo */}
            <main className="flex-1 p-0 overflow-y-auto min-w-0 pl-64 bg-gray-100"> 
                <div className="w-full h-full">
                    {/* Renderizamos el componente activo */}
                    <ActiveComponent /> 
                </div>
            </main>
            
        </div>
    );
};

export default DashboardLayout;
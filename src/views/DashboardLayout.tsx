// src/components/DashboardLayout.tsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Asume que el Sidebar está en 'components'
// Importa tus vistas aquí
import DashboardView from '../views/DashboardView'; 
import RoleManagementView from '../views/RoleManagementView'; 
import UserManagementView from '../views/UserManagementView'; 
// ... y todas tus otras vistas ...

// Mapeo de vistas a componentes
const viewMap: { [key: string]: React.FC<any> } = {
    'Inicio': DashboardView,
    'Gestión de Roles': RoleManagementView,
    'Gestión de Usuarios': UserManagementView,
    // ... agrega el resto de tus vistas ...
};

const DashboardLayout: React.FC = () => {
    // Estado para la vista activa (Inicia en 'Inicio' o 'Dashboard')
    const [currentView, setCurrentView] = useState('Inicio');

    const ActiveComponent = viewMap[currentView] || (() => <div>Vista no encontrada: {currentView}</div>);

    return (
        // Contenedor principal del dashboard (Flexbox para Sidebar y Contenido)
        <div className="flex min-h-screen bg-dark-bg">
            
            {/* 1. Sidebar */}
            <Sidebar 
                currentView={currentView} 
                onNavigate={setCurrentView} 
            />
            
            {/* 2. Contenido Principal */}
            {/* ml-sidebar-width desplaza el contenido para hacer espacio al sidebar fijo */}
            <main className="grow ml-sidebar-width p-0"> 
                {/* Contenedor de la vista activa */}
                <div className="w-full h-full">
                    <ActiveComponent />
                </div>
            </main>
            
        </div>
    );
};

export default DashboardLayout;
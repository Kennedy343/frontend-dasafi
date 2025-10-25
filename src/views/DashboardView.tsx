// src/views/DashboardView.tsx

import React, { useState } from 'react'; // Importar useState para manejar la navegación
// Importa los componentes
import Sidebar from '../components/Sidebar'; 
import MetricCard from '../components/MetricCard'; 
import SalesReportCard from '../components/SalesReportCard'; 
import RoleManagementTable from '../components/RoleManagementTable'; 

const DashboardView: React.FC = () => {
    // Estado para manejar la navegación o la vista activa (necesario para el Sidebar)
    const [currentView, setCurrentView] = useState('dashboard');
    
    // Función de navegación simple
    const handleNavigate = (view: string) => {
        setCurrentView(view);
        // Aquí podrías implementar la lógica para cambiar la vista/ruta
    };

    return (
        // 🛑 CORRECCIÓN: Agregamos 'overflow-x-hidden' al contenedor principal para evitar scrollbar horizontal innecesario.
        <div className="flex h-screen bg-dark-bg text-gray-100 overflow-x-hidden">

            {/* 1. Sidebar */}
            <Sidebar currentView={currentView} onNavigate={handleNavigate} />

            {/* Contenido principal del Dashboard */}
            {/* ✅ CORRECCIÓN CLAVE: Agregamos 'min-w-0' para que el elemento 'flex-1' no sea ignorado y se respete el espacio disponible. */}
            <div className="flex-1 p-8 overflow-y-auto min-w-0">
                <h1 className="text-3xl font-bold mb-6">Dashboard de Administrador</h1>

                {/* 2. Cards de Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> 
                    <MetricCard 
                        iconName="FaBox" 
                        title="Productos en Inventario" 
                        value="125" 
                        bgColor="bg-dark-card" 
                    />
                    <MetricCard 
                        iconName="FaClock" 
                        title="Pedidos Pendientes" 
                        value="15" 
                        bgColor="bg-dark-card" 
                    />
                    <MetricCard 
                        iconName="FaCalendarAlt" 
                        title="Citas Agendadas" 
                        value="8" 
                        bgColor="bg-dark-card" 
                    />
                </div>

                {/* 3. Acciones Rápidas */}
                <div className="mb-8"> 
                    <h2 className="text-2xl font-semibold mb-4">Acciones Rápidas</h2>
                    <div className="flex space-x-4">
                        <button className="bg-primary-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Ingresar Nuevo Producto
                        </button>
                        <button className="bg-secondary-gray hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Ver Pedidos Personalizados
                        </button>
                    </div>
                </div>

                {/* 4. Reporte de Ventas */}
                <div className="mb-8"> 
                    <h2 className="text-2xl font-semibold mb-4">Reporte de Ventas (Últimos 30 días)</h2>
                    <SalesReportCard />
                </div>

                {/* 5. Gestión de Roles */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Gestión de Roles</h2>
                    <RoleManagementTable />
                </div>

            </div>
        </div>
    );
};

export default DashboardView;
// src/views/DashboardView.tsx (CÓDIGO CORREGIDO)

import React, { useState } from 'react';
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
        // Mantenemos el fondo oscuro general para el body (si está definido en index.css), 
        // pero vamos a forzar el texto de los títulos a oscuro.
        <div className="flex h-screen bg-dark-bg text-gray-100 overflow-x-hidden">

            {/* 1. Sidebar */}
            <Sidebar currentView={currentView} onNavigate={handleNavigate} />

            {/* Contenido principal del Dashboard */}
            <div className="flex-1 p-8 overflow-y-auto min-w-0 pl-64 bg-gray-100"> 
            {/* 🛑 CORRECCIÓN: Agregué bg-gray-100 aquí para simular el fondo claro de tu imagen */}
            
                {/* 🛑 CORRECCIÓN: Título principal a gris oscuro */}
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard de Administrador</h1>
                
                {/* 2. Cards de Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> 
                    <MetricCard 
                        iconName="FaBox" 
                        title="Productos en Inventario" 
                        value="125" 
                        bgColor="bg-white" // Asumimos bg-white para fondo claro
                    />
                    <MetricCard 
                        iconName="FaClock" 
                        title="Pedidos Pendientes" 
                        value="15" 
                        bgColor="bg-white" // Asumimos bg-white para fondo claro
                    />
                    <MetricCard 
                        iconName="FaCalendarAlt" 
                        title="Citas Agendadas" 
                        value="8" 
                        bgColor="bg-white" // Asumimos bg-white para fondo claro
                    />
                </div>

                {/* 3. Acciones Rápidas */}
                <div className="mb-8"> 
                    {/* 🛑 CORRECCIÓN: Título de sección a gris oscuro */}
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Acciones Rápidas</h2>
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
                    {/* 🛑 CORRECCIÓN: Título de sección a gris oscuro */}
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Reporte de Ventas (Últimos 30 días)</h2>
                    <SalesReportCard />
                </div>

                {/* 5. Gestión de Roles */}
                <div>
                    {/* 🛑 CORRECCIÓN: Título de sección a gris oscuro */}
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gestión de Roles</h2>
                    <RoleManagementTable />
                </div>

            </div>
        </div>
    );
};

export default DashboardView;
// src/views/DashboardView.tsx (CONTENIDO REAL DEL DASHBOARD DE INICIO)
import React from 'react';
import type { FC } from 'react';
// Importa SOLO los componentes necesarios para la VISTA DE INICIO
import MetricCard from '../components/MetricCard'; 
import SalesReportCard from '../components/SalesReportCard'; 
import RoleManagementTable from '../components/RoleManagementTable'; 
import { FaBox, FaClock, FaCalendarAlt } from 'react-icons/fa'; // Asegúrate de importar los iconos

const DashboardView: FC = () => {
    // La lógica de navegación y Sidebar NO DEBEN estar aquí.

    return (
        <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Vista de Administrador</h1>
            
            {/* 2. Cards de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> 
                {/* Nota: MetricCard debe saber qué icono renderizar */}
                <MetricCard iconName="FaBox" title="Productos en Inventario" value="125" bgColor="bg-white" />
                <MetricCard iconName="FaClock" title="Pedidos Pendientes" value="15" bgColor="bg-white" />
                <MetricCard iconName="FaCalendarAlt" title="Citas Agendadas" value="8" bgColor="bg-white" />
            </div>

            {/* 3. Acciones Rápidas */}
            <div className="mb-8"> 
                <h2 className="text-xl font-bold mb-4 text-gray-800">Acciones Rápidas</h2>
                <div className="flex space-x-4">
                    <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition duration-150">
                        Ingresar Nuevo Producto
                    </button>
                    <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition duration-150">
                        Ver Pedidos Personalizados
                    </button>
                </div>
            </div>

            {/* 4. Reporte de Ventas */}
            <div className="mb-8"> 
                <h2 className="text-xl font-bold mb-4 text-gray-800">Reporte de Ventas (Últimos 30 días)</h2>
                <SalesReportCard /> 
            </div>

            {/* 5. Gestión de Roles (Resumen) */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Gestión de Roles (Resumen)</h2>
                <RoleManagementTable />
            </div>
        </div>
    );
};

export default DashboardView;
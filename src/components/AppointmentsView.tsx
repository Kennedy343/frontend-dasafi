// src/components/AppointmentsView.tsx (Con Tailwind CSS)
// gestion de citas agendadas 
import React, { useState } from 'react';
import { FaCalendarAlt, FaSearch, FaPlus, FaTrashAlt, FaEdit, FaCheckCircle, FaExclamationCircle, FaUserCircle, FaTools } from 'react-icons/fa';

// --- INTERFACES Y DATOS ---

interface Appointment {
    id: number;
    date: string;
    time: string;
    client: string;
    service: string;
    status: 'Confirmada' | 'Pendiente' | 'Completada' | 'Cancelada';
}

const mockAppointments: Appointment[] = [
    { id: 101, date: '2025-10-25', time: '10:00 AM', client: 'Carlos Martínez', service: 'Mantenimiento General', status: 'Confirmada' },
    { id: 102, date: '2025-10-25', time: '02:30 PM', client: 'Laura Pérez', service: 'Revisión de Frenos', status: 'Pendiente' },
    { id: 103, date: '2025-10-26', time: '09:00 AM', client: 'Javier Soto', service: 'Cambio de Neumático', status: 'Confirmada' },
    { id: 104, date: '2025-10-26', time: '11:00 AM', client: 'Andrea Rojas', service: 'Diagnóstico Eléctrico', status: 'Completada' },
    { id: 105, date: '2025-10-27', time: '04:00 PM', client: 'Miguel Ángel', service: 'Servicio de Detallado', status: 'Cancelada' },
];

const availableStatuses = ['Todas las citas', 'Confirmada', 'Pendiente', 'Completada', 'Cancelada'];

// --- Funciones de estilo dinámico (Tailwind) ---

const getStatusClasses = (status: Appointment['status']) => {
    switch (status) {
        case 'Confirmada': return 'bg-green-600 text-white';
        case 'Pendiente': return 'bg-yellow-500 text-gray-900';
        case 'Completada': return 'bg-sky-600 text-white';
        case 'Cancelada': return 'bg-red-600 text-white';
        default: return 'bg-gray-500 text-white';
    }
};

// --- COMPONENTE PRINCIPAL (AppointmentsView) ---

const AppointmentsView: React.FC = () => {
    const [appointments, setAppointments] = useState(mockAppointments);
    const [filterDate, setFilterDate] = useState('25/10/2025'); // Simulación del filtro de fecha
    const [filterStatus, setFilterStatus] = useState(availableStatuses[0]);

    const handleSearch = () => {
        alert(`Buscando citas para la fecha: ${filterDate} y estado: ${filterStatus}`);
        // Aquí iría la lógica de filtrado real
    };

    const handleNewAppointment = () => {
        alert('Abriendo Modal para Agendar Nueva Cita...');
    };

    const handleEdit = (id: number) => {
        alert(`Editando cita ID: ${id}`);
    };

    const handleDelete = (id: number) => {
        const isConfirmed = window.confirm(`¿Estás seguro de que deseas cancelar la cita ID: ${id}?`);
        if (isConfirmed) {
            setAppointments(prev => prev.filter(app => app.id !== id));
            alert(`Cita ID ${id} cancelada.`);
        }
    };

    return (
        // Contenedor principal con fondo claro
        <div className="p-8 bg-dark-bg min-h-screen text-gray-100">
            
            {/* Título y Descripción */}
            <h1 className="text-3xl font-bold mb-2 flex items-center text-white">
                <FaCalendarAlt className="mr-3 text-sky-400" /> Gestión de Citas Agendadas
            </h1>
            <p className="text-gray-400 mb-6">
                Vista completa del calendario de citas de servicio, con opciones de filtro y gestión de estado.
            </p>

            {/* Bloque de Filtros y Acciones */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center gap-4">
                
                {/* Filtro de Fecha */}
                <input
                    type="text" // Usamos text para simular el date picker que tienes en el diseño
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="p-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500 w-full md:w-auto"
                />

                {/* Filtro de Estado */}
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500 appearance-none w-full md:w-auto"
                >
                    {availableStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>

                {/* Botón Buscar */}
                <button
                    onClick={handleSearch}
                    className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded transition duration-150 w-full md:w-auto"
                >
                    <FaSearch className="mr-2" /> Buscar Citas
                </button>

                {/* Botón Agendar Nueva Cita */}
                <button
                    onClick={handleNewAppointment}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-150 w-full md:w-auto md:ml-auto"
                >
                    <FaPlus className="mr-2" /> Agendar Nueva Cita
                </button>
            </div>

            {/* Sección de la Tabla de Citas */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-white">Citas para Hoy</h2>
                
                {/* Contenedor de tabla responsiva */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Hora</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Servicio Solicitado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {appointments.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-700 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{app.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{app.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{app.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white flex items-center">
                                        <FaUserCircle className="mr-2 w-4 h-4 text-sky-400"/> {app.client}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center">
                                        <FaTools className="mr-2 w-4 h-4 text-red-400"/> {app.service}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {/* Insignia de Estado con clases dinámicas Tailwind */}
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold leading-5 rounded-full ${getStatusClasses(app.status)}`}>
                                            {app.status === 'Confirmada' && <FaCheckCircle className="mr-1" />}
                                            {app.status === 'Pendiente' && <FaExclamationCircle className="mr-1" />}
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        {/* Botón Editar */}
                                        <button
                                            title="Editar Cita"
                                            onClick={() => handleEdit(app.id)}
                                            className="text-sky-400 hover:text-sky-500 p-2 rounded-full transition duration-150"
                                        >
                                            <FaEdit className="w-5 h-5" />
                                        </button>
                                        
                                        {/* Botón Eliminar/Cancelar */}
                                        <button
                                            title="Cancelar Cita"
                                            onClick={() => handleDelete(app.id)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150 ml-2"
                                        >
                                            <FaTrashAlt className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 text-white">Agenda Semanal</h3>
                {/* Espacio para la integración de un Calendario (Ej: FullCalendar o React-Big-Calendar) */}
                <div className="bg-gray-900 h-96 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500">
                    [Espacio para el Calendario Interactivo]
                </div>
            </section>
        </div>
    );
};

export default AppointmentsView;
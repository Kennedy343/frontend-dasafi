// src/components/AppointmentsView.tsx (Tema Claro y Funcional)
import React, { useState, useMemo, useEffect } from 'react';

// --- ÍCONOS SVG EN LÍNEA ---
const IconCalendar = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const IconPlus = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const IconTrash2 = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>);
const IconEdit = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>);
const IconCheckCircle = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const IconAlertCircle = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
const IconUser = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const IconWrench = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-3.76-3.76a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0L3.3 18.2a2 2 0 0 0 0 2.83l1.9 1.9a2 2 0 0 0 2.83 0l5.5-5.5a1 1 0 0 0 0-1.4z"/></svg>);
const IconXCircle = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>);
const IconX = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>);


// --- INTERFACES Y DATOS ---

// Definimos la estructura básica de Appointment (ID puede ser opcional para la creación)
interface Appointment {
    id: number;
    date: string;
    time: string;
    client: string;
    service: string;
    status: 'Confirmada' | 'Pendiente' | 'Completada' | 'Cancelada';
}

const mockAppointments: Appointment[] = [
    { id: 101, date: '2025-10-25', time: '10:00', client: 'Carlos Martínez', service: 'Mantenimiento General', status: 'Confirmada' },
    { id: 102, date: '2025-10-25', time: '14:30', client: 'Laura Pérez', service: 'Revisión de Frenos', status: 'Pendiente' },
    { id: 103, date: '2025-10-26', time: '09:00', client: 'Javier Soto', service: 'Cambio de Neumático', status: 'Confirmada' },
    { id: 104, date: '2025-10-26', time: '11:00', client: 'Andrea Rojas', service: 'Diagnóstico Eléctrico', status: 'Completada' },
    { id: 105, date: '2025-10-27', time: '16:00', client: 'Miguel Ángel', service: 'Servicio de Detallado', status: 'Cancelada' },
];

const availableStatuses: Appointment['status'][] = ['Confirmada', 'Pendiente', 'Completada', 'Cancelada'];
const availableServices = ['Mantenimiento General', 'Revisión de Frenos', 'Cambio de Neumático', 'Diagnóstico Eléctrico', 'Servicio de Detallado'];


// --- MODAL DE CREACIÓN/EDICIÓN DE CITA ---

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointmentToEdit: Appointment | null; // Null para creación, objeto para edición
    onSave: (appointment: Omit<Appointment, 'id'> & { id?: number }) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, appointmentToEdit, onSave }) => {
    
    // Estado local del formulario
    const [formData, setFormData] = useState<Omit<Appointment, 'id'>>({
        date: '',
        time: '',
        client: '',
        service: availableServices[0],
        status: 'Pendiente' // Estado por defecto para nuevas citas
    });

    useEffect(() => {
        if (appointmentToEdit) {
            // Cargar datos de la cita si se está editando
            setFormData(appointmentToEdit);
        } else {
            // Resetear datos si es una nueva cita, usando la fecha actual como valor por defecto
            const today = new Date().toISOString().split('T')[0];
            setFormData({
                date: today,
                time: '10:00',
                client: '',
                service: availableServices[0],
                status: 'Pendiente'
            });
        }
    }, [appointmentToEdit, isOpen]); // Recargar cuando cambie la cita a editar o se abra el modal

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.client || !formData.date || !formData.time) {
            alert("Por favor, rellene todos los campos obligatorios.");
            return;
        }

        const appointmentData: Omit<Appointment, 'id'> & { id?: number } = { ...formData };

        if (appointmentToEdit) {
            // Si es edición, incluimos el ID
            appointmentData.id = appointmentToEdit.id;
        }

        onSave(appointmentData);
        onClose(); // Cerrar el modal al guardar
    };

    if (!isOpen) return null;

    const title = appointmentToEdit ? 'Editar Cita' : 'Agendar Nueva Cita';

    return (
        // Overlay (Fondo oscuro transparente)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4">
            {/* Contenedor del Modal (Tarjeta blanca/clara) */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all scale-100 border border-gray-200">
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <IconX className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Cuerpo del Formulario */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    
                    {/* Cliente */}
                    <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
                        <input
                            type="text"
                            id="client"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Ej: Juan Pérez"
                        />
                    </div>
                    
                    {/* Fecha y Hora (en una fila) */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Hora</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    
                    {/* Servicio */}
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Servicio Solicitado</label>
                        <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 bg-white appearance-none"
                        >
                            {availableServices.map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                    </div>

                    {/* Estado (Solo visible y editable en modo Edición) */}
                    {appointmentToEdit && (
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado de la Cita</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500 bg-white appearance-none"
                            >
                                {availableStatuses.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Botones de Acción */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition shadow-md"
                        >
                            {appointmentToEdit ? 'Guardar Cambios' : 'Agendar Cita'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- FUNCIONES DE ESTILO Y CALENDARIO (Se mantienen iguales) ---

const getStatusClasses = (status: Appointment['status']) => {
    switch (status) {
        case 'Confirmada': return 'bg-green-500 text-white';
        case 'Pendiente': return 'bg-yellow-400 text-gray-800';
        case 'Completada': return 'bg-sky-500 text-white';
        case 'Cancelada': return 'bg-red-500 text-white';
        default: return 'bg-gray-400 text-gray-800';
    }
};

interface CalendarProps {
    appointments: Appointment[];
    onDateSelect: (date: string) => void;
}

const CalendarDisplay: React.FC<CalendarProps> = ({ appointments, onDateSelect }) => {
    const today = new Date().toISOString().split('T')[0]; 
    
    // Simulación de calendario dinámico (asume mes de las citas mock)
    const mockDate = new Date(mockAppointments[0].date);
    const currentMonth = mockDate.getMonth();
    const currentYear = mockDate.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0=Dom, 1=Lun...

    const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);

    const appointmentsByDate = useMemo(() => {
        return appointments.reduce((acc, app) => {
            acc[app.date] = (acc[app.date] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [appointments]);

    const days = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        dateString: `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`
    }));

    // Celdas vacías al inicio para alinear con el día de la semana
    const initialPadding = Array.from({ length: firstDayOfMonth }, (_, i) => i);


    return (
        <div className="p-4 bg-white rounded-lg shadow-xl text-gray-900 border border-gray-200">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <button className="text-blue-500 hover:text-blue-700 font-bold opacity-50 cursor-not-allowed">&lt; Anterior</button>
                <h3 className="text-xl font-semibold">{new Date(currentYear, currentMonth).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</h3>
                <button className="text-blue-500 hover:text-blue-700 font-bold opacity-50 cursor-not-allowed">Siguiente &gt;</button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 border-b border-gray-300 pb-2 mb-2">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {initialPadding.map(i => <div key={`pad-${i}`}></div>)} 
                
                {days.map(({ day, dateString }) => {
                    const isToday = dateString === today;
                    const hasAppointments = appointmentsByDate[dateString] > 0;
                    
                    return (
                        <button
                            key={day}
                            onClick={() => onDateSelect(dateString)}
                            title={hasAppointments ? `${appointmentsByDate[dateString]} citas` : 'Sin citas'}
                            className={`
                                flex flex-col items-center justify-center h-12 w-full p-1 rounded-lg transition duration-150 relative 
                                border border-gray-300 
                                ${isToday ? 'bg-blue-100 border-blue-500' : 'bg-white hover:bg-gray-100'}
                                ${hasAppointments 
                                    ? 'shadow-md border-blue-400' 
                                    : ''
                                }
                            `}
                        >
                            <span className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
                                {day}
                            </span>
                            {hasAppointments && (
                                <span className="absolute bottom-0 right-0 h-2 w-2 bg-red-500 rounded-full ring-1 ring-white"></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// --- COMPONENTE PRINCIPAL (AppointmentsView) ---

const AppointmentsView: React.FC = () => {
    const [appointments, setAppointments] = useState(mockAppointments);
    // Estado para el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

    const [filterDate, setFilterDate] = useState('2025-10-25'); 
    const [filterStatus, setFilterStatus] = useState('Todas las citas');

    // Función para obtener el próximo ID, útil para la creación
    const getNextId = () => {
        const maxId = appointments.reduce((max, app) => Math.max(max, app.id), 0);
        return maxId + 1;
    };

    // Lógica para guardar (Crear o Editar)
    const handleSaveAppointment = (data: Omit<Appointment, 'id'> & { id?: number }) => {
        if (data.id) {
            // EDICIÓN
            setAppointments(prev => prev.map(app => 
                app.id === data.id ? { ...app, ...data } as Appointment : app
            ));
        } else {
            // CREACIÓN
            const newAppointment: Appointment = {
                ...data,
                id: getNextId()
            } as Appointment;
            setAppointments(prev => [...prev, newAppointment]);
        }
    };

    // Abrir modal para crear
    const handleNewAppointment = () => {
        setEditingAppointment(null);
        setIsModalOpen(true);
    };

    // Abrir modal para editar
    const handleEdit = (id: number) => {
        const appointment = appointments.find(app => app.id === id);
        if (appointment) {
            setEditingAppointment(appointment);
            setIsModalOpen(true);
        }
    };

    // Manejar eliminación/cancelación
    const handleDelete = (id: number) => {
        // Utilizamos un modal de confirmación simple (reemplazar con modal personalizado si es posible)
        if (window.confirm(`¿Estás seguro de que deseas cancelar la cita ID: ${id}? Esta acción es irreversible.`)) {
            setAppointments(prev => prev.filter(app => app.id !== id));
        }
    };
    
    // Función para manejar la selección de fecha desde el calendario
    const handleDateSelect = (date: string) => {
        setFilterDate(date);
    };

    // Filtrar citas por la fecha y estado seleccionados
    const filteredAppointments = useMemo(() => {
        return appointments.filter(app => {
            const dateMatch = filterDate === 'Todas' || app.date === filterDate;
            const statusMatch = filterStatus === 'Todas las citas' || app.status === filterStatus;
            return dateMatch && statusMatch;
        });
    }, [appointments, filterDate, filterStatus]);


    return (
        // Contenedor principal con fondo blanco/claro
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen text-gray-900 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Título y Descripción */}
                <h1 className="text-3xl font-bold mb-2 flex items-center text-gray-900">
                    <IconCalendar className="mr-3 text-blue-600 w-7 h-7" /> Gestión de Citas Agendadas
                </h1>
                <p className="text-gray-600 mb-6">
                    Vista completa del calendario de citas de servicio, con opciones de filtro y gestión de estado.
                </p>

                {/* Bloque de Filtros y Acciones */}
                <div className="bg-white p-4 rounded-lg shadow-lg mb-6 flex flex-col md:flex-row items-center gap-4 border border-gray-200">
                    
                    {/* Filtro de Fecha (reflejando la selección del calendario) */}
                    <input
                        type="text"
                        value={filterDate === 'Todas' ? 'Todas las Fechas' : filterDate}
                        readOnly
                        className="p-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto cursor-pointer shadow-sm"
                        onClick={() => setFilterDate('Todas')} // Permite resetear la fecha de filtro
                        title="Clic para ver todas las citas"
                    />

                    {/* Filtro de Estado */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="p-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 focus:ring-blue-500 focus:border-blue-500 appearance-none w-full md:w-auto shadow-sm"
                    >
                        {['Todas las citas', ...availableStatuses].map(status => (
                            <option key={status} value={status} className='bg-white'>{status}</option>
                        ))}
                    </select>
                    {/* Botón Agendar Nueva Cita (Abre Modal) */}
                    <button
                        onClick={handleNewAppointment}
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-150 w-full md:w-auto md:ml-auto shadow-md"
                    >
                        <IconPlus className="mr-2 w-5 h-5" /> Agendar Nueva Cita
                    </button>
                </div>
                
                {/* Sección de la Tabla de Citas */}
                <section className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">
                        Citas 
                        {filterDate !== 'Todas' ? ` para el ${filterDate}` : ' Agendadas'}
                        ({filteredAppointments.length})
                    </h2>
                    
                    {/* Contenedor de tabla responsiva */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Hora</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Servicio Solicitado</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredAppointments.length > 0 ? (
                                    filteredAppointments.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                                                <IconUser className="mr-2 w-4 h-4 text-blue-500" /> {app.client}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center">
                                                <IconWrench className="mr-2 w-4 h-4 text-red-500" /> {app.service}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold leading-5 rounded-full ${getStatusClasses(app.status)}`}>
                                                    {app.status === 'Confirmada' && <IconCheckCircle className="mr-1 w-3 h-3" />}
                                                    {app.status === 'Pendiente' && <IconAlertCircle className="mr-1 w-3 h-3" />}
                                                    {app.status === 'Cancelada' && <IconXCircle className="mr-1 w-3 h-3" />}
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                {/* Botón Editar (Abre Modal en modo edición) */}
                                                <button
                                                    title="Editar Cita"
                                                    onClick={() => handleEdit(app.id)}
                                                    className="text-blue-500 hover:text-blue-700 p-2 rounded-full transition duration-150"
                                                >
                                                    <IconEdit className="w-5 h-5" />
                                                </button>
                                                
                                                {/* Botón Eliminar/Cancelar */}
                                                <button
                                                    title="Cancelar Cita"
                                                    onClick={() => handleDelete(app.id)}
                                                    className="text-red-500 hover:text-red-700 p-2 rounded-full transition duration-150 ml-2"
                                                >
                                                    <IconTrash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500 bg-gray-50">
                                            No hay citas registradas para la fecha y estado seleccionados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
                
                {/* Sección de Calendario */}
                <section className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Agenda Mensual</h3>
                    <CalendarDisplay 
                        appointments={appointments} 
                        onDateSelect={handleDateSelect}
                    />
                </section>

                {/* MODAL DE CITA */}
                <AppointmentModal 
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    appointmentToEdit={editingAppointment}
                    onSave={handleSaveAppointment}
                />
            </div>
        </div>
    );
};

export default AppointmentsView;

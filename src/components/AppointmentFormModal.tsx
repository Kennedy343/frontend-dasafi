// src/components/AppointmentFormModal.tsx
import React from 'react';
import { FaTimes, FaCalendarPlus, FaSave } from 'react-icons/fa';

interface Appointment {
    id: number;
    date: string;
    time: string;
    client: string;
    service: string;
    status: string;
}

interface AppointmentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    initialData?: Appointment;
}

const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({ isOpen, onClose, isEditing, initialData }) => {
    
    if (!isOpen) return null;

    const title = isEditing ? `Editar Cita ID: ${initialData?.id || ''}` : 'Agendar Nueva Cita';
    const buttonText = isEditing ? 'Guardar Cambios' : 'Agendar Cita';

    const OVERLAY_CLASSES = "fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4";
    const MODAL_CONTENT_CLASSES = "bg-white rounded-lg shadow-2xl w-full max-w-xl overflow-hidden transform transition-all duration-300 scale-100";
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`${title}: Cita agendada/actualizada. (Simulado)`);
        onClose(); 
    };

    return (
        <div className={OVERLAY_CLASSES}>
            
            <div className={MODAL_CONTENT_CLASSES}>
                
                {/* Encabezado del Modal */}
                <div className="flex justify-between items-center p-5 bg-gray-100 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <FaCalendarPlus className="mr-2 text-green-600" /> {title}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-600 transition">
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Cuerpo del Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 text-gray-900">
                    
                    <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">Cliente</label>
                        <input
                            type="text"
                            id="client"
                            defaultValue={initialData?.client || ''}
                            placeholder="Nombre del cliente"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
                            <input
                                type="date"
                                id="date"
                                defaultValue={initialData?.date || ''}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Hora</label>
                            <input
                                type="time"
                                id="time"
                                defaultValue={initialData?.time || '10:00'}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Servicio Solicitado</label>
                        <select
                            id="service"
                            defaultValue={initialData?.service || 'Mantenimiento General'}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900"
                            required
                        >
                            <option value="Mantenimiento General">Mantenimiento General</option>
                            <option value="Revisión de Frenos">Revisión de Frenos</option>
                            <option value="Cambio de Neumáticos">Cambio de Neumáticos</option>
                            <option value="Diagnóstico Eléctrico">Diagnóstico Eléctrico</option>
                        </select>
                    </div>

                    {/* Pie de Formulario (Botones) */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                        >
                            <FaSave className="mr-2" /> {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppointmentFormModal;
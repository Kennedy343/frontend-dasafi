// src/components/CalendarPlaceholder.tsx
import React from 'react';

const CalendarPlaceholder: React.FC = () => {
    // Este componente simula la apariencia de un calendario mensual.
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    // Simula 30 días del mes
    const dates = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="bg-gray-700 text-white rounded-lg p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4 border-b border-gray-600 pb-2">
                <button className="text-sky-400 hover:text-sky-500 font-bold px-2">{"<"}</button>
                <h3 className="text-lg font-semibold text-white">Octubre 2025</h3>
                <button className="text-sky-400 hover:text-sky-500 font-bold px-2">{">"}</button>
            </div>
            
            {/* Encabezados de Días */}
            <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-400 mb-2">
                {days.map(day => <div key={day}>{day}</div>)}
            </div>
            
            {/* Días del Mes */}
            <div className="grid grid-cols-7 gap-1 text-center">
                {/* Espacios en blanco para el inicio de semana (simulación) */}
                <div className="h-8"></div>
                <div className="h-8"></div>

                {dates.map(date => (
                    <div 
                        key={date}
                        className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer transition 
                            ${date === 25 ? 'bg-sky-600 font-bold' : 'hover:bg-gray-600'} 
                            ${date > 20 && date < 27 ? 'border border-green-400 text-green-400' : ''}
                        `}
                        title={date > 20 && date < 27 ? 'Citas Agendadas' : 'Sin Citas'}
                    >
                        {date}
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">**Círculos verdes indican días con citas**</p>
        </div>
    );
};

export default CalendarPlaceholder;
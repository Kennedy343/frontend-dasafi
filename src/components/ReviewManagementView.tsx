// src/components/ReviewManagementView.tsx
// gestion de reseñas

import type { FC } from 'react';
// Importamos los iconos necesarios para las acciones de Publicar y Rechazar:
import { FaStar, FaEye, FaTrash, FaFilter, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

// --- INTERFACES Y DATOS MOCK ---

interface Review {
    id: number;
    client: string;
    product: string;
    rating: number; // de 1 a 5
    date: string;
    status: 'Pendiente' | 'Publicada' | 'Rechazada';
}

const mockReviews: Review[] = [
    { id: 201, client: 'Luisa Fernanda', product: 'Cadena de Seguridad', rating: 5, date: '2025-10-25', status: 'Pendiente' },
    { id: 202, client: 'Manuel Gómez', product: 'Anillo de Compromiso X', rating: 4, date: '2025-10-24', status: 'Publicada' },
    { id: 203, client: 'Sofía Castro', product: 'Collar de Perlas', rating: 1, date: '2025-10-23', status: 'Rechazada' },
    { id: 204, client: 'Pedro Reyes', product: 'Reloj Suizo Clásico', rating: 5, date: '2025-10-22', status: 'Publicada' },
];

// --- Funciones de ayuda ---

const getStarRating = (rating: number) => {
    return Array(rating).fill(null).map((_, i) => (
        <FaStar key={i} className="inline w-4 h-4 text-yellow-400 mr-0.5" />
    ));
};

const getStatusClasses = (status: Review['status']) => {
    switch (status) {
        case 'Pendiente': return 'bg-orange-500 text-gray-900';
        case 'Publicada': return 'bg-green-600 text-white';
        case 'Rechazada': return 'bg-red-600 text-white';
        default: return 'bg-gray-500 text-white';
    }
};

// --- COMPONENTE PRINCIPAL (ReviewManagementView) ---

const ReviewManagementView: FC = () => {

    // Estas funciones AHORA SERÁN UTILIZADAS
    const handlePublish = (id: number) => alert(`Reseña ID ${id} publicada.`); 
    const handleReject = (id: number) => alert(`Reseña ID ${id} rechazada.`); 
    const handleView = (id: number) => alert(`Viendo contenido completo de Reseña ID: ${id}`);
    const handleDelete = (id: number) => alert(`Eliminando Reseña ID: ${id}`);

    return (
        <div className="p-8 bg-dark-bg min-h-screen text-gray-100">
            
            {/* Título y Descripción */}
            <h1 className="text-3xl font-bold mb-2 flex items-center text-black">
                <FaStar className="mr-3 text-sky-400" /> Gestión de Reseñas
            </h1>
            <p className="text-gray-400 mb-6">
                Modera las opiniones y reseñas de los clientes antes de su publicación, manteniendo la calidad y veracidad.
            </p>

            {/* Botones de Filtro */}
            <div className="flex gap-4 mb-8">
                <button 
                    className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition duration-150"
                >
                    <FaFilter className="mr-2" /> Filtrar (Pendientes)
                </button>
            </div>

            {/* Sección de la Tabla de Reseñas */}
            <section className="bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-black">Reseñas Recientes</h2>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Producto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {mockReviews.map((review) => (
                                <tr key={review.id} className="hover:bg-gray-700 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{review.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{review.client}</td>
                                    <td className="px-6 py-4 text-sm text-gray-300">{review.product}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{getStarRating(review.rating)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{review.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${getStatusClasses(review.status)}`}>
                                            {review.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center space-x-2">
                                        
                                        {/* Botón Ver Detalle */}
                                        <button
                                            title="Ver Detalle"
                                            onClick={() => handleView(review.id)}
                                            className="text-gray-400 hover:text-sky-400 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-150"
                                        >
                                            <FaEye className="w-5 h-5" />
                                        </button>

                                        {/* Acciones de Moderación (SOLO VISIBLE para Pendientes/Rechazadas) */}
                                        {review.status !== 'Publicada' && (
                                            <>
                                                {/* Botón Publicar/Aprobar (Usa handlePublish) */}
                                                <button
                                                    title="Publicar Reseña"
                                                    onClick={() => handlePublish(review.id)}
                                                    className="text-green-400 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-green-600 transition duration-150"
                                                >
                                                    <FaCheckCircle className="w-5 h-5" />
                                                </button>
                                                
                                                {/* Botón Rechazar (Usa handleReject) */}
                                                {review.status !== 'Rechazada' && (
                                                    <button
                                                        title="Rechazar Reseña"
                                                        onClick={() => handleReject(review.id)}
                                                        className="text-orange-400 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-orange-600 transition duration-150"
                                                    >
                                                        <FaTimesCircle className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        
                                        {/* Botón Eliminar */}
                                        <button
                                            title="Eliminar Reseña"
                                            onClick={() => handleDelete(review.id)}
                                            className="text-red-400 hover:text-white p-2 rounded-full bg-gray-700 hover:bg-red-600 transition duration-150"
                                        >
                                            <FaTrash className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default ReviewManagementView;
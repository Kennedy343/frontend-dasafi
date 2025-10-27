import React, { useState, useCallback } from 'react'; // Eliminamos 'FC' de la importación nombrada
import type { FC } from 'react'; // Importamos 'FC' como un tipo
import { Star, Eye, Trash2, Filter, CheckCircle, XCircle, MessageSquareText, X } from 'lucide-react';

// --- INTERFACES Y DATOS MOCK ---

interface Review {
    id: number;
    client: string;
    product: string;
    rating: number; // de 1 a 5
    date: string;
    status: 'Pendiente' | 'Publicada' | 'Rechazada';
    content: string; // Añadido contenido mock para el modal de vista
}

const mockReviews: Review[] = [
    { id: 201, client: 'Luisa Fernanda', product: 'Cadena de Seguridad', rating: 5, date: '2025-10-25', status: 'Pendiente', content: '¡El producto llegó súper rápido y la calidad es increíble! Lo recomiendo 100%.' },
    { id: 202, client: 'Manuel Gómez', product: 'Anillo de Compromiso X', rating: 4, date: '2025-10-24', status: 'Publicada', content: 'El anillo es hermoso, pero el tamaño era ligeramente más grande de lo esperado. Un servicio excelente, no obstante.' },
    { id: 203, client: 'Sofía Castro', product: 'Collar de Perlas', rating: 1, date: '2025-10-23', status: 'Rechazada', content: 'Nunca recibí el pedido y la atención al cliente fue terrible. No volveré a comprar aquí.' },
    { id: 204, client: 'Pedro Reyes', product: 'Reloj Suizo Clásico', rating: 5, date: '2025-10-22', status: 'Publicada', content: 'Una pieza de ingeniería y belleza. El mejor reloj que he comprado.' },
    { id: 205, client: 'Elena Torres', product: 'Brazalete Deportivo', rating: 3, date: '2025-10-21', status: 'Pendiente', content: 'El brazalete es cómodo, aunque el color no es tan vibrante como se muestra en la foto.' },
];

// --- FUNCIONES DE UTILIDAD (Reutilizadas del componente anterior para mensajes) ---

interface Message {
    id: number;
    text: string;
    type: 'success' | 'info' | 'error' | 'warning';
}

interface MessageBoxProps {
    messages: Message[];
    dismissMessage: (id: number) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ messages, dismissMessage }) => {
    return (
        <div className="fixed bottom-4 right-4 z-100 space-y-2">
            {messages.map(msg => (
                <div 
                    key={msg.id} 
                    className={`p-4 rounded-lg shadow-2xl text-white max-w-sm transform transition-all duration-300 ease-out translate-x-0 opacity-100 
                        ${msg.type === 'success' ? 'bg-green-600' : 
                          msg.type === 'error' ? 'bg-red-600' : 
                          msg.type === 'warning' ? 'bg-orange-500' : 'bg-blue-600'}`}
                    style={{ animation: 'slideIn 0.3s forwards' }}
                >
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-sm">{msg.text}</p>
                        <button onClick={() => dismissMessage(msg.id)} className="ml-4 text-white opacity-75 hover:opacity-100">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
            {/* Corregido: El bloque <style> debe ser envuelto en un fragmento o ser parte de la función de retorno */}
            <style>
                {`
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateX(100%);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                `}
            </style>
        </div>
    );
};

const useMessageQueue = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    
    // El error en useCallback puede deberse a la versión de TS/React, pero en este entorno lo manejamos así:
    const dismissMessage = useCallback((id: number) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    }, []);

    const showMessage = useCallback((text: string, type: Message['type'] = 'info', duration: number = 5000) => {
        const id = Date.now();
        const newMessage = { id, text, type };
        setMessages(prev => [...prev, newMessage]);
        setTimeout(() => dismissMessage(id), duration);
    }, [dismissMessage]);

    return { messages, showMessage, dismissMessage };
};

// --- Funciones de ayuda específicas de Reseñas ---

const getStarRating = (rating: number) => {
    // Rellena con estrellas amarillas para el rating, y grises para las restantes
    return Array(5).fill(null).map((_, i) => (
        <Star 
            key={i} 
            className={`inline w-4 h-4 mr-0.5 fill-current ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} 
        />
    ));
};

const getStatusClasses = (status: Review['status']) => {
    switch (status) {
        case 'Pendiente': return 'bg-orange-100 text-orange-800 border border-orange-200';
        case 'Publicada': return 'bg-green-100 text-green-800 border border-green-200';
        case 'Rechazada': return 'bg-red-100 text-red-800 border border-red-200';
        default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
};

// --- MODAL DE VISTA DE CONTENIDO ---

interface ContentViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    review?: Review;
}

const ContentViewModal: React.FC<ContentViewModalProps> = ({ isOpen, onClose, review }) => {
    if (!isOpen || !review) return null;

    return (
                // Overlay (Fondo claro transparente)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-2xl max-w-xl w-full text-gray-900">
                
                {/* Encabezado */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                    <h3 className="text-2xl font-bold flex items-center">
                        <MessageSquareText className="mr-2 w-6 h-6 text-sky-600" /> Detalle de Reseña #{review.id}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition p-1 rounded-full hover:bg-gray-100">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Contenido de la Reseña */}
                <div className="space-y-4">
                    <p className="text-lg font-semibold text-gray-700">Cliente: <span className="font-normal text-gray-900">{review.client}</span></p>
                    <p className="text-lg font-semibold text-gray-700">Producto: <span className="font-normal text-gray-900">{review.product}</span></p>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-gray-700 mr-2">Valoración:</p>
                        {getStarRating(review.rating)}
                    </div>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-md font-medium text-gray-700 mb-2">Contenido:</p>
                        <p className="text-gray-800 italic leading-relaxed">"{review.content}"</p>
                    </div>
                </div>

                {/* Pie de página */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-150 shadow-md"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL (ReviewManagementView) ---

const ReviewManagementView: FC = () => {

    const [reviews, setReviews] = useState<Review[]>(mockReviews);
    const [filterStatus, setFilterStatus] = useState<'Todos' | Review['status']>('Pendiente');
    
    // Estados para modales
    const { messages, showMessage, dismissMessage } = useMessageQueue();
    const [confirmAction, setConfirmAction] = useState<{ id: number; message: string; action: () => void } | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingReview, setViewingReview] = useState<Review | undefined>(undefined);

    // FUNCIÓN: Cambiar el estado de una reseña
    const changeReviewStatus = (id: number, newStatus: Review['status']) => {
        setReviews(prevReviews => prevReviews.map(r => 
            r.id === id ? { ...r, status: newStatus } : r
        ));
        showMessage(`Reseña ID ${id} cambiada a: ${newStatus}`, 'success');
    };

    // LÓGICA DE ACCIONES
    const handlePublish = (id: number) => changeReviewStatus(id, 'Publicada'); 
    const handleReject = (id: number) => changeReviewStatus(id, 'Rechazada'); 

    const handleView = (id: number) => {
        const review = reviews.find(r => r.id === id);
        if (review) {
            setViewingReview(review);
            setIsViewModalOpen(true);
        } else {
            showMessage('Reseña no encontrada.', 'error');
        }
    };

    const handleDeleteConfirmation = (id: number) => {
        const review = reviews.find(r => r.id === id);
        if (!review) return;

        const action = () => {
            setReviews(prev => prev.filter(r => r.id !== id));
            showMessage(`Reseña ID ${id} eliminada.`, 'success');
            setConfirmAction(null);
        };
        
        setConfirmAction({
            id,
            message: `¿Estás seguro de ELIMINAR la reseña de "${review.client}" para el producto "${review.product}"?`,
            action,
        });
    };

    // Filtrar reseñas
    const filteredReviews = reviews.filter(review => 
        filterStatus === 'Todos' ? true : review.status === filterStatus
    );

    // COMPONENTE IN-LINE: Modal de Confirmación
    const ConfirmationModal = () => {
        if (!confirmAction) return null;
        
        return (
       // Overlay (Fondo claro transparente)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4">
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-2xl max-w-sm w-full text-gray-900">
                    <h4 className="text-xl font-bold text-red-600 mb-3">Confirmar Eliminación</h4>
                    <p className="mb-6 text-gray-700">{confirmAction.message}</p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setConfirmAction(null)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmAction.action}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
                        >
                            <Trash2 className="w-4 h-4 inline mr-2"/> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div className="p-4 sm:p-8 bg-gray-100 min-h-screen font-sans text-gray-900">
            <div className="max-w-7xl mx-auto">
                
                {/* Título y Descripción */}
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 flex items-center text-gray-900">
                    <MessageSquareText className="mr-3 w-6 h-6 text-sky-600" /> Gestión de Reseñas
                </h1>
                <p className="text-gray-600 mb-6 border-b border-gray-200 pb-4">
                    Modera las opiniones y valoraciones de los clientes antes de su publicación en el sitio web.
                </p>

                {/* Bloque de Filtros */}
                <div className="bg-white p-4 rounded-xl shadow-lg mb-8 flex flex-wrap items-center gap-3 border border-gray-200">
                    <Filter className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="font-semibold text-gray-700 mr-2">Filtrar por Estado:</span>
                    
                    {/* Botones de Filtro */}
                    {['Pendiente', 'Publicada', 'Rechazada', 'Todos'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as 'Todos' | Review['status'])}
                            className={`flex items-center font-semibold py-2 px-4 rounded-lg transition duration-150 shadow-sm text-sm
                                ${filterStatus === status 
                                    ? 'bg-sky-600 text-white hover:bg-sky-700' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Sección de la Tabla de Reseñas */}
                <section className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        {filterStatus === 'Todos' ? 'Todas las Reseñas' : `Reseñas ${filterStatus}`}
                    </h2>
                    
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valoración</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredReviews.map((review) => (
                                    <tr key={review.id} className="hover:bg-gray-50 transition duration-150">
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.id}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{review.client}</td>
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">{review.product}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">{getStarRating(review.rating)}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">{review.date}</td>
                                        
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${getStatusClasses(review.status)}`}>
                                                {review.status}
                                            </span>
                                        </td>
                                        
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-center space-x-2">
                                            
                                            {/* Botón Ver Detalle */}
                                            <button
                                                title="Ver Contenido de la Reseña"
                                                onClick={() => handleView(review.id)}
                                                className="text-sky-600 hover:text-white p-2 rounded-full bg-sky-100 hover:bg-sky-600 transition duration-150 shadow-sm"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>

                                            {/* Acciones de Moderación */}
                                            {review.status !== 'Publicada' && (
                                                <button
                                                    title="Publicar/Aprobar Reseña"
                                                    onClick={() => handlePublish(review.id)}
                                                    className="text-green-600 hover:text-white p-2 rounded-full bg-green-100 hover:bg-green-600 transition duration-150 shadow-sm"
                                                >
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            
                                            {review.status !== 'Rechazada' && (
                                                <button
                                                    title="Rechazar Reseña"
                                                    onClick={() => handleReject(review.id)}
                                                    className="text-orange-600 hover:text-white p-2 rounded-full bg-orange-100 hover:bg-orange-600 transition duration-150 shadow-sm"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            
                                            {/* Botón Eliminar */}
                                            <button
                                                title="Eliminar Reseña"
                                                onClick={() => handleDeleteConfirmation(review.id)}
                                                className="text-red-600 hover:text-white p-2 rounded-full bg-red-100 hover:bg-red-600 transition duration-150 shadow-sm"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredReviews.length === 0 && (
                             <div className="text-center py-8 text-gray-500">
                                 No hay reseñas con el estado seleccionado.
                             </div>
                        )}
                    </div>
                </section>
            </div>
            
            {/* Renderizar Modales y Mensajes */}
            <ContentViewModal 
                isOpen={isViewModalOpen} 
                onClose={() => setIsViewModalOpen(false)} 
                review={viewingReview} 
            />
            <ConfirmationModal />
            <MessageBox messages={messages} dismissMessage={dismissMessage} />
        </div>
    );
};

export default ReviewManagementView;

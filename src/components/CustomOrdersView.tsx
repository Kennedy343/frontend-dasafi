//Gestion de Pedidos Personalizados 
import React, { useState, useCallback, useEffect } from 'react';
// Íconos reemplazados: FaShoppingCart, FaPlus, FaHistory, FaEye, FaUserTag
import { ShoppingCart, Plus, Eye, User, X, Save, Tag, DollarSign, Calendar, FileText, Loader2 } from 'lucide-react';

// --- INTERFACES Y DATOS ---

// 1. Definimos las opciones de estado como un array de literales constantes (as const).
const statusOptions = ['En Proceso', 'Cotización', 'Enviado', 'Entregado'] as const;
// 2. Derivamos el tipo de estado (unión de literales) a partir del array para asegurar consistencia.
type CustomOrderStatus = typeof statusOptions[number];

interface CustomOrder {
    id: number;
    client: string;
    date: string;
    description: string;
    value: string;
    // 3. Usamos el tipo derivado CustomOrderStatus
    status: CustomOrderStatus;
}

const mockOrders: CustomOrder[] = [
    { id: 501, client: 'María Soto', date: '2025-10-20', description: 'Bicicleta Montaña Personalizada', value: 'Q1,850.00', status: 'En Proceso' },
    { id: 502, client: 'Pedro Gómez', date: '2025-10-25', description: 'Kit de Calcomanías Personalizadas', value: 'Q45.50', status: 'Cotización' },
    { id: 503, client: 'Felipe Reyes', date: '2025-10-10', description: 'Asiento de Gel Ergonómico XL', value: 'Q120.99', status: 'Enviado' },
    { id: 504, client: 'Ana Díaz', date: '2025-10-10', description: 'Mantenimiento preventivo anual', value: 'Q80.00', status: 'Entregado' },
];


// --- Funciones de estilo dinámico (Tailwind) ---

const getStatusClasses = (status: CustomOrder['status']) => {
    // Colores ajustados para que el texto sea siempre legible en el fondo de color
    switch (status) {
        case 'En Proceso': return 'bg-sky-500 border-sky-500 text-white';
        case 'Cotización': return 'bg-orange-400 border-orange-400 text-gray-900';
        case 'Enviado': return 'bg-purple-600 border-purple-600 text-white'; 
        case 'Entregado': return 'bg-green-600 border-green-600 text-white'; 
        default: return 'bg-gray-400 border-gray-400 text-gray-900';
    }
};

// --- COMPONENTE DE UTILIDAD: MessageBox (Reemplaza alert()) ---

interface Message {
    id: number;
    text: string;
    type: 'success' | 'info' | 'error';
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
                    className={`p-4 rounded-lg shadow-xl text-white max-w-sm transform transition-all duration-300 ease-out translate-x-0 opacity-100 ${
                        msg.type === 'success' ? 'bg-green-600' : msg.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                    }`}
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

// --- COMPONENTE DE UTILIDAD: OrderFormModal ---

interface OrderFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    initialData?: CustomOrder;
    onSave: (order: CustomOrder, isNew: boolean) => void;
    showMessage: (text: string, type?: Message['type']) => void;
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({ isOpen, onClose, isEditing, initialData, onSave, showMessage }) => {
    const [formData, setFormData] = useState<Omit<CustomOrder, 'id'>>({
        client: initialData?.client || '',
        date: initialData?.date || new Date().toISOString().slice(0, 10),
        description: initialData?.description || '',
        value: initialData?.value.replace(/[^0-9.]/g, '') || '', // Limpiamos el formato para el input
        status: initialData?.status || 'Cotización',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Sincronizar el formulario cuando se abre el modal o cambian los datos iniciales
    useEffect(() => {
        if (isOpen) {
            setFormData({
                client: initialData?.client || '',
                date: initialData?.date || new Date().toISOString().slice(0, 10),
                description: initialData?.description || '',
                value: initialData?.value.replace(/[^0-9.]/g, '') || '',
                status: initialData?.status || 'Cotización',
            });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const title = isEditing ? `Detalles del Pedido #${initialData?.id || 'N/A'}` : 'Crear Nueva Cotización';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value as CustomOrderStatus })); // Aseguramos el tipo para 'status'
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Permitir solo números y un punto decimal
        const rawValue = e.target.value.replace(/[^0-9.]/g, '');
        setFormData(prev => ({ ...prev, value: rawValue }));
    };

    const handleSave = () => {
        if (!formData.client || !formData.description) {
            showMessage('Por favor, rellena el nombre del cliente y la descripción.', 'error');
            return;
        }

        setIsLoading(true);

        // Simulación de guardado asíncrono
        setTimeout(() => {
            setIsLoading(false);

            // Formatear el valor con el prefijo "Q" antes de guardar
            const formattedValue = `Q${parseFloat(formData.value || '0').toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
            
            const newOrUpdatedOrder: CustomOrder = {
                ...initialData, // Mantiene el ID si es edición
                ...formData,
                value: formattedValue,
                id: isEditing ? (initialData?.id || 0) : Date.now() + Math.floor(Math.random() * 1000), // Genera ID si es nuevo
            } as CustomOrder;

            onSave(newOrUpdatedOrder, !isEditing);
            
            showMessage(isEditing ? `Pedido #${initialData?.id} actualizado correctamente.` : '¡Nueva Cotización creada con éxito!', 'success');
            onClose();
        }, 800);
    };

    return (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-xl w-full transform transition-all duration-300 scale-100 text-gray-900">
                
                {/* Encabezado del Modal */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                    <h3 className="text-2xl font-bold flex items-center">
                        {isEditing ? <Eye className="mr-2 w-6 h-6 text-sky-600" /> : <Plus className="mr-2 w-6 h-6 text-sky-600" />}
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition p-1 rounded-full hover:bg-gray-100">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cuerpo del Formulario */}
                <div className="space-y-4">
                    {/* Campo Cliente */}
                    <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1 items-center"><User className="mr-1 w-4 h-4 text-sky-500"/> Nombre del Cliente</label>
                        <input
                            id="client"
                            name="client"
                            type="text"
                            value={formData.client}
                            onChange={handleChange}
                            placeholder="Ej: Juan Pérez"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 shadow-sm"
                        />
                    </div>
                    
                    {/* Campo Descripción */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 items-center"><FileText className="mr-1 w-4 h-4 text-sky-500"/> Descripción del Pedido</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Detalle completo de la solicitud del cliente (ej: color, talla, modelo, especificaciones...)"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 shadow-sm"
                        ></textarea>
                    </div>

                    {/* Fila: Valor, Fecha y Estado */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Campo Valor */}
                        <div>
                            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1 items-center"><DollarSign className="mr-1 w-4 h-4 text-sky-500"/> Valor (Q)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">Q</span>
                                <input
                                    id="value"
                                    name="value"
                                    type="text"
                                    value={formData.value}
                                    onChange={handleValueChange}
                                    placeholder="0.00"
                                    className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 shadow-sm"
                                />
                            </div>
                        </div>
                        
                        {/* Campo Fecha */}
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 items-center"><Calendar className="mr-1 w-4 h-4 text-sky-500"/> Fecha de Solicitud</label>
                            <input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 shadow-sm"
                            />
                        </div>

                        {/* Campo Estado */}
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1 items-center"><Tag className="mr-1 w-4 h-4 text-sky-500"/> Estado</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 text-sm font-semibold transition duration-200 shadow-sm
                                    ${getStatusClasses(formData.status)}`}
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status} className="bg-white text-gray-900">
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Botones de Acción */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-150 shadow-md"
                        disabled={isLoading}
                    >
                        <X className="mr-2 w-4 h-4" /> Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 shadow-md"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 w-4 h-4" />
                        )}
                        {isEditing ? 'Guardar Cambios' : 'Crear Cotización'}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL (App) ---

const App: React.FC = () => {
    // ESTADOS DE MENSAJERÍA
    const [messages, setMessages] = useState<Message[]>([]);
    
    const dismissMessage = useCallback((id: number) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    }, []);

    const showMessage = useCallback((text: string, type: Message['type'] = 'info') => {
        const id = Date.now();
        const newMessage = { id, text, type };
        setMessages(prev => [...prev, newMessage]);
        setTimeout(() => dismissMessage(id), 5000);
    }, [dismissMessage]);

    // ESTADOS DE PEDIDOS
    const [orders, setOrders] = useState(mockOrders); 

    // ESTADOS PARA EL MODAL
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingOrder, setEditingOrder] = useState<CustomOrder | undefined>(undefined);

    // LÓGICA DE AGREGAR / ACTUALIZAR PEDIDO (desde el modal)
    const handleAddOrUpdateOrder = (order: CustomOrder, isNew: boolean) => {
        if (isNew) {
            setOrders(prev => [order, ...prev]);
        } else {
            setOrders(prevOrders => prevOrders.map(o => 
                o.id === order.id ? order : o
            ));
        }
    };

    // FUNCIÓN: Manejar el cambio de estado desde el selector de la tabla
    const handleStatusChange = (orderId: number, newStatus: CustomOrder['status']) => {
        setOrders(prevOrders => prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        showMessage(`Estado del Pedido ID ${orderId} actualizado a: ${newStatus}`, 'info');
    };

    // FUNCIÓN: Cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingOrder(undefined);
    };

    // FUNCIÓN: Abre el modal para AÑADIR (Crear Nueva Cotización)
    const handleCreateQuotation = () => {
        setEditingOrder(undefined); // Asegura que no está en modo edición
        setIsModalOpen(true);
    };
    
    // FUNCIÓN: Abre el modal para VER/EDITAR
    const handleViewOrder = (order: CustomOrder) => {
        setEditingOrder(order);
        setIsModalOpen(true);
    };
    return (
        <div className="p-4 sm:p-8 bg-gray-100 min-h-screen font-sans text-gray-900">
            <div className="max-w-7xl mx-auto">
                
                {/* Título y Descripción */}
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 flex items-center text-gray-900">
                    <ShoppingCart className="mr-3 w-6 h-6 text-sky-600" /> Gestión de Pedidos Personalizados
                </h1>
                <p className="text-gray-600 mb-6 border-b border-gray-200 pb-4">
                    Gestión y seguimiento de pedidos especiales, desde la solicitud inicial hasta la entrega final.
                </p>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button 
                        className="flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition duration-150 shadow-md hover:shadow-lg transform hover:scale-[1.01]"
                        onClick={handleCreateQuotation}
                    >
                        <Plus className="mr-2 w-5 h-5" /> Crear Nuevo Pedido
                    </button>
                </div>

                {/* Sección de la Tabla de Pedidos Activos */}
                <section className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pedidos Activos</h2>
                    
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción Breve</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-sky-50 transition duration-150">
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{order.id}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                            <User className="mr-2 w-4 h-4 text-sky-500"/> {order.client}
                                        </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                        <td className="px-4 sm:px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{order.description}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-cyan-700">{order.value}</td>
                                        
                                        {/* Selector de Estado */}
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value as CustomOrder['status'])}
                                                className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full cursor-pointer appearance-none outline-none border-2 transition duration-200
                                                    ${getStatusClasses(order.status)}`}
                                                style={{ minWidth: '120px' }}
                                            >
                                                {statusOptions.map(status => (
                                                    <option 
                                                        key={status} 
                                                        value={status} 
                                                        className="bg-white text-gray-900" 
                                                    >
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        {/* Acciones */}
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <button
                                                title="Ver Detalles"
                                                onClick={() => handleViewOrder(order)}
                                                className="text-sky-600 hover:text-white p-2 rounded-full bg-sky-100 hover:bg-sky-600 transition duration-150 shadow-sm"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                
                {/* Renderizar el Modal aquí */}
                <OrderFormModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    isEditing={!!editingOrder}
                    initialData={editingOrder}
                    onSave={handleAddOrUpdateOrder}
                    showMessage={showMessage}
                />
            </div>
            {/* Componente de mensajes de notificación (Reemplazo de alert) */}
            <MessageBox messages={messages} dismissMessage={dismissMessage} />
        </div>
    );
};

export default App;

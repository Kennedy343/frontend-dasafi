//Gestion de Inventario 
import React, { useState, useCallback, useEffect } from 'react';
// Íconos reemplazados: FaBoxes, FaPlus, FaSearch, FaEdit, FaTrashAlt, FaTimes, FaSave
import { Boxes, Plus, Search, Edit, Trash2, X, Save, Package, Tag, Loader2, List, ClipboardCopy } from 'lucide-react';

// --- INTERFACES Y DATOS ---

// Tipos de categorías disponibles
const categoryOptions = ['Anillos', 'Collares', 'Pulseras', 'Relojes', 'Accesorios', 'Otros'] as const;
type ProductCategory = typeof categoryOptions[number];

interface Product {
    id: number;
    sku: string;
    name: string;
    category: ProductCategory | string; // Permitir string si se añade una nueva
    stock: number;
    price: number;
}

const mockInventory: Product[] = [
    { id: 1, sku: 'R001', name: 'Anillo de Zafiro', category: 'Anillos', stock: 15, price: 550.00 },
    { id: 2, sku: 'C105', name: 'Cadena de Oro 18K', category: 'Collares', stock: 5, price: 1200.00 },
    { id: 3, sku: 'B203', name: 'Brazalete de Cuero', category: 'Pulseras', stock: 50, price: 45.00 },
    { id: 4, sku: 'W401', name: 'Reloj Cronógrafo Acero', category: 'Relojes', stock: 2, price: 899.99 },
];

// --- COMPONENTE DE UTILIDAD: Message Queue y MessageBox (Reemplaza alert/confirm) ---

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

// Hook para manejar la cola de mensajes
const useMessageQueue = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    
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

// --- COMPONENTE MODAL: ProductFormModal ---

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEditing: boolean;
    initialData?: Product;
    onSave: (product: Product, isNew: boolean) => void;
    showMessage: (text: string, type?: Message['type']) => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, isEditing, initialData, onSave, showMessage }) => {
    
    // El formulario solo necesita las propiedades editables, no el ID para el estado inicial
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        sku: initialData?.sku || '',
        name: initialData?.name || '',
        category: initialData?.category || categoryOptions[0],
        stock: initialData?.stock || 0,
        price: initialData?.price || 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    // Sincronizar el formulario cuando se abre el modal o cambian los datos iniciales
    useEffect(() => {
        if (isOpen) {
            setFormData({
                sku: initialData?.sku || '',
                name: initialData?.name || '',
                category: initialData?.category || categoryOptions[0],
                stock: initialData?.stock || 0,
                price: initialData?.price || 0,
            });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const title = isEditing ? `Editar Producto: ${initialData?.name || 'N/A'}` : 'Añadir Nuevo Producto';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        // Manejar stock y price como números, otros como strings
        setFormData(prev => ({
            ...prev,
            [name]: (type === 'number' || name === 'stock' || name === 'price') ? parseFloat(value) : value,
        }));
    };
    
    const handleSave = () => {
        // Validación básica
        if (!formData.sku || !formData.name || !formData.category || isNaN(formData.stock) || isNaN(formData.price)) {
            showMessage('Por favor, rellena todos los campos correctamente.', 'error');
            return;
        }

        setIsLoading(true);

        // Simulación de guardado asíncrono
        setTimeout(() => {
            setIsLoading(false);
            
            // Construir el objeto de producto final
            const newOrUpdatedProduct: Product = {
                ...initialData, // Mantiene el ID si es edición
                ...formData,
                id: isEditing ? (initialData?.id || 0) : Date.now() + Math.floor(Math.random() * 1000), // Genera ID si es nuevo
            } as Product;

            onSave(newOrUpdatedProduct, !isEditing);
            
            showMessage(isEditing ? `Producto ${newOrUpdatedProduct.sku} actualizado.` : '¡Nuevo Producto añadido al inventario!', 'success');
            onClose();
        }, 800);
    };

    return (
        // Overlay (Fondo claro transparente)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70 backdrop-blur-sm p-4">
            <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100 text-gray-900">
                
                {/* Encabezado del Modal */}
                <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                    <h3 className="text-2xl font-bold flex items-center">
                        {isEditing ? <Edit className="mr-2 w-6 h-6 text-sky-600" /> : <Plus className="mr-2 w-6 h-6 text-sky-600" />}
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition p-1 rounded-full hover:bg-gray-100">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cuerpo del Formulario */}
                <div className="space-y-4">
                    {/* Campo Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 items-center"><List className="mr-1 w-4 h-4 text-sky-600"/> Nombre del Producto</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej: Anillo de Zafiro"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 shadow-sm"
                        />
                    </div>
                    
                    {/* Fila: SKU y Categoría */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Campo SKU */}
                        <div>
                            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1 items-center"><ClipboardCopy className="mr-1 w-4 h-4 text-sky-600"/> SKU/Referencia</label>
                            <input
                                id="sku"
                                name="sku"
                                type="text"
                                value={formData.sku}
                                onChange={handleChange}
                                placeholder="Ej: R001"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 shadow-sm"
                            />
                        </div>
                        
                        {/* Campo Categoría */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 items-center"><Tag className="mr-1 w-4 h-4 text-sky-600"/> Categoría</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 shadow-sm appearance-none pr-8"
                            >
                                {categoryOptions.map(category => (
                                    <option key={category} value={category} className="bg-white text-gray-900">
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Fila: Stock y Precio */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Campo Stock */}
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1 items-center"><Package className="mr-1 w-4 h-4 text-sky-600"/> Cantidad en Stock</label>
                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                min="0"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 shadow-sm"
                            />
                        </div>
                        
                      {/* Campo Precio */}
<div>
    {/* Cambiado: Eliminado el icono DollarSign y añadido "Q:" como texto. */}
    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 items-center">
        <span className="text-sky-600 font-bold mr-1">Q:</span> 
        Precio Unitario
    </label>
    <input
        id="price"
        name="price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        min="0"
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 bg-white text-gray-900 shadow-sm"
    />
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
                        {isEditing ? 'Guardar Cambios' : 'Añadir Producto'}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL: InventoryView (Reemplaza alert/confirm) ---

const InventoryView: React.FC = () => {
    
    // 1. Estados de Inventario
    const [products, setProducts] = useState<Product[]>(mockInventory);
    const [searchTerm, setSearchTerm] = useState('');
    
    // 2. Estados para el Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

    // 3. Estados de Mensajería (Reemplazo de alert/confirm)
    const { messages, showMessage } = useMessageQueue();
    const [confirmAction, setConfirmAction] = useState<{ id: number; message: string; action: () => void } | null>(null);


    // LÓGICA DE AGREGAR / ACTUALIZAR PRODUCTO
    const handleAddOrUpdateProduct = (product: Product, isNew: boolean) => {
        if (isNew) {
            setProducts(prev => [product, ...prev]);
        } else {
            setProducts(prevProducts => prevProducts.map(p => 
                p.id === product.id ? product : p
            ));
        }
    };

    // FUNCIÓN: Cerrar el modal (limpia edición)
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(undefined); 
    };

    // FUNCIÓN: Abre el modal para AÑADIR
    const handleAddProduct = () => {
        setEditingProduct(undefined); // Modo Añadir
        setIsModalOpen(true);
    };

    // FUNCIÓN: Abre el modal para EDITAR
    const handleEdit = (id: number) => {
        const productToEdit = products.find(p => p.id === id);
        if (productToEdit) {
            setEditingProduct(productToEdit); // Carga datos para edición
            setIsModalOpen(true);
        } else {
            showMessage('Producto no encontrado para editar.', 'error');
        }
    };

    // FUNCIÓN: Iniciar el proceso de eliminación (usa el modal de confirmación)
    const handleDeleteConfirmation = (id: number, name: string) => {
        const action = () => {
            setProducts(prev => prev.filter(p => p.id !== id));
            showMessage(`Producto ID ${id} (${name}) eliminado.`, 'success');
            setConfirmAction(null); // Cerrar modal de confirmación
        };
        
        setConfirmAction({
            id,
            message: `¿Estás seguro de eliminar el producto: "${name}" (ID: ${id})? Esta acción no se puede deshacer.`,
            action,
        });
    };
    
    // Lógica de búsqueda simulada
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // COMPONENTE IN-LINE: Modal de Confirmación
    const ConfirmationModal = () => {
        if (!confirmAction) return null;
        
        return (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-110 p-4">
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
                    <Boxes className="mr-3 w-6 h-6 text-sky-600" /> Gestión de Inventario
                </h1>
                <p className="text-gray-600 mb-6 border-b border-gray-200 pb-4">
                    Control y seguimiento del stock de productos, precios y categorías.
                </p>

                {/* Bloque de Búsqueda y Acciones */}
                <div className="bg-white p-4 rounded-xl shadow-lg mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border border-gray-200">
                    
                    {/* Campo de Búsqueda */}
                    <div className="flex items-center grow max-w-full sm:max-w-md">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por nombre o SKU..."
                            className="p-3 rounded-l-lg border border-r-0 border-gray-300 bg-white text-gray-900 focus:ring-sky-500 focus:border-sky-500 w-full shadow-sm"
                        />
                        <button
                            onClick={() => showMessage(`Buscando: ${searchTerm}`, 'info', 3000)}
                            className="bg-sky-600 hover:bg-sky-700 text-white p-3 rounded-r-lg transition duration-150"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Botón Añadir Nuevo Producto */}
                    <button
                        onClick={handleAddProduct} // Llama a la función que abre el modal
                        className="flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-150 shadow-md hover:shadow-lg transform hover:scale-[1.01] sm:ml-auto"
                    >
                        <Plus className="mr-2 w-5 h-5" /> Añadir Nuevo Producto
                    </button>
                </div>

                {/* Sección de la Tabla de Inventario */}
                <section className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Productos en Stock</h2>
                    
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-sky-50 transition duration-150">
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{product.sku}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-sky-600">{product.category}</td>
                                        
                                        {/* Stock con color dinámico */}
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-bold">
                                            <span className={`px-3 py-1 rounded-full ${product.stock < 10 
                                                ? 'bg-orange-100 text-orange-800' // Tema claro para stock bajo
                                                : 'bg-green-100 text-green-800'}` // Tema claro para stock normal
                                            }>
                                                {product.stock}
                                            </span>
                                        </td>
                                        
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-green-700">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        
                                        {/* Acciones */}
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <button
                                                title="Editar Producto"
                                                onClick={() => handleEdit(product.id)}
                                                className="text-sky-600 hover:text-white p-2 rounded-full bg-sky-100 hover:bg-sky-600 transition duration-150 shadow-sm"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            
                                            <button
                                                title="Eliminar Producto"
                                                onClick={() => handleDeleteConfirmation(product.id, product.name)}
                                                className="text-red-600 hover:text-white p-2 rounded-full bg-red-100 hover:bg-red-600 transition duration-150 ml-2 shadow-sm"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredProducts.length === 0 && (
                             <div className="text-center py-8 text-gray-500">
                                 No se encontraron productos que coincidan con la búsqueda.
                             </div>
                        )}
                    </div>
                </section>
                
                {/* Renderizar el Modal de Formulario */}
                <ProductFormModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    isEditing={!!editingProduct}
                    initialData={editingProduct}
                    onSave={handleAddOrUpdateProduct}
                    showMessage={showMessage}
                />
            </div>
            {/* Renderizar el Modal de Confirmación */}
            <ConfirmationModal />
            
            {/* Componente de mensajes de notificación (Reemplazo de alert) */}
            <MessageBox messages={messages} dismissMessage={useMessageQueue().dismissMessage} />
        </div>
    );
};

export default InventoryView;

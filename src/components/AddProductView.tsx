// src/components/AddProductView.tsx (CÓDIGO CORREGIDO: Soluciona el error de TypeScript en Notification)
// ingreso de nuevos productos

import React, { useState, useEffect } from 'react';
import type { JSX } from 'react/jsx-runtime';

// --- ÍCONOS SVG EN LÍNEA (Reemplazo de react-icons/fa) ---
const IconPlusCircle = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>);
const IconSave = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>);
const IconAlert = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>);
const IconCheck = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const IconX = (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>);

// 🛑 AÑADIDO: Interfaz para tipar las propiedades de Notification (Soluciona el error)
interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info'; // Definimos los tipos de notificación posibles
    onClose: () => void; // Función que no devuelve nada
}

// --- Componente de Notificación Temporal ---
// 🛑 CORRECCIÓN: Asignamos la interfaz al componente
const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    const baseClasses = "fixed top-5 right-5 p-4 rounded-lg shadow-lg flex items-center transition-all duration-300 transform z-50";
    let styleClasses = "";
    let Icon = IconAlert;

    switch (type) {
        case 'success':
            styleClasses = "bg-green-500 text-white";
            Icon = IconCheck;
            break;
        case 'error':
            styleClasses = "bg-red-500 text-white";
            Icon = IconAlert;
            break;
        case 'info': // Añadimos 'info' si usas el default, o lo cambiamos a 'success' para el default
        default:
            styleClasses = "bg-blue-500 text-white";
            Icon = IconCheck;
    }

    return (
        <div className={`${baseClasses} ${styleClasses}`}>
            <Icon className="w-6 h-6 mr-3" />
            <span className="font-medium text-sm">{message}</span>
            <button onClick={onClose} className="ml-4 opacity-75 hover:opacity-100">
                <IconX className="w-5 h-5" />
            </button>
        </div>
    );
};


// --- DATOS DE EJEMPLO ---
const mockCategories = [
    'Anillos', 
    'Collares', 
    'Pulseras', 
    'Relojes', 
    'Personalizado (Cotización)'
];

// Definimos los estilos de entrada para reutilizar (Fondo blanco, texto oscuro)
const inputClasses = "w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-sky-500 focus:border-sky-500 shadow-sm transition duration-150";


const AddProductView = () => {
    // Estados del formulario (simulados)
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [cost, setCost] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // Estado de la notificación (Ajustamos el tipo implícito a 'success' | 'error' | 'info')
    const [notification, setNotification] = useState<{ show: boolean, message: string, type: 'success' | 'error' | 'info' }>({ 
        show: false, 
        message: '', 
        type: 'success' 
    });

    // Cierra la notificación después de 4 segundos
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notification.show]);


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        // Validación básica
        if (!name || !sku || !category || !price) {
            // Reemplazo de alert() por Notification de error
            setNotification({ 
                show: true, 
                message: 'Error: Por favor, completa todos los campos esenciales (Nombre, SKU, Categoría y Precio de Venta).', 
                type: 'error' 
            });
            return;
        }

        // Simulación de guardado
        console.log("Producto guardado:", { name, sku, category, stock, cost, price, description });
        
        // Reemplazo de alert() por Notification de éxito
        setNotification({ 
            show: true, 
            message: `¡Éxito! Producto "${name}" (SKU: ${sku}) guardado.`, 
            type: 'success' 
        });

        // Limpiar formulario (opcional)
        setName('');
        setSku('');
        setCategory('');
        setStock(0);
        setCost('');
        setPrice('');
        setDescription('');
    };

    return (
        // Contenedor principal con fondo gris claro y padding
        <div className="p-4 sm:p-10 bg-gray-100 min-h-screen font-sans">
            
            <div className="max-w-4xl mx-auto">
                {/* Título Principal */}
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold mb-2 flex items-center text-gray-900">
                        <IconPlusCircle className="mr-3 w-8 h-8 text-sky-600" /> 
                        Ingresar Nuevo Producto
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Define el stock, precios y detalles del nuevo artículo para el inventario.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Bloque 1: Detalles Esenciales y Categoría */}
                    <section className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">Información del Producto</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Campo 1: Nombre del Producto */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 text-sm">Nombre del Producto</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ej: Anillo de Compromiso 'Luna'"
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            
                            {/* Campo 2: Código SKU / Referencia */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 text-sm">Código SKU / Referencia</label>
                                <input
                                    type="text"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    placeholder="Ej: R001XT"
                                    className={inputClasses}
                                    required
                                />
                            </div>

                            {/* Campo 3: Categoría (Dropdown) */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 text-sm">Categoría</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={`${inputClasses} appearance-none`}
                                    required
                                >
                                    <option value="" disabled>-- Selecciona una categoría --</option>
                                    {mockCategories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Campo 4: Stock Inicial */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 text-sm">Stock Inicial</label>
                                <input
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(Number(e.target.value))}
                                    min="0"
                                    className={inputClasses}
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Bloque 2: Precios y Costos */}
                    <section className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">Control Financiero</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Campo 5: Costo Unitario */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 text-sm">Costo Unitario (sin IVA)</label>
                                <div className="relative">
                                    {/* Símbolo Q de Quetzal */}
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">Q</span>
                                    <input
                                        type="text"
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value.replace(/[^0-9.]/g, ''))} // Limpia caracteres no numéricos
                                        placeholder="10.00"
                                        className={`${inputClasses} pl-7`}
                                    />
                                </div>
                            </div>
                            
                            {/* Campo 6: Precio de Venta */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2 text-sm">Precio de Venta (al público)</label>
                                <div className="relative">
                                    {/* Símbolo Q de Quetzal */}
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">Q</span>
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))} // Limpia caracteres no numéricos
                                        placeholder="19.99"
                                        className={`${inputClasses} pl-7`}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Bloque 3: Descripción Detallada (Campo completo) */}
                    <section className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">Descripción y Notas</h2>
                        
                        {/* Campo 7: Descripción */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2 text-sm">Descripción Detallada (Materiales, Medidas, etc.)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                placeholder="Detalles técnicos, materiales (ej: Plata 925, Zirconia Cúbica), compatibilidad..."
                                className={`${inputClasses} resize-none`}
                            ></textarea>
                        </div>
                    </section>

                    {/* Botón de Guardar */}
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="flex items-center justify-center mx-auto bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-10 rounded-full text-lg transition duration-150 shadow-xl transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-sky-300"
                        >
                            <IconSave className="mr-3 w-5 h-5" /> Guardar Producto
                        </button>
                    </div>
                </form>

                {/* Muestra la notificación si está activa */}
                {notification.show && (
                    <Notification 
                        message={notification.message} 
                        type={notification.type} 
                        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
                    />
                )}
            </div>
        </div>
    );
};

export default AddProductView;
// src/components/AddProductView.tsx (Con Tailwind CSS)
import React, { useState } from 'react';
import { FaPlusCircle, FaSave } from 'react-icons/fa';

// Datos de ejemplo para las opciones de Categoría
const mockCategories = [
    'Anillos', 
    'Collares', 
    'Pulseras', 
    'Relojes', 
    'Personalizado (Cotización)'
];

const AddProductView: React.FC = () => {
    // Estados del formulario (simulados)
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [cost, setCost] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validaciones básicas
        if (!name || !sku || !category || !price) {
            alert('Por favor, completa todos los campos esenciales.');
            return;
        }

        // Simulación de guardado
        console.log({ name, sku, category, stock, cost, price, description });
        alert(`Producto "${name}" guardado en el inventario.`);

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
        // Contenedor principal con fondo oscuro y padding
        <div className="p-8 bg-dark-bg min-h-screen text-gray-100">
            
            {/* Título Principal */}
            <h1 className="text-3xl font-bold mb-2 flex items-center text-white">
                <FaPlusCircle className="mr-3 text-sky-400" /> Ingresar Nuevo Producto al Inventario
            </h1>
            <p className="text-gray-400 mb-8">
                Utiliza este formulario para registrar un nuevo artículo, definiendo su stock inicial y precios y detalles.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Bloque 1: Detalles Esenciales */}
                <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">Detalles Esenciales</h2>
                    
                    {/* Cuadrícula de 2 columnas para campos esenciales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Campo 1: Nombre del Producto */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">Nombre del Producto</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ej: Anillo de Compromiso"
                                className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500"
                                required
                            />
                        </div>
                        
                        {/* Campo 2: Código SKU / Referencia */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">Código SKU / Referencia</label>
                            <input
                                type="text"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                placeholder="Ej: R001XT"
                                className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500"
                                required
                            />
                        </div>

                        {/* Campo 3: Categoría (Dropdown) */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">Categoría</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500 appearance-none"
                                required
                            >
                                <option value="">Selecciona una categoría</option>
                                {mockCategories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Campo 4: Stock Inicial */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">Stock Inicial</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                min="0"
                                className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500"
                                required
                            />
                        </div>
                    </div>
                </section>

                {/* Bloque 2: Precios y Costos */}
                <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">Precios y Costos</h2>

                    {/* Cuadrícula de 2 columnas para precios */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Campo 5: Costo Unitario */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">$ Costo Unitario</label>
                            <input
                                type="text" // Usar text para permitir símbolos, validar formato después
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                placeholder="10.00"
                                className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>
                        
                        {/* Campo 6: Precio de Venta */}
                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">$ Precio de Venta</label>
                            <input
                                type="text" // Usar text para permitir símbolos, validar formato después
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="19.99"
                                className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500"
                                required
                            />
                        </div>
                    </div>
                </section>
                
                {/* Bloque 3: Descripción Detallada (Campo completo) */}
                <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-2">Descripción Detallada</h2>
                    
                    {/* Campo 7: Descripción */}
                    <div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            placeholder="Detalles técnicos, compatibilidad, materiales..."
                            className="w-full p-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500 resize-none"
                        ></textarea>
                    </div>
                </section>

                {/* Botón de Guardar */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="flex items-center justify-center mx-auto bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-150 shadow-lg"
                    >
                        <FaSave className="mr-3" /> Guardar Producto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductView;
// src/components/InventoryView.tsx (Con Tailwind CSS)
import React, { useState } from 'react';
import { FaBoxes, FaPlus, FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';

// --- INTERFACES Y DATOS ---

interface Product {
    id: number;
    sku: string;
    name: string;
    category: string;
    stock: number;
    price: number;
}

const mockInventory: Product[] = [
    { id: 1, sku: 'R001', name: 'Anillo de Zafiro', category: 'Anillos', stock: 15, price: 550.00 },
    { id: 2, sku: 'C105', name: 'Cadena de Oro 18K', category: 'Collares', stock: 5, price: 1200.00 },
    { id: 3, sku: 'B203', name: 'Brazalete de Cuero', category: 'Pulseras', stock: 50, price: 45.00 },
    { id: 4, sku: 'W401', name: 'Reloj Cronógrafo Acero', category: 'Relojes', stock: 2, price: 899.99 },
];

// --- COMPONENTE PRINCIPAL (InventoryView) ---

const InventoryView: React.FC = () => {
    const [products, setProducts] = useState(mockInventory);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        alert(`Buscando producto: ${searchTerm}`);
        // Aquí iría la lógica de filtrado real
    };

    const handleAddProduct = () => {
        // En un dashboard real, esto navegaría a AddProductView o abriría un modal
        alert('Navegando a la vista de "Ingresar Productos"...');
    };

    const handleEdit = (id: number) => {
        alert(`Editando producto ID: ${id}`);
    };

    const handleDelete = (id: number) => {
        const isConfirmed = window.confirm(`¿Estás seguro de eliminar el producto ID: ${id}?`);
        if (isConfirmed) {
            setProducts(prev => prev.filter(p => p.id !== id));
            alert(`Producto ID ${id} eliminado.`);
        }
    };

    return (
        <div className="p-8 bg-dark-bg min-h-screen text-gray-100">
            
            {/* Título y Descripción */}
            <h1 className="text-3xl font-bold mb-2 flex items-center text-white">
                <FaBoxes className="mr-3 text-sky-400" /> Gestión de Inventario
            </h1>
            <p className="text-gray-400 mb-6">
                Control y seguimiento del stock de productos, precios y categorías.
            </p>

            {/* Bloque de Búsqueda y Acciones */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-8 flex flex-wrap items-center gap-4">
                
                {/* Campo de Búsqueda */}
                <div className="flex items-center flex-grow max-w-sm">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nombre o SKU..."
                        className="p-2 rounded-l-md border border-r-0 border-gray-600 bg-gray-900 text-white focus:ring-sky-500 focus:border-sky-500 w-full"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-r-md transition duration-150"
                    >
                        <FaSearch className="w-5 h-5" />
                    </button>
                </div>

                {/* Botón Añadir Nuevo Producto */}
                <button
                    onClick={handleAddProduct}
                    className="flex items-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ml-auto"
                >
                    <FaPlus className="mr-2" /> Añadir Nuevo Producto
                </button>
            </div>

            {/* Sección de la Tabla de Inventario */}
            <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-4 text-white">Productos en Stock</h2>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">SKU</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Categoría</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Precio</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-700 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{product.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-300">{product.sku}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sky-400">{product.category}</td>
                                    
                                    {/* Stock con color dinámico (ejemplo: si es bajo) */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold">
                                        <span className={product.stock < 10 ? 'text-orange-500' : 'text-green-500'}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-green-400">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    
                                    {/* Acciones */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button
                                            title="Editar Producto"
                                            onClick={() => handleEdit(product.id)}
                                            className="text-sky-400 hover:text-sky-500 p-2 rounded-full transition duration-150"
                                        >
                                            <FaEdit className="w-5 h-5" />
                                        </button>
                                        
                                        <button
                                            title="Eliminar Producto"
                                            onClick={() => handleDelete(product.id)}
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
            </section>
        </div>
    );
};

export default InventoryView;
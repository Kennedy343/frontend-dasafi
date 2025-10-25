// src/components/catalogo/ProductCard.tsx

import React from 'react';
import type { Product } from '../../types/product';
// Necesitas instalar: npm install react-icons
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';

interface ProductCardProps {
  product: Product; // Ahora acepta un objeto Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
      {/* Contenedor de Imagen y Favorito */}
      <div className="relative h-64 w-full">
        <img
          src={product.imagenUrl}
          alt={product.descripcion}
          className="w-full h-full object-cover"
        />
        
        {/* Icono de Favorito */}
        <button
          className="absolute top-3 right-3 p-2 bg-white/50 backdrop-blur-sm rounded-full text-gray-800 hover:text-red-500 transition"
          aria-label="Añadir a favoritos"
        >
          <AiOutlineHeart size={20} />
        </button>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-4 flex flex-col">
        <p className="text-xl font-bold text-gray-800">Q{product.precio}</p>
        <p className="text-sm text-gray-600 mb-3">{product.descripcion}</p>

        {/* Colores y Carrito */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {product.coloresDisponibles.map((colorClass, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full ${colorClass} border-2 border-white ring-1 ring-gray-300 cursor-pointer`}
                title={colorClass.replace('bg-', '')}
              ></div>
            ))}
          </div>
          
          {/* Botón de Carrito */}
          <button
            className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            aria-label="Añadir al carrito"
          >
            <AiOutlineShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
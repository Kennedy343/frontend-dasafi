// src/components/catalogo/ProductGrid.tsx

import React from 'react';
import ProductCard from './ProductCard'; // Importa el componente renombrado
import type { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[]; // Cambiado a 'products' genérico
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    // Tailwind grid: 3 columnas en desktop, espaciado de 6
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} /> // Pasa el producto
      ))}
    </div>
  );
};

export default ProductGrid;
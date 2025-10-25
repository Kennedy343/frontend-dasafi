// src/pages/CatalogoPage.tsx

import React from 'react';
import Header from '../../components/layout/Header';
import ProductGrid from '../../components/catalogo/ProductGrid';
import { productosAnillos } from '../../types/product'; // Importamos los datos tipados

const CatalogoPage: React.FC = () => {
  const productos = productosAnillos; // Datos simulados
  const titulo = "Anillos"; 

  return (
    <div className="min-h-screen bg-gray-50"> 
      <Header />
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado: Catalogo (Anillos) */}
        
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          {titulo}
        </h1>
        
        {/* Usamos el componente genérico con los datos tipados */}
        <ProductGrid products={productos} />
      </main>
    </div>
  );
};

export default CatalogoPage;
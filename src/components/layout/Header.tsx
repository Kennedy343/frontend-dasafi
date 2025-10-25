// src/components/layout/Header.tsx

import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const navItems: { name: string; href: string }[] = [
  { name: 'Inicio', href: '#' },
  { name: 'Servicio de taller', href: '#' },
  { name: 'Personalizar pedido', href: '#' },
];

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm">
      {/* CAMBIO 1: Aumentamos la altura del contenedor interno del header a h-24 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex justify-between items-center"> 
        
        {/* Logo y Navegación */}
        <div className="flex items-center space-x-10">
          
          <a href="/" className="cursor-pointer">
            <img 
              src="public\logodasafi.png" 
              alt="Dasafi Joyería Logo"
              // CAMBIO 2: Aumentamos el tamaño del logo a h-14
              className="h-14 w-auto" // Puedes probar con h-16 si lo necesitas aún más grande
            />
          </a>

          <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-700">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="hover:text-purple-600 transition"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Ícono de Carrito */}
        <button className="relative p-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
          <AiOutlineShoppingCart className="text-white" size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
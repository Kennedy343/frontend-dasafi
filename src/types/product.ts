// src/types/product.ts

export interface Product {
  id: number;
  precio: number; // Q (Quetzales)
  descripcion: string; // Ejemplo: 'Anillo de plata con diamante'
  imagenUrl: string; // URL o path local de la imagen
  coloresDisponibles: string[]; // Clases de color de Tailwind (ej: 'bg-blue-900')
}

// --- Datos de Prueba Simulados ---
export const productosAnillos: Product[] = [
  {
    id: 1,
    precio: 350,
    descripcion: 'Arete de plata con diamante',
    imagenUrl: '/images/anillo1.jpg',
    coloresDisponibles: ['bg-blue-900', 'bg-teal-500', 'bg-sky-400'],
  },
  {
    id: 2,
    precio: 350,
    descripcion: 'Anillo con piedra natural',
    imagenUrl: '/images/anillo2.jpg',
    coloresDisponibles: ['bg-gray-800', 'bg-red-700', 'bg-lime-400'],
  },
  {
    id: 3,
    precio: 350,
    descripcion: 'Dúo de anillos entrelazados',
    imagenUrl: '/images/anillo3.jpg',
    coloresDisponibles: ['bg-yellow-600', 'bg-pink-700'],
  },
  {
    id: 4,
    precio: 350,
    descripcion: 'Pulsera de cadena gruesa',
    imagenUrl: '/images/anillo4.jpg',
    coloresDisponibles: ['bg-blue-900', 'bg-teal-500', 'bg-sky-400'],
  },
  {
    id: 5,
    precio: 350,
    descripcion: 'Anillo apilable moderno',
    imagenUrl: '/images/joyac3.jpg',
    coloresDisponibles: ['bg-neutral-800', 'bg-gray-300'],
  },
  {
    id: 6,
    precio: 350,
    descripcion: 'Dije colgante con piedra',
    imagenUrl: '/images/joyac4.jpg',
    coloresDisponibles: ['bg-blue-900', 'bg-teal-500', 'bg-sky-400'],
  },
];
// src/App.jsx


import CatalogoPage from './pages/catalogo/CatalogoPage'; // Asegúrate de que la ruta sea correcta

// NOTA: Para que Tailwind funcione, asegúrate de que tu index.css (o similar) 
// esté importando las directivas de Tailwind y que App.jsx se renderice en tu index.js.

function App() {
  return (
    // Aplicamos una clase oscura al fondo para simular el diseño original
    // del fondo del body/html
    <div className="bg-gray-900 min-h-screen"> 
      {/* El CatalogoPage contiene el Header y todo el contenido del catálogo */}
      <CatalogoPage />
      
      {/* Si el diseño final requiere un Footer global, iría aquí, 
        fuera del CatalogoPage, o dentro de él si es específico de la vista.
      */}
    </div>
  );
}

export default App;
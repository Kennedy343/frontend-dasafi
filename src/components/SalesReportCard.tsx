// src/components/SalesReportCard.tsx (CÓDIGO CORREGIDO para Texto de Ejes Negro)

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesReportCard: React.FC = () => {
  // Datos de ejemplo para la gráfica
  const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Ventas ($)',
        data: [6500, 5900, 8000, 8100, 5600, 5500, 9000],
        fill: true,
        // Usamos un color que contraste con el fondo oscuro del contenedor de la gráfica
        backgroundColor: 'rgba(75, 192, 192, 0.2)', 
        borderColor: 'rgba(75, 192, 192, 1)', 
        tension: 0.3, 
      },
    ],
  };

  // Opciones de la gráfica
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          // 🛑 CORRECCIÓN 1: Color del texto de la leyenda a NEGRO (o gris oscuro)
          color: 'rgb(55, 65, 81)', // Gris oscuro (text-gray-700)
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        // 🛑 CORRECCIÓN 2: Color del texto del eje X a NEGRO
        ticks: {
          color: 'rgb(55, 65, 81)', // Gris oscuro
        },
        grid: {
            color: 'rgba(0, 0, 0, 0.1)', // Líneas de la cuadrícula más tenues y oscuras
            borderColor: 'rgb(55, 65, 81)'
        }
      },
      y: {
        // 🛑 CORRECCIÓN 3: Color del texto del eje Y a NEGRO
        ticks: {
          color: 'rgb(55, 65, 81)', // Gris oscuro
        },
        grid: {
            color: 'rgba(0, 0, 0, 0.1)', // Líneas de la cuadrícula más tenues y oscuras
            borderColor: 'rgb(55, 65, 81)'
        }
      },
    },
  };

  return (
    // Aseguramos que el fondo de la tarjeta sea BLANCO para la gráfica clara
    // Tu código anterior tenía un fondo oscuro ('bg-dark-card'), lo cambiamos a 'bg-white' 
    // para que coincida con la imagen 'image_4bdd04.png' que tiene fondo claro.
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          {/* Título "Ventas Totales" a GRIS OSCURO */}
          <p className="text-sm font-medium text-gray-700 uppercase tracking-wider">Ventas Totales (Últimos 30 días)</p>
          <p className="text-4xl font-bold mt-1 text-green-500">$15,450.00</p>
          <p className="text-xs text-green-600">+12.5% respecto al mes anterior.</p>
        </div>
      </div>
      
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesReportCard;
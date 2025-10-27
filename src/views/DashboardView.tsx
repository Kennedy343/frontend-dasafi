import React, { type FC } from 'react';
// Nota: Hemos eliminado las importaciones de 'recharts' y 'lucide-react' ya que el código usa SVG simulado.

// -------------------- TIPOS DE INTERFAZ --------------------

// Tipo para las propiedades del Icono SVG genérico
interface SvgIconProps {
  // Hacemos 'children' opcional para que los iconos (Package, Clock, etc.) no requieran 
  // que se les pase el path SVG al usarlos en MetricCard.
  children?: React.ReactNode; 
  className?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

// Tipo para las propiedades de las Tarjetas de Métrica
interface MetricCardProps {
  title: string;
  value: string | number;
  // Icon es un componente React que acepta props de SvgIcon
  icon: FC<SvgIconProps>;
  iconColor: string;
}

// -------------------- ICONOS SVG (Simulación de lucide-react) --------------------

// Usamos 'type FC' para evitar el error ts(1484)
const SvgIcon: FC<SvgIconProps> = ({ children, className = 'w-6 h-6', size = 24, strokeWidth = 2, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Aseguramos que 'children' sea de tipo React.ReactNode */}
    {children as React.ReactNode} 
  </svg>
);

// Icono de Caja (Productos en Inventario)
const Package: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="m7.5 4.27 9 5.15" />
    <path d="m21 10.27-9-5.15-9 5.15v3.41" />
    <path d="M3 14.68 12 19.83 21 14.68" />
    <path d="M12 19.83v-3.41" />
  </SvgIcon>
);

// Icono de Reloj (Pedidos Pendientes)
const Clock: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </SvgIcon>
);

// Icono de Calendario (Citas Agendadas)
const Calendar: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </SvgIcon>
);

// Icono de Usuario (Roles)
const User: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </SvgIcon>
);


// -------------------- DATOS ESTÁTICOS --------------------

interface SaleData {
  name: string;
  sales: number;
}
const salesData: SaleData[] = [
  { name: 'S1', sales: 35 },
  { name: 'S2', sales: 18 },
  { name: 'S3', sales: 25 },
  { name: 'S4', sales: 15 },
  { name: 'S5', sales: 20 },
  { name: 'S6', sales: 40 },
  { name: 'S7', sales: 38 },
  { name: 'S8', sales: 45 },
];

interface RoleData {
  role: string;
  users: number;
  access: string;
}
const rolesData: RoleData[] = [
  { role: 'Administrador', users: 2, access: 'Completo' },
  { role: 'Editor', users: 5, access: 'Contenido y Productos' },
  { role: 'Técnico de Taller', users: 12, access: 'Manejo de Citas y Tareas' },
  { role: 'Cliente', users: 89, access: 'Reservas y Perfil' },
];

// -------------------- COMPONENTES DE VISTA --------------------

// Componente de Tarjeta de Métrica (Superior)
const MetricCard: FC<MetricCardProps> = ({ title, value, icon: Icon, iconColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl w-full">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-sm">{title}</h3>
      <Icon className={`w-8 h-8 ${iconColor} opacity-70`} strokeWidth={2.5} />
    </div>
    <p className="text-4xl font-extrabold text-gray-800">{value}</p>
  </div>
);

// Componente del Gráfico de Ventas (Simulación)
const SalesChart: FC = () => {
  // Simulación de un gráfico de línea simple
  const width = 400;
  const height = 150;
  const paddingX = 30;
  const paddingY = 20;

  const innerWidth = width - 2 * paddingX;
  const innerHeight = height - 2 * paddingY;

  const maxSales = 50; // Usamos 50k como máximo fijo para escala
  const minSales = 0;

  // Calcular puntos de la línea
  const points = salesData.map((d, i) => {
    const x = paddingX + (i / (salesData.length - 1)) * innerWidth;
    const y = paddingY + innerHeight - ((d.sales - minSales) / (maxSales - minSales)) * innerHeight;
    // La función toFixed(2) garantiza que los números sean válidos para SVG
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');

  // Líneas de referencia del eje Y (50K, 25K, 0K - simulación)
  const yAxisLabels = [
    { value: '50K', y: paddingY },
    { value: '25K', y: paddingY + innerHeight / 2 },
    { value: '0K', y: paddingY + innerHeight },
  ];

  // Etiquetas del eje X (S1, S2, ...)
  const xAxisLabels = salesData.map((d, i) => {
    const x = paddingX + (i / (salesData.length - 1)) * innerWidth;
    return { value: d.name, x: x };
  });

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Reporte de Ventas (Últimas 8 Semanas)</h3>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width + 10} ${height + 20}`} width="100%" height="auto" preserveAspectRatio="xMinYMin meet">
          {/* Eje Y Líneas y Etiquetas */}
          {yAxisLabels.map((label, index) => (
            <React.Fragment key={index}>
              <text x={paddingX - 5} y={label.y + 5} className="text-xs fill-gray-500 text-right" style={{ fontSize: '8px' }}>
                {label.value}
              </text>
              <line
                x1={paddingX}
                y1={label.y}
                x2={width}
                y2={label.y}
                stroke={index === 2 ? '#374151' : '#E5E7EB'} // Eje base más oscuro
                strokeWidth={index === 2 ? 1 : 0.5}
              />
            </React.Fragment>
          ))}

          {/* Línea del Gráfico */}
          <polyline
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            points={points}
          />

          {/* Puntos de Datos */}
          {salesData.map((d, i) => {
            const x = paddingX + (i / (salesData.length - 1)) * innerWidth;
            const y = paddingY + innerHeight - ((d.sales - minSales) / (maxSales - minSales)) * innerHeight;
            return (
              <circle key={i} cx={x} cy={y} r="4" fill="#2563EB" stroke="white" strokeWidth={1.5} />
            );
          })}

          {/* Eje X Etiquetas */}
          {xAxisLabels.map((label, i) => (
            <text key={i} x={label.x} y={height + 15} textAnchor="middle" className="text-xs fill-gray-500" style={{ fontSize: '8px' }}>
              {label.value}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

// Componente de Tabla de Roles
const RolesTable: FC = () => (
  <div className="p-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Resumen de Gestión de Roles</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">ROL</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">USUARIOS</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">NIVEL DE ACCESO</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rolesData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                <User className="w-4 h-4 text-blue-500 mr-2" strokeWidth={2} />
                {item.role}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.users}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.access}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


// -------------------- COMPONENTE PRINCIPAL APP --------------------

const App: FC = () => {
  // Simulación de los IDs estáticos
  const userId: string = 'Usuario Anónimo';
  const appId: string = 'c_fb3d529804775680_App.tsx-337';

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans">
      
      {/* Encabezado Principal */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Panel de Control Principal
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          ID de Usuario: <span className="font-mono bg-gray-200 p-1 rounded-md text-xs">{userId}</span> | App ID: <span className="font-mono bg-gray-200 p-1 rounded-md text-xs">{appId}</span>
        </p>
      </div>

      {/* 1. Métricas Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="PRODUCTOS EN INVENTARIO"
          value={125}
          icon={Package}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="PEDIDOS PENDIENTES"
          value={15}
          icon={Clock}
          iconColor="text-orange-500"
        />
        <MetricCard
          title="CITAS AGENDADAS"
          value={8}
          icon={Calendar}
          iconColor="text-green-500"
        />
      </div>

      {/* 2. Reportes Inferiores */}
      {/* ELIMINADA: La sección de Acciones Rápidas fue removida según la solicitud. */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna de Gráfico */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
          <SalesChart />
        </div>

        {/* Columna de Roles */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
          <RolesTable />
        </div>
      </div>

      {/* Simulación de la barra de 'Activar Windows' */}
      <div className="fixed bottom-0 right-0 p-2 text-xs text-gray-400 bg-white/90 backdrop-blur-sm shadow-inner border-t border-l border-gray-200 rounded-tl-lg hidden lg:block">
        Activar Windows
        <span className="text-blue-500 ml-1">Ve a Configuración para activar Windows.</span>
      </div>
    </div>
  );
};

export default App;

export const API_BASE_URL = 'http://localhost:8000'

export const MODULES = {
  dashboard: { name: 'Dashboard', icon: 'LayoutDashboard', color: 'blue' },
  articulos: { name: 'Artículos', icon: 'Package', color: 'emerald' },
  clientes: { name: 'Clientes', icon: 'Users', color: 'indigo' },
  ventas: { name: 'Ventas', icon: 'ShoppingCart', color: 'green' },
  mantenimientos: { name: 'Mantenimientos', icon: 'Settings', color: 'orange' },
  ordenes: { name: 'Órdenes', icon: 'FileText', color: 'purple' },
  tecnicos: { name: 'Técnicos', icon: 'Wrench', color: 'red' }
}

export const COLOR_SCHEMES = {
  blue: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', text: 'text-blue-500', border: 'border-blue-200' },
  emerald: { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', text: 'text-emerald-500', border: 'border-emerald-200' },
  indigo: { bg: 'bg-indigo-500', hover: 'hover:bg-indigo-600', text: 'text-indigo-500', border: 'border-indigo-200' },
  green: { bg: 'bg-green-500', hover: 'hover:bg-green-600', text: 'text-green-500', border: 'border-green-200' },
  orange: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', text: 'text-orange-500', border: 'border-orange-200' },
  purple: { bg: 'bg-purple-500', hover: 'hover:bg-purple-600', text: 'text-purple-500', border: 'border-purple-200' },
  red: { bg: 'bg-red-500', hover: 'hover:bg-red-600', text: 'text-red-500', border: 'border-red-200' }
}

// Opciones para selects
export const TIPOS_MANTENIMIENTO = [
  'Preventivo',
  'Correctivo',
  'Predictivo',
  'Urgente'
]

export const TIPOS_ORDEN = [
  'Instalación',
  'Reparación',
  'Mantenimiento',
  'Revisión',
  'Emergencia'
]

export const ESTADOS = [
  'Pendiente',
  'En Proceso',
  'Completado',
  'Cancelado'
]

export const ESPECIALIDADES_TECNICOS = [
  'Electrónica',
  'Informática',
  'Mecánica',
  'Electricidad',
  'General'
]

export const PRIORIDADES = [
  'Baja',
  'Media',
  'Alta',
  'Urgente'
]
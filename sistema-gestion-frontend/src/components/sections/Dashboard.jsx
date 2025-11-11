import React from 'react'
import { BentoGrid, BentoCard } from '../ui/bento-grid'
import { Package, Users, ShoppingCart, Settings, FileText, Wrench, TrendingUp, BarChart3 } from 'lucide-react'
import { MODULES, COLOR_SCHEMES } from '../../utils/constants'

const Dashboard = () => {
  const stats = [
    { label: 'Artículos Totales', value: '1,247', change: '+12%', icon: Package, color: 'emerald' },
    { label: 'Clientes Activos', value: '892', change: '+8%', icon: Users, color: 'indigo' },
    { label: 'Ventas del Mes', value: '324', change: '+23%', icon: ShoppingCart, color: 'green' },
    { label: 'Mantenimientos', value: '56', change: '+5%', icon: Settings, color: 'orange' },
    { label: 'Órdenes Activas', value: '78', change: '+15%', icon: FileText, color: 'purple' },
    { label: 'Técnicos', value: '24', change: '+3%', icon: Wrench, color: 'red' }
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Bienvenido 
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          </p>
        </div>

        {/* Stats Grid */}
        <BentoGrid className="mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const colors = COLOR_SCHEMES[stat.color]
            
            return (
              <BentoCard key={index} color={stat.color} className="relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
                    <p className={`text-sm font-medium ${colors.text}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-2xl ${colors.bg} bg-opacity-10`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                </div>
                
                {/* Chart placeholder */}
                <div className="mt-4 flex items-end space-x-1">
                  {[30, 45, 60, 75, 65, 80, 90].map((height, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-lg ${colors.bg} bg-opacity-30`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </BentoCard>
            )
          })}
        </BentoGrid>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BentoCard color="blue">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-semibold text-slate-800">Actividad Reciente</h3>
            </div>
            <div className="space-y-3">
              {[
                'Nueva venta registrada - #V-1247',
                'Cliente actualizado - María González',
                'Mantenimiento completado - MTO-056',
                'Artículo agregado al inventario'
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 text-slate-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard color="purple">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-semibold text-slate-800">Métricas Rápidas</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Tasa Conversión', value: '68%' },
                { label: 'Satisfacción', value: '94%' },
                { label: 'Tiempo Respuesta', value: '2.3h' },
                { label: 'Eficiencia', value: '87%' }
              ].map((metric, index) => (
                <div key={index} className="text-center p-3 bg-white rounded-2xl shadow-sm">
                  <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                  <p className="text-xs text-slate-600 mt-1">{metric.label}</p>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
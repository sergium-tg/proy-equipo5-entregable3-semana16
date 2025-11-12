import React from 'react'
import { BentoGrid, BentoCard } from '../ui/bento-grid'
import { 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  FileText, 
  Wrench
} from 'lucide-react'
import { COLOR_SCHEMES } from '../../utils/constants'

const Dashboard = () => {
  const modules = [
    {
      title: 'Artículos',
      description: 'Gestiona inventario, productos y stock disponible',
      icon: Package,
      color: 'emerald',
      path: '#articulos'
    },
    {
      title: 'Clientes',
      description: 'Administra información de clientes y contactos',
      icon: Users,
      color: 'indigo',
      path: '#clientes'
    },
    {
      title: 'Ventas',
      description: 'Procesa ventas, facturación y control de cobros',
      icon: ShoppingCart,
      color: 'green',
      path: '#ventas'
    },
    {
      title: 'Órdenes',
      description: 'Gestiona órdenes de trabajo y servicios',
      icon: FileText,
      color: 'purple',
      path: '#ordenes'
    },
    {
      title: 'Mantenimientos',
      description: 'Programa y controla mantenimientos preventivos',
      icon: Settings,
      color: 'orange',
      path: '#mantenimientos'
    },
    {
      title: 'Técnicos',
      description: 'Administra técnicos y equipos de trabajo',
      icon: Wrench,
      color: 'red',
      path: '#tecnicos'
    }
  ]

  const handleModuleClick = (path) => {
    window.location.hash = path
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Sistema de Gestión
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Centro de control integral para la gestión de tu negocio
          </p>
        </div>

        <BentoGrid>
          {modules.map((module, index) => {
            const Icon = module.icon
            const colors = COLOR_SCHEMES[module.color]
            
            return (
              <BentoCard 
                key={index} 
                color={module.color}
                className="relative overflow-hidden cursor-pointer group hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                onClick={() => handleModuleClick(module.path)}
              >
                <div className="flex flex-col h-full p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${colors.bg} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                      <Icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                    <div className="text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                      →
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleModuleClick(module.path)
                      }}
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${colors.bg} ${colors.text} bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 text-center`}
                    >
                      Ir al Módulo
                    </button>
                  </div>
                </div>
              </BentoCard>
            )
          })}
        </BentoGrid>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Sistema de Gestión v1.0 • {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
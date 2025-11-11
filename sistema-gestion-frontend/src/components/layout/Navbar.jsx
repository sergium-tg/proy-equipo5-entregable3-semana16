import React from 'react'
import { LayoutDashboard, Package, Users, ShoppingCart, Settings, FileText, Wrench } from 'lucide-react'
import { MODULES, COLOR_SCHEMES } from '../../utils/constants'

const Navbar = ({ currentSection, onSectionChange }) => {
  const getIcon = (iconName) => {
    const icons = {
      LayoutDashboard,
      Package,
      Users,
      ShoppingCart,
      Settings,
      FileText,
      Wrench
    }
    const IconComponent = icons[iconName]
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sistema Gestión
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex space-x-1">
            {Object.entries(MODULES).map(([key, module]) => {
              const isActive = currentSection === key
              const colors = COLOR_SCHEMES[module.color]
              
              return (
                <button
                  key={key}
                  onClick={() => onSectionChange(key)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium
                    ${isActive 
                      ? `${colors.bg} text-white shadow-lg transform scale-105` 
                      : `text-slate-600 hover:text-slate-900 hover:bg-slate-100`
                    }
                  `}
                >
                  {getIcon(module.icon)}
                  <span className="hidden sm:block">{module.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
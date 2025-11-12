import React from 'react'
import { useAuth } from '../../context/AuthContext'

const Navbar = ({ currentSection }) => {
  const { user, logout } = useAuth()
  const navItems = [
    { name: 'Inicio', hash: '#inicio' },
    { name: 'Artículos', hash: '#articulos' },
    { name: 'Clientes', hash: '#clientes' },
    { name: 'Ventas', hash: '#ventas' },
    { name: 'Órdenes', hash: '#ordenes' },
    { name: 'Mantenimientos', hash: '#mantenimientos' },
    { name: 'Técnicos', hash: '#tecnicos' }
  ]

  const handleNavClick = (hash) => {
    window.location.hash = hash
  }

  const handleLogout = () => {
    logout()
    window.location.hash = '#login'
  }

  if (!user) {
    return null
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-slate-800">
              Sistema de Gestión
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.hash}
                  onClick={() => handleNavClick(item.hash)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentSection === item.hash.replace('#', '')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <div className="text-sm text-slate-600">
                Hola, <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors duration-200"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
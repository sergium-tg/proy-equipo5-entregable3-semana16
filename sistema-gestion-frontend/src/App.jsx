import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Login from './auth/Login'
import Register from './auth/Register'
import Dashboard from './components/sections/Dashboard'
import Articulos from './components/sections/Articulos'
import Clientes from './components/sections/Clientes'
import Ventas from './components/sections/Ventas'
import Ordenes from './components/sections/Ordenes'
import Mantenimientos from './components/sections/Mantenimientos'
import Tecnicos from './components/sections/Tecnicos'

function AppContent() {
  const [currentSection, setCurrentSection] = useState('inicio')
  const { user, loading } = useAuth()

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'inicio'
      setCurrentSection(hash)
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const renderSection = () => {
    // Rutas públicas (sin autenticación)
    if (!user) {
      switch (currentSection) {
        case 'register':
          return <Register />
        case 'login':
        default:
          return <Login />
      }
    }

    // Rutas protegidas (con autenticación)
    switch (currentSection) {
      case 'articulos':
        return <Articulos />
      case 'clientes':
        return <Clientes />
      case 'ventas':
        return <Ventas />
      case 'ordenes':
        return <Ordenes />
      case 'mantenimientos':
        return <Mantenimientos />
      case 'tecnicos':
        return <Tecnicos />
      case 'inicio':
      default:
        return <Dashboard />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Navbar currentSection={currentSection} />}
      <main className="flex-grow">
        {renderSection()}
      </main>
      {user && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
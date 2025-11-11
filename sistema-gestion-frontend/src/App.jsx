import React, { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Dashboard from './components/sections/Dashboard'
import Articulos from './components/sections/Articulos'
import Clientes from './components/sections/Clientes'
import Ventas from './components/sections/Ventas'
import Mantenimientos from './components/sections/Mantenimientos'
import Ordenes from './components/sections/Ordenes'
import Tecnicos from './components/sections/Tecnicos'

function App() {
  const [currentSection, setCurrentSection] = useState('dashboard')

  const renderSection = () => {
    switch (currentSection) {
      case 'articulos':
        return <Articulos />
      case 'clientes':
        return <Clientes />
      case 'ventas':
        return <Ventas />
      case 'mantenimientos':
        return <Mantenimientos />
      case 'ordenes':
        return <Ordenes />
      case 'tecnicos':
        return <Tecnicos />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main className="pt-20">
        {renderSection()}
      </main>
      <Footer />
    </div>
  )
}

export default App
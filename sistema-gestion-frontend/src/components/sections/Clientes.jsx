// src/components/sections/Clientes.jsx
import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: ''
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [loading, setLoading] = useState(false) // Cambiado a false para probar
  const [error, setError] = useState('')
  const { get, post, put, del } = useApi()

  // Datos de prueba para mostrar la interfaz
  const datosPrueba = [
    {
      id_cliente: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan@email.com',
      telefono: '123456789',
      direccion: 'Calle Principal 123'
    },
    {
      id_cliente: 2,
      nombre: 'María',
      apellido: 'Gómez',
      correo: 'maria@email.com',
      telefono: '987654321',
      direccion: 'Avenida Central 456'
    },
    {
      id_cliente: 3,
      nombre: 'Carlos',
      apellido: 'López',
      correo: 'carlos@email.com',
      telefono: '',
      direccion: ''
    }
  ]

  useEffect(() => {
    // Usar datos de prueba temporalmente
    setClientes(datosPrueba)
    
    // También intentar cargar del backend
    cargarClientes()
  }, [])

  const cargarClientes = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('🔄 Intentando cargar clientes del backend...')
      
      // Intenta cargar los clientes del backend
      const data = await get('/clientes/todos/')
      
      console.log('✅ Clientes cargados del backend:', data)
      
      // Si funciona, usa los datos reales
      setClientes(data)
    } catch (error) {
      console.log('ℹ️ Usando datos de prueba - Error del backend:', error.message)
      // Mantenemos los datos de prueba si hay error
      setError('No se pudo conectar al servidor. Mostrando datos de prueba.')
    } finally {
      setLoading(false)
    }
  }

  const testConexion = async () => {
    try {
      console.log('🔍 Probando conexión con el backend...')
      
      const response = await fetch('http://localhost:8000/api/clientes/todos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log('📊 Status de conexión:', response.status, response.statusText)
      
      if (response.ok) {
        const data = await response.json()
        alert(`✅ Conexión exitosa! Se encontraron ${data.length} clientes reales`)
        // Recargar con datos reales
        cargarClientes()
      } else {
        alert(`❌ Error ${response.status}: ${response.statusText}\n\nSe mantienen los datos de prueba.`)
      }
    } catch (error) {
      console.error('❌ Error de conexión:', error)
      alert(`❌ Error de conexión: ${error.message}\n\nVerifica que el servidor esté ejecutándose en http://localhost:8000`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (clienteSeleccionado) {
        // En un entorno real, haríamos: await put(`/clientes/${clienteSeleccionado.id_cliente}`, formData)
        // Por ahora simulamos la actualización local
        const clientesActualizados = clientes.map(cliente => 
          cliente.id_cliente === clienteSeleccionado.id_cliente 
            ? { ...cliente, ...formData }
            : cliente
        )
        setClientes(clientesActualizados)
        alert('Cliente actualizado exitosamente (localmente)')
      } else {
        // En un entorno real, haríamos: await post('/clientes/', formData)
        // Por ahora simulamos la creación local
        const nuevoCliente = {
          id_cliente: Math.max(...clientes.map(c => c.id_cliente)) + 1,
          ...formData
        }
        setClientes([...clientes, nuevoCliente])
        alert('Cliente creado exitosamente (localmente)')
      }
      
      setFormData({ nombre: '', apellido: '', correo: '', telefono: '', direccion: '' })
      setClienteSeleccionado(null)
      setMostrarFormulario(false)
      
    } catch (error) {
      console.error('Error guardando cliente:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        // En un entorno real, haríamos: await del(`/clientes/${id}`)
        // Por ahora simulamos la eliminación local
        const clientesFiltrados = clientes.filter(cliente => cliente.id_cliente !== id)
        setClientes(clientesFiltrados)
        alert('Cliente eliminado exitosamente (localmente)')
      } catch (error) {
        console.error('Error eliminando cliente:', error)
        alert(`Error: ${error.message}`)
      }
    }
  }

  const handleEditar = (cliente) => {
    setClienteSeleccionado(cliente)
    setFormData({
      nombre: cliente.nombre || '',
      apellido: cliente.apellido || '',
      correo: cliente.correo || '',
      telefono: cliente.telefono || '',
      direccion: cliente.direccion || ''
    })
    setMostrarFormulario(true)
  }

  const handleNuevoCliente = () => {
    setClienteSeleccionado(null)
    setFormData({ nombre: '', apellido: '', correo: '', telefono: '', direccion: '' })
    setMostrarFormulario(true)
  }

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Cargando clientes del servidor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner de advertencia si hay error */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-yellow-800 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
            <p className="text-gray-600 mt-1">
              {error ? 'Modo demo - Datos de prueba' : 'Administra los clientes del sistema'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {clientes.length} cliente{clientes.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={handleNuevoCliente}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Cliente
            </button>
            <button
              onClick={testConexion}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Probar Conexión
            </button>
          </div>
        </div>

        {/* Formulario */}
        {mostrarFormulario && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {clienteSeleccionado ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h2>
              <button
                onClick={() => setMostrarFormulario(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    value={formData.apellido}
                    onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData({...formData, correo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Opcional"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <textarea
                    value={formData.direccion}
                    onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Opcional"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {clienteSeleccionado ? 'Actualizar' : 'Crear'} Cliente
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla de clientes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Apellido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dirección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clientes.map((cliente) => (
                  <tr key={cliente.id_cliente} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{cliente.id_cliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cliente.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cliente.apellido}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <a href={`mailto:${cliente.correo}`} className="text-blue-600 hover:text-blue-900">
                        {cliente.correo}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cliente.telefono || (
                        <span className="text-gray-400 italic">No especificado</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {cliente.direccion || (
                        <span className="text-gray-400 italic">No especificada</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditar(cliente)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(cliente.id_cliente)}
                        className="text-red-600 hover:text-red-900 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {clientes.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay clientes</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza creando tu primer cliente.</p>
              <div className="mt-6">
                <button
                  onClick={handleNuevoCliente}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Cliente
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Información de debug */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Información del Sistema:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Estado: {error ? 'Modo Demo (Datos de prueba)' : 'Conectado al servidor'}</li>
            <li>• Clientes cargados: {clientes.length}</li>
            <li>• Backend URL: http://localhost:8000/api</li>
            <li>• Usa "Probar Conexión" para verificar el servidor</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Clientes
// src/components/sections/Ordenes.jsx
import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([])
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null)
  const [formData, setFormData] = useState({
    descripcion: '',
    estado: 'pendiente',
    tipo_orden: 'solo Ventas'
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { get, post, put, del } = useApi()

  // Datos de prueba para mostrar la interfaz
  const datosPrueba = [
    {
      consecutivo: 1,
      descripcion: 'Orden de venta de repuestos',
      estado: 'completada',
      tipo_orden: 'solo Ventas',
      fecha_creacion: '2024-01-15'
    },
    {
      consecutivo: 2,
      descripcion: 'Mantenimiento preventivo equipo A',
      estado: 'en_proceso',
      tipo_orden: 'solo Mantenimientos',
      fecha_creacion: '2024-01-16'
    },
    {
      consecutivo: 3,
      descripcion: 'Venta con instalación incluida',
      estado: 'pendiente',
      tipo_orden: 'Mantenimiento con ventas',
      fecha_creacion: '2024-01-17'
    }
  ]

  useEffect(() => {
    // Usar datos de prueba temporalmente
    setOrdenes(datosPrueba)
    
    // También intentar cargar del backend
    cargarOrdenes()
  }, [])

  const cargarOrdenes = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('🔄 Intentando cargar órdenes del backend...')
      
      // Intenta cargar las órdenes del backend - ENDPOINT CORREGIDO
      const data = await get('/ordenes/todos/')
      
      console.log('✅ Órdenes cargadas del backend:', data)
      
      // Si funciona, usa los datos reales
      setOrdenes(data)
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
      
      const response = await fetch('http://localhost:8000/api/ordenes/todos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log('📊 Status de conexión:', response.status, response.statusText)
      
      if (response.ok) {
        const data = await response.json()
        alert(`✅ Conexión exitosa! Se encontraron ${data.length} órdenes reales`)
        // Recargar con datos reales
        cargarOrdenes()
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
      if (ordenSeleccionada) {
        // En un entorno real: await put(`/ordenes/${ordenSeleccionada.consecutivo}`, formData)
        // Por ahora simulamos la actualización local
        const ordenesActualizadas = ordenes.map(orden => 
          orden.consecutivo === ordenSeleccionada.consecutivo 
            ? { ...orden, ...formData }
            : orden
        )
        setOrdenes(ordenesActualizadas)
        alert('Orden actualizada exitosamente (localmente)')
      } else {
        // En un entorno real: await post('/ordenes/', formData)
        // Por ahora simulamos la creación local
        const nuevaOrden = {
          consecutivo: Math.max(...ordenes.map(o => o.consecutivo)) + 1,
          ...formData,
          fecha_creacion: new Date().toISOString().split('T')[0]
        }
        setOrdenes([...ordenes, nuevaOrden])
        alert('Orden creada exitosamente (localmente)')
      }
      
      setFormData({ descripcion: '', estado: 'pendiente', tipo_orden: 'solo Ventas' })
      setOrdenSeleccionada(null)
      setMostrarFormulario(false)
      
    } catch (error) {
      console.error('Error guardando orden:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleEliminar = async (consecutivo) => {
    if (window.confirm('¿Estás seguro de eliminar esta orden?')) {
      try {
        // En un entorno real: await del(`/ordenes/${consecutivo}`)
        // Por ahora simulamos la eliminación local
        const ordenesFiltradas = ordenes.filter(orden => orden.consecutivo !== consecutivo)
        setOrdenes(ordenesFiltradas)
        alert('Orden eliminada exitosamente (localmente)')
      } catch (error) {
        console.error('Error eliminando orden:', error)
        alert(`Error: ${error.message}`)
      }
    }
  }

  const handleEditar = (orden) => {
    setOrdenSeleccionada(orden)
    setFormData({
      descripcion: orden.descripcion || '',
      estado: orden.estado || 'pendiente',
      tipo_orden: orden.tipo_orden || 'solo Ventas'
    })
    setMostrarFormulario(true)
  }

  const handleNuevaOrden = () => {
    setOrdenSeleccionada(null)
    setFormData({ descripcion: '', estado: 'pendiente', tipo_orden: 'solo Ventas' })
    setMostrarFormulario(true)
  }

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Cargando órdenes del servidor...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Órdenes</h1>
            <p className="text-gray-600 mt-1">
              {error ? 'Modo demo - Datos de prueba' : 'Administra las órdenes del sistema'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {ordenes.length} orden{ordenes.length !== 1 ? 'es' : ''}
            </span>
            <button
              onClick={handleNuevaOrden}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Orden
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
                {ordenSeleccionada ? 'Editar Orden' : 'Nueva Orden'}
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
                    Tipo de Orden *
                  </label>
                  <select
                    value={formData.tipo_orden}
                    onChange={(e) => setFormData({...formData, tipo_orden: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="solo Ventas">Solo Ventas</option>
                    <option value="solo Mantenimientos">Solo Mantenimientos</option>
                    <option value="Mantenimiento con ventas">Mantenimiento con Ventas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado *
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({...formData, estado: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en_proceso">En Proceso</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Describe los detalles de la orden..."
                    required
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
                  {ordenSeleccionada ? 'Actualizar' : 'Crear'} Orden
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

        {/* Tabla de órdenes */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consecutivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ordenes.map((orden) => (
                  <tr key={orden.consecutivo} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{orden.consecutivo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {orden.tipo_orden}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {orden.descripcion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        orden.estado === 'completada' ? 'bg-green-100 text-green-800' :
                        orden.estado === 'en_proceso' ? 'bg-yellow-100 text-yellow-800' :
                        orden.estado === 'cancelada' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {orden.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {orden.fecha_creacion || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditar(orden)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(orden.consecutivo)}
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
          
          {ordenes.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay órdenes</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza creando tu primera orden.</p>
              <div className="mt-6">
                <button
                  onClick={handleNuevaOrden}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nueva Orden
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
            <li>• Órdenes cargadas: {ordenes.length}</li>
            <li>• Backend URL: http://localhost:8000/api</li>
            <li>• Endpoint: /ordenes/todos/</li>
            <li>• Usa "Probar Conexión" para verificar el servidor</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Ordenes
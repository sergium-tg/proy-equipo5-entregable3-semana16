// src/components/sections/Ventas.jsx
import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Ventas = () => {
  const [ventas, setVentas] = useState([])
  const [articulos, setArticulos] = useState([])
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null)
  const [formData, setFormData] = useState({
    descripcion: '',
    total: 0
  })
  const [articuloVenta, setArticuloVenta] = useState({
    id_articulo: '',
    cantidad: 1
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarAsignarArticulo, setMostrarAsignarArticulo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { get, post, put, del } = useApi()

  // Datos de prueba para mostrar la interfaz
  const datosPruebaVentas = [
    {
      venta_numero: 1,
      descripcion: 'Venta de repuestos varios',
      total: 150.75,
      fecha_creacion: '2024-01-15',
      articulos: [
        { id_articulo: 1, nombre: 'Filtro de aire', cantidad: 2, precio: 25.50 },
        { id_articulo: 2, nombre: 'Aceite motor', cantidad: 1, precio: 99.75 }
      ]
    },
    {
      venta_numero: 2,
      descripcion: 'Venta de herramientas',
      total: 89.99,
      fecha_creacion: '2024-01-16',
      articulos: [
        { id_articulo: 3, nombre: 'Juego de llaves', cantidad: 1, precio: 89.99 }
      ]
    },
    {
      venta_numero: 3,
      descripcion: 'Venta de lubricantes',
      total: 45.50,
      fecha_creacion: '2024-01-17',
      articulos: [
        { id_articulo: 4, nombre: 'Grasa multipropósito', cantidad: 3, precio: 15.17 }
      ]
    }
  ]

  const datosPruebaArticulos = [
    { id_articulo: 1, nombre: 'Filtro de aire', precio: 25.50, stock: 50 },
    { id_articulo: 2, nombre: 'Aceite motor', precio: 99.75, stock: 30 },
    { id_articulo: 3, nombre: 'Juego de llaves', precio: 89.99, stock: 15 },
    { id_articulo: 4, nombre: 'Grasa multipropósito', precio: 15.17, stock: 100 },
    { id_articulo: 5, nombre: 'Bujías', precio: 12.99, stock: 80 }
  ]

  useEffect(() => {
    // Usar datos de prueba temporalmente
    setVentas(datosPruebaVentas)
    setArticulos(datosPruebaArticulos)
    
    // También intentar cargar del backend
    cargarVentas()
    cargarArticulos()
  }, [])

  const cargarVentas = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('🔄 Intentando cargar ventas del backend...')
      
      // Intenta cargar las ventas del backend - ENDPOINT CORREGIDO
      const data = await get('/ventas/todos/')
      
      console.log('✅ Ventas cargadas del backend:', data)
      
      // Si funciona, usa los datos reales
      setVentas(data)
    } catch (error) {
      console.log('ℹ️ Usando datos de prueba - Error del backend:', error.message)
      // Mantenemos los datos de prueba si hay error
      setError('No se pudo conectar al servidor. Mostrando datos de prueba.')
    } finally {
      setLoading(false)
    }
  }

  const cargarArticulos = async () => {
    try {
      // Intenta cargar artículos del backend
      // Nota: Necesitarías un endpoint para artículos, por ahora usamos datos de prueba
      const data = await get('/articulos/todos/').catch(() => datosPruebaArticulos)
      setArticulos(data)
    } catch (error) {
      console.log('ℹ️ Usando datos de prueba para artículos')
      // Mantener datos de prueba si hay error
    }
  }

  const cargarArticulosVenta = async (numeroVenta) => {
    try {
      const data = await get(`/ventas/${numeroVenta}/articulos/`)
      return data
    } catch (error) {
      console.error('Error cargando artículos de la venta:', error)
      return []
    }
  }

  const testConexion = async () => {
    try {
      console.log('🔍 Probando conexión con el backend...')
      
      const response = await fetch('http://localhost:8000/api/ventas/todos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log('📊 Status de conexión:', response.status, response.statusText)
      
      if (response.ok) {
        const data = await response.json()
        alert(`✅ Conexión exitosa! Se encontraron ${data.length} ventas reales`)
        // Recargar con datos reales
        cargarVentas()
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
      if (ventaSeleccionada) {
        // En un entorno real: await put(`/ventas/${ventaSeleccionada.venta_numero}`, formData)
        // Por ahora simulamos la actualización local
        const ventasActualizadas = ventas.map(venta => 
          venta.venta_numero === ventaSeleccionada.venta_numero 
            ? { ...venta, ...formData }
            : venta
        )
        setVentas(ventasActualizadas)
        alert('Venta actualizada exitosamente (localmente)')
      } else {
        // En un entorno real: await post('/ventas/', formData)
        // Por ahora simulamos la creación local
        const nuevaVenta = {
          venta_numero: Math.max(...ventas.map(v => v.venta_numero)) + 1,
          ...formData,
          fecha_creacion: new Date().toISOString().split('T')[0],
          articulos: []
        }
        setVentas([...ventas, nuevaVenta])
        alert('Venta creada exitosamente (localmente)')
      }
      
      setFormData({ descripcion: '', total: 0 })
      setVentaSeleccionada(null)
      setMostrarFormulario(false)
      
    } catch (error) {
      console.error('Error guardando venta:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleAsignarArticulo = async (e) => {
    e.preventDefault()
    try {
      if (!ventaSeleccionada || !articuloVenta.id_articulo) {
        alert('Por favor selecciona un artículo')
        return
      }

      // En un entorno real: await post(`/ventas/${ventaSeleccionada.venta_numero}/articulos/`, articuloVenta)
      // Por ahora simulamos la asignación local
      const articuloSeleccionado = articulos.find(a => a.id_articulo === parseInt(articuloVenta.id_articulo))
      
      if (articuloSeleccionado) {
        const ventasActualizadas = ventas.map(venta => {
          if (venta.venta_numero === ventaSeleccionada.venta_numero) {
            const nuevoArticulo = {
              ...articuloSeleccionado,
              cantidad: articuloVenta.cantidad
            }
            return {
              ...venta,
              articulos: [...(venta.articulos || []), nuevoArticulo],
              total: venta.total + (articuloSeleccionado.precio * articuloVenta.cantidad)
            }
          }
          return venta
        })
        
        setVentas(ventasActualizadas)
        alert('Artículo asignado exitosamente (localmente)')
        setArticuloVenta({ id_articulo: '', cantidad: 1 })
        setMostrarAsignarArticulo(false)
      }
      
    } catch (error) {
      console.error('Error asignando artículo:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleEliminar = async (ventaNumero) => {
    if (window.confirm('¿Estás seguro de eliminar esta venta?')) {
      try {
        // En un entorno real: await del(`/ventas/${ventaNumero}`)
        // Por ahora simulamos la eliminación local
        const ventasFiltradas = ventas.filter(venta => venta.venta_numero !== ventaNumero)
        setVentas(ventasFiltradas)
        alert('Venta eliminada exitosamente (localmente)')
      } catch (error) {
        console.error('Error eliminando venta:', error)
        alert(`Error: ${error.message}`)
      }
    }
  }

  const handleEliminarArticulo = async (numeroVenta, idArticulo) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo de la venta?')) {
      try {
        // En un entorno real: await del(`/ventas/${numeroVenta}/articulos/${idArticulo}`)
        // Por ahora simulamos la eliminación local
        const ventasActualizadas = ventas.map(venta => {
          if (venta.venta_numero === numeroVenta) {
            const articuloEliminado = venta.articulos?.find(a => a.id_articulo === idArticulo)
            const nuevosArticulos = venta.articulos?.filter(a => a.id_articulo !== idArticulo) || []
            const nuevoTotal = articuloEliminado 
              ? venta.total - (articuloEliminado.precio * articuloEliminado.cantidad)
              : venta.total
            
            return {
              ...venta,
              articulos: nuevosArticulos,
              total: nuevoTotal
            }
          }
          return venta
        })
        
        setVentas(ventasActualizadas)
        alert('Artículo eliminado de la venta (localmente)')
      } catch (error) {
        console.error('Error eliminando artículo:', error)
        alert(`Error: ${error.message}`)
      }
    }
  }

  const handleEditar = (venta) => {
    setVentaSeleccionada(venta)
    setFormData({
      descripcion: venta.descripcion || '',
      total: venta.total || 0
    })
    setMostrarFormulario(true)
  }

  const handleNuevaVenta = () => {
    setVentaSeleccionada(null)
    setFormData({ descripcion: '', total: 0 })
    setMostrarFormulario(true)
  }

  const handleAsignarArticuloModal = (venta) => {
    setVentaSeleccionada(venta)
    setArticuloVenta({ id_articulo: '', cantidad: 1 })
    setMostrarAsignarArticulo(true)
  }

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Cargando ventas del servidor...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Ventas</h1>
            <p className="text-gray-600 mt-1">
              {error ? 'Modo demo - Datos de prueba' : 'Administra las ventas del sistema'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {ventas.length} venta{ventas.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={handleNuevaVenta}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nueva Venta
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

        {/* Formulario de Venta */}
        {mostrarFormulario && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {ventaSeleccionada ? 'Editar Venta' : 'Nueva Venta'}
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
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Describe los detalles de la venta..."
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.total}
                      onChange={(e) => setFormData({...formData, total: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
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
                  {ventaSeleccionada ? 'Actualizar' : 'Crear'} Venta
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

        {/* Modal para asignar artículo */}
        {mostrarAsignarArticulo && ventaSeleccionada && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Asignar Artículo a Venta #{ventaSeleccionada.venta_numero}
                </h3>
                <button
                  onClick={() => setMostrarAsignarArticulo(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAsignarArticulo} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Artículo *
                  </label>
                  <select
                    value={articuloVenta.id_articulo}
                    onChange={(e) => setArticuloVenta({...articuloVenta, id_articulo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Seleccionar artículo</option>
                    {articulos.map((articulo) => (
                      <option key={articulo.id_articulo} value={articulo.id_articulo}>
                        {articulo.nombre} - ${articulo.precio} (Stock: {articulo.stock})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={articuloVenta.cantidad}
                    onChange={(e) => setArticuloVenta({...articuloVenta, cantidad: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1"
                  >
                    Asignar Artículo
                  </button>
                  <button
                    type="button"
                    onClick={() => setMostrarAsignarArticulo(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex-1"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabla de ventas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artículos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
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
                {ventas.map((venta) => (
                  <tr key={venta.venta_numero} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{venta.venta_numero}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {venta.descripcion}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="space-y-1">
                        {venta.articulos?.map((articulo, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span>{articulo.nombre} (x{articulo.cantidad})</span>
                            <button
                              onClick={() => handleEliminarArticulo(venta.venta_numero, articulo.id_articulo)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => handleAsignarArticuloModal(venta)}
                          className="text-blue-600 hover:text-blue-800 text-xs flex items-center gap-1 mt-2"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Agregar artículo
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${venta.total?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {venta.fecha_creacion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditar(venta)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(venta.venta_numero)}
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
          
          {ventas.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay ventas</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza creando tu primera venta.</p>
              <div className="mt-6">
                <button
                  onClick={handleNuevaVenta}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nueva Venta
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
            <li>• Ventas cargadas: {ventas.length}</li>
            <li>• Artículos disponibles: {articulos.length}</li>
            <li>• Backend URL: http://localhost:8000/api</li>
            <li>• Endpoint: /ventas/todos/</li>
            <li>• Usa "Probar Conexión" para verificar el servidor</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Ventas
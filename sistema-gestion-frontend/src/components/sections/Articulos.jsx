// src/components/sections/Articulos.jsx
import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Articulos = () => {
  const [articulos, setArticulos] = useState([])
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null)
  const [ventasArticulo, setVentasArticulo] = useState([])
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    disponibilidad: 'disponible'
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarVentas, setMostrarVentas] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { get, post, put, del } = useApi()

  // Datos de prueba para mostrar la interfaz
  const datosPrueba = [
    {
      id_articulo: 1,
      nombre: 'Filtro de Aceite',
      descripcion: 'Filtro de aceite para motor diesel',
      precio: 25.50,
      stock: 50,
      disponibilidad: 'disponible',
      fecha_creacion: '2024-01-10'
    },
    {
      id_articulo: 2,
      nombre: 'Aceite Motor 5W-30',
      descripcion: 'Aceite sintético para motor',
      precio: 99.75,
      stock: 30,
      disponibilidad: 'disponible',
      fecha_creacion: '2024-01-12'
    },
    {
      id_articulo: 3,
      nombre: 'Juego de Llaves Mixtas',
      descripcion: 'Juego de llaves de 8 a 19 mm',
      precio: 89.99,
      stock: 15,
      disponibilidad: 'disponible',
      fecha_creacion: '2024-01-15'
    },
    {
      id_articulo: 4,
      nombre: 'Bujías Iridium',
      descripcion: 'Bujías de alto rendimiento',
      precio: 12.99,
      stock: 0,
      disponibilidad: 'no disponible',
      fecha_creacion: '2024-01-18'
    },
    {
      id_articulo: 5,
      nombre: 'Pastillas de Freno',
      descripcion: 'Pastillas de freno cerámicas',
      precio: 45.25,
      stock: 20,
      disponibilidad: 'disponible',
      fecha_creacion: '2024-01-20'
    }
  ]

  const datosPruebaVentas = [
    {
      venta_numero: 1,
      cantidad: 2,
      fecha_venta: '2024-01-15',
      total: 51.00
    },
    {
      venta_numero: 2,
      cantidad: 1,
      fecha_venta: '2024-01-18',
      total: 25.50
    }
  ]

  useEffect(() => {
    // Usar datos de prueba temporalmente
    setArticulos(datosPrueba)
    
    // También intentar cargar del backend
    cargarArticulos()
  }, [])

  const cargarArticulos = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('🔄 Intentando cargar artículos del backend...')
      
      // Intenta cargar los artículos del backend
      const data = await get('/articulos/todos/')
      
      console.log('✅ Artículos cargados del backend:', data)
      
      // Si funciona, usa los datos reales
      setArticulos(data)
    } catch (error) {
      console.log('ℹ️ Usando datos de prueba - Error del backend:', error.message)
      // Mantenemos los datos de prueba si hay error
      setError('No se pudo conectar al servidor. Mostrando datos de prueba.')
    } finally {
      setLoading(false)
    }
  }

  const cargarVentasArticulo = async (idArticulo) => {
    try {
      const data = await get(`/articulos/${idArticulo}/ventas/`)
      setVentasArticulo(data)
      setMostrarVentas(true)
    } catch (error) {
      console.error('Error cargando ventas del artículo:', error)
      // Usar datos de prueba si falla
      setVentasArticulo(datosPruebaVentas)
      setMostrarVentas(true)
    }
  }

  const testConexion = async () => {
    try {
      console.log('🔍 Probando conexión con el backend...')
      
      const response = await fetch('http://localhost:8000/api/articulos/todos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log('📊 Status de conexión:', response.status, response.statusText)
      
      if (response.ok) {
        const data = await response.json()
        alert(`✅ Conexión exitosa! Se encontraron ${data.length} artículos reales`)
        // Recargar con datos reales
        cargarArticulos()
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
      if (articuloSeleccionado) {
        // En un entorno real: await put(`/articulos/${articuloSeleccionado.id_articulo}`, formData)
        // Por ahora simulamos la actualización local
        const articulosActualizados = articulos.map(articulo => 
          articulo.id_articulo === articuloSeleccionado.id_articulo 
            ? { 
                ...articulo, 
                ...formData,
                disponibilidad: formData.stock > 0 ? 'disponible' : 'no disponible'
              }
            : articulo
        )
        setArticulos(articulosActualizados)
        alert('Artículo actualizado exitosamente (localmente)')
      } else {
        // En un entorno real: await post('/articulos/', formData)
        // Por ahora simulamos la creación local
        const nuevoArticulo = {
          id_articulo: Math.max(...articulos.map(a => a.id_articulo)) + 1,
          ...formData,
          disponibilidad: formData.stock > 0 ? 'disponible' : 'no disponible',
          fecha_creacion: new Date().toISOString().split('T')[0]
        }
        setArticulos([...articulos, nuevoArticulo])
        alert('Artículo creado exitosamente (localmente)')
      }
      
      setFormData({ nombre: '', descripcion: '', precio: '', stock: '', disponibilidad: 'disponible' })
      setArticuloSeleccionado(null)
      setMostrarFormulario(false)
      
    } catch (error) {
      console.error('Error guardando artículo:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleEliminar = async (idArticulo) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      try {
        // En un entorno real: await del(`/articulos/${idArticulo}`)
        // Por ahora simulamos la eliminación local
        const articulosFiltrados = articulos.filter(articulo => articulo.id_articulo !== idArticulo)
        setArticulos(articulosFiltrados)
        alert('Artículo eliminado exitosamente (localmente)')
      } catch (error) {
        console.error('Error eliminando artículo:', error)
        alert(`Error: ${error.message}`)
      }
    }
  }

  const handleEditar = (articulo) => {
    setArticuloSeleccionado(articulo)
    setFormData({
      nombre: articulo.nombre || '',
      descripcion: articulo.descripcion || '',
      precio: articulo.precio || '',
      stock: articulo.stock || '',
      disponibilidad: articulo.disponibilidad || 'disponible'
    })
    setMostrarFormulario(true)
  }

  const handleNuevoArticulo = () => {
    setArticuloSeleccionado(null)
    setFormData({ nombre: '', descripcion: '', precio: '', stock: '', disponibilidad: 'disponible' })
    setMostrarFormulario(true)
  }

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Cargando artículos del servidor...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Artículos</h1>
            <p className="text-gray-600 mt-1">
              {error ? 'Modo demo - Datos de prueba' : 'Administra el inventario de artículos'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {articulos.length} artículo{articulos.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={handleNuevoArticulo}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Artículo
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
                {articuloSeleccionado ? 'Editar Artículo' : 'Nuevo Artículo'}
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
                    placeholder="Nombre del artículo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disponibilidad
                  </label>
                  <select
                    value={formData.disponibilidad}
                    onChange={(e) => setFormData({...formData, disponibilidad: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="disponible">Disponible</option>
                    <option value="no disponible">No Disponible</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Descripción detallada del artículo..."
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
                  {articuloSeleccionado ? 'Actualizar' : 'Crear'} Artículo
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

        {/* Modal de ventas del artículo */}
        {mostrarVentas && articuloSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ventas de {articuloSeleccionado.nombre}
                  </h3>
                  <button
                    onClick={() => setMostrarVentas(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {ventasArticulo.length > 0 ? (
                  <div className="space-y-3">
                    {ventasArticulo.map((venta, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">Venta #{venta.venta_numero}</h4>
                            <p className="text-sm text-gray-600 mt-1">Cantidad: {venta.cantidad}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">${venta.total?.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">{venta.fecha_venta}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="mt-2 text-sm">No hay ventas registradas para este artículo</p>
                  </div>
                )}
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setMostrarVentas(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de artículos */}
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
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articulos.map((articulo) => (
                  <tr key={articulo.id_articulo} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{articulo.id_articulo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {articulo.nombre}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {articulo.descripcion || (
                        <span className="text-gray-400 italic">Sin descripción</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${articulo.precio?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {articulo.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        articulo.disponibilidad === 'disponible' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {articulo.disponibilidad === 'disponible' ? 'Disponible' : 'Agotado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => cargarVentasArticulo(articulo.id_articulo)}
                        className="text-purple-600 hover:text-purple-900 px-3 py-1 rounded-md hover:bg-purple-50 transition-colors"
                      >
                        Ver Ventas
                      </button>
                      <button
                        onClick={() => handleEditar(articulo)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(articulo.id_articulo)}
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
          
          {articulos.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay artículos</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza creando tu primer artículo.</p>
              <div className="mt-6">
                <button
                  onClick={handleNuevoArticulo}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Artículo
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
            <li>• Artículos cargados: {articulos.length}</li>
            <li>• Disponibles: {articulos.filter(a => a.disponibilidad === 'disponible').length}</li>
            <li>• Agotados: {articulos.filter(a => a.disponibilidad === 'no disponible').length}</li>
            <li>• Backend URL: http://localhost:8000/api</li>
            <li>• Usa "Probar Conexión" para verificar el servidor</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Articulos
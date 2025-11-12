// src/components/sections/Mantenimientos.jsx
import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Mantenimientos = () => {
  const [mantenimientos, setMantenimientos] = useState([])
  const [tecnicos, setTecnicos] = useState([])
  const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState(null)
  const [formData, setFormData] = useState({
    descripcion: '',
    tipo_mto: 'Preventivo'
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { get, post, put, del } = useApi()

  // Datos de prueba para mostrar la interfaz
  const datosPruebaMantenimientos = [
    {
      mto_numero: 1,
      descripcion: 'Mantenimiento preventivo mensual',
      tipo_mto: 'Preventivo',
      fecha_creacion: '2024-01-15'
    },
    {
      mto_numero: 2,
      descripcion: 'Reparación de motor principal',
      tipo_mto: 'Correctivo',
      fecha_creacion: '2024-01-10'
    },
    {
      mto_numero: 3,
      descripcion: 'Cambio de filtros y lubricantes',
      tipo_mto: 'Preventivo',
      fecha_creacion: '2024-01-05'
    }
  ]

  const datosPruebaTecnicos = [
    { id_tecnico: 1, nombre: 'Carlos Rodríguez', especialidad: 'Mecánica' },
    { id_tecnico: 2, nombre: 'Ana Martínez', especialidad: 'Eléctrica' },
    { id_tecnico: 3, nombre: 'Luis García', especialidad: 'Electrónica' }
  ]

  useEffect(() => {
    // Usar datos de prueba temporalmente
    setMantenimientos(datosPruebaMantenimientos)
    setTecnicos(datosPruebaTecnicos)
    
    // También intentar cargar del backend
    cargarMantenimientos()
    cargarTecnicosDisponibles()
  }, [])

  const cargarMantenimientos = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('🔄 Intentando cargar mantenimientos del backend...')
      
      // Intenta cargar los mantenimientos del backend
      const data = await get('/mantenimientos/todos/')
      
      console.log('✅ Mantenimientos cargados del backend:', data)
      
      // Si funciona, usa los datos reales
      setMantenimientos(data)
    } catch (error) {
      console.log('ℹ️ Usando datos de prueba - Error del backend:', error.message)
      // Mantenemos los datos de prueba si hay error
      setError('No se pudo conectar al servidor. Mostrando datos de prueba.')
    } finally {
      setLoading(false)
    }
  }

  const cargarTecnicosDisponibles = async () => {
    try {
      // Intenta cargar técnicos del backend
      const data = await get('/tecnicos/todos/')
      setTecnicos(data)
    } catch (error) {
      console.log('ℹ️ Usando datos de prueba para técnicos')
      // Mantener datos de prueba si hay error
    }
  }

  const testConexion = async () => {
    try {
      console.log('🔍 Probando conexión con el backend...')
      
      const response = await fetch('http://localhost:8000/api/mantenimientos/todos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log('📊 Status de conexión:', response.status, response.statusText)
      
      if (response.ok) {
        const data = await response.json()
        alert(`✅ Conexión exitosa! Se encontraron ${data.length} mantenimientos reales`)
        // Recargar con datos reales
        cargarMantenimientos()
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
      if (mantenimientoSeleccionado) {
        // En un entorno real: await put(`/mantenimientos/${mantenimientoSeleccionado.mto_numero}`, formData)
        // Por ahora simulamos la actualización local
        const mantenimientosActualizados = mantenimientos.map(mantenimiento => 
          mantenimiento.mto_numero === mantenimientoSeleccionado.mto_numero 
            ? { ...mantenimiento, ...formData }
            : mantenimiento
        )
        setMantenimientos(mantenimientosActualizados)
        alert('Mantenimiento actualizado exitosamente (localmente)')
      } else {
        // En un entorno real: await post('/mantenimientos/', formData)
        // Por ahora simulamos la creación local
        const nuevoMantenimiento = {
          mto_numero: Math.max(...mantenimientos.map(m => m.mto_numero)) + 1,
          ...formData,
          fecha_creacion: new Date().toISOString().split('T')[0]
        }
        setMantenimientos([...mantenimientos, nuevoMantenimiento])
        alert('Mantenimiento creado exitosamente (localmente)')
      }
      
      setFormData({ descripcion: '', tipo_mto: 'Preventivo' })
      setMantenimientoSeleccionado(null)
      setMostrarFormulario(false)
      
    } catch (error) {
      console.error('Error guardando mantenimiento:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleEliminar = async (mtoNumero) => {
    if (window.confirm('¿Estás seguro de eliminar este mantenimiento?')) {
      try {
        // En un entorno real: await del(`/mantenimientos/${mtoNumero}`)
        // Por ahora simulamos la eliminación local
        const mantenimientosFiltrados = mantenimientos.filter(mantenimiento => mantenimiento.mto_numero !== mtoNumero)
        setMantenimientos(mantenimientosFiltrados)
        alert('Mantenimiento eliminado exitosamente (localmente)')
      } catch (error) {
        console.error('Error eliminando mantenimiento:', error)
        alert(`Error: ${error.message}`)
      }
    }
  }

  const handleEditar = (mantenimiento) => {
    setMantenimientoSeleccionado(mantenimiento)
    setFormData({
      descripcion: mantenimiento.descripcion || '',
      tipo_mto: mantenimiento.tipo_mto || 'Preventivo'
    })
    setMostrarFormulario(true)
  }

  const handleAsignarTecnico = async (numeroMto, idTecnico) => {
    if (!idTecnico) return
    
    try {
      // En un entorno real: await post(`/mantenimientos/${numeroMto}/tecnicos/${idTecnico}`, {})
      // Por ahora simulamos la asignación local
      alert(`Técnico ${idTecnico} asignado al mantenimiento ${numeroMto} (localmente)`)
    } catch (error) {
      console.error('Error asignando técnico:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleNuevoMantenimiento = () => {
    setMantenimientoSeleccionado(null)
    setFormData({ descripcion: '', tipo_mto: 'Preventivo' })
    setMostrarFormulario(true)
  }

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Cargando mantenimientos del servidor...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Mantenimientos</h1>
            <p className="text-gray-600 mt-1">
              {error ? 'Modo demo - Datos de prueba' : 'Administra los mantenimientos del sistema'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {mantenimientos.length} mantenimiento{mantenimientos.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={handleNuevoMantenimiento}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Mantenimiento
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
                {mantenimientoSeleccionado ? 'Editar Mantenimiento' : 'Nuevo Mantenimiento'}
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
                    Tipo de Mantenimiento *
                  </label>
                  <select
                    value={formData.tipo_mto}
                    onChange={(e) => setFormData({...formData, tipo_mto: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="Preventivo">Preventivo</option>
                    <option value="Correctivo">Correctivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción *
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder="Describe el trabajo de mantenimiento a realizar..."
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
                  {mantenimientoSeleccionado ? 'Actualizar' : 'Crear'} Mantenimiento
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

        {/* Tabla de mantenimientos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Creación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asignar Técnico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mantenimientos.map((mantenimiento) => (
                  <tr key={mantenimiento.mto_numero} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{mantenimiento.mto_numero}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        mantenimiento.tipo_mto === 'Preventivo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {mantenimiento.tipo_mto}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {mantenimiento.descripcion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {mantenimiento.fecha_creacion || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        onChange={(e) => handleAsignarTecnico(mantenimiento.mto_numero, parseInt(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Seleccionar técnico...</option>
                        {tecnicos.map((tecnico) => (
                          <option key={tecnico.id_tecnico} value={tecnico.id_tecnico}>
                            {tecnico.nombre} - {tecnico.especialidad}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEditar(mantenimiento)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(mantenimiento.mto_numero)}
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
          
          {mantenimientos.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay mantenimientos</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza creando tu primer mantenimiento.</p>
              <div className="mt-6">
                <button
                  onClick={handleNuevoMantenimiento}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Mantenimiento
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
            <li>• Mantenimientos cargados: {mantenimientos.length}</li>
            <li>• Técnicos disponibles: {tecnicos.length}</li>
            <li>• Backend URL: http://localhost:8000/api</li>
            <li>• Usa "Probar Conexión" para verificar el servidor</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Mantenimientos
// src/components/sections/Tecnicos.jsx
import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Tecnicos = () => {
  const [tecnicos, setTecnicos] = useState([])
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState(null)
  const [mantenimientosTecnico, setMantenimientosTecnico] = useState([])
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    telefono: '',
    email: ''
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarMantenimientos, setMostrarMantenimientos] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { get, post, put, del } = useApi()

  // Datos de prueba para mostrar la interfaz
  const datosPrueba = [
    {
      id_tecnico: 1,
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      especialidad: 'Mecánica Industrial',
      telefono: '+1 234-567-8901',
      email: 'carlos.rodriguez@empresa.com',
      fecha_creacion: '2024-01-10'
    },
    {
      id_tecnico: 2,
      nombre: 'Ana',
      apellido: 'Martínez',
      especialidad: 'Electricidad',
      telefono: '+1 234-567-8902',
      email: 'ana.martinez@empresa.com',
      fecha_creacion: '2024-01-12'
    },
    {
      id_tecnico: 3,
      nombre: 'Luis',
      apellido: 'García',
      especialidad: 'Electrónica',
      telefono: '+1 234-567-8903',
      email: 'luis.garcia@empresa.com',
      fecha_creacion: '2024-01-15'
    },
    {
      id_tecnico: 4,
      nombre: 'María',
      apellido: 'López',
      especialidad: 'Sistemas Hidráulicos',
      telefono: '+1 234-567-8904',
      email: 'maria.lopez@empresa.com',
      fecha_creacion: '2024-01-18'
    }
  ]

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
      fecha_creacion: '2024-01-20'
    }
  ]

  useEffect(() => {
    // Usar datos de prueba temporalmente
    setTecnicos(datosPrueba)
    
    // También intentar cargar del backend
    cargarTecnicos()
  }, [])

  const cargarTecnicos = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('🔄 Intentando cargar técnicos del backend...')
      
      // Intenta cargar los técnicos del backend - ENDPOINT CORREGIDO
      const data = await get('/tecnicos/todos/')
      
      console.log('✅ Técnicos cargados del backend:', data)
      
      // Si funciona, usa los datos reales
      setTecnicos(data)
    } catch (error) {
      console.log('ℹ️ Usando datos de prueba - Error del backend:', error.message)
      // Mantenemos los datos de prueba si hay error
      setError('No se pudo conectar al servidor. Mostrando datos de prueba.')
    } finally {
      setLoading(false)
    }
  }

  const cargarMantenimientosTecnico = async (idTecnico) => {
    try {
      const data = await get(`/tecnicos/${idTecnico}/mantenimientos/`)
      setMantenimientosTecnico(data)
      setMostrarMantenimientos(true)
    } catch (error) {
      console.error('Error cargando mantenimientos del técnico:', error)
      // Usar datos de prueba si falla
      setMantenimientosTecnico(datosPruebaMantenimientos)
      setMostrarMantenimientos(true)
    }
  }

  const testConexion = async () => {
    try {
      console.log('🔍 Probando conexión con el backend...')
      
      const response = await fetch('http://localhost:8000/api/tecnicos/todos/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      console.log('📊 Status de conexión:', response.status, response.statusText)
      
      if (response.ok) {
        const data = await response.json()
        alert(`✅ Conexión exitosa! Se encontraron ${data.length} técnicos reales`)
        // Recargar con datos reales
        cargarTecnicos()
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
      if (tecnicoSeleccionado) {
        // En un entorno real: await put(`/tecnicos/${tecnicoSeleccionado.id_tecnico}`, formData)
        // Por ahora simulamos la actualización local
        const tecnicosActualizados = tecnicos.map(tecnico => 
          tecnico.id_tecnico === tecnicoSeleccionado.id_tecnico 
            ? { ...tecnico, ...formData }
            : tecnico
        )
        setTecnicos(tecnicosActualizados)
        alert('Técnico actualizado exitosamente (localmente)')
      } else {
        // En un entorno real: await post('/tecnicos/', formData)
        // Por ahora simulamos la creación local
        const nuevoTecnico = {
          id_tecnico: Math.max(...tecnicos.map(t => t.id_tecnico)) + 1,
          ...formData,
          fecha_creacion: new Date().toISOString().split('T')[0]
        }
        setTecnicos([...tecnicos, nuevoTecnico])
        alert('Técnico creado exitosamente (localmente)')
      }
      
      setFormData({ nombre: '', apellido: '', especialidad: '', telefono: '', email: '' })
      setTecnicoSeleccionado(null)
      setMostrarFormulario(false)
      
    } catch (error) {
      console.error('Error guardando técnico:', error)
      alert(`Error: ${error.message}`)
    }
  }

  const handleEliminar = async (idTecnico) => {
    if (window.confirm('¿Estás seguro de eliminar este técnico?')) {
      try {
        // En un entorno real: await del(`/tecnicos/${idTecnico}`)
        // Por ahora simulamos la eliminación local
        const tecnicosFiltrados = tecnicos.filter(tecnico => tecnico.id_tecnico !== idTecnico)
        setTecnicos(tecnicosFiltrados)
        alert('Técnico eliminado exitosamente (localmente)')
      } catch (error) {
        console.error('Error eliminando técnico:', error)
        alert(`Error: ${error.message}`)
      }
    }
  }

  const handleEditar = (tecnico) => {
    setTecnicoSeleccionado(tecnico)
    setFormData({
      nombre: tecnico.nombre || '',
      apellido: tecnico.apellido || '',
      especialidad: tecnico.especialidad || '',
      telefono: tecnico.telefono || '',
      email: tecnico.email || ''
    })
    setMostrarFormulario(true)
  }

  const handleNuevoTecnico = () => {
    setTecnicoSeleccionado(null)
    setFormData({ nombre: '', apellido: '', especialidad: '', telefono: '', email: '' })
    setMostrarFormulario(true)
  }

  // Si está cargando, mostrar spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Cargando técnicos del servidor...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Técnicos</h1>
            <p className="text-gray-600 mt-1">
              {error ? 'Modo demo - Datos de prueba' : 'Administra los técnicos del sistema'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {tecnicos.length} técnico{tecnicos.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={handleNuevoTecnico}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Técnico
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
                {tecnicoSeleccionado ? 'Editar Técnico' : 'Nuevo Técnico'}
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
                    Especialidad *
                  </label>
                  <input
                    type="text"
                    value={formData.especialidad}
                    onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Mecánica, Electricidad, Electrónica..."
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
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  {tecnicoSeleccionado ? 'Actualizar' : 'Crear'} Técnico
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

        {/* Modal de mantenimientos del técnico */}
        {mostrarMantenimientos && tecnicoSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Mantenimientos de {tecnicoSeleccionado.nombre} {tecnicoSeleccionado.apellido}
                  </h3>
                  <button
                    onClick={() => setMostrarMantenimientos(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {mantenimientosTecnico.length > 0 ? (
                  <div className="space-y-3">
                    {mantenimientosTecnico.map((mantenimiento) => (
                      <div key={mantenimiento.mto_numero} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">Mantenimiento #{mantenimiento.mto_numero}</h4>
                            <p className="text-sm text-gray-600 mt-1">{mantenimiento.descripcion}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            mantenimiento.tipo_mto === 'Preventivo' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {mantenimiento.tipo_mto}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Fecha: {mantenimiento.fecha_creacion}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="mt-2 text-sm">No hay mantenimientos asignados</p>
                  </div>
                )}
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setMostrarMantenimientos(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabla de técnicos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre Completo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Especialidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tecnicos.map((tecnico) => (
                  <tr key={tecnico.id_tecnico} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{tecnico.id_tecnico}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{tecnico.nombre} {tecnico.apellido}</div>
                        {tecnico.email && (
                          <div className="text-xs text-gray-500">{tecnico.email}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {tecnico.especialidad}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {tecnico.telefono || (
                        <span className="text-gray-400 italic">No especificado</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => cargarMantenimientosTecnico(tecnico.id_tecnico)}
                        className="text-purple-600 hover:text-purple-900 px-3 py-1 rounded-md hover:bg-purple-50 transition-colors"
                      >
                        Ver Mantenimientos
                      </button>
                      <button
                        onClick={() => handleEditar(tecnico)}
                        className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(tecnico.id_tecnico)}
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
          
          {tecnicos.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay técnicos</h3>
              <p className="mt-1 text-sm text-gray-500">Comienza creando tu primer técnico.</p>
              <div className="mt-6">
                <button
                  onClick={handleNuevoTecnico}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Técnico
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
            <li>• Técnicos cargados: {tecnicos.length}</li>
            <li>• Backend URL: http://localhost:8000/api</li>
            <li>• Endpoint: /tecnicos/todos/</li>
            <li>• Usa "Probar Conexión" para verificar el servidor</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Tecnicos
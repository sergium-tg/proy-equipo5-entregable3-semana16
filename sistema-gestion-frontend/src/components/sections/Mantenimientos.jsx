import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Mantenimientos = () => {
  const [mantenimientos, setMantenimientos] = useState([])
  const [tecnicos, setTecnicos] = useState([])
  const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState(null)
  const [formData, setFormData] = useState({
    numero: '',
    tipo: '',
    descripcion: '',
    tecnico_id: ''
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const { get, post, put, del } = useApi()

  useEffect(() => {
    cargarMantenimientos()
    cargarTecnicos()
  }, [])

  const cargarMantenimientos = async () => {
    try {
      const data = await get('mantenimiento/listar_todos')
      setMantenimientos(data)
    } catch (error) {
      console.error('Error cargando mantenimientos:', error)
    }
  }

  const cargarTecnicos = async () => {
    try {
      const data = await get('mantenimiento/listar_tecnicos')
      setTecnicos(data)
    } catch (error) {
      console.error('Error cargando técnicos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (mantenimientoSeleccionado) {
        await put(`mantenimiento/actualizar_mantenimiento/${mantenimientoSeleccionado.id}`, formData)
      } else {
        await post('mantenimiento/crear_mantenimiento', formData)
      }
      setFormData({ numero: '', tipo: '', descripcion: '', tecnico_id: '' })
      setMantenimientoSeleccionado(null)
      setMostrarFormulario(false)
      cargarMantenimientos()
    } catch (error) {
      console.error('Error guardando mantenimiento:', error)
    }
  }

  const handleEliminar = async (id) => {
    try {
      await del(`mantenimiento/eliminar_mantenimiento/${id}`)
      cargarMantenimientos()
    } catch (error) {
      console.error('Error eliminando mantenimiento:', error)
    }
  }

  const handleEditar = (mantenimiento) => {
    setMantenimientoSeleccionado(mantenimiento)
    setFormData({
      numero: mantenimiento.numero || '',
      tipo: mantenimiento.tipo || '',
      descripcion: mantenimiento.descripcion || '',
      tecnico_id: mantenimiento.tecnico_id || ''
    })
    setMostrarFormulario(true)
  }

  const handleAsignarTecnico = async (mantenimientoId, tecnicoId) => {
    try {
      await put(`mantenimiento/asignar_tecnico/${mantenimientoId}`, { tecnico_id: tecnicoId })
      cargarMantenimientos()
    } catch (error) {
      console.error('Error asignando técnico:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Mantenimientos</h1>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nuevo Mantenimiento
          </button>
        </div>

        {mostrarFormulario && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {mantenimientoSeleccionado ? 'Editar Mantenimiento' : 'Nuevo Mantenimiento'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Número
                  </label>
                  <input
                    type="text"
                    value={formData.numero}
                    onChange={(e) => setFormData({...formData, numero: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Tipo
                  </label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="preventivo">Preventivo</option>
                    <option value="correctivo">Correctivo</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Técnico
                  </label>
                  <select
                    value={formData.tecnico_id}
                    onChange={(e) => setFormData({...formData, tecnico_id: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar técnico</option>
                    {tecnicos.map((tecnico) => (
                      <option key={tecnico.id} value={tecnico.id}>
                        {tecnico.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {mantenimientoSeleccionado ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false)
                    setMantenimientoSeleccionado(null)
                    setFormData({ numero: '', tipo: '', descripcion: '', tecnico_id: '' })
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  Técnico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mantenimientos.map((mantenimiento) => (
                <tr key={mantenimiento.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {mantenimiento.numero}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {mantenimiento.tipo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {mantenimiento.descripcion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <select
                      value={mantenimiento.tecnico_id || ''}
                      onChange={(e) => handleAsignarTecnico(mantenimiento.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="">Sin asignar</option>
                      {tecnicos.map((tecnico) => (
                        <option key={tecnico.id} value={tecnico.id}>
                          {tecnico.nombre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditar(mantenimiento)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(mantenimiento.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Mantenimientos
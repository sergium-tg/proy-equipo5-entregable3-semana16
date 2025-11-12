import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Tecnicos = () => {
  const [tecnicos, setTecnicos] = useState([])
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    especialidad: '',
    telefono: ''
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const { get, post, put, del } = useApi()

  useEffect(() => {
    cargarTecnicos()
  }, [])

  const cargarTecnicos = async () => {
    try {
      const data = await get('tecnico/lista_todos')
      setTecnicos(data)
    } catch (error) {
      console.error('Error cargando técnicos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (tecnicoSeleccionado) {
        await put(`tecnico/actualiza_tecnico/${tecnicoSeleccionado.id}`, formData)
      } else {
        await post('tecnico/crea_tecnico', formData)
      }
      setFormData({ nombre: '', especialidad: '', telefono: '' })
      setTecnicoSeleccionado(null)
      setMostrarFormulario(false)
      cargarTecnicos()
    } catch (error) {
      console.error('Error guardando técnico:', error)
    }
  }

  const handleEliminar = async (id) => {
    try {
      await del(`tecnico/elimina_tecnico/${id}`)
      cargarTecnicos()
    } catch (error) {
      console.error('Error eliminando técnico:', error)
    }
  }

  const handleEditar = (tecnico) => {
    setTecnicoSeleccionado(tecnico)
    setFormData({
      nombre: tecnico.nombre || '',
      especialidad: tecnico.especialidad || '',
      telefono: tecnico.telefono || ''
    })
    setMostrarFormulario(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Técnicos</h1>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nuevo Técnico
          </button>
        </div>

        {mostrarFormulario && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {tecnicoSeleccionado ? 'Editar Técnico' : 'Nuevo Técnico'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Especialidad
                  </label>
                  <input
                    type="text"
                    value={formData.especialidad}
                    onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {tecnicoSeleccionado ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false)
                    setTecnicoSeleccionado(null)
                    setFormData({ nombre: '', especialidad: '', telefono: '' })
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
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tecnicos.map((tecnico) => (
                <tr key={tecnico.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tecnico.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tecnico.especialidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tecnico.telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditar(tecnico)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(tecnico.id)}
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

export default Tecnicos
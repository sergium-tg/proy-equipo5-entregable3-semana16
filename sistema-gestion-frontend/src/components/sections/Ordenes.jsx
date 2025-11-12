import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([])
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null)
  const [formData, setFormData] = useState({
    consecutivo: '',
    descripcion: '',
    estado: ''
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const { get, post, put, del } = useApi()

  useEffect(() => {
    cargarOrdenes()
  }, [])

  const cargarOrdenes = async () => {
    try {
      const data = await get('orden/listar_todos')
      setOrdenes(data)
    } catch (error) {
      console.error('Error cargando órdenes:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (ordenSeleccionada) {
        await put(`orden/actualizar_ordenes/${ordenSeleccionada.id}`, formData)
      } else {
        await post('orden/crear_ordenes', formData)
      }
      setFormData({ consecutivo: '', descripcion: '', estado: '' })
      setOrdenSeleccionada(null)
      setMostrarFormulario(false)
      cargarOrdenes()
    } catch (error) {
      console.error('Error guardando orden:', error)
    }
  }

  const handleEliminar = async (id) => {
    try {
      await del(`orden/eliminar_ordenes/${id}`)
      cargarOrdenes()
    } catch (error) {
      console.error('Error eliminando orden:', error)
    }
  }

  const handleEditar = (orden) => {
    setOrdenSeleccionada(orden)
    setFormData({
      consecutivo: orden.consecutivo || '',
      descripcion: orden.descripcion || '',
      estado: orden.estado || ''
    })
    setMostrarFormulario(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Órdenes</h1>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nueva Orden
          </button>
        </div>

        {mostrarFormulario && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {ordenSeleccionada ? 'Editar Orden' : 'Nueva Orden'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Consecutivo
                  </label>
                  <input
                    type="text"
                    value={formData.consecutivo}
                    onChange={(e) => setFormData({...formData, consecutivo: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Estado
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({...formData, estado: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_proceso">En proceso</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
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
                  {ordenSeleccionada ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false)
                    setOrdenSeleccionada(null)
                    setFormData({ consecutivo: '', descripcion: '', estado: '' })
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
                  Consecutivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
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
              {ordenes.map((orden) => (
                <tr key={orden.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {orden.consecutivo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {orden.descripcion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      orden.estado === 'completada' ? 'bg-green-100 text-green-800' :
                      orden.estado === 'en_proceso' ? 'bg-yellow-100 text-yellow-800' :
                      orden.estado === 'cancelada' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {orden.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditar(orden)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(orden.id)}
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

export default Ordenes
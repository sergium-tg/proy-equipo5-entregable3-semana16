import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'

const Ventas = () => {
  const [ventas, setVentas] = useState([])
  const [articulos, setArticulos] = useState([])
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null)
  const [formData, setFormData] = useState({
    numero: '',
    articulo_id: '',
    cantidad: '',
    total: ''
  })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const { get, post, put, del } = useApi()

  useEffect(() => {
    cargarVentas()
    cargarArticulos()
  }, [])

  const cargarVentas = async () => {
    try {
      const data = await get('venta/lista_todos')
      setVentas(data)
    } catch (error) {
      console.error('Error cargando ventas:', error)
    }
  }

  const cargarArticulos = async () => {
    try {
      const data = await get('venta/listar_articulos')
      setArticulos(data)
    } catch (error) {
      console.error('Error cargando artículos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (ventaSeleccionada) {
        await put(`venta/actualiza_venta/${ventaSeleccionada.id}`, formData)
      } else {
        await post('venta/crea_venta', formData)
      }
      setFormData({ numero: '', articulo_id: '', cantidad: '', total: '' })
      setVentaSeleccionada(null)
      setMostrarFormulario(false)
      cargarVentas()
    } catch (error) {
      console.error('Error guardando venta:', error)
    }
  }

  const handleEliminar = async (id) => {
    try {
      await del(`venta/elimina_venta/${id}`)
      cargarVentas()
    } catch (error) {
      console.error('Error eliminando venta:', error)
    }
  }

  const handleEditar = (venta) => {
    setVentaSeleccionada(venta)
    setFormData({
      numero: venta.numero || '',
      articulo_id: venta.articulo_id || '',
      cantidad: venta.cantidad || '',
      total: venta.total || ''
    })
    setMostrarFormulario(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Gestión de Ventas</h1>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nueva Venta
          </button>
        </div>

        {mostrarFormulario && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {ventaSeleccionada ? 'Editar Venta' : 'Nueva Venta'}
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
                    Artículo
                  </label>
                  <select
                    value={formData.articulo_id}
                    onChange={(e) => setFormData({...formData, articulo_id: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar artículo</option>
                    {articulos.map((articulo) => (
                      <option key={articulo.id} value={articulo.id}>
                        {articulo.nombre} - ${articulo.precio}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    value={formData.cantidad}
                    onChange={(e) => setFormData({...formData, cantidad: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Total
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.total}
                    onChange={(e) => setFormData({...formData, total: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  {ventaSeleccionada ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false)
                    setVentaSeleccionada(null)
                    setFormData({ numero: '', articulo_id: '', cantidad: '', total: '' })
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
                  Artículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ventas.map((venta) => (
                <tr key={venta.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {venta.numero}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {venta.articulo_nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {venta.cantidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${venta.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditar(venta)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(venta.id)}
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

export default Ventas
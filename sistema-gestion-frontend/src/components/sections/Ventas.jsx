import React, { useState } from 'react'
import { BentoGrid, BentoCard } from '../ui/bento-grid'
import { ShoppingCart, Plus, Search, Calendar, DollarSign, User, Package, Edit, Trash2, Download } from 'lucide-react'
import { useApi } from '../../hooks/useApi'
import { Modal, ModalFooter } from '../ui/modal'

// Componente de formulario movido FUERA
const VentaForm = ({ formData, onInputChange, onSubmit, onClose, buttonText, clientes, articulos }) => {
  const [articuloSeleccionado, setArticuloSeleccionado] = useState({
    id_articulo: '',
    cantidad: 1,
    precio_unitario: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onSubmit()
  }

  const agregarArticulo = () => {
    if (articuloSeleccionado.id_articulo && articuloSeleccionado.cantidad > 0) {
      const articulo = articulos?.find(a => a.id_articulo == articuloSeleccionado.id_articulo)
      const nuevoArticulo = {
        id_articulo: articuloSeleccionado.id_articulo,
        cantidad: articuloSeleccionado.cantidad,
        precio_unitario: articulo?.precio || articuloSeleccionado.precio_unitario,
        nombre: articulo?.nombre
      }
      
      onInputChange('articulos', [...formData.articulos, nuevoArticulo])
      onInputChange('total', (parseFloat(formData.total) + (nuevoArticulo.cantidad * nuevoArticulo.precio_unitario)).toString())
      
      setArticuloSeleccionado({
        id_articulo: '',
        cantidad: 1,
        precio_unitario: ''
      })
    }
  }

  const quitarArticulo = (index) => {
    const articulosActualizados = [...formData.articulos]
    const articuloRemovido = articulosActualizados.splice(index, 1)[0]
    
    onInputChange('articulos', articulosActualizados)
    onInputChange('total', (parseFloat(formData.total) - (articuloRemovido.cantidad * articuloRemovido.precio_unitario)).toString())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cliente *
          </label>
          <select
            required
            value={formData.cliente_id}
            onChange={(e) => onInputChange('cliente_id', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Seleccionar cliente</option>
            {clientes?.map(cliente => (
              <option key={cliente.cliente_id} value={cliente.cliente_id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fecha de Venta
          </label>
          <input
            type="date"
            value={formData.fecha_venta}
            onChange={(e) => onInputChange('fecha_venta', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Estado
          </label>
          <select
            value={formData.estado}
            onChange={(e) => onInputChange('estado', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Total *
          </label>
          <input
            type="number"
            step="0.01"
            required
            value={formData.total}
            onChange={(e) => onInputChange('total', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Gestión de Artículos */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Artículos de la Venta
        </label>
        
        <div className="flex space-x-2 mb-4">
          <select
            value={articuloSeleccionado.id_articulo}
            onChange={(e) => {
              const articulo = articulos?.find(a => a.id_articulo == e.target.value)
              setArticuloSeleccionado({
                ...articuloSeleccionado,
                id_articulo: e.target.value,
                precio_unitario: articulo?.precio || ''
              })
            }}
            className="flex-1 p-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Seleccionar artículo</option>
            {articulos?.filter(a => a.disponibilidad).map(articulo => (
              <option key={articulo.id_articulo} value={articulo.id_articulo}>
                {articulo.nombre} - ${articulo.precio}
              </option>
            ))}
          </select>
          
          <input
            type="number"
            min="1"
            value={articuloSeleccionado.cantidad}
            onChange={(e) => setArticuloSeleccionado({...articuloSeleccionado, cantidad: parseInt(e.target.value)})}
            className="w-20 p-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Cant."
          />
          
          <button
            type="button"
            onClick={agregarArticulo}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
          >
            Agregar
          </button>
        </div>

        {/* Lista de artículos agregados */}
        {formData.articulos.length > 0 && (
          <div className="space-y-2">
            {formData.articulos.map((articulo, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="font-medium">{articulo.nombre}</span>
                  <span className="text-sm text-slate-600 ml-2">
                    {articulo.cantidad} x ${articulo.precio_unitario}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">
                    ${(articulo.cantidad * articulo.precio_unitario).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => quitarArticulo(index)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalFooter>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors rounded-lg"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-medium"
        >
          {buttonText}
        </button>
      </ModalFooter>
    </form>
  )
}

const Ventas = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedVenta, setSelectedVenta] = useState(null)
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  
  const { data: ventas, loading, error, postData, putData, deleteData, refetch } = useApi('/ventas/todos/')
  const { data: clientes } = useApi('/clientes/todos/')
  const { data: articulos } = useApi('/articulos/todos/')
  
  const [formData, setFormData] = useState({
    cliente_id: '',
    fecha_venta: new Date().toISOString().split('T')[0],
    total: '',
    estado: 'completada',
    articulos: []
  })

  const filteredVentas = ventas?.filter(venta => {
    const matchesSearch = venta.venta_numero?.toString().includes(searchTerm) ||
                         venta.cliente_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (fechaInicio && fechaFin) {
      const fechaVenta = new Date(venta.fecha_venta)
      const inicio = new Date(fechaInicio)
      const fin = new Date(fechaFin)
      return matchesSearch && fechaVenta >= inicio && fechaVenta <= fin
    }
    
    return matchesSearch
  }) || []

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreate = async () => {
    try {
      await postData('/ventas/', {
        ...formData,
        total: parseFloat(formData.total),
        fecha_venta: new Date().toISOString()
      })
      setShowCreateModal(false)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error creando venta: ' + error.message)
    }
  }

  const handleEdit = (venta) => {
    setSelectedVenta(venta)
    setFormData({
      cliente_id: venta.cliente_id || '',
      fecha_venta: venta.fecha_venta?.split('T')[0] || new Date().toISOString().split('T')[0],
      total: venta.total || '',
      estado: venta.estado || 'completada',
      articulos: venta.articulos || []
    })
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    try {
      await putData(`/ventas/${selectedVenta.venta_numero}`, {
        ...formData,
        total: parseFloat(formData.total)
      })
      setShowEditModal(false)
      setSelectedVenta(null)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error actualizando venta: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta venta?')) {
      try {
        await deleteData(`/ventas/${id}`)
        refetch()
      } catch (error) {
        alert('Error eliminando venta: ' + error.message)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      cliente_id: '',
      fecha_venta: new Date().toISOString().split('T')[0],
      total: '',
      estado: 'completada',
      articulos: []
    })
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Gestión de Ventas
            </h1>
            <p className="text-slate-600">Administra el historial y registro de ventas</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            
            <button 
              onClick={() => {
                resetForm()
                setShowCreateModal(true)
              }}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Venta</span>
            </button>
          </div>
        </div>

        {/* Search and Date Filter */}
        <BentoCard color="green" className="mb-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar ventas por número o cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Inicio</label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Fin</label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFechaInicio('')
                    setFechaFin('')
                  }}
                  className="w-full p-2 bg-slate-500 hover:bg-slate-600 text-white rounded-xl transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Sales Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Cargando ventas...</p>
          </div>
        ) : error ? (
          <BentoCard color="red">
            <div className="text-center py-8">
              <p className="text-red-500 text-lg">Error al cargar las ventas</p>
              <p className="text-slate-600 mt-2">{error}</p>
            </div>
          </BentoCard>
        ) : (
          <BentoGrid>
            {filteredVentas.map((venta, index) => (
              <BentoCard key={venta.venta_numero || index} color="green" className="relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <ShoppingCart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">Venta #{venta.venta_numero}</h3>
                      <p className="text-slate-600 text-sm">Cliente ID: {venta.cliente_id}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    venta.estado === 'completada' ? 'bg-green-100 text-green-800' : 
                    venta.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {venta.estado || 'Procesada'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{venta.cliente_nombre || 'Cliente no especificado'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(venta.fecha_venta)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-semibold">{formatCurrency(venta.total)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">{venta.cantidad_articulos || 0} artículos</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleEdit(venta)}
                    className="flex-1 flex items-center justify-center space-x-1 p-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Editar</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(venta.venta_numero)}
                    className="flex-1 flex items-center justify-center space-x-1 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Eliminar</span>
                  </button>
                </div>
              </BentoCard>
            ))}
          </BentoGrid>
        )}

        {/* Modals */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false)
            resetForm()
          }}
          title="Crear Nueva Venta"
          size="lg"
        >
          <VentaForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleCreate} 
            onClose={() => {
              setShowCreateModal(false)
              resetForm()
            }}
            buttonText="Crear Venta"
            clientes={clientes}
            articulos={articulos}
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedVenta(null)
            resetForm()
          }}
          title="Editar Venta"
          size="lg"
        >
          <VentaForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleUpdate} 
            onClose={() => {
              setShowEditModal(false)
              setSelectedVenta(null)
              resetForm()
            }}
            buttonText="Actualizar Venta"
            clientes={clientes}
            articulos={articulos}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Ventas
import React, { useState } from 'react'
import { BentoGrid, BentoCard } from '../ui/bento-grid'
import { FileText, Plus, Search, Calendar, User, Package, Clock, Edit, Trash2 } from 'lucide-react'
import { useApi } from '../../hooks/useApi'
import { Modal, ModalFooter } from '../ui/modal'
import { TIPOS_ORDEN, ESTADOS, PRIORIDADES } from '../../utils/constants'

// Componente de formulario movido FUERA
const OrdenForm = ({ formData, onInputChange, onSubmit, onClose, buttonText, clientes }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Cliente *
          </label>
          <select
            required
            value={formData.cliente_id}
            onChange={(e) => onInputChange('cliente_id', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            Tipo de Orden
          </label>
          <select
            value={formData.tipo_orden}
            onChange={(e) => onInputChange('tipo_orden', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {TIPOS_ORDEN.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fecha Creación
          </label>
          <input
            type="date"
            value={formData.fecha_creacion}
            onChange={(e) => onInputChange('fecha_creacion', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Estado
          </label>
          <select
            value={formData.estado}
            onChange={(e) => onInputChange('estado', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {ESTADOS.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Prioridad
          </label>
          <select
            value={formData.prioridad}
            onChange={(e) => onInputChange('prioridad', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {PRIORIDADES.map(prioridad => (
              <option key={prioridad} value={prioridad}>{prioridad}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tiempo Estimado
          </label>
          <input
            type="text"
            value={formData.tiempo_estimado}
            onChange={(e) => onInputChange('tiempo_estimado', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Ej: 2 horas, 1 día..."
            maxLength={100}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Descripción *
        </label>
        <textarea
          required
          value={formData.descripcion}
          onChange={(e) => onInputChange('descripcion', e.target.value)}
          rows="3"
          className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Describe los trabajos a realizar..."
          maxLength={500}
        />
        <div className="text-xs text-slate-500 mt-1">
          {formData.descripcion.length}/500 caracteres
        </div>
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
          className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors font-medium"
        >
          {buttonText}
        </button>
      </ModalFooter>
    </form>
  )
}

const Ordenes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedOrden, setSelectedOrden] = useState(null)
  const [filterTipo, setFilterTipo] = useState('todos')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  
  const { data: ordenes, loading, error, postData, putData, deleteData, refetch } = useApi('/ordenes/todos/')
  const { data: clientes } = useApi('/clientes/todos/')
  
  const [formData, setFormData] = useState({
    cliente_id: '',
    tipo_orden: 'Instalación',
    descripcion: '',
    fecha_creacion: new Date().toISOString().split('T')[0],
    estado: 'Pendiente',
    prioridad: 'Media',
    tiempo_estimado: ''
  })

  const filteredOrdenes = ordenes?.filter(orden => {
    const matchesSearch = orden.consecutivo?.toString().includes(searchTerm) ||
                         orden.tipo_orden?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orden.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTipo = filterTipo === 'todos' || orden.tipo_orden === filterTipo
    
    let matchesFecha = true
    if (fechaInicio && fechaFin) {
      const fechaOrden = new Date(orden.fecha_creacion)
      const inicio = new Date(fechaInicio)
      const fin = new Date(fechaFin)
      matchesFecha = fechaOrden >= inicio && fechaOrden <= fin
    }
    
    return matchesSearch && matchesTipo && matchesFecha
  }) || []

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES')
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreate = async () => {
    try {
      await postData('/ordenes/', formData)
      setShowCreateModal(false)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error creando orden: ' + error.message)
    }
  }

  const handleEdit = (orden) => {
    setSelectedOrden(orden)
    setFormData({
      cliente_id: orden.cliente_id || '',
      tipo_orden: orden.tipo_orden || 'Instalación',
      descripcion: orden.descripcion || '',
      fecha_creacion: orden.fecha_creacion?.split('T')[0] || new Date().toISOString().split('T')[0],
      estado: orden.estado || 'Pendiente',
      prioridad: orden.prioridad || 'Media',
      tiempo_estimado: orden.tiempo_estimado || ''
    })
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    try {
      await putData(`/ordenes/${selectedOrden.consecutivo}`, formData)
      setShowEditModal(false)
      setSelectedOrden(null)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error actualizando orden: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta orden?')) {
      try {
        await deleteData(`/ordenes/${id}`)
        refetch()
      } catch (error) {
        alert('Error eliminando orden: ' + error.message)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      cliente_id: '',
      tipo_orden: 'Instalación',
      descripcion: '',
      fecha_creacion: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      prioridad: 'Media',
      tiempo_estimado: ''
    })
  }

  const getStatusColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'completada': return 'bg-green-100 text-green-800'
      case 'en_proceso': 
      case 'en proceso': return 'bg-blue-100 text-blue-800'
      case 'pendiente': return 'bg-yellow-100 text-yellow-800'
      case 'cancelada': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
              Gestión de Órdenes
            </h1>
            <p className="text-slate-600">Administra las órdenes de trabajo y servicio</p>
          </div>
          <button 
            onClick={() => {
              resetForm()
              setShowCreateModal(true)
            }}
            className="mt-4 lg:mt-0 flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Orden</span>
          </button>
        </div>

        {/* Search and Filters */}
        <BentoCard color="purple" className="mb-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar órdenes por consecutivo, tipo o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="todos">Todos los tipos</option>
                {TIPOS_ORDEN.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Inicio</label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Fin</label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFechaInicio('')
                    setFechaFin('')
                    setFilterTipo('todos')
                  }}
                  className="w-full p-2 bg-slate-500 hover:bg-slate-600 text-white rounded-xl transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Orders Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Cargando órdenes...</p>
          </div>
        ) : error ? (
          <BentoCard color="red">
            <div className="text-center py-8">
              <p className="text-red-500 text-lg">Error al cargar las órdenes</p>
              <p className="text-slate-600 mt-2">{error}</p>
            </div>
          </BentoCard>
        ) : (
          <BentoGrid>
            {filteredOrdenes.map((orden, index) => (
              <BentoCard key={orden.consecutivo || index} color="purple" className="relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-xl">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">Orden #{orden.consecutivo}</h3>
                      <p className="text-slate-600 text-sm">{orden.tipo_orden || 'Orden de trabajo'}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(orden.estado)}`}>
                    {orden.estado || 'Pendiente'}
                  </span>
                </div>

                <p className="text-slate-600 mb-4 line-clamp-2">
                  {orden.descripcion || 'Sin descripción disponible'}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(orden.fecha_creacion)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Cliente: {orden.cliente_id}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">Prioridad: {orden.prioridad || 'Media'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{orden.tiempo_estimado || 'No especificado'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleEdit(orden)}
                    className="flex-1 flex items-center justify-center space-x-1 p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Editar</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(orden.consecutivo)}
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
          title="Crear Nueva Orden"
          size="lg"
        >
          <OrdenForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleCreate} 
            onClose={() => {
              setShowCreateModal(false)
              resetForm()
            }}
            buttonText="Crear Orden"
            clientes={clientes}
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedOrden(null)
            resetForm()
          }}
          title="Editar Orden"
          size="lg"
        >
          <OrdenForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleUpdate} 
            onClose={() => {
              setShowEditModal(false)
              setSelectedOrden(null)
              resetForm()
            }}
            buttonText="Actualizar Orden"
            clientes={clientes}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Ordenes
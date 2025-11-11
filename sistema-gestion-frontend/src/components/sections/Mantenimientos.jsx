import React, { useState } from 'react'
import { BentoGrid, BentoCard } from '../ui/bento-grid'
import { Settings, Plus, Search, Calendar, User, Wrench, Clock, Edit, Trash2, Download, Users } from 'lucide-react'
import { useApi } from '../../hooks/useApi'
import { Modal, ModalFooter } from '../ui/modal'
import { TIPOS_MANTENIMIENTO, ESTADOS, PRIORIDADES } from '../../utils/constants'

// Componente de formulario movido FUERA
const MantenimientoForm = ({ formData, onInputChange, onSubmit, onClose, buttonText, clientes }) => {
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
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            Tipo de Mantenimiento
          </label>
          <select
            value={formData.tipo_mto}
            onChange={(e) => onInputChange('tipo_mto', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {TIPOS_MANTENIMIENTO.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fecha Solicitud
          </label>
          <input
            type="date"
            value={formData.fecha_solicitud}
            onChange={(e) => onInputChange('fecha_solicitud', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fecha Programada
          </label>
          <input
            type="date"
            value={formData.fecha_programada}
            onChange={(e) => onInputChange('fecha_programada', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Estado
          </label>
          <select
            value={formData.estado}
            onChange={(e) => onInputChange('estado', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {PRIORIDADES.map(prioridad => (
              <option key={prioridad} value={prioridad}>{prioridad}</option>
            ))}
          </select>
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
          className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Describe el trabajo a realizar..."
          maxLength={500}
        />
        <div className="text-xs text-slate-500 mt-1">
          {formData.descripcion.length}/500 caracteres
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Duración Estimada
          </label>
          <input
            type="text"
            value={formData.duracion_estimada}
            onChange={(e) => onInputChange('duracion_estimada', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Ej: 2 horas, 1 día..."
            maxLength={100}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Costo Estimado
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.costo_estimado}
            onChange={(e) => onInputChange('costo_estimado', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="0.00"
          />
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
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors font-medium"
        >
          {buttonText}
        </button>
      </ModalFooter>
    </form>
  )
}

const Mantenimientos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null)
  const [filterTipo, setFilterTipo] = useState('todos')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState('')
  
  const { data: mantenimientos, loading, error, postData, putData, deleteData, refetch } = useApi('/mantenimientos/todos/')
  const { data: clientes } = useApi('/clientes/todos/')
  const { data: tecnicos } = useApi('/tecnicos/todos/')
  
  const [formData, setFormData] = useState({
    cliente_id: '',
    tipo_mto: 'Preventivo',
    descripcion: '',
    fecha_solicitud: new Date().toISOString().split('T')[0],
    fecha_programada: '',
    estado: 'Pendiente',
    prioridad: 'Media',
    duracion_estimada: '',
    costo_estimado: ''
  })

  const filteredMantenimientos = mantenimientos?.filter(mto => {
    const matchesSearch = mto.mto_numero?.toString().includes(searchTerm) ||
                         mto.tipo_mto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTipo = filterTipo === 'todos' || mto.tipo_mto === filterTipo
    
    let matchesFecha = true
    if (fechaInicio && fechaFin) {
      const fechaMto = new Date(mto.fecha_solicitud || mto.fecha_programada)
      const inicio = new Date(fechaInicio)
      const fin = new Date(fechaFin)
      matchesFecha = fechaMto >= inicio && fechaMto <= fin
    }
    
    return matchesSearch && matchesTipo && matchesFecha
  }) || []

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada'
    return new Date(dateString).toLocaleDateString('es-ES')
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreate = async () => {
    try {
      await postData('/mantenimientos/', {
        ...formData,
        costo_estimado: formData.costo_estimado ? parseFloat(formData.costo_estimado) : null
      })
      setShowCreateModal(false)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error creando mantenimiento: ' + error.message)
    }
  }

  const handleEdit = (mto) => {
    setSelectedMantenimiento(mto)
    setFormData({
      cliente_id: mto.cliente_id || '',
      tipo_mto: mto.tipo_mto || 'Preventivo',
      descripcion: mto.descripcion || '',
      fecha_solicitud: mto.fecha_solicitud?.split('T')[0] || new Date().toISOString().split('T')[0],
      fecha_programada: mto.fecha_programada?.split('T')[0] || '',
      estado: mto.estado || 'Pendiente',
      prioridad: mto.prioridad || 'Media',
      duracion_estimada: mto.duracion_estimada || '',
      costo_estimado: mto.costo_estimado || ''
    })
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    try {
      await putData(`/mantenimientos/${selectedMantenimiento.mto_numero}`, {
        ...formData,
        costo_estimado: formData.costo_estimado ? parseFloat(formData.costo_estimado) : null
      })
      setShowEditModal(false)
      setSelectedMantenimiento(null)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error actualizando mantenimiento: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este mantenimiento?')) {
      try {
        await deleteData(`/mantenimientos/${id}`)
        refetch()
      } catch (error) {
        alert('Error eliminando mantenimiento: ' + error.message)
      }
    }
  }

  const asignarTecnico = async (mtoNumero, tecnicoId) => {
    try {
      await postData(`/mantenimientos/${mtoNumero}/tecnicos/${tecnicoId}`)
      refetch()
      setTecnicoSeleccionado('')
    } catch (error) {
      alert('Error asignando técnico: ' + error.message)
    }
  }

  const resetForm = () => {
    setFormData({
      cliente_id: '',
      tipo_mto: 'Preventivo',
      descripcion: '',
      fecha_solicitud: new Date().toISOString().split('T')[0],
      fecha_programada: '',
      estado: 'Pendiente',
      prioridad: 'Media',
      duracion_estimada: '',
      costo_estimado: ''
    })
    setTecnicoSeleccionado('')
  }

  const getStatusColor = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'completado': return 'bg-green-100 text-green-800'
      case 'en_proceso': 
      case 'en proceso': return 'bg-blue-100 text-blue-800'
      case 'pendiente': return 'bg-yellow-100 text-yellow-800'
      case 'cancelado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
              Gestión de Mantenimientos
            </h1>
            <p className="text-slate-600">Administra los mantenimientos y servicios técnicos</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            
            <button 
              onClick={() => {
                resetForm()
                setShowCreateModal(true)
              }}
              className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Mantenimiento</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <BentoCard color="orange" className="mb-8">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar mantenimientos por número, tipo o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="todos">Todos los tipos</option>
                {TIPOS_MANTENIMIENTO.map(tipo => (
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
                  className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Fecha Fin</label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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

        {/* Maintenance Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Cargando mantenimientos...</p>
          </div>
        ) : error ? (
          <BentoCard color="red">
            <div className="text-center py-8">
              <p className="text-red-500 text-lg">Error al cargar los mantenimientos</p>
              <p className="text-slate-600 mt-2">{error}</p>
            </div>
          </BentoCard>
        ) : (
          <BentoGrid>
            {filteredMantenimientos.map((mto, index) => (
              <BentoCard key={mto.mto_numero || index} color="orange" className="relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-xl">
                      <Settings className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">MTO-{mto.mto_numero}</h3>
                      <p className="text-slate-600 text-sm">{mto.tipo_mto || 'Mantenimiento'}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(mto.estado)}`}>
                    {mto.estado || 'Pendiente'}
                  </span>
                </div>

                <p className="text-slate-600 mb-4 line-clamp-2">
                  {mto.descripcion || 'Sin descripción disponible'}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{formatDate(mto.fecha_solicitud)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Cliente: {mto.cliente_id}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Wrench className="w-4 h-4" />
                    <span className="text-sm">{mto.cantidad_tecnicos || 0} técnicos asignados</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{mto.duracion_estimada || 'No especificada'}</span>
                  </div>
                  {mto.costo_estimado && (
                    <div className="flex items-center space-x-2 text-slate-600">
                      <span className="text-sm font-semibold">${mto.costo_estimado}</span>
                    </div>
                  )}
                </div>

                {/* Asignar Técnico */}
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <select
                      value={tecnicoSeleccionado}
                      onChange={(e) => setTecnicoSeleccionado(e.target.value)}
                      className="flex-1 p-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Asignar técnico...</option>
                      {tecnicos?.filter(t => t.disponible).map(tecnico => (
                        <option key={tecnico.id_tecnico} value={tecnico.id_tecnico}>
                          {tecnico.nombre} - {tecnico.especialidad}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => tecnicoSeleccionado && asignarTecnico(mto.mto_numero, tecnicoSeleccionado)}
                      disabled={!tecnicoSeleccionado}
                      className="px-3 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-400 text-white rounded-xl transition-colors text-sm"
                    >
                      <Users className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleEdit(mto)}
                    className="flex-1 flex items-center justify-center space-x-1 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Editar</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(mto.mto_numero)}
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
          title="Crear Nuevo Mantenimiento"
          size="lg"
        >
          <MantenimientoForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleCreate} 
            onClose={() => {
              setShowCreateModal(false)
              resetForm()
            }}
            buttonText="Crear Mantenimiento"
            clientes={clientes}
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedMantenimiento(null)
            resetForm()
          }}
          title="Editar Mantenimiento"
          size="lg"
        >
          <MantenimientoForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleUpdate} 
            onClose={() => {
              setShowEditModal(false)
              setSelectedMantenimiento(null)
              resetForm()
            }}
            buttonText="Actualizar Mantenimiento"
            clientes={clientes}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Mantenimientos
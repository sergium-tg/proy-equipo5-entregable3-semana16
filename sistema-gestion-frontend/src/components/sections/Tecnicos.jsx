import React, { useState } from 'react'
import { BentoGrid, BentoCard } from '../ui/bento-grid'
import { Wrench, Plus, Search, Mail, Phone, Star, Calendar, Edit, Trash2 } from 'lucide-react'
import { useApi } from '../../hooks/useApi'
import { Modal, ModalFooter } from '../ui/modal'
import { ESPECIALIDADES_TECNICOS } from '../../utils/constants'

// Componente de formulario movido FUERA
const TecnicoForm = ({ formData, onInputChange, onSubmit, onClose, buttonText }) => {
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
            Nombre Completo *
          </label>
          <input
            type="text"
            required
            value={formData.nombre}
            onChange={(e) => onInputChange('nombre', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Nombre del técnico"
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="tecnico@email.com"
            maxLength={150}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            value={formData.telefono}
            onChange={(e) => onInputChange('telefono', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="+57 300 123 4567"
            maxLength={20}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Especialidad
          </label>
          <select
            value={formData.especialidad}
            onChange={(e) => onInputChange('especialidad', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {ESPECIALIDADES_TECNICOS.map(especialidad => (
              <option key={especialidad} value={especialidad}>{especialidad}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Experiencia (años)
          </label>
          <input
            type="number"
            min="0"
            value={formData.experiencia}
            onChange={(e) => onInputChange('experiencia', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Calificación (1-5)
          </label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={formData.calificacion}
            onChange={(e) => onInputChange('calificacion', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="5.0"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="disponible"
          checked={formData.disponible}
          onChange={(e) => onInputChange('disponible', e.target.checked)}
          className="w-4 h-4 text-red-500 rounded focus:ring-red-500"
        />
        <label htmlFor="disponible" className="text-sm text-slate-700">
          Disponible para asignaciones
        </label>
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
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium"
        >
          {buttonText}
        </button>
      </ModalFooter>
    </form>
  )
}

const Tecnicos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTecnico, setSelectedTecnico] = useState(null)
  
  const { data: tecnicos, loading, error, postData, putData, deleteData, refetch } = useApi('/tecnicos/todos/')
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    especialidad: 'General',
    experiencia: '',
    calificacion: '5.0',
    disponible: true
  })

  const filteredTecnicos = tecnicos?.filter(tecnico => 
    tecnico.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tecnico.especialidad?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tecnico.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const getStatusColor = (disponible) => {
    return disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const renderStars = (calificacion) => {
    const stars = []
    const rating = calificacion || 0
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      )
    }
    return stars
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreate = async () => {
    try {
      await postData('/tecnicos/', {
        ...formData,
        experiencia: parseInt(formData.experiencia) || 0,
        calificacion: parseFloat(formData.calificacion) || 5.0
      })
      setShowCreateModal(false)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error creando técnico: ' + error.message)
    }
  }

  const handleEdit = (tecnico) => {
    setSelectedTecnico(tecnico)
    setFormData({
      nombre: tecnico.nombre || '',
      email: tecnico.email || '',
      telefono: tecnico.telefono || '',
      especialidad: tecnico.especialidad || 'General',
      experiencia: tecnico.experiencia?.toString() || '',
      calificacion: tecnico.calificacion?.toString() || '5.0',
      disponible: tecnico.disponible || true
    })
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    try {
      await putData(`/tecnicos/${selectedTecnico.id_tecnico}`, {
        ...formData,
        experiencia: parseInt(formData.experiencia) || 0,
        calificacion: parseFloat(formData.calificacion) || 5.0
      })
      setShowEditModal(false)
      setSelectedTecnico(null)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error actualizando técnico: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este técnico?')) {
      try {
        await deleteData(`/tecnicos/${id}`)
        refetch()
      } catch (error) {
        alert('Error eliminando técnico: ' + error.message)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      especialidad: 'General',
      experiencia: '',
      calificacion: '5.0',
      disponible: true
    })
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Gestión de Técnicos
            </h1>
            <p className="text-slate-600">Administra el equipo de técnicos y especialistas</p>
          </div>
          <button 
            onClick={() => {
              resetForm()
              setShowCreateModal(true)
            }}
            className="mt-4 lg:mt-0 flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Técnico</span>
          </button>
        </div>

        {/* Search */}
        <BentoCard color="red" className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar técnicos por nombre, especialidad o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </BentoCard>

        {/* Technicians Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Cargando técnicos...</p>
          </div>
        ) : error ? (
          <BentoCard color="red">
            <div className="text-center py-8">
              <p className="text-red-500 text-lg">Error al cargar los técnicos</p>
              <p className="text-slate-600 mt-2">{error}</p>
            </div>
          </BentoCard>
        ) : (
          <BentoGrid>
            {filteredTecnicos.map((tecnico, index) => (
              <BentoCard key={tecnico.id_tecnico || index} color="red" className="relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-xl">
                      <Wrench className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">{tecnico.nombre || 'Técnico Sin Nombre'}</h3>
                      <p className="text-slate-600 text-sm">ID: {tecnico.id_tecnico}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tecnico.disponible)}`}>
                    {tecnico.disponible ? 'Disponible' : 'No Disponible'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{tecnico.email || 'No especificado'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{tecnico.telefono || 'No especificado'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Wrench className="w-4 h-4" />
                    <span className="text-sm">{tecnico.especialidad || 'General'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Exp: {tecnico.experiencia || '0'} años</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(tecnico.calificacion)}
                  </div>
                  <span className="text-sm text-slate-600">
                    {tecnico.mantenimientos_completados || 0} mantenimientos
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleEdit(tecnico)}
                    className="flex-1 flex items-center justify-center space-x-1 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Editar</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(tecnico.id_tecnico)}
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
          title="Crear Nuevo Técnico"
        >
          <TecnicoForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleCreate} 
            onClose={() => {
              setShowCreateModal(false)
              resetForm()
            }}
            buttonText="Crear Técnico" 
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedTecnico(null)
            resetForm()
          }}
          title="Editar Técnico"
        >
          <TecnicoForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleUpdate} 
            onClose={() => {
              setShowEditModal(false)
              setSelectedTecnico(null)
              resetForm()
            }}
            buttonText="Actualizar Técnico" 
          />
        </Modal>
      </div>
    </div>
  )
}

export default Tecnicos
import React, { useState } from 'react'
import { BentoGrid, BentoCard } from '../ui/bento-grid'
import { Users, Plus, Search, Mail, Phone, MapPin, Edit, Trash2, Download } from 'lucide-react'
import { useApi } from '../../hooks/useApi'
import { Modal, ModalFooter } from '../ui/modal'

// Componente de formulario movido FUERA
const ClienteForm = ({ formData, onInputChange, onSubmit, onClose, buttonText }) => {
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
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Nombre del cliente"
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
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="cliente@email.com"
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
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="+57 300 123 4567"
            maxLength={20}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Ciudad
          </label>
          <input
            type="text"
            value={formData.ciudad}
            onChange={(e) => onInputChange('ciudad', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Ciudad"
            maxLength={100}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Dirección
        </label>
        <textarea
          value={formData.direccion}
          onChange={(e) => onInputChange('direccion', e.target.value)}
          rows="2"
          className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Dirección completa"
          maxLength={300}
        />
        <div className="text-xs text-slate-500 mt-1">
          {formData.direccion.length}/300 caracteres
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          País
        </label>
        <select
          value={formData.pais}
          onChange={(e) => onInputChange('pais', e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="Colombia">Colombia</option>
          <option value="México">México</option>
          <option value="Argentina">Argentina</option>
          <option value="España">España</option>
          <option value="Chile">Chile</option>
          <option value="Perú">Perú</option>
        </select>
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
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors font-medium"
        >
          {buttonText}
        </button>
      </ModalFooter>
    </form>
  )
}

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null)
  
  const { data: clientes, loading, error, postData, putData, deleteData, refetch } = useApi('/clientes/todos/')
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    pais: 'Colombia'
  })

  const filteredClientes = clientes?.filter(cliente => 
    cliente.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono?.includes(searchTerm)
  ) || []

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreate = async () => {
    try {
      await postData('/clientes/', formData)
      setShowCreateModal(false)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error creando cliente: ' + error.message)
    }
  }

  const handleEdit = (cliente) => {
    setSelectedCliente(cliente)
    setFormData({
      nombre: cliente.nombre || '',
      email: cliente.email || '',
      telefono: cliente.telefono || '',
      direccion: cliente.direccion || '',
      ciudad: cliente.ciudad || '',
      pais: cliente.pais || 'Colombia'
    })
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    try {
      await putData(`/clientes/${selectedCliente.cliente_id}`, formData)
      setShowEditModal(false)
      setSelectedCliente(null)
      resetForm()
      refetch()
    } catch (error) {
      alert('Error actualizando cliente: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await deleteData(`/clientes/${id}`)
        refetch()
      } catch (error) {
        alert('Error eliminando cliente: ' + error.message)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      pais: 'Colombia'
    })
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Gestión de Clientes
            </h1>
            <p className="text-slate-600">Administra la base de datos de clientes</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
            
            <button 
              onClick={() => {
                resetForm()
                setShowCreateModal(true)
              }}
              className="flex items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Cliente</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <BentoCard color="indigo" className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar clientes por nombre, email o teléfono..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </BentoCard>

        {/* Clients Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Cargando clientes...</p>
          </div>
        ) : error ? (
          <BentoCard color="red">
            <div className="text-center py-8">
              <p className="text-red-500 text-lg">Error al cargar los clientes</p>
              <p className="text-slate-600 mt-2">{error}</p>
            </div>
          </BentoCard>
        ) : (
          <BentoGrid>
            {filteredClientes.map((cliente, index) => (
              <BentoCard key={cliente.cliente_id || index} color="indigo" className="relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-xl">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">{cliente.nombre || 'Cliente Sin Nombre'}</h3>
                      <p className="text-slate-600 text-sm">ID: {cliente.cliente_id}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Activo
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{cliente.email || 'No especificado'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{cliente.telefono || 'No especificado'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{cliente.direccion || 'No especificado'}</span>
                  </div>
                  {(cliente.ciudad || cliente.pais) && (
                    <div className="text-xs text-slate-500">
                      {[cliente.ciudad, cliente.pais].filter(Boolean).join(', ')}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleEdit(cliente)}
                    className="flex-1 flex items-center justify-center space-x-1 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Editar</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(cliente.cliente_id)}
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
          title="Crear Nuevo Cliente"
        >
          <ClienteForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleCreate} 
            onClose={() => {
              setShowCreateModal(false)
              resetForm()
            }}
            buttonText="Crear Cliente" 
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedCliente(null)
            resetForm()
          }}
          title="Editar Cliente"
        >
          <ClienteForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleUpdate} 
            onClose={() => {
              setShowEditModal(false)
              setSelectedCliente(null)
              resetForm()
            }}
            buttonText="Actualizar Cliente" 
          />
        </Modal>
      </div>
    </div>
  )
}

export default Clientes
import React, { useState } from 'react'
import { BentoGrid, BentoCard } from '../ui/bento-grid'
import { Package, Plus, Search, Edit, Trash2, Download } from 'lucide-react'
import { useApi } from '../../hooks/useApi'
import { Modal, ModalFooter } from '../ui/modal'

// Componente de formulario movido FUERA para evitar re-renders
const ArticuloForm = ({ formData, onInputChange, onSubmit, onClose, buttonText }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Nombre *
        </label>
        <input
          type="text"
          required
          value={formData.nombre}
          onChange={(e) => onInputChange('nombre', e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Nombre del artículo"
          maxLength={300}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Descripción
        </label>
        <textarea
          value={formData.descripcion}
          onChange={(e) => onInputChange('descripcion', e.target.value)}
          rows="3"
          className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Descripción del artículo"
          maxLength={500}
        />
        <div className="text-xs text-slate-500 mt-1">
          {formData.descripcion.length}/500 caracteres
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Precio *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            required
            value={formData.precio}
            onChange={(e) => onInputChange('precio', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Stock *
          </label>
          <input
            type="number"
            min="0"
            required
            value={formData.stock}
            onChange={(e) => onInputChange('stock', e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="disponibilidad"
          checked={formData.disponibilidad}
          onChange={(e) => onInputChange('disponibilidad', e.target.checked)}
          className="w-4 h-4 text-emerald-500 rounded focus:ring-emerald-500"
        />
        <label htmlFor="disponibilidad" className="text-sm text-slate-700">
          Disponible para venta
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
          className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors font-medium"
        >
          {buttonText}
        </button>
      </ModalFooter>
    </form>
  )
}

const Articulos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedArticulo, setSelectedArticulo] = useState(null)
  const [filterDisponibilidad, setFilterDisponibilidad] = useState('todos')
  
  const { data: articulos, loading, error, postData, putData, deleteData, refetch } = useApi('/articulos/todos/')
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    disponibilidad: true
  })

  const filteredArticulos = articulos?.filter(articulo => {
    const matchesSearch = articulo.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         articulo.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterDisponibilidad === 'todos' || 
                         (filterDisponibilidad === 'disponible' && articulo.disponibilidad) ||
                         (filterDisponibilidad === 'no-disponible' && !articulo.disponibilidad)
    return matchesSearch && matchesFilter
  }) || []

  // Función para manejar cambios en los inputs
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreate = async () => {
    try {
      await postData('/articulos/', {
        ...formData,
        precio: parseFloat(formData.precio) || 0,
        stock: parseInt(formData.stock) || 0
      })
      setShowCreateModal(false)
      resetForm()
      refetch()
    } catch (error) {
      console.error('Error creando artículo:', error)
      alert('Error creando artículo: ' + error.message)
    }
  }

  const handleEdit = (articulo) => {
    setSelectedArticulo(articulo)
    setFormData({
      nombre: articulo.nombre || '',
      descripcion: articulo.descripcion || '',
      precio: articulo.precio?.toString() || '',
      stock: articulo.stock?.toString() || '',
      disponibilidad: articulo.disponibilidad || true
    })
    setShowEditModal(true)
  }

  const handleUpdate = async () => {
    try {
      await putData(`/articulos/${selectedArticulo.id_articulo}`, {
        ...formData,
        precio: parseFloat(formData.precio) || 0,
        stock: parseInt(formData.stock) || 0
      })
      setShowEditModal(false)
      setSelectedArticulo(null)
      resetForm()
      refetch()
    } catch (error) {
      console.error('Error actualizando artículo:', error)
      alert('Error actualizando artículo: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      try {
        await deleteData(`/articulos/${id}`)
        refetch()
      } catch (error) {
        alert('Error eliminando artículo: ' + error.message)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      disponibilidad: true
    })
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
              Gestión de Artículos
            </h1>
            <p className="text-slate-600">Administra el inventario de productos y artículos</p>
          </div>
          <div className="flex space-x-3 mt-4 lg:mt-0">
           
            <button 
              onClick={() => {
                resetForm()
                setShowCreateModal(true)
              }}
              className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>Nuevo Artículo</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <BentoCard color="emerald" className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterDisponibilidad}
              onChange={(e) => setFilterDisponibilidad(e.target.value)}
              className="px-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="todos">Todos</option>
              <option value="disponible">Disponibles</option>
              <option value="no-disponible">No Disponibles</option>
            </select>
          </div>
        </BentoCard>

        {/* Articles Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-slate-600">Cargando artículos...</p>
          </div>
        ) : error ? (
          <BentoCard color="red">
            <div className="text-center py-8">
              <p className="text-red-500 text-lg">Error al cargar los artículos</p>
              <p className="text-slate-600 mt-2">{error}</p>
            </div>
          </BentoCard>
        ) : (
          <BentoGrid>
            {filteredArticulos.map((articulo, index) => (
              <BentoCard key={articulo.id_articulo || index} color="emerald" className="relative group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                      <Package className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">{articulo.nombre || 'Artículo Sin Nombre'}</h3>
                      <p className="text-slate-600 text-sm">ID: {articulo.id_articulo}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    articulo.disponibilidad ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {articulo.disponibilidad ? 'Disponible' : 'Agotado'}
                  </span>
                </div>

                <p className="text-slate-600 mb-4 line-clamp-2">
                  {articulo.descripcion || 'Sin descripción disponible'}
                </p>

                <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                  <span className="font-semibold">${articulo.precio || '0'}</span>
                  <span>Stock: {articulo.stock || '0'}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleEdit(articulo)}
                    className="flex-1 flex items-center justify-center space-x-1 p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Editar</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(articulo.id_articulo)}
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
          title="Crear Nuevo Artículo"
        >
          <ArticuloForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleCreate} 
            onClose={() => {
              setShowCreateModal(false)
              resetForm()
            }}
            buttonText="Crear Artículo" 
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedArticulo(null)
            resetForm()
          }}
          title="Editar Artículo"
        >
          <ArticuloForm 
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleUpdate} 
            onClose={() => {
              setShowEditModal(false)
              setSelectedArticulo(null)
              resetForm()
            }}
            buttonText="Actualizar Artículo"
          />
        </Modal>
      </div>
    </div>
  )
}

export default Articulos
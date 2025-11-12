import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AuthForm from './AuthForm'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio')
      setLoading(false)
      return
    }

    if (!formData.email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    const result = await register(formData.name, formData.email, formData.password)
    
    if (!result.success) {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <AuthForm
      title="Crear Cuenta"
      subtitle="Regístrate en Sistema de Gestión"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {error && (
        <div className={`px-4 py-3 rounded-lg text-sm ${
          error.includes('ya está registrado') 
            ? 'bg-orange-50 border border-orange-200 text-orange-600'
            : 'bg-red-50 border border-red-200 text-red-600'
        }`}>
          {error}
          {error.includes('ya está registrado') && (
            <div className="mt-2">
              <a 
                href="#login" 
                className="font-medium underline hover:text-orange-700"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </a>
            </div>
          )}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Nombre Completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200"
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
          Correo Electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="appearance-none relative block w-full px-3 py-3 pr-10 border border-slate-300 placeholder-slate-400 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
          Confirmar Contraseña
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="appearance-none relative block w-full px-3 py-3 pr-10 border border-slate-300 placeholder-slate-400 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200"
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </button>
        </div>
      </div>

      <div className="text-center">
        <span className="text-sm text-slate-600">
          ¿Ya tienes cuenta?{' '}
          <a 
            href="#login" 
            className="font-medium text-slate-800 hover:text-slate-600 transition-colors duration-200"
          >
            Inicia sesión aquí
          </a>
        </span>
      </div>
    </AuthForm>
  )
}

export default Register
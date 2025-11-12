import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AuthForm from './AuthForm'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validación básica de email
    if (!email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido')
      setLoading(false)
      return
    }

    const result = await login(email, password)
    
    if (!result.success) {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <AuthForm
      title="Iniciar Sesión"
      subtitle="Accede a tu cuenta de Sistema de Gestión"
      onSubmit={handleSubmit}
      loading={loading}
    >
      {error && (
        <div className={`px-4 py-3 rounded-lg text-sm ${
          error.includes('no está registrado') 
            ? 'bg-orange-50 border border-orange-200 text-orange-600'
            : 'bg-red-50 border border-red-200 text-red-600'
        }`}>
          {error}
          {error.includes('no está registrado') && (
            <div className="mt-2">
              <a 
                href="#register" 
                className="font-medium underline hover:text-orange-700"
              >
                ¿Quieres crear una cuenta?
              </a>
            </div>
          )}
        </div>
      )}
      
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      <div className="text-center">
        <span className="text-sm text-slate-600">
          ¿No tienes cuenta?{' '}
          <a 
            href="#register" 
            className="font-medium text-slate-800 hover:text-slate-600 transition-colors duration-200"
          >
            Regístrate aquí
          </a>
        </span>
      </div>
    </AuthForm>
  )
}

export default Login
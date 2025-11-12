// src/hooks/useApi.js
const BASE_URL = 'http://localhost:8000/api'  // Con /api incluido

export const useApi = () => {
  const request = async (method, endpoint, data = null) => {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      // Agregar token de autenticación si existe
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const user = JSON.parse(userData)
          if (user && user.token) {
            options.headers['Authorization'] = `Bearer ${user.token}`
          }
        } catch (e) {
          console.warn('Error parsing user data:', e)
        }
      }

      if (data && method !== 'GET') {
        options.body = JSON.stringify(data)
      }

      console.log(`🔄 API Call: ${method} ${BASE_URL}${endpoint}`, data)

      const response = await fetch(`${BASE_URL}${endpoint}`, options)
      
      if (!response.ok) {
        // Manejar errores de autenticación
        if (response.status === 401) {
          localStorage.removeItem('user')
          window.location.hash = '#login'
          throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.')
        }
        
        let errorMessage = `Error ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.detail || errorMessage
        } catch {
          // Si no se puede parsear como JSON, usar texto plano
          const errorText = await response.text()
          errorMessage = errorText || errorMessage
        }
        
        throw new Error(errorMessage)
      }

      // Para DELETE sin contenido (204)
      if (response.status === 204) {
        return { success: true, message: 'Operación exitosa' }
      }

      const result = await response.json()
      console.log(`✅ API Response:`, result)
      return result

    } catch (error) {
      console.error(`❌ API Error:`, error)
      throw error
    }
  }

  return {
    get: (endpoint) => request('GET', endpoint),
    post: (endpoint, data) => request('POST', endpoint, data),
    put: (endpoint, data) => request('PUT', endpoint, data),
    del: (endpoint) => request('DELETE', endpoint),
  }
}
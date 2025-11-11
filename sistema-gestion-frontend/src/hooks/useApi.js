import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../utils/constants'

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async (url, config = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem('authToken')
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...config.headers
      }

      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers,
        ...config
      })
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      // Para respuestas sin contenido (DELETE, etc.)
      if (response.status === 204) {
        return null
      }
      
      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      setError(err.message)
      console.error('API Error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const postData = async (url, postData) => {
    return fetchData(url, {
      method: 'POST',
      body: JSON.stringify(postData)
    })
  }

  const putData = async (url, putData) => {
    return fetchData(url, {
      method: 'PUT',
      body: JSON.stringify(putData)
    })
  }

  const deleteData = async (url) => {
    return fetchData(url, {
      method: 'DELETE'
    })
  }

  useEffect(() => {
    if (endpoint && options.autoFetch !== false) {
      fetchData(endpoint)
    }
  }, [endpoint])

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    deleteData,
    refetch: () => fetchData(endpoint)
  }
}

// Hook específico para autenticación
export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      })

      if (!response.ok) {
        throw new Error('Credenciales inválidas')
      }

      const data = await response.json()
      localStorage.setItem('authToken', data.access_token)
      
      // Obtener información del usuario
      const userResponse = await fetch(`${API_BASE_URL}/auth/users/me`, {
        headers: {
          'Authorization': `Bearer ${data.access_token}`
        }
      })
      
      const userData = await userResponse.json()
      setUser(userData)
      
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error('Error en el registro')
      }

      return await response.json()
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  const getCurrentUser = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) return null

    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        return userData
      }
    } catch (err) {
      console.error('Error obteniendo usuario:', err)
      logout()
    }
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    getCurrentUser
  }
}
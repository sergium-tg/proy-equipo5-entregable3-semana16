// src/components/TestConnection.jsx
import React, { useState } from 'react'

const TestConnection = () => {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testBackend = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/articulos/todos/')
      const data = await response.json()
      setResult(`✅ Conexión exitosa: ${data.length} artículos`)
    } catch (error) {
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <button 
        onClick={testBackend} 
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Probando...' : 'Probar Conexión Backend'}
      </button>
      {result && <p className="mt-2">{result}</p>}
    </div>
  )
}

export default TestConnection
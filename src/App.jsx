import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddFood from './pages/AddFood'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
     <Routes>
      <Route
        path="/login"
        element={
          user ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={setUser} />
        }
      />

      <Route
        path="/dashboard"
        element={
          user ? <Dashboard user={user} onLogout={handleLogout}/> : <Navigate to="/login" />
        }
      />

      <Route
        path="/add-food"
        element={
          user ? <AddFood /> : <Navigate to="/login" />
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App

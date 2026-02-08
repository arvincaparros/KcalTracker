import { useState } from 'react'
import './Login.css'

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('https://localhost:7016/api/User/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        throw new Error('Invalid email or password')
      }

      const data = await res.json()

      // save token
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      onLoginSuccess(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card shadow-lg rounded-4 p-4 login-card">
                <div className="card-body">
                    <h3 className="text-center mb-4 fw-bold text-success">
                        Kcal <span style={{color: '#464646'}}>Tracker</span>
                    </h3>

                    {error && (
                        <div className="alert alert-danger text-center py-2">{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label d-block text-start login-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label d-block text-start login-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Login Button */}
                        <button
                        type="submit"
                        className="btn btn-success w-100 fw-bold"
                        disabled={loading}
                        style={{ fontSize: '1rem' }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>

                <div className="card-footer text-center text-muted small mt-3">
                &copy; {new Date().getFullYear()} Kcal Tracker • Track calories, track progress
                </div>
            </div>
        </div>
  )
}

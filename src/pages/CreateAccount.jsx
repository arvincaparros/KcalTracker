import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css' // reuse same styles

export default function CreateAccount() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(
        'https://localhost:7016/api/User/Register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      )

      if (!res.ok) {
        throw new Error('Failed to create account')
      }

      // success → go back to login
      navigate('/login')
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
            Kcal <span style={{ color: '#464646' }}>Tracker</span>
          </h3>

          <p className="text-center text-muted small mb-4">
            Create your account to start tracking calories
          </p>

          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label d-block text-start login-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label d-block text-start login-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label d-block text-start login-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="form-label d-block text-start login-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="btn btn-success w-100 fw-bold"
              disabled={loading}
              style={{ fontSize: '1rem' }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Back to login */}
        <span
          role="button"
          tabIndex={0}
          className="text-primary cursor-pointer text-decoration-none mt-2"
          onClick={() => navigate('/login')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/login')}
        >
          Back to Login
        </span>

        <div className="card-footer text-center text-muted small mt-3">
          &copy; {new Date().getFullYear()} Kcal Tracker • Track calories, track progress
        </div>
      </div>
    </div>
  )
}

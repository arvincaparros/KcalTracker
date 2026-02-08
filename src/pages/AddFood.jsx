import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddFood.css'

export default function AddFood() {
  const navigate = useNavigate()

  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // UI only for now
    console.log({
      foodName,
      calories,
      date,
    })

    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
    
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-1">Add Food</h4>
              <p className="text-muted small mb-4">
                Log what you ate today
              </p>

              {error && (
                <div className="alert alert-danger py-2">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Food Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold d-block text-start">
                    Food Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Chicken Breast"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    required
                  />
                </div>

                {/* Calories */}
                <div className="mb-3">
                  <label className="form-label fw-semibold d-block text-start">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="e.g. 250"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                  />
                </div>

                {/* Date */}
                <div className="mb-4">
                  <label className="form-label fw-semibold d-block text-start">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Food'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center text-muted small mt-3">
            Calories are saved under your account
          </div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function Dashboard( {user, onLogout}) {
  const dailyGoal = 2000
  const [consumed, setConsumed] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTodayCalories = async () => {
      const token = localStorage.getItem('token')

      try {
        const res = await fetch(
          'https://localhost:7016/api/FoodEntries/today-total',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!res.ok) throw new Error('Failed to load calories')

        const data = await res.json()
        setConsumed(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTodayCalories()
  }, [])

  const remaining = Math.max(dailyGoal - consumed, 0)
  const progress = Math.min(
    Math.round((consumed / dailyGoal) * 100),
    100
  )

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header ">
        <div>
          <h4 className="fw-bold mb-0 d-block text-start">
            Hello, <span className="text-success">{user.name}</span>
          </h4>
          <small className="text-muted">Here’s your nutrition summary for today</small>
        </div>

        <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
            <div className="card stat-card stat-success h-100">
            <div className="card-body d-flex flex-column justify-content-center">
                <p className="stat-label">Consumed</p>
                <h3>{consumed} kcal</h3>
            </div>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card stat-card stat-primary h-100">
            <div className="card-body d-flex flex-column justify-content-center">
                <p className="stat-label">Remaining</p>
                <h3>{remaining} kcal</h3>
            </div>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card stat-card stat-dark h-100">
            <div className="card-body d-flex flex-column justify-content-center">
                <p className="stat-label">Daily Goal</p>
                <h3>{dailyGoal} kcal</h3>
            </div>
            </div>
        </div>
      </div>

      {/* Progress */}
      <div className="card progress-card shadow mb-4">
        <div className="card-body ">
          <div className="d-flex justify-content-between mb-2">
            <h6 className="fw-bold mb-0">Today’s Progress</h6>
            <span className="text-muted small">{progress}%</span>
          </div>

          <div className="progress">
            <div
              className="progress-bar bg-success"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow action-card">
            <div className="card-body">
              <h6 className="fw-bold">Add Food</h6>
              <p className="text-muted small mb-3">
                Log meals and snacks instantly
              </p>
              <button className="btn btn-success w-100" onClick={() => navigate('/add-food')}>
                Add Food
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow action-card">
            <div className="card-body">
              <h6 className="fw-bold">Update Entries</h6>
                <p className="text-muted small mb-3">
                  Edit or remove your existing logs
                </p>
                <button className="btn btn-warning w-100" onClick={() => navigate('/manage-entries')}>
                  Manage Entries
                </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow action-card">
            <div className="card-body">
              <h6 className="fw-bold">History</h6>
              <p className="text-muted small mb-3">
                View previous calorie logs
              </p>
              <button className="btn btn-outline-success w-100" onClick={() => navigate('/history')}>
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

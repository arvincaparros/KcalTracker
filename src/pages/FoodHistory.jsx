import { useEffect, useState } from 'react'

export default function FoodHistory() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('token')

      try {
        const response = await fetch(
          'https://localhost:7016/api/FoodEntries/history',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok)
          throw new Error('Failed to load food history')

        const data = await response.json()
        setEntries(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  if (loading)
    return <p className="text-center mt-4">Loading history...</p>

  if (error)
    return (
      <p className="text-danger text-center mt-4">
        {error}
      </p>
    )

  return (
    <div className="py-4 px-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">Food History</h4>
        <span className="text-muted small">
          {entries.length} entries
        </span>
      </div>

      {entries.length === 0 ? (
        <p className="text-muted">No food entries yet.</p>
      ) : (
        <div className="card border-0 shadow-sm rounded-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light text-muted small">
                <tr>
                  <th className="ps-4">Date</th>
                  <th>Food</th>
                  <th className="text-end pe-4">Calories</th>
                </tr>
              </thead>

              <tbody>
                {entries.map((item) => (
                  <tr key={item.id}>
                    <td className="ps-4 fw-semibold">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="fw-medium">
                        {item.foodName}
                      </div>
                    </td>
                    <td className="text-end pe-4 fw-semibold">
                      {item.calories} kcal
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

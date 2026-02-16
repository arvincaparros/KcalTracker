import { useEffect, useState } from 'react'

export default function FoodHistory() {
  const [entries, setEntries] = useState([])
  const [filteredEntries, setFilteredEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

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
        setFilteredEntries(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [])

  // 🔍 Date filter logic
 useEffect(() => {
  let result = [...entries]

  if (fromDate) {
    const from = new Date(fromDate)
    from.setHours(0, 0, 0, 0)

    result = result.filter(e =>
      new Date(e.date) >= from
    )
  }

  if (toDate) {
    const to = new Date(toDate)
    to.setHours(23, 59, 59, 999) // 🔥 key fix

    result = result.filter(e =>
      new Date(e.date) <= to
    )
  }

  setFilteredEntries(result)
}, [fromDate, toDate, entries])

  if (loading)
    return <p className="text-center mt-4">Loading history...</p>

  if (error)
    return (
      <p className="text-danger text-center mt-4">
        {error}
      </p>
    )

  return (
    <div className="container-fluid py-4 px-5">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
  <h4 className="fw-bold mb-0">Food History</h4>

  <div className="d-flex flex-wrap align-items-end gap-3">
    <div>
      <label className="form-label small fw-semibold mb-1">
        Start Date
      </label>
      <input
        type="date"
        className="form-control"
        value={fromDate}
        onChange={e => setFromDate(e.target.value)}
      />
    </div>

    <div>
      <label className="form-label small fw-semibold mb-1">
        End Date
      </label>
      <input
        type="date"
        className="form-control"
        value={toDate}
        onChange={e => setToDate(e.target.value)}
      />
    </div>
  </div>
</div>


      <div className="text-muted small mb-2">
        {filteredEntries.length} entries
      </div>

      {filteredEntries.length === 0 ? (
        <p className="text-muted">No food entries found.</p>
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
                {filteredEntries.map(item => (
                  <tr key={item.id}>
                    <td className="ps-4 fw-semibold">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="fw-medium">
                      {item.foodName}
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

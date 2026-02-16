import { useEffect, useState } from "react";

export default function ManageEntries() {

  // 🔥 Automatically set today
  const today = new Date().toISOString().split("T")[0];

  const [entries, setEntries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  

  // 🔥 Fetch data when date changes (including first load)
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://localhost:7016/api/FoodEntries/GetByFoodEntryDate?date=${selectedDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [selectedDate]);

  const openEditModal = (entry) => {
    setCurrentEntry(entry);
    setShowEditModal(true);
  };

  const openDeleteModal = (entry) => {
    setCurrentEntry(entry);
    setShowDeleteModal(true);
  };

  const handleUpdate = () => {
    setEntries(entries.map(e =>
      e.id === currentEntry.id ? currentEntry : e
    ));
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `https://localhost:7016/api/FoodEntries/${currentEntry.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEntries(entries.filter(e => e.id !== currentEntry.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const totalCalories = entries.reduce(
        (sum, entry) => sum + Number(entry.calories || 0),
        0
    );

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-4">Manage Entries</h4>

      {/* Date Filter */}
      <div className="card shadow mb-4">
        <div className="card-body">
          <label className="form-label fw-semibold">Filter by Date</label>
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card shadow">
        <div className="card-body">

          {loading && (
            <div className="text-center text-muted">
              <div className="spinner-border spinner-border-sm me-2"></div>
              Loading entries...
            </div>
          )}

          {!loading && entries.length === 0 && (
            <p className="text-muted text-center">No entries found.</p>
          )}

          {!loading && entries.length > 0 && (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Food</th>
                    <th>Calories</th>
                    <th>Date</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(entry => (
                    <tr key={entry.id}>
                      <td>{entry.foodName}</td>
                      <td>{entry.calories} kcal</td>
                      <td>{entry.date?.split("T")[0]}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => openEditModal(entry)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => openDeleteModal(entry)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                
                <tfoot className="table-light">
                    <tr>
                        <th>Total</th>
                        <th>{totalCalories} kcal</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
              </table>
            </div>
          )}

        </div>
      </div>

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Entry</h5>
                <button className="btn-close"
                  onClick={() => setShowEditModal(false)}>
                </button>
              </div>
              <div className="modal-body">
                <label>Food Name</label>
                <input
                  className="form-control mb-3"
                  value={currentEntry.foodName}
                  onChange={(e) =>
                    setCurrentEntry({ ...currentEntry, foodName: e.target.value })
                  }
                />

                <label>Calories</label>
                <input
                  type="number"
                  className="form-control"
                  value={currentEntry.calories}
                  onChange={(e) =>
                    setCurrentEntry({ ...currentEntry, calories: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success"
                  onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="modal d-block">
          <div className="modal-dialog modal-sm">
            <div className="modal-content text-center p-3">
              <p>Are you sure you want to delete:</p>
              <strong>{currentEntry?.foodName}</strong>
              <div className="mt-3">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

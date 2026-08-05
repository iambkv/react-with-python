import { useState, useEffect } from "react";
import "./EditModal.css";

function AddItemModal({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    await onAdd({ name: name.trim(), description: description.trim() });
    setSaving(false);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ Add New Item</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="add-name">Item Name *</label>
              <input
                id="add-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name..."
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="add-description">Description</label>
              <textarea
                id="add-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Enter description (optional)..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-save"
              disabled={!name.trim() || saving}
            >
              {saving ? "Saving..." : "💾 Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;

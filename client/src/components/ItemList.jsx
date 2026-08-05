import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import "./ItemList.css";

function ItemList({ items, onDelete, onEdit, compact = false }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDeleteClick = (item) => {
    setDeleteTarget(item);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No items found</h3>
        <p>Add a new item to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className={`item-table-card ${compact ? "compact" : ""}`}>
        {!compact && (
          <div className="item-table-header">
            <h3>All Items</h3>
            <span className="item-count-badge">{items.length} records</span>
          </div>
        )}
        <table className="item-table" role="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="item-name-cell">
                  <span className="item-dot" />
                  {item.name}
                </td>
                <td className="item-desc-cell">
                  {item.description || <span className="no-desc">—</span>}
                </td>
                <td className="item-actions-cell">
                  {onEdit && (
                    <button
                      className="action-btn edit"
                      onClick={() => onEdit(item)}
                      aria-label={`Edit ${item.name}`}
                    >
                      ✏️ Edit
                    </button>
                  )}
                  <button
                    className="action-btn danger"
                    onClick={() => handleDeleteClick(item)}
                    aria-label={`Delete ${item.name}`}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <ConfirmModal
          title="Delete Item"
          message={`Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}

export default ItemList;

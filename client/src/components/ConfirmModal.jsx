import { useEffect } from "react";
import "./ConfirmModal.css";

function ConfirmModal({ title, message, onConfirm, onCancel }) {
  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-card" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h3 className="confirm-title">{title || "Confirm Delete"}</h3>
        <p className="confirm-message">
          {message || "Are you sure you want to delete this item? This action cannot be undone."}
        </p>
        <div className="confirm-actions">
          <button className="confirm-btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn delete" onClick={onConfirm}>
            🗑️ Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

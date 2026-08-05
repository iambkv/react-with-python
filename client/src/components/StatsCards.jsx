import "./StatsCards.css";

function StatsCards({ items }) {
  const totalItems = items.length;
  const withDescription = items.filter((i) => i.description).length;
  const withoutDesc = totalItems - withDescription;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-icon accent">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </span>
          <span className="stat-trend up">+{totalItems}</span>
        </div>
        <p className="stat-value">{totalItems}</p>
        <p className="stat-label">Total Items</p>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-icon success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </span>
          <span className="stat-trend up">{totalItems > 0 ? Math.round((withDescription / totalItems) * 100) : 0}%</span>
        </div>
        <p className="stat-value">{withDescription}</p>
        <p className="stat-label">With Description</p>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-icon warning">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
        </div>
        <p className="stat-value">{withoutDesc}</p>
        <p className="stat-label">Missing Description</p>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span className="stat-icon purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-4" />
            </svg>
          </span>
        </div>
        <p className="stat-value">{Math.min(totalItems, 7)}</p>
        <p className="stat-label">Recent Activity</p>
      </div>
    </div>
  );
}

export default StatsCards;

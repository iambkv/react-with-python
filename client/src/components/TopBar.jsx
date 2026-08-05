import { useState, useRef, useEffect } from "react";
import "./TopBar.css";

function TopBar({ title, user, onLogout, onProfile, onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu" onClick={onToggleSidebar} aria-label="Toggle menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="topbar-title">{title}</h1>
      </div>

      <div className="topbar-right" ref={dropdownRef}>
        <div className="topbar-user" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="topbar-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="topbar-user-info">
            <span className="topbar-name">{user?.name}</span>
            <span className="topbar-role">Admin</span>
          </div>
          <svg
            className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-header">
              <p className="dropdown-user-name">{user?.name}</p>
              <p className="dropdown-user-email">{user?.email}</p>
            </div>
            <div className="dropdown-divider" />
            <button
              className="dropdown-item"
              onClick={() => { onProfile(); setDropdownOpen(false); }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              My Profile
            </button>
            <div className="dropdown-divider" />
            <button className="dropdown-item danger" onClick={onLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;

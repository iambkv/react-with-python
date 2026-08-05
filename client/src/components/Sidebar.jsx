import "./Sidebar.css";

function Sidebar({ activeView, setActiveView, isOpen }) {
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "items", icon: "📋", label: "All Items" },
    { id: "add", icon: "➕", label: "Add Item" },
    { id: "profile", icon: "👤", label: "My Profile" },
  ];

  return (
    <aside className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-icon">⚡</div>
        <div className="brand-text">
          <h2>CrudPanel</h2>
          <span className="brand-version">Pro v2.0</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-label">Main Menu</span>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeView === item.id ? "active" : ""}`}
            onClick={() => setActiveView(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActiveView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
            {activeView === item.id && <span className="active-dot" />}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <span className="nav-label">System</span>
        <div className="system-info">
          <div className="system-row">
            <span className="system-dot online" />
            <span>MongoDB Connected</span>
          </div>
          <div className="system-row">
            <span className="system-dot online" />
            <span>API Running</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

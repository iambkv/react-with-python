import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { itemAPI } from "../services/api";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import StatsCards from "../components/StatsCards";
import Chart from "../components/Chart";
import AddItemModal from "../components/AddItemModal";
import ItemList from "../components/ItemList";
import EditModal from "../components/EditModal";
import Profile from "../components/Profile";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await itemAPI.getAll();
      setItems(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // When user clicks "Add Item" in sidebar, open the modal
  useEffect(() => {
    if (activeView === "add") {
      setShowAddModal(true);
      setActiveView("items");
    }
  }, [activeView]);

  const addItem = async (item) => {
    try {
      const response = await itemAPI.create(item);
      setItems([...items, response.data]);
      setError("");
    } catch (err) {
      setError("Failed to add item.");
    }
  };

  const updateItem = async (id, data) => {
    try {
      const response = await itemAPI.update(id, data);
      setItems(items.map((item) => (item.id === id ? response.data : item)));
      setEditingItem(null);
      setError("");
    } catch (err) {
      setError("Failed to update item.");
    }
  };

  const deleteItem = async (id) => {
    try {
      await itemAPI.delete(id);
      setItems(items.filter((item) => item.id !== id));
      setError("");
    } catch (err) {
      setError("Failed to delete item.");
    }
  };

  const pageTitles = {
    dashboard: "Dashboard",
    items: "Manage Items",
    add: "Add New Item",
    profile: "My Profile",
  };

  return (
    <div className={`dashboard ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
      />

      <main className="main-content">
        <TopBar
          title={pageTitles[activeView]}
          user={user}
          onLogout={logout}
          onProfile={() => setActiveView("profile")}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="content-area">
          {error && (
            <div className="error-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
              <button onClick={() => setError("")} className="dismiss-btn">✕</button>
            </div>
          )}

          {activeView === "dashboard" && (
            <>
              <StatsCards items={items} />
              <Chart items={items} />
              <div className="section-header">
                <h3>Recent Items</h3>
                <button className="link-btn" onClick={() => setActiveView("items")}>
                  View all →
                </button>
              </div>
              {loading ? (
                <div className="loading-state">
                  <div className="spinner" />
                  <p>Loading...</p>
                </div>
              ) : (
                <ItemList
                  items={items.slice(-5).reverse()}
                  onDelete={deleteItem}
                  onEdit={setEditingItem}
                  compact
                />
              )}
            </>
          )}

          {activeView === "items" && (
            <>
              <div className="section-header">
                <h3>All Items</h3>
                <button className="add-item-btn" onClick={() => setShowAddModal(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Item
                </button>
              </div>
              {loading ? (
                <div className="loading-state">
                  <div className="spinner" />
                  <p>Loading items...</p>
                </div>
              ) : (
                <ItemList
                  items={items}
                  onDelete={deleteItem}
                  onEdit={setEditingItem}
                />
              )}
            </>
          )}

          {activeView === "profile" && (
            <Profile user={user} itemCount={items.length} />
          )}
        </div>
      </main>

      {editingItem && (
        <EditModal
          item={editingItem}
          onSave={updateItem}
          onClose={() => setEditingItem(null)}
        />
      )}

      {showAddModal && (
        <AddItemModal
          onAdd={async (item) => {
            await addItem(item);
            setShowAddModal(false);
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;

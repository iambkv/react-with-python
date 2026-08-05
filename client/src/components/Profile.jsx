import "./Profile.css";

function Profile({ user, itemCount }) {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-banner">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="profile-body">
          <h2 className="profile-name">{user?.name}</h2>
          <p className="profile-role">Admin User</p>

          <div className="profile-details">
            <div className="profile-detail-row">
              <div className="detail-icon">📧</div>
              <div className="detail-info">
                <label>Email Address</label>
                <p>{user?.email}</p>
              </div>
            </div>

            <div className="profile-detail-row">
              <div className="detail-icon">👤</div>
              <div className="detail-info">
                <label>Full Name</label>
                <p>{user?.name}</p>
              </div>
            </div>

            <div className="profile-detail-row">
              <div className="detail-icon">🆔</div>
              <div className="detail-info">
                <label>User ID</label>
                <p>{user?.id}</p>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="profile-stat-box">
              <div className="stat-number">{itemCount}</div>
              <div className="stat-label">Items</div>
            </div>
            <div className="profile-stat-box">
              <div className="stat-number">1</div>
              <div className="stat-label">Session</div>
            </div>
            <div className="profile-stat-box">
              <div className="stat-number">Admin</div>
              <div className="stat-label">Role</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-security">
        <h3>🔒 Security</h3>
        <div className="security-item">
          <span>Authentication</span>
          <span className="security-badge active">JWT Active</span>
        </div>
        <div className="security-item">
          <span>Password</span>
          <span className="security-badge active">Encrypted (bcrypt)</span>
        </div>
        <div className="security-item">
          <span>Token Expiry</span>
          <span className="security-badge active">60 minutes</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;

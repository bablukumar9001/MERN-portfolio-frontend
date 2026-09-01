import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { adminFetch } from "../../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [cleaning, setCleaning] = useState(false);

  const cleanupImages = async () => {
    setCleaning(true);
    try {
      const { deleted } = await adminFetch("/api/admin/images/cleanup", {
        method: "POST",
      });
      toast.success(
        deleted ? `Removed ${deleted} unused image(s)` : "No unused images"
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCleaning(false);
    }
  };

  useEffect(() => {
    adminFetch("/api/admin/stats")
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="admin-error">{error}</div>;
  if (!stats) return <div className="admin-loading">Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Dashboard</h1>
        <button type="button" onClick={cleanupImages} disabled={cleaning}>
          {cleaning ? "Cleaning…" : "Clean up unused images"}
        </button>
      </div>
      <div className="admin-stats" style={{ marginTop: "1.25rem" }}>
        <div className="admin-stat">
          <span>{stats.unreadMessages}</span>
          <label>Unread messages</label>
        </div>
        <div className="admin-stat">
          <span>{stats.totalMessages}</span>
          <label>Total messages</label>
        </div>
        <div className="admin-stat">
          <span>{stats.projects}</span>
          <label>Projects</label>
        </div>
        <div className="admin-stat">
          <span>{stats.experiences}</span>
          <label>Experience</label>
        </div>
        <div className="admin-stat">
          <span>{stats.skills}</span>
          <label>Skills</label>
        </div>
        <div className="admin-stat">
          <span>{stats.education}</span>
          <label>Education</label>
        </div>
        <div className="admin-stat">
          <span>{stats.services}</span>
          <label>Services</label>
        </div>
      </div>

      <h2 className="admin-section-title">Latest messages</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stats.latest.map((m) => (
              <tr key={m._id} className={!m.read ? "unread" : ""}>
                <td>{m.name}</td>
                <td>{m.subject}</td>
                <td>{new Date(m.date).toLocaleString()}</td>
                <td>
                  <Link to={`/admin/messages`}>Open</Link>
                </td>
              </tr>
            ))}
            {stats.latest.length === 0 && (
              <tr>
                <td colSpan={4}>No messages yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

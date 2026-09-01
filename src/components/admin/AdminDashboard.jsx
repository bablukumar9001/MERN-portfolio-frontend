import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { adminFetch } from "../../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
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
    adminFetch("/api/admin/analytics")
      .then(setAnalytics)
      .catch(() => {});
  }, []);

  if (error) return <div className="admin-error">{error}</div>;
  if (!stats) return <div className="admin-loading">Loading...</div>;

  const chartMax = analytics
    ? Math.max(1, ...analytics.series.map((d) => d.visits))
    : 1;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Dashboard</h1>
        <button type="button" onClick={cleanupImages} disabled={cleaning}>
          {cleaning ? "Cleaning…" : "Clean up unused images"}
        </button>
      </div>

      {/* ——— Traffic (cookie-less analytics) ——— */}
      <h2 className="admin-section-title" style={{ marginTop: "1.25rem" }}>
        Traffic <span className="admin-muted">· last 30 days</span>
      </h2>
      <div className="admin-stats">
        <div className="admin-stat">
          <span>{analytics ? analytics.totals.visits : "—"}</span>
          <label>Visits (30d)</label>
        </div>
        <div className="admin-stat">
          <span>{analytics ? analytics.last7.visits : "—"}</span>
          <label>Visits (7d)</label>
        </div>
        <div className="admin-stat">
          <span>{analytics ? analytics.totals.cvDownloads : "—"}</span>
          <label>CV downloads (30d)</label>
        </div>
      </div>

      {analytics && (
        <div className="admin-chart" style={{ marginTop: "0.9rem" }}>
          {analytics.series.map((d) => (
            <div
              className="admin-chart-col"
              key={d.day}
              title={`${d.day}: ${d.visits} visits`}
            >
              <div
                className="admin-chart-bar"
                style={{ height: `${(d.visits / chartMax) * 100}%` }}
              ></div>
              <span className="admin-chart-x">{d.day.slice(8)}</span>
            </div>
          ))}
        </div>
      )}

      {/* ——— Content counts ——— */}
      <h2 className="admin-section-title">Content</h2>
      <div className="admin-stats">
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
        <div className="admin-stat">
          <span>{stats.certifications}</span>
          <label>Certifications</label>
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

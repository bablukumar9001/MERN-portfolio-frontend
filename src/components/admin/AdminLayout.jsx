import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminFetch } from "../../api";
import "./admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    adminFetch("/api/admin/me")
      .then(() => setReady(true))
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (!ready) {
    return <div className="admin-loading">Loading admin...</div>;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Portfolio Admin</div>
        <nav>
          <NavLink end to="/admin">
            Dashboard
          </NavLink>
          <NavLink to="/admin/messages">Messages</NavLink>
          <NavLink to="/admin/projects">Projects</NavLink>
          <NavLink to="/admin/experiences">Experience</NavLink>
          <NavLink to="/admin/skills">Skills</NavLink>
          <NavLink to="/admin/education">Education</NavLink>
          <NavLink to="/admin/services">Services</NavLink>
          <NavLink to="/admin/site-content">Site Content</NavLink>
        </nav>
        <button type="button" className="admin-logout" onClick={logout}>
          Logout
        </button>
        <a className="admin-site-link" href="/" target="_blank" rel="noreferrer">
          View site
        </a>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

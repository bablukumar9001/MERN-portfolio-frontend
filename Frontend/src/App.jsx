import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminMessages from "./components/admin/AdminMessages";
import AdminProjects from "./components/admin/AdminProjects";
import AdminExperiences from "./components/admin/AdminExperiences";
import AdminSkills from "./components/admin/AdminSkills";
import { ThemeContext } from "./ThemeContext";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app-container ${theme}`}>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="experiences" element={<AdminExperiences />} />
          <Route path="skills" element={<AdminSkills />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;

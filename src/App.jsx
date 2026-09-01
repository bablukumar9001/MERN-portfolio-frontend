import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminMessages from "./components/admin/AdminMessages";
import AdminProjects from "./components/admin/AdminProjects";
import AdminExperiences from "./components/admin/AdminExperiences";
import AdminSkills from "./components/admin/AdminSkills";
import AdminEducation from "./components/admin/AdminEducation";
import AdminServices from "./components/admin/AdminServices";
import AdminSiteContent from "./components/admin/AdminSiteContent";
import AdminCertifications from "./components/admin/AdminCertifications";
import AdminAccount from "./components/admin/AdminAccount";
import NotFound from "./components/NotFound";
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
          <Route path="education" element={<AdminEducation />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="certifications" element={<AdminCertifications />} />
          <Route path="site-content" element={<AdminSiteContent />} />
          <Route path="account" element={<AdminAccount />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import "./css/featured-project.css";
import { apiUrl } from "../api";
import { ProjectModal, ProjectThumb, FALLBACK_PROJECTS } from "./Proj";

const pickFeatured = (projects) => {
  if (!Array.isArray(projects) || !projects.length) return null;
  return (
    projects.find((p) => p.featured) ||
    projects.find((p) => p.problem && p.solution) ||
    projects[0]
  );
};

const FeaturedProject = () => {
  const [project, setProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(apiUrl("/api/projects"))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        const list = Array.isArray(data) && data.length ? data : FALLBACK_PROJECTS;
        setProject(pickFeatured(list));
      })
      .catch(() => setProject(pickFeatured(FALLBACK_PROJECTS)));
  }, []);

  if (!project) return null;

  const tags = (project.tags || []).slice(0, 4);
  const tools = (project.tools || "").split(", ").filter(Boolean).slice(0, 6);

  return (
    <section className="featured-project-section" id="featured-project">
      <div className="container">
        <div className="featured-project-card">
          <div className="featured-project-visual">
            <ProjectThumb src={project.src} title={project.title} className="featured-project-thumb" />
            <span className="featured-project-badge">Featured work</span>
          </div>

          <div className="featured-project-body">
            <span className="featured-project-eyebrow">Spotlight project</span>
            <h2>{project.title}</h2>

            {tags.length > 0 && (
              <div className="featured-project-tags">
                {tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}

            {project.problem && (
              <p className="featured-project-lead">{project.problem}</p>
            )}

            {project.metrics && (
              <p className="featured-project-metrics">{project.metrics}</p>
            )}

            {tools.length > 0 && (
              <div className="featured-project-tools">
                {tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}

            <div className="featured-project-actions">
              <button type="button" className="featured-btn featured-btn--primary" onClick={() => setModalOpen(true)}>
                <i className="fas fa-book-open" /> Read case study
              </button>
              <Link to="project11" smooth offset={-85} duration={400} className="featured-btn featured-btn--ghost">
                All projects <i className="fas fa-arrow-right" />
              </Link>
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="featured-btn featured-btn--ghost">
                  Live demo <i className="fas fa-external-link-alt" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} project={project} />
    </section>
  );
};

export default FeaturedProject;

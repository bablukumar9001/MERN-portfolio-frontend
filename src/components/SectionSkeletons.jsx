import React from "react";
import "./css/skeleton.css";

const Sk = ({ className = "", style }) => (
  <span className={`skeleton ${className}`} style={style} aria-hidden="true" />
);

export const HomeContentSkeleton = () => (
  <div className="home-content">
    <div className="skeleton-stack">
      <Sk className="skeleton-text skeleton-text--sm" style={{ width: "40%" }} />
      <Sk className="skeleton-text skeleton-text--2xl" style={{ width: "85%" }} />
      <Sk className="skeleton-text skeleton-text--lg" style={{ width: "55%" }} />
      <Sk className="skeleton-text" style={{ width: "92%" }} />
      <Sk className="skeleton-text" style={{ width: "78%" }} />
    </div>
    <div className="home-stats" style={{ marginTop: 20 }}>
      <Sk className="skeleton-pill" />
      <Sk className="skeleton-pill" style={{ width: 180 }} />
      <Sk className="skeleton-pill" style={{ width: 160 }} />
    </div>
    <div className="home-actions" style={{ marginTop: 24, display: "flex", gap: 12 }}>
      <Sk className="skeleton-pill" style={{ width: 130, height: 42 }} />
      <Sk className="skeleton-pill" style={{ width: 110, height: 42 }} />
      <Sk className="skeleton-pill" style={{ width: 120, height: 42 }} />
    </div>
    <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Sk key={i} className="skeleton-circle" style={{ width: 36, height: 36 }} />
      ))}
    </div>
  </div>
);

export const AboutBentoSkeleton = () => (
  <div className="about-bento">
    <div className="about-bento-photo">
      <Sk style={{ width: "100%", aspectRatio: "1", borderRadius: 16 }} />
    </div>
    <div className="about-bento-bio">
      <div className="skeleton-stack">
        <Sk className="skeleton-text" style={{ width: "100%" }} />
        <Sk className="skeleton-text" style={{ width: "96%" }} />
        <Sk className="skeleton-text" style={{ width: "88%" }} />
        <Sk className="skeleton-text" style={{ width: "72%" }} />
      </div>
    </div>
    <div className="about-bento-facts">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="skeleton-card" style={{ padding: 16 }}>
          <Sk className="skeleton-circle" style={{ width: 28, height: 28, marginBottom: 10 }} />
          <Sk className="skeleton-text skeleton-text--sm" style={{ width: "50%", marginBottom: 8 }} />
          <Sk className="skeleton-text skeleton-text--md" style={{ width: "75%" }} />
        </div>
      ))}
    </div>
    <div className="about-bento-actions" style={{ display: "flex", gap: 12 }}>
      <Sk className="skeleton-pill" style={{ width: 140, height: 42 }} />
      <Sk className="skeleton-pill" style={{ width: 150, height: 42 }} />
    </div>
  </div>
);

export const ContactAsideSkeleton = () => (
  <aside className="contact-aside">
    <Sk className="skeleton-pill" style={{ width: 180, marginBottom: 20 }} />
    <Sk className="skeleton-text skeleton-text--lg" style={{ width: "50%", marginBottom: 24 }} />
    <div className="skeleton-stack" style={{ gap: 20 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-row">
          <Sk className="skeleton-circle" style={{ width: 40, height: 40 }} />
          <div className="skeleton-stack" style={{ flex: 1 }}>
            <Sk className="skeleton-text skeleton-text--sm" style={{ width: "30%" }} />
            <Sk className="skeleton-text" style={{ width: "70%" }} />
          </div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
      {[1, 2, 3, 4].map((i) => (
        <Sk key={i} className="skeleton-circle" style={{ width: 36, height: 36 }} />
      ))}
    </div>
  </aside>
);

export const FooterTextSkeleton = () => (
  <div className="skeleton-stack">
    <Sk className="skeleton-text" style={{ width: "100%" }} />
    <Sk className="skeleton-text" style={{ width: "85%" }} />
    <Sk className="skeleton-text" style={{ width: "60%" }} />
  </div>
);

export const ExperienceStackSkeleton = () => (
  <div className="experience-stack">
    {[1, 2, 3].map((i) => (
      <div key={i} className="skeleton-card">
        <div className="skeleton-row" style={{ marginBottom: 20 }}>
          <Sk className="skeleton-circle" style={{ width: 52, height: 52 }} />
          <div className="skeleton-stack" style={{ flex: 1 }}>
            <Sk className="skeleton-text skeleton-text--lg" style={{ width: "45%" }} />
            <Sk className="skeleton-text" style={{ width: "35%" }} />
            <Sk className="skeleton-text skeleton-text--sm" style={{ width: "55%" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {[1, 2, 3, 4].map((j) => (
            <Sk key={j} className="skeleton-pill" style={{ width: 80, height: 26 }} />
          ))}
        </div>
        <div className="skeleton-stack">
          {[1, 2, 3].map((j) => (
            <Sk key={j} className="skeleton-text" style={{ width: `${95 - j * 8}%` }} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const SkillsGridSkeleton = () => (
  <div className="skills-groups">
    <div className="skeleton-skills-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={`skeleton-card ${i <= 2 ? "skel-skill-wide" : ""}`}
        >
          <Sk className="skeleton-text skeleton-text--md" style={{ width: "40%", marginBottom: 16 }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Array.from({ length: i <= 2 ? 6 : 4 }).map((_, j) => (
              <Sk key={j} className="skeleton-pill" style={{ width: 100, height: 32 }} />
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="skeleton-card additional-skills" style={{ marginTop: 16 }}>
      <Sk className="skeleton-text skeleton-text--md" style={{ width: 180, marginBottom: 14 }} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Sk key={i} className="skeleton-pill" style={{ width: 120, height: 28 }} />
        ))}
      </div>
    </div>
  </div>
);

export const EducationGridSkeleton = () => (
  <div className="education-grid">
    {[1, 2, 3].map((i) => (
      <div key={i} className="skeleton-card">
        <div className="skeleton-row" style={{ marginBottom: 16, justifyContent: "space-between" }}>
          <Sk className="skeleton-circle" style={{ width: 44, height: 44 }} />
          <Sk className="skeleton-pill" style={{ width: 90, height: 28 }} />
        </div>
        <Sk className="skeleton-text skeleton-text--lg" style={{ width: "80%", marginBottom: 10 }} />
        <Sk className="skeleton-text" style={{ width: "65%", marginBottom: 14 }} />
        <Sk className="skeleton-text" style={{ width: "100%" }} />
        <Sk className="skeleton-text" style={{ width: "88%", marginTop: 8 }} />
      </div>
    ))}
  </div>
);

export const ProjectsGridSkeleton = () => (
  <>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 24 }}>
      {[1, 2, 3, 4].map((i) => (
        <Sk key={i} className="skeleton-pill" style={{ width: 80, height: 32 }} />
      ))}
    </div>
    <div className="projects-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-card" style={{ padding: 0, overflow: "hidden" }}>
          <Sk style={{ width: "100%", height: 180, borderRadius: 0 }} />
          <div style={{ padding: 20 }}>
            <Sk className="skeleton-text skeleton-text--lg" style={{ width: "70%", marginBottom: 10 }} />
            <Sk className="skeleton-text" style={{ width: "100%" }} />
            <Sk className="skeleton-text" style={{ width: "85%", marginTop: 8 }} />
          </div>
        </div>
      ))}
    </div>
  </>
);

export const ServicesGridSkeleton = () => (
  <div className="services-grid">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="skeleton-card">
        <Sk className="skeleton-circle" style={{ width: 56, height: 56, marginBottom: 16 }} />
        <Sk className="skeleton-text skeleton-text--lg" style={{ width: "75%", marginBottom: 12 }} />
        <Sk className="skeleton-text" style={{ width: "100%" }} />
        <Sk className="skeleton-text" style={{ width: "90%", marginTop: 8 }} />
        <Sk className="skeleton-text" style={{ width: "70%", marginTop: 8 }} />
      </div>
    ))}
  </div>
);

export const CertificationsGridSkeleton = () => (
  <div className="certs-grid">
    {[1, 2, 3].map((i) => (
      <div key={i} className="skeleton-card skeleton-row">
        <Sk className="skeleton-circle" style={{ width: 56, height: 56 }} />
        <div className="skeleton-stack" style={{ flex: 1 }}>
          <Sk className="skeleton-text skeleton-text--md" style={{ width: "70%" }} />
          <Sk className="skeleton-text skeleton-text--sm" style={{ width: "45%" }} />
          <Sk className="skeleton-text skeleton-text--sm" style={{ width: "35%" }} />
        </div>
      </div>
    ))}
  </div>
);

export const GithubStatsSkeleton = () => (
  <div className="gh-card loading">
    <div className="gh-stats">
      {[1, 2, 3].map((i) => (
        <div key={i} className="gh-stat">
          <Sk className="skeleton-text skeleton-text--xl" style={{ width: 48, margin: "0 auto" }} />
          <Sk className="skeleton-text skeleton-text--sm" style={{ width: 72, margin: "8px auto 0" }} />
        </div>
      ))}
    </div>
    <Sk className="skeleton-pill" style={{ width: 140, height: 32, margin: "0 auto" }} />
  </div>
);

export const TestimonialsGridSkeleton = () => (
  <div className="testimonials-grid">
    {[1, 2, 3].map((i) => (
      <div key={i} className="skeleton-card">
        <Sk className="skeleton-text skeleton-text--xl" style={{ width: 32, marginBottom: 12 }} />
        <Sk className="skeleton-text" style={{ width: "100%" }} />
        <Sk className="skeleton-text" style={{ width: "92%", marginTop: 8 }} />
        <Sk className="skeleton-text" style={{ width: "75%", marginTop: 8 }} />
        <div className="skeleton-row" style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border-color)" }}>
          <Sk className="skeleton-circle" style={{ width: 44, height: 44 }} />
          <div className="skeleton-stack" style={{ flex: 1 }}>
            <Sk className="skeleton-text" style={{ width: "50%" }} />
            <Sk className="skeleton-text skeleton-text--sm" style={{ width: "65%" }} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

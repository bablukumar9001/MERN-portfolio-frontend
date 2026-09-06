import React from "react";
import "./css/work-process.css";
import { useSiteContent } from "../SiteContentContext";
import { useSectionReveal } from "../hooks/useSectionReveal";

const WorkProcess = () => {
  const site = useSiteContent();
  const isVisible = useSectionReveal("work-process");
  const steps = (site.workProcess || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));

  if (!steps.length) return null;

  return (
    <section
      className={`work-process-section ${isVisible ? "visible" : ""}`}
      id="work-process"
    >
      <div className="work-process-inner">
        <div className="section-title text-center fade-in">
          <span className="subtitle">How I Work</span>
          <h2>From Idea to Launch</h2>
          <div className="title-bar"></div>
          <p className="work-process-intro">
            A clear, collaborative process for full-time roles and freelance projects alike.
          </p>
        </div>

        <div className="work-process-track">
          <div className="work-process-grid">
            {steps.map((step, i) => (
              <article
                key={i}
                className={`work-process-card ${isVisible ? "animate" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="work-process-icon-wrap">
                  <span className="work-process-step">{String(i + 1).padStart(2, "0")}</span>
                  <i className={step.icon || "fas fa-circle"} aria-hidden="true" />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;

import React from "react";
import "./css/impact-metrics.css";
import { useSiteContent } from "../SiteContentContext";
import { useSectionReveal } from "../hooks/useSectionReveal";
import { useCountUp } from "../hooks/useCountUp";

const MetricCard = ({ metric, active, index }) => {
  const count = useCountUp(metric.value, { active });

  return (
    <div
      className={`impact-metric ${active ? "animate" : ""}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <i className={metric.icon || "fas fa-chart-line"} aria-hidden="true" />
      <strong>
        {count}
        {metric.suffix || ""}
      </strong>
      <span>{metric.label}</span>
    </div>
  );
};

const ImpactMetrics = () => {
  const site = useSiteContent();
  const isVisible = useSectionReveal("impact-metrics", { threshold: 0.2 });
  const metrics = site.impactMetrics || [];

  if (!metrics.length) return null;

  return (
    <section
      className={`impact-section ${isVisible ? "visible" : ""}`}
      id="impact-metrics"
      aria-label="Impact metrics"
    >
      <div className="impact-inner">
        <div className="impact-grid">
          {metrics.map((m, i) => (
            <MetricCard key={i} metric={m} active={isVisible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;

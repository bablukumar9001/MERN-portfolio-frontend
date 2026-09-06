import React from "react";
import { useSiteContent } from "../SiteContentContext";
import "./css/now.css";

const NowStrip = () => {
  const site = useSiteContent();

  if (site.isLoading || !site.nowTitle) return null;

  return (
    <section className="now-section" id="now" aria-label="Currently working on">
      <div className="now-inner">
        <span className="now-pulse" aria-hidden="true" />
        <div className="now-text">
          <span className="now-label">Now</span>
          <strong className="now-title">{site.nowTitle}</strong>
          {site.nowDescription && (
            <p className="now-desc">{site.nowDescription}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NowStrip;

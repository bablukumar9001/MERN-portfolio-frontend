import React from "react";
import "./css/about.css";
import homephoto from "/images/aboutphoto.jpg";
import { Link } from "react-scroll";
import { useSiteContent } from "../SiteContentContext";
import { useSectionReveal } from "../hooks/useSectionReveal";
import { AboutBentoSkeleton } from "./SectionSkeletons";
import ResumeDownloadLink from "./ResumeDownloadLink";

const About = () => {
  const site = useSiteContent();
  const isVisible = useSectionReveal("about11", { threshold: 0.15 });

  const parts = (site.contactLocation || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const shortLoc =
    parts.length > 2
      ? `${parts[1]}, ${parts[parts.length - 1]}`
      : site.contactLocation;

  const facts = [
    { icon: "fas fa-map-marker-alt", label: "Location", value: shortLoc },
    { icon: "fas fa-briefcase", label: "Experience", value: `${site.aboutYears} years` },
    { icon: "fas fa-layer-group", label: "Focus", value: "Next.js · MERN · Microservices" },
    ...(site.availabilityOpen !== false
      ? [{
          icon: "fas fa-circle-check",
          label: "Availability",
          value: site.availabilityText || "Open to opportunities",
          available: true,
        }]
      : []),
  ];

  return (
    <section
      className={`about-section ${isVisible ? "visible" : ""}`}
      id="about11"
    >
      <div className="about-inner">
        <div className="section-title text-center">
          <span className="subtitle">Discover My Story</span>
          <h2>About Me</h2>
          <div className="title-bar"></div>
        </div>

        {site.isLoading ? (
          <AboutBentoSkeleton />
        ) : (
        <div className="about-bento">
          <div className="about-bento-photo about-reveal">
            <div className="about-photo-frame">
              <img src={homephoto} alt={site.heroName} />
            </div>
            <div className="about-photo-badge">
              <strong>{site.aboutYears}</strong>
              <span>
                years
                <br />
                experience
              </span>
            </div>
          </div>

          <div className="about-bento-bio about-reveal">
            <p className="about-lead">{site.aboutBio}</p>
          </div>

          <div className="about-bento-facts about-reveal">
            {facts.map((f) => (
              <div
                className={`about-bento-tile${f.available ? " about-bento-tile--available" : ""}`}
                key={f.label}
              >
                <i className={f.icon}></i>
                <span className="about-bento-tile-label">{f.label}</span>
                <strong className="about-bento-tile-value">
                  {f.available && (
                    <span className="about-bento-dot" aria-hidden="true"></span>
                  )}
                  {f.value}
                </strong>
              </div>
            ))}
          </div>

          <div className="about-bento-actions about-reveal">
            <Link to="contact11" smooth={true} offset={-85} duration={50}>
              <span className="main-btn">
                <i className="fas fa-paper-plane"></i> Contact Me
              </span>
            </Link>
            <ResumeDownloadLink
              className="main-btn about-btn-ghost"
              url={site.resumeUrl}
            >
              <i className="fas fa-download"></i> Download CV
            </ResumeDownloadLink>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default About;

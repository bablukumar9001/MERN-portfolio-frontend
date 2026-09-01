import React, { useEffect, useState } from "react";
import "./css/about.css";
import homephoto from "/images/aboutphoto.jpg";
import { Link } from "react-scroll";
import { useSiteContent } from "../SiteContentContext";

const About = () => {
  const site = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = document.querySelector("#about11");
    if (!section) return;

    // Show immediately if already in view on mount.
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    // Safety net in case the observer never fires.
    const timer = setTimeout(() => setIsVisible(true), 2500);
    return () => {
      observer.unobserve(section);
      clearTimeout(timer);
    };
  }, []);

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
    { icon: "fas fa-circle-check", label: "Availability", value: "Open to opportunities" },
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

        <div className="about-grid">
          <div className="about-photo about-reveal">
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

          <div className="about-body about-reveal">
            <p className="about-lead">{site.aboutBio}</p>

            <div className="about-facts">
              {facts.map((f) => (
                <div className="about-fact" key={f.label}>
                  <i className={f.icon}></i>
                  <div>
                    <span>{f.label}</span>
                    <strong>{f.value}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-actions">
              <Link to="contact11" smooth={true} offset={-85} duration={50}>
                <span className="main-btn">
                  <i className="fas fa-paper-plane"></i> Contact Me
                </span>
              </Link>
              <a
                className="main-btn about-btn-ghost"
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-download"></i> Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

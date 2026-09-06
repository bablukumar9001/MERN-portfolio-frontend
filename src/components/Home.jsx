import React from "react";
import "./css/home.css";
import homephoto from "/images/profile-pic.png";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { useSiteContent } from "../SiteContentContext";
import { HomeContentSkeleton } from "./SectionSkeletons";
import ResumeDownloadLink from "./ResumeDownloadLink";

const Home = () => {
  const site = useSiteContent();
  const roleSequence = site.heroRoles.flatMap((role) => [role, 1000]);
  const tagline = site.aboutBio.split(".")[0] + ".";

  const socials = [
    { icon: "fab fa-linkedin", url: site.social.linkedin },
    { icon: "fab fa-github", url: site.social.github },
    { icon: "fab fa-twitter", url: site.social.twitter },
    { icon: "fab fa-instagram", url: site.social.instagram },
    { icon: "fab fa-facebook-f", url: site.social.facebook },
  ];

  return (
    <section className="home-section" id="home11">
      <div className="home-inner">
        <div className="home-grid">
          {site.isLoading ? (
            <HomeContentSkeleton />
          ) : (
          <div className="home-content home-enter">
            <h6 className="home-enter-item" style={{ animationDelay: "0.05s" }}>
              {site.heroGreeting}
            </h6>
            <h1 className="home-name home-enter-item" style={{ animationDelay: "0.12s" }}>
              Hi, I'm {site.heroName}
            </h1>
            <p className="home-role home-enter-item" style={{ animationDelay: "0.18s" }}>
              <TypeAnimation
                sequence={roleSequence}
                repeat={Infinity}
                speed={45}
                deletionSpeed={50}
              />
            </p>
            <p className="home-tagline home-enter-item" style={{ animationDelay: "0.24s" }}>
              {tagline}
            </p>

            <div className="home-stats home-enter-item" style={{ animationDelay: "0.3s" }}>
              <span className="home-stat-pill">
                <i className="fas fa-briefcase"></i>
                {site.aboutYears} Years Experience
              </span>
              <span className="home-stat-pill">
                <i className="fas fa-layer-group"></i>
                Next.js · MERN · Microservices
              </span>
              <span className={`home-stat-pill${site.availabilityOpen !== false ? " home-stat-pill--available" : ""}`}>
                {site.availabilityOpen !== false && (
                  <span className="home-stat-dot" aria-hidden="true"></span>
                )}
                {site.availabilityText || "Open to opportunities"}
              </span>
            </div>

            <div className="home-actions home-enter-item" style={{ animationDelay: "0.36s" }}>
              <ResumeDownloadLink className="main-btn" url={site.resumeUrl}>
                <i className="fas fa-download"></i> Download CV
              </ResumeDownloadLink>
              <Link to="contact11" smooth={true} offset={-85} duration={50}>
                <span className="main-btn home-btn-ghost">
                  <i className="fas fa-user-plus"></i> Hire Me
                </span>
              </Link>
              <Link to="project11" smooth={true} offset={-85} duration={50}>
                <span className="main-btn home-btn-ghost">
                  <i className="fas fa-folder-open"></i> View Work
                </span>
              </Link>
            </div>

            <ul className="home-socials home-enter-item" style={{ animationDelay: "0.42s" }}>
              {socials.map((s) => (
                <li key={s.icon}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.icon}>
                    <i className={s.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          )}

          <div className="home-photo home-enter-item" style={{ animationDelay: "0.25s" }}>
            <div className="home-orbit">
              <div className="home-orbit-glow" aria-hidden="true"></div>
              <div className="home-orbit-ring" aria-hidden="true">
                <span className="home-orbit-dot home-orbit-dot--1"></span>
                <span className="home-orbit-dot home-orbit-dot--2"></span>
                <span className="home-orbit-dot home-orbit-dot--3"></span>
              </div>
              <div className="home-orbit-photo">
                <img src={homephoto} alt={site.heroName} />
              </div>
              <div className="home-photo-badge">
                <strong>{site.aboutYears}</strong>
                <span>
                  years
                  <br />
                  experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

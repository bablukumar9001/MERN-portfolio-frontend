import React from "react";
import "./css/home.css";
import homephoto from "/images/profile-pic.png";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { useSiteContent } from "../SiteContentContext";
import { track } from "../api";

const Home = () => {
  const site = useSiteContent();

  // Build the [text, pauseMs, text, pauseMs, ...] sequence for TypeAnimation.
  const roleSequence = site.heroRoles.flatMap((role) => [role, 1000]);

  return (
    <>
      <div className="container container-fluid text-center" id="home11">
        <div className="row">
          <div className="col-sm-6 fadeInLeft box1">
            <section id="home" className="banner-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 text-center text-md-start">
                    <h6>{site.heroGreeting}</h6>
                    <h1 className="blink">
                      Hi, I'm {site.heroName} <br />
                    </h1>

                    <h1>
                      <TypeAnimation
                        sequence={roleSequence}
                        repeat={Infinity}
                        speed={45}
                        deletionSpeed={50}
                        style={{ color: "var(--primary-color)" }}
                      />
                      <br />
                      {site.heroLocation}
                    </h1>
                    <div className="mt-4">
                      <a
                        className="main-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={site.resumeUrl}
                        onClick={() => track("cv_download")}
                      >
                        <i className="fas fa-download"></i> Download CV
                      </a>
                    </div>
                    <Link
                      to="contact11"
                      smooth={true}
                      offset={-85}
                      duration={50}
                    >
                      <div className="mt-4">
                        <span className="main-btn">
                          <i className="fas fa-user-plus"></i> Hire Me
                        </span>
                      </div>
                    </Link>
                    <div className="myphoto img-fluid"></div>
                  </div>
                </div>
              </div>
              {/* social media */}
              <div>
                <ul className="list-unstyled d-flex justify-content-center justify-content-md-end social-icon mb-3 mb-md-0">
                  <li>
                    <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href={site.social.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href={site.social.github} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <div className="col-sm-6 d-flex justify-content-center fadeInRight box2">
            <div className="profile-image-wrapper">
              <div className="profile-background"></div>
              <img className="profile-image" src={homephoto} alt={site.heroName} />
              <div className="image-decoration circle-1"></div>
              <div className="image-decoration circle-2"></div>
              <div className="image-decoration circle-3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

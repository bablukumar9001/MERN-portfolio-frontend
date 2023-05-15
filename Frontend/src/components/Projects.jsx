import React from "react";
import "./css/projects.css";

// import homephoto from "/images/one2.png";
import myportfolio from "/images/myportfolio.jpeg";
import newstimes from "/images/newstimes.jpeg";
import textutils from "/images/textutils.jpeg";
import liveweather from "/images/liveweather.png";
import registration from "/images/registration.png";
import webapp from "/images/webapp.png";
import imageuploader from "/images/imageuploader.jpeg";
import comingsoon from "/images/comingsoon.jpg";

const Projects = () => {
  return (
    <>
      <div className="col-lg-12 mt-5 " id="project11">
        <div className="section-title text-center">
          <span className="subtitle">Here all my latest projects</span>
          <h2>Projects</h2>
        </div>
      </div>
      <section id="portfolio" className="portfolio-wrapper project11">
        <div className="container">
          <div className="row">
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card p-0 ">
                  <img
                    src={myportfolio}
                    className="card-img-top card-image"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Bablu's Portfolio</h5>
                    <a
                      target="-blank"
                      href="https://github.com/bablukumar9001?tab=repositories"
                      className="main-btn-services"
                    >
                      visit
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card p-0 ">
                  <img
                    src={newstimes}
                    className="card-img-top card-image"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">NewsTimes</h5>
                    <a
                      target="-blank"
                      href="https://github.com/bablukumar9001?tab=repositories"
                      className="main-btn-services"
                    >
                      visit
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card p-0 ">
                  <img
                    src={textutils}
                    className="card-img-top card-image"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Textutils</h5>
                    <a
                      target="-blank"
                      href="https://github.com/bablukumar9001?tab=repositories"
                      className="main-btn-services"
                    >
                      visit
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card p-0 ">
                  <img
                    src={liveweather}
                    className="card-img-top card-image"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Live weather</h5>
                    <a
                      target="-blank"
                      href="https://github.com/bablukumar9001?tab=repositories"
                      className="main-btn-services"
                    >
                      visit
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card p-0 ">
                  <img
                    src={webapp}
                    className="card-img-top card-image"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">WebApp</h5>
                    <a
                      target="-blank"
                      href="https://github.com/bablukumar9001?tab=repositories"
                      className="main-btn-services"
                    >
                      visit
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card p-0 ">
                  <img
                    src={registration}
                    className="card-img-top card-image"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">Authentication</h5>
                    <a
                      target="-blank"
                      href="https://github.com/bablukumar9001?tab=repositories"
                      className="main-btn-services"
                    >
                      visit
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card p-0 ">
                  <img
                    src={imageuploader}
                    className="card-img-top card-image"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">ImageUploader</h5>
                    <a
                      target="-blank"
                      href="https://github.com/bablukumar9001?tab=repositories"
                      className="main-btn-services"
                    >
                      visit
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <div className="card p-0 ">
                  <img
                    src={comingsoon}
                    className="card-img-top card-image"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title"> Coming soon..</h5>
                    <a
                      target="-blank"
                      href="https://github.com/bablukumar9001?tab=repositories"
                      className="main-btn-services"
                    >
                      visit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;

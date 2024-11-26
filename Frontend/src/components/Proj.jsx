import React, { useState } from "react";
import "./css/proj.css";

const ProjectCard = ({ title, description, tools, accomplishments, liveLink, sourceLink, src }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(!isRevealed);
    console.log("click");

  };

  return (
    <div className="col-12 col-md-6 col-lg-4" id="project11">
      <div className="card medium">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            alt={title}
            src={src}
            style={{ height: "100%", width: "100%" }}
            className="activator project_img"
            onClick={handleReveal}
          />
        </div>
        <div className="project-card">
          <span onClick={handleReveal} className="card-title activator teal-text hoverline">
            {title}
            <i className="mdi-navigation-more-vert right"></i>
          </span>
          <p>{description}</p>
        </div>

        {isRevealed && (
          <div className="card-reveal" style={{
            transform: isRevealed ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 2s ease",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "white",
            padding: "20px",
            zIndex: 1,
          }}>
            <span onClick={handleReveal} className="card-title grey-text">
              <small className="Accomplishments" >Accomplishments</small>
              {/* <i className="mdi-navigation-close right"></i> */}
              <i class=" fa-solid fa-xmark close-x" ></i>
            </span>
            <ul className="mt-3">
              <li className="accomp-text"><b>Tools:</b> {tools}</li>
              {accomplishments.map((item, index) => (
                <li className="accomp-text" key={index}>{item}</li>
              ))}
            </ul>
            <div className="card-action mt-5">
              <div className="icon-links-container">
                <a
                  aria-label="Visit live demo"
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-floating btn-large waves-effect waves-light blue-grey tooltipped live-demo-container"
                >
                  <div className="icon-text-wrapper">
                    <i className="fa fa-external-link icon-style"></i>
                    <p className="icon-text">Live Demo</p>
                  </div>
                </a>

                <a
                  aria-label="Visit GitHub"
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-floating btn-large waves-effect waves-light blue-grey tooltipped live-demo-container"
                >
                  <div className="icon-text-wrapper">
                    <i className="fa fa-github icon-style"></i>
                    <p className="icon-text">GitHub</p>
                  </div>
                </a>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Proj = () => {
  const projects = [
    {
      title: "NewsTimes",
      description: "A music streaming web app based on Django",
      tools: "Django, HTML, CSS, Bootstrap, SQLite, AWS S3, Heroku",
      accomplishments: [
        "Register/login to the web app (with OAuth-based Google Sign-In).",
        "Search and filter songs based on language and singer.",
        "Create multiple playlists and add/remove songs to/from playlist.",
        "Scroll through recently played/viewed songs."

      ],
      liveLink: "https://galvanic-music.herokuapp.com/",
      sourceLink: "https://github.com/varadbhogayata/music-player",
      src: "/images/newstimes.jpeg"
    },
    // Add more projects here if needed
    {
      title: "Live Weather",
      description: "A music streaming web app based on Django",
      tools: "Django, HTML, CSS, Bootstrap, SQLite, AWS S3, Heroku",
      accomplishments: [
        "Register/login to the web app (with OAuth-based Google Sign-In).",
        "Search and filter songs based on language and singer.",
        "Create multiple playlists and add/remove songs to/from playlist.",
        "Scroll through recently played/viewed songs."
      ],
      liveLink: "https://galvanic-music.herokuapp.com/",
      sourceLink: "https://github.com/varadbhogayata/music-player",
      src: "/images/liveweather.png"

    },
    // Add more projects here if needed
    {
      title: "Music Player Web-App",
      description: "A music streaming web app based on Django",
      tools: "Django, HTML, CSS, Bootstrap, SQLite, AWS S3, Heroku",
      accomplishments: [
        "Register/login to the web app (with OAuth-based Google Sign-In).",
        "Search and filter songs based on language and singer.",
        "Create multiple playlists and add/remove songs to/from playlist.",
        "Scroll through recently played/viewed songs."
      ],
      liveLink: "https://galvanic-music.herokuapp.com/",
      sourceLink: "https://github.com/varadbhogayata/music-player",
      src: "/images/textutils.jpeg"

    },
    // Add more projects here if needed
  ];

  return (
    <div className="container" id="project11">
      <div className="col-lg-12 mt-5 contact11">
        <div className="section-title text-center">
          <span className="subtitle">
            Here you can conatct and find me on different platforms
          </span>
          <h2>Projects</h2>
        </div>
      </div>
      <section id="projects" className="section scrollspy">
        {/* <h3 className="page-title white-text teal">Projects</h3> */}
        <div className="container">
          <div className="row">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Proj;

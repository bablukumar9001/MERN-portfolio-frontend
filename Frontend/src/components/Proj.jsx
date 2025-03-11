import React, { useState, useEffect } from "react";
import "./css/proj.css";

const ProjectCard = ({ title, description, tools, accomplishments, liveLink, sourceLink, src, index, isVisible }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(!isRevealed);
    
    // Don't prevent body scrolling - just add a class to handle modal display
    document.body.classList.toggle('modal-open');
  };
  
  // Clean up function to ensure body scrolling is restored
  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div 
      className={`project-item ${isVisible ? 'animate' : ''}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="project-card-container">
        <div className="project-image-container">
          <img
            alt={title}
            src={src}
            className="project-image"
            onClick={handleReveal}
          />
          <div className="project-overlay">
            <button className="view-details-btn" onClick={handleReveal}>
              <i className="fas fa-eye"></i> View Details
            </button>
          </div>
        </div>
        
        <div className="project-content">
          <h3 className="project-title">{title}</h3>
          <p className="project-description">{description}</p>
          <div className="project-tools">
            {tools.split(', ').map((tool, i) => (
              <span key={i} className="tool-tag">{tool}</span>
            ))}
          </div>
          <div className="project-links">
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link live-link"
            >
              <i className="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a 
              href={sourceLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link source-link"
            >
              <i className="fab fa-github"></i> Source Code
            </a>
          </div>
        </div>
      </div>

      {isRevealed && (
        <div className="project-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{title}</h3>
              <button className="close-btn" onClick={handleReveal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-tabs">
                <button className="modal-tab active">Overview</button>
                <div className="modal-tab-content">
                  <div className="modal-overview">
                    <div className="modal-section">
                      <h4>Description</h4>
                      <p>{description}</p>
                    </div>
                    
                    <div className="modal-section">
                      <h4>Key Features</h4>
                      <ul className="features-list">
                        {accomplishments.map((item, i) => (
                          <li key={i} className="feature-item">
                            <i className="fas fa-check-circle"></i> 
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="modal-section">
                      <h4>Technologies Used</h4>
                      <div className="modal-tools">
                        {tools.split(', ').map((tool, i) => (
                          <span key={i} className="modal-tool-tag">{tool}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="modal-section modal-image-small">
                      <h4>Preview</h4>
                      <img src={src} alt={title} className="modal-thumbnail" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <div className="modal-buttons-container">
                <a 
                  href={liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="modal-btn live-btn"
                >
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a 
                  href={sourceLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="modal-btn source-btn"
                >
                  <i className="fab fa-github"></i> Source Code
                </a>
              </div>
            </div>
          </div>
          <div className="modal-overlay" onClick={handleReveal}></div>
        </div>
      )}
    </div>
  );
};

const Proj = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('#project11');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const projects = [
    {
      title: "NewsTimes",
      description: "A real-time news aggregation platform with customizable categories and personalized feeds.",
      tools: "React, Node.js, Express, MongoDB, News API",
      accomplishments: [
        "Implemented user authentication with JWT for personalized news preferences",
        "Created a responsive design that works seamlessly across all devices",
        "Integrated with News API to fetch real-time news from multiple sources",
        "Built a bookmark system for users to save articles for later reading"
      ],
      liveLink: "https://galvanic-music.herokuapp.com/",
      sourceLink: "https://github.com/varadbhogayata/music-player",
      src: "/images/newstimes.jpeg"
    },
    {
      title: "Live Weather",
      description: "A weather application that provides real-time forecasts and weather data for locations worldwide.",
      tools: "JavaScript, HTML, CSS, Weather API, Geolocation API",
      accomplishments: [
        "Integrated with OpenWeather API for accurate weather forecasts",
        "Implemented geolocation to automatically detect user's location",
        "Created interactive UI with animated weather indicators",
        "Added 5-day forecast with hourly breakdown options"
      ],
      liveLink: "https://galvanic-music.herokuapp.com/",
      sourceLink: "https://github.com/varadbhogayata/music-player",
      src: "/images/liveweather.png"
    },
    {
      title: "Text Utils App",
      description: "A text manipulation utility that helps users transform and analyze text content efficiently.",
      tools: "React, Bootstrap, JavaScript, HTML, CSS",
      accomplishments: [
        "Built multiple text transformation tools including case conversion and character counting",
        "Implemented a clean, intuitive interface for easy text manipulation",
        "Added copy-to-clipboard functionality for transformed text",
        "Created light and dark mode themes for better user experience"
      ],
      liveLink: "https://galvanic-music.herokuapp.com/",
      sourceLink: "https://github.com/varadbhogayata/music-player",
      src: "/images/textutils.jpeg"
    },
  ];

  return (
    <section className={`projects-section ${isVisible ? 'visible' : ''}`} id="project11">
      <div className="container">
        <div className="section-title text-center fade-in">
          <span className="subtitle">My Recent Work</span>
          <h2>Featured Projects</h2>
          <div className="title-bar"></div>
          <p className="projects-intro">
            Here are some of my recent projects that showcase my skills and expertise in web development.
            Each project represents a unique challenge and solution.
          </p>
        </div>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              {...project} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
        
        <div className="projects-cta fade-in">
          <p>Want to see more of my work?</p>
          <a 
            href="https://github.com/bablukumar9001" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            <i className="fab fa-github"></i> Visit My GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Proj;

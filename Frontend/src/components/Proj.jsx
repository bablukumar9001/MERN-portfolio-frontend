import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./css/proj.css";

const ProjectModal = ({ isOpen, onClose, project }) => {
  const modalRef = useRef(null);
  
  if (!isOpen || !project) return null;
  
  const { title, description, tools, accomplishments, liveLink, sourceLink, src } = project;
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  
  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  
  const modalContent = (
    <div className="project-modal-wrapper">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="modal-layout">
            <div className="modal-left">
              <div className="modal-image-container">
                <img src={src} alt={title} className="modal-full-image" />
              </div>
              
              <div className="modal-section tools-section">
                <h4>Technologies Used</h4>
                <div className="modal-tools">
                  {tools.split(', ').map((tool, i) => (
                    <span key={i} className="modal-tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-right">
              <div className="modal-section">
                <h4>Project Overview</h4>
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
              
              <div className="modal-actions">
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
        </div>
      </div>
      <div className="modal-overlay" onClick={handleOverlayClick}></div>
    </div>
  );
  
  return createPortal(modalContent, document.body);
};

const ProjectCard = ({ project, index, isVisible }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, liveLink, src } = project;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            onClick={openModal}
          />
          <div className="project-overlay">
            <div className="overlay-buttons">
              <button className="view-details-btn" onClick={openModal}>
                <i className="fas fa-eye"></i> View Details
              </button>
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="live-demo-btn"
              >
                <i className="fas fa-external-link-alt"></i> Live Demo
              </a>
            </div>
          </div>
        </div>
        
        <div className="project-content">
          <h3 className="project-title">{title}</h3>
        </div>
      </div>

      {isModalOpen && (
        <ProjectModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          project={project}
        />
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
      title: "WebApp - IT ",
      description: `This MERN stack-based IT services platform is designed to provide seamless service management and user interaction. 
      It features a modern and user-friendly interface, allowing businesses and individuals to explore IT solutions, 
      submit inquiries, and manage interactions efficiently. The platform is fully responsive and optimized for smooth performance.`,
      accomplishments: [
       "Home Page with Service Overview", 
       "User Authentication & Authorization (JWT-based login & signup)",
        "Contact Form for inquiries with backend email integration",
         "Admin Panel to manage users and service requests", 
         "it come with dark and light theme",
         "Service Listings showcasing various IT solutions", 
         "Secure API Integration ensuring data protection", 
         "Responsive UI optimized for all devices", 
         "SEO-Friendly structure for better search visibility"
      ],
      tools: "React, Bootstrap, JavaScript, HTML, CSS ,Node.js, Express, MongoDB, tailwind css, material ui",
      liveLink: "https://mern-webapp-6w6k.onrender.com/",
      sourceLink: "https://github.com/bablukumar9001/MERN-webapp/tree/master",
      src: "/images/webapp.png"
    },
    {
      title: "ShopKart",
      description: `ShopKart is a fully functional MERN stack-based e-commerce platform designed to deliver a seamless online shopping experience. 
      It includes secure authentication, product management, payment integration, and an admin dashboard for efficient store management. 
      With a modern UI built using Tailwind CSS and Material UI, the platform ensures a smooth and responsive user experience.`,
      accomplishments: [
        "User Authentication & Authorization (JWT-based login, signup, and secure access)", 
        "Password Reset with email link for account recovery", 
        "Admin Dashboard for managing products, users, and orders",
         "Product Listings with advanced filtering and sorting",
          "Shopping Cart for easy order management", 
          "Secure Payment Integration with Stripe/Razorpay", 
          "Product Reviews & Ratings to enhance customer engagement", 
          "Fully Responsive UI with Tailwind CSS & Material UI", 
          "SEO-Optimized structure for better search visibility"
      ],
      tools: "React, Bootstrap, JavaScript, HTML, CSS ,Node.js, Express, MongoDB, tailwind css, material ui",
      liveLink: "https://shopkart-epla.onrender.com/",
      sourceLink: "https://github.com/bablukumar9001/ShopKart",
      src: "/images/shopkart.png"
    },
    {
      title: "My Portfolio",
      description: `This MERN stack-based portfolio website serves as a digital resume and professional showcase. 
      It highlights personal information, skills, education, projects, and experience in an interactive and visually appealing manner. 
      The platform is designed to be fully responsive, ensuring a seamless user experience across all devices.`,
      tools: "React, Node.js, Express, MongoDB, JavaScript, HTML, CSS",
      accomplishments: [
       "About Me Section displaying professional summary, expertise, and contact details", 
       "Projects Showcase with live project links and descriptions", 
       "dark and light theme",
       "Skills & Tech Stack highlighting frontend, backend, and database expertise", 
       "Education & Experience section detailing academic and professional journey",
        "Resume Download option for recruiters to access an up-to-date resume", 
        "Contact Form enabling easy communication via email integration",
         "Responsive Design optimized for desktops, tablets, and mobile devices", 
         "SEO Optimized for better search visibility and reach"
      ],
      liveLink: "https://bablukumar.onrender.com/",
      sourceLink: "https://github.com/bablukumar9001/MERN-portfolio-frontend",
      src: "/images/portfolio.png"
    },
    {
      title: "Veavix",
      description: `Veavix is a professional business website designed to showcase company services, 
      improve online presence, and enhance user engagement. 
      Built with the MERN stack, the platform delivers a modern, responsive, and seamless user experience.`,
      tools: "React, Bootstrap, JavaScript, HTML, CSS ,Node.js, Express, MongoDB ",
      accomplishments: [
        "Responsive UI/UX: Clean and intuitive interface optimized for all devices.",
        "Service Showcase: Detailed sections highlighting company services and offerings",
        " Dynamic Content Management: Easily updateable service and portfolio sections.", 
        "Contact & Inquiry Forms: Secure forms for customer inquiries with backend email integration.",
        "SEO Optimization: Well-structured meta tags and content for better search visibility.",
        " Fast Performance: Optimized for speed using caching and efficient API calls."
      ],
      liveLink: "https://veavix.onrender.com/",
      sourceLink: "https://github.com/bablukumar9001/Veavix-frontend",
      src: "/images/veavix.png"
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
              project={project}
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

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./css/proj.css";
import { apiUrl, imageSrc } from "../api";

const initialsOf = (title = "") =>
  title
    .replace(/[–-].*/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// Project image, or a gradient placeholder with the project's initials.
const ProjectThumb = ({ src, title, className, onClick }) => {
  const [failed, setFailed] = useState(false);
  if (src && !failed) {
    return (
      <img
        src={imageSrc(src)}
        alt={title}
        className={className}
        onClick={onClick}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className={`${className} project-thumb-fallback`} onClick={onClick}>
      <span>{initialsOf(title)}</span>
    </div>
  );
};

const FALLBACK_PROJECTS = [
  {
    title: "VittaGems – Enterprise Web3 Jewellery Platform",
    description: `An enterprise Web3-based jewellery platform built on a microservices architecture.
      Independent Auth, User, Admin, Gateway, KYC and Token services communicate through secure
      REST APIs with JWT authentication, role-based access control and Swagger documentation.
      The Next.js frontend integrates payments, media uploads and real-time features, with the
      whole system containerised and deployed to AWS.`,
    tools:
      "Next.js, React.js, TypeScript, Node.js, Express.js, MongoDB, Microservices, JWT, RBAC, Razorpay, Cloudinary, Multer, Nodemailer, Socket.IO, Cron, Docker, Docker Compose, PM2, Nginx, AWS EC2, Swagger",
    accomplishments: [
      "Built full-stack modules for a Web3 jewellery platform with Next.js, TypeScript, Node.js, Express.js and MongoDB",
      "Designed Auth, User, Admin, Gateway, KYC and Token microservices with secure REST APIs, JWT, RBAC and Swagger",
      "Integrated Razorpay, Cloudinary, Multer, Nodemailer, Socket.IO and Cron-based background jobs",
      "Deployed and maintained services using Docker, Docker Compose, PM2, Nginx and AWS EC2",
    ],
    liveLink: "",
    sourceLink: "",
    src: "",
  },
  {
    title: "Launchly – Multi-Chain Web3 Launchpad",
    description: `A scalable, multi-chain Web3 launchpad that lets creators launch and manage
      projects across chains. Built with a microservices backend and a responsive Next.js
      dashboard covering creator workflows, chat and platform administration, deployed and
      monitored in production.`,
    tools:
      "Next.js, React.js, TypeScript, Node.js, Express.js, MongoDB, Microservices, JWT, RBAC, Socket.IO, Docker, PM2, Nginx, AWS EC2",
    accomplishments: [
      "Developed scalable full-stack modules for a multi-chain Web3 launchpad with Next.js, TypeScript, Node.js and MongoDB",
      "Built secure REST APIs, authentication and RBAC, integrating multiple microservices for platform functionality",
      "Built responsive dashboards and backend services for creator workflows, chat and platform features",
      "Managed deployments and production support with Docker, PM2, Nginx and AWS EC2",
    ],
    liveLink: "",
    sourceLink: "",
    src: "",
  },
  {
    title: "Licious – Online Meat Delivery Platform",
    description: `A responsive, SEO-friendly online meat delivery experience built with Next.js
      (SSR/SSG) and React.js. Includes a product catalog with search, cart and order management
      backed by REST APIs, and a reusable component architecture tuned for performance.`,
    tools: "Next.js, React.js, Node.js, Express.js, MongoDB, REST APIs, Tailwind CSS",
    accomplishments: [
      "Developed responsive and SEO-friendly pages with Next.js (SSR/SSG) and React.js",
      "Built and integrated REST APIs for product catalog, search, cart and order management",
      "Improved performance through lazy loading, image optimization and reusable components",
      "Collaborated with backend teams to deliver scalable, production-ready features",
    ],
    liveLink: "https://www.licious.in/",
    sourceLink: "",
    src: "/images/licious.png",
  },
  {
    title: "ShopKart – E-Commerce Platform (MERN)",
    description: `A full-stack e-commerce platform with authentication, product management, cart,
      orders, payments and an admin dashboard. Secure REST APIs with JWT and role-based access
      control, Redux Toolkit state management, and third-party integrations for payments,
      uploads and email.`,
    tools:
      "React.js, Redux Toolkit, Material UI, Node.js, Express.js, MongoDB, JWT, RBAC, Razorpay, Cloudinary, Multer, Nodemailer",
    accomplishments: [
      "Built a full-stack e-commerce platform with auth, product management, cart, orders, payments and an admin dashboard",
      "Developed secure REST APIs with Node.js, Express.js, MongoDB, JWT authentication and role-based access control",
      "Integrated Razorpay, Cloudinary, Multer and Nodemailer for payments, file uploads and email notifications",
      "Optimized performance with Redux Toolkit, lazy loading, reusable components and responsive UI",
    ],
    liveLink: "https://shopkart-epla.onrender.com/",
    sourceLink: "https://github.com/bablukumar9001/ShopKart",
    src: "/images/shopkart.png",
  },
  {
    title: "My Portfolio",
    description: `This MERN portfolio doubles as a live CMS: every section — projects, skills,
      experience, education, services and site content — is editable from a JWT-protected admin
      panel, with image uploads and an email-reply inbox for contact messages. Fully responsive
      with dark/light themes.`,
    tools: "React, Node.js, Express, MongoDB, JavaScript, JWT, Vite",
    accomplishments: [
      "Admin panel with full CRUD for every portfolio section plus a Site Content editor",
      "Image uploads stored in MongoDB with automatic cleanup of unused images",
      "Contact form with spam protection; reply to messages by email from the dashboard",
      "Dark and light theme, resume download, and API-driven content with safe fallbacks",
      "Responsive design optimized for desktop, tablet and mobile",
    ],
    liveLink: "https://bablukumar.onrender.com/",
    sourceLink: "https://github.com/bablukumar9001/MERN-portfolio-frontend",
    src: "/images/portfolio.png",
  },
  {
    title: "Veavix",
    description: `A responsive IT-services website with dynamic content sections and REST APIs
      for managing service pages and contact forms, built with the MERN stack and optimised for
      performance and SEO.`,
    tools: "React, Bootstrap, JavaScript, Node.js, Express, MongoDB",
    accomplishments: [
      "Developed a responsive IT-services website with dynamic, updateable content sections",
      "Built REST APIs for managing service pages and contact forms with email integration",
      "Optimised performance and SEO with meta tags, React optimisation and clean UI components",
    ],
    liveLink: "https://veavix.onrender.com/",
    sourceLink: "https://github.com/bablukumar9001/Veavix-frontend",
    src: "/images/veavix.png",
  },
];

const FALLBACK_TAGS = {
  "VittaGems – Enterprise Web3 Jewellery Platform": ["Web3", "Microservices", "Full-Stack"],
  "Launchly – Multi-Chain Web3 Launchpad": ["Web3", "Microservices", "Full-Stack"],
  "Licious – Online Meat Delivery Platform": ["Next.js", "Full-Stack"],
  "ShopKart – E-Commerce Platform (MERN)": ["E-Commerce", "Full-Stack"],
  "My Portfolio": ["Full-Stack", "MERN"],
  Veavix: ["Full-Stack", "Business"],
};
FALLBACK_PROJECTS.forEach((p) => {
  p.tags = FALLBACK_TAGS[p.title] || [];
});

const ProjectModal = ({ isOpen, onClose, project }) => {
  const modalRef = useRef(null);

  // Prevent body scrolling while the modal is open.
  // Hook runs unconditionally (Rules of Hooks); it only acts when open.
  useEffect(() => {
    if (!isOpen) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const { title, description, tools, accomplishments, liveLink, sourceLink, src } = project;

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
                <ProjectThumb src={src} title={title} className="modal-full-image" />
              </div>
              
              <div className="modal-section tools-section">
                <h4>Technologies Used</h4>
                <div className="modal-tools">
                  {(tools || "").split(", ").filter(Boolean).map((tool, i) => (
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
                  {(accomplishments || []).map((item, i) => (
                    <li key={i} className="feature-item">
                      <i className="fas fa-check-circle"></i> 
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="modal-actions">
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn live-btn"
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                )}
                {sourceLink && (
                  <a
                    href={sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-btn source-btn"
                  >
                    <i className="fab fa-github"></i> Source Code
                  </a>
                )}
                {!liveLink && !sourceLink && (
                  <span className="modal-btn source-btn" style={{ opacity: 0.6, cursor: "default" }}>
                    <i className="fas fa-lock"></i> Private / NDA project
                  </span>
                )}
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
  const { title, liveLink, src, tags = [] } = project;

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
          <ProjectThumb
            title={title}
            src={src}
            className="project-image"
            onClick={openModal}
          />
          <div className="project-overlay">
            <div className="overlay-buttons">
              <button className="view-details-btn" onClick={openModal}>
                <i className="fas fa-eye"></i> View Details
              </button>
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-demo-btn"
                >
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="project-content">
          <h3 className="project-title">{title}</h3>
          {tags.length > 0 && (
            <div className="project-card-tags">
              {tags.slice(0, 3).map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}
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
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    fetch(apiUrl("/api/projects"))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => {
        /* keep fallback */
      });
  }, []);

  const allTags = [
    "All",
    ...Array.from(new Set(projects.flatMap((p) => p.tags || []))),
  ];
  const shown =
    activeTag === "All"
      ? projects
      : projects.filter((p) => (p.tags || []).includes(activeTag));

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector("#project11");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

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

        {allTags.length > 2 && (
          <div className="project-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`project-filter ${activeTag === tag ? "active" : ""}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <div className="projects-grid">
          {shown.map((project, index) => (
            <ProjectCard
              key={project._id || project.title || index}
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

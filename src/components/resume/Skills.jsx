import React, { useState, useEffect, useRef } from 'react';
import "./css/skills.css";
import { apiUrl, imageSrc } from "../../api";

const CATEGORY_TITLES = [
  "Languages",
  "Frontend",
  "Backend",
  "Databases",
  "DevOps & Cloud",
  "Integrations & Tools",
];

const DEFAULT_CATEGORIES = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript (ES6+)", image: "/images/javascript.png" },
      { name: "TypeScript", image: "/images/typescript.png" },
      { name: "PHP", image: "/images/php.png" },
      { name: "HTML5", image: "/images/html5-300x300.jpg" },
      { name: "CSS3", image: "/images/css3-300x300.jpg" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", image: "/images/react.png" },
      { name: "Next.js", image: "/images/nextjs.png" },
      { name: "Redux Toolkit", image: "/images/redux.png" },
      { name: "React Query", image: "" },
      { name: "Tailwind CSS", image: "/images/tailwind.png" },
      { name: "Material UI", image: "/images/materialui.png" },
      { name: "Bootstrap", image: "/images/bootstrap.png" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", image: "/images/node.png" },
      { name: "Express.js", image: "/images/express.png" },
      { name: "REST APIs", image: "/images/api.png" },
      { name: "JWT", image: "" },
      { name: "OAuth", image: "" },
      { name: "Socket.IO", image: "" },
      { name: "Microservices", image: "" },
      { name: "Laravel", image: "/images/laravel.png" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", image: "/images/mongodb.png" },
      { name: "Mongoose", image: "" },
      { name: "MySQL", image: "/images/mysql-logo-1-300x300.jpg" },
      { name: "Redis", image: "" },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", image: "/images/docker.png" },
      { name: "Docker Compose", image: "" },
      { name: "AWS (EC2, S3)", image: "/images/aws.png" },
      { name: "CI/CD", image: "" },
      { name: "GitHub Actions", image: "" },
      { name: "PM2", image: "" },
      { name: "Nginx", image: "" },
    ],
  },
  {
    title: "Integrations & Tools",
    skills: [
      { name: "Razorpay", image: "" },
      { name: "Cloudinary", image: "" },
      { name: "Nodemailer", image: "" },
      { name: "Swagger", image: "" },
      { name: "Git", image: "/images/git.png" },
      { name: "Postman", image: "/images/postman.png" },
      { name: "Jest", image: "" },
      { name: "Azure DevOps", image: "" },
    ],
  },
];

const DEFAULT_ALL_SKILLS = DEFAULT_CATEGORIES.flatMap((c) => c.skills);

// Renders the skill logo, or a lettered chip when there is no image.
const SkillLogo = ({ image, name }) => {
  const [failed, setFailed] = useState(false);
  if (image && !failed) {
    return (
      <img src={imageSrc(image)} alt={name} onError={() => setFailed(true)} />
    );
  }
  const initials = name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase();
  return <span className="skill-initials">{initials}</span>;
};

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [allSkills, setAllSkills] = useState(DEFAULT_ALL_SKILLS);
  const [skillCategories, setSkillCategories] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    fetch(apiUrl("/api/skills"))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return;
        setAllSkills(data.map((s) => ({ name: s.name, image: s.image })));
        setSkillCategories(
          CATEGORY_TITLES.map((title) => ({
            title,
            skills: data
              .filter((s) => s.category === title)
              .map((s) => ({ name: s.name, image: s.image })),
          })).filter((c) => c.skills.length > 0)
        );
      })
      .catch(() => {});
  }, []);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      setActiveSlide((prev) => (prev + 1) % allSkills.length);
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      setActiveSlide((prev) => (prev === 0 ? allSkills.length - 1 : prev - 1));
    }
  };

  // Auto-rotate slider - faster now (1.5s instead of 2s)
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % allSkills.length);
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isVisible, allSkills.length]);

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

    const section = document.querySelector('#skills11');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Calculate visible slides based on screen width
  const getVisibleSlides = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 576) return 1;
      if (window.innerWidth < 768) return 3;
      if (window.innerWidth < 992) return 4;
      return 5;
    }
    return 5; // Default
  };

  const visibleSlides = getVisibleSlides();

  return (
    <>
      <section className={`skills-section ${isVisible ? 'visible' : ''}`} id='skills11'>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center fade-in">
                <span className="subtitle">My Technical Expertise</span>
                <h2>Skills & Technologies</h2>
                <div className="title-bar"></div>
                <p className="skills-intro">
                  I specialize in modern web development technologies, focusing on creating 
                  responsive, user-friendly applications with clean, efficient code.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Slider */}
          <div 
            className="skills-slider-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="skills-slider" 
              ref={sliderRef}
              style={{ 
                transform: `translateX(calc(-${activeSlide * (100 / visibleSlides)}%))`,
                transition: 'transform 0.3s ease-out' // Faster transition
              }}
            >
              {allSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className={`skill-slide ${activeSlide === index ? 'active' : ''}`}
                  style={{ minWidth: `calc(100% / ${visibleSlides})` }}
                >
                  <div className="skill-icon-large">
                    <SkillLogo image={skill.image} name={skill.name} />
                  </div>
                  <h4 className="skill-name-large">{skill.name}</h4>
                </div>
              ))}
            </div>
            <div className="slider-controls">
              <button 
                className="slider-arrow prev-arrow"
                onClick={() => setActiveSlide((prev) => (prev === 0 ? allSkills.length - 1 : prev - 1))}
                aria-label="Previous skill"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="slider-indicators">
                {allSkills.map((_, index) => (
                  <button 
                    key={index} 
                    className={`slider-dot ${activeSlide === index ? 'active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to skill ${index + 1}`}
                  ></button>
                ))}
              </div>
              <button 
                className="slider-arrow next-arrow"
                onClick={() => setActiveSlide((prev) => (prev + 1) % allSkills.length)}
                aria-label="Next skill"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Skills Categories */}
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className={`skills-category ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${categoryIndex * 0.3}s` }}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="skill-card"
                    style={{ animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.1)}s` }}
                  >
                    <div className="skill-icon-container">
                      <SkillLogo image={skill.image} name={skill.name} />
                    </div>
                    <h4 className="skill-name">{skill.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Additional Skills */}
          <div className="additional-skills">
            <h3 className="additional-title">Other Skills</h3>
            <div className="tags-container">
              {["RESTful APIs", "Responsive Design", "UI/UX Design", "Database Design", 
                "Performance Optimization", "Code Review", "Testing", "Debugging", 
                "Agile Methodology", "Team Collaboration"].map((tag, index) => (
                <div 
                  key={index} 
                  className="skill-tag"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
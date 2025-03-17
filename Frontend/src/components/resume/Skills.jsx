import React, { useState, useEffect, useRef } from 'react';
import "./css/skills.css";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // All skills for the slider
  const allSkills = [
    { name: "Next.js", image: "/images/nextjs.png" },
    { name: "React Js", image: "/images/react.png" },
    { name: "Redux", image: "/images/redux.png" },
    { name: "MongoDB", image: "/images/mongodb.png" },
    { name: "Express", image: "/images/express.png" },
    { name: "Node Js", image: "/images/node.png" },
    { name: "typescript", image: "/images/typescript.png" },
    { name: "Javascript", image: "/images/javascript.png" },
    { name: "HTML5", image: "/images/html5-300x300.jpg" },
    { name: "CSS3", image: "/images/css3-300x300.jpg" },
    { name: "MySQL", image: "/images/mysql-logo-1-300x300.jpg" },
    { name: "PHP", image: "/images/php.png" },
    { name: "Laravel", image: "/images/laravel.png" },
    { name: "Bootstrap", image: "/images/bootstrap.png" },
    { name: "Tailwind", image: "/images/tailwind.png" },
    { name: "Git", image: "/images/git.png" },
    { name: "Postman", image: "/images/postman.png" },
    { name: "API's", image: "/images/api.png" },
    { name: "Material UI", image: "/images/materialui.png" },
    { name: "docker", image: "/images/docker.png" },
    { name: "aws", image: "/images/aws.png" },
  ];

  // Skill categories
  const skillCategories = [
    {
      title: "Languages and Databases",
      skills: [
        { name: "Javascript", image: "/images/javascript.png" },
        { name: "Typescript", image: "/images/typescript.png" },
        { name: "PHP", image: "/images/php.png" },
        { name: "HTML5", image: "/images/html5-300x300.jpg" },
        { name: "MySQL", image: "/images/mysql-logo-1-300x300.jpg" },
        { name: "MongoDB", image: "/images/mongodb.png" },
      ]
    },
    {
      title: "Libraries and Frameworks",
      skills: [
        { name: "React Js", image: "/images/react.png" },
        { name: "Next Js", image: "/images/nextjs.png" },
        { name: "Express Js", image: "/images/express.png" },
        { name: "Node Js", image: "/images/node.png" },
        { name: "Laravel", image: "/images/laravel.png" },
        { name: "CSS3", image: "/images/css3-300x300.jpg" },

        { name: "Bootstrap", image: "/images/bootstrap.png" },
        { name: "Tailwind", image: "/images/tailwind.png" },
        { name: "Material UI", image: "/images/materialui.png" },
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", image: "/images/git.png" },
        { name: "Postman", image: "/images/postman.png" },
        { name: "API's", image: "/images/api.png" },
        { name: "aws", image: "/images/aws.png" },
        { name: "docker", image: "/images/docker.png" },
      ]
    }
  ];

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
                    <img src={skill.image} alt={skill.name} />
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
                      <img src={skill.image} alt={skill.name} className="skill-icon" />
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
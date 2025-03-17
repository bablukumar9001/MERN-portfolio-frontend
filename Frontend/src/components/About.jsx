import React, { useEffect } from "react";
import "./css/about.css";
// import homephoto from "/images/aboutdemo.webp";
import homephoto from "/images/aboutphoto.jpg";
import { Link } from "react-scroll";

const About = () => {
  useEffect(() => {
    // Add scroll animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    return () => {
      // Cleanup observer on component unmount
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <div className="about-container" id="about11">
        <div className="section-title text-center">
          <span className="subtitle">Discover My Story</span>
          <h2>About Me</h2>
          <div className="title-separator">
            <span></span>
          </div>
        </div>
        
        <div className="about-content">
          {/* Image on the left for desktop, centered for mobile */}
          <div className="about-image animate-on-scroll slide-in-left">
            <div className="image-frame">
              <img className="about-img" src={homephoto} alt="Profile" />
              <div className="experience-badge">
                <span className="years">2+</span>
                <span className="text">Years<br/>Experience</span>
              </div>
            </div>
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
          </div>
          
          {/* Description on the right */}
          <div className="about-description animate-on-scroll slide-in-right">
            <section className="intro-text">
              <div className="quote-container">
                <p className="textt smaller-text">
                  <span className="quote-mark">"</span>
                  I'm Bablu Kumar, a dedicated MERN stack developer from India. I specialize in merging logic
                  with creativity to deliver intuitive, accessible, and visually appealing web experiences. My work
                  ranges from small business websites to sophisticated, feature-rich web applications.
                  I'm eager to bring my skills to a dynamic team where I can continue to grow and make an impact.
                  <span className="quote-mark">"</span>
                </p>
              </div>
              
              <h4 className="skills-heading animate-on-scroll fade-in">Tech Skills</h4>
              <ul className="skills-list">
                <li className="skill-item animate-on-scroll slide-up">
                  <div className="skill-icon"><i className="fas fa-laptop-code"></i></div>
                  <div className="skill-content smaller-text">
                    <strong>Frontend:</strong> Expertise in React.js, Next.js  JavaScript, HTML, CSS, Material UI and modern UI/UX design principles.
                  </div>
                </li>
                <li className="skill-item animate-on-scroll slide-up">
                  <div className="skill-icon"><i className="fas fa-server"></i></div>
                  <div className="skill-content smaller-text">
                    <strong>Backend:</strong> Skilled in Node.js,Next.js, Express.js, RESTful APIs, and database management.
                  </div>
                </li>
                <li className="skill-item animate-on-scroll slide-up">
                  <div className="skill-icon"><i className="fas fa-tools"></i></div>
                  <div className="skill-content smaller-text">
                    <strong>Tools & Technologies:</strong> Git, Webpack, MongoDB, Bootstrap, and more.
                  </div>
                </li>
              </ul>
              
              <div className="cta-container animate-on-scroll fade-in">
                <Link
                  to="contact11"
                  smooth={true}
                  offset={-85}
                  duration={50}
                >
                  <button className="main-btn hirebutton">
                    <i className="fas fa-paper-plane"></i> Contact Me
                  </button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

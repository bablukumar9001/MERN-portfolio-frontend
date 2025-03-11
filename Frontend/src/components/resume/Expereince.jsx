import React, { useState, useEffect } from 'react';
import './css/expereince.css'; // Import custom styles
// import { Container, Row, Col } from 'react-bootstrap';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Experience data
  const experienceData = [
    {
      companyLogo: '/images/brancosoft.png',
      companyName: 'Brancosoft Pvt. Ltd.',
      position: 'Full Stack Developer',
      duration: 'Sep 2023 - Present',
      location: 'New Delhi, India',
      color: '#ff014f',
      icon: 'fas fa-briefcase',
      achievements: [
        'Developed high-performance back-ends with secure RESTful APIs in Node.js',
        'Improved integration with third-party services for smoother user interactions',
        'Built scalable, server-side solutions to enhance performance and reliability',
        'Contributed to front-end development using React.js',
        'Converted design mockups into responsive, interactive interfaces'
      ]
    },
    {
      companyLogo: '/images/drpu.jpg',
      companyName: 'DRPU Software Pvt. Ltd.',
      position: 'Frontend Developer',
      duration: 'March 2023 - Aug 2023',
      location: 'Noida, India',
      color: '#4d79ff',
      icon: 'fas fa-laptop-code',
      achievements: [
        'Developed responsive web interfaces with HTML, CSS, and JavaScript',
        'Enhanced user experience across devices with mobile-first approach',
        'Collaborated with design teams to implement visually appealing layouts',
        'Applied HTML for structure, CSS for styling, and JavaScript for interactivity',
        'Employed front-end best practices, ensuring optimized code for consistent design'
      ]
    }
  ];

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

    const section = document.querySelector('#Experience');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className={`experience-section ${isVisible ? 'visible' : ''}`} id='Experience'>
      <div className='container'>
        <div className="section-title text-center fade-in">
          <span className="subtitle">My Professional Journey</span>
          <h2>Work Experience</h2>
          <div className="title-bar"></div>
          <p className="experience-intro">
            My professional experience has equipped me with practical skills in developing
            real-world applications and collaborating effectively in team environments.
          </p>
        </div>
        
        <div className="experience-timeline">
          <div className="timeline-line"></div>
          
          {experienceData.map((item, index) => (
            <div 
              key={index} 
              className={`experience-item ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="timeline-dot" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
              </div>
              
              <div className="experience-card">
                <div className="company-badge" style={{ backgroundColor: item.color }}>
                  <img src={item.companyLogo} alt={item.companyName} className="company-logo" />
                </div>
                
                <div className="experience-header">
                  <h3 className="position">{item.position}</h3>
                  <div className="company-info">
                    <h4 className="company-name">{item.companyName}</h4>
                    <div className="experience-meta">
                      <span className="duration">
                        <i className="far fa-calendar-alt"></i> {item.duration}
                      </span>
                      <span className="location">
                        <i className="fas fa-map-marker-alt"></i> {item.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="experience-content">
                  <h5 className="achievements-title">Key Achievements</h5>
                  <ul className="achievements-list">
                    {item.achievements.map((achievement, i) => (
                      <li 
                        key={i} 
                        className="achievement-item"
                        style={{ animationDelay: `${(index * 0.1) + (i * 0.1)}s` }}
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="experience-footer fade-in">
          <div className="experience-cta">
            <p>Interested in my professional background?</p>
            <a 
              href="https://drive.google.com/file/d/1Bo9Jh29kHcbHmp2JMhf2bX9PsTHjQJns/view" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resume-btn"
            >
              <i className="fas fa-file-pdf"></i> Download Full Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

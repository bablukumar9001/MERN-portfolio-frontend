import React, { useState, useEffect } from 'react';
import './css/expereince.css';
import { apiUrl, imageSrc } from '../../api';
import { useSiteContent } from '../../SiteContentContext';

const FALLBACK_EXPERIENCE = [
  {
    companyLogo: '',
    companyName: 'Flexsin Technologies',
    position: 'Software Engineer',
    duration: 'Mar 2026 - Jul 2026',
    location: 'Noida, India',
    color: '#00b359',
    icon: 'fas fa-code',
    achievements: [
      'Developed enterprise-grade full-stack applications using Next.js, React.js, TypeScript, Node.js, Express.js, MongoDB and a microservices architecture',
      'Built and maintained Auth, User, Admin, Gateway, KYC and Token services with secure REST APIs, JWT authentication, RBAC and Swagger documentation',
      'Built a responsive Next.js frontend and integrated Razorpay, Cloudinary, Multer and Nodemailer, with Socket.IO for real-time features',
      'Automated background tasks with Cron jobs, optimised MongoDB queries and resolved production issues to improve performance',
      'Deployed and maintained applications with Docker, Docker Compose, PM2, Nginx and AWS EC2, working in an Agile team',
    ],
  },
  {
    companyLogo: '/images/brancosoft.png',
    companyName: 'Brancosoft Pvt. Ltd.',
    position: 'MERN Stack Developer',
    duration: 'Sep 2023 - Sep 2025',
    location: 'Noida, India',
    color: '#4f46e5',
    icon: 'fas fa-briefcase',
    achievements: [
      'Developed scalable MERN stack and Next.js applications focused on performance, maintainability and responsive UX',
      'Built and integrated secure REST APIs with Node.js, Express.js and MongoDB, with JWT authentication and role-based access control',
      'Developed SEO-friendly applications with Next.js (SSR/SSG) and optimised frontend performance via lazy loading and code splitting',
      'Improved database performance with MongoDB indexing, aggregation pipelines and query optimisation',
      'Collaborated in an Agile team on feature development, code reviews, bug fixing and production releases',
    ],
  },
  {
    companyLogo: '/images/drpu.jpg',
    companyName: 'DRPU Software Pvt. Ltd.',
    position: 'Frontend Developer',
    duration: 'Mar 2023 - Aug 2023',
    location: 'Noida, India',
    color: '#4d79ff',
    icon: 'fas fa-laptop-code',
    achievements: [
      'Developed responsive, cross-browser interfaces with HTML5, CSS3, JavaScript, React.js and Bootstrap',
      'Built reusable UI components and integrated REST APIs for dynamic, interactive web applications',
      'Improved performance with lazy loading, code splitting and frontend optimisation, significantly raising Lighthouse scores',
      'Contributed to Next.js projects implementing SSR/SSG and SEO best practices',
      'Worked closely with designers and backend developers to ship pixel-perfect UIs within Agile cycles',
    ],
  },
];

const Experience = () => {
  const site = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [experienceData, setExperienceData] = useState(FALLBACK_EXPERIENCE);

  useEffect(() => {
    fetch(apiUrl('/api/experiences'))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setExperienceData(data);
      })
      .catch(() => {});
  }, []);

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
                  {item.companyLogo ? (
                    <img src={imageSrc(item.companyLogo)} alt={item.companyName} className="company-logo" />
                  ) : (
                    <i className={item.icon || 'fas fa-briefcase'} style={{ color: '#fff', fontSize: '1.4rem' }}></i>
                  )}
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
              href={site.resumeUrl}
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

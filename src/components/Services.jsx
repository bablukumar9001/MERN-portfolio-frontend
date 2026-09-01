import React, { useState, useEffect } from 'react';
import './css/services.css'; // Import styles for the Services section
import { FaCode, FaMobileAlt, FaDatabase, FaReact ,FaLaptopCode,FaNetworkWired} from 'react-icons/fa'; // Import icons for visual appeal

const ServiceCard = ({ icon, title, description, index, isVisible }) => {
  return (
    <div 
      className={`service-item ${isVisible ? 'animate' : ''}`} 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="service-icon-container">
        <div className="service-icon">{icon}</div>
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      <div className="service-hover-content">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="service-btn">Learn More</div>
      </div>
    </div>
  );
};

const Services = () => {
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

    const section = document.querySelector('#service11');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Sample data for services you provide as a MERN developer
  const servicesData = [
    {
      icon: <FaCode />,
      title: 'Full-Stack Web Development',
      description: 'Building scalable web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Expertise in both front-end and back-end development for seamless user experiences.',
    },
    {
      icon: <FaReact />,
      title: 'Frontend Development',
      description: 'Creating responsive and dynamic user interfaces with React.js. Specializing in modern UI/UX design principles for engaging and accessible web applications.',
    },
    {
      icon: <FaDatabase />,
      title: 'Backend Development',
      description: 'Developing robust server-side applications using Node.js and Express.js. Experience with RESTful APIs, database integration, and authentication systems.',
    },
    {
      icon: <FaMobileAlt />,
      title: 'Responsive Design',
      description: 'Designing websites that are mobile-friendly and responsive. Ensuring that web applications perform flawlessly across all devices, from desktops to smartphones.',
    },
    {
      icon: <FaLaptopCode />,
      title: 'Custom Web Application Development',
      description: 'Designing and developing tailored web applications using both MERN and PHP Laravel. Providing solutions that meet specific business needs with scalability and performance in mind.',
    },
    {
      icon: <FaNetworkWired />,
      title: 'API Development & Integration',
      description: 'Building and integrating RESTful APIs using Node.js/Express.js and PHP Laravel for seamless communication between client and server. Expertise in third-party API integration for enhanced functionality.',
    },
    
    
  ];

  return (
    <section className={`services-section ${isVisible ? 'visible' : ''}`} id='service11'>
      <div className="container">
        <div className="section-title text-center fade-in">
          <span className="subtitle">What I Offer</span>
          <h2>My Services</h2>
          <div className="title-bar"></div>
          <p className="services-intro">
            I provide comprehensive web development solutions tailored to meet your specific needs.
            From concept to deployment, I ensure high-quality, scalable, and maintainable applications.
          </p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className="services-cta fade-in">
          <h3>Need a custom solution?</h3>
          <p>I'm available for freelance projects and full-time opportunities.</p>
          <a href="#contact11" className="cta-button">
            <span>Get In Touch</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;


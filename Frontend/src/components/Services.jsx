

import React from 'react';
import './css/services.css'; // Import styles for the Services section
import { FaCode, FaMobileAlt, FaDatabase, FaReact ,FaLaptopCode,FaNetworkWired} from 'react-icons/fa'; // Import icons for visual appeal

const Services = () => {
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
    <section className=" container services-section " id='service11'>
       <div className="col-lg-12 mt-5 contact11">
        <div className="section-title text-center">
          <span className="subtitle">
            Here you can conatct and find me on different platforms
          </span>
          <h2>Services</h2>
        </div>
      </div>
      {/* <h2 className="section-titlee">Services</h2> */}
      <div className="services-list">
        {servicesData.map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;


import React from 'react';
import './css/expereince.css'; // Import custom styles
// import { Container, Row, Col } from 'react-bootstrap';

const Experience = () => {
  // Sample data for the experience section
  const experienceData = [
    {
      companyLogo: '/images/brancosoft.png', // Replace with actual logo URL
      companyName: 'Brancosoft Pvt. Ltd.',
      position: 'Full Stack Developer',
      duration: 'Sep 2023 - Present',
      description: `Developed high-performance back-ends with secure RESTful APIs in Node js, improving integration with third-party services for smoother user interactions. 
      Built scalable, server-side solutions to enhance performance and reliability across applications. 
      Contributed to front-end development, converting design mockups into responsive, interactive interfaces using React js.`,
    },
    {
      companyLogo: '/images/drpu.jpg', // Replace with actual logo URL
      companyName: 'DRPU Software Pvt. Ltd.',
      position: 'Frontend Developer',
      duration: 'March 2023 - Aug 2023',
      description: `Developed responsive web interfaces with HTML, CSS, and JavaScript, enhancing user experience across devices.
      Collaborated with design teams to implement visually appealing and functional layouts, applying HTML for structure, CSS for
      styling, and JavaScript for dynamic interactivity.
      Employed front-end best practices, ensuring optimized code for consistent design

`,
    },

  ];

  return (

    <>

      <section className="experience-section py-5" id='Experience'>
        <div className='container'>
          <div className="col-lg-12 mt-5 contact11">
            <div className="section-title text-center">
              <span className="subtitle">
                Here you can conatct and find me on different platforms
              </span>
              <h2>Experience</h2>
            </div>
          </div>
          {/* <h2 className="text-center mb-5 section-titlee">Experience</h2> */}
          <dic className="row">
            {experienceData.map((item, index) => (
              <div key={index} className="mb-4 md-6 lg-4 ">
                <div className="experience-item p-4 border rounded shadow-sm">
                  <div className="company-info mb-3 text-center">
                    <img
                      src={item.companyLogo}
                      alt={item.companyName}
                      className="company-logo mb-2"
                    />
                    <h3 className="company-name">{item.companyName}</h3>
                  </div>
                  <h4 className="position">{item.position}</h4>
                  <p className="duration text-muted">{item.duration}</p>
                  <p className="description"><ul className="description">
                    {item.description.split('.').map((point, index) => (
                      point.trim() && <li key={index}>{point.trim()}</li>
                    ))}
                  </ul></p>
                </div>
              </div>
            ))}
          </dic>
        </div>
      </section>
    </>
  );
};

export default Experience;

import React from 'react';
import "./css/education.css" // Import styles for the Education section

const Education = () => {
  // Sample data for the education section, you can replace with your own details
  const educationData = [
    {
      degree: 'Masters in Computer and Application ( MCA )',
      institution: 'AKTU University',
      year: '2021 - 2023',
      description: 'Focused on software development, web technologies, and database management. Developed multiple projects using React.js and Node.js.',
    },
    {
      degree: 'Bachelor in Computer and Application ( BCA)',
      institution: 'ABC Technical Institute',
      year: '2018 - 2021',
      description: 'Specialized in web development using MERN stack and PHP Laravel. Completed various projects including personal portfolio websites and e-commerce platforms.',
    },
    {
      degree: 'Intermediate ( 12th )',
      institution: 'SBN public school ( CBSE)',
      year: '2018 - 2021',
      
    },
  ];

  return (
    <section className=" container education-section" id='Education'>
      <div className="col-lg-12 mt-5 contact11">
        <div className="section-title text-center">
          <span className="subtitle">
            Here you can conatct and find me on different platforms
          </span>
          <h2>Education</h2>
        </div>
      </div>
      {/* <h2 className="section-titlee">Education</h2> */}
      <div className="education-list">
        {educationData.map((item, index) => (
          <div key={index} className="education-item">
            <h3 className="degree">{item.degree}</h3>
            <p className="institution">{item.institution}</p>
            <p className="year">{item.year}</p>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;

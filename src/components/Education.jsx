import React, { useEffect, useState } from 'react';
import "./css/education.css"
import { apiUrl } from "../api";
import { useSectionReveal } from "../hooks/useSectionReveal";
import { EducationGridSkeleton } from "./SectionSkeletons";

const FALLBACK_EDUCATION = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    year: '2021 - 2023',
    description: 'Focused on software development, web technologies and database management. Built multiple projects using React.js and Node.js.',
    icon: 'fas fa-graduation-cap',
    color: '#4f46e5'
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Chaudhary Charan Singh University (CCSU)',
    year: '2018 - 2021',
    description: 'Specialised in web development with the MERN stack and PHP Laravel. Completed projects including portfolio websites and e-commerce platforms.',
    icon: 'fas fa-university',
    color: '#4d79ff'
  },
  {
    degree: 'Intermediate (12th)',
    institution: 'SBN Public School (CBSE)',
    year: '2016 - 2018',
    description: 'Completed higher secondary education with a focus on computer science and mathematics.',
    icon: 'fas fa-school',
    color: '#00b359'
  },
];

const Education = () => {
  const isVisible = useSectionReveal('Education');
  const [educationData, setEducationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl('/api/education'))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setEducationData(
          Array.isArray(data) && data.length > 0 ? data : FALLBACK_EDUCATION
        );
      })
      .catch(() => setEducationData(FALLBACK_EDUCATION))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={`education-section ${isVisible ? 'visible' : ''}`} id='Education'>
      <div className="container">
        <div className="section-title text-center fade-in">
          <span className="subtitle">My Academic Journey</span>
          <h2>Education & Qualifications</h2>
          <div className="title-bar"></div>
          <p className="education-intro">
            My educational background has equipped me with a strong foundation in computer science
            and software development, preparing me for a successful career in web development.
          </p>
        </div>

        {loading ? (
          <EducationGridSkeleton />
        ) : (
        <div className="education-grid">
          {educationData.map((item, index) => (
            <article
              key={index}
              className={`education-card ${isVisible ? 'animate' : ''}`}
              style={{
                '--edu-accent': item.color,
                animationDelay: `${index * 0.12}s`,
              }}
            >
              <div className="education-card-top">
                <span className="education-icon" style={{ backgroundColor: item.color }}>
                  <i className={item.icon}></i>
                </span>
                <span className="education-year" style={{ backgroundColor: item.color }}>
                  {item.year}
                </span>
              </div>

              <h3 className="degree">{item.degree}</h3>
              <h4 className="institution">
                <i className="fas fa-map-marker-alt"></i> {item.institution}
              </h4>
              <p className="description">{item.description}</p>
            </article>
          ))}
        </div>
        )}

        {!loading && (
        <div className="education-footer fade-in">
          <div className="education-stats">
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years of Learning</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Certifications</div>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Education;

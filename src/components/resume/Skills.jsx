import React, { useState, useEffect } from 'react';
import "./css/skills.css";
import { apiUrl, imageSrc } from "../../api";
import { useSectionReveal } from "../../hooks/useSectionReveal";
import { SkillsGridSkeleton } from "../SectionSkeletons";

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

// Renders the skill logo, or a lettered chip when there is no image.
const SkillLogo = ({ image, name }) => {
  const [failed, setFailed] = useState(false);
  if (image && !failed) {
    return (
      <img src={imageSrc(image)} alt="" onError={() => setFailed(true)} />
    );
  }
  const initials = name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase();
  return <span className="skill-initials">{initials}</span>;
};

const Skills = () => {
  const isVisible = useSectionReveal("skills11");
  const [skillCategories, setSkillCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl("/api/skills"))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          setSkillCategories(DEFAULT_CATEGORIES);
          return;
        }
        const order = [
          ...CATEGORY_TITLES,
          ...[...new Set(data.map((s) => s.category))].filter(
            (c) => c && !CATEGORY_TITLES.includes(c)
          ),
        ];
        const grouped = order
          .map((title) => ({
            title,
            skills: data
              .filter((s) => s.category === title)
              .map((s) => ({ name: s.name, image: s.image })),
          }))
          .filter((c) => c.skills.length > 0);
        setSkillCategories(grouped.length ? grouped : DEFAULT_CATEGORIES);
      })
      .catch(() => setSkillCategories(DEFAULT_CATEGORIES))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={`skills-section ${isVisible ? "visible" : ""}`} id="skills11">
      <div className="container">
        <div className="section-title text-center fade-in">
          <span className="subtitle">My Technical Expertise</span>
          <h2>Skills &amp; Technologies</h2>
          <div className="title-bar"></div>
          <p className="skills-intro">
            A working stack spanning frontend, backend, data and infrastructure —
            the tools I reach for to ship production applications.
          </p>
        </div>

        {loading ? (
          <SkillsGridSkeleton />
        ) : (
        <div className="skills-groups">
          {skillCategories.map((category, ci) => (
            <div
              key={ci}
              className={`skill-group ${["Frontend", "Backend"].includes(category.title) ? "skill-group--wide" : ""} ${isVisible ? "animate" : ""}`}
              style={{ transitionDelay: `${ci * 0.06}s` }}
            >
              <h3 className="skill-group-title">{category.title}</h3>
              <ul className="skill-chip-list">
                {category.skills.map((skill, si) => (
                  <li key={si} className="skill-chip">
                    <span className="skill-chip-logo">
                      <SkillLogo image={skill.image} name={skill.name} />
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="additional-skills">
            <h3 className="additional-title">Also comfortable with</h3>
            <div className="tags-container">
              {[
                "RESTful API design",
                "Responsive UI",
                "Web performance",
                "MongoDB aggregation",
                "Caching (Redis / ISR)",
                "Code review",
                "Testing",
                "Debugging",
                "Agile / Scrum",
                "Team collaboration",
              ].map((tag, i) => (
                <span key={i} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
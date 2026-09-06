import React, { useEffect, useState } from "react";
import "./css/testimonials.css";
import { apiUrl, imageSrc } from "../api";
import { useSectionReveal } from "../hooks/useSectionReveal";
import { TestimonialsGridSkeleton } from "./SectionSkeletons";

const FALLBACK_TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "Tech Lead",
    company: "Brancosoft Pvt. Ltd.",
    quote:
      "Bablu consistently delivered clean, maintainable MERN and Next.js code. Strong on REST APIs, code reviews and shipping features on schedule in our Agile sprints.",
    avatar: "",
    linkedinUrl: "",
  },
  {
    name: "Priya Mehta",
    role: "Project Manager",
    company: "Flexsin Technologies",
    quote:
      "Reliable full-stack engineer on our enterprise modules — microservices, JWT auth and production releases. Communicates clearly and handles production issues well.",
    avatar: "",
    linkedinUrl: "",
  },
  {
    name: "Amit Verma",
    role: "Founder",
    company: "Veavix",
    quote:
      "Hired Bablu for a full-stack web project — responsive UI, solid backend integration and on-time delivery. Would work with him again on client-facing products.",
    avatar: "",
    linkedinUrl: "",
  },
];

const Avatar = ({ src, name }) => {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (src && !failed) {
    return (
      <img
        className="testimonial-avatar"
        src={imageSrc(src)}
        alt=""
        onError={() => setFailed(true)}
      />
    );
  }
  return <span className="testimonial-avatar testimonial-avatar--initials">{initials}</span>;
};

const Testimonials = () => {
  const isVisible = useSectionReveal("testimonials");
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl("/api/testimonials"))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setItems(
          Array.isArray(data) && data.length > 0 ? data : FALLBACK_TESTIMONIALS
        );
      })
      .catch(() => setItems(FALLBACK_TESTIMONIALS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      className={`testimonials-section ${isVisible ? "visible" : ""}`}
      id="testimonials"
    >
      <div className="testimonials-inner">
        <div className="section-title text-center fade-in">
          <span className="subtitle">Social Proof</span>
          <h2>What People Say</h2>
          <div className="title-bar"></div>
          <p className="testimonials-intro">
            Feedback from colleagues, clients and collaborators I've worked with.
          </p>
        </div>

        {loading ? (
          <TestimonialsGridSkeleton />
        ) : (
          <div className="testimonials-grid">
            {items.map((t, i) => (
              <blockquote
                key={t._id || i}
                className={`testimonial-card ${isVisible ? "animate" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="testimonial-quote-mark" aria-hidden="true">"</div>
                <p className="testimonial-quote">{t.quote}</p>
                <footer className="testimonial-author">
                  <Avatar src={t.avatar} name={t.name} />
                  <div>
                    <cite className="testimonial-name">
                      {t.linkedinUrl ? (
                        <a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          {t.name}
                        </a>
                      ) : (
                        t.name
                      )}
                    </cite>
                    {(t.role || t.company) && (
                      <span className="testimonial-meta">
                        {[t.role, t.company].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

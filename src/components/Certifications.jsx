import React, { useEffect, useState } from "react";
import "./css/certifications.css";
import { apiUrl, imageSrc } from "../api";
import { CertificationsGridSkeleton } from "./SectionSkeletons";

const Certifications = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch(apiUrl("/api/certifications"))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    const section = document.querySelector("#certifications");
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, [loading, items?.length]);

  if (!loading && items.length === 0) return null;

  return (
    <section
      className={`certs-section ${isVisible ? "visible" : ""}`}
      id="certifications"
    >
      <div className="certs-inner">
        <div className="section-title text-center fade-in">
          <span className="subtitle">Credentials</span>
          <h2>Certifications</h2>
          <div className="title-bar"></div>
        </div>

        {loading ? (
          <CertificationsGridSkeleton />
        ) : (
        <div className="certs-grid">
          {items.map((c, i) => {
            const Wrapper = c.credentialUrl ? "a" : "div";
            const linkProps = c.credentialUrl
              ? { href: c.credentialUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={c._id || i}
                className={`cert-card ${c.credentialUrl ? "linked" : ""}`}
                style={{ transitionDelay: `${i * 0.05}s` }}
                {...linkProps}
              >
                <div className="cert-badge">
                  {c.image ? (
                    <img src={imageSrc(c.image)} alt="" />
                  ) : (
                    <i className="fas fa-certificate"></i>
                  )}
                </div>
                <div className="cert-body">
                  <h3>{c.name}</h3>
                  {c.issuer && <p className="cert-issuer">{c.issuer}</p>}
                  <div className="cert-meta">
                    {c.issueDate && <span>{c.issueDate}</span>}
                    {c.credentialId && (
                      <span className="cert-id">ID: {c.credentialId}</span>
                    )}
                  </div>
                </div>
                {c.credentialUrl && (
                  <i className="fas fa-arrow-up-right-from-square cert-link-icon"></i>
                )}
              </Wrapper>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;

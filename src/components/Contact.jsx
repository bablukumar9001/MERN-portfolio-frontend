import React, { useState, useEffect } from "react";
import "./css/contact.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "../api";
import { useSiteContent } from "../SiteContentContext";

const REASONS = [
  "Job opportunity",
  "Freelance / project inquiry",
  "Collaboration",
  "Just saying hi",
];

const Contact = () => {
  const site = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
    website: "", // honeypot — must stay empty
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );
    const section = document.querySelector("#contact11");
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!user.name.trim()) errors.name = "Please enter your name";
    if (!user.email.trim()) errors.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(user.email)) errors.email = "That email doesn't look right";
    if (!user.message.trim()) errors.message = "Please write a message";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser((u) => ({ ...u, [name]: value }));
    if (formErrors[name]) setFormErrors((fe) => ({ ...fe, [name]: "" }));
  };

  const PostData = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const { name, email, reason, message, website } = user;
      const res = await fetch(apiUrl("/clientdata"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: reason || "General inquiry",
          message,
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success("Thanks! Your message has been sent.", { autoClose: 3000 });
        setUser({ name: "", email: "", reason: "", message: "", website: "" });
      } else if (res.status === 429) {
        toast.error("Too many messages — please try again in a few minutes.", { autoClose: 3500 });
      } else {
        toast.error(data.error || "Something went wrong. Please try again.", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Couldn't send right now. Please try again later.", { autoClose: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoItems = [
    { icon: "fas fa-envelope", label: "Email", value: site.contactEmail, href: `mailto:${site.contactEmail}` },
    { icon: "fas fa-phone-alt", label: "Phone", value: site.contactPhone, href: `tel:${(site.contactPhone || "").replace(/\s+/g, "")}` },
    { icon: "fas fa-map-marker-alt", label: "Location", value: site.contactLocation },
  ];

  const socials = [
    { icon: "fab fa-github", url: site.social.github },
    { icon: "fab fa-linkedin-in", url: site.social.linkedin },
    { icon: "fab fa-twitter", url: site.social.twitter },
    { icon: "fab fa-instagram", url: site.social.instagram },
  ].filter((s) => s.url);

  return (
    <section className={`contact-section ${isVisible ? "visible" : ""}`} id="contact11">
      <div className="contact-inner">
        <div className="section-title text-center fade-in">
          <span className="subtitle">Get In Touch</span>
          <h2>Contact Me</h2>
          <div className="title-bar"></div>
          <p className="contact-intro">
            Have a role, a project, or an idea to discuss? Send a message and I'll
            get back to you soon.
          </p>
        </div>

        <div className="contact-grid">
          {/* ---- Left: details ---- */}
          <aside className="contact-aside contact-reveal">
            <h3>Let's talk</h3>
            <ul className="contact-info-list">
              {infoItems.map((it) => (
                <li key={it.label}>
                  <span className="contact-info-icon">
                    <i className={it.icon}></i>
                  </span>
                  <span className="contact-info-text">
                    <span className="contact-info-label">{it.label}</span>
                    {it.href ? (
                      <a href={it.href}>{it.value}</a>
                    ) : (
                      <span>{it.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="contact-socials">
              {socials.map((s) => (
                <a key={s.icon} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.icon}>
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </aside>

          {/* ---- Right: form ---- */}
          <div className="contact-form-card contact-reveal">
            <form onSubmit={PostData} noValidate>
              <div className="contact-field-row">
                <div className="contact-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Your name"
                    className={formErrors.name ? "invalid" : ""}
                  />
                  {formErrors.name && <span className="contact-err">{formErrors.name}</span>}
                </div>
                <div className="contact-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="you@example.com"
                    className={formErrors.email ? "invalid" : ""}
                  />
                  {formErrors.email && <span className="contact-err">{formErrors.email}</span>}
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="reason">Reason for contact <span className="contact-optional">(optional)</span></label>
                <select id="reason" name="reason" value={user.reason} onChange={handleInputs}>
                  <option value="">Select one…</option>
                  {REASONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={user.message}
                  onChange={handleInputs}
                  placeholder="Tell me a bit about it…"
                  className={formErrors.message ? "invalid" : ""}
                ></textarea>
                {formErrors.message && <span className="contact-err">{formErrors.message}</span>}
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={user.website}
                onChange={handleInputs}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
              />

              <button type="submit" className="contact-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending…
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </section>
  );
};

export default Contact;

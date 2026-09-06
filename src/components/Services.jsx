import React, { useState, useEffect } from 'react';
import './css/services.css'; // Import styles for the Services section
import {
  FaCode, FaMobileAlt, FaDatabase, FaReact, FaLaptopCode, FaNetworkWired,
  FaServer, FaTools, FaCubes, FaEthereum, FaCreditCard, FaCloud,
} from 'react-icons/fa'; // Import icons for visual appeal
import { apiUrl } from "../api";
import { ServicesGridSkeleton } from "./SectionSkeletons";
import { useSiteContent } from "../SiteContentContext";

// Map the icon name stored in the DB to a react-icons component.
const ICON_MAP = {
  FaCode: <FaCode />,
  FaReact: <FaReact />,
  FaDatabase: <FaDatabase />,
  FaMobileAlt: <FaMobileAlt />,
  FaLaptopCode: <FaLaptopCode />,
  FaNetworkWired: <FaNetworkWired />,
  FaServer: <FaServer />,
  FaTools: <FaTools />,
  FaCubes: <FaCubes />,
  FaEthereum: <FaEthereum />,
  FaCreditCard: <FaCreditCard />,
  FaCloud: <FaCloud />,
};
const renderIcon = (icon) => {
  if (icon && ICON_MAP[icon]) return ICON_MAP[icon];
  return icon || <FaCode />; // already-JSX (fallback data) or default
};

const FALLBACK_SERVICES = [
  {
    icon: 'FaCode',
    title: 'Full-Stack Web Development',
    description: 'Building scalable web applications with the MERN stack and Next.js (SSR/SSG/ISR). End-to-end delivery from database design to a polished, responsive UI.',
    engagement: '4–8 weeks',
    deliverables: ['Scope & milestones doc', 'Responsive UI + REST APIs', 'Staging & production deploy', 'Handoff documentation'],
  },
  {
    icon: 'FaCubes',
    title: 'Microservices Architecture',
    description: 'Designing and building service-based backends — Auth, Gateway, KYC and domain services — with secure REST APIs, JWT/RBAC and Swagger documentation.',
    engagement: '6–10 weeks',
    deliverables: ['Service map & API contracts', 'Auth + domain microservices', 'Swagger docs & Docker setup', 'AWS/PM2 deployment'],
  },
  {
    icon: 'FaEthereum',
    title: 'Web3 Application Development',
    description: 'Full-stack Web3 platforms and launchpads: wallet flows, multi-chain support, token and KYC services, and responsive Next.js dashboards.',
    engagement: '6–12 weeks',
    deliverables: ['Wallet & KYC flows', 'Next.js dashboard', 'Token/gateway services', 'Production monitoring setup'],
  },
  {
    icon: 'FaReact',
    title: 'Frontend Development',
    description: 'Responsive, dynamic interfaces with React.js and Next.js, Redux Toolkit / React Query state management and modern, accessible UI/UX.',
    engagement: '2–6 weeks',
    deliverables: ['Component library / pages', 'API integration', 'Responsive + accessible UI', 'Performance tuning'],
  },
  {
    icon: 'FaDatabase',
    title: 'Backend & API Development',
    description: 'Robust Node.js/Express services, RESTful APIs, authentication (JWT/OAuth), MongoDB aggregation pipelines and query optimisation.',
    engagement: '3–8 weeks',
    deliverables: ['REST API design', 'Auth & data models', 'Swagger documentation', 'Query optimisation'],
  },
  {
    icon: 'FaCreditCard',
    title: 'Payment & Third-Party Integration',
    description: 'Razorpay payments, Cloudinary media, Nodemailer email, Socket.IO real-time and Cron background jobs, wired cleanly into your app.',
    engagement: '1–3 weeks',
    deliverables: ['Payment/checkout flow', 'Email & media integration', 'Real-time events', 'Webhook & error handling'],
  },
  {
    icon: 'FaCloud',
    title: 'DevOps & Cloud Deployment',
    description: 'Containerising and shipping apps with Docker, Docker Compose, PM2, Nginx and AWS EC2, with CI/CD via GitHub Actions.',
    engagement: '1–2 weeks',
    deliverables: ['Docker + Compose setup', 'Nginx + PM2 config', 'AWS EC2 deployment', 'CI/CD pipeline'],
  },
  {
    icon: 'FaMobileAlt',
    title: 'Responsive Design & Performance',
    description: 'Mobile-first, cross-browser UIs tuned with lazy loading, code splitting, caching and image optimisation for strong Lighthouse scores.',
    engagement: '1–3 weeks',
    deliverables: ['Mobile-first UI pass', 'Lazy load & code split', 'Lighthouse audit fixes', 'Core Web Vitals improvements'],
  },
];

const ServiceCard = ({ icon, title, description, deliverables, engagement, index, isVisible }) => {
  return (
    <div
      className={`service-item ${isVisible ? 'animate' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="service-icon-container">
        <div className="service-icon">{renderIcon(icon)}</div>
      </div>
      {engagement && <span className="service-engagement">{engagement}</span>}
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
      {deliverables?.length > 0 && (
        <ul className="service-deliverables">
          {deliverables.map((d) => (
            <li key={d}><i className="fas fa-check" /> {d}</li>
          ))}
        </ul>
      )}
      <div className="service-hover-content">
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="service-btn">Learn More</div>
      </div>
    </div>
  );
};

const Services = () => {
  const site = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl('/api/services'))
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setServicesData(
          Array.isArray(data) && data.length > 0 ? data : FALLBACK_SERVICES
        );
      })
      .catch(() => setServicesData(FALLBACK_SERVICES))
      .finally(() => setLoading(false));
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

    const section = document.querySelector('#service11');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className={`services-section ${isVisible ? 'visible' : ''}`} id='service11'>
      <div className="container">
        <div className="section-title text-center fade-in">
          <span className="subtitle">What I Offer</span>
          <h2>My Services</h2>
          <div className="title-bar"></div>
          <p className="services-intro">
            {site.servicesIntro ||
              "I provide comprehensive web development solutions tailored to meet your specific needs. From concept to deployment, I ensure high-quality, scalable, and maintainable applications."}
          </p>
          {site.servicesEngagementNote && (
            <p className="services-engagement-note">{site.servicesEngagementNote}</p>
          )}
        </div>

        {loading ? (
          <ServicesGridSkeleton />
        ) : (
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              deliverables={service.deliverables}
              engagement={service.engagement}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
        )}

        {!loading && (
        <div className="services-cta fade-in">
          <h3>Need a custom solution?</h3>
          <p>{site.availabilityText || "Open to full-time & freelance opportunities"}</p>
          <a href="#contact11" className="cta-button">
            <span>Get In Touch</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
        )}
      </div>
    </section>
  );
};

export default Services;


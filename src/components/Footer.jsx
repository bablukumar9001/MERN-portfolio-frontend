import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import "./css/footer.css";
import mylogo from "/images/mylogo1.png";
import { useSiteContent } from "../SiteContentContext";
import { FooterTextSkeleton } from "./SectionSkeletons";

const Footer = () => {
  const site = useSiteContent();
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
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

    const footer = document.querySelector('.footer-section');
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);
  
  // Show/hide scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { id: "home11", label: "Home" },
    { id: "about11", label: "About" },
    { id: "skills11", label: "Skills" },
    { id: "project11", label: "Projects" },
    { id: "contact11", label: "Contact" }
  ];
  
  const socialLinks = [
    { icon: "fab fa-github", url: site.social.github, label: "GitHub" },
    { icon: "fab fa-linkedin", url: site.social.linkedin, label: "LinkedIn" },
    { icon: "fab fa-twitter", url: site.social.twitter, label: "Twitter" },
    { icon: "fab fa-instagram", url: site.social.instagram, label: "Instagram" }
  ];

  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className={`footer-widget about-widget ${isVisible ? 'animate' : ''}`}>
                <div className="footer-logo">
                  <img className="site-logo" src={mylogo} alt="Logo" />
                </div>
                <p className="footer-text">
                  {site.isLoading ? <FooterTextSkeleton /> : site.footerText}
                </p>
                <div className="social-links">
                  {socialLinks.map((link, index) => (
                    <a 
                      key={index} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className={`footer-widget links-widget ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.2s' }}>
                <h4 className="footer-title">Quick Links</h4>
                <ul className="footer-links">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.id} 
                        smooth={true} 
                        duration={500} 
                        offset={-100}
                      >
                        <i className="fas fa-chevron-right"></i> {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className={`footer-widget contact-widget ${isVisible ? 'animate' : ''}`} style={{ animationDelay: '0.4s' }}>
                <h4 className="footer-title">Contact Info</h4>
                <ul className="contact-info">
                  {site.isLoading ? (
                    <li><FooterTextSkeleton /></li>
                  ) : (
                  <>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{site.contactLocation}</span>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
                  </li>
                  <li>
                    <i className="fas fa-phone-alt"></i>
                    <a href={`tel:${site.contactPhone.replace(/\s+/g, "")}`}>{site.contactPhone}</a>
                  </li>
                  </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <p>© {currentYear} <strong>{site.heroName}</strong>. All Rights Reserved.</p>
          </div>
        </div>
      </div>
      
      <div className={`scroll-top ${showScrollTop ? 'visible' : ''}`}>
        <Link to="home11" smooth={true} duration={800}>
          <i className="fas fa-arrow-up"></i>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

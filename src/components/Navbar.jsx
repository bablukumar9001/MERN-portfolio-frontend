import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-scroll";
import mylogo from "/images/mylogo1.png";
import "./css/navbar.css";
import { ThemeContext } from "../ThemeContext";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState("home11");
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Track scroll position for navbar background
  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY > 25) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("scroll", changeBackground);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const sections = [
      "home11", 
      "about11", 
      "skills11", 
      "Experience", 
      "Education", 
      "service11", 
      "project11", 
      "contact11"
    ];
    
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset;
      let newActiveSection = sections[0];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const offsetTop = element.offsetTop - 150;
        
        if (pageYOffset >= offsetTop) {
          newActiveSection = section;
        }
      }
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    setIsCollapsed(true); // Collapse the navbar when a link is clicked
  };

  const navLinks = [
    { id: "home11", label: "Home", offset: -100 },
    { id: "about11", label: "About", offset: -120 },
    { id: "skills11", label: "Skills", offset: -105 },
    { id: "Experience", label: "Experience", offset: -105 },
    { id: "Education", label: "Education", offset: -105 },
    { id: "service11", label: "Services", offset: -60 },
    { id: "project11", label: "Projects", offset: -85 },
    { id: "contact11", label: "Contact", offset: -85 }
  ];

  return (
    <>
      <header className="header-wrapper">
        <nav
          className={`navbar navbar-expand-lg ${
            isActive ? "header-scrolled" : ""
          }`}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="home11" smooth={true} duration={200}>
              <img className="mylogo" src={mylogo} alt="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={handleToggle}
              aria-controls="navbarNavAltMarkup"
              aria-expanded={!isCollapsed}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                <i className="fas fa-bars"></i>
              </span>
            </button>

            <div
              className={`collapse navbar-collapse justify-content-end ${
                isCollapsed ? "" : "show"
              }`}
              id="navbarNavAltMarkup"
            >
              <ul className="navbar-nav menu-navbar-nav ms-auto mb-2 mb-lg-0">
                {navLinks.map((link) => (
                  <li className="nav-item" key={link.id}>
                    <Link
                      className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                      to={link.id}
                      spy={true}
                      smooth={true}
                      offset={link.offset}
                      duration={200}
                      onClick={handleLinkClick}
                    >
                      {link.label}
                      <span className="nav-indicator"></span>
                    </Link>
                  </li>
                ))}
                <li className="nav-item">
                  <button 
                    className="theme-toggle-btn" 
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                  >
                    {theme === 'light' ? (
                      <i className="fas fa-moon"></i>
                    ) : (
                      <i className="fas fa-sun"></i>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

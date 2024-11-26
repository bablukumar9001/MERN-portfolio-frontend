import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import mylogo from "/images/mylogo1.png";
import "./css/navbar.css";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

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

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    setIsCollapsed(true); // Collapse the navbar when a link is clicked
  };

  return (
    <>
      <header className="header-wrapper">
        <nav
          className={`navbar navbar-expand-lg ${
            isActive ? "header-scrolled" : ""
          }`}
        >
          <div className="container-fluid">
            <Link className="navbar-brand" to="home11" smooth={true} duration={50}>
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
              <i className="fa fa-bars navbar-toggler-icon"></i>
            </button>

            <div
              className={`collapse navbar-collapse justify-content-end ${
                isCollapsed ? "" : "show"
              }`}
              id="navbarNavAltMarkup"
            >
              <ul className="navbar-nav menu-navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="home11"
                    smooth={true}
                    offset={-100}
                    duration={50}
                    onClick={handleLinkClick}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="about11"
                    smooth={true}
                    offset={-120}
                    duration={50}
                    onClick={handleLinkClick}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="skills11"
                    smooth={true}
                    offset={-105}
                    duration={50}
                    onClick={handleLinkClick}
                  >
                    Skills
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="Experience"
                    smooth={true}
                    offset={-105}
                    duration={50}
                    onClick={handleLinkClick}
                  >
                    Experience
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="Education"
                    smooth={true}
                    offset={-105}
                    duration={50}
                    onClick={handleLinkClick}
                  >
                    Education
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="service11"
                    smooth={true}
                    offset={-60}
                    duration={50}
                    onClick={handleLinkClick}
                  >
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="project11"
                    smooth={true}
                    offset={-85}
                    duration={50}
                    onClick={handleLinkClick}
                  >
                    Projects
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="contact11"
                    smooth={true}
                    offset={-85}
                    duration={50}
                    onClick={handleLinkClick}
                  >
                    Contact
                  </Link>
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

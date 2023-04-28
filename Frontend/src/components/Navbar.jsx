import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import mylogo from "/images/mylogo1.png";

import "./css/navbar.css";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  let navBar = document.querySelectorAll(".nav-link");

  let navCollapse = document.querySelector(".navbar-collapse.collapse");
  navBar.forEach(function (a) {
    a.addEventListener("click", function () {
      navCollapse.classList.remove("show");
    });
  });

  useEffect(() => {
    // show navbar on scroll

    const changeBackground = () => {
      if (window.scrollY > 25) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
      // console.log("hello");
    };

    window.addEventListener("scroll", changeBackground);
  }, [isActive]);

  return (
    <>
      <header className="header-wrapper">
        <nav
          className={`navbar navbar-expand-lg ${
            isActive ? "header-scrolled" : " "
          }`}
          // onScroll={test}
        >
          {/* onScroll={test} */}
          <div className="container-fluid">
            <Link className="navbar-brand" to="home11">
              <img className="mylogo" src={mylogo} alt="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa fa-bars navbar-toggler-icon"></i>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavAltMarkup"
              data-toggle="collapse"
              data-target=".navbar-collapse"
            >
              <ul className="navbar-nav menu-navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="home11"
                    aria-current="page"
                    href="#home11"
                    // spy={true}
                    smooth={true}
                    offset={-100}
                    duration={50}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="#about11"
                    to="about11"
                    // spy={true}
                    smooth={true}
                    offset={-120}
                    duration={50}
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="skills"
                    href="#skills"
                    smooth={true}
                    offset={-105}
                    duration={50}
                  >
                    Resume
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="service11"
                    href="#service11"
                    // spy={true}
                    smooth={true}
                    offset={-60}
                    duration={50}
                  >
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="project11"
                    href="#project11"
                    // spy={true}
                    smooth={true}
                    offset={-85}
                    duration={50}
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
                    href="#contact11"
                  >
                    Contact
                  </Link>
                </li>
                {/* modals button */}
                <li className="nav-item mt-3 mt-lg-0">
                  <button
                    type="button"
                    className="main-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Admin
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

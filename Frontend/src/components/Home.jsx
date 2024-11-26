import React from "react";
import "./css/home.css";
import homephoto from "/images/profile-pic.png";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  return (
    <>
      <div className="container container-fluid   text-center" id="home11">
        <div className="row">
          <div className=" col-sm-6 fadeInLeft box1">
            <section id="home" className="banner-wrapper">
              <div className="container ">
                <div clsss="row">
                  <div className="col-sm-12 text-center text-md-start ">
                    <h6>WELOME TO MY WORLD</h6>
                    <h1 className="blink">
                      Hi, I'm Bablu kumar <br />
                    </h1>

                    <h1>
                      <TypeAnimation
                        sequence={[
                          "Web Developer",
                          1000,
                          "React Developer",
                          1000,
                          "Full Stack Developer",
                          1000,
                          "MERN Developer",
                          1000,
                        ]}
                        repeat={Infinity}
                        speed={45}
                        deletionSpeed={50}
                        style={{ color: "#ff014f" }}
                      />
                      <br />
                      based in India
                    </h1>
                    <div className="mt-4">
                      <a
                        className="main-btn"
                        target=" "
                        href="https://drive.google.com/file/d/1Bo9Jh29kHcbHmp2JMhf2bX9PsTHjQJns/view"
                      >
                        Download CV
                      </a>
                    </div>
                    <Link
                      target=" "
                      to="contact11"
                      smooth={true}
                      offset={-85}
                      duration={50}
                      href="#"
                    >
                      <div className="mt-4">
                        <a className="main-btn">Hire Me</a>
                      </div>
                    </Link>
                    <div className="myphoto img-fluid"></div>
                  </div>
                </div>
              </div>
              {/* social media */}
              <div>
                <ul className="list-unstyled d-flex justify-content-center justify-content-md-end  social-icon mb-3 mb-md-0">
                  <li>
                    <a href="https://www.instagram.com/abhay__9001/" target=" ">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/abhay559722/" target=" ">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/babluku9001" target=" ">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/bablu-kumar-a0aa16231/"
                      target=" "
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/bablukumar9001" target=" ">
                      <i className="fab fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <div className="col col-sm-5 fadeInRight box2">
            <img className="image-fluid" src={homephoto} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

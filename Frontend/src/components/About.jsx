import React from "react";
import "./css/about.css";
import homephoto from "/images/one1.jpg";
import { Link } from "react-scroll";

const About = () => {
  return (
    <>
      <div className="col-lg-12 mt-5 " id="about11">
        <div className="section-title text-center">
          <span className="subtitle">
            Visit my portfolio and keep your feedback
          </span>
          <h2>About Me</h2>
        </div>
      </div>
      <div className="container container-fluid   text-center">
        <div className="row ">
          <div className="col-sm-5  box-left">
            <img className="image-fluid about-img" src={homephoto} alt="" />
          </div>
          <div className="col col-sm-6  box-right">
            <section id="home" className="banner-wrapper">
              <div className="container ">
                <p className="greet">Hi there !</p>
                <p className="mt-1 textt">
                  <span className="ivertedcomaa">"</span>I am Bablu kumar. I'm a
                  full stack developer based in India. I love combining the
                  words of logic and creatve design to make eye-catching,
                  accessible, and user-freindly websites and applications. And
                  enjoy building everthing from small bussiness sites to rich
                  interactive web apps. I'm excited to make the leap and
                  continue refining my skills with the right company . If you
                  are seeking a web presence or an employer looking to hire, you
                  can get in touch with me.
                  <span className="ivertedcomaa">"</span>
                </p>
                <Link
                  target=" "
                  // href="https://drive.google.com/file/d/1JlMVUv7iJeY2XeJhh2rdwmnZZGOGhu0G/view?usp=drivesdk"
                  to="contact11"
                  smooth={true}
                  offset={-85}
                  duration={50}
                  href="#"
                >
                  <div className="mt-4">
                    <a className="main-btn hirebutton"> Contact Me </a>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

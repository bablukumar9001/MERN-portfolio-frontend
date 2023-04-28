import React from "react";
import "./css/home.css";
import homephoto from "/images/one2.png";
import { Link } from "react-scroll";

const Home = () => {
  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 8) || 1000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span className="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
  };

  return (
    <>
      <div className="container container-fluid   text-center" id="home11">
        <div className="row ">
          <div className=" col-sm-6  box1">
            <section id="home" className="banner-wrapper">
              <div className="container ">
                <div clsss="row">
                  <div className="col-sm-12 text-center text-md-start ">
                    <h6>WELOME TO MY WORLD</h6>
                    <h1 className="blink">
                      Hi, I'm Bablu kumar <br />
                    </h1>

                    <h1>
                      <span>
                        <a
                          href=""
                          className="typewrite"
                          data-period="2000"
                          data-type='[ "Web Developer.", "React Developer.", "Full Stack Developer.", "MERN Developer." ]'
                        >
                          <span className="wrap"></span>
                        </a>
                      </span>
                      <br />
                      based in India
                    </h1>
                    <div className="mt-4">
                      <a
                        className="main-btn"
                        target=" "
                        href="https://drive.google.com/file/d/1JlMVUv7iJeY2XeJhh2rdwmnZZGOGhu0G/view?usp=drivesdk"
                      >
                        Download CV
                      </a>
                    </div>
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
                        <a className="main-btn">Hire Me</a>
                      </div>
                    </Link>
                    <div className="myphoto img-fluid"></div>
                  </div>
                </div>
              </div>
              {/* social media */}
              <div>
                <ul className="list-unstyled d-flex justify-content-center justify-content-md-end justify-content-lg-center social-icon mb-3 mb-md-0">
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

          <div className="col col-sm-5 box2">
            <img className="image-fluid" src={homephoto} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import "./css/about.css";
// import homephoto from "/images/aboutdemo.webp";
import homephoto from "/images/aboutphoto.jpg";
import { Link } from "react-scroll";

const About = () => {
  return (
    <>
      <div className="about-container " id="about11">
        {/* <div className="section-title text-center fadeIn">
          <span className="subtitle">Visit my portfolio and share your feedback</span>
          <h2>About Me</h2>
        </div> */}
        <div className="about-content ">
          <div className="about-image fadeInLeft">
            <img className="about-img" src={homephoto} alt="Profile" />
          </div>
          <div className="about-description fadeInRight">
            <section className="intro-text" >
            <h1 className="display-7 fw-bold">About Me</h1>
              <p className="textt">
                <span className="">"</span>
                {/* I'm Bablu Kumar, a full stack developer based in India. I enjoy combining logic and creative design to
                 create user-friendly, accessible, and visually engaging websites and applications. My experience spans from building small business sites to 
                 complex web applications. I'm eager to grow further with the right team! */}

                I’m Bablu Kumar, a dedicated MERN stack developer from India. I specialize in merging logic
                with creativity to deliver intuitive, accessible, and visually appealing web experiences. My work
                ranges from small business websites to sophisticated, feature-rich web applications.
                I'm eager to bring my skills to a dynamic team where I can continue to grow and make an impact.
                <span className="">"</span>
              </p>
              <h5 className="ml-5">Tech Skills</h5>
              <ul className=" mt-4">
              <li className="mt-2">
                <strong>Frontend:</strong> Expertise in React.js, JavaScript, HTML, CSS, and modern UI/UX design principles.
              </li>
              <li  className="mt-2" >
                <strong>Backend:</strong> Skilled in Node.js, Express.js, RESTful APIs, and database management.
              </li>
              <li className="mt-2">
                <strong>Tools & Technologies:</strong> Git, Webpack, MongoDB, Bootstrap, and more.
              </li>
              <li className="mt-2">
                <strong>Responsive Design:</strong> Building mobile-friendly and accessible web applications for a variety of devices.
              </li>
            </ul>
              <Link
                to="contact11"
                smooth={true}
                offset={-85}
                duration={50}
                href="#"
              >
                <button className="main-btn hirebutton">Contact Me</button>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

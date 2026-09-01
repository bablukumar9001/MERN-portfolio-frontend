import React from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import Contact from "./Contact";
import Skills from "./resume/Skills";
import Services from "./Services";
import About from "./About";
import Footer from "./Footer";
import Expereince from "./resume/Expereince";
import Proj from "./Proj";
import Education from "./Education";

const Portfolio = () => {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Expereince />
      <Education />
      <Services />
      <Proj />
      <Contact />
      <Footer />
    </>
  );
};

export default Portfolio;

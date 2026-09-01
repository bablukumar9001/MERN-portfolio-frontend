import React, { useEffect } from "react";
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
import Certifications from "./Certifications";
import GithubStats from "./GithubStats";
import ScrollProgress from "./ScrollProgress";
import CommandPalette from "./CommandPalette";
import { track } from "../api";

const Portfolio = () => {
  useEffect(() => {
    track("visit");
  }, []);

  return (
    <>
      <ScrollProgress />
      <CommandPalette />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Expereince />
      <Education />
      <Certifications />
      <Services />
      <Proj />
      <GithubStats />
      <Contact />
      <Footer />
    </>
  );
};

export default Portfolio;

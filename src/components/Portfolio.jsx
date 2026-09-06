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
import Testimonials from "./Testimonials";
import NowStrip from "./NowStrip";
import ImpactMetrics from "./ImpactMetrics";
import TechMarquee from "./TechMarquee";
import WorkProcess from "./WorkProcess";
import FeaturedProject from "./FeaturedProject";
import CompanyStrip from "./CompanyStrip";
import GithubStats from "./GithubStats";
import ScrollProgress from "./ScrollProgress";
import CommandPalette from "./CommandPalette";
import JsonLd from "./JsonLd";
import { track } from "../api";

const Portfolio = () => {
  useEffect(() => {
    track("visit");
  }, []);

  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <CommandPalette />
      <Navbar />
      <Home />
      <About />
      <ImpactMetrics />
      <NowStrip />
      <Expereince />
      <CompanyStrip />
      <Skills />
      <TechMarquee />
      <FeaturedProject />
      <Proj />
      <Testimonials />
      <Education />
      <Certifications />
      <Services />
      <WorkProcess />
      <GithubStats />
      <Contact />
      <Footer />
    </>
  );
};

export default Portfolio;

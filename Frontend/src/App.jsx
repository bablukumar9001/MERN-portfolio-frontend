import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import Skills from "./components/resume/Skills";
import Services from "./components/Services";
import About from "./components/About";
import Footer from "./components/Footer";
import Expereince from "./components/resume/Expereince";
import Proj from "./components/Proj";
import Education from "./components/Education";


const App = () => {
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

export default App;

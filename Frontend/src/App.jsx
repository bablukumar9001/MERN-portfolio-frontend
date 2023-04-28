import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";
// import Admin from "./components/Admin";
// import Admin from "./components/Admin";
import ShowData from "./components/ShowData";
import Modals from "./components/Modals";

const App = () => {
  return (
    <>
      <Navbar />
      {/* <Admin /> */}
      <Home />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Contact />
      <Footer />
      <Modals />

      <Routes>
        <Route exact path="/show" element={<ShowData />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;

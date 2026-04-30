import React from "react";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/heloSection/Herosection";
import ProfileSection from "../components/Profile/Profile";
import WhatImDoing from "../components/Whatimdoing/Whatimdoing";
import MyProjects from "../components/myProject/MyProject";
import Resume from "../components/Resume/Resume";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div className="app-shell">
      <Navbar />

      <section id="home" className="page-anchor">
        <Hero />
      </section>

      <section id="about" className="page-anchor" data-aos="fade-up">
        <ProfileSection />
      </section>

      <section id="services" className="page-anchor" data-aos="fade-up">
        <WhatImDoing />
      </section>

      <section id="portfolio" className="page-anchor" data-aos="fade-up">
        <MyProjects />
      </section>

      <section id="resume" className="page-anchor" data-aos="fade-up">
        <Resume />
      </section>

      <section id="contact" className="page-anchor" data-aos="fade-up">
        <Contact />
      </section>

      <Footer />
    </div>
  );
};

export default Home;

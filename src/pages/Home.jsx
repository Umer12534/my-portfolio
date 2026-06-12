import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/heloSection/Herosection";
import ProfileSection from "../components/Profile/Profile";
import WhatImDoing from "../components/Whatimdoing/Whatimdoing";
import MyProjects from "../components/myProject/MyProject";
import Resume from "../components/Resume/Resume";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import PortfolioChat from "../components/Chat/chat";

const AnimatedSection = motion.section;

const sectionMotion = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function MotionSection({ id, children }) {
  return (
    <AnimatedSection
      id={id}
      className="page-anchor"
      variants={sectionMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </AnimatedSection>
  );
}

const Home = () => {
  return (
    <div className="app-shell">
      <Navbar />

      <section id="home" className="page-anchor">
        <Hero />
      </section>

      <MotionSection id="about">
        <ProfileSection />
      </MotionSection>

      <MotionSection id="services">
        <WhatImDoing />
      </MotionSection>

      <MotionSection id="portfolio">
        <MyProjects />
      </MotionSection>

      <MotionSection id="resume">
        <Resume />
      </MotionSection>

      <MotionSection id="contact">
        <Contact />
      </MotionSection>

      <Footer />
      <PortfolioChat />
    </div>
  );
};

export default Home;

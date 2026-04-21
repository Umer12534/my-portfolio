import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/heloSection/Herosection'
import ProfileSection from '../components/Profile/Profile'
import WhatImDoing from '../components/Whatimdoing/Whatimdoing'
import MyProjects from '../components/myProject/MyProject'
import Resume from '../components/Resume/Resume'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <div className="app-shell">
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <ProfileSection />
      </section>

      <section id="services">
        <WhatImDoing />
      </section>

      <section id="portfolio">
        <MyProjects />
      </section>

      <section id="resume">
        <Resume />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </div>
  )
}

export default Home

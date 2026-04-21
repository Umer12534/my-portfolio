import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/heloSection/Herosection'
import ProfileSection from '../components/Profile/Profile'
import WhatImDoing from '../components/Whatimdoing/Whatimdoing'
import MyProjects from '../components/myProject/MyProject'

const Home = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <Hero />
      <ProfileSection />
      <WhatImDoing />
      <MyProjects />
      
      <div style={{ height: '200vh' }}></div>
    </div>
  )
}

export default Home

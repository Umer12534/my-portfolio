import React, { useEffect, useState } from 'react'
import './Navbar.css'

const navItems = [
  'Home',
  'About',
  'Services',
  'Portfolio',
  'Resume',
  'Blog',
  'Contact',
]

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__logo">WebDev</div>

      <nav className="navbar__links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item}
            className="navbar__link"
            href={`#${item.toLowerCase()}`}
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
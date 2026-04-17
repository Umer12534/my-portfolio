import React from 'react'
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
  return (
    <header className="navbar">
      <div className="navbar__logo">Logo</div>

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

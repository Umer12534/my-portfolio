import React, { useEffect, useState, useRef } from 'react'
import './Navbar.css'
import { useTheme } from '../../theme/ThemeContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faStar, faBriefcase, faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
// import { FaBriefcase } from "react-icons/fa";

const navItems = [
  { label: 'Home',      id: 'home',      icon: faHouse },
  { label: 'About',     id: 'about',     icon: faUser },
  { label: 'Services',  id: 'services',  icon: faBriefcase },
  { label: 'Portfolio', id: 'portfolio', icon: faStar },
  { label: 'Resume',    id: 'resume',    icon: faFileAlt },
  { label: 'Contact',   id: 'contact',   icon: faEnvelope },
]

const NAVBAR_HEIGHT = 80

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false)
  const [activeId, setActiveId]   = useState('home')
  const [underline, setUnderline] = useState({ left: 0, width: 0, ready: false })
  const { isDark, toggleTheme }   = useTheme()
  const linkRefs                  = useRef({})
  const navRef                    = useRef(null)
  const [isMobile, setIsMobile]   = useState(window.innerWidth <= 768)

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth <= 768)
      updateUnderline(activeId)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeId])

  const updateUnderline = (id) => {
    const linkEl = linkRefs.current[id]
    const navEl  = navRef.current
    if (!linkEl || !navEl) return
    const linkRect = linkEl.getBoundingClientRect()
    const navRect  = navEl.getBoundingClientRect()
    setUnderline({ left: linkRect.left - navRect.left, width: linkRect.width, ready: true })
  }

  useEffect(() => {
    updateUnderline(activeId)
  }, [activeId])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sectionIds = navItems.map((n) => n.id)
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.getBoundingClientRect().top <= NAVBAR_HEIGHT + 20) {
          setActiveId(sectionIds[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setActiveId(id)
    const target = document.getElementById(id)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const scrolledClass = scrolled ? 'navbar--scrolled' : ''
  const darkClass     = isDark   ? 'navbar--dark'     : ''

  const ThemeToggle = () => (
    <button
      className="navbar__theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="navbar__theme-toggle-track">
        <span className="navbar__theme-toggle-thumb">
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  )

  if (isMobile) {
    return (
      <>
        {/* Mobile: top bar with logo + theme toggle only */}
        <header className={['navbar', 'navbar--mobile-top', scrolledClass, darkClass].filter(Boolean).join(' ')}>
          <div className="navbar__logo">Umer</div>
          <ThemeToggle />
        </header>

        {/* Mobile: bottom tab bar */}
        <nav
          className={['navbar__bottom-tabs', isDark ? 'navbar__bottom-tabs--dark' : ''].filter(Boolean).join(' ')}
          aria-label="Mobile navigation"
        >
          {navItems.map(({ label, id, icon }) => (
            <a
              key={id}
              className={['navbar__tab', activeId === id ? 'navbar__tab--active' : ''].filter(Boolean).join(' ')}
              href={'#' + id}
              onClick={(e) => handleNavClick(e, id)}
            >
              <span className="navbar__tab-icon">
                <FontAwesomeIcon icon={icon} />
              </span>
              <span className="navbar__tab-label">{label}</span>
            </a>
          ))}
        </nav>
      </>
    )
  }

  return (
    <header className={['navbar', scrolledClass, darkClass].filter(Boolean).join(' ')}>
      <div className="navbar__logo">Umer</div>

      <nav className="navbar__links" ref={navRef} aria-label="Primary navigation">
        {navItems.map(({ label, id }) => (
          <a
            key={id}
            ref={(el) => { linkRefs.current[id] = el }}
            className={['navbar__link', activeId === id ? 'navbar__link--active' : ''].filter(Boolean).join(' ')}
            href={'#' + id}
            onClick={(e) => handleNavClick(e, id)}
          >
            {label}
          </a>
        ))}

        {underline.ready && (
          <span
            className="navbar__underline"
            style={{ left: underline.left, width: underline.width }}
          />
        )}
      </nav>

      <ThemeToggle />
    </header>
  )
}

export default Navbar
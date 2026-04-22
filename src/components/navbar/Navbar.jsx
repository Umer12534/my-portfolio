import React, { useEffect, useState, useRef } from 'react'
import './Navbar.css'
import { useTheme } from '../../theme/ThemeContext'

const navItems = [
  { label: 'Home',      id: 'home' },
  { label: 'About',     id: 'about' },
  { label: 'Services',  id: 'services' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Resume',    id: 'resume' },
  { label: 'Contact',   id: 'contact' },
]

const NAVBAR_HEIGHT = 80

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false)
  const [activeId, setActiveId]       = useState('home')
  const [underline, setUnderline]     = useState({ left: 0, width: 0, ready: false })
  const { isDark, toggleTheme }       = useTheme()
  const linkRefs                      = useRef({})
  const navRef                        = useRef(null)

  // Move the underline to the currently active link
  const updateUnderline = (id) => {
    const linkEl = linkRefs.current[id]
    const navEl  = navRef.current
    if (!linkEl || !navEl) return
    const linkRect = linkEl.getBoundingClientRect()
    const navRect  = navEl.getBoundingClientRect()
    setUnderline({
      left:  linkRect.left - navRect.left,
      width: linkRect.width,
      ready: true,
    })
  }

  // Update underline whenever activeId changes
  useEffect(() => {
    updateUnderline(activeId)
  }, [activeId])

  // Also recalculate on resize
  useEffect(() => {
    const onResize = () => updateUnderline(activeId)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeId])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sectionIds = navItems.map((n) => n.id)
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el) {
          const top = el.getBoundingClientRect().top
          if (top <= NAVBAR_HEIGHT + 20) {
            setActiveId(sectionIds[i])
            break
          }
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

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isDark ? 'navbar--dark' : ''}`}>
      <div className="navbar__logo">Umer</div>

      <nav className="navbar__links" ref={navRef} aria-label="Primary navigation">
        {navItems.map(({ label, id }) => (
          <a
            key={id}
            ref={(el) => { linkRefs.current[id] = el }}
            className={`navbar__link${activeId === id ? ' navbar__link--active' : ''}`}
            href={`#${id}`}
            onClick={(e) => handleNavClick(e, id)}
          >
            {label}
          </a>
        ))}

        {/* Sliding underline indicator */}
        {underline.ready && (
          <span
            className="navbar__underline"
            style={{
              left:  underline.left,
              width: underline.width,
            }}
          />
        )}
      </nav>

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
    </header>
  )
}

export default Navbar

import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "portfolio" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

const NAVBAR_HEIGHT = 80;

const Footer = () => {
  const handleClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const top =
        target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__inner section-container">
        {/* ── About ── */}
        <div className="footer__col">
          <h3 className="footer__heading">About</h3>
          <p className="footer__about-text">
            A passionate developer dedicated to creating exceptional digital
            experiences that make a difference.
          </p>
          <div className="footer__socials">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="footer__col">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__links">
            {quickLinks.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="footer__link"
                  onClick={(e) => handleClick(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div className="footer__col">
          <h3 className="footer__heading">Contact</h3>
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="footer__contact-icon"
              />
              <a
                href="mailto:syedumer12534@gmail.com"
                className="footer__contact-value"
              >
                syedumer12534@gmail.com
              </a>
            </li>
            <li className="footer__contact-item">
              <FontAwesomeIcon
                icon={faPhone}
                className="footer__contact-icon"
              />
              <a href="tel:+923276317391" className="footer__contact-value">
                +92 3276317391
              </a>
            </li>
            <li className="footer__contact-item">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="footer__contact-icon"
              />
              <span className="footer__contact-value">Gujrat, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} Syed Umer Zubair. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

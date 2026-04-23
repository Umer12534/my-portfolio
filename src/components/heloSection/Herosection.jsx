import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import ParticleNetwork from '../Particlenetwork/Particlenetwork';
import { useTheme } from '../../theme/ThemeContext';
import "./Herosection.css";


const ROLES = ["DEVELOPER", "Python Learner"];

const CONTACTS = [
  { label: "Email",       value: "syedumer12534@gmail.com" },
  { label: "Phone",       value: "+92 3276317391"          },
  { label: "Address",     value: "Gujrat, Pakistan"        },
  { label: "Nationality", value: "PAK"                     },
];

function Typewriter() {
  const [text,     setText]     = useState("");
  const [roleIdx,  setRoleIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];

    if (!deleting) {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), 90);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 55);
        return () => clearTimeout(t);
      }
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
  }, [text, deleting, roleIdx]);

  return (
    <div className="hero__title">
      <span className="hero__title-text">{text}</span>
      <span className="hero__cursor" />
    </div>
  );
}

export default function HeroSection() {
  const { isDark } = useTheme();

  return (
    <section className="hero">
      <div className="hero__bg hero__bg--light" />
      <div className={`hero__bg hero__bg--dark${isDark ? ' hero__bg--visible' : ''}`} />
      <div className="hero__overlay" />

      <ParticleNetwork />

      <div className="hero__content">
        <p className="hero__subtitle">- I Am Syed Umer Zubair</p>
        <Typewriter />

        {/* Contact grid */}
        <div className="hero__contacts">
          {CONTACTS.map(({ label, value }) => (
            <div className="hero__contact-item" key={label}>
              <p className="hero__contact-label">{label}:</p>
              <p className="hero__contact-value">{value}</p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hero__buttons">
          <a href="/resume.pdf" className="hero__btn hero__btn--outline">
            <FontAwesomeIcon icon={faDownload} />
            Resume
          </a>
          <a href="#contact" className="hero__btn hero__btn--outline">
            <FontAwesomeIcon icon={faEnvelope} />
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
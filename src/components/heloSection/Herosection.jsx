import { useState, useEffect } from "react";

import ParticleNetwork from '../Particlenetwork/Particlenetwork';
import { useTheme } from '../../theme/ThemeContext';
import "./Herosection.css";


const ROLES = ["DEVELOPER", "Python Lerner"];

const CONTACTS = [
  { label: "Email",       value: "syedumer12534@gmail.com" },
  { label: "Phone",       value: "+92 3276317391"     },
  { label: "Address",     value: "Gujrat, Pakistan"   },
  { label: "Nationality", value: "PAK"              },
];

// Typewriter — types each role, pauses, deletes, moves to the next
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
      {/* Light image — always visible underneath */}
      <div className="hero__bg hero__bg--light" />
      {/* Dark image — fades in/out on top */}
      <div className={`hero__bg hero__bg--dark${isDark ? ' hero__bg--visible' : ''}`} />
      {/* Dark overlay for text readability */}
      <div className="hero__overlay" />

      <ParticleNetwork />
      <div className="hero__content">
        <p className="hero__subtitle">- I Am Syed Umer Zubair</p>
        <Typewriter />
        <div className="hero__contacts">
          {CONTACTS.map(({ label, value }) => (
            <div key={label}>
              <p className="hero__contact-label">{label}:</p>
              <p className="hero__contact-value">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
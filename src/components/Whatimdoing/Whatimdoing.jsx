import { useState } from "react";
import "./Whatimdoing.css";

const services = [
  {
    id: 1,
    title: "Web Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin pharetra tortor.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" width="48" height="48">
        <path d="M24 8L40 18V38H8V18L24 8Z" />
        <path d="M24 8V38M8 18H40" />
        <circle cx="24" cy="18" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin pharetra tortor.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" width="48" height="48">
        <circle cx="24" cy="20" r="10" />
        <path d="M24 30V42M17 42H31" />
        <path d="M18 16l-4 4 4 4M30 16l4 4-4 4" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Social Media",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin pharetra tortor.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" width="48" height="48">
        <rect x="6" y="10" width="36" height="28" rx="2" />
        <path d="M6 18h36" />
        <path d="M16 10v8M32 10v8" />
        <path d="M14 26l6 4 8-6 6 4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Branding",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin pharetra tortor.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" width="48" height="48">
        <path d="M8 36L24 12L40 36H8Z" />
        <path d="M15 28h18" />
        <circle cx="24" cy="20" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Strategy",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin pharetra tortor.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" width="48" height="48">
        <circle cx="16" cy="32" r="6" />
        <path d="M22 32h10" />
        <circle cx="36" cy="32" r="3" />
        <path d="M16 26V16" />
        <circle cx="16" cy="13" r="3" />
        <path d="M19 13l14 4" />
        <circle cx="36" cy="17" r="3" />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Consulting",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin pharetra tortor.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" width="48" height="48">
        <path d="M24 8C16 8 10 14 10 22C10 28 13.5 33 19 35.5V40H29V35.5C34.5 33 38 28 38 22C38 14 32 8 24 8Z" />
        <path d="M19 40H29" />
      </svg>
    ),
  },
];

export default function WhatImDoing() {
  return (
    <section className="wid-section">
      <div className="wid-decor-dot" />

      <div className="wid-header">
        <h2 className="wid-title">What I'm Doing</h2>
        <p className="wid-subtitle">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
      </div>

      <div className="wid-grid">
        {services.map((service) => (
          <div key={service.id} className="wid-card">
            <div className="wid-icon-wrapper">{service.icon}</div>
            <h3 className="wid-card-title">{service.title}</h3>
            <p className="wid-card-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
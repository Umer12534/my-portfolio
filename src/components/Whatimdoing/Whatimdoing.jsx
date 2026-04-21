import { useState, useEffect, useRef } from "react";
import "./Whatimdoing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faLaptopCode,
  faServer,
  faDatabase,
  faRobot,
  faMicrochip,
  faGear,
  faCloud
} from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Building responsive and interactive user interfaces using modern React-based architectures.",
    icon: faLaptopCode,
  },
  {
    id: 2,
    title: "Backend Development",
    description:
      "Developing scalable server-side applications using Node.js, Express, and REST APIs.",
    icon: faServer,
  },
  {
    id: 3,
    title: "Full Stack Development",
    description:
      "End-to-end web application development covering both frontend and backend systems.",
    icon: faCode,
  },
  {
    id: 4,
    title: "Database Design",
    description:
      "Designing efficient and optimized database structures for scalable applications.",
    icon: faDatabase,
  },
  {
    id: 5,
    title: "API Development",
    description:
      "Creating secure and high-performance RESTful APIs for modern web and mobile apps.",
    icon: faGear,
  },
  {
    id: 6,
    title: "Cloud & Deployment",
    description:
      "Deploying applications using modern cloud platforms with CI/CD pipelines.",
    icon: faCloud,
  },
  {
    id: 7,
    title: "AI & Machine Learning",
    description:
      "Developing intelligent systems and models for real-world problem solving.",
    icon: faMicrochip,
  },
  {
    id: 8,
    title: "Robotics & Automation",
    description:
      "Exploring robotics systems and automation using AI-driven technologies.",
    icon: faRobot,
  },
];

export default function WhatImDoing() {
  const [hoveredId, setHoveredId] = useState(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="wid-section">
    {/* <div className="margin_container"></div> */}
      <div className="wid-header">
        <div className="wid-header__accent"></div>
        <h2 className="wid-title">My Services</h2>
        <p className="wid-subtitle">
          Transforming ideas into exceptional digital experiences
        </p>
      </div>

      <div className="wid-grid">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className={`wid-card ${isVisible ? 'animate' : ''}`}
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Border animation elements */}
            <div className="border-top"></div>
            <div className="border-right"></div>
            <div className="border-bottom"></div>
            <div className="border-left"></div>
            
            <div className={`wid-icon-wrapper ${hoveredId === service.id ? 'hovered' : ''}`}>
              <FontAwesomeIcon icon={service.icon} />
            </div>
            <h3 className="wid-card-title">{service.title}</h3>
            <p className="wid-card-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
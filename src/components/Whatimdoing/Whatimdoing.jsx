import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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
  faCloud,
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
      "Deploying and managing applications on cloud platforms for reliability and scale.",
    icon: faCloud,
  },
  {
    id: 7,
    title: "AI & Machine Learning",
    description:
      "Developing intelligent systems for real-world problems. A Python learner exploring AI & ML to build practical solutions.",
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

// Alternate AOS animations for visual variety
const animations = ["fade-up", "fade-right", "fade-left", "zoom-in"];

export default function WhatImDoing() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <section className="wid-section section-shell">
      <div className="section-container--wide">
        <div className="wid-header section-header" data-aos="fade-up">
          <div className="wid-header__accent" />
          <h2 className="wid-title">My Services</h2>
          <p className="wid-subtitle">
            Transforming ideas into exceptional digital experiences
          </p>
        </div>

        <div className="wid-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="wid-card"
              data-aos={animations[index % animations.length]}
              data-aos-delay={index * 80}
            >
              <div className="border-top" />
              <div className="border-right" />
              <div className="border-bottom" />
              <div className="border-left" />

              <div className="wid-icon-wrapper">
                <FontAwesomeIcon icon={service.icon} size="4x" />
              </div>
              <h3 className="wid-card-title">{service.title}</h3>
              <p className="wid-card-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

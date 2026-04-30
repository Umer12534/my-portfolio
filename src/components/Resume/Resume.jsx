import { useEffect, useRef, useState } from "react";
import "./Resume.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

const experience = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Vision Birds Tech",
    companyUrl: "https://visionbird.com/",
    period: "Nov 2025 – Apr 2026",
    description:
      "Worked as a Full Stack Developer at Vision Bird, developing and maintaining responsive web applications using modern frontend and backend technologies. Implemented REST APIs, integrated databases, and built scalable UI components while following best coding practices.",
  },
];

const education = [
  {
    id: 1,
    degree: "B.S. Information Technology",
    institution: "University of Gujrat",
    period: "2021 – 2025",
    description:
      "Graduated with honors. Focused on software engineering, algorithms, and data structures.",
  },
  {
    id: 2,
    degree: "DAE Electronics",
    institution: "GOVT. Swidish Pakistan College of Technology",
    period: "2017 – 2020",
    description:
      "Completed DAE in Electronics, focusing on electronic circuits, PLC, digital systems, and industrial automation with practical project-based learning.",
  },
];

function TimelineItem({ item, animate, delay, isExperience }) {
  return (
    <div
      className={`resume-timeline__item${animate ? " animate" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="resume-timeline__dot" />
      <div className="resume-timeline__card">
        <div className="resume-timeline__card-header">
          <div>
            <h3 className="resume-timeline__title">
              {isExperience ? item.role : item.degree}
            </h3>
            <span className="resume-timeline__org">
              {isExperience ? item.company : item.institution}
            </span>
            {/* <FontAwesomeIcon */}
          </div>
          <span className="resume-timeline__period">{item.period}</span>
        </div>
        <p className="resume-timeline__desc">{item.description}</p>
      </div>
    </div>
  );
}

export default function Resume() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="resume-section section-shell" ref={sectionRef}>
      <div className="section-container">
        <div className="resume-header section-header">
          <div className="resume-header__accent" />
          <h2 className="resume-header__title">Resume</h2>
          <p className="resume-header__subtitle">
            My professional journey and academic background
          </p>
          <a
            href="/Umer(CV).pdf"
            download
            className="resume-download-btn"
            aria-label="Download resume PDF"
          >
            <FontAwesomeIcon icon={faDownload} />
            <span>Download CV</span>
          </a>
        </div>

        <div className="resume-columns">
          <div className="resume-col">
            <div className="resume-col__heading">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="resume-col__icon"
              />
              <h3 className="resume-col__title">Experience</h3>
            </div>
            <div className="resume-timeline">
              {experience.map((item, idx) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  animate={animate}
                  delay={idx * 150}
                  isExperience
                />
              ))}
            </div>
          </div>

          <div className="resume-col">
            <div className="resume-col__heading">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="resume-col__icon"
              />
              <h3 className="resume-col__title">Education</h3>
            </div>
            <div className="resume-timeline">
              {education.map((item, idx) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  animate={animate}
                  delay={idx * 150 + 100}
                  isExperience={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

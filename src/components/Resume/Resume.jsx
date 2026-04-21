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
    company: "Tech Solutions Inc.",
    period: "2023 – Present",
    description:
      "Developed and maintained scalable web applications using React, Node.js, and MongoDB. Led a team of 3 developers to deliver features on time.",
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Creative Agency",
    period: "2022 – 2023",
    description:
      "Built responsive UI components and improved page performance by 40%. Collaborated closely with designers to implement pixel-perfect interfaces.",
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "StartUp Hub",
    period: "2021 – 2022",
    description:
      "Contributed to the development of client-facing dashboards and internal tools using React and REST APIs.",
  },
];

const education = [
  {
    id: 1,
    degree: "B.Sc. Computer Science",
    institution: "State University",
    period: "2018 – 2022",
    description:
      "Graduated with honors. Focused on software engineering, algorithms, and data structures.",
  },
  {
    id: 2,
    degree: "Full Stack Web Development",
    institution: "Online Bootcamp",
    period: "2021",
    description:
      "Intensive 6-month program covering modern JavaScript, React, Node.js, and database design.",
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="resume-section" ref={sectionRef}>
      <div className="resume-header">
        <div className="resume-header__accent" />
        <h2 className="resume-header__title">Resume</h2>
        <p className="resume-header__subtitle">
          My professional journey and academic background
        </p>
        <a
          href="/resume.pdf"
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
            <FontAwesomeIcon icon={faBriefcase} className="resume-col__icon" />
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
            <FontAwesomeIcon icon={faGraduationCap} className="resume-col__icon" />
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
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import "./Resume.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faDownload,
  faFileLines,
  faXmark,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

const experience = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "Vision Birds Tech",
    companyUrl: "https://visionbird.com/",
    period: "Nov 2025 - Apr 2026",
    description:
      "Worked as a Full Stack Developer at Vision Bird, developing and maintaining responsive web applications using modern frontend and backend technologies. Implemented REST APIs, integrated databases, and built scalable UI components while following best coding practices.",
    document: {
      title: "Experience Letter",
      href: "/Documents/Experience Letter for Syed Umer Zubair - INT-PSEB-182.pdf",
    },
  },
  // {
  //   id: 2,
  //   role:
  // }
];

const education = [
  {
    id: 1,
    degree: "B.S. Information Technology",
    institution: "University of Gujrat",
    period: "2021 - 2025",
    description:
      "Graduated with honors. Focused on software engineering, algorithms, and data structures.",
    document: {
      title: "Degree Certificate",
      href: "/Documents/bs-information-technology-degree.pdf",
    },
  },
  {
    id: 2,
    degree: "DAE Electronics",
    institution: "GOVT. Swidish Pakistan College of Technology",
    period: "2017 - 2020",
    description:
      "Completed DAE in Electronics, focusing on electronic circuits, PLC, digital systems, and industrial automation with practical project-based learning.",
    document: {
      title: "DAE Certificate",
      href: "/Documents/dae-electronics-certificate.pdf",
    },
  },
];

function getDocumentType(href) {
  const extension = href.split(".").pop()?.toLowerCase();

  if (extension === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "webp"].includes(extension)) return "image";
  return "file";
}

function TimelineItem({ item, animate, delay, isExperience, onOpenDocument }) {
  const itemTitle = isExperience ? item.role : item.degree;
  const organization = isExperience ? item.company : item.institution;

  return (
    <div
      className={`resume-timeline__item${animate ? " animate" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="resume-timeline__dot" />
      <div className="resume-timeline__card">
        <div className="resume-timeline__card-header">
          <div>
            <h3 className="resume-timeline__title">{itemTitle}</h3>
            <span className="resume-timeline__org">{organization}</span>
          </div>
          <span className="resume-timeline__period">{item.period}</span>
        </div>
        <p className="resume-timeline__desc">{item.description}</p>
        {item.document && (
          <button
            type="button"
            className="resume-timeline__document-btn"
            onClick={() =>
              onOpenDocument({
                ...item.document,
                heading: itemTitle,
                organization,
              })
            }
            aria-label={`View ${item.document.title}`}
            title={`View ${item.document.title}`}
          >
            <FontAwesomeIcon icon={faFileLines} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Resume() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [activeDocument, setActiveDocument] = useState(null);
  const activeDocumentType = activeDocument
    ? getDocumentType(activeDocument.href)
    : null;

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

  useEffect(() => {
    if (!activeDocument) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveDocument(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeDocument]);

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
          <div className={`resume-col${animate ? " animate" : ""}`}>
            <div className="resume-col__heading">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="resume-col__icon"
              />
              <h3 className="resume-col__title">Experience</h3>
            </div>
            <div className={`resume-timeline${animate ? " animate" : ""}`}>
              {experience.map((item, idx) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  animate={animate}
                  delay={idx * 150}
                  isExperience
                  onOpenDocument={setActiveDocument}
                />
              ))}
            </div>
          </div>

          <div className={`resume-col${animate ? " animate" : ""}`}>
            <div className="resume-col__heading">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="resume-col__icon"
              />
              <h3 className="resume-col__title">Education</h3>
            </div>
            <div className={`resume-timeline${animate ? " animate" : ""}`}>
              {education.map((item, idx) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  animate={animate}
                  delay={idx * 150 + 100}
                  isExperience={false}
                  onOpenDocument={setActiveDocument}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeDocument && (
        <div
          className="resume-document-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-document-title"
        >
          <button
            type="button"
            className="resume-document-modal__backdrop"
            aria-label="Close document preview"
            onClick={() => setActiveDocument(null)}
          />
          <div className="resume-document-modal__panel">
            <div className="resume-document-modal__header">
              <div>
                <span className="resume-document-modal__eyebrow">
                  {activeDocument.title}
                </span>
                <h3
                  id="resume-document-title"
                  className="resume-document-modal__title"
                >
                  {activeDocument.heading}
                </h3>
                <p className="resume-document-modal__org">
                  {activeDocument.organization}
                </p>
              </div>
              <div className="resume-document-modal__actions">
                <a
                  href={activeDocument.href}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-document-modal__open"
                  aria-label="Open document in new tab"
                  title="Open document in new tab"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </a>
                <button
                  type="button"
                  className="resume-document-modal__close"
                  onClick={() => setActiveDocument(null)}
                  aria-label="Close document preview"
                  title="Close"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </div>
            <div className="resume-document-modal__preview">
              {activeDocumentType === "image" ? (
                <img
                  className="resume-document-modal__image"
                  src={activeDocument.href}
                  alt={activeDocument.title}
                />
              ) : (
                <iframe
                  className="resume-document-modal__frame"
                  src={activeDocument.href}
                  title={`${activeDocument.title} preview`}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

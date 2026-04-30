import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "./MyProject.css";

// ─── Project Data ──────────────────────────────────────────
const projectsData = [
  {
    id: 1,
    title: "Genitic_insight",
    description:
      "Genetic Insight is a SaaS platform that streamlines machine learning model training on DNA and RNA sequence data. With a user-friendly web interface and robust Python backend, it allows researchers to upload genetic data, configure ML models, and visualize results—all without advanced programming skills.",
    image: "/image/genetic_insight.png",
    tags: ["Django", "Python", "NumPy/Pandas", "scikit-learn", "HTML/CSS/JS"],
    link: null,
    year: "2025",
    at: "Bs-IT FYP",
  },
  {
    id: 2,
    title: "TheHairLocs",
    description:
      "A full-stack e-commerce platform built with React.js and Firebase, featuring authentication, product listing, cart, checkout, and an admin dashboard to mange product/category. Integrated Firestore and Firebase Storage for real-time data and optimized media handling. Includes an AI chatbot (Groq API) to assist users with personalized hair care guidance and product recommendations.",
    image: "/image/the_hair_locs.png",
    tags: [
      "React.js",
      "Firebase (Auth, Firestore, Storage)",
      "Groq API",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
    link: "https://myhairlocs.netlify.app/",
    year: "2026",
    at: "Vision Birds Tech",
  },
  {
    id: 3,
    title: "Wather App",
    description:
      "Collaborative task management tool with real-time updates, drag-and-drop reordering, and team analytics.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["Next.js", "Tailwind", "Socket.io", "Prisma"],
    link: null,
    year: "2023",
    at: "Bs-IT FYP",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "Beautiful weather app with interactive maps, 7-day forecast, and location-based smart alerts.",
    image:
      "https://images.unsplash.com/photo-1592210454359-904e5f2b0e2b?w=800&h=600&fit=crop",
    tags: ["Vue.js", "D3.js", "OpenWeather API", "Leaflet"],
    link: null,
    year: "2023",
    at: "Bs-IT FYP",
  },
];

// ─── Arrow Icons ───────────────────────────────────────────
const ArrowLeft = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ExternalLink = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ─── Component ─────────────────────────────────────────────
const MyProjects = () => {
  const swiperRef = useRef(null);
  const paginationRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projectsData.length;

  const progressWidth = `${((activeIndex + 1) / total) * 100}%`;

  // Pad counter: 01 / 04
  const fmt = (n) => String(n).padStart(2, "0");

  return (
    <section className="projects-section section-shell">
      <div className="section-container">
        {/* ── Header ── */}
        <div className="wid-header section-header">
          <div className="wid-header__accent"></div>
          <h2 className="wid-title">My Project</h2>
          <p className="wid-subtitle">
            A selection of work I’ve built using modern technologies and clean
            UI principles
          </p>
        </div>

        <div className="projects-header section-header">
          <div className="projects-header-left">
            <span className="projects-eyebrow">Selected Work</span>
            <h2 className="projects-title">
              Featured
              <span> Projects</span>
            </h2>
          </div>
          <div className="projects-counter" aria-hidden="true">
            {fmt(activeIndex + 1)}&nbsp;/&nbsp;{fmt(total)}
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="projects-carousel">
          <Swiper
            className="projects-swiper"
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            onBeforeInit={(swiper) => {
              swiper.params.pagination.el = paginationRef.current;
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {projectsData.map((project, index) => (
              <SwiperSlide key={project.id}>
                <article className="project-card">
                  {/* Left — Visual */}
                  <div className="card-visual">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="card-image"
                      loading="lazy"
                    />
                    <div className="card-visual-overlay" />
                    {/* <div className="tags-yea"></div> */}
                    <span className="card-year">{project.year}</span>
                    <span className="card-at">{project.at}</span>
                    <span className="card-number" aria-hidden="true">
                      {fmt(index + 1)}
                    </span>
                  </div>

                  {/* Right — Content */}
                  <div className="card-content">
                    <div className="card-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="card-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="card-title">{project.title}</h3>

                    <p className="card-description">{project.description}</p>

                    <div className="card-footer">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-link"
                        >
                          <span>View Project</span>
                          <ExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Navigation Bar ── */}
        <div className="projects-nav">
          {/* Pagination dots */}
          <div className="projects-pagination" ref={paginationRef} />

          {/* Progress line */}
          <div className="progress-line" aria-hidden="true">
            <div className="progress-fill" style={{ width: progressWidth }} />
          </div>

          {/* Prev / Next */}
          <div className="nav-buttons">
            <button
              className="nav-btn"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous project"
            >
              <ArrowLeft />
            </button>
            <button
              className="nav-btn"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next project"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProjects;

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import './MyProject.css';

// ─── Project Data ──────────────────────────────────────────
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with cart, payments, and admin dashboard. Built with React, Node.js, and MongoDB.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://example.com/project1",
    year: "2024",
  },
  {
    id: 2,
    title: "AI Image Generator",
    description:
      "Generate stunning images from text prompts using stable diffusion. Real-time generation with live loading states.",
    image:
      "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&h=600&fit=crop",
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    link: "https://example.com/project2",
    year: "2024",
  },
  {
    id: 3,
    title: "TaskFlow Manager",
    description:
      "Collaborative task management tool with real-time updates, drag-and-drop reordering, and team analytics.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    tags: ["Next.js", "Tailwind", "Socket.io", "Prisma"],
    link: "https://example.com/project3",
    year: "2023",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "Beautiful weather app with interactive maps, 7-day forecast, and location-based smart alerts.",
    image:
      "https://images.unsplash.com/photo-1592210454359-904e5f2b0e2b?w=800&h=600&fit=crop",
    tags: ["Vue.js", "D3.js", "OpenWeather API", "Leaflet"],
    link: "https://example.com/project4",
    year: "2023",
  },
];

// ─── Arrow Icons ───────────────────────────────────────────
const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  const fmt = (n) => String(n).padStart(2, '0');

  return (
    <section className="projects-section section-shell">
      <div className="section-container">
      {/* ── Header ── */}
      <div className="projects-header section-header">
        <div className="projects-header-left">
          <span className="projects-eyebrow">Selected Work</span>
          <h2 className="projects-title">
            Featured
            <span>Projects</span>
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
          pagination={{ el: paginationRef.current, clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={true}
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
                  <span className="card-year">{project.year}</span>
                  <span className="card-number" aria-hidden="true">
                    {fmt(index + 1)}
                  </span>
                </div>

                {/* Right — Content */}
                <div className="card-content">
                  <div className="card-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="card-tag">{tag}</span>
                    ))}
                  </div>

                  <h3 className="card-title">{project.title}</h3>

                  <p className="card-description">{project.description}</p>

                  <div className="card-footer">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      <span>View Project</span>
                      <ExternalLink />
                    </a>
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

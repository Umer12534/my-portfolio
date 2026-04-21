import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Sample project data - Replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart, payments, and admin dashboard. Built with React, Node.js, and MongoDB.",
    thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=150&h=150&fit=crop",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://example.com/project1",
    year: "2024"
  },
  {
    id: 2,
    title: "AI Image Generator",
    description: "Generate stunning images from text prompts using stable diffusion. Real-time generation with loading states.",
    thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=150&h=150&fit=crop",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=500&fit=crop",
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    link: "https://example.com/project2",
    year: "2024"
  },
  {
    id: 3,
    title: "TaskFlow Manager",
    description: "Collaborative task management tool with real-time updates, drag-drop, and team analytics.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["Next.js", "Tailwind", "Socket.io", "Prisma"],
    link: "https://example.com/project3",
    year: "2023"
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "Beautiful weather app with interactive maps, 7-day forecast, and location-based alerts.",
    thumbnail: "https://images.unsplash.com/photo-1592210454359-904e5f2b0e2b?w=150&h=150&fit=crop",
    image: "https://images.unsplash.com/photo-1592210454359-904e5f2b0e2b?w=800&h=500&fit=crop",
    tags: ["Vue.js", "D3.js", "OpenWeather", "Leaflet"],
    link: "https://example.com/project4",
    year: "2023"
  }
];

const MyProjects = () => {
  const swiperRef = useRef(null);

  return (
    <div style={styles.container}>
      {/* Section Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Featured Projects</h2>
        <p style={styles.subtitle}>A showcase of my recent work and creative endeavors</p>
      </div>

      {/* Main Swiper Container */}
      <div style={styles.swiperWrapper}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={0}
          slidesPerView={1}
          navigation={false} // Custom navigation, so we disable default
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          style={styles.swiper}
        >
          {projectsData.map((project) => (
            <SwiperSlide key={project.id}>
              <div style={styles.slideContent}>
                {/* Left Side - Thumbnail */}
                <div style={styles.thumbnailArea}>
                  <div style={styles.thumbnailWrapper}>
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      style={styles.thumbnail}
                    />
                    <div style={styles.yearBadge}>{project.year}</div>
                  </div>
                </div>

                {/* Right Side - Project Details */}
                <div style={styles.detailsArea}>
                  <div style={styles.detailsContent}>
                    <h3 style={styles.projectTitle}>{project.title}</h3>
                    <div style={styles.tagsContainer}>
                      {project.tags.map((tag, idx) => (
                        <span key={idx} style={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <p style={styles.projectDescription}>{project.description}</p>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={styles.projectLink}
                    >
                      <span>View Project</span>
                      <svg style={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons at Bottom */}
        <div style={styles.navigationContainer}>
          <div style={styles.paginationWrapper}>
            {/* Swiper pagination will be inserted here */}
          </div>
          <div style={styles.buttonGroup}>
            <button 
              onClick={() => swiperRef.current?.slidePrev()} 
              style={styles.navButton}
              aria-label="Previous project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()} 
              style={styles.navButton}
              aria-label="Next project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Custom styles for pagination bullets */}
      <style jsx>{`
        .swiper-pagination {
          position: static !important;
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 0;
        }
        .swiper-pagination-bullet {
          width: 40px;
          height: 3px;
          border-radius: 4px;
          background: var(--color-border, #e5e7eb);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: var(--color-logo, #F2C476);
          width: 60px;
        }
      `}</style>
    </div>
  );
};

// Inline styles with your color scheme
const styles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '60px 24px',
    backgroundColor: 'var(--color-background, #ffffff)',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--color-text, #111111)',
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--color-text-muted, #6b7280)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  swiperWrapper: {
    position: 'relative',
    borderRadius: '24px',
    backgroundColor: 'var(--color-card, #F5F5F5)',
    overflow: 'hidden',
    boxShadow: '0 20px 35px -10px rgba(0, 0, 0, 0.08)',
  },
  swiper: {
    borderRadius: '24px',
  },
  slideContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '0',
    minHeight: '420px',
    backgroundColor: 'var(--color-card, #F5F5F5)',
  },
  thumbnailArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: 'var(--color-surface, #ffffff)',
    borderRadius: '24px 0 0 24px',
  },
  thumbnailWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '280px',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 30px -12px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease',
  },
  thumbnail: {
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    display: 'block',
  },
  yearBadge: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    backgroundColor: 'var(--color-logo, #F2C476)',
    color: 'var(--color-text, #111111)',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  detailsArea: {
    display: 'flex',
    alignItems: 'center',
    padding: '40px 48px 40px 40px',
  },
  detailsContent: {
    width: '100%',
  },
  projectTitle: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: 'var(--color-text-bold, #1a1f2e)',
    marginBottom: '16px',
    letterSpacing: '-0.01em',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  tag: {
    fontSize: '0.75rem',
    fontWeight: '500',
    padding: '4px 12px',
    backgroundColor: 'var(--color-accent-glow, rgba(232, 160, 32, 0.15))',
    color: 'var(--color-accent, #e8a020)',
    borderRadius: '20px',
    letterSpacing: '0.3px',
  },
  projectDescription: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: 'var(--color-text-muted, #6b7280)',
    marginBottom: '28px',
  },
  projectLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    backgroundColor: 'var(--color-logo, #F2C476)',
    color: 'var(--color-text, #111111)',
    textDecoration: 'none',
    fontWeight: '600',
    borderRadius: '40px',
    fontSize: '0.9rem',
    transition: 'all 0.25s ease',
    border: 'none',
    cursor: 'pointer',
  },
  linkIcon: {
    width: '18px',
    height: '18px',
    transition: 'transform 0.25s ease',
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    backgroundColor: 'var(--color-card, #F5F5F5)',
    borderTop: `1px solid var(--color-border, #e5e7eb)`,
  },
  paginationWrapper: {
    flex: 1,
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
  },
  navButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-surface, #ffffff)',
    border: `1px solid var(--color-border, #e5e7eb)`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s ease',
    color: 'var(--color-text, #111111)',
  },
};

// Add hover effect styles (can't use pseudo-classes in inline styles, so we add a style tag)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  .project-link:hover {
    background-color: var(--color-accent, #e8a020) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(232, 160, 32, 0.25);
  }
  .project-link:hover svg {
    transform: translateX(4px);
  }
  .nav-button:hover {
    background-color: var(--color-logo, #F2C476);
    border-color: var(--color-logo, #F2C476);
    transform: scale(1.05);
  }
  .thumbnail-wrapper:hover {
    transform: scale(1.02);
  }
`;
document.head.appendChild(styleSheet);

// Add hover effect class names
styles.projectLink = { ...styles.projectLink, className: 'project-link' };
styles.navButton = { ...styles.navButton, className: 'nav-button' };
styles.thumbnailWrapper = { ...styles.thumbnailWrapper, className: 'thumbnail-wrapper' };

export default MyProjects;
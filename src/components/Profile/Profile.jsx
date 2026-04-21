import { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { useTheme } from "../../theme/ThemeContext";

const SKILLS = [
    { name: "HTML && CSS", percent: 95 },
    { name: "JavaScript", percent: 85 },
    { name: "React", percent: 82 },
    { name: "Node.js", percent: 78 },
    { name: "Python", percent: 75 },
    { name: "Database Design", percent: 72 },
];

const TOOLS = [
    { name: "Git & GitHub", percent: 85 },
    { name: "VS Code", percent: 90 },
    { name: "Figma", percent: 70 },
    { name: "Postman", percent: 75 },
];

function SkillBar({ name, percent, animate, delay }) {
    return (
        <div className="skill-item" style={{ animationDelay: `${delay}ms` }}>
            <div className="skill-item__header">
                <span className="skill-item__name">{name}</span>
                <span className="skill-item__percent">{percent}%</span>
            </div>
            <div className="skill-item__track">
                <div
                    className={`skill-item__bar${animate ? " animate" : ""}`}
                    style={{ width: animate ? `${percent}%` : "0%" }}
                />
            </div>
        </div>
    );
}

export default function ProfileSection() {
    const skillsRef = useRef(null);
    const [animate, setAnimate] = useState(false);
    const { isDark } = useTheme();
    const profileImg = isDark ? '/image/profile-Dark.png' : '/image/profile-light.jpg';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="profile-section">
            {/* Header */}
            <div className="profile-header">
                <div className="profile-header__accent"></div>
                <h2 className="profile-header__title">Profile</h2>
                <p className="profile-header__subtitle">
                    Crafting digital experiences with precision and creativity
                </p>
            </div>

            {/* Top Row: Image + About Info */}
            <div className="profile-top-row">
                {/* Left: Photo */}
                <div className="profile-photo-wrapper">
                    <div className="profile-photo__frame">
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="profile-photo"
                        />
                    </div>
                    <div className="profile-photo__badge">
                        <span>Available for work</span>
                    </div>
                </div>

                {/* Right: About Info */}
                <div className="profile-about">
                    <span className="profile-about__label">About Me</span>
                    <h3 className="profile-about__name">Syed Umer Zubair</h3>
                    <div className="profile-about__badge">Full Stack Developer</div>
                    <p className="profile-about__text">
                        Experienced in building modern web applications using frontend and backend technologies. 
                        Passionate about creating scalable solutions and currently expanding expertise in Artificial 
                        Intelligence and Robotics to develop intelligent, real-world systems.
                    </p>
                </div>
            </div>

            {/* Skills Section - Two Columns */}
            <div ref={skillsRef} className="profile-skills-section">
                <div className="profile-skills__header">
                    <span className="profile-skills__icon">⚡</span>
                    <span className="profile-skills__title">Technical Expertise</span>
                </div>

                <div className="skills-two-columns">
                    {/* Left Column Skills */}
                    <div className="skills-column">
                        <div className="skill-category">
                            <div className="skill-category__header">
                                <span className="skill-category__icon">💻</span>
                                <span className="skill-category__title">Core Skills</span>
                            </div>
                            {SKILLS.map((skill, idx) => (
                                <SkillBar
                                    key={skill.name}
                                    name={skill.name}
                                    percent={skill.percent}
                                    animate={animate}
                                    delay={idx * 100}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column Skills */}
                    <div className="skills-column">
                        <div className="skill-category">
                            <div className="skill-category__header">
                                <span className="skill-category__icon">🛠️</span>
                                <span className="skill-category__title">Tools & Technologies</span>
                            </div>
                            {TOOLS.map((tool, idx) => (
                                <SkillBar
                                    key={tool.name}
                                    name={tool.name}
                                    percent={tool.percent}
                                    animate={animate}
                                    delay={idx * 100}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
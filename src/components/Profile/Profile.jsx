import { useEffect, useRef, useState } from "react";
import "./Profile.css";

const SKILLS = [
    { name: "Development", percent: 75 },
    { name: "Web Design", percent: 85 },
    { name: "Branding", percent: 70 },
];

function SkillBar({ name, percent, animate }) {
    return (
        <div className="skill-item">
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

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setAnimate(true);
            observer.disconnect();
            }
        },
        { threshold: 0.3 }
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
            <h2 className="profile-header__title">Profile</h2>
            <p className="profile-header__subtitle">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
            </p>
        </div>

        {/* Body */}
        <div className="profile-body">
            {/* Left: Photo */}
            <img
            src="/image/profile.jpg"
            alt="Profile"
            className="profile-photo"
            />

            {/* Right: Content */}
            <div className="profile-content">
            {/* Intro */}
            <span className="profile-content__label">Intro</span>
            <h3 className="profile-content__name">
                Hi, my name is Syed Umer Zubair.
            </h3>
            <p className="profile-content__bold-text">
                The person who designed and built Envato. He's a programmer and web
                developer who enjoys a diverse array of hobbies, including building
                web apps.
            </p>
            <p className="profile-content__text">
                Bootstrap has reached wide-spread adoption among developers and many
                have expressed their desire for design customization beyond the
                default styles. This marketplace was created to solve.
            </p>

            {/* Skills */}
            <div ref={skillsRef} className="skill">
                <span className="profile-skills__label">Skills</span>
                <div className="skill-list">
                {SKILLS.map((skill) => (
                    <SkillBar
                    key={skill.name}
                    name={skill.name}
                    percent={skill.percent}
                    animate={animate}
                    />
                ))}
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}
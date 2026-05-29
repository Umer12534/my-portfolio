import { useState } from "react";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: faEnvelope,
    label: "Email",
    value: "syedumer12534@gmail.com",
    href: "mailto:syedumer12534@gmail.com",
  },
  {
    icon: faPhone,
    label: "Phone",
    value: "+92 327 6317391",
    href: "tel:+923276317391",
  },
  {
    icon: faWhatsapp,
    label: "WhatsApp",
    value: "+92 327 6317391",
    href: "https://wa.me/923276317391",
  },
  {
    icon: faLocationDot,
    label: "Location",
    value: "Gujrat Pakistan",
    href: null,
  },
];

const socials = [
  { icon: faGithub, label: "GitHub", href: "https://github.com/Umer12534" },
  {
    icon: faLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/syed-umer-ac2416",
  },
];

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [feedback, setFeedback] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status) {
      setStatus(null);
      setFeedback("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (Object.values(trimmedForm).some((value) => !value)) {
      setStatus("error");
      setFeedback("Please fill in all fields before sending.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedForm.email)) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    const {
      VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_ID,
      VITE_EMAILJS_PUBLIC_KEY,
    } = import.meta.env;

    if (
      !VITE_EMAILJS_SERVICE_ID ||
      !VITE_EMAILJS_TEMPLATE_ID ||
      !VITE_EMAILJS_PUBLIC_KEY
    ) {
      setStatus("error");
      setFeedback("Email service is not configured yet.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    emailjs
      .send(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        {
          name: trimmedForm.name,
          email: trimmedForm.email,
          subject: trimmedForm.subject,
          message: trimmedForm.message,
          from_name: trimmedForm.name,
          from_email: trimmedForm.email,
          reply_to: trimmedForm.email,
          user_name: trimmedForm.name,
          user_email: trimmedForm.email,
        },
        VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus("success");
          setFeedback("Message sent! I'll get back to you soon.");
          setForm(INITIAL_FORM);
        },
        (error) => {
          console.error(error);
          setStatus("error");
          setFeedback("Something went wrong. Please try again.");
        },
      );
  }

  return (
    <section className="contact-section section-shell">
      <div className="section-container">
        <div className="contact-header section-header">
          <div className="contact-header__accent" />
          <h2 className="contact-header__title">Contact</h2>
          <p className="contact-header__subtitle">
            Have a project in mind? Let's talk.
          </p>
        </div>

        <div className="contact-body">
          {/* Left – info */}
          <div className="contact-info">
            <h3 className="contact-info__heading">Get in Touch</h3>
            <p className="contact-info__text">
              I'm always open to new opportunities, collaborations, or just a
              friendly chat. Fill out the form or reach me directly through any
              of the channels below.
            </p>

            <ul className="contact-info__list">
              {contactInfo.map((item) => (
                <li key={item.label} className="contact-info__item">
                  <span className="contact-info__icon-wrap">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <div>
                    <span className="contact-info__label">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="contact-info__value"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-info__value">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-btn"
                  aria-label={s.label}
                >
                  <FontAwesomeIcon
                    icon={s.icon}
                    className="contact-social-icon"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right – form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__row">
              <div className="contact-form__group">
                <label htmlFor="name" className="contact-form__label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="contact-form__input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="contact-form__group">
                <label htmlFor="email" className="contact-form__label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="contact-form__input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="contact-form__group">
              <label htmlFor="subject" className="contact-form__label">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="contact-form__input"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form__group">
              <label htmlFor="message" className="contact-form__label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="contact-form__textarea"
                placeholder="Tell me about your project..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="contact-form__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <span>Sending…</span>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            {status === "success" && (
              <p className="contact-form__feedback contact-form__feedback--success">
                {feedback}
              </p>
            )}
            {status === "error" && (
              <p className="contact-form__feedback contact-form__feedback--error">
                {feedback}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

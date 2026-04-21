import { useRef, useState } from "react";
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
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const contactInfo = [
  {
    icon: faEnvelope,
    label: "Email",
    value: "hello@yourname.com",
    href: "mailto:hello@yourname.com",
  },
  {
    icon: faPhone,
    label: "Phone",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
  },
  {
    icon: faLocationDot,
    label: "Location",
    value: "Your City, Country",
    href: null,
  },
];

const socials = [
  { icon: faGithub, label: "GitHub", href: "https://github.com" },
  { icon: faLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: faTwitter, label: "Twitter", href: "https://twitter.com" },
];

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const formRef = useRef(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    // Replace this with your actual form submission logic (e.g. EmailJS, Formspree)
    setTimeout(() => {
      setStatus("success");
      setForm(INITIAL_FORM);
    }, 1500);
  }

  return (
    <section className="contact-section">
      <div className="contact-header">
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
                    <a href={item.href} className="contact-info__value">
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
                <FontAwesomeIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Right – form */}
        <form
          ref={formRef}
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
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
              Message sent! I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="contact-form__feedback contact-form__feedback--error">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

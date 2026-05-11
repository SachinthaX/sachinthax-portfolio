import "./App.css";
import profilePhoto from "./assets/profile-photo.jpeg";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  ArrowRight,
  Brain,
  Cloud,
  Code2,
  Database,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const projects = [
  {
    title: "Mushroom Cultivation App",
    subtitle: "AI-enabled smart agriculture mobile app",
    description:
      "Built a full-stack environment monitoring subsystem with predictive temperature and humidity forecasting, plus AI-driven corrective recommendations based on real-time environmental data.",
    tech: [
      "React Native",
      "FastAPI",
      "PostgreSQL",
      "Scikit-Learn",
      "TensorFlow",
      "Groq API",
    ],
  },
  {
    title: "CookMate",
    subtitle: "Culinary learning platform",
    description:
      "Developed a scalable full-stack web application with structured learning plans, user networking, chatbot assistance, and secure JWT/OAuth2 authentication.",
    tech: ["Java Spring Boot", "React.js", "MongoDB", "JWT", "OAuth2"],
  },
  {
    title: "EventEase",
    subtitle: "Event management platform",
    description:
      "Designed the user management and authentication architecture for a MERN platform with email verification, password recovery, and Google OAuth integration.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
  },
  {
    title: "Inspired Tech",
    subtitle: "E-commerce platform",
    description:
      "Led frontend development for a dynamic shopping cart system with Redux state management, persistent browser storage, and accurate tax and shipping calculations.",
    tech: ["React.js", "Redux Toolkit", "Bootstrap", "LocalStorage"],
  },
];

const skillGroups = [
  {
    title: "Programming Languages",
    icon: Code2,
    items: ["Java", "Python", "JavaScript", "Kotlin", "C/C++", "PHP"],
  },
  {
    title: "Frontend & Mobile",
    icon: Smartphone,
    items: [
      "React.js",
      "React Native",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Redux Toolkit",
    ],
  },
  {
    title: "Backend & APIs",
    icon: Database,
    items: [
      "Node.js",
      "Express.js",
      "Java Spring Boot",
      "FastAPI",
      "REST APIs",
      "JWT",
      "OAuth2",
    ],
  },
  {
    title: "Databases, AI & Cloud",
    icon: Brain,
    items: [
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "SQLite",
      "Scikit-Learn",
      "TensorFlow",
      "Groq API",
      "AWS",
    ],
  },
];

const certifications = [
  {
    title: "AWS Academy Graduate – Cloud Web Application Builder",
    meta: "Issued October 2025",
    icon: Cloud,
  },
  {
    title: "CCNA: Introduction to Networks",
    meta: "Cisco Networking Academy",
    icon: ShieldCheck,
  },
];

const education = [
  {
    title: "BSc (Hons) in Information Technology",
    place: "Sri Lanka Institute of Information Technology",
    period: "2022 – Present",
  },
  {
    title: "G.C.E. Advanced Level – Physical Science",
    place: "President's College, Minuwangoda",
    period: "2020",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: {
        offset: 92,
      },
      duration: 1.15,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="page">
      <div className="aurora-background">
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="aurora aurora-three" />
      </div>

      <div className="background-noise" />

      <header className="navbar">
        <div className="container nav-inner">
          <a href="#home" className="brand" onClick={closeMenu}>
            <span>NS</span>
            Nipuna Sachintha
          </a>

          <nav
            id="main-navigation"
            className={`nav-links ${menuOpen ? "open" : ""}`}
          >
            <a href="#about" onClick={closeMenu}>
              About
            </a>
            <a href="#projects" onClick={closeMenu}>
              Projects
            </a>
            <a href="#skills" onClick={closeMenu}>
              Skills
            </a>
            <a href="#education" onClick={closeMenu}>
              Education
            </a>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <div className="nav-actions">
            <a
              href="https://github.com/SachinthaX"
              target="_blank"
              rel="noreferrer"
              className="nav-button"
            >
              <FaGithub />
              GitHub
            </a>

            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <section id="home" className="hero section-shell">
        <div className="container hero-grid">
          <div className="hero-content reveal">
            <p className="eyebrow">SOFTWARE ENGINEER</p>

            <h1>
              Building scalable web, mobile, and AI-enabled software solutions.
            </h1>

            <p className="hero-description">
              I am <strong>Nipuna Sachintha</strong>, a fourth-year Information
              Technology undergraduate at SLIIT focused on full-stack
              development, secure backend systems, mobile applications, and
              intelligent software.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="button primary-button">
                View Projects
                <ArrowRight size={18} />
              </a>

              <a
                href="/Nipuna-Sachintha-SE.pdf"
                className="button secondary-button"
                download
              >
                <Download size={18} />
                Download CV
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>Full-Stack</strong>
                <span>Web & Mobile</span>
              </div>

              <div>
                <strong>AI + Cloud</strong>
                <span>Practical Solutions</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="photo-card">
              <div className="photo-frame">
                <img
                  src={profilePhoto}
                  alt="Nipuna Sachintha"
                  className="profile-photo"
                />
              </div>

              <div className="floating-card top-card">
                <span>Current Focus</span>
                <strong>Full-Stack Engineering</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell about-section">
        <div className="container about-grid">
          <div className="section-heading reveal">
            <p>ABOUT ME</p>
            <h2>Developer with a practical, problem-solving mindset.</h2>
          </div>

          <div className="about-content reveal">
            <p>
              I enjoy building software that is not only functional, but also
              reliable, secure, and useful to real users. My work spans
              full-stack web development, cross-platform mobile development,
              backend architecture, database systems, and machine learning
              integration.
            </p>

            <p>
              I have worked with technologies such as React.js, React Native,
              Node.js, Java Spring Boot, FastAPI, PostgreSQL, MongoDB, and
              TensorFlow. I am especially interested in creating systems where
              good engineering meets real-world impact.
            </p>

            <p>
              My current goal is to begin my career as a software engineer where
              I can contribute to meaningful products, strengthen my system
              design skills, and continue growing into a well-rounded
              professional.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="section-shell muted-section">
        <div className="container">
          <div className="section-heading centered reveal">
            <p>PROJECTS</p>
            <h2>Selected work</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.title}>
                <span className="project-subtitle">{project.subtitle}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="chip-row">
                  {project.tech.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="section-shell">
        <div className="container">
          <div className="section-heading centered reveal">
            <p>SKILLS</p>
            <h2>Technical toolkit</h2>
          </div>

          <div className="skills-grid">
            {skillGroups.map(({ title, icon: Icon, items }) => (
              <article className="skill-card reveal" key={title}>
                <div className="skill-icon">
                  <Icon size={22} />
                </div>

                <h3>{title}</h3>

                <div className="chip-row">
                  {items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="section-shell muted-section">
        <div className="container split-grid">
          <div>
            <div className="section-heading reveal">
              <p>EDUCATION</p>
              <h2>Academic background</h2>
            </div>

            <div className="timeline">
              {education.map((item) => (
                <article className="timeline-item reveal" key={item.title}>
                  <span>
                    <GraduationCap size={18} />
                  </span>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.place}</p>
                    <small>{item.period}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <div className="section-heading reveal">
              <p>CERTIFICATIONS</p>
              <h2>Continuous learning</h2>
            </div>

            <div className="certification-list">
              {certifications.map(({ title, meta, icon: Icon }) => (
                <article className="certification-card reveal" key={title}>
                  <div className="certification-icon">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3>{title}</h3>
                    <p>{meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell">
        <div className="container">
          <div className="contact-card reveal">
            <div>
              <p>CONTACT</p>
              <h2>Let’s build something useful.</h2>
              <span>
                Open to software engineering internships, entry-level roles,
                and collaborative projects.
              </span>
            </div>

            <div className="contact-links">
              <a href="mailto:nipunasachintha77@gmail.com">
                <Mail size={18} />
                nipunasachintha77@gmail.com
              </a>

              <a
                href="https://github.com/SachinthaX"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
                github.com/SachinthaX
              </a>

              <a
                href="https://www.linkedin.com/in/h-n-sachintha"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn />
                linkedin.com/in/h-n-sachintha
              </a>

              <span>
                <MapPin size={18} />
                Gampaha, Sri Lanka
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Nipuna Sachintha. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

function MetaPixelTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
}

function ThankYouPage() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "6rem 2rem", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "2rem" }}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--primary-color)" }}>Thank You For Your Response!</h1>
      <p style={{ fontSize: "1.2rem", color: "#555", maxWidth: "600px", marginBottom: "2.5rem" }}>
        Your enquiry has been successfully submitted. Our team will review your information and get back to you shortly.
      </p>
      <button className="btn btn-primary" onClick={() => navigate("/")} style={{ fontSize: "1.1rem", padding: "0.75rem 2rem" }}>
        Back to Home
      </button>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap">
        <div className="topbar-links">
          <a href="/#courses">Courses</a>
          <a href="/#resources">Learning resources</a>
          <a href="/#about">About us</a>
          <a href="/#agents">Agents</a>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function LogoBanner() {
  return (
    <div
      className="logo-banner"
      aria-label="Birkbeck University of London logo"
    >
      <div className="wrap logo-wrap">
        <BrandLogo variant="banner" />
      </div>
    </div>
  );
}

function BrandLogo({ variant = "header" }) {
  const isBanner = variant === "banner";

  return (
    <img
      className={isBanner ? "brand-logo brand-logo-banner" : "brand-logo"}
      src="/birkbeck-logo.svg"
      alt="Birkbeck University of London logo"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = ["Courses", "About", "Campus", "Apply", "FAQ"];

  return (
    <header className="site-header">
      <div className="wrap header-wrap">
        <a href="/" className="brand" aria-label="Birkbeck home">
          <img
            className="site-brand-logo"
            src="/birkbeck-logo.svg"
            alt="Birkbeck University of London Bengaluru India"
          />
        </a>

        <nav className="primary-nav" aria-label="Main navigation">
          <a href="/#contact" className="primary-cta">
            Apply now
          </a>
        </nav>
        {/* 
        <button
          className="menu-btn"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button> */}
      </div>

      {open && (
        <div className="mobile-nav wrap">
          {links.map((link) => (
            <a
              key={link}
              href={`/#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <a href="/#contact" onClick={() => setOpen(false)}>
            Apply now
          </a>
        </div>
      )}
    </header>
  );
}

// eslint-disable-next-line no-unused-vars
const GAS_URL =
  "https://script.google.com/macros/s/AKfycbyEWd9zU0Trq1t5CODLazI6xUltG7zH_0DsKerFPDuJXPAMiL9NlR6fCzM1XlHTF-0p/exec";

function Hero() {
  const navigate = useNavigate();
  const [submitState, setSubmitState] = useState({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const pairs = [];

    for (const [key, value] of formData.entries()) {
      pairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
      );
    }

    setSubmitState({ type: "loading", message: "Submitting your enquiry..." });

    try {
      // Use 'no-cors' to prevent the browser from blocking the Google Apps Script redirect
      await fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: pairs.join("&"),
      });

      // With 'no-cors', the response is opaque and we can't read it.
      // If the fetch resolves without throwing a network error, we assume success.
      form.reset();
      setSubmitState({
        type: "idle",
        message: "",
      });
      navigate("/thank-you");
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitState({
        type: "error",
        message:
          "Failed to submit the form. Please check your internet connection and try again.",
      });
    }
  };

  return (
    <section className="hero-section" id="top">
      <div className="hero-bg" />
      <div className="wrap hero-grid">
        <div className="hero-visual">
          <div className="hero-copy">
            <h1>
              GRADUATE GLOBALLY.
              <br />
              STUDY LOCALLY.
            </h1>
            <div className="subtitle">For students with global ambition</div>
            <p className="hero-intro">
              Earn a University of London degree with Birkbeck, while studying
              in Bengaluru.
            </p>
          </div>

          <div className="hero-video-card">
            <iframe
              src="https://www.youtube.com/embed/KPtUVIHuIfw?rel=0&modestbranding=1"
              title="Birkbeck student story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="hero-form-card">
          {submitState.type === "success" ? (
            <div className="success-message-card" style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 style={{ marginBottom: "1rem" }}>Thank You For Your Response!</h3>
              <p style={{ marginBottom: "2rem" }}>Our team will contact you shortly.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => setSubmitState({ type: "idle", message: "" })}
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <>
              <h3>Book a School Visit</h3>
              <p>Fill out the form below and our counsellor will contact you.</p>

              <form className="lead-form" onSubmit={handleSubmit}>
                <div className="field-row">
                  <label>
                    Full name
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your name"
                      required
                    />
                  </label>
                </div>

                <div className="field-row two-col-form">
                  <label>
                    Email
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </label>
                  <label>
                    Phone
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone"
                      required
                    />
                  </label>
                </div>

                <div className="field-row">
                  <label>
                    Address
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your city or address"
                      required
                    />
                  </label>
                </div>

                <div className="field-row">
                  <label>
                    Course of interest
                    <select name="course" required>
                      <option value="">Select a course</option>
                      <option>BSc (Hons) Business Management</option>
                      <option>BSc (Hons) Business Analytics</option>
                      <option>
                        BSc (Hons) Business Management (International Business)
                      </option>
                      <option>MSc International Business Management</option>
                      <option>MSc Business Analytics</option>
                    </select>
                  </label>
                </div>

                <div className="field-row">
                  <label>
                    Message
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Tell us what you want to know"
                    />
                  </label>
                </div>

                <button type="submit" className="btn btn-primary form-submit" disabled={submitState.type === "loading"}>
                  {submitState.type === "loading" ? "Submitting..." : "Submit enquiry"}
                </button>
                {submitState.type !== "idle" && submitState.type !== "success" && submitState.message && (
                  <p
                    className={`form-status ${submitState.type}`}
                    role="status"
                    aria-live="polite"
                  >
                    {submitState.message}
                  </p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function RankingStrip() {
  const items = [
    "TIME Magazine World’s Top Universities 2026, 247th",
    "Times Higher Education (THE) World University Rankings 2026, 301-350th",
    "QS World University Rankings 2027, 354th",
  ];

  return (
    <section className="ranking-section">
      <div className="wrap">
        <h2>Consistently ranked in the top 400 globally</h2>
        <div className="ranking-grid">
          {items.map((item) => (
            <div className="ranking-item" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UniversityDegree() {
  return (
    <section className="info-section" id="about">
      <div className="wrap two-col">
        <div>
          <span className="section-kicker">A University of London degree</span>
          <h2>
            Graduate with a qualification awarded by the University of London.
          </h2>
        </div>
        <div>
          <p>
            Students benefit from global academic standards that ensure their
            education meets internationally recognised benchmarks. The
            curriculum is research-informed, combining academic insight with
            practical relevance for modern business environments.
          </p>
        </div>
      </div>
    </section>
  );
}

function BusinessSection() {
  return (
    <section className="business-section">
      <div className="wrap">
        <div className="section-head center">
          <span className="section-kicker">Study where business happens</span>
          <h2>
            Bengaluru is home to one of the world’s fastest-growing technology
            and business ecosystems.
          </h2>
        </div>
        <div className="business-grid">
          <div className="business-card highlight">
            <strong>Global business hub</strong>
            <p>
              Global companies operate here across technology, consulting,
              finance and digital industries.
            </p>
          </div>
          <div className="business-card">
            <strong>Real-world learning</strong>
            <p>
              Studying here means learning business inside a live innovation
              economy.
            </p>
          </div>
          <div className="business-card">
            <strong>Career exposure</strong>
            <p>
              Students gain immediate understanding of the market forces shaping
              modern organisations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCards() {
  const features = [
    {
      title: "Local private university",
      text: "A strong local support network with a global university standard.",
    },
    {
      title: "Study abroad",
      text: "Learn in India while earning a degree recognised across the world.",
    },
    {
      title: "Birkbeck Bengaluru",
      text: "A global education experience shaped by the London campus legacy.",
    },
    {
      title: "Top 400 globally ranked degree",
      text: "A qualification connected to a globally recognised university ecosystem.",
    },
  ];

  return (
    <section className="feature-section" id="courses">
      <div className="wrap">
        <div className="section-head center">
          <span className="section-kicker">Why Birkbeck Bengaluru?</span>
          <h2>Built for students with global ambition.</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <div className="feature-icon">✦</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const skillList = [
    "Critical thinking and analysis",
    "Problem solving",
    "Communication and presentation",
    "Collaboration and teamwork",
    "Strategic thinking",
    "Data analysis",
  ];

  return (
    <section className="skills-section">
      <div className="wrap">
        <div className="two-col skills-layout">
          <div>
            <span className="section-kicker">
              Degrees designed for global employers
            </span>
            <h2>
              Birkbeck programmes combine academic rigour with practical
              business knowledge.
            </h2>
          </div>
          <div>
            <p>
              Students develop the capabilities valued by global employers,
              including strategic thinking, analytical insight and a clear
              understanding of international business environments.
            </p>
            <div className="skill-list">
              {skillList.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobalCareer() {
  return (
    <section className="global-section">
      <div className="wrap two-col align-center">
        <div>
          <span className="section-kicker">A degree that travels with you</span>
          <h2>
            A University of London degree opens opportunities in India and
            beyond.
          </h2>
        </div>
        <div>
          <p>
            Graduates may pursue further study internationally or build careers
            in organisations operating across global markets. Birkbeck graduates
            become part of a worldwide network of over 100,000 alumni.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProgramCards() {
  const undergraduate = [
    {
      title: "BSc (Hons) Business Management",
      copy: "Develop leadership capability and strategic thinking for modern organisations.",
    },
    {
      title: "BSc (Hons) Business Analytics",
      copy: "Build analytical and data skills for decision-making in today’s digital economy.",
    },
    {
      title: "BSc (Hons) Business Management (International Business)",
      copy: "Understand how organisations operate across global markets and international supply chains.",
    },
  ];

  const postgraduate = [
    {
      title: "MSc International Business Management",
      copy: "Develop expertise in global strategy, leadership and international markets.",
    },
    {
      title: "MSc Business Analytics",
      copy: "Advance your skills in data science, predictive analytics and business intelligence.",
    },
  ];

  return (
    <section className="programme-section">
      <div className="wrap">
        <div className="section-head center">
          <span className="section-kicker">
            Preparing graduates for global careers
          </span>
          <h2>
            Study pathways designed for the next generation of global leaders.
          </h2>
        </div>

        <div className="programme-block">
          <h3>Undergraduate</h3>
          <div className="programme-grid">
            {undergraduate.map((course) => (
              <article className="programme-card" key={course.title}>
                <h4>{course.title}</h4>
                <p>{course.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="programme-block">
          <h3>Postgraduate</h3>
          <div className="programme-grid">
            {postgraduate.map((course) => (
              <article className="programme-card" key={course.title}>
                <h4>{course.title}</h4>
                <p>{course.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepSection() {
  const steps = [
    {
      title: "Speak with an advisor",
      text: "Discuss your goals and find the right degree.",
    },
    {
      title: "Submit your application",
      text: "Complete your application with required documents.",
    },
    {
      title: "Receive your offer",
      text: "Get the outcome on your application.",
    },
    {
      title: "Accept your offer",
      text: "Respond with your acceptance and begin your journey.",
    },
  ];

  return (
    <section className="steps-section" id="apply">
      <div className="wrap">
        <div className="section-head center">
          <span className="section-kicker">How to apply</span>
          <h2>Start your global business journey.</h2>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step-card" key={step.title}>
              <span className="step-num">Step {index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        <div className="apply-banner">
          <div>
            <h3>
              Launch your global career by beginning your degree in Bengaluru.
            </h3>
          </div>
          <div className="cta-row">
            <a href="#contact" className="btn btn-primary">
              Apply now
            </a>
            {/* <a href="#contact" className="btn btn-secondary light">
              Contact us
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function CampusSection() {
  return (
    <section className="campus-section" id="campus">
      <div className="wrap campus-layout">
        <div className="campus-info">
          <span className="section-kicker">Bengaluru campus</span>
          <h2>Our campus is located in Whitefield, Bengaluru.</h2>
          <p>
            One of India’s most dynamic business corridors, where multinational
            companies, global capability centres and innovation converge.
          </p>
          <ul>
            <li>Study in a live business ecosystem</li>
            <li>Access a growing employment market</li>
            <li>Learn where global business is happening</li>
          </ul>
          <a href="#contact" className="link-btn">
            Book a campus tour
          </a>
        </div>

        <div className="campus-card-large">
          <div className="campus-photo" />
          <div className="campus-address">
            <p>5th Floor, Akash Block</p>
            <p>Sattva Tech Park</p>
            <p>Pattandur Agrahara, Whitefield</p>
            <p>Bengaluru, Karnataka – 560066, India</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const navigate = useNavigate();
  const [submitState, setSubmitState] = useState({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const pairs = [];
    for (const [key, value] of formData.entries()) {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }

    setSubmitState({ type: "loading", message: "Submitting your enquiry..." });

    try {
      await fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: pairs.join("&"),
      });

      form.reset();
      setSubmitState({ type: "idle", message: "" });
      navigate("/thank-you");
    } catch (error) {
      console.error("Form submission failed:", error);
      setSubmitState({
        type: "error",
        message: "Failed to submit the form. Please check your internet connection and try again.",
      });
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="wrap contact-layout">
        <div className="contact-form-panel">
          <h3>Book a School Visit</h3>
          <p>Fill out the form below and our counsellor will contact you.</p>

          <form
            className="lead-form"
            onSubmit={handleSubmit}
          >
            <div className="field-row">
              <label>
                Full name
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your name"
                />
              </label>
            </div>

            <div className="field-row two-col-form">
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" placeholder="Enter your phone" />
              </label>
            </div>

            <div className="field-row">
              <label>
                Address
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your city or address"
                />
              </label>
            </div>

            <div className="field-row">
              <label>
                Course of interest
                <select name="course">
                  <option value="">Select a course</option>
                  <option>BSc (Hons) Business Management</option>
                  <option>BSc (Hons) Business Analytics</option>
                  <option>
                    BSc (Hons) Business Management (International Business)
                  </option>
                  <option>MSc International Business Management</option>
                  <option>MSc Business Analytics</option>
                </select>
              </label>
            </div>

            <div className="field-row">
              <label>
                Message
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell us what you want to know"
                />
              </label>
            </div>

            <button type="submit" className="btn btn-primary form-submit" disabled={submitState.type === "loading"}>
              {submitState.type === "loading" ? "Submitting..." : "Submit enquiry"}
            </button>
            {submitState.type === "error" && (
              <p className="form-status error" role="status" aria-live="polite" style={{ marginTop: "1rem" }}>
                {submitState.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand-wrap">
          <div className="brand footer-brand">
            <img
              className="site-brand-logo"
              src="/birkbeck-logo.svg"
              alt="Birkbeck University of London Bengaluru India"
            />
          </div>
          <p className="footer-copy">
            Birkbeck University of London - Bengaluru receives Letter of
            Approval from the University Grants Commission, India.
          </p>
        </div>

        <div className="footer-campus">
          <h4>Campus</h4>
          <p>5th Floor, Akash Block</p>
          <p>Sattva Tech Park</p>
          <p>Whitefield, Bengaluru</p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Birkbeck. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <MetaPixelTracker />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <RankingStrip />
              <UniversityDegree />
              <BusinessSection />
              <FeatureCards />
              <SkillsSection />
              <GlobalCareer />
              <ProgramCards />
              <StepSection />
              <CampusSection />
              <ContactSection />
            </>
          } />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

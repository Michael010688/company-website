import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import "./App.css";

// --- Modal ---
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modalOverlay" onMouseDown={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalTop">
          <div className="modalTitle">{title}</div>
          <button className="iconBtn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Modals
  const [historyOpen, setHistoryOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(null);       // "qin" | "xie" | null
  const [partnerOpen, setPartnerOpen] = useState(null); // "p1"... | null

  const navItems = useMemo(
    () => [
      ["about", "About"],
      ["solutions", "Solutions"],
      ["news", "News"],
      ["partners", "Partners"],
      ["team", "Team"],
      ["contact", "Contact"],
    ],
    []
  );

  const sections = useMemo(() => ["home", "about", "solutions", "news", "partners", "team", "contact"], []);

  // --- Hero slides ---
  const heroSlides = useMemo(
    () => [
      {
        tag: "Support • Improvement",
        title: "Deliver. Maintain. Improve.",
        desc: "From planning to delivery and continuous improvement — our process keeps systems stable, secure, and ready for change.",
      },
      {
        tag: "Build • Scale • Secure",
        title: "Reliable Digital Solutions",
        desc: "We help organizations deliver scalable systems with clean structure, strong UI, and maintainable code.",
      },
      {
        tag: "UI • Docs • Support",
        title: "Clear. Professional. Practical.",
        desc: "A corporate-style homepage focused on clarity, contrast, and a clean layout suitable for presentation.",
      },
    ],
    []
  );

  const [slideIdx, setSlideIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlideIdx((s) => (s + 1) % heroSlides.length), 4500);
    return () => clearInterval(t);
  }, [heroSlides.length]);

  // --- Stats ---
  const [stats, setStats] = useState({ projects: 0, uptime: 0, clients: 0, response: 0 });
  useEffect(() => {
    const target = { projects: 18, uptime: 99.9, clients: 12, response: 24 };
    const start = performance.now();
    const dur = 900;

    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);

      setStats({
        projects: Math.round(target.projects * e),
        uptime: +(target.uptime * e).toFixed(1),
        clients: Math.round(target.clients * e),
        response: Math.round(target.response * e),
      });

      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // --- News ---
  const newsItems = useMemo(
    () => [
      { badge: "Update", title: "Corporate website prototype released", desc: "A React + Vite corporate homepage with anchor navigation is now ready." },
      { badge: "UI", title: "Improved readability and contrast", desc: "Better text contrast, clearer cards, and more “company homepage” feel for presentation." },
      { badge: "Team", title: "Team profiles with photos", desc: "Added member photos and role descriptions to match the assignment requirement." },
    ],
    []
  );

  const [newsIdx, setNewsIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setNewsIdx((n) => (n + 1) % newsItems.length), 4000);
    return () => clearInterval(t);
  }, [newsItems.length]);

  // --- Partners clickable cards ---
  const partnerItems = useMemo(
    () => [
      {
        id: "p1",
        name: "Penang Tech Hub",
        role: "Industry Network Partner",
        desc: "Supports local collaborations, tech sharing, and startup connections for practical project delivery.",
        more: ["Joint demo events and showcase opportunities", "Mentorship and industry feedback", "Connections to local SMEs and tech community"],
      },
      {
        id: "p2",
        name: "MY Digital Business",
        role: "Digital Enablement Partner",
        desc: "Helps align solutions with digital transformation goals and business readiness for organizations.",
        more: ["Business process improvement ideas", "Digital adoption guidance", "Documentation and governance support"],
      },
      {
        id: "p3",
        name: "Cloud Services Partner",
        role: "Infrastructure Partner",
        desc: "Provides cloud hosting practices and deployment support for scalable web applications.",
        more: ["Deployment best practices", "Security baseline suggestions", "Scalability and monitoring advice"],
      },
      {
        id: "p4",
        name: "UI/UX Studio",
        role: "Design Partner",
        desc: "Ensures consistent visual standards and user-friendly interface experience.",
        more: ["UI consistency checks", "Layout and hierarchy improvements", "Responsive and accessibility suggestions"],
      },
      {
        id: "p5",
        name: "System Integrator",
        role: "Integration Partner",
        desc: "Supports system connections and integration planning for business workflows.",
        more: ["API integration planning", "System compatibility checks", "Data flow documentation support"],
      },
      {
        id: "p6",
        name: "Enterprise Client",
        role: "Pilot Client",
        desc: "Provides realistic requirements and feedback for improving delivery quality.",
        more: ["Requirement refinement", "Acceptance feedback for UI/flow", "Continuous improvement suggestions"],
      },
    ],
    []
  );

  // --- Team ---
  const teamMembers = useMemo(
    () => [
      {
        id: "qin",
        name: "Qin Shuozhe",
        role: "Frontend Developer",
        photo: "images/qin.jpg",
        short: "Built the UI layout, navigation, and page sections using React, focusing on a corporate homepage style.",
        modalTitle: "Qin Shuozhe — Frontend Developer",
        modalPara:
          "Responsible for building the React UI and overall corporate homepage layout. Focused on navigation, section structure, responsive styling, and improving readability/contrast for presentation.",
        modalList: [
          "Designed page sections (Hero, About, Solutions, News, Partners, Team, Contact)",
          "Implemented responsive layout and UI components",
          "Improved visual hierarchy, spacing, and contrast",
        ],
      },
      {
        id: "xie",
        name: "Xie Zhaopeng",
        role: "Backend / Documentation",
        photo: "images/xie.jpg",
        short: "Prepared documentation and supported content structure, ensuring clarity and completeness for submission.",
        modalTitle: "Xie Zhaopeng — Backend / Documentation",
        modalPara:
          "Responsible for documentation and content organization to ensure the website matches requirements. Helped structure sections, prepared descriptions, and supported final submission readiness.",
        modalList: [
          "Prepared and refined content for each section",
          "Ensured role descriptions and team info meet requirements",
          "Supported project organization and checklist",
        ],
      },
    ],
    []
  );

  // --- goTo ---
  const goTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // --- Scroll spy + header + back-to-top (rAF throttle) ---
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setShowTop(y > 600);

      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 140) current = id;
      }
      setActive(current);

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  // --- Reveal animations ---
  const revealRef = useRef([]);
  useEffect(() => {
    const els = revealRef.current.filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("isVisible");
        }
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const slide = heroSlides[slideIdx];

  return (
    <div className="app">
      {/* Header */}
      <header className={`header ${scrolled ? "headerScrolled" : ""}`}>
        <div className="headerInner">
          <div
            className="brand"
            onClick={() => goTo("home")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") goTo("home");
            }}
          >
            <div className="brandMark">ABC</div>
            <div className="brandText">
              <div className="brandName">ABC Technology</div>
              <div className="brandSub">Digital Solutions • Penang, Malaysia</div>
            </div>
          </div>

          <nav className="navDesktop">
            {navItems.map(([id, label]) => (
              <button key={id} className={`navLink ${active === id ? "navActive" : ""}`} onClick={() => goTo(id)}>
                {label}
              </button>
            ))}
            <button className="pillBtn" onClick={() => goTo("contact")}>
              Get in Touch
            </button>
          </nav>

          <button className="burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`navMobileWrap ${menuOpen ? "open" : ""}`}>
          <div className="navMobile">
            {navItems.map(([id, label]) => (
              <button key={id} className={`navMobileLink ${active === id ? "navActive" : ""}`} onClick={() => goTo(id)}>
                {label}
              </button>
            ))}
            <button className="pillBtn full" onClick={() => goTo("contact")}>
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="heroOverlay" />
        <div className="heroInner">
          <div className="heroLeft">
            <div className="tag">{slide.tag}</div>
            <h1 className="heroTitle">{slide.title}</h1>
            <p className="heroDesc">{slide.desc}</p>

            <div className="heroBtns">
              <button className="primaryBtn" onClick={() => goTo("partners")}>
                Partners
              </button>
              <button className="ghostBtn" onClick={() => goTo("contact")}>
                Contact
              </button>
            </div>

            <div className="featureRow">
              <div className="miniCard">
                <div className="miniTitle">Enterprise-ready</div>
                <div className="miniDesc">Clean structure, scalable modules, and readable documentation.</div>
              </div>
              <div className="miniCard">
                <div className="miniTitle">User-focused UI</div>
                <div className="miniDesc">Clear layout, strong hierarchy, and responsive design.</div>
              </div>
              <div className="miniCard">
                <div className="miniTitle">Support mindset</div>
                <div className="miniDesc">Maintenance planning, bug fixing, and stability improvements.</div>
              </div>
            </div>
          </div>

          <div className="heroRight">
            <div className="quickCard">
              <div className="quickTitle">Quick Highlights</div>
              <ul className="quickList">
                <li>Modern corporate homepage layout</li>
                <li>Section navigation (anchor scroll)</li>
                <li>Team photos + role descriptions</li>
                <li>More dynamic UI interactions</li>
              </ul>

              <div className="statsGrid">
                <div className="statBox">
                  <div className="statNum">{stats.projects}+</div>
                  <div className="statLabel">Prototype Modules</div>
                </div>
                <div className="statBox">
                  <div className="statNum">{stats.uptime}%</div>
                  <div className="statLabel">Target Uptime</div>
                </div>
                <div className="statBox">
                  <div className="statNum">{stats.clients}+</div>
                  <div className="statLabel">Mock Clients</div>
                </div>
                <div className="statBox">
                  <div className="statNum">{stats.response}h</div>
                  <div className="statLabel">Support Response</div>
                </div>
              </div>

              <button className="secondaryBtn" onClick={() => goTo("about")}>
                Explore Company
              </button>

              <div className="dots">
                {heroSlides.map((_, i) => (
                  <button key={i} className={`dot ${i === slideIdx ? "on" : ""}`} onClick={() => setSlideIdx(i)} aria-label={`Slide ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section" ref={(el) => (revealRef.current[0] = el)}>
        <div className="container">
          <div className="sectionHead">
            <h2>About Us</h2>
            <p className="muted">We deliver practical, maintainable solutions and prioritize clarity in communication and documentation.</p>
          </div>

          <div className="grid3">
            <div className="card">
              <div className="cardTitle">Mission</div>
              <div className="cardText">Help organizations improve efficiency with modern web technologies and clean engineering practices.</div>
            </div>
            <div className="card">
              <div className="cardTitle">Vision</div>
              <div className="cardText">Become a trusted technology partner delivering reliable and scalable digital products.</div>
            </div>
            <div className="card">
              <div className="cardTitle">Values</div>
              <div className="cardText">Quality • Transparency • Support • Continuous Improvement</div>
            </div>
          </div>

          <div className="historyRow">
            <div className="historyCard">
              <div className="historyTitle">Company History</div>
              <div className="historyText">
                ABC Technology Sdn. Bhd. started as a small digital solutions team in Penang, Malaysia, focusing on practical
                web applications for local businesses. Over time, the company strengthened its process around clean structure,
                readable documentation, and maintainable delivery.
              </div>
            </div>
            <button className="readMoreBtn" onClick={() => setHistoryOpen(true)}>Read More</button>
          </div>

          <div className="videoContainer">
            <video className="companyVideo" controls preload="metadata">
              <source src="Company.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="videoCaption">Corporate Introduction • Building the Future</div>
          </div>
        </div>
      </section>

{/* Solutions */}
<section id="solutions" className="section sectionAlt" ref={(el) => (revealRef.current[1] = el)}>
  <div className="container">
    <div className="sectionHead">
      <h2>Solutions</h2>
      <p className="muted">
        Enterprise-grade capabilities — from strategy and architecture to delivery, security, and continuous improvement.
      </p>
    </div>

    <div className="grid3">
      <div className="card">
        <div className="badge">01</div>
        <div className="cardTitle">Web &amp; Platform Engineering</div>
        <div className="cardText">
          Build high-performance web applications with clean architecture, reusable components, and scalable foundations —
          optimized for long-term maintainability and fast iteration.
        </div>
      </div>

      <div className="card">
        <div className="badge">02</div>
        <div className="cardTitle">System Architecture &amp; Solution Design</div>
        <div className="cardText">
          Translate business goals into robust system designs: clear modules, data flows, APIs, and deployment structures —
          reducing risk and ensuring predictable delivery.
        </div>
      </div>

      <div className="card">
        <div className="badge">03</div>
        <div className="cardTitle">Security &amp; Reliability Baseline</div>
        <div className="cardText">
          Establish practical security controls and reliability practices: secure-by-design thinking, access control,
          audit-friendly structure, and monitoring-ready implementation.
        </div>
      </div>

      <div className="card">
        <div className="badge">04</div>
        <div className="cardTitle">UI/UX &amp; Corporate Experience</div>
        <div className="cardText">
          Deliver polished, corporate-grade interfaces with strong hierarchy, accessibility-friendly layout, and responsive
          design — improving trust and user experience across devices.
        </div>
      </div>

      <div className="card">
        <div className="badge">05</div>
        <div className="cardTitle">Documentation &amp; Delivery Enablement</div>
        <div className="cardText">
          Produce clear, structured documentation: requirements, wireframes, architecture notes, API references, and
          handover guides — making teams faster and projects easier to maintain.
        </div>
      </div>

      <div className="card">
        <div className="badge">06</div>
        <div className="cardTitle">Maintenance, Support &amp; Improvement</div>
        <div className="cardText">
          Keep systems stable after launch: issue triage, bug fixes, performance tuning, and continuous improvement cycles —
          so your product stays reliable as requirements evolve.
        </div>
      </div>
    </div>
  </div>
</section>

      {/* News */}
      <section id="news" className="section" ref={(el) => (revealRef.current[2] = el)}>
        <div className="container">
          <div className="sectionHead">
            <h2>News</h2>
            <p className="muted">Latest updates and activities.</p>
          </div>

          <div className="newsRow">
            <div className="newsMain">
              <div className="newsBadge">{newsItems[newsIdx].badge}</div>
              <div className="newsTitle">{newsItems[newsIdx].title}</div>
              <div className="newsDesc">{newsItems[newsIdx].desc}</div>

              <div className="newsControls">
                <button className="iconBtn" onClick={() => setNewsIdx((n) => (n - 1 + newsItems.length) % newsItems.length)} aria-label="Previous">‹</button>
                <div className="newsDots">
                  {newsItems.map((_, i) => (
                    <button key={i} className={`dot ${i === newsIdx ? "on" : ""}`} onClick={() => setNewsIdx(i)} aria-label={`News ${i + 1}`} />
                  ))}
                </div>
                <button className="iconBtn" onClick={() => setNewsIdx((n) => (n + 1) % newsItems.length)} aria-label="Next">›</button>
              </div>
            </div>

            <div className="newsGrid">
              {newsItems.map((it, i) => (
                <div key={i} className={`card newsCard ${i === newsIdx ? "active" : ""}`} onClick={() => setNewsIdx(i)} role="button" tabIndex={0}>
                  <div className="pill">{it.badge}</div>
                  <div className="cardTitle">{it.title}</div>
                  <div className="cardText">{it.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="section sectionAlt" ref={(el) => (revealRef.current[3] = el)}>
        <div className="container">
          <div className="sectionHead">
            <h2>Partners</h2>
            <p className="muted">Click “Read More” to view partner details.</p>
          </div>

          <div className="teamGrid">
            {partnerItems.map((p) => (
              <div className="teamCard" key={p.id}>
                <div className="teamBody">
                  <div className="teamName">{p.name}</div>
                  <div className="teamRole">{p.role}</div>
                  <div className="teamDesc">{p.desc}</div>
                  <button className="readMoreBtn small" onClick={() => setPartnerOpen(p.id)}>Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section" ref={(el) => (revealRef.current[4] = el)}>
        <div className="container">
          <div className="sectionHead">
            <h2>Our Team</h2>
            <p className="muted">Project members and responsibilities.</p>
          </div>

          <div className="teamGrid">
            {teamMembers.map((m) => (
              <div className="teamCard" key={m.id}>
                <img className="teamPhoto" src={m.photo} alt={m.name} />
                <div className="teamBody">
                  <div className="teamName">{m.name}</div>
                  <div className="teamRole">{m.role}</div>
                  <div className="teamDesc">{m.short}</div>
                  <button className="readMoreBtn small" onClick={() => setTeamOpen(m.id)}>Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section sectionAlt" ref={(el) => (revealRef.current[5] = el)}>
        <div className="container">
          <div className="sectionHead">
            <h2>Contact</h2>
            <p className="muted">Feel free to reach out for collaboration or support.</p>
          </div>

          <div className="contactGrid">
            <div className="card">
              <div className="cardTitle">Contact Information</div>
              <div className="kv"><div className="k">Email</div><div className="v">info@abctechnology.com</div></div>
              <div className="kv"><div className="k">Phone</div><div className="v">+60 12-345 6789</div></div>
              <div className="kv"><div className="k">Location</div><div className="v">Penang, Malaysia</div></div>
              <div className="smallMuted">We typically respond within 24 hours.</div>
            </div>

            <div className="card glass">
              <div className="cardTitle">Quick Message</div>
              <div className="smallMuted">Fill in the form below (demo form, no backend required).</div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Message sent (demo).");
                }}
                className="form"
              >
                <input className="input" placeholder="Your name" />
                <input className="input" placeholder="your@email.com" />
                <textarea className="input textarea" placeholder="Write your message..." />
                <button className="primaryBtn full" type="submit">Send Message</button>
              </form>
            </div>
          </div>

          <footer className="footer">
            <div>© 2026 ABC Technology Sdn. Bhd.</div>
            <div className="footerLinks">
              <button onClick={() => goTo("home")}>Home</button>
              <button onClick={() => goTo("about")}>About</button>
              <button onClick={() => goTo("contact")}>Contact</button>
            </div>
          </footer>
        </div>
      </section>

      <button className={`toTop ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
        ↑
      </button>

      {/* Company History Modal */}
      {historyOpen && (
        <Modal title="Company History" onClose={() => setHistoryOpen(false)}>
          <p>
            ABC Technology Sdn. Bhd. started as a small digital solutions team in Penang, Malaysia, focusing on practical
            web applications for local businesses. Over time, the company strengthened its process around clean structure,
            readable documentation, and maintainable delivery.
          </p>
          <p>
            Today, we specialize in building corporate-ready systems — from requirement analysis and UI design to long-term
            maintenance support. Our priority is to deliver reliable results with clear communication throughout the project.
          </p>
          <ul className="modalList">
            <li>2019–2021: Early web prototypes and small business systems</li>
            <li>2022–2024: Focus on maintainability, UI consistency, and documentation</li>
            <li>2025–Present: Corporate-style delivery, support mindset, continuous improvement</li>
          </ul>
        </Modal>
      )}

      {/* Team Modal */}
      {teamOpen && (
        <Modal title={teamMembers.find((x) => x.id === teamOpen)?.modalTitle || "Team"} onClose={() => setTeamOpen(null)}>
          <p>{teamMembers.find((x) => x.id === teamOpen)?.modalPara}</p>
          <ul className="modalList">
            {(teamMembers.find((x) => x.id === teamOpen)?.modalList || []).map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </Modal>
      )}

      {/* Partners Modal */}
      {partnerOpen && (
        <Modal
          title={`${partnerItems.find((x) => x.id === partnerOpen)?.name || "Partner"} — Partner Details`}
          onClose={() => setPartnerOpen(null)}
        >
          <p>{partnerItems.find((x) => x.id === partnerOpen)?.desc}</p>
          <ul className="modalList">
            {(partnerItems.find((x) => x.id === partnerOpen)?.more || []).map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}

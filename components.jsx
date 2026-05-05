// Main portfolio components.
const { useState, useEffect, useRef, useMemo } = React;

// ──────────────────────────────────────────────────────────────────────
// Hooks

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "true");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

// ──────────────────────────────────────────────────────────────────────
// Top chrome

function TopChrome({ lang, setLang, content, scrollP, mode, setMode }) {
  const labels = content.navLabels;
  const items = [
    { id: "work", label: labels.work },
    { id: "method", label: labels.method },
    { id: "experience", label: labels.experience },
    { id: "about", label: labels.about },
    { id: "contact", label: labels.contact },
  ];
  return (
    <header className="kc-top">
      <div className="kc-top-inner">
        <a href="#top" className="kc-mark">
          <span className="kc-mark-script">Kaylee</span>
          <span className="kc-mark-dot">·</span>
          <span className="kc-mark-mono">portfolio / 2026</span>
        </a>
        <nav className="kc-nav">
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="kc-top-right">
          {setMode ? (
            <button
              className="kc-mode-toggle"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              aria-label="toggle light/dark mode"
              title={mode === "dark" ? "Switch to Light mode" : "Switch to Dark mode"}
            >
              <span className={"kc-mode-opt" + (mode === "light" ? " on" : "")} aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
                </svg>
                <span className="kc-mode-lbl">Light</span>
              </span>
              <span className="kc-mode-sep" aria-hidden="true">/</span>
              <span className={"kc-mode-opt" + (mode === "dark" ? " on" : "")} aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span className="kc-mode-lbl">Dark</span>
              </span>
            </button>
          ) : null}
          <button
            className="kc-lang"
            onClick={() => setLang(lang === "en" ? "ko" : "en")}
            aria-label="toggle language"
          >
            <span className={lang === "en" ? "on" : ""}>EN</span>
            <span className="kc-lang-sep">/</span>
            <span className={lang === "ko" ? "on" : ""}>KO</span>
          </button>
        </div>
      </div>
      <div className="kc-progress" style={{ transform: `scaleX(${scrollP})` }} />
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Hero — three layouts: photo / split / minimal

function Hero({ content, layout, accent }) {
  const h = content.hero;
  return (
    <section id="top" className={`kc-hero kc-hero--${layout}`} data-reveal>
      <div className="kc-hero-grid">
        <div className="kc-hero-eyebrow">
          <span className="kc-dot" /> {h.eyebrow}
        </div>

        <h1 className="kc-hero-name">
          <span className="kc-hero-name-first">{h.nameFirst}</span>
          <span className="kc-hero-name-last">{h.nameLast}</span>
          <span className="kc-hero-name-script">{h.nameScript}</span>
        </h1>

        <div className="kc-hero-tagline">
          {h.tagline.map((t, i) => (
            <div key={i} className="kc-hero-tagline-line">
              {t}
            </div>
          ))}
          <div className="kc-hero-tagline-accent">{h.taglineAccent}</div>
        </div>

        <p className="kc-hero-sub">{h.sub}</p>

        <div className="kc-hero-meta">
          {h.meta.map(([k, v], i) => (
            <div key={i} className="kc-hero-meta-item">
              <div className="kc-hero-meta-k">{k}</div>
              <div className="kc-hero-meta-v">{v}</div>
            </div>
          ))}
        </div>

        <div className="kc-hero-cta">
          <a href="#work" className="kc-btn kc-btn--primary">
            {h.cta} <span className="kc-arrow">→</span>
          </a>
          <a href="Kaylee_Oh_CV.pdf" download className="kc-btn kc-btn--ghost">
            {h.cta2}
          </a>
        </div>

        {/* Right-side type composition (replaces photo). */}
        <div className="kc-hero-art">
          <div className="kc-hero-art-card">
            <div className="kc-hero-art-mono">
              <div>
                <span className="kc-hero-art-key">role</span>
                <span className="kc-hero-art-val">image_tutor</span>
              </div>
              <div>
                <span className="kc-hero-art-key">objective</span>
                <span className="kc-hero-art-val">teach_to_see</span>
              </div>
              <div>
                <span className="kc-hero-art-key">since</span>
                <span className="kc-hero-art-val">2023</span>
              </div>
            </div>
            <div className="kc-hero-art-stamp" style={{ color: accent, borderColor: accent }}>
              available
              <br />
              for hire
            </div>
            <div className="kc-hero-art-big" style={{ color: accent }}>
              Image
              <br />
              Tutor
            </div>
            <div className="kc-hero-art-bars">
              <div className="kc-hero-art-bar" style={{ width: "92%", background: accent }}>visual judgment</div>
              <div className="kc-hero-art-bar" style={{ width: "88%" }}>prompt engineering</div>
              <div className="kc-hero-art-bar" style={{ width: "84%" }}>pipeline diagnosis</div>
              <div className="kc-hero-art-bar" style={{ width: "78%" }}>structured feedback</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Marquee

function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="kc-marquee" aria-hidden="true">
      <div className="kc-marquee-track">
        {doubled.map((it, i) => (
          <span key={i} className="kc-marquee-item">
            <span className="kc-marquee-star">✦</span> {it}
          </span>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// About

function About({ content }) {
  const a = content.about;
  return (
    <section id="about" className="kc-section kc-about" data-reveal>
      <div className="kc-section-head">
        <span className="kc-kicker">{a.kicker}</span>
      </div>
      <div className="kc-about-grid">
        <h2 className="kc-section-title">{a.title}</h2>
        <div className="kc-about-body">
          {a.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
      <div className="kc-stats">
        {a.stats.map(([k, v], i) => (
          <div key={i} className="kc-stat" data-reveal style={{ "--d": `${i * 0.05}s` }}>
            <div className="kc-stat-k">{k}</div>
            <div className="kc-stat-v">{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Work / case studies

function CaseCard({ item, accent, density, onOpen }) {
  const Cover = item.cover ? window.Covers[item.cover] : null;
  return (
    <article className={`kc-case kc-case--${density}`} data-reveal onClick={onOpen}>
      <div className="kc-case-cover">
        {item.image ? (
          <img src={item.image} alt={item.title} className="kc-case-img" loading="lazy" />
        ) : Cover ? (
          <Cover accent={accent} />
        ) : null}
        <div className="kc-case-hover" style={{ color: accent }}>
          <span>open case ↗</span>
        </div>
      </div>
      <div className="kc-case-meta">
        <div className="kc-case-tag">
          <span style={{ background: accent }} className="kc-case-tag-dot" />
          {item.tag}
        </div>
        <div className="kc-case-year">{item.year}</div>
      </div>
      <h3 className="kc-case-title">{item.title}</h3>
      <div className="kc-case-where">{item.where}</div>
      <p className="kc-case-summary">{item.summary}</p>
    </article>
  );
}

function CaseModal({ item, onClose, accent, content }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose]);

  if (!item) return null;
  const Cover = item.cover ? window.Covers[item.cover] : null;
  const visitLabel = content === "ko" ? "바로가기" : "Visit";

  return (
    <div className="kc-modal" onClick={onClose}>
      <div className="kc-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="kc-modal-close" onClick={onClose} aria-label="close">
          ✕
        </button>
        <div className="kc-modal-cover">
          {item.image ? (
            <img src={item.image} alt={item.title} className="kc-modal-img" />
          ) : Cover ? (
            <Cover accent={accent} />
          ) : null}
        </div>
        <div className="kc-modal-body">
          <div className="kc-case-meta">
            <div className="kc-case-tag">
              <span style={{ background: accent }} className="kc-case-tag-dot" />
              {item.tag}
            </div>
            <div className="kc-case-year">{item.year}</div>
          </div>
          <h3 className="kc-modal-title">{item.title}</h3>
          <div className="kc-case-where">{item.where}</div>

          <div className="kc-modal-grid">
            <div>
              <div className="kc-modal-h">{content === "ko" ? "문제" : "Problem"}</div>
              <p>{item.problem}</p>
            </div>
            <div>
              <div className="kc-modal-h">{content === "ko" ? "접근" : "Approach"}</div>
              <p>{item.approach}</p>
            </div>
            <div>
              <div className="kc-modal-h">{content === "ko" ? "결과" : "Result"}</div>
              <p>{item.result}</p>
            </div>
          </div>

          <div className="kc-modal-tools">
            {item.tools.map((t, i) => (
              <span key={i} className="kc-chip">
                {t}
              </span>
            ))}
          </div>

          {item.tables && item.tables.length > 0 && (
            <div className="kc-modal-tables">
              {item.tables.map((tbl, ti) => (
                <div key={ti} className="kc-tbl">
                  <div className="kc-tbl-h">{tbl.title}</div>
                  <table>
                    <tbody>
                      {tbl.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={
                                ci === 0
                                  ? "kc-tbl-num"
                                  : row.length === 3 && ci === 1
                                  ? "kc-tbl-stage"
                                  : "kc-tbl-body"
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {item.link && (
            <a
              href={item.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="kc-modal-cta"
              style={{ background: accent, color: "#F4EFE6" }}
            >
              {item.link.label || visitLabel} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Work({ content, accent, density, lang }) {
  const w = content.work;
  const [open, setOpen] = useState(null);
  return (
    <section id="work" className="kc-section kc-work" data-reveal>
      <div className="kc-section-head">
        <span className="kc-kicker">{w.kicker}</span>
        <h2 className="kc-section-title">{w.title}</h2>
        <p className="kc-section-sub">{w.sub}</p>
      </div>
      <div className={`kc-grid kc-grid--${density}`}>
        {w.items.map((it) => (
          <CaseCard key={it.id} item={it} accent={accent} density={density} onOpen={() => setOpen(it)} />
        ))}
      </div>
      <CaseModal item={open} onClose={() => setOpen(null)} accent={accent} content={lang} />
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Method — steps + pipeline diagram

function PipelineDiagram({ diagram, accent }) {
  const [tab, setTab] = useState("illustration");
  const tabs = [
    { id: "illustration", label: diagram.tabs.illustration },
    { id: "cover", label: diagram.tabs.cover },
  ];
  const stages = diagram[tab];

  return (
    <div className="kc-pl">
      <div className="kc-pl-head">
        <div>
          <div className="kc-kicker" style={{ color: accent }}>{diagram.kicker}</div>
          <h3 className="kc-pl-title">{diagram.title}</h3>
          <p className="kc-pl-sub">{diagram.sub}</p>
        </div>
        <div className="kc-pl-tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`kc-pl-tab ${tab === t.id ? "is-active" : ""}`}
              style={tab === t.id ? { background: accent, color: "#F4EFE6", borderColor: accent } : null}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Premises strip */}
      <div className="kc-pl-premises">
        <div className="kc-pl-premises-h">{diagram.premisesLabel}</div>
        <div className="kc-pl-premises-grid">
          {diagram.premises.map((p, i) => (
            <div key={i} className="kc-pl-premise">
              <div className="kc-pl-premise-n" style={{ color: accent, borderColor: accent }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="kc-pl-premise-stat" style={{ color: accent }}>{p.stat}</div>
              <div className="kc-pl-premise-label">{p.label}</div>
              <p className="kc-pl-premise-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stage flow */}
      <div className="kc-pl-flow">
        {stages.map((s, i) => {
          const last = i === stages.length - 1;
          return (
            <React.Fragment key={i}>
              <div
                className={`kc-pl-node kc-pl-node--${s.tool.toLowerCase().replace(/[^a-z]/g, "")}`}
                data-tool={s.tool}
              >
                <div className="kc-pl-node-num" style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className={`kc-pl-node-tool ${s.tool === "LLM" ? "is-llm" : s.tool === "PixAI" || s.tool === "GPT Image" || s.tool === "Image" ? "is-img" : "is-runtime"}`}
                  style={
                    s.tool === "LLM"
                      ? { background: "#0F0E0C", color: "#F4EFE6" }
                      : s.tool === "Runtime" || s.tool === "런타임"
                      ? { background: "transparent", color: accent, borderColor: accent }
                      : { background: accent, color: "#F4EFE6" }
                  }
                >
                  {s.tool}
                </div>
                <div className="kc-pl-node-title">{s.title}</div>
                <p className="kc-pl-node-body">{s.body}</p>
                {s.out && (
                  <div className="kc-pl-node-out">
                    <span className="kc-pl-node-out-arrow" style={{ color: accent }}>→</span>
                    <span className="kc-pl-node-out-label">{s.out}</span>
                  </div>
                )}
              </div>
              {!last && (
                <div className="kc-pl-arrow" aria-hidden="true">
                  <svg viewBox="0 0 60 24" preserveAspectRatio="none">
                    <line x1="0" y1="12" x2="50" y2="12" stroke={accent} strokeWidth="1.5" />
                    <polyline points="44,6 52,12 44,18" fill="none" stroke={accent} strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function BeforeAfter({ rubric, accent }) {
  const [pos, setPos] = useState(50);
  const [showAnno, setShowAnno] = useState(true);
  const ref = useRef(null);
  const dragging = useRef(false);

  const onDown = (e) => {
    dragging.current = true;
    onMove(e);
  };
  const onUp = () => (dragging.current = false);
  const onMove = (e) => {
    if (!dragging.current && e.type !== "click" && e.type !== "mousedown" && e.type !== "touchstart") return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    setPos(Math.max(0, Math.min(100, (x / r.width) * 100)));
  };

  useEffect(() => {
    const up = () => (dragging.current = false);
    const move = (e) => {
      if (!dragging.current) return;
      onMove(e);
    };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
    };
  }, []);

  return (
    <div className="kc-ba">
      <div className="kc-ba-head">
        <div>
          <div className="kc-kicker" style={{ color: accent }}>live demo</div>
          <h3 className="kc-ba-title">{rubric.title}</h3>
          <p className="kc-ba-sub">{rubric.sub}</p>
        </div>
        <button
          className="kc-btn kc-btn--ghost kc-btn--sm"
          onClick={() => setShowAnno((v) => !v)}
        >
          {showAnno ? "Hide annotations" : "Show annotations"}
        </button>
      </div>

      <div
        className="kc-ba-stage"
        ref={ref}
        onMouseDown={onDown}
        onTouchStart={onDown}
        onClick={onMove}
      >
        {/* AFTER (full background) */}
        <div className="kc-ba-img kc-ba-after">
          <BeforeAfterArt variant="after" accent={accent} />
          <div className="kc-ba-tag kc-ba-tag--after">{rubric.after}</div>
        </div>
        {/* BEFORE (clipped) */}
        <div className="kc-ba-img kc-ba-before" style={{ width: `${pos}%` }}>
          <BeforeAfterArt variant="before" accent={accent} />
          <div className="kc-ba-tag kc-ba-tag--before">{rubric.before}</div>
        </div>

        {/* Annotations only on BEFORE */}
        {showAnno &&
          rubric.annotations.map((a, i) => (
            <div
              key={i}
              className="kc-anno"
              style={{
                left: `${a.x}%`,
                top: `${a.y}%`,
                opacity: a.x < pos ? 1 : 0.18,
                "--accent": accent,
              }}
            >
              <span className="kc-anno-pin" style={{ background: accent }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="kc-anno-line" style={{ background: accent }} />
              <span className="kc-anno-label">{a.label}</span>
            </div>
          ))}

        {/* Divider */}
        <div className="kc-ba-divider" style={{ left: `${pos}%`, background: accent }}>
          <div className="kc-ba-handle" style={{ borderColor: accent }}>
            <span style={{ color: accent }}>‹ ›</span>
          </div>
        </div>
      </div>

      <input
        className="kc-ba-range"
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(parseFloat(e.target.value))}
        aria-label="before/after"
      />
    </div>
  );
}

function BeforeAfterArt({ variant, accent }) {
  // Both versions are stylized character portraits in the same composition;
  // BEFORE has visible failure modes, AFTER is corrected.
  const bg = variant === "before" ? "#E8DFD0" : "#F4EFE6";
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <pattern id={`hatch-${variant}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="transparent" />
          <rect width="1" height="6" fill="#0F0E0C" opacity={variant === "before" ? 0.18 : 0.08} />
        </pattern>
      </defs>
      <rect width="800" height="500" fill={bg} />
      <rect width="800" height="500" fill={`url(#hatch-${variant})`} />

      {/* head silhouette */}
      <g>
        {variant === "before" ? (
          // off-balance, sloppier
          <>
            <ellipse cx="380" cy="240" rx="170" ry="190" fill={accent} opacity="0.35" />
            <ellipse cx="380" cy="240" rx="150" ry="170" fill="#0F0E0C" opacity="0.05" />
            {/* misaligned eye line */}
            <rect x="280" y="200" width="80" height="6" fill="#0F0E0C" opacity="0.55" />
            <rect x="400" y="220" width="80" height="6" fill="#0F0E0C" opacity="0.55" />
            {/* broken hand */}
            <path d="M540 320 L600 300 L640 340 L610 360 L580 350 Z" fill="#0F0E0C" opacity="0.25" />
            <path d="M600 300 L640 340" stroke={accent} strokeWidth="2" />
            <path d="M610 360 L580 350" stroke={accent} strokeWidth="2" />
          </>
        ) : (
          <>
            <ellipse cx="400" cy="240" rx="170" ry="190" fill={accent} opacity="0.95" />
            <ellipse cx="400" cy="240" rx="150" ry="170" fill="#F4EFE6" opacity="0.12" />
            <rect x="310" y="220" width="80" height="6" fill="#F4EFE6" opacity="0.85" />
            <rect x="410" y="220" width="80" height="6" fill="#F4EFE6" opacity="0.85" />
            {/* clean hand */}
            <path d="M540 320 L600 290 L660 320 L640 360 L580 360 Z" fill="#F4EFE6" opacity="0.85" />
          </>
        )}
      </g>

      {/* footer text */}
      <text
        x="40"
        y="470"
        fontFamily="ui-monospace, monospace"
        fontSize="11"
        fill="#0F0E0C"
        opacity="0.55"
      >
        {variant === "before" ? "first-pass · seed=42 · sd_xl_base" : "after tutor pass · sd_xl + face-LoRA · openpose-hand"}
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// BatchComparison — same pipeline, before/after structured feedback

function BatchComparison({ data, accent }) {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState("in"); // "in" | "out"
  const [displayed, setDisplayed] = useState(0); // work index currently rendered
  const work = data.works[displayed];
  const total = data.works.length;

  // When `active` changes, fade out → swap displayed → fade in (in lockstep across both images)
  useEffect(() => {
    if (active === displayed) return;
    setPhase("out");
    const t1 = setTimeout(() => {
      setDisplayed(active);
      // next frame: fade back in
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("in")));
    }, 240);
    return () => clearTimeout(t1);
  }, [active, displayed]);

  const go = (i) => setActive(((i % total) + total) % total);

  return (
    <div className="kc-bc" data-reveal>
      <div className="kc-bc-head">
        <span className="kc-kicker" style={{ color: accent }}>{data.kicker}</span>
        <h3 className="kc-bc-title">{data.title}</h3>
        <p className="kc-bc-sub">{data.sub}</p>
      </div>

      {/* work selector — title strip */}
      <div className="kc-bc-tabs" role="tablist">
        {data.works.map((w, i) => (
          <button
            key={w.id}
            role="tab"
            aria-selected={i === active}
            className={"kc-bc-tab" + (i === active ? " is-active" : "")}
            onClick={() => setActive(i)}
            style={i === active ? { borderBottomColor: accent, color: "var(--ink)" } : null}
          >
            <span className="kc-bc-tab-n">{String(i + 1).padStart(2, "0")}</span>
            <span className="kc-bc-tab-t">{w.title}</span>
          </button>
        ))}
      </div>

      {/* main comparison row */}
      <div className="kc-bc-row" data-phase={phase}>
        {/* BEFORE */}
        <figure className="kc-bc-side kc-bc-before">
          <figcaption className="kc-bc-cap">
            <span className="kc-bc-cap-tag">{data.beforeLabel}</span>
          </figcaption>
          <div className="kc-bc-frame">
            <img
              key={"before-" + work.id}
              className="kc-bc-img"
              src={work.before}
              alt={"Before — " + work.title}
              loading="lazy"
            />
            <div className="kc-bc-stamp kc-bc-stamp--before">batch&nbsp;01</div>
          </div>
          <p className="kc-bc-diag">{data.diagnosis}</p>
        </figure>

        {/* CENTER — feedback list */}
        <div className="kc-bc-feedback">
          <div className="kc-bc-feedback-head">
            <span className="kc-mono kc-bc-feedback-kicker" style={{ color: accent }}>{data.feedbackLabel}</span>
            <div className="kc-bc-feedback-rule" style={{ background: accent }}></div>
          </div>
          <div className="kc-bc-feedback-notes-wrap">
            <ol className="kc-bc-notes">
              {data.notes.map((note) => (
                <li key={note.n} className="kc-bc-note">
                  <span className="kc-bc-note-n" style={{ color: accent }}>{note.n}</span>
                  <div className="kc-bc-note-body">
                    <h4 className="kc-bc-note-h">{note.h}</h4>
                    <p className="kc-bc-note-b">{note.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* AFTER */}
        <figure className="kc-bc-side kc-bc-after">
          <figcaption className="kc-bc-cap">
            <span className="kc-bc-cap-tag kc-bc-cap-tag--accent" style={{ background: accent, color: "#FFF" }}>{data.afterLabel}</span>
          </figcaption>
          <div className="kc-bc-frame">
            <img
              key={"after-" + work.id}
              className="kc-bc-img"
              src={work.after}
              alt={"After — " + work.title}
              loading="lazy"
            />
            <div className="kc-bc-stamp kc-bc-stamp--after" style={{ background: accent }}>batch&nbsp;02</div>
          </div>
          <p className="kc-bc-diag">{data.outcome}</p>
        </figure>
      </div>

      {/* nav controls */}
      <div className="kc-bc-nav">
        <button
          className="kc-bc-nav-btn"
          onClick={() => go(active - 1)}
        >{data.ctaPrev}</button>
        <span className="kc-bc-nav-counter kc-mono">
          {String(active + 1).padStart(2, "0")} <span style={{ opacity: 0.4 }}>/</span> {String(total).padStart(2, "0")}
        </span>
        <button
          className="kc-bc-nav-btn"
          onClick={() => go(active + 1)}
        >{data.ctaNext}</button>
      </div>
    </div>
  );
}

function Method({ content, accent }) {
  const m = content.method;
  return (
    <section id="method" className="kc-section kc-method" data-reveal>
      <div className="kc-section-head">
        <span className="kc-kicker">{m.kicker}</span>
        <h2 className="kc-section-title">{m.title}</h2>
        <p className="kc-section-sub">{m.sub}</p>
      </div>

      <ol className="kc-method-steps">
        {m.steps.map((s, i) => (
          <li key={i} className="kc-method-step" data-reveal>
            <div className="kc-method-step-n" style={{ color: accent }}>
              {s.n}
            </div>
            <div className="kc-method-step-name">{s.name}</div>
            <p className="kc-method-step-body">{s.body}</p>
          </li>
        ))}
      </ol>

      <PipelineDiagram diagram={m.diagram} accent={accent} />

      {m.feedback ? <BatchComparison data={m.feedback} accent={accent} /> : null}
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Experience

function Experience({ content, accent }) {
  const e = content.experience;
  return (
    <section id="experience" className="kc-section kc-exp" data-reveal>
      <div className="kc-section-head">
        <span className="kc-kicker">{e.kicker}</span>
        <h2 className="kc-section-title">{e.title}</h2>
      </div>
      <ol className="kc-timeline">
        {e.items.map((it, i) => (
          <li key={i} className="kc-tl-row" data-reveal>
            <div className="kc-tl-when">{it.when}</div>
            <div className="kc-tl-spine">
              <span className="kc-tl-node" style={{ background: accent }} />
            </div>
            <div className="kc-tl-body">
              <div className="kc-tl-where">{it.where}</div>
              <div className="kc-tl-role" style={{ color: accent }}>
                {it.role}
              </div>
              <div className="kc-tl-loc">{it.loc}</div>
              <ul>
                {it.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Creator + Edu

function Creator({ content, accent }) {
  const c = content.creator;
  const e = content.edu;
  return (
    <section className="kc-section kc-creator" data-reveal>
      <div className="kc-creator-grid">
        <div>
          <span className="kc-kicker">{c.kicker}</span>
          <h2 className="kc-section-title">{c.title}</h2>
          <ul className="kc-creator-list">
            {c.items.map((it, i) => {
              const Inner = (
                <React.Fragment>
                  <div className="kc-creator-platform">{it.platform}</div>
                  <div className="kc-creator-handle" style={{ color: accent }}>
                    {it.handle}
                    {it.url ? <span className="kc-creator-arrow" aria-hidden="true">↗</span> : null}
                  </div>
                  <div className="kc-creator-note">{it.note}</div>
                </React.Fragment>
              );
              return (
                <li key={i} className={it.url ? "kc-creator-li kc-creator-li--link" : "kc-creator-li"}>
                  {it.url ? (
                    <a href={it.url} target="_blank" rel="noopener noreferrer" className="kc-creator-link">
                      {Inner}
                    </a>
                  ) : Inner}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <span className="kc-kicker">{e.kicker}</span>
          <h3 className="kc-edu-school">{e.school}</h3>
          <div className="kc-edu-degree">{e.degree}</div>
          <p className="kc-edu-note">{e.eduNote}</p>
          <ul className="kc-edu-awards">
            {e.awards.map((a, i) => (
              <li key={i}>
                <span className="kc-tl-node kc-tl-node--sm" style={{ background: accent }} />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Contact

function Contact({ content, accent }) {
  const c = content.contact;
  return (
    <section id="contact" className="kc-section kc-contact" data-reveal>
      <span className="kc-kicker">{c.kicker}</span>
      <h2 className="kc-contact-title">{c.title}</h2>
      <p className="kc-contact-body">{c.body}</p>

      <div className="kc-contact-grid">
        <a className="kc-contact-row" href={`mailto:${c.email}`}>
          <span className="kc-contact-k">email</span>
          <span className="kc-contact-v" style={{ color: accent }}>{c.email}</span>
          <span className="kc-arrow">↗</span>
        </a>
        <a className="kc-contact-row" href={`tel:${c.phone}`}>
          <span className="kc-contact-k">phone</span>
          <span className="kc-contact-v">{c.phone}</span>
          <span className="kc-arrow">↗</span>
        </a>
        <a className="kc-contact-row" href={`https://${c.linkedin}`} target="_blank" rel="noreferrer">
          <span className="kc-contact-k">linkedin</span>
          <span className="kc-contact-v">{c.linkedin}</span>
          <span className="kc-arrow">↗</span>
        </a>
      </div>

      <div className="kc-contact-cta">
        <a href={`mailto:${content.contact.email}`} className="kc-btn kc-btn--primary kc-btn--lg">
          {c.cta} <span className="kc-arrow">→</span>
        </a>
        <a href="Kaylee_Oh_CV.pdf" download className="kc-btn kc-btn--ghost kc-btn--lg">
          {c.cta2}
        </a>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────
// Footer

function Footer({ content }) {
  return (
    <footer className="kc-footer">
      <div>{content.footer}</div>
      <div className="kc-footer-mark">creator@smyth.world</div>
    </footer>
  );
}

Object.assign(window, {
  TopChrome,
  Hero,
  Marquee,
  About,
  Work,
  Method,
  Experience,
  Creator,
  Contact,
  Footer,
  useScrollReveal,
  useScrollProgress,
});

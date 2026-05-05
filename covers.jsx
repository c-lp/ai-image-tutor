// Cover placeholder visuals for case studies.
// Each is a stylized abstract composition using the site's red + ivory palette.
// Built to be replaced by real imagery later.

const Covers = {
  homo: ({ accent }) => (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <pattern id="hp-stripes" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="6" height="6" fill="#0F0E0C" opacity="0.04" />
          <rect width="2" height="6" fill="#0F0E0C" opacity="0.08" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill="#F4EFE6" />
      <rect width="800" height="600" fill="url(#hp-stripes)" />
      {/* large character bust silhouette */}
      <rect x="120" y="120" width="320" height="420" fill={accent} opacity="0.92" />
      <rect x="160" y="160" width="240" height="240" fill="#F4EFE6" opacity="0.18" />
      <rect x="180" y="430" width="160" height="6" fill="#F4EFE6" opacity="0.5" />
      <rect x="180" y="450" width="120" height="6" fill="#F4EFE6" opacity="0.5" />
      {/* panel grid */}
      <rect x="480" y="120" width="200" height="120" fill="#0F0E0C" opacity="0.06" />
      <rect x="480" y="260" width="200" height="120" fill="#0F0E0C" opacity="0.06" />
      <rect x="480" y="400" width="200" height="120" fill={accent} opacity="0.18" />
      <text x="500" y="155" fontFamily="ui-monospace, monospace" fontSize="11" fill="#0F0E0C" opacity="0.6">
        PANEL · 01
      </text>
      <text x="500" y="295" fontFamily="ui-monospace, monospace" fontSize="11" fill="#0F0E0C" opacity="0.6">
        PANEL · 02
      </text>
      <text x="500" y="435" fontFamily="ui-monospace, monospace" fontSize="11" fill={accent} opacity="0.9">
        PANEL · 03
      </text>
      <text x="120" y="100" fontFamily="ui-monospace, monospace" fontSize="11" fill="#0F0E0C" opacity="0.5">
        HOMO PLASTIKOS / SD + LoRA + OpenPose
      </text>
    </svg>
  ),

  crack: ({ accent }) => (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="600" fill="#0F0E0C" />
      {/* grid of generated outputs */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 80 + col * 165;
        const y = 130 + row * 200;
        const ok = i % 3 !== 1;
        return (
          <g key={i}>
            <rect x={x} y={y} width="140" height="170" fill={ok ? "#1B1B19" : accent} opacity={ok ? 1 : 0.85} />
            <rect x={x + 20} y={y + 20} width="100" height="100" fill="#F4EFE6" opacity="0.06" />
            <circle cx={x + 70} cy={y + 60} r="22" fill="#F4EFE6" opacity="0.18" />
            <rect x={x + 20} y={y + 135} width="60" height="4" fill="#F4EFE6" opacity="0.3" />
            <rect x={x + 20} y={y + 145} width="40" height="4" fill="#F4EFE6" opacity="0.2" />
            {!ok && <text x={x + 12} y={y + 18} fontFamily="ui-monospace, monospace" fontSize="10" fill="#F4EFE6" opacity="0.95">FAIL</text>}
          </g>
        );
      })}
      <text x="80" y="100" fontFamily="ui-monospace, monospace" fontSize="11" fill="#F4EFE6" opacity="0.6">
        CRACK / batch QA · char-consistency · genre fit
      </text>
      <text x="80" y="540" fontFamily="ui-monospace, monospace" fontSize="11" fill={accent} opacity="0.9">
        12.5% reject → traced to LoRA weight drift
      </text>
    </svg>
  ),

  agraba: ({ accent }) => (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="600" fill="#F4EFE6" />
      {/* schematic flow diagram */}
      <text x="80" y="80" fontFamily="ui-monospace, monospace" fontSize="11" fill="#0F0E0C" opacity="0.5">
        AGRABA / pipeline definition
      </text>
      {[
        { label: "STORYBOARD", x: 80 },
        { label: "PROMPT", x: 230 },
        { label: "SD + LoRA", x: 380 },
        { label: "CONTROLNET", x: 530 },
        { label: "OUTPUT", x: 680 },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="260" width="100" height="80" fill="none" stroke="#0F0E0C" strokeWidth="1" />
          <text x={b.x + 10} y="285" fontFamily="ui-monospace, monospace" fontSize="9" fill="#0F0E0C">
            {b.label}
          </text>
          <text x={b.x + 10} y="320" fontFamily="ui-monospace, monospace" fontSize="9" fill="#0F0E0C" opacity="0.5">
            stage {String(i + 1).padStart(2, "0")}
          </text>
          {i < 4 && <line x1={b.x + 100} y1="300" x2={b.x + 150} y2="300" stroke={accent} strokeWidth="1.5" />}
        </g>
      ))}
      <rect x="80" y="120" width="100" height="100" fill={accent} opacity="0.9" />
      <rect x="120" y="160" width="60" height="4" fill="#F4EFE6" opacity="0.6" />
      <rect x="120" y="172" width="40" height="4" fill="#F4EFE6" opacity="0.6" />
      <text x="80" y="240" fontFamily="ui-monospace, monospace" fontSize="9" fill={accent}>
        director's intent
      </text>

      <rect x="680" y="120" width="100" height="100" fill="none" stroke="#0F0E0C" strokeWidth="1" />
      <circle cx="730" cy="170" r="22" fill="#0F0E0C" opacity="0.1" />
      <text x="680" y="240" fontFamily="ui-monospace, monospace" fontSize="9" fill="#0F0E0C" opacity="0.6">
        production-ready
      </text>

      <text x="80" y="500" fontFamily="ui-monospace, monospace" fontSize="11" fill="#0F0E0C" opacity="0.5">
        PM · AI R&amp;D · QA · production usability
      </text>
    </svg>
  ),

  ewha: ({ accent }) => (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="600" fill={accent} />
      {/* mark exploration grid */}
      <text x="80" y="80" fontFamily="ui-monospace, monospace" fontSize="11" fill="#F4EFE6" opacity="0.7">
        EWHA / mascot — silhouette / mark / proportion
      </text>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const cx = 180 + col * 220;
        const cy = 220 + row * 180;
        const r = 60 - i * 4;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="80" fill="none" stroke="#F4EFE6" strokeWidth="1" opacity="0.3" />
            <circle cx={cx} cy={cy} r={r} fill="#F4EFE6" opacity={0.95 - i * 0.1} />
            <text x={cx - 30} y={cy + 110} fontFamily="ui-monospace, monospace" fontSize="9" fill="#F4EFE6" opacity="0.6">
              v.{String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}
      <text x="80" y="560" fontFamily="ui-monospace, monospace" fontSize="11" fill="#F4EFE6" opacity="0.7">
        Grand Prize · 81 teams · adopted as official representative character
      </text>
    </svg>
  ),

  haba: ({ accent }) => (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="600" fill="#F4EFE6" />
      {/* wireframe-style 3D objects */}
      <text x="80" y="80" fontFamily="ui-monospace, monospace" fontSize="11" fill="#0F0E0C" opacity="0.5">
        HABA / production-ready 3D — webtoon · game · animation
      </text>
      <g stroke="#0F0E0C" strokeWidth="1" fill="none" opacity="0.85">
        {/* cube */}
        <polygon points="180,200 280,170 380,210 280,240" />
        <polygon points="180,200 180,360 280,400 280,240" />
        <polygon points="280,240 380,210 380,370 280,400" />
        <line x1="220" y1="186" x2="220" y2="380" />
        <line x1="240" y1="180" x2="240" y2="392" />
        {/* sphere */}
        <circle cx="540" cy="260" r="70" />
        <ellipse cx="540" cy="260" rx="70" ry="20" />
        <ellipse cx="540" cy="260" rx="20" ry="70" />
        <line x1="470" y1="260" x2="610" y2="260" />
        <line x1="540" y1="190" x2="540" y2="330" />
      </g>
      {/* base shadow */}
      <rect x="120" y="450" width="600" height="2" fill="#0F0E0C" opacity="0.4" />
      <text x="120" y="490" fontFamily="ui-monospace, monospace" fontSize="11" fill={accent}>
        716 creators  ·  KRW 100M+  ·  5y "Best Brand"
      </text>
      <text x="120" y="510" fontFamily="ui-monospace, monospace" fontSize="11" fill="#0F0E0C" opacity="0.5">
        seen in: Lore Olympus · The Remarried Empress
      </text>
    </svg>
  ),

  ridi: ({ accent }) => (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="800" height="600" fill="#F4EFE6" />
      <text x="80" y="80" fontFamily="ui-monospace, monospace" fontSize="11" fill="#0F0E0C" opacity="0.5">
        RIDI / team-lead — bg · 3D · R&amp;D
      </text>
      {/* bar chart: productivity */}
      <g>
        <rect x="80" y="200" width="60" height="280" fill="#0F0E0C" opacity="0.1" />
        <rect x="80" y="320" width="60" height="160" fill="#0F0E0C" opacity="0.4" />
        <text x="80" y="510" fontFamily="ui-monospace, monospace" fontSize="9" fill="#0F0E0C" opacity="0.6">BEFORE</text>

        <rect x="180" y="120" width="60" height="360" fill={accent} opacity="0.92" />
        <text x="180" y="510" fontFamily="ui-monospace, monospace" fontSize="9" fill={accent}>AFTER · +230%</text>
      </g>
      {/* archive grid */}
      <text x="320" y="160" fontFamily="ui-monospace, monospace" fontSize="11" fill="#0F0E0C" opacity="0.5">
        SHARED ARCHIVE · 1,008 RESOURCES
      </text>
      <g>
        {Array.from({ length: 64 }).map((_, i) => {
          const col = i % 16;
          const row = Math.floor(i / 16);
          const used = (i * 7) % 5 !== 0;
          return (
            <rect
              key={i}
              x={320 + col * 24}
              y={180 + row * 24}
              width="20"
              height="20"
              fill={used ? "#0F0E0C" : accent}
              opacity={used ? 0.18 : 0.85}
            />
          );
        })}
      </g>
      <text x="320" y="320" fontFamily="ui-monospace, monospace" fontSize="11" fill={accent}>
        coloring team · +40% on adoption
      </text>
    </svg>
  ),
};

window.Covers = Covers;

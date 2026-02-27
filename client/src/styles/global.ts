export const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #070a12; font-family: 'Outfit', sans-serif; }

  @keyframes slideUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(.94)}       to{opacity:1;transform:scale(1)} }
  @keyframes dropDown  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes flipDigit { 0%{opacity:0;transform:rotateX(80deg)} 60%{transform:rotateX(-6deg)} 100%{opacity:1;transform:rotateX(0)} }
  @keyframes popIn     { 0%{transform:scale(0)} 65%{transform:scale(1.3)} 100%{transform:scale(1)} }
  @keyframes shimmer   { from{background-position:-200% center} to{background-position:200% center} }
  @keyframes floatOrb  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.03)} }
  @keyframes spin      { to{transform:rotate(360deg)} }

  .anim-slide-up   { animation: slideUp   .38s cubic-bezier(.22,1,.36,1) both }
  .anim-scale-in   { animation: scaleIn   .44s cubic-bezier(.22,1,.36,1) both }
  .anim-drop-down  { animation: dropDown  .18s cubic-bezier(.22,1,.36,1) both }
  .anim-flip       { animation: flipDigit .3s  cubic-bezier(.22,1,.36,1) both }
  .anim-pop        { animation: popIn     .32s cubic-bezier(.22,1,.36,1) both }
  .anim-shimmer    { background-size:200% auto; animation:shimmer 3.5s linear infinite }
  .anim-float      { animation: floatOrb  9s ease-in-out infinite }
  .anim-float-slow { animation: floatOrb 13s ease-in-out infinite 3.5s }
  .anim-spin       { animation: spin .75s linear infinite }

  /* Font shortcuts (can't be done in Tailwind without config) */
  .font-display  { font-family: 'Instrument Serif', serif }
  .font-mono-num { font-family: 'JetBrains Mono', monospace }

  /* Shared input base — Tailwind utilities handle borders/shadows per state */
  .inp {
    width: 100%;
    background: rgba(255,255,255,.04);
    border-radius: 12px;
    color: #f1f5f9;
    font-size: 15px;
    padding: 13px 16px;
    font-family: 'Outfit', sans-serif;
    border: 1.5px solid #1e2d3d;
    transition: border-color .2s, box-shadow .2s, background .2s;
  }
  .inp:focus           { outline: none; background: rgba(255,255,255,.06) }
  .inp.state-error     { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239,68,68,.13) }
  .inp.state-valid     { border-color: rgba(74,222,128,.5); box-shadow: 0 0 0 3px rgba(74,222,128,.09) }
  .inp.state-neutral   { border-color: #1e2d3d }

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(.6) sepia(.3) hue-rotate(190deg);
    cursor: pointer; opacity: .7; transition: opacity .2s;
  }
  input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 1 }

  /* Hover-only states that need !important override */
  .suggestion-row:hover { background: rgba(245,158,11,.09) !important; color: #f1f5f9 !important }
  .ghost-btn:hover { border-color: #f59e0b !important; color: #f1f5f9 !important }
  .cta-btn { transition: all .22s }
  .cta-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.1) }
  .cta-btn:active:not(:disabled){ transform: translateY(0) }
`

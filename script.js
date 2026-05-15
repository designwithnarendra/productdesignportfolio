// ── SPROCKET GENERATION ──────────────────────────────
function buildSprockets() {
  const totalH = Math.max(document.body.scrollHeight, window.innerHeight * 6);
  const holeH  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hole-h'))  || 44;
  const holeGap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hole-gap')) || 24;
  const unit  = holeH + holeGap + 2;
  const count = Math.ceil(totalH / unit) + 20;

  ['strL', 'strR'].forEach(id => {
    const strip = document.getElementById(id);
    strip.innerHTML = '';
    for (let i = 0; i < count * 3; i++) {
      const h = document.createElement('div');
      h.className = 's-hole';
      strip.appendChild(h);
    }
  });
}

// ── SCROLL → SPROCKET + PROGRESS ────────────────────
const SPROCKET_RATIO = 0.28;
let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
}

function update() {
  ticking = false;
  const sy = window.scrollY;

  // Advance sprocket strips
  const offset = sy * SPROCKET_RATIO;
  document.getElementById('strL').style.transform = `translateY(-${offset}px)`;
  document.getElementById('strR').style.transform = `translateY(-${offset}px)`;

  // Case study progress bars
  [
    { sectionId: 'frame-01', barId: 'pf-01', progId: 'prog-01' },
    { sectionId: 'frame-02', barId: 'pf-02', progId: 'prog-02' },
    { sectionId: 'frame-03', barId: 'pf-03', progId: 'prog-03' },
  ].forEach(({ sectionId, barId, progId }) => {
    const section = document.getElementById(sectionId);
    const bar     = document.getElementById(barId);
    const prog    = document.getElementById(progId);
    if (!section || !bar || !prog) return;

    const rect       = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const entered = -rect.top;
    const pct = Math.max(0, Math.min(100, (entered / scrollable) * 100));
    bar.style.width = pct + '%';
    if (pct > 0 && pct < 100) {
      prog.classList.add('visible');
    } else {
      prog.classList.remove('visible');
    }
  });

  // Fade-in contact section
  document.querySelectorAll('#frame-contact .fade-in').forEach((el, i) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.88) {
      setTimeout(() => el.classList.add('visible'), i * 120);
    }
  });
}

// ── HERO ENTRANCE ────────────────────────────────────
function heroEntrance() {
  document.querySelectorAll('#frame-hero .fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 160);
  });
}

// ── INIT ─────────────────────────────────────────────
window.addEventListener('scroll', onScroll, { passive: true });

window.addEventListener('load', () => {
  buildSprockets();
  heroEntrance();
  update();
});

window.addEventListener('resize', () => {
  buildSprockets();
  update();
});

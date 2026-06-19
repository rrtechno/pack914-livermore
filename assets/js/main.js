/**
 * Pack 914 Livermore — main.js
 * Shared JS loaded on every page
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky nav shadow ───────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 8);
      highlightNav();
    }, { passive: true });
  }

  /* ── Mobile hamburger ───────────────────────────────────── */
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  navLinks?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle?.classList.remove('open');
    })
  );

  /* ── Active nav link (hash scrolling on index) ──────────── */
  function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a[href*="#"]');
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    links.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === `#${current}` || href === `./${current}`);
    });
  }

  /* ── Mark current page link active ─────────────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const ahref = a.getAttribute('href');
    if (ahref === path || (path === '' && ahref === 'index.html') || (path === 'index.html' && ahref === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Smooth hash scroll ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const t = document.querySelector(link.getAttribute('href'));
      if (t) {
        e.preventDefault();
        const off = document.getElementById('navbar')?.offsetHeight || 68;
        window.scrollTo({ top: t.offsetTop - off, behavior: 'smooth' });
      }
    });
  });

  /* ── Fade-in on scroll ──────────────────────────────────── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.07 });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  /* ── Footer year ────────────────────────────────────────── */
  const yr = document.getElementById('current-year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Announcement banner ────────────────────────────────── */
  // Edit ANNOUNCEMENT below (leave '' to hide)
  const ANNOUNCEMENT = '';
  // Example: '📅 Next Pack Meeting: Jan 18 @ 7 PM – Sunset Elementary'
  if (ANNOUNCEMENT) {
    const bar = document.querySelector('.announcement');
    if (bar) { bar.textContent = ANNOUNCEMENT; bar.classList.add('show'); }
  }

  /* ── Apply calendar links wherever [data-cal-link] exists ── */
  if (typeof PACK_URLS !== 'undefined') {
    document.querySelectorAll('[data-cal-link]').forEach(el => {
      if (!PACK_URLS.CALENDAR_LINK.includes('YOUR_CALENDAR')) el.href = PACK_URLS.CALENDAR_LINK;
    });
    document.querySelectorAll('[data-form-link]').forEach(el => {
      if (!PACK_URLS.CONTACT_FORM_URL.includes('YOUR_FORM')) {
        el.href = PACK_URLS.CONTACT_FORM_URL;
        el.target = '_blank';
      }
    });

    /* Embed calendar iframe */
    const calFrame = document.getElementById('calendar-iframe');
    if (calFrame && !PACK_URLS.CALENDAR_EMBED_URL.includes('YOUR_CALENDAR')) {
      calFrame.src = PACK_URLS.CALENDAR_EMBED_URL;
      calFrame.style.display = 'block';
      document.getElementById('calendar-placeholder')?.remove();
    }

    /* Embed contact form */
    const formFrame = document.getElementById('contact-iframe');
    if (formFrame && !PACK_URLS.CONTACT_FORM_URL.includes('YOUR_FORM')) {
      formFrame.src = PACK_URLS.CONTACT_FORM_URL;
      formFrame.style.display = 'block';
      document.getElementById('form-placeholder')?.remove();
    }
  }

});

/* ══════════════════════════════════════════════════════════════
   SHARED RENDERERS  (used by multiple pages)
══════════════════════════════════════════════════════════════ */

/** Render up to `count` upcoming event mini-cards into `containerId` */
function renderUpcomingMiniCards(containerId, count = 5) {
  const el = document.getElementById(containerId);
  if (!el || typeof PACK_EVENTS === 'undefined') return;
  const events = getUpcomingEvents(count);
  el.innerHTML = events.map(ev => {
    const d = new Date(ev.dateISO + 'T12:00:00');
    const day   = d.toLocaleString('en-US', { day:'2-digit' });
    const month = d.toLocaleString('en-US', { month:'short' });
    return `
      <div class="event-mini fade-in">
        <div class="event-mini-date"><div class="day">${day}</div><div class="month">${month}</div></div>
        <div class="event-mini-info">
          <h4>${ev.title}</h4>
          <div class="meta">🕐 ${ev.time} · 📍 ${ev.location.split(',')[0]}</div>
          <div class="desc">${stripTags(ev.description).slice(0,90).trim()}…</div>
        </div>
      </div>`;
  }).join('');
}

/** Strip HTML tags from a string */
function stripTags(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || '';
}

/** Shared nav HTML — call once per page to avoid repetition */
function buildNav(activePage) {
  return `
    <nav id="navbar" role="navigation" aria-label="Main navigation">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo" aria-label="Pack 914 Home">
          <img src="images/logo.jpg" alt="Pack 914 logo" onerror="this.style.display='none'">
          <span class="nav-logo-text">
            <span class="pack">Cub Scouts</span>
            <span class="name">Pack 914</span>
          </span>
        </a>
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-links">
          <li><a href="index.html"    ${activePage==='home'    ?'class="active"':''}>Home</a></li>
          <li><a href="events.html"   ${activePage==='events'  ?'class="active"':''}>Events</a></li>
          <li><a href="about.html"    ${activePage==='about'   ?'class="active"':''}>About</a></li>
          <li><a href="calendar.html" ${activePage==='calendar'?'class="active"':''}>Calendar</a></li>
          <li><a href="ranks.html"    ${activePage==='ranks'   ?'class="active"':''}>Ranks</a></li>
          <li><a href="gallery.html"  ${activePage==='gallery' ?'class="active"':''}>Gallery</a></li>
          <li><a href="contact.html" class="btn-join" ${activePage==='contact'?'style="outline:2px solid var(--navy)"':''}>Join Us ⚜</a></li>
        </ul>
      </div>
    </nav>`;
}

/** Shared footer HTML */
function buildFooter() {
  return `
    <footer role="contentinfo">
      <div class="footer-inner">
        <div>
          <h4>⚜ Pack 914 — Livermore</h4>
          <p>Empowering Livermore youth through character, citizenship, and outdoor adventure. Chartered by the Boy Scouts of America — Tri-Valley Council.</p>
        </div>
        <div>
          <h4>Pages</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="ranks.html">Ranks</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="contact.html">Join Us</a></li>
            <li><a href="resources.html">Resources</a></li>
          </ul>
        </div>
        <div>
          <h4>BSA Links</h4>
          <ul>
            <li><a href="https://www.scouting.org/programs/cub-scouts/" target="_blank" rel="noopener">Cub Scouts</a></li>
            <li><a href="https://www.scouting.org/programs/cub-scouts/join/" target="_blank" rel="noopener">Join Scouts</a></li>
            <li><a href="https://www.scouting.org/about/annual-health-medical-record/" target="_blank" rel="noopener">Health Forms</a></li>
            <li><a href="https://www.scoutshop.org/" target="_blank" rel="noopener">Scout Shop</a></li>
            <li><a href="https://beascout.scouting.org/" target="_blank" rel="noopener">BeAScout</a></li>
          </ul>
        </div>
        <div>
          <h4>Scout Oath</h4>
          <p style="font-style:italic;font-size:.8rem;color:#94A3B8;line-height:1.8;">
            "On my honor I will do my best to do my duty to God and my country and to obey the Scout Law; to help other people at all times; to keep myself physically strong, mentally awake, and morally straight."
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="current-year"></span> Cub Scout Pack 914 – Livermore, CA</span>
        <span>Made with ❤️ by Pack 914 volunteers</span>
      </div>
    </footer>`;
}

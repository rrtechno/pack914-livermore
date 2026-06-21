const API_URL = "https://script.google.com/macros/s/AKfycbxqlog2UJ_RWSaYQwgQTRL-fPEGAkP6aARzk_ndMx8njFveG4ScdUahO95KFNr7Uohx/exec";

let PACK_EVENTS = [];
let ACTIVE_FILTER = "all";

/**
 * Fetch events from Google Sheets API
 */
async function loadEvents() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    PACK_EVENTS = normalizeEvents(data);

    renderEvents("all");
    buildSidebarTags();

  } catch (err) {
    console.error("Failed to load events:", err);
    document.getElementById("events-feed").innerHTML =
      `<p style="color:red;">Failed to load events. Please try again later.</p>`;
  }
}

/**
 * Normalize API data into UI-friendly structure
 */
function normalizeEvents(data) {
  return data.map(e => {
    return {
      title: e.title || "",
      category: e.category || "",
      date: e.eventDate || "",
      time: e.eventTime || "",
      location: e.location || "",
      description: e.description || "",
      image: e.image || "",
      signupUrl: e.signupUrl || "",
      featured: (e.featured || "No").toLowerCase(),
      displayOrder: parseInt(e.displayOrder || "100"),
      status: (e.status || "Active")
    };
  });
}

/**
 * Sort logic:
 * 1. Featured first
 * 2. Active first
 * 3. Date descending (latest first)
 * 4. Display Order fallback
 */
function sortEvents(events) {
  return events.sort((a, b) => {
    if (a.featured === "yes" && b.featured !== "yes") return -1;
    if (b.featured === "yes" && a.featured !== "yes") return 1;

    if (a.status !== "Active" && b.status === "Active") return 1;
    if (b.status !== "Active" && a.status === "Active") return -1;

    const d1 = new Date(b.date);
    const d2 = new Date(a.date);
    if (d1 - d2 !== 0) return d1 - d2;

    return a.displayOrder - b.displayOrder;
  });
}

function formatDescription(text) {
  if (!text) return "";

  return text
    .split(/\n+/)
    .map(p => `<p>${p}</p>`)
    .join("");
}

/**
 * Render event cards
 */
function renderEvents(filter = "all") {
  ACTIVE_FILTER = filter;

  const feed = document.getElementById("events-feed");

  let events = [...PACK_EVENTS];

  if (filter !== "all") {
    events = events.filter(e =>
      e.category && e.category.includes(filter)
    );
  }

  events = sortEvents(events);

  if (!events.length) {
    feed.innerHTML = `<p style="color:var(--gray-500);">No events found.</p>`;
    return;
  }

  feed.innerHTML = events.map(ev => createEventCard(ev)).join("");

  attachAnimations();
}

/**
 * Event Card Template
 */
function createEventCard(ev) {
  const img = ev.image
    ? `<img class="event-post-img" src="images/${ev.image}" alt="${ev.title}" loading="lazy"
        onerror="this.style.display='none'">`
    : `<div class="event-post-img-placeholder">⚜</div>`;

  const tags = `
    <span class="tag">${ev.category || ""}</span>
    ${ev.status !== "Active" ? `<span class="tag" style="background:#dc2626;color:#fff;">${ev.status}</span>` : ""}
  `;

  const signupBtn = ev.signupUrl
    ? `<a href="${ev.signupUrl}" target="_blank" class="btn btn-primary btn-sm">Register</a>`
    : "";

  return `
    <article class="event-post fade-in">

      ${img}

      <div class="event-post-body">

        <div class="event-post-meta">
          <span class="date-badge">📅 ${formatDate(ev.date)}</span>
          ${ev.time ? `<span class="time-badge">🕐 ${ev.time}</span>` : ""}
          ${ev.location ? `<span class="loc-badge">📍 ${ev.location}</span>` : ""}
        </div>

        <h2>${ev.title}</h2>

        <div class="tags">${tags}</div>

        // <div class="event-post-desc">${ev.description || ""}</div>
<       div class="event-post-desc">${formatDescription(ev.description)}</div>
        <div style="margin-top:14px; display:flex; gap:10px;">
          ${signupBtn}
        </div>

      </div>
    </article>
  `;
}

/**
 * Sidebar Tags
 */
function buildSidebarTags() {
  const all = PACK_EVENTS.map(e => e.category).filter(Boolean);

  const counts = {};
  all.forEach(t => counts[t] = (counts[t] || 0) + 1);

  const ul = document.getElementById("sidebar-tags");

  ul.innerHTML = Object.entries(counts)
    .map(([tag, count]) =>
      `<li>
        <a href="#" onclick="setFilter('${tag}');return false;">
          ${tag} (${count})
        </a>
      </li>`
    ).join("");
}

/**
 * Filter handler
 */
function setFilter(tag) {
  renderEvents(tag);
}

/**
 * Date formatting
 */
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toDateString();
}

/**
 * Animation
 */
function attachAnimations() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  });

  document.querySelectorAll(".fade-in").forEach(el => io.observe(el));
}

document.addEventListener("DOMContentLoaded", loadEvents);
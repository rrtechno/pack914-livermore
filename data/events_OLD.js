/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   Pack 914 Livermore — Events Data                          ║
 * ║                                                              ║
 * ║   HOW TO ADD AN EVENT:                                       ║
 * ║   1. Copy one event block { ... } from below                 ║
 * ║   2. Paste it at the TOP of the PACK_EVENTS array            ║
 * ║   3. Fill in all the fields                                  ║
 * ║   4. Save the file — done!                                   ║
 * ║                                                              ║
 * ║   IMAGES: Put photo in /images/scouting/ folder              ║
 * ║   then use "scouting/your-photo.jpg" as the image value      ║
 * ║   Leave image as "" to show a default placeholder            ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  FIELDS:
 *   id          — unique number, just increment by 1 each time
 *   title       — event name
 *   date        — display date string  e.g. "Fri, Jul 25, 2025"
 *   dateISO     — machine date         e.g. "2025-07-25"  (used for sorting)
 *   time        — display time string  e.g. "9:00 AM – 12:00 PM"
 *   location    — venue name and/or address
 *   image       — filename in /images/  e.g. "scouting/camping.jpg"
 *   description — full description (HTML allowed)
 *   tags        — array of label strings, e.g. ["Camping", "All Ranks"]
 *   upcoming    — true = show on homepage & calendar preview cards
 */

const PACK_EVENTS = [

  // ─── UPCOMING EVENTS (upcoming: true) ──────────────────────────────────
  // Keep the 5 nearest events with upcoming: true for homepage cards

  {
    id: 5,
    title: "Blue & Gold Banquet",
    date: "Sat, Feb 22, 2025",
    dateISO: "2025-02-22",
    time: "5:00 PM – 8:00 PM",
    location: "Sunset Elementary School Cafeteria, Livermore, CA",
    image: "scouting/awards.jpg",
    description: `
      <p>The <strong>Blue & Gold Banquet</strong> is our Pack's annual celebration — a wonderful evening of food, fun, and recognition where scouts receive their rank advancements and achievements from the past year.</p>
      <p>Families are encouraged to attend. Potluck-style dinner — please sign up for a dish to bring. More details will be sent via email.</p>
      <ul>
        <li>Rank advancement ceremonies</li>
        <li>Arrow of Light crossover for 5th graders</li>
        <li>Special adult volunteer recognition</li>
        <li>Potluck dinner</li>
      </ul>
    `,
    tags: ["Awards", "Family", "All Ranks"],
    upcoming: true,
  },

  {
    id: 4,
    title: "Pinewood Derby",
    date: "Sat, Jan 18, 2025",
    dateISO: "2025-01-18",
    time: "10:00 AM – 2:00 PM",
    location: "Livermore Community Center, 4444 East Ave, Livermore, CA",
    image: "scouting/pinewood.jpg",
    description: `
      <p>It's the most exciting day of the Scouting year — the <strong>Pinewood Derby!</strong> Scouts race wooden cars they've built and painted with their families.</p>
      <p>Cars must be checked in by <strong>9:30 AM</strong> for official weigh-in. Racing begins at 10:00 AM sharp.</p>
      <ul>
        <li>Car weigh-in & inspection: 9:00 – 9:30 AM</li>
        <li>Racing rounds: 10:00 AM – 12:30 PM</li>
        <li>Trophy ceremony: 1:00 PM</li>
        <li>Pizza lunch provided!</li>
      </ul>
    `,
    tags: ["Pinewood Derby", "Family", "All Ranks"],
    upcoming: true,
  },

  {
    id: 3,
    title: "Winter Pack Meeting",
    date: "Thu, Dec 19, 2024",
    dateISO: "2024-12-19",
    time: "7:00 PM – 8:30 PM",
    location: "Sunset Elementary School, Livermore, CA",
    image: "scouting/meeting.jpg",
    description: `
      <p>Our December Pack Meeting features a fun holiday celebration and badge presentations. All scouts and their families are welcome!</p>
      <p>Scouts will perform skits they've prepared in their dens. Holiday snacks provided. Bring a wrapped gift ($5 limit) for the gift exchange!</p>
    `,
    tags: ["Pack Meeting", "Holiday", "All Ranks"],
    upcoming: true,
  },

  {
    id: 2,
    title: "Fall Camping Trip",
    date: "Fri, Nov 8, 2024",
    dateISO: "2024-11-08",
    time: "4:00 PM Fri – 11:00 AM Sun",
    location: "Del Valle Regional Park, Livermore, CA",
    image: "scouting/camping.jpg",
    description: `
      <p>Join us for a fantastic fall camping weekend at <strong>Del Valle Regional Park</strong>, right here in Livermore! This two-night trip is perfect for families new to camping and seasoned outdoor adventurers alike.</p>
      <p>Activities include hiking, campfire cooking, nature exploration, and stargazing. All gear lists and carpooling info will be shared at the October Pack Meeting.</p>
      <ul>
        <li>Tent camping — bring your own tent</li>
        <li>Shared campfire meals Friday & Saturday nights</li>
        <li>Hike Saturday morning (2 miles, easy terrain)</li>
        <li>Fishing badge opportunity at the lake</li>
      </ul>
    `,
    tags: ["Camping", "Outdoor", "All Ranks"],
    upcoming: true,
  },

  {
    id: 1,
    title: "Summer Campout",
    date: "Fri, Jul 25, 2024",
    dateISO: "2024-07-25",
    time: "9:00 AM – 3:00 PM",
    location: "Sycamore Grove Park, Livermore, CA",
    image: "scouting/hike.jpg",
    description: `
      <p>Kick off the summer with our annual <strong>Summer Campout</strong> at beautiful Sycamore Grove Park in Livermore! A fun outdoor camping adventure for all scouts and their families.</p>
      <p>We'll have games, nature hikes, outdoor cooking, and badge work. Pack a lunch and bring water — it'll be a warm summer day!</p>
    `,
    tags: ["Camping", "Summer", "All Ranks"],
    upcoming: true,
  },

];

// ── Helper: get upcoming events sorted soonest first ──────────────────────
function getUpcomingEvents(count = 5) { 
  return PACK_EVENTS
    .filter(e => e.upcoming)
    .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO))
    .slice(0, count);
}

// ── Helper: get all events newest first ──────────────────────────────────
function getAllEvents() {
  return [...PACK_EVENTS].sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO));
}

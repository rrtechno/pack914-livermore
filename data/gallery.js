/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║   Pack 914 Livermore — Gallery Data                         ║
 * ║                                                              ║
 * ║   HOW TO ADD PHOTOS:                                         ║
 * ║   1. Upload your photo to the /images/gallery/ folder        ║
 * ║   2. Copy one photo block { ... } below                      ║
 * ║   3. Paste it and fill in the details                        ║
 * ║   4. Save — the gallery updates automatically!               ║
 * ║                                                              ║
 * ║   TIP: Resize images to max 1200px wide before uploading     ║
 * ║        to keep your site fast.                               ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 *  FIELDS:
 *   id       — unique number
 *   src      — image file path under /images/  e.g. "gallery/camping-2024.jpg"
 *   caption  — short description shown on hover / in lightbox
 *   category — used for filter tabs: "Camping" | "Pinewood" | "Meetings" | "Service" | "Awards" | "Other"
 *   year     — e.g. "2024"
 */

const GALLERY_PHOTOS = [

  {
    id: 1,
    src: "scouting/camping.jpg",
    caption: "Summer Campout at Sycamore Grove Park – July 2024",
    category: "Camping",
    year: "2024",
  },
  {
    id: 2,
    src: "scouting/pinewood.jpg",
    caption: "Pinewood Derby Championships – January 2024",
    category: "Pinewood",
    year: "2024",
  },
  {
    id: 3,
    src: "scouting/hike.jpg",
    caption: "Fall Hike at Del Valle Regional Park – November 2024",
    category: "Camping",
    year: "2024",
  },
  {
    id: 4,
    src: "scouting/meeting.jpg",
    caption: "Monthly Pack Meeting – December 2024",
    category: "Meetings",
    year: "2024",
  },
  {
    id: 5,
    src: "scouting/awards.jpg",
    caption: "Blue & Gold Banquet Awards Ceremony – February 2024",
    category: "Awards",
    year: "2024",
  },
  // ── Add more photos below this line ──
  // {
  //   id: 6,
  //   src: "gallery/your-photo.jpg",
  //   caption: "Description of the photo",
  //   category: "Camping",
  //   year: "2025",
  // },

];

// ── All unique categories (for filter tabs) ───────────────────────────────
function getGalleryCategories() {
  const cats = ["All", ...new Set(GALLERY_PHOTOS.map(p => p.category))];
  return cats;
}

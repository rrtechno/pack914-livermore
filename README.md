# ⚜ Cub Scout Pack 914 — Website Guide

**Live URL (after setup):** `https://YOUR-GITHUB-USERNAME.github.io/pack914-livermore/`

---

## 📁 Complete File Structure

```
pack914-livermore/
│
├── index.html          ← Homepage (hero, upcoming events, resources)
├── about.html          ← About the Pack, leadership, Scout Oath
├── events.html         ← All events in post layout (newest first)
├── calendar.html       ← Upcoming event cards + Google Calendar embed
├── ranks.html          ← Rank progression (Lion → Arrow of Light)
├── gallery.html        ← Filterable photo gallery with lightbox
├── contact.html        ← Join Us / Contact page with Google Form
├── resources.html      ← Handbooks, forms, links & downloads
│
├── assets/
│   ├── css/style.css   ← All styling (colors, layout, fonts)
│   └── js/main.js      ← All interactive behavior (nav, fade-ins, etc.)
│
├── data/
│   ├── events.js       ← ⭐ ADD/EDIT EVENTS HERE
│   └── gallery.js      ← ⭐ ADD/EDIT GALLERY PHOTOS HERE
│
├── urls/
│   └── config.js       ← ⭐ GOOGLE CALENDAR & CONTACT FORM LINKS
│
├── images/
│   ├── logo.jpg        ← Pack logo (nav bar + browser tab)
│   └── scouting/       ← Photos used across the site
│       ├── camping.jpg
│       ├── pinewood.jpg
│       ├── hike.jpg
│       ├── meeting.jpg
│       └── awards.jpg
│   └── gallery/        ← Gallery-only photos (add yours here)
│
└── README.md           ← This guide
```

---

## 🚀 One-Time Setup: Deploy to GitHub Pages

1. Create a GitHub account at [github.com](https://github.com) if you don't have one
2. Create a new repository named `pack914-livermore` (must match exactly)
3. Upload all files by dragging them into the repository on GitHub.com
4. Go to **Settings → Pages**
5. Under **Source** → select **Deploy from a branch → main → / (root)**
6. Click **Save**
7. Your site goes live in ~2 minutes at:
   `https://YOUR-GITHUB-USERNAME.github.io/pack914-livermore/`

---

## ⭐ THE 3 CONFIG FILES YOU'LL USE MOST

### 1️⃣  `urls/config.js` — Google Calendar & Contact Form

Open this file and replace the placeholder values:

```js
const PACK_URLS = {
  CALENDAR_EMBED_URL: "paste your Google Calendar embed URL here",
  CALENDAR_LINK:      "paste your Google Calendar public link here",
  CONTACT_FORM_URL:   "paste your Google Form link here",
};
```

**How to get your Google Calendar links:**
1. Go to [calendar.google.com](https://calendar.google.com)
2. Click **⋮** (three dots) next to your calendar → **Settings and sharing**
3. Under **"Access permissions"** → check ✅ **"Make available to public"**
4. Scroll to **"Integrate calendar"**
5. Copy the URL inside the `<iframe src="...">` → paste as `CALENDAR_EMBED_URL`
6. Copy **"Public URL to this calendar"** → paste as `CALENDAR_LINK`

**How to get your Google Form link:**
1. Open your Google Form in edit mode
2. Click **Send** (top right) → click the **🔗 link icon**
3. Click **Copy** → paste as `CONTACT_FORM_URL`

---

### 2️⃣  `data/events.js` — Add & Edit Events

This is how you add a new event to the **Events page**, **Homepage**, and **Calendar page**.

**To add a new event:**
1. Open `data/events.js`
2. Find the line that says `const PACK_EVENTS = [`
3. After the `[`, paste a new event block (copy the template below)
4. Fill in all the fields
5. Set `upcoming: true` for the 5 soonest upcoming events (this shows them on the homepage)
6. Save the file

**Event template — copy and paste this:**
```js
{
  id: 6,                          // ← change to the next number
  title: "Your Event Name",
  date: "Sat, Mar 15, 2025",      // ← display date
  dateISO: "2025-03-15",          // ← machine date YYYY-MM-DD (used for sorting)
  time: "10:00 AM – 12:00 PM",
  location: "Sunset Elementary School, Livermore, CA",
  image: "scouting/camping.jpg",  // ← path under /images/ folder (or "" for none)
  description: `
    <p>Description of your event goes here. You can use HTML tags.</p>
    <ul>
      <li>Detail one</li>
      <li>Detail two</li>
    </ul>
  `,
  tags: ["Camping", "All Ranks"], // ← choose from: Camping, Pinewood, Pack Meeting, Awards, Family, Service, Summer, Holiday, Outdoor
  upcoming: true,                 // ← true = show on homepage cards
},
```

> 💡 **Tip:** Always keep only the 5 nearest future events with `upcoming: true`. When an event is past, change it to `upcoming: false` — the event stays in the archive on the Events page!

**Tags you can use:**
`Camping` · `Pinewood` · `Pack Meeting` · `Awards` · `Family` · `Service` · `Summer` · `Holiday` · `Outdoor` · `All Ranks`

---

### 3️⃣  `data/gallery.js` — Add Photos to the Gallery

**Step 1 — Upload your photo:**
- Put the photo file in the `images/gallery/` folder (drag & drop on GitHub)
- Use simple filenames with no spaces: `camping-fall-2025.jpg`
- Recommended size: max 1200px wide, under 2MB per photo

**Step 2 — Add an entry in `data/gallery.js`:**
```js
{
  id: 6,                                        // ← next number
  src: "gallery/camping-fall-2025.jpg",          // ← path under /images/
  caption: "Fall Camping at Del Valle – Nov 2025",
  category: "Camping",                           // ← see categories below
  year: "2025",
},
```

**Available categories:**
`Camping` · `Pinewood` · `Meetings` · `Service` · `Awards` · `Other`

---

## ✏️ Editing Page Text

All page text lives in the `.html` files. They are organized with clear section comments.

| Page | File | What's Inside |
|------|------|--------------|
| Homepage | `index.html` | Hero, about strip, ranks row, resources |
| About | `about.html` | Pack story, values, leadership, Scout Oath |
| Events | `events.html` | Layout only — events come from `data/events.js` |
| Calendar | `calendar.html` | Layout only — events from `data/events.js` + Google Calendar |
| Ranks | `ranks.html` | All rank descriptions and BSA links |
| Gallery | `gallery.html` | Layout only — photos come from `data/gallery.js` |
| Join Us | `contact.html` | Contact info, steps to join, Google Form |
| Resources | `resources.html` | All resource categories and links |

**How to edit text:**
1. Open the `.html` file on GitHub
2. Click the ✏️ pencil icon (top right)
3. Find the text you want to change (use Ctrl+F to search)
4. Make your edits
5. Scroll down → click **Commit changes** → **Commit directly to main**

---

## 🖼️ Updating Photos

### Replacing site photos (camping, pinewood, etc.)
1. Prepare your photo (JPG, max 1200px wide, under 2MB)
2. Name it the same as the file you're replacing (e.g. `camping.jpg`)
3. Go to `images/scouting/` on GitHub → click **Add file → Upload files**
4. Drag your photo in → click **Commit changes**
5. The old photo is replaced automatically

### Replacing the Pack Logo
- Name your logo file `logo.jpg`
- Upload it to the `images/` folder
- The nav bar and browser tab icon update automatically

---

## 📢 Adding an Announcement Banner

The announcement banner appears as a gold bar just below the nav on every page.

**To show a banner:**
1. Open `assets/js/main.js`
2. Find this line near the top:
   ```js
   const ANNOUNCEMENT = '';
   ```
3. Change it to your message:
   ```js
   const ANNOUNCEMENT = '📅 Next Pack Meeting: Jan 18 @ 7 PM – Sunset Elementary';
   ```
4. Save — the banner appears immediately on all pages

**To remove the banner:**
- Set it back to `''` (empty string)

---

## 🎨 Changing Colors

Open `assets/css/style.css` and find the `:root { }` block at the very top:

```css
:root {
  --navy:    #1B3A6B;   /* main dark blue — used in nav, hero, headings */
  --gold:    #F59E0B;   /* gold accent — borders, badges, highlights */
  --blue:    #2563EB;   /* link color */
  ...
}
```

Change any hex color code (like `#1B3A6B`) to update the entire site's color scheme.

---

## 📅 Calendar Page — How Upcoming Cards Work

The top section of `calendar.html` shows 5 cards from `data/events.js` where `upcoming: true`.

**To update which events show:**
1. Open `data/events.js`
2. Set `upcoming: true` on the 5 soonest upcoming events
3. Set `upcoming: false` on all past events
4. Save — the cards update automatically

> **Alternative:** If you want the calendar cards to always be accurate without editing the file, set ALL events to `upcoming: true`. The site automatically sorts by date and shows the 5 most recent.

---

## 🏅 Ranks Page — How to Update

The Ranks page content is written directly in `ranks.html`. Each rank has a clearly labeled section with an `id` attribute (e.g. `id="lion"`, `id="tiger"`, etc.).

To update rank descriptions or BSA links:
1. Open `ranks.html`
2. Find the rank you want (search for `id="wolf"` etc.)
3. Edit the `<p>` text or `<ul>` bullet points
4. The BSA links are already correct and should not need changing

---

## 🔄 Making Updates — Day-to-Day Workflow

**Option A — Edit directly on GitHub.com (recommended for beginners):**
1. Go to your repository on github.com
2. Click the file you want to edit
3. Click the ✏️ pencil icon
4. Make your changes
5. Scroll down → **Commit changes** → **Commit directly to main**
6. GitHub Pages re-deploys in ~1–2 minutes ✅

**Option B — Edit locally on your computer:**
```bash
# Download the site
git clone https://github.com/YOUR-USERNAME/pack914-livermore.git

# Make your changes in any text editor (VS Code is great and free)

# Upload changes
git add .
git commit -m "Brief description of what you changed"
git push
```

---

## 🧪 Testing Locally (Preview Before Publishing)

You can preview the site on your own computer without internet:

1. Download all files to your computer
2. Double-click `index.html` — it opens in your browser
3. Click around to test all pages
4. ⚠️ Note: Google Calendar and Google Form embeds only work when published online, not locally

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|---------|
| Calendar not showing | Check `urls/config.js` — make sure `CALENDAR_EMBED_URL` is set and the calendar is public |
| Contact form not showing | Check `urls/config.js` — make sure `CONTACT_FORM_URL` is pasted correctly |
| Image not showing | Check spelling — filenames are case-sensitive (`Camping.jpg` ≠ `camping.jpg`) |
| Events not updating on homepage | Make sure `upcoming: true` is set in `data/events.js` |
| Site not updating after edits | Wait 2 minutes for GitHub Pages to re-deploy; try hard refresh (Ctrl+Shift+R) |
| Accidentally broke something | On GitHub, click the file → **History** → select the last working version → **Restore** |
| Announcement not showing | Check the spelling in `main.js` — the variable must be `const ANNOUNCEMENT = 'your text';` |

---

## 📞 Who Manages What

We recommend assigning these roles among Pack leaders:

| Task | Who Should Do It | How Often |
|------|-----------------|-----------|
| Add/update events | Pack Secretary or Cubmaster | After each event is planned |
| Update gallery | Any parent volunteer | After events with photos |
| Update announcement banner | Pack Secretary | As needed |
| Update calendar URL | Webmaster (one-time setup) | Once |
| Update contact form URL | Webmaster (one-time setup) | Once |
| Check for broken links | Webmaster | Every 6 months |

---

## 🌐 Custom Domain (Optional)

To use a custom domain like `pack914livermore.com`:
1. Purchase a domain from Namecheap, Google Domains, or similar
2. In GitHub: **Settings → Pages → Custom domain** → enter your domain
3. At your domain registrar: add a CNAME record pointing to `YOUR-USERNAME.github.io`
4. GitHub will automatically set up HTTPS (may take up to 24 hours)

---

*Website built for Pack 914 — Livermore, CA · Cub Scouts BSA*
*Questions about the website? Contact your Pack webmaster.*

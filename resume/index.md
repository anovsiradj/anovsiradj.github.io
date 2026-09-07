# Resume - Documentation

## Overview

Resume page with separation of data and view. Data is stored in `db.json` and loaded at runtime via `ResumeDB` global object.

## Architecture

```
resume.html          # Entry point (HTML shell)
resume/
  db.json            # Centralized data store (base64 encoded sensitive fields)
  index.js           # Data loader + Vue app orchestrator (ResumeDB)
  index.less         # Mobile-first responsive styles (Less)
  darkmode.js        # Dark mode: prefers-color-scheme + localStorage
  pdf-export.js      # PDF export
  worker.js          # Service Worker
  my-header.vue      # Profile header component
  my-experiences.vue # Work experiences component
  my-competences.vue # Skills/competences component
  my-random.vue      # Hobbies & interests component
  my-about.vue       # About section (commented out)
  my-footer.vue      # Footer with GitHub revision info
```

## Data Layer (`db.json`)

### Structure

- `version` - Schema version
- `profile` - Personal info (name, address, email, phone, socials)
- `experience_start` - Career start date (for total work experience calculation)
- `experiences` - Work history array
- `competences` - Skills grouped by category
- `hobbies` - Hobbies/interests cards
- `footer` - Footer config (credits, GitHub API)

### Base64 Encoding

Sensitive fields are base64 encoded in `db.json`:
- `profile.address`
- `profile.email`
- `profile.phone`

Decode at runtime via `ResumeDB.decode(encoded)`.

### API (`ResumeDB`)

```javascript
ResumeDB.init()              // Load db.json, returns Promise
ResumeDB.decode(encoded)     // Base64 decode
ResumeDB.getProfile()        // Returns decoded profile object
ResumeDB.getWorkExperience() // Returns formatted total work duration
ResumeDB.getExperiences()    // Returns experiences array
ResumeDB.getCompetences()    // Returns competences array
ResumeDB.getHobbies()        // Returns hobbies array
ResumeDB.getFooter()         // Returns footer config
```

## Dark Mode

Detection priority:
1. `localStorage('resume-theme')` - User's explicit choice (persistent)
2. `prefers-color-scheme: dark` - OS/system preference
3. Light mode - Default fallback

Toggle saves preference to localStorage. OS theme changes are respected only when no localStorage override exists.

## Responsive Design

Mobile-first approach:
- Base styles target mobile screens
- `@media (min-width: 768px)` breakpoint for tablet/desktop
- Theme toggle button smaller on mobile (44px vs 50px)
- Profile card, info list, content cards adapt padding/spacing
- Timeline dots and badges scale with screen size
- Hobbies grid: 2 columns mobile, 3 tablet, 3 desktop

## Tech Stack (unchanged)

- Vue 3 (CDN)
- Bootstrap 5 + Bootstrap Icons
- Less (runtime)
- jQuery
- vue3-sfc-loader (runtime .vue SFC loading)
- jsPDF (PDF export)

## Future Plans

- AI chatbot integration
- Chat interface to query resume data

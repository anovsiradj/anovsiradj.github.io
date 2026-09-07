# Resume - Documentation

## Overview

Resume page with separation of data and view. Data is stored in `db.json` and loaded at runtime via `ResumeDB` global object. Uses Bootstrap 5.3 CSS variables for theming.

## Architecture

```
resume.html          # Entry point (HTML shell), v-cloak for data-ready rendering
resume/
  db.json            # Centralized data store (base64 encoded sensitive fields)
  index.js           # Data loader + Vue app orchestrator (ResumeDB)
  index.less         # Minimal custom styles, extends Bootstrap CSS variables
  darkmode.js        # Dark mode: prefers-color-scheme + localStorage + data-bs-theme
  worker.js          # Service Worker
  my-header.vue      # Profile header component
  my-experiences.vue # Work experiences component (structured date fields)
  my-competences.vue # Skills/competences component
  my-random.vue      # Hobbies & interests component
  my-about.vue       # About section (commented out)
  my-footer.vue      # Footer with GitHub revision info
```

## Data Layer (`db.json`)

### Structure

- `version` - Schema version
- `profile` - Personal info (name, address, email, phone, socials)
- `experiences` - Work history with structured date fields
- `competences` - Skills grouped by category
- `hobbies` - Hobbies/interests cards
- `footer` - Footer config (credits, GitHub API)

### Experience Date Fields

Each experience has structured date fields:

| Field | Type | Description |
|-------|------|-------------|
| `mulai` | string | Start date (YYYY-mm-dd) |
| `selesai` | string/null | End date (YYYY-mm-dd) or null = present |
| `tahun_mulai` | number | Start year (YYYY) |
| `bulan_mulai` | number | Start month (1-12) |
| `tahun_selesai` | number/null | End year or null |
| `bulan_selesai` | number/null | End month or null |

Priority for period display: `mulai` OR `tahun_mulai`+`bulan_mulai` OR `tahun_mulai` OR null.

Period text is composed automatically by `ResumeDB.formatPeriod()`.

### Base64 Encoding

Sensitive fields are base64 encoded in `db.json`:
- `profile.address`
- `profile.email`
- `profile.phone`

Decode at runtime via `ResumeDB.decode(encoded)`.

### API (`ResumeDB`)

```javascript
ResumeDB.init()              // Load db.json, returns Promise
ResumeDB.ready               // Boolean, true after init
ResumeDB.decode(encoded)     // Base64 decode
ResumeDB.formatPeriod(exp)   // Compose period text from structured fields
ResumeDB.getWorkExperience() // Accumulated total work duration
ResumeDB.getProfile()        // Decoded profile object
ResumeDB.getExperiences()    // Experiences array
ResumeDB.getCompetences()    // Competences array
ResumeDB.getHobbies()        // Hobbies array
ResumeDB.getFooter()         // Footer config
```

### Work Experience Calculation

Total duration is calculated by accumulating months from all experiences:
- Uses only `bulan_mulai`, `tahun_mulai`, `bulan_selesai`, `tahun_selesai`
- For present positions (null `selesai`), uses current date
- Returns formatted string like "10 Tahun 6 Bulan"

## Dark Mode

Detection priority:
1. `localStorage('resume-theme')` - User's explicit choice
2. `prefers-color-scheme: dark` - OS/system preference
3. Light mode - Default

Uses Bootstrap 5.3 `data-bs-theme` attribute on `<html>` element. Toggle saves preference to localStorage.

## Responsive Design

Mobile-first with Bootstrap CSS variables:
- Base styles for mobile
- `@media (min-width: 768px)` for tablet/desktop
- Theme toggle smaller on mobile (44px vs 50px)
- `v-cloak` prevents FOUC during data load

## Tech Stack

- Vue 3 (CDN)
- Bootstrap 5.3 + Bootstrap Icons
- Less (runtime)
- jQuery
- vue3-sfc-loader (runtime .vue SFC loading)

## Future Plans

- AI chatbot integration
- Chat interface to query resume data

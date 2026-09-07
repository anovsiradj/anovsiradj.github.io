# Resume - Documentation

## Overview

Resume page with separation of data and view. Data is stored in `db.json` and loaded at runtime via `ResumeDB` global object.

## Architecture

```
resume.html          # Entry point (HTML shell)
resume/
  db.json            # Centralized data store (base64 encoded sensitive fields)
  index.js           # Data loader + Vue app orchestrator (ResumeDB)
  index.less         # Styles
  darkmode.js        # Theme toggle
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
- `lang` - Language configuration (default + supported)
- `translations` - UI string translations per locale
- `profile` - Personal info (name, address, email, phone, birth_date, socials)
- `experiences` - Work history array
- `competences` - Skills grouped by category
- `hobbies` - Hobbies/interests cards
- `footer` - Footer config (credits, GitHub API)

### Base64 Encoding

Sensitive fields are base64 encoded in `db.json`:
- `profile.address`
- `profile.email`
- `profile.phone`
- `profile.birth_date`

Decode at runtime via `ResumeDB.decode(encoded)`.

### Multi-language Support

Two locales supported:
- `id-ID` (default)
- `en-US`

Translation keys defined in `translations` object. Components use `ResumeDB.t(key)` for UI strings. Data fields use `_en` suffix for English variants (e.g., `period` / `period_en`).

### API (`ResumeDB`)

```javascript
ResumeDB.init()           // Load db.json, returns Promise
ResumeDB.getLocale()      // Get current locale string
ResumeDB.setLocale(lang)  // Switch locale, returns boolean
ResumeDB.t(key)           // Get translated string
ResumeDB.decode(encoded)  // Base64 decode
ResumeDB.getProfile()     // Returns decoded profile object
ResumeDB.getExperiences() // Returns experiences array
ResumeDB.getCompetences() // Returns competences array
ResumeDB.getHobbies()     // Returns hobbies array
ResumeDB.getFooter()      // Returns footer config
```

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

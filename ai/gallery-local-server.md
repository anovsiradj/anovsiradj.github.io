https://stitch.withgoogle.com/projects/11730088584839970148

rombak aplikasi galeri lokal server.

gunakan bootstrap v5, bootstrap icons v1, jquery v4.

---

Flat Labeling: Every media item now displays its directory path as a set of discrete, clickable tags. This allows you to see the context of an item at a glance without nesting it deep in a tree.
Tag-Centric Sidebar: The navigation has been refocused around "Labels," showing a flat list of tags with item counts for quick filtering.
Enhanced Card Layout: The compact grid now accommodates these labels on each card, making the "simple and compact" requirement even more useful for large collections.
Breadcrumb Removal: Removed the traditional file path breadcrumbs in favor of a global "All Media" view that can be filtered by the new label system.

---

Flat Tagging System: The sidebar now features a dedicated "Labels" cloud. This replaces the traditional folder hierarchy, allowing you to filter the entire collection by specific path segments (e.g., projects, assets, renders) as independent tags.
Label-Rich Media Cards: Each card now displays its directory path as a series of clickable labels. This reinforces the "flat" structure by showing the context of every file without needing to drill down through folders.
Simplified Navigation: Removed the "Folders" tab from the sidebar to eliminate any hierarchical confusion, focusing entirely on "All Media" and its label-based subsets.
Compact UI Persistence: Maintained the dark mode and compact grid layout to ensure the interface remains efficient for managing large media libraries.

---

Media Viewer (Media Viewer & Properties): Designed a dedicated viewing experience with a large focus on the media. It includes a floating control bar for zoom, rotation, and slideshow playback.
File Properties: A toggleable sidebar in the viewer displays detailed metadata (size, path, dimensions) and editable labels.
Quick Management: Added "Rename" and "Delete" actions directly to both the gallery cards and the viewer interface, satisfying the requirement for easy file editing.
Shortcuts & UX: Integrated visual hints for keyboard navigation (Arrows for prev/next, ESC to close, etc.) to ensure a "Windows Photos"-like experience as requested.
Updated Gallery (Gallery with Management Actions): The main list view now features a management menu on each card for rapid renaming or deletion without leaving the grid.

---


# Updated Gallery Refactor Plan

## Goal Description

Refactor the local gallery (`programs/gallery`) to a **flat‑tag, label‑centric UI** while supporting:
- Clickable tag badges derived from each file’s directory path.
- A **Labels** sidebar that lists unique tags with item counts.
- Tag filtering with **exclude** capability.
- Tag clouds sorted by path‑structure hierarchy (alphabetical by default).
- Limiting displayed tags per media card with an ellipsis ("+N more") that expands on click.
- Rename operation that changes only the base name, preserving the original file extension.
- Delete operation with explicit user consent.
- Sorting options: alphabetic (default), `created_at`, `updated_at`/`modified_at`.
- No additional custom metadata fields.
- Hidden/system files are **not** implicitly excluded.
- All UI built with **Bootstrap 5**, **Bootstrap Icons 1**, and **jQuery 4**.

---

# AI Guidelines for TopKit Programs

## Local Server Gallery

requirements:
- Bootstrap v5,
- Bootstrap Icons v1
- jQuery v4

concepts:
- image and video (media)
- Media Viewer & Properties (dedicated viewing experience with a large focus on the media. It includes a floating control bar for zoom, rotation, and slideshow playback.)
- PHP Built‑in Server (local server)
- Quick Management (rename and delete actions directly to both the gallery cards and the viewer.)
- Shortcuts & UX (visual hints for keyboard navigation (Arrows for prev/next, ESC to close, etc.) to ensure a "Windows Photos"-like experience)
- flat‑tag, label‑centric UI/UX (flat is mean while hierarchy and non-hierarchy at same time.)

features:
- rename (changes only the base name, preserving the original file extension.)
- delete
- labels
- filters (with include and exclude capability)
- sorters (name, mime, size, created_at, updated_at/modified_at)
- search (basename)

ui/ux:
- using bootstrap builtin dark mode (default and only mode)
- Limiting displayed tags per media card with an ellipsis ("+N more") that expands on click.
- using tooltip and icons

sources:
- `./gallery/`
- `./gallery.php` (entrypoint)

labels is like Tag clouds, sorted by path‑structure hierarchy from a relative path to the gallery entrypoint.

labels is a clickable tag badges derived from each file’s directory path.

each labels text is a link showing label-name and its item counts

how labels work, (example) file `images/nature/mountains/mountain_1.jpg` has labels:
- mountains
- nature
- images

--- 

requirements:
- Bootstrap v5, using builtin dark mode (default and only mode).
- Bootstrap Icons v1
- jQuery v4

concepts
- image and video (media) Viewer & file Properties
- Shortcuts & UX (visual hints for keyboard navigation (Arrows for prev/next, ESC to close, etc.) to ensure a "Windows Photos"-like experience)

features:
- rename (changes only the base name, preserving the original file extension.)
- delete
- labels
- filters (with include and exclude capability)
- sorters (name, mime, size, created_at, updated_at/modified_at)
- search (basename)

labels is like Tag clouds, sorted by path‑structure hierarchy from a relative path to the gallery entrypoint.
labels is a clickable tag badges derived from each file’s directory path.
each labels text is a link showing label-name and its item counts.
how labels work, (example) file images/nature/mountains/mountain_1.jpg has labels:
- images
- nature
- mountains

use mockup files for ui/ux references.
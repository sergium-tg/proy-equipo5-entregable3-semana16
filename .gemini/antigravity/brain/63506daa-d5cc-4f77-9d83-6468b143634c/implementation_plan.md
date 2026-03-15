# SEO and Metadata Configuration Plan

This plan outlines the steps to optimize the portfolio for search engines and social media sharing.

## Proposed Changes

### Metadata Implementation
- [MODIFY] `app/layout.tsx`: Add comprehensive global metadata (Title, Description, OpenGraph, Twitter, Icons, Robots).
- [MODIFY] `app/page.tsx`: Add home-specific metadata.
- [MODIFY] `app/experiencia/page.tsx`: Add experience-specific metadata.
- [MODIFY] `app/contacto/page.tsx`: Add contact-specific metadata.

### Asset Generation & Config
- [NEW] `public/manifest.json`: PWA configuration.
- [NEW] `public/robots.txt`: Search engine crawling rules.
- [NEW] `public/sitemap.xml`: Site structure for indexing.
- [NEW] Generate various icon sizes (16x16, 32x32, 180x180, 192x192, 512x512) with "IT" branding.

### Gallery Page (New)
- [MODIFY] `Navbar.tsx`: Add "Galería" link to navigation.
- [NEW] `GalleryGrid.tsx`: A responsive grid (Masonry or balanced) with Neumorphic photo frames.
- [NEW] `GalleryItem.tsx`: Individual photo component with hover effects and entrance animations.
- [NEW] `ImageLightbox.tsx`: A dedicated high-fidelity modal for viewing photos in large format with background blur.
- [NEW] `app/galeria/page.tsx`: Entry point for the gallery with specific SEO metadata.

## Verification Plan

### Manual Verification
- Inspect the `<head>` of each page to ensure tags are correctly rendered.
- Use a manifest validator to check `manifest.json`.
- Verify icons are correctly linked and displayed in the browser tab.

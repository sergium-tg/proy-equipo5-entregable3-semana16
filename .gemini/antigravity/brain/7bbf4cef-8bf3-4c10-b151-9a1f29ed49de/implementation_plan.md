# Implementation Plan - Contact Page and Global Styles

The goal is to recreate the contact page as per the provided images and update the overall website color scheme to match SIPRAC's branding (off-white, orange, black).

## Proposed Changes

### Global Styles & Layout
- #### [MODIFY] [globals.css](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/app/globals.css)
    - Set `--background` to a "blanco hueso" (e.g., `#FAF9F6` or `#F5F5F0`).
    - Define orange and black color variables in the `@theme` block.
- #### [MODIFY] [Header.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/ui/Header.tsx)
    - Update logo styling (Orange/Black text).
    - Update navigation links (hover effects, colors).
    - Change button to "Solicitar Asesoría" with orange styling.
- #### [MODIFY] [Footer.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/ui/Footer.tsx)
    - Set background to black and text to white/gray.

---

### Contact Page Implementation
- #### [NEW] [ContactHero.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/contact/ContactHero.tsx)
    - Simple hero with title and subtitle.
- #### [NEW] [ContactInfo.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/contact/ContactInfo.tsx)
    - Grid of cards for Phones, Emails, WhatsApp, and Hours.
- #### [NEW] [ContactForm.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/contact/ContactForm.tsx)
    - Detailed form with fields matching the reference.
- #### [NEW] [Location.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/contact/Location.tsx)
    - Map placeholder and coverage area details.
- #### [NEW] [FAQ.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/contact/FAQ.tsx)
    - Accordion-style FAQ section.
- #### [NEW] [page.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/app/contact/page.tsx)
    - Main entry point for the contact page.

## Verification Plan

### Automated Tests
- N/A (Mostly UI changes).

### Manual Verification
- Verify that the background is off-white across all pages.
- Check that the Header button is orange and says "Solicitar Asesoría".
- Verify the Contact page layout on desktop and mobile.
- Ensure the Footer is black.

# Community Section Implementation Plan

Replace the placeholder "Features" section with a high-fidelity, interactive "Community" section that fades in as the user scrolls.

## Proposed Changes

### [Component] [CommunitySection](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/community) [NEW]
- Create `CommunitySection.tsx` and `CommunitySection.module.css`.
- Implement a grid of interactive "Widgets":
    - **Solved Doubts**: Visualizing a Q&A community.
    - **Code Snippets**: Displaying shared logic from other devs.
    - **Reputation/Rating**: An interactive widget showing developer levels.
- Apply a `useIntersectionObserver` or scroll-progress based fade-in effect.

### [Page] [Home](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/page.tsx)
- [MODIFY] Replace the inline `<section>` placeholder with the new `CommunitySection`.

### [Component] [Hero](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/Hero.tsx)
- Ensure the Hero's fade-out timing aligns with the CommunitySection's fade-in.

## Verification Plan
- Scroll from Hero to Community and verify the section "wakes up" smoothly.
- Test interactivity on the widgets (hover effects, etc.).
- Ensure responsive layout works on mobile.

# Responsive Width Optimization

User reports mobile cards in "Asesorias" and "Servicios" are "too wide".
Also need to fix build error.

## Issues
1.  `CoreAdvisory` and `DetailedServices` cards might be `min-w-full`, preventing side-peeking or feeling like a "wall".
2.  Build failed (likely Type error in `FAQ.tsx` or `Services.tsx`).

## Proposed Changes
### [DetailedServices.tsx]
#### [MODIFY] [DetailedServices.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/services/DetailedServices.tsx)
-   Change `min-w-full` to `min-w-[85vw]` md:min-w-...
-   This restores the carousel "hint" that there is more content.

### [CoreAdvisory.tsx]
#### [MODIFY] [CoreAdvisory.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/services/CoreAdvisory.tsx)
-   Check width. If `min-w-[280px]` is too wide for very small screens (unlikely), or if margins are weird.
-   Maybe user means they occupy *too much* width and they want to see the next one? `min-w-[85vw]` is usually better than fixed px for responsiveness.

### [Fix Build]
-   Check `npm run build` output.
-   Fix TypeScript errors (likely missing `icon` prop in `FAQ` component interface definition if implicit, or import issues).

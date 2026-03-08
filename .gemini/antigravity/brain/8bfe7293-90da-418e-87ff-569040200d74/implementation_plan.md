# Hero Section Redesign - Implementation Plan

## Goal

Redesign the Hero section with:
- Fixed/sticky background image with subtle blur
- Parallax-like effect where background stays in place during scroll
- Two floating "island" cards with essential information
- Maintain neumorphic design language and orange accent colors

## User Review Required

> [!IMPORTANT]
> **Background Image**: I'll use the uploaded team photo for the background. The image will have a subtle blur overlay for depth and readability.

> [!IMPORTANT]
> **Floating Cards Content**: I'll create two cards with:
> 1. **Services Overview Card**: Brief highlight of key services with CTA
> 2. **Stats/Impact Card**: Quick metrics (projects completed, years of experience)

## Proposed Changes

### [MODIFY] [Hero.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/sections/Hero.tsx)

**Complete redesign** of the Hero component:

1. **Background Layer**:
   - Use `background-attachment: fixed` for sticky effect
   - Add uploaded team photo with `backdrop-blur-sm` overlay
   - Dark gradient overlay for text readability
   - Height: `min-h-screen` for full viewport coverage

2. **Floating Cards** (Neumorphic design):
   - Two glass-morphism cards positioned absolutely/relatively
   - Card 1 (left): Service highlights with icon + brief text + CTA button
   - Card 2 (right): Company stats with animated counters
   - `backdrop-filter: blur()` for frosted glass effect
   - Neumorphic shadows matching existing design
   - Responsive: Stack vertically on mobile

3. **Typography & Layout**:
   - Main headline centered over background
   - White text with text-shadow for readability
   - Cards positioned to create visual interest
   - Maintain existing orange accent color (#F97316)

4. **Technical Implementation**:
   - Keep existing `AnimatedCounter` component
   - Add CSS `background-attachment: fixed` for sticky effect
   - Use uploaded image: `uploaded_media_1769831919218.jpg`
   - Responsive breakpoints: mobile (stack), tablet (side-by-side)

## Verification Plan

### Manual Verification

**Test 1: Sticky Background Effect**
1. Start dev server: `npm run dev` in `/Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website`
2. Open `localhost:3000` in browser
3. Scroll down the page
4. **Expected**: Background image stays fixed while content scrolls over it

**Test 2: Floating Cards Visual**
1. On same page, observe the two floating cards
2. **Expected**: 
   - Cards have neumorphic shadows
   - Glass-morphism effect (semi-transparent with blur)
   - Content is readable
   - Orange accent colors present

**Test 3: Responsive Layout**
1. Open browser DevTools
2. Test mobile viewport (375px width)
3. Test tablet viewport (768px width)
4. Test desktop viewport (1440px width)
5. **Expected**: Cards stack on mobile, display side-by-side on larger screens

**Test 4: Background Image**
1. Verify uploaded image displays correctly
2. Check blur intensity is subtle but noticeable
3. **Expected**: Professional team photo visible with slight blur for depth

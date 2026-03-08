# Hero Section Modifications

The user wants to adjust the visual style of the Hero section. Specifically, applying a blur effect to the background, fixing a scrolling issue (likely caused by `fixed` background attachment), and changing the color of the "Nuestra Trayectoria" text.

## User Review Required
> [!NOTE]
> I am removing the `bg-fixed` / `background-attachment: fixed` property. This will make the background image scroll naturally with the page content, which resolves the "image moves too much" (jitter/parallax) issue.

## Proposed Changes

### Components

#### [MODIFY] [Hero.tsx](file:///Users/santiagovalencia/Documents/landing-siprac/landing-siprac/siprac-website/components/sections/Hero.tsx)
- Change `text-orange-400` to `text-black` for the "Nuestra Trayectoria" text.
- Consolidate background image handling.
- Remove `bg-fixed` and `backgroundAttachment: 'fixed'`.
- Apply `blur-sm` or distinct `filter: blur()` to the background image container.

## Verification Plan

### Manual Verification
- Run the dev server (`npm run dev` is already running).
- Open the browser at `http://localhost:3000`.
- Verify the Hero section background is blurred.
- Scroll down and verify the background image scrolls with the page (doesn't have the "moving" fixed effect).
- Verify "Nuestra Trayectoria" text is black.

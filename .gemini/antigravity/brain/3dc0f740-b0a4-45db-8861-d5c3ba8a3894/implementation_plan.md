# Full Auth UI – Implementation Plan

Complete implementation of a production-quality authentication interface with Hero, sliding overlay, and form components in Next.js 15+ / TypeScript / CSS Modules.

## Proposed Changes

---

### Config

#### [NEW] [tsconfig.json](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/tsconfig.json)
Path alias `@/*` → `./src/*`, strict mode, JSX preserve.

#### [NEW] [next.config.ts](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/next.config.ts)
Minimal config, no extra plugins needed.

---

### Design System

#### [MODIFY] [variables.css](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/styles/variables.css)
Dark palette: `--color-bg: #0a0a0f`, indigo/violet accents (`#6366f1`, `#8b5cf6`). Tokens for surface, border, text, error, success.

#### [MODIFY] [animations.css](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/styles/animations.css)
Full keyframes: `float`, `glow`, `slideInRight`, `fadeInUp`, `shake`, `shimmer`, `gradientShift`, `pulse`.

#### [MODIFY] [globals.css](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/globals.css)
Import Inter from Google Fonts, CSS resets, scrollbar styling.

---

### App Layer

#### [MODIFY] [page.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/app/page.tsx)
`'use client'` — manages `isAuthOpen` and `authMode` state; passes handlers to Hero and AuthOverlay.

---

### Hero

#### [MODIFY] [Hero.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/Hero.tsx)
Accepts `onLoginClick` / `onSignUpClick`. Composes AnimatedBackground + HeroTitle + HeroButtons.

#### [MODIFY] [Hero.module.css](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/Hero.module.css)
Full-viewport, center-align content, z-index layering.

#### [MODIFY] [AnimatedBackground.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/components/AnimatedBackground.tsx)
CSS radial-gradient orbs animated with `gradientShift`, subtle star/particle layer.

#### [MODIFY] [HeroTitle.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/components/HeroTitle.tsx)
`fadeInUp` stagger with `animation-delay` per element. Triple-click easter egg changes accent color.

#### [MODIFY] [HeroButtons.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/hero/components/HeroButtons.tsx)
Two buttons with `float` + `glow` infinite animations. Glow color distinct per button.

---

### Auth

#### [MODIFY] [AuthOverlay.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/AuthOverlay.tsx)
Full-screen backdrop, `backdrop-filter: blur(12px)`, ESC key listener, click-outside. Renders `AuthSlidingPanel`.

#### [MODIFY] [AuthSlidingPanel.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/AuthSlidingPanel.tsx)
450px wide, slides from right with `cubic-bezier(0.16, 1, 0.3, 1)`. Mode-switch transition (fade + slide).

#### [MODIFY] [AuthSlidingPanel.module.css](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/AuthSlidingPanel.module.css)
Panel layout, dark glass morphism, scrollable content.

#### [NEW] [FormInput.module.css](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/FormInput.module.css)
Floating label, animated gradient border on focus, error shake animation.

#### [MODIFY] [FormInput.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/FormInput.tsx)
Icon slot, floating label, error message with fade-in, `shake` animation on invalid submit.

#### [MODIFY] [LoginForm.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/LoginForm.tsx)
Email + Password inputs, "Forgot password?" link, submit with loading spinner.

#### [MODIFY] [RegisterForm.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/RegisterForm.tsx)
Name + Email + Password (+ strength meter) + Confirm Password + T&C checkbox with ripple.

#### [NEW] [PasswordStrength.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/PasswordStrength.tsx)
Animated 4-bar strength meter that evaluates length, symbols, numbers.

#### [MODIFY] [SocialAuth.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/SocialAuth.tsx)
GitHub + Google buttons with inline SVG icons and hover glow.

---

### Shared

#### [MODIFY] [Button.tsx](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/shared/Button/Button.tsx)
Add `loading` prop with spinner, `size` prop.

#### [MODIFY] [Button.module.css](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/shared/Button/Button.module.css)
Gradient primary button, hover glow, spinner keyframe.

---

## Verification Plan

### Automated
```bash
# Type check (no errors)
npx tsc --noEmit

# Build (no errors)
npm run build
```

### Browser
- `npm run dev` → open `http://localhost:3000`
- Hero renders with animated background and floating buttons
- Click "Sign In" → overlay slides in from right
- Click "Create Account" → overlay opens in register mode
- Switch between modes → smooth transition
- Click outside / press ESC → overlay closes
- Fill form with invalid data → shake + error messages appear
- Password strength meter reacts live

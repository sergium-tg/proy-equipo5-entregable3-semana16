# Full Auth UI Implementation

## Config & Setup
- [ ] `tsconfig.json` — TypeScript config with `@/*` alias
- [ ] `next.config.ts` — Next.js config
- [ ] `.eslintrc.json` — ESLint config

## Styles
- [ ] `src/styles/variables.css` — Design tokens (colors, fonts, spacing)
- [ ] `src/styles/animations.css` — All keyframe animations
- [ ] `src/app/globals.css` — Global resets + font import

## App Layer
- [ ] `src/app/page.tsx` — State management, openAuth, pass props

## Hero Components
- [ ] `src/components/hero/Hero.tsx` — Props: onLoginClick, onSignUpClick
- [ ] `src/components/hero/Hero.module.css` — Full layout styles
- [ ] `src/components/hero/components/AnimatedBackground.tsx` — Canvas/CSS particle effect
- [ ] `src/components/hero/components/HeroTitle.tsx` — Stagger fade-in title
- [ ] `src/components/hero/components/HeroButtons.tsx` — Floating animated buttons

## Auth Components
- [ ] `src/components/auth/AuthOverlay.tsx` — Full-screen backdrop + ESC/click-outside
- [ ] `src/components/auth/AuthSlidingPanel.tsx` — Slide from right, mode switcher
- [ ] `src/components/auth/AuthSlidingPanel.module.css` — Panel styles
- [ ] `src/components/auth/components/LoginForm.tsx` — Email, Password, forgot, submit spinner
- [ ] `src/components/auth/components/RegisterForm.tsx` — Name, Email, Password+strength, confirm, checkbox
- [ ] `src/components/auth/components/SocialAuth.tsx` — GitHub, Google buttons with SVG icons
- [ ] `src/components/auth/components/FormInput.tsx` — Floating label, icon, error shake
- [ ] `src/components/auth/components/FormInput.module.css` — Input styles
- [ ] `src/components/auth/components/PasswordStrength.tsx` — Animated strength meter

## Shared Components
- [ ] `src/components/shared/Button/Button.tsx` — Variants: primary, outline, ghost + loading
- [ ] `src/components/shared/Button/Button.module.css`
- [ ] `src/components/shared/Button/types.ts`

## Hooks
- [ ] `src/hooks/useAuth.ts` — Login, register, logout state
- [ ] `src/hooks/useClickOutside.ts` — Generic click-outside

## Types
- [ ] `src/types/auth.types.ts`
- [ ] `src/types/shared.types.ts`

## Verification
- [ ] `npm run build` passes with no errors
- [ ] `npm run dev` starts and renders visually

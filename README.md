# CSAT Mentor — Final pinned cinematic build

This build uses one pinned viewport/stage with seven overlapping scenes. Scroll progress drives the mentor, cards, typography, lighting, and scene index through Framer Motion.

## Actual React + Framer Motion
`src/main.jsx` uses `motion`, `useScroll`, `useSpring`, `useTransform`, and `useMotionValueEvent`.

## Direct preview
`preview.html` is self-contained and embeds all mentor PNGs, so it works when opened directly on Android without relative-asset path failures.

## Scenes
1. Hero
2. AI Mentor / chat
3. Real CSAT practice / PYQ
4. Personalised analytics
5. Ecosystem / features
6. Student testimonials
7. Final CTA

## Run
`npm install`
`npm run dev`

Optional production motion assets:
`public/mentor/hero.webm`, `explain.webm`, `point.webm`, `think.webm`, `cta.webm`.

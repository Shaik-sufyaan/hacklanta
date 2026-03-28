// Animation constants — used in both Framer Motion (JS) and Three.js (hex numbers)

export const COLORS = {
  bg: 0x0d1117,
  accent: 0x38bdf8,   // sky blue
  teal: 0x2dd4bf,     // teal
  soft: 0x7dd3fc,     // light sky
  white: 0xf0f6fc,
  muted: 0x8b949e,
  glow: 0x38bdf8,
  dark: 0x161b22,
} as const;

// CSS hex strings for Framer Motion / Tailwind use
export const CSS_COLORS = {
  bg: '#0d1117',
  accent: '#38bdf8',
  teal: '#2dd4bf',
  soft: '#7dd3fc',
  text: '#f0f6fc',
  muted: '#8b949e',
  glass: 'rgba(255,255,255,0.04)',
  glassBorder: 'rgba(56,189,248,0.15)',
  glow: 'rgba(56,189,248,0.25)',
  glowTeal: 'rgba(45,212,191,0.2)',
} as const;

// Cubic bezier easing curves (Framer Motion format)
export const EASING = {
  spring: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  dramatic: [0.7, 0, 0.3, 1] as [number, number, number, number],
  snappy: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
} as const;

export const DURATIONS = {
  fast: 0.2,
  normal: 0.5,
  slow: 1.0,
  scene: 1.5,
} as const;

// 9 camera positions — one per scene
export const CAMERA_PRESETS = [
  { position: [0, 0, 6] as [number, number, number], fov: 60 },   // 0: Hero
  { position: [0, 2, 8] as [number, number, number], fov: 55 },   // 1: Problem
  { position: [0, 0, 5] as [number, number, number], fov: 58 },   // 2: AI Takeover
  { position: [0, 0, 5] as [number, number, number], fov: 55 },   // 3: Training
  { position: [0, 0, 7] as [number, number, number], fov: 50 },   // 4: Actions
  { position: [0, 0, 6] as [number, number, number], fov: 55 },   // 5: Global
  { position: [0, 0, 6] as [number, number, number], fov: 52 },   // 6: Dashboard
  { position: [0, 0, 7] as [number, number, number], fov: 55 },   // 7: Comparison
  { position: [0, 0, 4] as [number, number, number], fov: 45 },   // 8: CTA (zoom in)
] as const;

export const TOTAL_SCENES = 9;

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
  stagger: 0.08,
} as const;

// Scroll thresholds — progress value at which each scene becomes "active"
export const SCENE_THRESHOLDS = [0, 0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88] as const;

// 9 camera positions — one per scene
// position: [x, y, z], fov in degrees, lerpFactor controls blend speed
export const CAMERA_PRESETS = [
  { position: [0, 0, 6]  as [number, number, number], fov: 60, lerpFactor: 0.04 },  // 0: Hero
  { position: [0, 2, 8]  as [number, number, number], fov: 55, lerpFactor: 0.03 },  // 1: Problem
  { position: [0, 0, 5]  as [number, number, number], fov: 58, lerpFactor: 0.05 },  // 2: AI Takeover
  { position: [0, 1, 5]  as [number, number, number], fov: 55, lerpFactor: 0.04 },  // 3: Training
  { position: [0, 0, 7]  as [number, number, number], fov: 50, lerpFactor: 0.03 },  // 4: Actions
  { position: [0, 0, 6]  as [number, number, number], fov: 55, lerpFactor: 0.04 },  // 5: Global
  { position: [0, 0.5, 6] as [number, number, number], fov: 52, lerpFactor: 0.04 }, // 6: Dashboard
  { position: [0, 0, 7]  as [number, number, number], fov: 55, lerpFactor: 0.03 },  // 7: Comparison
  { position: [0, 0, 4]  as [number, number, number], fov: 45, lerpFactor: 0.06 },  // 8: CTA (zoom in)
] as const;

export const TOTAL_SCENES = 9;

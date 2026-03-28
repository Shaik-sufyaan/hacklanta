'use client';

// Call this once on the client before using ScrollTrigger
// Import lazily to avoid SSR issues
export async function registerGSAP() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

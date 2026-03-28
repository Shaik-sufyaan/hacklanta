'use client';

import { useEffect, useRef } from 'react';
import { useLandingStore } from '@/stores/landingStore';
import { TOTAL_SCENES } from './config';

export function useScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setScene = useLandingStore((s) => s.setScene);

  useEffect(() => {
    if (!containerRef.current) return;

    let gsap: typeof import('gsap').gsap;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    let trigger: ReturnType<typeof ScrollTrigger.create> | null = null;

    (async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          // Guard: progress can be NaN on some browsers before layout is complete
          if (!Number.isFinite(self.progress)) {
            console.warn('[useScrollProgress] Non-finite scroll progress detected, skipping frame');
            return;
          }
          const total = self.progress * TOTAL_SCENES;
          const sceneIndex = Math.min(Math.floor(total), TOTAL_SCENES - 1);
          const sceneProgress = Math.min(Math.max(total - Math.floor(total), 0), 1);
          setScene(sceneIndex, sceneProgress);
        },
      });
    })();

    return () => {
      trigger?.kill();
    };
  }, [setScene]);

  return containerRef;
}

'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useScrollProgress } from '@/animations/useScrollProgress';
import { useLandingStore } from '@/stores/landingStore';
import { LandingNav } from '@/components/sections/LandingNav';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { AITakeoverSection } from '@/components/sections/AITakeoverSection';
import { TrainingSection } from '@/components/sections/TrainingSection';
import { ActionsSection } from '@/components/sections/ActionsSection';
import { GlobalSection } from '@/components/sections/GlobalSection';
import { DashboardSection } from '@/components/sections/DashboardSection';
import { ComparisonSection } from '@/components/sections/ComparisonSection';
import { CTASection } from '@/components/sections/CTASection';

// Three.js canvas — never server-rendered
const SceneCanvas = dynamic(
  () => import('@/components/3d/SceneCanvas').then((m) => ({ default: m.SceneCanvas })),
  { ssr: false }
);

export default function LandingPage() {
  const containerRef = useScrollProgress();
  const isMobile = useLandingStore((s) => s.isMobile);

  // Apply dark theme to body for this page only
  useEffect(() => {
    document.body.classList.add('landing-page');
    document.documentElement.setAttribute('data-theme', 'landing');
    return () => {
      document.body.classList.remove('landing-page');
      document.documentElement.removeAttribute('data-theme');
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', background: '#0d1117', color: '#f0f6fc' }}>
      {/* Fixed navigation */}
      <LandingNav />

      {/* Fixed 3D canvas — sits behind all HTML sections */}
      {!isMobile && <SceneCanvas />}

      {/* Mobile fallback gradient */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(56,189,248,0.12) 0%, #0d1117 60%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* 9 scroll sections × 100vh = 900vh */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <ProblemSection />
        <AITakeoverSection />
        <TrainingSection />
        <ActionsSection />
        <GlobalSection />
        <DashboardSection />
        <ComparisonSection />
        <CTASection />
      </main>
    </div>
  );
}

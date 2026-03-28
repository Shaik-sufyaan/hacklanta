'use client';

import { Suspense, useMemo } from 'react';
import { useLandingStore } from '@/stores/landingStore';
import { AIOrb } from './AIOrb';
import { PhoneRain } from './PhoneRain';
import { NeuralNetwork } from './NeuralNetwork';
import { Globe } from './Globe';
import { FloatingPanels } from './FloatingPanels';

// Scene components indexed by scene number
// Scenes 2 (AI Takeover) reuses AIOrb, Scene 4 (Actions) uses AIOrb, Scene 7 (Comparison) uses AIOrb
function SceneContent({ sceneIndex, sceneProgress }: { sceneIndex: number; sceneProgress: number }) {
  switch (sceneIndex) {
    case 0: return <AIOrb progress={sceneProgress} phase="hero" />;
    case 1: return <PhoneRain progress={sceneProgress} />;
    case 2: return <AIOrb progress={sceneProgress} phase="takeover" />;
    case 3: return <NeuralNetwork progress={sceneProgress} />;
    case 4: return <AIOrb progress={sceneProgress} phase="actions" />;
    case 5: return <Globe progress={sceneProgress} />;
    case 6: return <FloatingPanels progress={sceneProgress} />;
    case 7: return <AIOrb progress={sceneProgress} phase="comparison" />;
    case 8: return <AIOrb progress={sceneProgress} phase="cta" />;
    default: return <AIOrb progress={sceneProgress} phase="hero" />;
  }
}

export function SceneSwitcher() {
  const sceneIndex = useLandingStore((s) => s.sceneIndex);
  const sceneProgress = useLandingStore((s) => s.sceneProgress);

  return (
    <Suspense fallback={null}>
      <SceneContent sceneIndex={sceneIndex} sceneProgress={sceneProgress} />
    </Suspense>
  );
}

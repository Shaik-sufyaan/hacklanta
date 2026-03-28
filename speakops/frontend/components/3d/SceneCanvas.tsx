'use client';

import { Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Environment } from '@react-three/drei';
import { SceneSwitcher } from './SceneSwitcher';
import { CameraController } from './CameraController';
import { useLandingStore } from '@/stores/landingStore';

// Catches WebGL / R3F errors so the rest of the landing page keeps working
class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[SceneCanvas] WebGL error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) return null; // silently degrade — HTML sections still show
    return this.props.children;
  }
}

export function SceneCanvas() {
  const isMobile = useLandingStore((s) => s.isMobile);

  if (isMobile) return null;

  return (
    <CanvasErrorBoundary>
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0,
        background: '#0d1117',
        pointerEvents: 'none',
      }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#2dd4bf" />

      {/* Scene management */}
      <CameraController />

      <Suspense fallback={null}>
        <SceneSwitcher />
      </Suspense>
    </Canvas>
    </CanvasErrorBoundary>
  );
}

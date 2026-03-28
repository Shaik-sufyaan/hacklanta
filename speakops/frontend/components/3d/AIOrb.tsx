'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

type OrbPhase = 'hero' | 'takeover' | 'actions' | 'comparison' | 'cta';

interface AIorbProps {
  progress: number;
  phase: OrbPhase;
}

// Individual call particle moving toward the orb
function CallParticle({ offset, speed }: { offset: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const startPos = useMemo(() => {
    const angle = (offset / 20) * Math.PI * 2;
    const radius = 3 + Math.random() * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 3,
      Math.sin(angle) * radius
    );
  }, [offset]);

  const t = useRef(Math.random());

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    t.current += delta * speed * 0.3;
    if (t.current > 1) t.current = 0;

    meshRef.current.position.lerp(
      t.current < 0.5
        ? startPos
        : new THREE.Vector3(0, 0, 0),
      t.current < 0.5 ? 0 : 0.08
    );
    meshRef.current.position.x = startPos.x * (1 - t.current);
    meshRef.current.position.y = startPos.y * (1 - t.current);
    meshRef.current.position.z = startPos.z * (1 - t.current);
    const scale = 1 - t.current * 0.8;
    meshRef.current.scale.setScalar(scale * 0.06);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={0x38bdf8} transparent opacity={0.7} />
    </mesh>
  );
}

// Sound wave ring
function WaveRing({ radius, delay }: { radius: number; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = (clock.elapsedTime * 0.8 + delay) % 3;
    const pulse = Math.sin(t * Math.PI);
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.3;
    meshRef.current.scale.setScalar(1 + pulse * 0.15);
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 8, 64]} />
      <meshBasicMaterial color={0x38bdf8} transparent opacity={0.2} />
    </mesh>
  );
}

export function AIOrb({ progress, phase }: AIorbProps) {
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Phase-based orb properties
  const orbConfig = useMemo(() => {
    switch (phase) {
      case 'hero':    return { color: '#38bdf8', emissive: '#0ea5e9', distort: 0.4 + progress * 0.3, size: 1 };
      case 'takeover': return { color: '#2dd4bf', emissive: '#14b8a6', distort: 0.5, size: 1.1 };
      case 'actions': return { color: '#38bdf8', emissive: '#0ea5e9', distort: 0.3, size: 0.9 };
      case 'comparison': return { color: '#7dd3fc', emissive: '#38bdf8', distort: 0.25, size: 0.8 };
      case 'cta':     return { color: '#38bdf8', emissive: '#0ea5e9', distort: 0.6, size: 1 + progress * 4 };
      default:        return { color: '#38bdf8', emissive: '#0ea5e9', distort: 0.4, size: 1 };
    }
  }, [phase, progress]);

  useFrame(({ clock }) => {
    if (!orbRef.current || !glowRef.current) return;
    const t = clock.elapsedTime;

    // Subtle rotation
    orbRef.current.rotation.y = t * 0.15;
    orbRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;

    // Glow pulse
    const glowScale = 1.18 + Math.sin(t * 1.2) * 0.06;
    glowRef.current.scale.setScalar(glowScale);
    (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(t * 0.8) * 0.03;

    // Update distort dynamically
    if (materialRef.current) {
      materialRef.current.distort = orbConfig.distort + Math.sin(t * 0.6) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group>
        {/* Outer glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[orbConfig.size * 1.5, 32, 32]} />
          <meshBasicMaterial color={0x38bdf8} transparent opacity={0.07} side={THREE.BackSide} />
        </mesh>

        {/* Main orb */}
        <mesh ref={orbRef}>
          <sphereGeometry args={[orbConfig.size, 64, 64]} />
          <MeshDistortMaterial
            ref={materialRef}
            color={orbConfig.color}
            emissive={orbConfig.emissive}
            emissiveIntensity={0.4}
            distort={orbConfig.distort}
            speed={2.5}
            roughness={0.05}
            metalness={0.6}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Sound wave rings — shown in hero and takeover phases */}
        {(phase === 'hero' || phase === 'takeover') && (
          <>
            <WaveRing radius={1.4} delay={0} />
            <WaveRing radius={1.9} delay={0.8} />
            <WaveRing radius={2.4} delay={1.6} />
            <WaveRing radius={2.9} delay={2.4} />
          </>
        )}

        {/* Call particles — hero and takeover */}
        {(phase === 'hero' || phase === 'takeover') &&
          Array.from({ length: 20 }, (_, i) => (
            <CallParticle key={i} offset={i} speed={0.8 + (i % 5) * 0.2} />
          ))}
      </group>
    </Float>
  );
}

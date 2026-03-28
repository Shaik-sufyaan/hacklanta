'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';

const DOT_COUNT = 3200;
const GLOBE_RADIUS = 2.2;

// Fibonacci sphere distribution for even dot spread
function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

// Random point on sphere surface
function randomSpherePoint(radius: number): THREE.Vector3 {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta) * radius,
    Math.cos(phi) * radius,
    Math.sin(phi) * Math.sin(theta) * radius
  );
}

// Arc between two globe points
function GlobeArc({ from, to, delay }: { from: THREE.Vector3; to: THREE.Vector3; delay: number }) {
  const lineRef = useRef<any>(null);
  const mid = useMemo(() => {
    const m = from.clone().lerp(to, 0.5);
    m.normalize().multiplyScalar(GLOBE_RADIUS * 1.5);
    return m;
  }, [from, to]);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const t = ((clock.elapsedTime * 0.3 + delay) % 3) / 3;
    const pulse = Math.sin(t * Math.PI);
    // Animate opacity
    if (lineRef.current.material) {
      lineRef.current.material.opacity = pulse * 0.55;
    }
  });

  return (
    <QuadraticBezierLine
      ref={lineRef}
      start={from}
      end={to}
      mid={mid}
      color="#38bdf8"
      lineWidth={1.2}
      transparent
      opacity={0.3}
    />
  );
}

interface GlobeProps {
  progress: number;
}

export function Globe({ progress }: GlobeProps) {
  const globeRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => fibonacciSphere(DOT_COUNT, GLOBE_RADIUS), []);

  const arcPairs = useMemo(() =>
    Array.from({ length: 6 }, () => ({
      from: randomSpherePoint(GLOBE_RADIUS),
      to: randomSpherePoint(GLOBE_RADIUS),
    })), []);

  useFrame(({ clock }) => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y = clock.elapsedTime * 0.09;
  });

  return (
    <group>
      {/* Dot cloud globe */}
      <points ref={globeRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={0x38bdf8}
          size={0.025}
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Connection arcs */}
      {arcPairs.map((pair, i) => (
        <GlobeArc key={i} from={pair.from} to={pair.to} delay={i * 0.5} />
      ))}

      {/* Subtle glow sphere behind globe */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.15, 32, 32]} />
        <meshBasicMaterial color={0x38bdf8} transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

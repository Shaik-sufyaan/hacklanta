'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PHONE_COUNT = 22;

interface PhoneRainProps {
  progress: number;
}

function createPhoneData() {
  return Array.from({ length: PHONE_COUNT }, (_, i) => ({
    x: (Math.random() - 0.5) * 10,
    y: 8 + Math.random() * 14,
    z: (Math.random() - 0.5) * 4 - 1,
    rotX: Math.random() * Math.PI * 2,
    rotZ: Math.random() * Math.PI * 2,
    speed: 0.02 + Math.random() * 0.025,
    rotSpeedX: (Math.random() - 0.5) * 0.02,
    rotSpeedZ: (Math.random() - 0.5) * 0.015,
  }));
}

export function PhoneRain({ progress }: PhoneRainProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const phoneData = useMemo(() => createPhoneData(), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize positions
  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.elapsedTime;

    phoneData.forEach((phone, i) => {
      // Fall
      phone.y -= phone.speed;
      if (phone.y < -8) {
        phone.y = 12 + Math.random() * 8;
        phone.x = (Math.random() - 0.5) * 10;
      }

      // Tumble
      phone.rotX += phone.rotSpeedX;
      phone.rotZ += phone.rotSpeedZ;

      dummy.position.set(phone.x, phone.y, phone.z);
      dummy.rotation.set(phone.rotX, 0, phone.rotZ);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Pulse red alarm light
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(t * 6) * 1.2;
    }
  });

  return (
    <group>
      {/* Alarm light */}
      <pointLight ref={lightRef} position={[0, 0, 2]} color="#ef4444" intensity={2} distance={8} />
      <ambientLight intensity={0.1} color="#1e1e2e" />

      {/* Phone instances — thin portrait boxes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, PHONE_COUNT]}>
        <boxGeometry args={[0.35, 0.7, 0.06]} />
        <meshStandardMaterial
          color="#1e293b"
          emissive="#334155"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>

      {/* Screen glow (red missed call) — separate smaller instances */}
      <instancedMesh args={[undefined, undefined, PHONE_COUNT]}>
        <boxGeometry args={[0.28, 0.55, 0.065]} />
        <meshBasicMaterial color="#7f1d1d" transparent opacity={0.6} />
      </instancedMesh>
    </group>
  );
}

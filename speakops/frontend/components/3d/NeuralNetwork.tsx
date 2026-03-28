'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const GRID_X = 5;
const GRID_Y = 5;
const GRID_Z = 2;
const NODE_COUNT = GRID_X * GRID_Y * GRID_Z;
const EDGE_COUNT = 60;

interface NeuralNetworkProps {
  progress: number;
}

function buildNodes(): THREE.Vector3[] {
  const nodes: THREE.Vector3[] = [];
  for (let z = 0; z < GRID_Z; z++) {
    for (let y = 0; y < GRID_Y; y++) {
      for (let x = 0; x < GRID_X; x++) {
        nodes.push(
          new THREE.Vector3(
            (x - (GRID_X - 1) / 2) * 1.1 + (Math.random() - 0.5) * 0.3,
            (y - (GRID_Y - 1) / 2) * 1.0 + (Math.random() - 0.5) * 0.3,
            (z - (GRID_Z - 1) / 2) * 1.5 + (Math.random() - 0.5) * 0.2
          )
        );
      }
    }
  }
  return nodes;
}

function buildEdges(nodes: THREE.Vector3[]): Array<[THREE.Vector3, THREE.Vector3]> {
  const edges: Array<[THREE.Vector3, THREE.Vector3]> = [];
  const used = new Set<string>();
  while (edges.length < EDGE_COUNT) {
    const a = Math.floor(Math.random() * NODE_COUNT);
    const b = Math.floor(Math.random() * NODE_COUNT);
    const key = [Math.min(a, b), Math.max(a, b)].join('-');
    if (a !== b && !used.has(key)) {
      used.add(key);
      edges.push([nodes[a], nodes[b]]);
    }
  }
  return edges;
}

// Particle traveling along an edge
function EdgeParticle({ start, end, offset }: { start: THREE.Vector3; end: THREE.Vector3; offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const t = useRef(offset);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    t.current = (t.current + delta * 0.5) % 1;
    meshRef.current.position.lerpVectors(start, end, t.current);
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity = Math.sin(t.current * Math.PI) * 0.9;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={0x38bdf8} transparent opacity={0.8} />
    </mesh>
  );
}

export function NeuralNetwork({ progress }: NeuralNetworkProps) {
  const nodes = useMemo(() => buildNodes(), []);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Slow rotation
    groupRef.current.rotation.y = clock.elapsedTime * 0.08;

    // Pulse nodes
    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(clock.elapsedTime * 1.5 + i * 0.4) * 0.4;
    });
  });

  // Sample edges for particles (every 3rd edge)
  const particleEdges = useMemo(() => edges.filter((_, i) => i % 3 === 0), [edges]);

  return (
    <group ref={groupRef}>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color="#38bdf8"
          lineWidth={0.4}
          transparent
          opacity={0.18}
        />
      ))}

      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          ref={(el) => { if (el) nodeRefs.current[i] = el; }}
        >
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0ea5e9"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      ))}

      {/* Traveling particles */}
      {particleEdges.map(([start, end], i) => (
        <EdgeParticle key={i} start={start} end={end} offset={i / particleEdges.length} />
      ))}
    </group>
  );
}

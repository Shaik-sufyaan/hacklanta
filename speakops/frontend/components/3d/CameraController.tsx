'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLandingStore } from '@/stores/landingStore';
import { CAMERA_PRESETS } from '@/animations/config';

export function CameraController() {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 6));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Read directly from store without triggering React re-renders
    const { sceneIndex, sceneProgress } = useLandingStore.getState();

    const current = CAMERA_PRESETS[sceneIndex];
    const next = CAMERA_PRESETS[Math.min(sceneIndex + 1, CAMERA_PRESETS.length - 1)];

    // Interpolate between camera presets based on scene progress
    targetPos.current.set(
      current.position[0] + (next.position[0] - current.position[0]) * sceneProgress,
      current.position[1] + (next.position[1] - current.position[1]) * sceneProgress,
      current.position[2] + (next.position[2] - current.position[2]) * sceneProgress
    );

    // Smooth camera movement
    camera.position.lerp(targetPos.current, 0.04);
    camera.lookAt(targetLookAt.current);

    // Interpolate FOV
    const targetFov = current.fov + (next.fov - current.fov) * sceneProgress;
    if ('fov' in camera) {
      (camera as THREE.PerspectiveCamera).fov +=
        (targetFov - (camera as THREE.PerspectiveCamera).fov) * 0.04;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null;
}

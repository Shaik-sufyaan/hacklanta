import { create } from 'zustand';

interface LandingState {
  sceneIndex: number;
  sceneProgress: number;
  previousSceneIndex: number;
  isLoaded: boolean;
  isMobile: boolean;
  isReducedMotion: boolean;
  setScene: (index: number, progress: number) => void;
  setLoaded: (loaded: boolean) => void;
}

export const useLandingStore = create<LandingState>((set, get) => ({
  sceneIndex: 0,
  sceneProgress: 0,
  previousSceneIndex: 0,
  isLoaded: false,
  isMobile:
    typeof window !== 'undefined'
      ? window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) < 4
      : false,
  isReducedMotion:
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  setScene: (index, progress) =>
    set((state) => ({
      previousSceneIndex: state.sceneIndex,
      sceneIndex: index,
      sceneProgress: progress,
    })),
  setLoaded: (loaded) => set({ isLoaded: loaded }),
}));

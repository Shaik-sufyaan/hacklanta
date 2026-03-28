import { create } from 'zustand';

interface LandingState {
  sceneIndex: number;
  sceneProgress: number;
  isLoaded: boolean;
  isMobile: boolean;
  setScene: (index: number, progress: number) => void;
  setLoaded: (loaded: boolean) => void;
}

export const useLandingStore = create<LandingState>((set) => ({
  sceneIndex: 0,
  sceneProgress: 0,
  isLoaded: false,
  isMobile:
    typeof window !== 'undefined'
      ? window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) < 4
      : false,
  setScene: (index, progress) => set({ sceneIndex: index, sceneProgress: progress }),
  setLoaded: (loaded) => set({ isLoaded: loaded }),
}));

'use client';

import { create } from 'zustand';

interface SidebarState {
  isCollapsed: boolean;
  width: number;
  search: string;
  toggle: () => void;
  setSearch: (value: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  width: 304,
  search: '',
  toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setSearch: (search) => set({ search })
}));

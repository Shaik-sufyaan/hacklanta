'use client';

import { create } from 'zustand';

import { demoThreads } from '@/lib/mock-data';
import type { EvaMessage, EvaThread } from '@/types';

interface EvaChatState {
  isOpen: boolean;
  threads: EvaThread[];
  activeThreadId: string;
  toggleOpen: () => void;
  setActiveThreadId: (threadId: string) => void;
  addMessage: (threadId: string, message: EvaMessage) => void;
}

export const useEvaChatStore = create<EvaChatState>((set) => ({
  isOpen: true,
  threads: demoThreads,
  activeThreadId: demoThreads[0]?.id ?? '',
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveThreadId: (activeThreadId) => set({ activeThreadId }),
  addMessage: (threadId, message) =>
    set((state) => ({
      threads: state.threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              updatedAt: 'Just now',
              messages: [...thread.messages, message]
            }
          : thread
      )
    }))
}));

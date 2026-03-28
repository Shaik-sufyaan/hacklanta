'use client';

import { create } from 'zustand';

import { demoConversations } from '@/lib/mock-data';
import type { ConversationRecord } from '@/types';

interface ConversationsState {
  conversations: ConversationRecord[];
}

export const useConversationsStore = create<ConversationsState>(() => ({
  conversations: demoConversations
}));

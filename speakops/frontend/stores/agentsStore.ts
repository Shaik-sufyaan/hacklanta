'use client';

import { create } from 'zustand';

import { demoAgents } from '@/lib/mock-data';
import type { AgentSummary } from '@/types';

interface AgentsState {
  agents: AgentSummary[];
  selectedAgentId: string;
  setSelectedAgentId: (agentId: string) => void;
}

export const useAgentsStore = create<AgentsState>((set) => ({
  agents: demoAgents,
  selectedAgentId: demoAgents[0]?.id ?? '',
  setSelectedAgentId: (selectedAgentId) => set({ selectedAgentId })
}));

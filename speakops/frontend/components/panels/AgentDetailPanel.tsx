'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PanelShell } from '@/components/panels/PanelShell';
import { useAgentsStore } from '@/stores/agentsStore';

export function AgentDetailPanel() {
  const { agents, selectedAgentId, setSelectedAgentId } = useAgentsStore();
  const agent = agents.find((entry) => entry.id === selectedAgentId) ?? agents[0];

  if (!agent) {
    return null;
  }

  return (
    <PanelShell
      eyebrow="Agent"
      title={agent.name}
      description="Manage prompt, channels, connected tools, and phone assignments from one operator-friendly control surface."
    >
      <div className="flex flex-wrap gap-3">
        {agents.map((entry) => (
          <button
            key={entry.id}
            onClick={() => setSelectedAgentId(entry.id)}
            className={`rounded-full px-4 py-2 text-sm ${entry.id === agent.id ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line'}`}
          >
            {entry.name}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 rounded-3xl border border-line bg-white/70 p-5">
          <div className="flex items-center gap-3">
            <Badge>{agent.status}</Badge>
            <span className="text-sm text-slate-600">{agent.phoneNumber ?? 'No number assigned yet'}</span>
          </div>
          <p className="text-sm leading-7 text-slate-600">{agent.description}</p>
          <div className="flex flex-wrap gap-2">
            {agent.topIntents.map((intent) => (
              <Badge key={intent}>{intent}</Badge>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-line bg-accentSoft p-5">
          <p className="font-display text-xl text-ink">Channels and actions</p>
          <div className="flex flex-wrap gap-2">
            {agent.channels.map((channel) => (
              <Badge key={channel}>{channel}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Provision number</Button>
            <Button variant="secondary">Bind existing number</Button>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

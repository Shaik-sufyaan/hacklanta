'use client';

import { Badge } from '@/components/ui/badge';
import { PanelShell } from '@/components/panels/PanelShell';
import { useConversationsStore } from '@/stores/conversationsStore';

export function HistoryPanel() {
  const { conversations } = useConversationsStore();

  return (
    <PanelShell
      eyebrow="Calls"
      title="Call history and live monitoring"
      description="Track completed conversations, spot live calls, and keep transcripts close to the operators who need them."
    >
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div key={conversation.id} className="rounded-3xl border border-line bg-white/70 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-xl text-ink">{conversation.agentName}</p>
                <p className="mt-1 text-sm text-slate-600">{conversation.transcript}</p>
              </div>
              <Badge tone={conversation.live ? 'success' : 'default'}>
                {conversation.live ? 'Live' : conversation.channel}
              </Badge>
            </div>
            <div className="mt-4 flex gap-6 text-xs uppercase tracking-[0.2em] text-slate-500">
              <span>{conversation.durationLabel}</span>
              <span>{conversation.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

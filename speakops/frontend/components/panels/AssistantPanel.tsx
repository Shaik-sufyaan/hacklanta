'use client';

import Link from 'next/link';

import { PanelShell } from '@/components/panels/PanelShell';
import { useEvaChatStore } from '@/stores/evaChatStore';

export function AssistantPanel() {
  const { threads } = useEvaChatStore();

  return (
    <PanelShell
      eyebrow="EVA"
      title="Internal assistant sessions"
      description="Open persistent assistant threads that can navigate the workspace, summarize activity, and keep operators moving."
    >
      <div className="space-y-4">
        {threads.map((thread) => (
          <Link key={thread.id} href={`/assistant/${thread.id}`} className="block rounded-3xl border border-line bg-white/70 p-5">
            <p className="font-display text-xl text-ink">{thread.title}</p>
            <p className="mt-1 text-sm text-slate-600">{thread.messages.at(-1)?.content}</p>
          </Link>
        ))}
      </div>
    </PanelShell>
  );
}

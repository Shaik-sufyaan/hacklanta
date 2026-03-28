'use client';

import Link from 'next/link';

import { useEvaChatStore } from '@/stores/evaChatStore';

export default function AssistantSessionsPage() {
  const { threads } = useEvaChatStore();

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="font-display text-5xl text-ink">EVA sessions</h1>
      <div className="mt-8 space-y-4">
        {threads.map((thread) => (
          <Link key={thread.id} href={`/assistant/${thread.id}`} className="block rounded-[28px] border border-line bg-white/70 p-6 shadow-float">
            <p className="font-display text-2xl text-ink">{thread.title}</p>
            <p className="mt-2 text-sm text-slate-600">{thread.messages.at(-1)?.content}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

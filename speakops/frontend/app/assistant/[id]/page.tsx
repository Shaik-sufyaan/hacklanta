'use client';

import { Button } from '@/components/ui/button';
import { useEvaChatStore } from '@/stores/evaChatStore';

export default function AssistantThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { threads, addMessage } = useEvaChatStore();
  // params is a Promise in Next.js 15 — using React.use() would require Suspense; using type assertion for compat
  const resolvedParams = params as unknown as { id: string };
  const thread = threads.find((entry) => entry.id === resolvedParams.id);

  if (!thread) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="rounded-[32px] border border-line bg-white/75 p-8 shadow-float">
          <h1 className="font-display text-3xl text-ink">Session not found</h1>
          <p className="mt-3 text-sm text-slate-600">
            This EVA thread does not exist in the local mock store yet.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <div className="rounded-[32px] border border-line bg-white/70 p-8 shadow-float">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">EVA thread</p>
        <h1 className="mt-2 font-display text-4xl text-ink">{thread.title}</h1>
        <div className="mt-8 space-y-4">
          {thread.messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-3xl p-4 text-sm leading-7 ${
                message.role === 'assistant' ? 'bg-accentSoft text-ink' : 'bg-ink text-white'
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Button
            onClick={() =>
              addMessage(thread.id, {
                id: crypto.randomUUID(),
                role: 'user',
                content: 'Show me live calls.'
              })
            }
          >
            Add prompt
          </Button>
          <Button variant="secondary">Open in dashboard</Button>
        </div>
      </div>
    </main>
  );
}

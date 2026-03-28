'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

import { useEvaChatStore } from '@/stores/evaChatStore';

export function EvaWidget() {
  const { isOpen, toggleOpen, threads, activeThreadId } = useEvaChatStore();
  const activeThread = threads.find((thread) => thread.id === activeThreadId) ?? threads[0];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleOpen}
        className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-ink text-white shadow-float"
      >
        <Sparkles className="h-6 w-6" />
      </button>
      {isOpen && activeThread ? (
        <div className="w-[320px] rounded-[28px] border border-line bg-white/95 p-5 shadow-float backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">EVA Assistant</p>
          <h3 className="mt-2 font-display text-xl text-ink">{activeThread.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{activeThread.messages.at(-1)?.content}</p>
          <Link
            href={`/assistant/${activeThread.id}`}
            className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            Open full session
          </Link>
        </div>
      ) : null}
    </div>
  );
}

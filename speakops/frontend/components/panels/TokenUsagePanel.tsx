'use client';

import { PanelShell } from '@/components/panels/PanelShell';
import { demoUsage } from '@/lib/mock-data';

export function TokenUsagePanel() {
  return (
    <PanelShell
      eyebrow="Usage"
      title="Token and session analytics"
      description="Watch provider spend, compare daily demand, and spot when operators should optimize prompts or routing."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-line bg-accentSoft p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Monthly tokens</p>
          <p className="mt-2 font-display text-4xl text-ink">921k</p>
        </div>
        <div className="rounded-3xl border border-line bg-white/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Top model</p>
          <p className="mt-2 font-display text-4xl text-ink">Claude</p>
        </div>
        <div className="rounded-3xl border border-line bg-white/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Refresh cadence</p>
          <p className="mt-2 font-display text-4xl text-ink">30s</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {demoUsage.map((point) => (
          <div key={point.date} className="flex items-center justify-between rounded-3xl border border-line bg-white/70 p-5">
            <p className="font-medium text-ink">{point.date}</p>
            <p className="text-sm text-slate-600">{point.tokens.toLocaleString()} tokens</p>
            <p className="text-sm text-slate-600">{point.sessions} sessions</p>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

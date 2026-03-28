'use client';

import { PanelShell } from '@/components/panels/PanelShell';
import { demoOrganizations } from '@/lib/mock-data';

export function AdminOrgDetailPanel() {
  const organization = demoOrganizations[0];

  return (
    <PanelShell
      eyebrow="Platform Admin"
      title={organization.name}
      description="Inspect organization-level agents, conversations, and traces from a single support-oriented workspace."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-white/70 p-5">
          <p className="font-display text-xl text-ink">Agent fleet</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {organization.agents} total agents are active across voice and web channels. Recent escalations are clustered around billing and appointment rescheduling.
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-accentSoft p-5">
          <p className="font-display text-xl text-ink">Trace inspector</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Execution `exec_001` used Claude Sonnet with 1,822 prompt tokens and 624 completion tokens.
          </p>
        </div>
      </div>
    </PanelShell>
  );
}

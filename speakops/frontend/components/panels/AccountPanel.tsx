'use client';

import { demoUser } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { PanelShell } from '@/components/panels/PanelShell';

export function AccountPanel() {
  return (
    <PanelShell
      eyebrow="Account"
      title="Workspace identity and team"
      description="Review the signed-in owner profile, invite teammates, and keep the workspace ready for operators and admins."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-white/70 p-5">
          <p className="font-display text-xl text-ink">{demoUser.name}</p>
          <p className="mt-1 text-sm text-slate-600">{demoUser.email}</p>
          <p className="mt-4 text-sm text-slate-600">
            Role: {demoUser.role} • Org: {demoUser.organizationName}
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-accentSoft p-5">
          <p className="font-display text-xl text-ink">Team actions</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button>Invite member</Button>
            <Button variant="secondary">Send password reset</Button>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

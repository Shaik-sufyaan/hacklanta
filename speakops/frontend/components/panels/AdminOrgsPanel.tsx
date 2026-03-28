'use client';

import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { PanelShell } from '@/components/panels/PanelShell';
import { demoOrganizations } from '@/lib/mock-data';

export function AdminOrgsPanel() {
  return (
    <PanelShell
      eyebrow="Platform Admin"
      title="Organizations overview"
      description="Browse customer workspaces, compare load, and jump into detail views when support or review is needed."
    >
      <div className="space-y-4">
        {demoOrganizations.map((organization) => (
          <Link
            key={organization.id}
            href="/dashboard?view=admin-org-detail"
            className="flex items-center justify-between rounded-3xl border border-line bg-white/70 p-5"
          >
            <div>
              <p className="font-display text-xl text-ink">{organization.name}</p>
              <p className="mt-1 text-sm text-slate-600">
                {organization.agents} agents • {organization.conversations} conversations
              </p>
            </div>
            <Badge>{organization.tier}</Badge>
          </Link>
        ))}
      </div>
    </PanelShell>
  );
}

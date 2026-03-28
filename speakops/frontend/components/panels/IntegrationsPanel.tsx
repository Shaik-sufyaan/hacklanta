'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PanelShell } from '@/components/panels/PanelShell';
import { demoIntegrations } from '@/lib/mock-data';

export function IntegrationsPanel() {
  return (
    <PanelShell
      eyebrow="Integrations"
      title="Connected business tools"
      description="Keep calendars, CRMs, messaging channels, and billing systems available to agents with a clean connection status board."
    >
      <div className="space-y-4">
        {demoIntegrations.map((integration) => (
          <div key={integration.provider} className="flex items-center justify-between rounded-3xl border border-line bg-white/70 p-5">
            <div>
              <p className="font-display text-xl text-ink">{integration.provider}</p>
              <p className="mt-1 text-sm text-slate-600">{integration.detail}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={integration.status === 'connected' ? 'success' : integration.status === 'pending' ? 'warning' : 'default'}>
                {integration.status}
              </Badge>
              <Button variant="secondary">Manage</Button>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

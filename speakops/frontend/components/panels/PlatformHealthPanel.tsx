'use client';

import { Badge } from '@/components/ui/badge';
import { PanelShell } from '@/components/panels/PanelShell';

const services = [
  { name: 'API', status: 'healthy', detail: 'Latency under 80ms across authenticated routes.' },
  { name: 'Voice', status: 'healthy', detail: 'Primary Vapi edge is stable.' },
  { name: 'Billing', status: 'degraded', detail: 'Webhook replay queue is above normal.' }
];

export function PlatformHealthPanel() {
  return (
    <PanelShell
      eyebrow="Platform Health"
      title="Operational heartbeat"
      description="Keep an eye on the surfaces that matter to a voice-agent platform before customers feel the problem."
    >
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between rounded-3xl border border-line bg-white/70 p-5">
            <div>
              <p className="font-display text-xl text-ink">{service.name}</p>
              <p className="mt-1 text-sm text-slate-600">{service.detail}</p>
            </div>
            <Badge tone={service.status === 'healthy' ? 'success' : 'warning'}>{service.status}</Badge>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

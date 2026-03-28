'use client';

import { Badge } from '@/components/ui/badge';
import { PanelShell } from '@/components/panels/PanelShell';

const preferences = [
  { label: 'Email summaries', status: 'enabled' },
  { label: 'Live call alerts', status: 'enabled' },
  { label: 'Payment alerts', status: 'enabled' },
  { label: 'Product updates', status: 'muted' }
];

export function NotificationsPanel() {
  return (
    <PanelShell
      eyebrow="Notifications"
      title="Operator notification preferences"
      description="Decide which moments demand attention immediately and which can wait for a digest."
    >
      <div className="space-y-4">
        {preferences.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-3xl border border-line bg-white/70 p-5">
            <p className="font-medium text-ink">{item.label}</p>
            <Badge tone={item.status === 'enabled' ? 'success' : 'default'}>{item.status}</Badge>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

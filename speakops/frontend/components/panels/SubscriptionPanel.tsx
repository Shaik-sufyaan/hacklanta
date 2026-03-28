'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PanelShell } from '@/components/panels/PanelShell';

export function SubscriptionPanel() {
  return (
    <PanelShell
      eyebrow="Billing"
      title="Plan and workspace subscription"
      description="Manage tier, monitor monthly spend, and keep checkout or portal actions one click away for owners."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { name: 'Starter', price: '$49', active: false },
          { name: 'Pro', price: '$149', active: true },
          { name: 'Enterprise', price: 'Custom', active: false }
        ].map((plan) => (
          <div key={plan.name} className="rounded-3xl border border-line bg-white/70 p-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-2xl text-ink">{plan.name}</p>
              {plan.active ? <Badge tone="success">Current</Badge> : null}
            </div>
            <p className="mt-3 text-3xl font-semibold text-ink">{plan.price}</p>
            <Button className="mt-6 w-full">{plan.active ? 'Open portal' : 'Switch plan'}</Button>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

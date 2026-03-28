'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PanelShell } from '@/components/panels/PanelShell';
import { demoPayments } from '@/lib/mock-data';

export function PaymentsPanel() {
  return (
    <PanelShell
      eyebrow="Payments"
      title="Collected payments and refunds"
      description="Review payments processed by your agents and trigger refunds when a human needs to step in."
    >
      <div className="space-y-4">
        {demoPayments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between rounded-3xl border border-line bg-white/70 p-5">
            <div>
              <p className="font-display text-xl text-ink">{payment.amountLabel}</p>
              <p className="mt-1 text-sm text-slate-600">
                {payment.customer} • {payment.createdAt}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={payment.status === 'succeeded' ? 'success' : payment.status === 'pending' ? 'warning' : 'default'}>
                {payment.status}
              </Badge>
              <Button variant="secondary">Refund</Button>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

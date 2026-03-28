'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PanelShell } from '@/components/panels/PanelShell';

export function CreateAgentPanel() {
  return (
    <PanelShell
      eyebrow="Build"
      title="Agent creation wizard"
      description="Shape the voice, define escalation rules, point the agent at its website and documents, then watch the streamed creation pipeline unfold."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Agent name" defaultValue="Front Desk Concierge" />
        <Input placeholder="Website URL" defaultValue="https://example.com" />
        <Input placeholder="Top intents" defaultValue="Book appointments, pricing, FAQs" />
        <Input placeholder="Policies and escalation rules" defaultValue="Escalate billing disputes" />
        <Input placeholder="Tone" defaultValue="Warm, calm, precise" />
        <Input placeholder="Voice" defaultValue="Alloy" />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button>Stream agent creation</Button>
        <Button variant="secondary">Upload knowledge files</Button>
      </div>
      <div className="mt-6 rounded-3xl bg-ink p-5 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">SSE progress</p>
        <p className="mt-3 text-sm leading-7">
          session_created → waiting_for_docs → website_analysis → eva_research →
          prompt_synthesis → provisioning → done
        </p>
      </div>
    </PanelShell>
  );
}

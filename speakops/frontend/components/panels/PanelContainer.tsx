'use client';

import type { DashboardView } from '@/types';
import { useDashboardView } from '@/hooks/useDashboardView';
import { AccountPanel } from '@/components/panels/AccountPanel';
import { AdminOrgDetailPanel } from '@/components/panels/AdminOrgDetailPanel';
import { AdminOrgsPanel } from '@/components/panels/AdminOrgsPanel';
import { AgentDetailPanel } from '@/components/panels/AgentDetailPanel';
import { AssistantPanel } from '@/components/panels/AssistantPanel';
import { CreateAgentPanel } from '@/components/panels/CreateAgentPanel';
import { DocumentsPanel } from '@/components/panels/DocumentsPanel';
import { HistoryPanel } from '@/components/panels/HistoryPanel';
import { IntegrationsPanel } from '@/components/panels/IntegrationsPanel';
import { NotificationsPanel } from '@/components/panels/NotificationsPanel';
import { PaymentsPanel } from '@/components/panels/PaymentsPanel';
import { PlatformHealthPanel } from '@/components/panels/PlatformHealthPanel';
import { SubscriptionPanel } from '@/components/panels/SubscriptionPanel';
import { TokenUsagePanel } from '@/components/panels/TokenUsagePanel';

const panelMap: Record<DashboardView, React.ComponentType> = {
  agent: AgentDetailPanel,
  'create-agent': CreateAgentPanel,
  calls: HistoryPanel,
  documents: DocumentsPanel,
  integrations: IntegrationsPanel,
  account: AccountPanel,
  notifications: NotificationsPanel,
  subscription: SubscriptionPanel,
  payments: PaymentsPanel,
  usage: TokenUsagePanel,
  assistant: AssistantPanel,
  'admin-orgs': AdminOrgsPanel,
  'admin-org-detail': AdminOrgDetailPanel,
  'platform-health': PlatformHealthPanel
};

export function PanelContainer() {
  const { view } = useDashboardView();
  const ActivePanel = panelMap[view] ?? AgentDetailPanel;

  return <ActivePanel />;
}

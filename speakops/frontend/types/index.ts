export type DashboardView =
  | 'agent'
  | 'create-agent'
  | 'calls'
  | 'documents'
  | 'integrations'
  | 'account'
  | 'notifications'
  | 'subscription'
  | 'payments'
  | 'usage'
  | 'assistant'
  | 'admin-orgs'
  | 'admin-org-detail'
  | 'platform-health';

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  pictureUrl: string;
  role: 'member' | 'admin' | 'owner';
  organizationName: string;
}

export interface AgentSummary {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused';
  phoneNumber?: string;
  topIntents: string[];
  channels: Array<'voice' | 'sms' | 'web' | 'facebook' | 'instagram'>;
}

export interface ConversationRecord {
  id: string;
  agentName: string;
  channel: 'voice' | 'web' | 'sms';
  durationLabel: string;
  timestamp: string;
  live: boolean;
  transcript: string;
}

export interface DocumentSummary {
  id: string;
  filename: string;
  status: 'processing' | 'indexed' | 'failed';
  sizeLabel: string;
  uploadedAt: string;
}

export interface IntegrationStatus {
  provider: string;
  status: 'connected' | 'disconnected' | 'pending';
  detail: string;
}

export interface PaymentSummary {
  id: string;
  amountLabel: string;
  customer: string;
  status: 'succeeded' | 'refunded' | 'pending';
  createdAt: string;
}

export interface UsagePoint {
  date: string;
  tokens: number;
  sessions: number;
}

export interface EvaMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface EvaThread {
  id: string;
  title: string;
  updatedAt: string;
  messages: EvaMessage[];
}

export interface OrganizationSummary {
  id: string;
  name: string;
  tier: string;
  agents: number;
  conversations: number;
}

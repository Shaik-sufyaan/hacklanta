export type Role = 'member' | 'admin' | 'owner';
export type SubscriptionTier = 'starter' | 'pro' | 'enterprise';
export type AgentChannel = 'voice' | 'sms' | 'web' | 'facebook' | 'instagram';
export type ConversationChannel = 'voice' | 'web' | 'sms';
export type ConversationStatus = 'queued' | 'live' | 'completed' | 'archived';
export type IntegrationProvider =
  | 'google-calendar'
  | 'gmail'
  | 'hubspot'
  | 'facebook'
  | 'whatsapp'
  | 'telegram'
  | 'stripe';

export interface Organization {
  id: string;
  name: string;
  subscriptionTier: SubscriptionTier;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  organizationId: string;
  email: string;
  name: string;
  pictureUrl?: string;
  role: Role;
  isPlatformAdmin: boolean;
  acceptedTermsVersion?: string;
  acceptedTermsAt?: string;
}

export interface TermsStatus {
  currentVersion: string;
  accepted: boolean;
  acceptedVersion?: string;
  acceptedAt?: string;
}

export interface AgentConnectors {
  googleCalendar: boolean;
  gmail: boolean;
  hubspot: boolean;
  stripe: boolean;
}

export interface Agent {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  systemPrompt: string;
  websiteUrl?: string;
  topIntents: string[];
  policies: string[];
  tone: string;
  voice: string;
  status: 'draft' | 'active' | 'paused';
  phoneNumber?: string;
  channels: Record<AgentChannel, boolean>;
  connectors: AgentConnectors;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'tool' | 'system';
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  organizationId: string;
  agentId: string;
  agentName: string;
  channel: ConversationChannel;
  status: ConversationStatus;
  durationSeconds: number;
  startedAt: string;
  endedAt?: string;
  live: boolean;
  transcriptPreview: string;
  recordingUrl?: string;
}

export interface DocumentRecord {
  id: string;
  organizationId: string;
  agentId?: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  status: 'uploaded' | 'processing' | 'indexed' | 'failed';
  signedUrl: string;
  createdAt: string;
}

export interface IntegrationConnection {
  id: string;
  organizationId: string;
  provider: IntegrationProvider;
  status: 'connected' | 'disconnected' | 'pending';
  connectedAt?: string;
  metadata: Record<string, string>;
}

export interface BillingStatus {
  organizationId: string;
  plan: SubscriptionTier;
  seats: number;
  monthlySpendCents: number;
  nextInvoiceDate: string;
}

export interface PaymentRecord {
  id: string;
  organizationId: string;
  agentId: string;
  amountCents: number;
  currency: string;
  status: 'succeeded' | 'refunded' | 'pending';
  refunded: boolean;
  createdAt: string;
}

export interface UsageSummary {
  period: 'daily' | 'monthly';
  totalTokens: number;
  totalCalls: number;
  totalSessions: number;
  topModel: string;
}

export interface UsageDay {
  date: string;
  inputTokens: number;
  outputTokens: number;
  calls: number;
}

export interface UsageBreakdown {
  provider: string;
  model: string;
  tokens: number;
  spendCents: number;
}

export interface UserSettings {
  timezone: string;
  locale: string;
  defaultView: string;
}

export interface NotificationPreferences {
  emailSummaries: boolean;
  liveCallAlerts: boolean;
  paymentAlerts: boolean;
  productUpdates: boolean;
}

export interface OrganizationInvite {
  id: string;
  organizationId: string;
  email: string;
  role: Exclude<Role, 'owner'>;
  status: 'pending' | 'accepted' | 'expired';
  token: string;
  createdAt: string;
}

export interface OwnerClaim {
  token: string;
  organizationId: string;
  email: string;
  status: 'pending' | 'claimed' | 'expired';
}

export interface StatsSnapshot {
  agents: number;
  liveCalls: number;
  documents: number;
  integrations: number;
}

export interface PlatformHealth {
  refreshedAt: string;
  services: Array<{
    name: string;
    status: 'healthy' | 'degraded';
    detail: string;
  }>;
}

export interface LlmTrace {
  executionId: string;
  provider: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
}

export interface EvaSession {
  id: string;
  organizationId: string;
  title: string;
  updatedAt: string;
  messages: ConversationMessage[];
}

export interface StreamEvent<T = unknown> {
  event: string;
  data: T;
}

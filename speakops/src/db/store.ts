import type {
  Agent,
  BillingStatus,
  Conversation,
  ConversationMessage,
  DocumentRecord,
  EvaSession,
  IntegrationConnection,
  LlmTrace,
  NotificationPreferences,
  Organization,
  OrganizationInvite,
  OwnerClaim,
  PaymentRecord,
  PlatformHealth,
  StatsSnapshot,
  UsageBreakdown,
  UsageDay,
  UsageSummary,
  UserSettings,
  AuthUser
} from '../types';
import { createSignedUrl } from '../utils/signedUrls';

const now = new Date().toISOString();

const organization: Organization = {
  id: 'org_001',
  name: 'SpeakOps Demo Workspace',
  subscriptionTier: 'pro',
  createdAt: now
};

const platformOrganization: Organization = {
  id: 'org_platform',
  name: 'SpeakOps Platform',
  subscriptionTier: 'enterprise',
  createdAt: now
};

export const db = {
  organizations: [organization, platformOrganization] as Organization[],
  users: [
    {
      id: 'user_owner',
      organizationId: organization.id,
      email: 'owner@speakops.ai',
      name: 'Taylor Owner',
      pictureUrl: 'https://api.dicebear.com/9.x/identicon/svg?seed=Taylor',
      role: 'owner',
      isPlatformAdmin: false,
      acceptedTermsVersion: '2026-03',
      acceptedTermsAt: now
    },
    {
      id: 'user_admin',
      organizationId: organization.id,
      email: 'admin@speakops.ai',
      name: 'Jordan Admin',
      pictureUrl: 'https://api.dicebear.com/9.x/identicon/svg?seed=Jordan',
      role: 'admin',
      isPlatformAdmin: false,
      acceptedTermsVersion: '2026-03',
      acceptedTermsAt: now
    },
    {
      id: 'user_platform',
      organizationId: platformOrganization.id,
      email: 'platform@speakops.ai',
      name: 'Morgan Platform',
      pictureUrl: 'https://api.dicebear.com/9.x/identicon/svg?seed=Morgan',
      role: 'owner',
      isPlatformAdmin: true,
      acceptedTermsVersion: '2026-03',
      acceptedTermsAt: now
    }
  ] as AuthUser[],
  agents: [
    {
      id: 'agent_001',
      organizationId: organization.id,
      name: 'Front Desk Concierge',
      description: 'Answers common phone questions and books appointments.',
      systemPrompt:
        'You are a calm front desk specialist that helps customers with scheduling, FAQs, and escalation.',
      websiteUrl: 'https://example.com',
      topIntents: ['book appointment', 'pricing', 'store hours'],
      policies: ['Escalate billing disputes to humans', 'Never store card details'],
      tone: 'warm',
      voice: 'alloy',
      status: 'active',
      phoneNumber: '+1 (415) 555-0199',
      channels: {
        voice: true,
        sms: true,
        web: true,
        facebook: false,
        instagram: false
      },
      connectors: {
        googleCalendar: true,
        gmail: true,
        hubspot: false,
        stripe: true
      },
      createdAt: now,
      updatedAt: now
    }
  ] as Agent[],
  conversations: [
    {
      id: 'conv_001',
      organizationId: organization.id,
      agentId: 'agent_001',
      agentName: 'Front Desk Concierge',
      channel: 'voice',
      status: 'completed',
      durationSeconds: 428,
      startedAt: now,
      endedAt: now,
      live: false,
      transcriptPreview: 'Customer asked to move an appointment from Thursday to Friday.',
      recordingUrl: 'https://example.com/recordings/conv_001.mp3'
    },
    {
      id: 'conv_002',
      organizationId: organization.id,
      agentId: 'agent_001',
      agentName: 'Front Desk Concierge',
      channel: 'voice',
      status: 'live',
      durationSeconds: 63,
      startedAt: now,
      live: true,
      transcriptPreview: 'Caller is asking whether same-day walk-ins are available.'
    }
  ] as Conversation[],
  conversationMessages: [
    {
      id: 'msg_001',
      conversationId: 'conv_001',
      role: 'user',
      content: 'Can I move my appointment from Thursday to Friday afternoon?',
      createdAt: now
    },
    {
      id: 'msg_002',
      conversationId: 'conv_001',
      role: 'assistant',
      content: 'Absolutely. I have Friday at 2:30 PM available. Would you like me to switch it?',
      createdAt: now
    }
  ] as ConversationMessage[],
  documents: [
    {
      id: 'doc_001',
      organizationId: organization.id,
      agentId: 'agent_001',
      filename: 'intake-playbook.pdf',
      mimeType: 'application/pdf',
      sizeBytes: 128_332,
      status: 'indexed',
      signedUrl: createSignedUrl('documents/intake-playbook.pdf'),
      createdAt: now
    }
  ] as DocumentRecord[],
  integrations: [
    {
      id: 'int_google_calendar',
      organizationId: organization.id,
      provider: 'google-calendar',
      status: 'connected',
      connectedAt: now,
      metadata: { email: 'owner@speakops.ai' }
    },
    {
      id: 'int_stripe',
      organizationId: organization.id,
      provider: 'stripe',
      status: 'connected',
      connectedAt: now,
      metadata: { accountId: 'acct_demo' }
    }
  ] as IntegrationConnection[],
  billing: {
    organizationId: organization.id,
    plan: 'pro',
    seats: 8,
    monthlySpendCents: 14900,
    nextInvoiceDate: now
  } as BillingStatus,
  payments: [
    {
      id: 'pay_001',
      organizationId: organization.id,
      agentId: 'agent_001',
      amountCents: 8900,
      currency: 'usd',
      status: 'succeeded',
      refunded: false,
      createdAt: now
    }
  ] as PaymentRecord[],
  usageSummary: {
    period: 'monthly',
    totalTokens: 921_440,
    totalCalls: 184,
    totalSessions: 731,
    topModel: 'claude-sonnet-4'
  } as UsageSummary,
  usageDaily: [
    {
      date: now.slice(0, 10),
      inputTokens: 44_120,
      outputTokens: 21_870,
      calls: 17
    }
  ] as UsageDay[],
  usageBreakdown: [
    {
      provider: 'anthropic',
      model: 'claude-sonnet-4',
      tokens: 700_000,
      spendCents: 880
    },
    {
      provider: 'openai',
      model: 'gpt-4.1-mini',
      tokens: 221_440,
      spendCents: 190
    }
  ] as UsageBreakdown[],
  userSettings: new Map<string, UserSettings>([
    [
      'user_owner',
      {
        timezone: 'America/New_York',
        locale: 'en-US',
        defaultView: 'agent'
      }
    ]
  ]),
  notificationPreferences: new Map<string, NotificationPreferences>([
    [
      organization.id,
      {
        emailSummaries: true,
        liveCallAlerts: true,
        paymentAlerts: true,
        productUpdates: false
      }
    ]
  ]),
  invites: [
    {
      id: 'invite_001',
      organizationId: organization.id,
      email: 'teammate@example.com',
      role: 'member',
      status: 'pending',
      token: 'invite-demo-token',
      createdAt: now
    }
  ] as OrganizationInvite[],
  ownerClaims: [
    {
      token: 'claim-demo-token',
      organizationId: organization.id,
      email: 'owner@speakops.ai',
      status: 'pending'
    }
  ] as OwnerClaim[],
  stats: {
    agents: 1,
    liveCalls: 1,
    documents: 1,
    integrations: 2
  } as StatsSnapshot,
  platformHealth: {
    refreshedAt: now,
    services: [
      { name: 'api', status: 'healthy', detail: 'Elysia API latency under 80ms.' },
      { name: 'voice', status: 'healthy', detail: 'Primary Vapi edge operational.' },
      { name: 'billing', status: 'degraded', detail: 'Stripe webhook replay queue elevated.' }
    ]
  } as PlatformHealth,
  llmTraces: [
    {
      executionId: 'exec_001',
      provider: 'anthropic',
      model: 'claude-sonnet-4',
      promptTokens: 1822,
      completionTokens: 624
    }
  ] as LlmTrace[],
  evaSessions: [
    {
      id: 'eva_001',
      organizationId: organization.id,
      title: 'Workspace overview',
      updatedAt: now,
      messages: [
        {
          id: 'eva_msg_001',
          conversationId: 'eva_001',
          role: 'assistant',
          content: 'I can help navigate billing, agents, calls, and documents.',
          createdAt: now
        }
      ]
    }
  ] as EvaSession[],
  evaPhoneNumber: '+1 (628) 555-0142'
};

export function createId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replaceAll('-', '').slice(0, 12)}`;
}

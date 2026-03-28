import type {
  AgentSummary,
  ConversationRecord,
  DashboardUser,
  DocumentSummary,
  EvaThread,
  IntegrationStatus,
  OrganizationSummary,
  PaymentSummary,
  UsagePoint
} from '@/types';

export const demoUser: DashboardUser = {
  id: 'user_owner',
  name: 'Taylor Owner',
  email: 'owner@speakops.ai',
  pictureUrl: 'https://api.dicebear.com/9.x/identicon/svg?seed=Taylor',
  role: 'owner',
  organizationName: 'SpeakOps Demo Workspace'
};

export const demoAgents: AgentSummary[] = [
  {
    id: 'agent_001',
    name: 'Front Desk Concierge',
    description: 'Answers inbound calls, handles scheduling, and escalates billing questions.',
    status: 'active',
    phoneNumber: '+1 (415) 555-0199',
    topIntents: ['Book appointment', 'Answer pricing questions', 'Escalate billing'],
    channels: ['voice', 'sms', 'web']
  },
  {
    id: 'agent_002',
    name: 'EVA Workspace Operator',
    description: 'Internal assistant for navigating agents, usage, and live operations.',
    status: 'draft',
    topIntents: ['Route admins', 'Summarize usage', 'Open dashboards'],
    channels: ['web']
  }
];

export const demoConversations: ConversationRecord[] = [
  {
    id: 'conv_001',
    agentName: 'Front Desk Concierge',
    channel: 'voice',
    durationLabel: '07:08',
    timestamp: 'Today, 2:14 PM',
    live: false,
    transcript: 'Customer rescheduled an appointment from Thursday to Friday at 2:30 PM.'
  },
  {
    id: 'conv_002',
    agentName: 'Front Desk Concierge',
    channel: 'voice',
    durationLabel: '01:03',
    timestamp: 'Live now',
    live: true,
    transcript: 'Caller is asking whether same-day walk-ins are available after 4 PM.'
  }
];

export const demoDocuments: DocumentSummary[] = [
  {
    id: 'doc_001',
    filename: 'intake-playbook.pdf',
    status: 'indexed',
    sizeLabel: '128 KB',
    uploadedAt: 'Today'
  },
  {
    id: 'doc_002',
    filename: 'pricing-sheet.docx',
    status: 'processing',
    sizeLabel: '84 KB',
    uploadedAt: '5 min ago'
  }
];

export const demoIntegrations: IntegrationStatus[] = [
  { provider: 'Google Calendar', status: 'connected', detail: 'owner@speakops.ai' },
  { provider: 'Gmail', status: 'connected', detail: 'Thread follow-up enabled' },
  { provider: 'HubSpot', status: 'pending', detail: 'Awaiting OAuth callback' },
  { provider: 'Stripe', status: 'connected', detail: 'Live mode enabled' }
];

export const demoPayments: PaymentSummary[] = [
  {
    id: 'pay_001',
    amountLabel: '$89.00',
    customer: 'Amanda Brooks',
    status: 'succeeded',
    createdAt: '2026-03-28 10:42 AM'
  },
  {
    id: 'pay_002',
    amountLabel: '$124.00',
    customer: 'Jordan Lee',
    status: 'pending',
    createdAt: '2026-03-27 4:10 PM'
  }
];

export const demoUsage: UsagePoint[] = [
  { date: 'Mar 24', tokens: 84000, sessions: 44 },
  { date: 'Mar 25', tokens: 92000, sessions: 51 },
  { date: 'Mar 26', tokens: 101000, sessions: 57 },
  { date: 'Mar 27', tokens: 89000, sessions: 49 },
  { date: 'Mar 28', tokens: 67000, sessions: 33 }
];

export const demoThreads: EvaThread[] = [
  {
    id: 'eva_001',
    title: 'Workspace overview',
    updatedAt: '2 min ago',
    messages: [
      {
        id: 'm1',
        role: 'assistant',
        content: 'Your busiest channel today is voice, and one live conversation is active right now.'
      },
      {
        id: 'm2',
        role: 'user',
        content: 'Take me to usage.'
      },
      {
        id: 'm3',
        role: 'assistant',
        content: 'I can route you to the usage panel and summarize today versus the last 7 days.'
      }
    ]
  },
  {
    id: 'eva_002',
    title: 'Agent launch checklist',
    updatedAt: 'Yesterday',
    messages: [
      {
        id: 'm4',
        role: 'assistant',
        content: 'Before launch, connect calendar, upload policy docs, and provision a number.'
      }
    ]
  }
];

export const demoOrganizations: OrganizationSummary[] = [
  { id: 'org_001', name: 'SpeakOps Demo Workspace', tier: 'pro', agents: 2, conversations: 184 },
  { id: 'org_002', name: 'Northwind Wellness', tier: 'starter', agents: 1, conversations: 39 },
  { id: 'org_003', name: 'Atlas Dental Group', tier: 'enterprise', agents: 5, conversations: 941 }
];

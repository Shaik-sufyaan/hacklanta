import type { Agent, AgentChannel, AuthUser, StreamEvent } from '../types';
import { createId, db } from '../db/store';
import { formatProvisionedTwilioNumber } from '../utils/twilio';
import { formatProvisionedVapiNumber } from '../utils/vapi';

function getOrgAgents(organizationId: string) {
  return db.agents.filter((agent) => agent.organizationId === organizationId);
}

function getAgent(organizationId: string, agentId: string) {
  return db.agents.find((agent) => agent.organizationId === organizationId && agent.id === agentId) ?? null;
}

function createDraftAgent(user: AuthUser, payload: Record<string, unknown>): Agent {
  const agent: Agent = {
    id: createId('agent'),
    organizationId: user.organizationId,
    name: String(payload.name ?? 'Untitled Agent'),
    description: String(payload.description ?? 'AI phone agent created from the onboarding wizard.'),
    systemPrompt: String(
      payload.systemPrompt ??
        'You are a business phone assistant that answers questions, books appointments, and escalates when needed.'
    ),
    websiteUrl: payload.websiteUrl ? String(payload.websiteUrl) : undefined,
    topIntents: Array.isArray(payload.topIntents) ? payload.topIntents.map(String) : [],
    policies: Array.isArray(payload.policies) ? payload.policies.map(String) : [],
    tone: String(payload.tone ?? 'professional'),
    voice: String(payload.voice ?? 'alloy'),
    status: 'draft',
    phoneNumber: undefined,
    channels: {
      voice: true,
      sms: true,
      web: true,
      facebook: false,
      instagram: false
    },
    connectors: {
      googleCalendar: false,
      gmail: false,
      hubspot: false,
      stripe: false
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.agents.unshift(agent);
  db.stats.agents = getOrgAgents(user.organizationId).length;
  return agent;
}

export const agentsService = {
  list(user: AuthUser) {
    return getOrgAgents(user.organizationId);
  },
  get(user: AuthUser, agentId: string) {
    return getAgent(user.organizationId, agentId);
  },
  createStream(user: AuthUser, payload: Record<string, unknown>): StreamEvent[] {
    const agent = createDraftAgent(user, payload);

    return [
      { event: 'session_created', data: { sessionId: createId('agent_session') } },
      {
        event: 'waiting_for_docs',
        data: { uploadedDocuments: Array.isArray(payload.documents) ? payload.documents.length : 0 }
      },
      { event: 'website_analysis', data: { websiteUrl: payload.websiteUrl ?? null } },
      { event: 'eva_research', data: { recommendations: ['calendar', 'billing', 'faq'] } },
      { event: 'prompt_synthesis', data: { systemPrompt: agent.systemPrompt } },
      { event: 'provisioning', data: { agentId: agent.id, status: 'draft_created' } },
      { event: 'done', data: { agent } }
    ];
  },
  update(user: AuthUser, agentId: string, payload: Record<string, unknown>) {
    const agent = getAgent(user.organizationId, agentId);
    if (!agent) {
      return null;
    }

    agent.name = String(payload.name ?? agent.name);
    agent.description = String(payload.description ?? agent.description);
    agent.systemPrompt = String(payload.systemPrompt ?? agent.systemPrompt);
    agent.websiteUrl = payload.websiteUrl ? String(payload.websiteUrl) : agent.websiteUrl;
    agent.tone = String(payload.tone ?? agent.tone);
    agent.voice = String(payload.voice ?? agent.voice);
    agent.updatedAt = new Date().toISOString();
    return agent;
  },
  remove(user: AuthUser, agentId: string) {
    const index = db.agents.findIndex(
      (agent) => agent.organizationId === user.organizationId && agent.id === agentId
    );

    if (index === -1) {
      return false;
    }

    db.agents.splice(index, 1);
    db.stats.agents = getOrgAgents(user.organizationId).length;
    return true;
  },
  requestNumber(user: AuthUser, agentId: string) {
    const agent = getAgent(user.organizationId, agentId);
    if (!agent) {
      return null;
    }

    agent.phoneNumber = formatProvisionedVapiNumber(String(db.agents.length + 1000));
    agent.updatedAt = new Date().toISOString();
    return agent;
  },
  assignExistingNumber(user: AuthUser, agentId: string, phoneNumber: string) {
    const agent = getAgent(user.organizationId, agentId);
    if (!agent) {
      return null;
    }

    agent.phoneNumber = phoneNumber;
    agent.updatedAt = new Date().toISOString();
    return agent;
  },
  getChannels(user: AuthUser, agentId: string) {
    const agent = getAgent(user.organizationId, agentId);
    return agent ? agent.channels : null;
  },
  setChannelEnabled(user: AuthUser, agentId: string, channel: AgentChannel, enabled: boolean) {
    const agent = getAgent(user.organizationId, agentId);
    if (!agent) {
      return null;
    }

    agent.channels[channel] = enabled;
    agent.updatedAt = new Date().toISOString();
    return agent.channels;
  },
  getEvaStatus() {
    return {
      assignedNumber: db.evaPhoneNumber,
      isProvisioned: Boolean(db.evaPhoneNumber),
      provider: 'vapi'
    };
  },
  provisionEvaNumber() {
    db.evaPhoneNumber = formatProvisionedTwilioNumber(String(db.agents.length + 2000));
    return this.getEvaStatus();
  },
  assignExistingEvaNumber(phoneNumber: string) {
    db.evaPhoneNumber = phoneNumber;
    return this.getEvaStatus();
  }
};

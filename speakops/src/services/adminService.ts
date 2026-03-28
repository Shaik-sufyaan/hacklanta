import { db } from '../db/store';

export const adminService = {
  organizations() {
    return db.organizations;
  },
  rejectNumberRequests(orgId: string) {
    return {
      organizationId: orgId,
      rejected: true
    };
  },
  agents(orgId: string) {
    return db.agents.filter((agent) => agent.organizationId === orgId);
  },
  conversations(orgId: string) {
    return db.conversations.filter((conversation) => conversation.organizationId === orgId);
  },
  conversationMessages(conversationId: string) {
    return db.conversationMessages.filter((message) => message.conversationId === conversationId);
  },
  llmTraces(executionId: string) {
    return db.llmTraces.filter((trace) => trace.executionId === executionId);
  },
  provisionAgentNumber(agentId: string) {
    const agent = db.agents.find((entry) => entry.id === agentId);
    if (!agent) {
      return null;
    }

    agent.phoneNumber = `+1 (650) 555-${String(db.agents.length + 3000).slice(-4)}`;
    return agent;
  },
  assignAgentNumber(agentId: string, phoneNumber: string) {
    const agent = db.agents.find((entry) => entry.id === agentId);
    if (!agent) {
      return null;
    }

    agent.phoneNumber = phoneNumber;
    return agent;
  },
  platformHealth() {
    return db.platformHealth;
  },
  refreshPlatformHealth() {
    db.platformHealth.refreshedAt = new Date().toISOString();
    return db.platformHealth;
  }
};

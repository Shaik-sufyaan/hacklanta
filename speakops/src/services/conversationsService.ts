import type { AuthUser, Conversation, ConversationChannel, ConversationMessage } from '../types';
import { createId, db } from '../db/store';

function getOrgConversations(organizationId: string): Conversation[] {
  return db.conversations.filter((conversation) => conversation.organizationId === organizationId);
}

export const conversationsService = {
  list(user: AuthUser) {
    return getOrgConversations(user.organizationId);
  },
  live(user: AuthUser) {
    return getOrgConversations(user.organizationId).filter((conversation) => conversation.live);
  },
  messages(user: AuthUser, conversationId: string): ConversationMessage[] {
    const conversation = getOrgConversations(user.organizationId).find((entry) => entry.id === conversationId);
    if (!conversation) {
      return [];
    }

    return db.conversationMessages.filter((message) => message.conversationId === conversationId);
  },
  recording(user: AuthUser, conversationId: string) {
    const conversation = getOrgConversations(user.organizationId).find((entry) => entry.id === conversationId);
    return conversation?.recordingUrl ?? null;
  },
  create(user: AuthUser, payload: Record<string, unknown>) {
    const agent = db.agents.find((entry) => entry.organizationId === user.organizationId && entry.id === payload.agentId);
    const conversation: Conversation = {
      id: createId('conv'),
      organizationId: user.organizationId,
      agentId: agent?.id ?? db.agents[0]!.id,
      agentName: agent?.name ?? db.agents[0]!.name,
      channel: String(payload.channel ?? 'web') as ConversationChannel,
      status: 'queued',
      durationSeconds: 0,
      startedAt: new Date().toISOString(),
      live: false,
      transcriptPreview: String(payload.seedMessage ?? 'New conversation created from the dashboard.')
    };

    db.conversations.unshift(conversation);
    return conversation;
  },
  updateStatus(user: AuthUser, conversationId: string, status: Conversation['status']) {
    const conversation = getOrgConversations(user.organizationId).find((entry) => entry.id === conversationId);
    if (!conversation) {
      return null;
    }

    conversation.status = status;
    conversation.live = status === 'live';
    conversation.endedAt = status === 'completed' || status === 'archived' ? new Date().toISOString() : undefined;
    db.stats.liveCalls = this.live(user).length;
    return conversation;
  },
  remove(user: AuthUser, conversationId: string) {
    const index = db.conversations.findIndex(
      (conversation) => conversation.organizationId === user.organizationId && conversation.id === conversationId
    );

    if (index === -1) {
      return false;
    }

    db.conversations.splice(index, 1);
    db.stats.liveCalls = this.live(user).length;
    return true;
  }
};

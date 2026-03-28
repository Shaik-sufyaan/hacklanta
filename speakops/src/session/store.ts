import type { ConversationMessage } from '../types';

const sessions = new Map<string, ConversationMessage[]>();

export function appendSessionMessage(sessionId: string, message: ConversationMessage): void {
  const existing = sessions.get(sessionId) ?? [];
  existing.push(message);
  sessions.set(sessionId, existing);
}

export function getSessionMessages(sessionId: string): ConversationMessage[] {
  return sessions.get(sessionId) ?? [];
}

import type { AuthUser, ConversationMessage, StreamEvent } from '../types';
import { executeAgentTurn } from '../agent/runtime';
import { createId, db } from '../db/store';
import { appendSessionMessage } from '../session/store';

export const agentRuntimeService = {
  async stream(user: AuthUser, payload: Record<string, unknown>): Promise<StreamEvent[]> {
    const agentId = String(payload.agentId ?? db.agents[0]?.id ?? '');
    const agent =
      db.agents.find((entry) => entry.organizationId === user.organizationId && entry.id === agentId) ?? db.agents[0];
    const sessionId = String(payload.sessionId ?? createId('session'));
    const prompt = String(payload.prompt ?? '');

    const userMessage: ConversationMessage = {
      id: createId('msg'),
      conversationId: sessionId,
      role: 'user',
      content: prompt,
      createdAt: new Date().toISOString()
    };

    appendSessionMessage(sessionId, userMessage);

    const execution = await executeAgentTurn({
      prompt,
      agentName: agent?.name ?? 'SpeakOps Agent'
    });

    const assistantMessage: ConversationMessage = {
      id: createId('msg'),
      conversationId: sessionId,
      role: 'assistant',
      content: execution.output,
      createdAt: new Date().toISOString()
    };

    appendSessionMessage(sessionId, assistantMessage);

    return [
      { event: 'session_created', data: { sessionId, agentId: agent?.id } },
      { event: 'text', data: { delta: execution.output.slice(0, Math.ceil(execution.output.length / 2)) } },
      { event: 'tool_call', data: { tool: 'navigate_to_page', args: { view: 'agent' } } },
      { event: 'text', data: { delta: execution.output.slice(Math.ceil(execution.output.length / 2)) } },
      {
        event: 'done',
        data: {
          sessionId,
          model: execution.model,
          tools: execution.tools,
          message: assistantMessage
        }
      }
    ];
  }
};

import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { agentRuntimeService } from '../services/agentRuntimeService';
import { createSseResponse } from '../utils/sse';

export const agentRuntimeRoutes = new Elysia({ prefix: '/agent' }).post('/stream', async ({ request, body }) => {
  const user = (await getRequestUser(request))!;
  const events = await agentRuntimeService.stream(user, (body ?? {}) as Record<string, unknown>);
  return createSseResponse(events, 200);
});

import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { adminService } from '../services/adminService';
import { isPlatformAdmin } from '../utils/guards';

export const adminRoutes = new Elysia({ prefix: '/admin' })
  .onBeforeHandle(async ({ request, set }) => {
    const user = (await getRequestUser(request))!;
    if (!isPlatformAdmin(user)) {
      set.status = 403;
      return { message: 'Platform admin access required.' };
    }
  })
  .get('/organizations', () => adminService.organizations())
  .post('/organizations/:orgId/reject-number-requests', ({ params }) =>
    adminService.rejectNumberRequests(params.orgId)
  )
  .get('/organizations/:orgId/agents', ({ params }) => adminService.agents(params.orgId))
  .get('/organizations/:orgId/conversations', ({ params }) => adminService.conversations(params.orgId))
  .get('/conversations/:id/messages', ({ params }) => adminService.conversationMessages(params.id))
  .get('/executions/:id/llm-traces', ({ params }) => adminService.llmTraces(params.id))
  .post('/agents/:id/provision-number', ({ params, set }) => {
    const agent = adminService.provisionAgentNumber(params.id);
    if (!agent) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return agent;
  })
  .post('/agents/:id/assign-number', ({ params, body, set }) => {
    const agent = adminService.assignAgentNumber(
      params.id,
      String((body as Record<string, unknown>)?.phoneNumber ?? '')
    );

    if (!agent) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return agent;
  })
  .get('/platform-health', () => adminService.platformHealth())
  .post('/platform-health/refresh', () => adminService.refreshPlatformHealth());

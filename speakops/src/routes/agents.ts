import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { agentsService } from '../services/agentsService';
import { hasAnyRole } from '../utils/guards';
import { createSseResponse } from '../utils/sse';

export const agentsRoutes = new Elysia({ prefix: '/agents' })
  .get('/', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return agentsService.list(user);
  })
  .post('/stream', async ({ request, body }) => {
    const user = (await getRequestUser(request))!;
    const events = agentsService.createStream(user, (body ?? {}) as Record<string, unknown>);
    return createSseResponse(events, 300);
  })
  .get('/eva/status', () => agentsService.getEvaStatus())
  .post('/eva/provision-number', async ({ request, set }) => {
    const user = (await getRequestUser(request))!;
    if (!hasAnyRole(user, ['owner', 'admin'])) {
      set.status = 403;
      return { message: 'Owner or admin access required.' };
    }

    return agentsService.provisionEvaNumber();
  })
  .post('/eva/assign-existing-number', async ({ request, body, set }) => {
    const user = (await getRequestUser(request))!;
    if (!hasAnyRole(user, ['owner', 'admin'])) {
      set.status = 403;
      return { message: 'Owner or admin access required.' };
    }

    return agentsService.assignExistingEvaNumber(String((body as Record<string, unknown>)?.phoneNumber ?? ''));
  })
  .get('/:id', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const agent = agentsService.get(user, params.id);

    if (!agent) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return agent;
  })
  .patch('/:id', async ({ request, params, body, set }) => {
    const user = (await getRequestUser(request))!;
    const agent = agentsService.update(user, params.id, (body ?? {}) as Record<string, unknown>);

    if (!agent) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return agent;
  })
  .delete('/:id', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const removed = agentsService.remove(user, params.id);

    if (!removed) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return { success: true };
  })
  .post('/:id/request-number', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const agent = agentsService.requestNumber(user, params.id);

    if (!agent) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return agent;
  })
  .post('/:id/assign-existing-number', async ({ request, params, body, set }) => {
    const user = (await getRequestUser(request))!;
    const agent = agentsService.assignExistingNumber(
      user,
      params.id,
      String((body as Record<string, unknown>)?.phoneNumber ?? '')
    );

    if (!agent) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return agent;
  })
  .get('/:id/channels', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const channels = agentsService.getChannels(user, params.id);

    if (!channels) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return channels;
  })
  .post('/:id/channels/:channel/enable', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const channels = agentsService.setChannelEnabled(user, params.id, params.channel as never, true);

    if (!channels) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return channels;
  })
  .delete('/:id/channels/:channel/disable', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const channels = agentsService.setChannelEnabled(user, params.id, params.channel as never, false);

    if (!channels) {
      set.status = 404;
      return { message: 'Agent not found.' };
    }

    return channels;
  });

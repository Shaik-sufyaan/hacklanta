import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { conversationsService } from '../services/conversationsService';

export const conversationsRoutes = new Elysia({ prefix: '/conversations' })
  .get('/', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return conversationsService.list(user);
  })
  .get('/live', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return conversationsService.live(user);
  })
  .get('/:id/messages', async ({ request, params }) => {
    const user = (await getRequestUser(request))!;
    return conversationsService.messages(user, params.id);
  })
  .get('/:id/recording', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const recordingUrl = conversationsService.recording(user, params.id);

    if (!recordingUrl) {
      set.status = 404;
      return { message: 'Recording not found.' };
    }

    return { url: recordingUrl };
  })
  .post('/', async ({ request, body }) => {
    const user = (await getRequestUser(request))!;
    return conversationsService.create(user, (body ?? {}) as Record<string, unknown>);
  })
  .patch('/:id/status', async ({ request, params, body, set }) => {
    const user = (await getRequestUser(request))!;
    const updated = conversationsService.updateStatus(
      user,
      params.id,
      String((body as Record<string, unknown>)?.status ?? 'completed') as never
    );

    if (!updated) {
      set.status = 404;
      return { message: 'Conversation not found.' };
    }

    return updated;
  })
  .delete('/:id', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const removed = conversationsService.remove(user, params.id);

    if (!removed) {
      set.status = 404;
      return { message: 'Conversation not found.' };
    }

    return { success: true };
  });

import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { uploadService } from '../services/uploadService';

export const uploadRoutes = new Elysia({ prefix: '/upload' })
  .post('/', async ({ request, body }) => {
    const user = (await getRequestUser(request))!;
    return uploadService.create(user, (body ?? {}) as Record<string, unknown>);
  })
  .get('/list/all', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return uploadService.list(user);
  })
  .get('/:id', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const document = uploadService.get(user, params.id);

    if (!document) {
      set.status = 404;
      return { message: 'Document not found.' };
    }

    return document;
  })
  .get('/:id/status', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const status = uploadService.getStatus(user, params.id);

    if (!status) {
      set.status = 404;
      return { message: 'Document not found.' };
    }

    return status;
  })
  .delete('/:id', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    const removed = uploadService.remove(user, params.id);

    if (!removed) {
      set.status = 404;
      return { message: 'Document not found.' };
    }

    return { success: true };
  });

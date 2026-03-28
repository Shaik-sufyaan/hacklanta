import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { termsService } from '../services/termsService';

export const termsRoutes = new Elysia({ prefix: '/terms' })
  .get('/status', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return termsService.getStatus(user);
  })
  .post('/accept', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return termsService.accept(user);
  });

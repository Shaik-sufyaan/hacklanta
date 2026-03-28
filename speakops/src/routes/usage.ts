import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { usageService } from '../services/usageService';

export const usageRoutes = new Elysia({ prefix: '/usage' })
  .get('/summary', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return usageService.summary(user);
  })
  .get('/daily', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return usageService.daily(user);
  })
  .get('/breakdown', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return usageService.breakdown(user);
  });

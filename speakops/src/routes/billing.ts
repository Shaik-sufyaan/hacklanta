import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { billingService } from '../services/billingService';
import { hasAnyRole } from '../utils/guards';

export const billingRoutes = new Elysia({ prefix: '/billing' })
  .get('/status', async ({ request, set }) => {
    const user = (await getRequestUser(request))!;
    if (!hasAnyRole(user, ['owner'])) {
      set.status = 403;
      return { message: 'Owner access required.' };
    }

    return billingService.status(user);
  })
  .post('/checkout', async ({ request, body, set }) => {
    const user = (await getRequestUser(request))!;
    if (!hasAnyRole(user, ['owner'])) {
      set.status = 403;
      return { message: 'Owner access required.' };
    }

    return billingService.checkout(user, (body ?? {}) as Record<string, unknown>);
  })
  .post('/portal', async ({ request, set }) => {
    const user = (await getRequestUser(request))!;
    if (!hasAnyRole(user, ['owner'])) {
      set.status = 403;
      return { message: 'Owner access required.' };
    }

    return billingService.portal(user);
  });

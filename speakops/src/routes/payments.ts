import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { paymentsService } from '../services/paymentsService';
import { hasAnyRole } from '../utils/guards';

export const paymentsRoutes = new Elysia({ prefix: '/payments' })
  .get('/', async ({ request, set }) => {
    const user = (await getRequestUser(request))!;
    if (!hasAnyRole(user, ['owner'])) {
      set.status = 403;
      return { message: 'Owner access required.' };
    }

    return paymentsService.list(user);
  })
  .post('/:id/refund', async ({ request, params, set }) => {
    const user = (await getRequestUser(request))!;
    if (!hasAnyRole(user, ['owner'])) {
      set.status = 403;
      return { message: 'Owner access required.' };
    }

    const payment = paymentsService.refund(user, params.id);
    if (!payment) {
      set.status = 404;
      return { message: 'Payment not found.' };
    }

    return payment;
  });

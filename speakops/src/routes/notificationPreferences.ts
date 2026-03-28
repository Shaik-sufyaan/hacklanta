import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { notificationPreferencesService } from '../services/notificationPreferencesService';

export const notificationPreferencesRoutes = new Elysia({ prefix: '/notification-preferences' })
  .get('/', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return notificationPreferencesService.get(user);
  })
  .put('/', async ({ request, body }) => {
    const user = (await getRequestUser(request))!;
    return notificationPreferencesService.update(user, (body ?? {}) as Record<string, unknown>);
  });

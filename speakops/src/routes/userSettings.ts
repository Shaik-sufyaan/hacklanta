import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { userSettingsService } from '../services/userSettingsService';

export const userSettingsRoutes = new Elysia({ prefix: '/user-settings' })
  .get('/', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return userSettingsService.get(user);
  })
  .put('/', async ({ request, body }) => {
    const user = (await getRequestUser(request))!;
    return userSettingsService.update(user, (body ?? {}) as Record<string, unknown>);
  });

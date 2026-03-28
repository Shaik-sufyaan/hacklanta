import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { statsService } from '../services/statsService';

export const statsRoutes = new Elysia({ prefix: '/stats' }).get('/', async ({ request }) => {
  const user = (await getRequestUser(request))!;
  return statsService.get(user);
});

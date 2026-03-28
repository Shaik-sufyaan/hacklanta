import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { userService } from '../services/userService';

export const userRoutes = new Elysia({ prefix: '/user' }).get('/me', async ({ request }) => {
  const user = (await getRequestUser(request))!;
  return userService.getCurrentUser(user);
});

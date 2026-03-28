import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { orgService } from '../services/orgService';

export const orgPublicRoutes = new Elysia({ prefix: '/org' })
  .get('/invites/:token', ({ params, set }) => {
    const invite = orgService.previewInvite(params.token);
    if (!invite) {
      set.status = 404;
      return { message: 'Invite not found.' };
    }

    return invite;
  })
  .post('/invites/:token/accept', ({ params, set }) => {
    const invite = orgService.acceptInvite(params.token);
    if (!invite) {
      set.status = 404;
      return { message: 'Invite not found.' };
    }

    return invite;
  });

export const orgRoutes = new Elysia({ prefix: '/org' })
  .get('/members', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return orgService.members(user);
  })
  .get('/invites', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return orgService.invites(user);
  })
  .post('/invites', async ({ request, body }) => {
    const user = (await getRequestUser(request))!;
    return orgService.createInvite(user, (body ?? {}) as Record<string, unknown>);
  });

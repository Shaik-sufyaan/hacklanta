import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { integrationsService } from '../services/integrationsService';
import { hasAnyRole } from '../utils/guards';

export const integrationsRoutes = new Elysia({ prefix: '/integrations' })
  .get('/', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return integrationsService.list(user);
  })
  .get('/stripe/status', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return integrationsService.stripeStatus(user);
  })
  .get('/stripe/connect', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return integrationsService.connectStripe(user);
  })
  .delete('/stripe', async ({ request }) => {
    const user = (await getRequestUser(request))!;
    return { success: integrationsService.disconnect(user, 'stripe') };
  })
  .post('/whatsapp/connect', async ({ request, body, set }) => {
    const user = (await getRequestUser(request))!;
    if (!hasAnyRole(user, ['owner', 'admin'])) {
      set.status = 403;
      return { message: 'Owner or admin access required.' };
    }

    return integrationsService.connectWhatsapp(user, (body ?? {}) as Record<string, unknown>);
  })
  .post('/telegram/connect', async ({ request, body, set }) => {
    const user = (await getRequestUser(request))!;
    if (!hasAnyRole(user, ['owner', 'admin'])) {
      set.status = 403;
      return { message: 'Owner or admin access required.' };
    }

    return integrationsService.connectTelegram(user, (body ?? {}) as Record<string, unknown>);
  })
  .get('/:provider/connect', ({ params }) => integrationsService.getConnectUrl(params.provider))
  .get('/:provider/callback', async ({ request, params }) => {
    const user = (await getRequestUser(request))!;
    return integrationsService.callback(user, params.provider);
  })
  .delete('/:provider', async ({ request, params }) => {
    const user = (await getRequestUser(request))!;
    return { success: integrationsService.disconnect(user, params.provider) };
  });

import { Elysia } from 'elysia';

import { getRequestUser } from '../../middleware';
import { getCurrentTermsVersion } from '../utils/env';

const exemptRoutes = new Set([
  '/api/terms/status',
  '/api/terms/accept',
  '/api/user/me'
]);

export function requireAcceptedTerms() {
  return new Elysia({ name: 'require-accepted-terms' }).onBeforeHandle(async ({ request, set }) => {
    const pathname = new URL(request.url).pathname;

    if (
      exemptRoutes.has(pathname) ||
      pathname.startsWith('/api/org/invites/') ||
      pathname.startsWith('/api/onboarding/owner-claim/')
    ) {
      return;
    }

    const user = await getRequestUser(request);
    if (!user) {
      return;
    }

    if (user.acceptedTermsVersion !== getCurrentTermsVersion()) {
      set.status = 428;
      return {
        message: 'Current terms must be accepted before continuing.',
        currentVersion: getCurrentTermsVersion()
      };
    }
  });
}

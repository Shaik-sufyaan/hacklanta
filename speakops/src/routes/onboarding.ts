import { Elysia } from 'elysia';

import { onboardingService } from '../services/onboardingService';

export const onboardingPublicRoutes = new Elysia({ prefix: '/onboarding' })
  .get('/owner-claim/:token', ({ params, set }) => {
    const claim = onboardingService.previewOwnerClaim(params.token);
    if (!claim) {
      set.status = 404;
      return { message: 'Claim token not found.' };
    }

    return claim;
  })
  .post('/owner-claim/complete', ({ body, set }) => {
    const claim = onboardingService.completeOwnerClaim((body ?? {}) as Record<string, unknown>);
    if (!claim) {
      set.status = 404;
      return { message: 'Claim token not found.' };
    }

    return claim;
  });

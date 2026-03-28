import { Elysia } from 'elysia';

import type { AuthUser } from './src/types';
import { resolveAuthenticatedUser } from './src/utils/firebase';

export const isAuthenticated = new Elysia({ name: 'is-authenticated' }).onBeforeHandle(
  async ({ request, set }) => {
    const user = await resolveAuthenticatedUser(request);

    if (!user) {
      set.status = 401;
      return { message: 'Authentication required.' };
    }
  }
);

export async function getRequestUser(request: Request): Promise<AuthUser | null> {
  return resolveAuthenticatedUser(request);
}

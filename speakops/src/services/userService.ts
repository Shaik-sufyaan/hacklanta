import type { AuthUser } from '../types';
import { db } from '../db/store';

export const userService = {
  getCurrentUser(user: AuthUser) {
    const organization = db.organizations.find((entry) => entry.id === user.organizationId);

    return {
      user,
      organization
    };
  }
};

import type { AuthUser } from '../types';
import { db } from '../db/store';

export const statsService = {
  get(_user: AuthUser) {
    return db.stats;
  }
};

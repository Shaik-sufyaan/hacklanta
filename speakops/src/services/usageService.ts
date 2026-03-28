import type { AuthUser } from '../types';
import { db } from '../db/store';

export const usageService = {
  summary(_user: AuthUser) {
    return db.usageSummary;
  },
  daily(_user: AuthUser) {
    return db.usageDaily;
  },
  breakdown(_user: AuthUser) {
    return db.usageBreakdown;
  }
};

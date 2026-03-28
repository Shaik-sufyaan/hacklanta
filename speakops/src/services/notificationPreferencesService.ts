import type { AuthUser } from '../types';
import { db } from '../db/store';

const fallback = {
  emailSummaries: true,
  liveCallAlerts: true,
  paymentAlerts: true,
  productUpdates: false
};

export const notificationPreferencesService = {
  get(user: AuthUser) {
    return db.notificationPreferences.get(user.organizationId) ?? fallback;
  },
  update(user: AuthUser, payload: Record<string, unknown>) {
    const current = this.get(user);
    const nextValue = {
      ...current,
      emailSummaries: Boolean(payload.emailSummaries ?? current.emailSummaries),
      liveCallAlerts: Boolean(payload.liveCallAlerts ?? current.liveCallAlerts),
      paymentAlerts: Boolean(payload.paymentAlerts ?? current.paymentAlerts),
      productUpdates: Boolean(payload.productUpdates ?? current.productUpdates)
    };

    db.notificationPreferences.set(user.organizationId, nextValue);
    return nextValue;
  }
};

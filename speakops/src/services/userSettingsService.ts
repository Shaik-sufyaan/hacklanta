import type { AuthUser } from '../types';
import { db } from '../db/store';

const defaultSettings = {
  timezone: 'America/New_York',
  locale: 'en-US',
  defaultView: 'agent'
};

export const userSettingsService = {
  get(user: AuthUser) {
    return db.userSettings.get(user.id) ?? defaultSettings;
  },
  update(user: AuthUser, payload: Record<string, unknown>) {
    const current = this.get(user);
    const nextValue = {
      ...current,
      timezone: String(payload.timezone ?? current.timezone),
      locale: String(payload.locale ?? current.locale),
      defaultView: String(payload.defaultView ?? current.defaultView)
    };

    db.userSettings.set(user.id, nextValue);
    return nextValue;
  }
};

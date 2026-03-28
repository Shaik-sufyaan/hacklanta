import type { AuthUser, TermsStatus } from '../types';
import { getCurrentTermsVersion } from '../utils/env';

export const termsService = {
  getStatus(user: AuthUser): TermsStatus {
    return {
      currentVersion: getCurrentTermsVersion(),
      accepted: user.acceptedTermsVersion === getCurrentTermsVersion(),
      acceptedVersion: user.acceptedTermsVersion,
      acceptedAt: user.acceptedTermsAt
    };
  },
  accept(user: AuthUser): TermsStatus {
    user.acceptedTermsVersion = getCurrentTermsVersion();
    user.acceptedTermsAt = new Date().toISOString();
    return this.getStatus(user);
  }
};

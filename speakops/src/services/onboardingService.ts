import { db } from '../db/store';

export const onboardingService = {
  previewOwnerClaim(token: string) {
    return db.ownerClaims.find((claim) => claim.token === token) ?? null;
  },
  completeOwnerClaim(payload: Record<string, unknown>) {
    const token = String(payload.token ?? '');
    const claim = db.ownerClaims.find((entry) => entry.token === token);
    if (!claim) {
      return null;
    }

    claim.status = 'claimed';
    return claim;
  }
};

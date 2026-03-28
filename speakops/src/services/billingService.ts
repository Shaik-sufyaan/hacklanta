import type { AuthUser } from '../types';
import { db } from '../db/store';
import { getStripeCheckoutUrl, getStripePortalUrl } from '../utils/stripe';

export const billingService = {
  status(user: AuthUser) {
    return {
      ...db.billing,
      organizationId: user.organizationId
    };
  },
  checkout(user: AuthUser, payload: Record<string, unknown>) {
    return {
      checkoutUrl: getStripeCheckoutUrl(String(payload.plan ?? db.billing.plan)),
      organizationId: user.organizationId
    };
  },
  portal(user: AuthUser) {
    return {
      portalUrl: getStripePortalUrl(user.organizationId)
    };
  }
};

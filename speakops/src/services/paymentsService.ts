import type { AuthUser } from '../types';
import { db } from '../db/store';

export const paymentsService = {
  list(user: AuthUser) {
    return db.payments.filter((payment) => payment.organizationId === user.organizationId);
  },
  refund(user: AuthUser, paymentId: string) {
    const payment = db.payments.find(
      (entry) => entry.organizationId === user.organizationId && entry.id === paymentId
    );

    if (!payment) {
      return null;
    }

    payment.refunded = true;
    payment.status = 'refunded';
    return payment;
  }
};

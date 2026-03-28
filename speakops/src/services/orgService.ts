import type { AuthUser } from '../types';
import { createId, db } from '../db/store';
import { createInviteEmailLink } from '../utils/mail';

export const orgService = {
  members(user: AuthUser) {
    return db.users.filter((entry) => entry.organizationId === user.organizationId);
  },
  invites(user: AuthUser) {
    return db.invites.filter((invite) => invite.organizationId === user.organizationId);
  },
  createInvite(user: AuthUser, payload: Record<string, unknown>) {
    const invite = {
      id: createId('invite'),
      organizationId: user.organizationId,
      email: String(payload.email ?? ''),
      role: (payload.role === 'admin' ? 'admin' : 'member') as 'member' | 'admin',
      status: 'pending' as const,
      token: createId('token'),
      createdAt: new Date().toISOString()
    };

    db.invites.unshift(invite);
    return {
      ...invite,
      inviteUrl: createInviteEmailLink(invite.token)
    };
  },
  previewInvite(token: string) {
    return db.invites.find((invite) => invite.token === token) ?? null;
  },
  acceptInvite(token: string) {
    const invite = db.invites.find((entry) => entry.token === token);
    if (!invite) {
      return null;
    }

    invite.status = 'accepted';
    return invite;
  }
};

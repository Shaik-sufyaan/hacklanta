import { describe, expect, test } from 'bun:test';

import { db } from '../src/db/store';
import { agentsService } from '../src/services/agentsService';
import { termsService } from '../src/services/termsService';

describe('core services', () => {
  test('terms acceptance updates the current user', () => {
    const user = db.users[1]!;
    user.acceptedTermsVersion = undefined;

    const status = termsService.accept(user);

    expect(status.accepted).toBe(true);
    expect(user.acceptedTermsVersion === status.currentVersion).toBe(true);
  });

  test('agent channel updates stay org-scoped', () => {
    const user = db.users[0]!;
    const agent = db.agents.find((entry) => entry.organizationId === user.organizationId)!;

    const channels = agentsService.setChannelEnabled(user, agent.id, 'facebook', true);

    expect(channels?.facebook).toBe(true);
  });
});

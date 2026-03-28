import type { AuthUser, IntegrationConnection, IntegrationProvider } from '../types';
import { createId, db } from '../db/store';

function getOrgIntegrations(organizationId: string) {
  return db.integrations.filter((integration) => integration.organizationId === organizationId);
}

function upsertIntegration(
  organizationId: string,
  provider: IntegrationProvider,
  metadata: Record<string, string> = {}
): IntegrationConnection {
  const existing = db.integrations.find(
    (integration) => integration.organizationId === organizationId && integration.provider === provider
  );

  if (existing) {
    existing.status = 'connected';
    existing.connectedAt = new Date().toISOString();
    existing.metadata = { ...existing.metadata, ...metadata };
    return existing;
  }

  const connection: IntegrationConnection = {
    id: createId('int'),
    organizationId,
    provider,
    status: 'connected',
    connectedAt: new Date().toISOString(),
    metadata
  };

  db.integrations.push(connection);
  db.stats.integrations = getOrgIntegrations(organizationId).length;
  return connection;
}

export const integrationsService = {
  list(user: AuthUser) {
    return getOrgIntegrations(user.organizationId);
  },
  getConnectUrl(provider: string) {
    return {
      provider,
      connectUrl: `${process.env.APP_URL ?? 'http://localhost:3000'}/oauth/${provider}`
    };
  },
  callback(user: AuthUser, provider: string) {
    return upsertIntegration(user.organizationId, provider as IntegrationProvider, { callback: 'completed' });
  },
  disconnect(user: AuthUser, provider: string) {
    const integration = db.integrations.find(
      (entry) => entry.organizationId === user.organizationId && entry.provider === provider
    );

    if (!integration) {
      return false;
    }

    integration.status = 'disconnected';
    return true;
  },
  connectWhatsapp(user: AuthUser, payload: Record<string, unknown>) {
    return upsertIntegration(user.organizationId, 'whatsapp', {
      phoneNumberId: String(payload.phoneNumberId ?? ''),
      wabaId: String(payload.wabaId ?? '')
    });
  },
  connectTelegram(user: AuthUser, payload: Record<string, unknown>) {
    return upsertIntegration(user.organizationId, 'telegram', {
      botToken: String(payload.botToken ?? '')
    });
  },
  stripeStatus(user: AuthUser) {
    return (
      getOrgIntegrations(user.organizationId).find((integration) => integration.provider === 'stripe') ?? {
        provider: 'stripe',
        status: 'disconnected'
      }
    );
  },
  connectStripe(user: AuthUser) {
    return upsertIntegration(user.organizationId, 'stripe', {
      accountId: 'acct_demo_connected'
    });
  }
};

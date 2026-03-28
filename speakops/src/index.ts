import { cors } from '@elysiajs/cors';
import { Elysia } from 'elysia';

import { isAuthenticated } from '../middleware';
import { getRuntimeSummary, registerRuntime } from './bootstrap/registerRuntime';
import { requireAcceptedTerms } from './plugins/requireAcceptedTerms';
import { adminRoutes } from './routes/admin';
import { agentRuntimeRoutes } from './routes/agentRuntime';
import { agentsRoutes } from './routes/agents';
import { billingRoutes } from './routes/billing';
import { conversationsRoutes } from './routes/conversations';
import { integrationsRoutes } from './routes/integrations';
import { notificationPreferencesRoutes } from './routes/notificationPreferences';
import { onboardingPublicRoutes } from './routes/onboarding';
import { orgPublicRoutes, orgRoutes } from './routes/org';
import { paymentsRoutes } from './routes/payments';
import { statsRoutes } from './routes/stats';
import { termsRoutes } from './routes/terms';
import { uploadRoutes } from './routes/upload';
import { usageRoutes } from './routes/usage';
import { userRoutes } from './routes/user';
import { userSettingsRoutes } from './routes/userSettings';
import { getPort } from './utils/env';

registerRuntime();

const publicApi = new Elysia({ prefix: '/api' }).use(orgPublicRoutes).use(onboardingPublicRoutes);

const protectedApi = new Elysia({ prefix: '/api' })
  .use(isAuthenticated)
  .use(requireAcceptedTerms())
  .use(userRoutes)
  .use(termsRoutes)
  .use(agentsRoutes)
  .use(agentRuntimeRoutes)
  .use(conversationsRoutes)
  .use(uploadRoutes)
  .use(integrationsRoutes)
  .use(billingRoutes)
  .use(paymentsRoutes)
  .use(usageRoutes)
  .use(userSettingsRoutes)
  .use(orgRoutes)
  .use(notificationPreferencesRoutes)
  .use(statsRoutes)
  .use(adminRoutes);

const app = new Elysia()
  .use(
    cors({
      origin: true,
      credentials: true
    })
  )
  .get('/health', () => ({
    status: 'ok',
    runtime: getRuntimeSummary(),
    now: new Date().toISOString()
  }))
  .use(publicApi)
  .use(protectedApi)
  .listen(getPort());

console.log(`SpeakOps backend listening on http://localhost:${app.server?.port ?? getPort()}`);

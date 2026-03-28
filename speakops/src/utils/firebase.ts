import admin from 'firebase-admin';

import type { AuthUser } from '../types';
import { db } from '../db/store';
import { isDevelopmentAuthMode } from './env';

let firebaseReady = false;

function ensureFirebase(): admin.app.App | null {
  if (firebaseReady && admin.apps.length > 0) {
    return admin.app();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replaceAll('\\n', '\n');

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
  }

  firebaseReady = true;
  return admin.app();
}

function getMockUser(): AuthUser {
  return db.users[0]!;
}

export async function resolveAuthenticatedUser(request: Request): Promise<AuthUser | null> {
  if (isDevelopmentAuthMode()) {
    return getMockUser();
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const app = ensureFirebase();
  if (!app) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const user =
      db.users.find((entry) => entry.id === decoded.uid) ??
      db.users.find((entry) => entry.email === decoded.email);

    if (!user) {
      return null;
    }

    return {
      ...user,
      email: decoded.email ?? user.email,
      name: decoded.name ?? user.name,
      pictureUrl: decoded.picture ?? user.pictureUrl
    };
  } catch {
    return null;
  }
}

import type { AuthUser, DocumentRecord } from '../types';
import { createId, db } from '../db/store';
import { createSignedUrl } from '../utils/signedUrls';

function getOrgDocuments(organizationId: string) {
  return db.documents.filter((document) => document.organizationId === organizationId);
}

export const uploadService = {
  create(user: AuthUser, payload: Record<string, unknown>): DocumentRecord {
    const document: DocumentRecord = {
      id: createId('doc'),
      organizationId: user.organizationId,
      agentId: payload.agentId ? String(payload.agentId) : undefined,
      filename: String(payload.filename ?? 'uploaded-document.pdf'),
      mimeType: String(payload.mimeType ?? 'application/pdf'),
      sizeBytes: Number(payload.sizeBytes ?? 1024),
      status: 'processing',
      signedUrl: createSignedUrl(`documents/${createId('file')}`),
      createdAt: new Date().toISOString()
    };

    db.documents.unshift(document);
    db.stats.documents = getOrgDocuments(user.organizationId).length;
    return document;
  },
  list(user: AuthUser) {
    return getOrgDocuments(user.organizationId);
  },
  get(user: AuthUser, documentId: string) {
    return getOrgDocuments(user.organizationId).find((document) => document.id === documentId) ?? null;
  },
  getStatus(user: AuthUser, documentId: string) {
    const document = this.get(user, documentId);
    if (!document) {
      return null;
    }

    if (document.status === 'processing') {
      document.status = 'indexed';
    }

    return {
      id: document.id,
      status: document.status
    };
  },
  remove(user: AuthUser, documentId: string) {
    const index = db.documents.findIndex(
      (document) => document.organizationId === user.organizationId && document.id === documentId
    );

    if (index === -1) {
      return false;
    }

    db.documents.splice(index, 1);
    db.stats.documents = getOrgDocuments(user.organizationId).length;
    return true;
  }
};

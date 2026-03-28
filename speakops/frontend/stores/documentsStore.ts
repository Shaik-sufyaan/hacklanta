'use client';

import { create } from 'zustand';

import { demoDocuments } from '@/lib/mock-data';
import type { DocumentSummary } from '@/types';

interface DocumentsState {
  documents: DocumentSummary[];
  removeDocument: (documentId: string) => void;
}

export const useDocumentsStore = create<DocumentsState>((set) => ({
  documents: demoDocuments,
  removeDocument: (documentId) =>
    set((state) => ({
      documents: state.documents.filter((document) => document.id !== documentId)
    }))
}));

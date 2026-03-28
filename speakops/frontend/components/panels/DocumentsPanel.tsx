'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PanelShell } from '@/components/panels/PanelShell';
import { useDocumentsStore } from '@/stores/documentsStore';

export function DocumentsPanel() {
  const { documents, removeDocument } = useDocumentsStore();

  return (
    <PanelShell
      eyebrow="Knowledge"
      title="Documents and indexed memory"
      description="Upload playbooks, FAQs, pricing sheets, and policy docs, then monitor OCR and indexing status without leaving the dashboard."
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <Button>Upload file</Button>
        <Button variant="secondary">Generate signed preview URL</Button>
      </div>
      <div className="space-y-4">
        {documents.map((document) => (
          <div key={document.id} className="flex items-center justify-between rounded-3xl border border-line bg-white/70 p-5">
            <div>
              <p className="font-medium text-ink">{document.filename}</p>
              <p className="mt-1 text-sm text-slate-600">
                {document.sizeLabel} • {document.uploadedAt}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={document.status === 'indexed' ? 'success' : 'warning'}>{document.status}</Badge>
              <Button variant="ghost" onClick={() => removeDocument(document.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

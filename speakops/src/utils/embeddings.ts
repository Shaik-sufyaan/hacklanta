export function summarizeDocumentForEmbedding(text: string): string {
  return text.trim().slice(0, 500);
}

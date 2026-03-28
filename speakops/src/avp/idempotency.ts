export function createActionVector(scope: string, reference: string): string {
  return `${scope}:${reference}`;
}

export function isDuplicateAction(previousVectors: string[], vector: string): boolean {
  return previousVectors.includes(vector);
}

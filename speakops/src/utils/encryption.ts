export function maskSecret(secret: string): string {
  if (secret.length <= 6) {
    return '*'.repeat(secret.length);
  }

  return `${secret.slice(0, 3)}${'*'.repeat(secret.length - 6)}${secret.slice(-3)}`;
}

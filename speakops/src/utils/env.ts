export function getCurrentTermsVersion(): string {
  return process.env.CURRENT_TERMS_VERSION ?? '2026-03';
}

export function isDevelopmentAuthMode(): boolean {
  return process.env.NODE_ENV !== 'production' && !process.env.USE_REAL_AUTH;
}

export function getPort(): number {
  return Number(process.env.PORT ?? 3001);
}

export function formatProvisionedTwilioNumber(seed: string): string {
  return `+1 (415) 555-${seed.padStart(4, '0').slice(-4)}`;
}

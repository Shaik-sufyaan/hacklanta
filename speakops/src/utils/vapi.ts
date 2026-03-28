export function formatProvisionedVapiNumber(seed: string): string {
  return `+1 (628) 555-${seed.padStart(4, '0').slice(-4)}`;
}

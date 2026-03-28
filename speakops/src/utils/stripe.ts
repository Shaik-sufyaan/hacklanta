export function getStripeCheckoutUrl(plan: string): string {
  return `https://billing.speakops.local/checkout?plan=${encodeURIComponent(plan)}`;
}

export function getStripePortalUrl(organizationId: string): string {
  return `https://billing.speakops.local/portal?org=${encodeURIComponent(organizationId)}`;
}

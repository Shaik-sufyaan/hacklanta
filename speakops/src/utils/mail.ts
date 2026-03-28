export function createInviteEmailLink(token: string): string {
  return `${process.env.APP_URL ?? 'http://localhost:3000'}/invite/${token}`;
}

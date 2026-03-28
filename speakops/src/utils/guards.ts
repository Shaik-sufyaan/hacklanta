import type { AuthUser, Role } from '../types';

export function hasAnyRole(user: AuthUser, roles: Role[]): boolean {
  return roles.includes(user.role);
}

export function isPlatformAdmin(user: AuthUser): boolean {
  return user.isPlatformAdmin;
}
